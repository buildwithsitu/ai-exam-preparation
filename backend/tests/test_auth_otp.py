import datetime
import pytest
from app.extensions import db
from app.models.user import User
from app.models.otp import EmailOtpChallenge
from app.services.email_service import EmailService
from app.utils.errors import ServiceUnavailableError


def test_request_otp_success(client, db_session, monkeypatch):
    """
    Test requesting OTP sends email, creates hashed DB challenge,
    and DOES NOT create the user yet.
    """
    sent_emails = []

    def mock_send(recipient_email, otp_code, recipient_name=None):
        sent_emails.append({
            "email": recipient_email,
            "code": otp_code,
            "name": recipient_name,
        })

    monkeypatch.setattr(EmailService, "send_otp_email", mock_send)

    payload = {
        "name": "Priya Sharma",
        "email": "priya@example.com",
        "password": "SecurePassword123!",
        "institution": "IIT Bombay",
        "track": "Software Developer",
    }
    response = client.post("/api/v1/auth/register/request-otp", json=payload)
    assert response.status_code == 200

    data = response.get_json()
    assert data["success"] is True
    assert data["email"] == "priya@example.com"
    assert data["cooldownSeconds"] == 60
    assert data["expiresInMinutes"] == 10

    # User must NOT be created yet
    assert User.query.filter_by(email="priya@example.com").first() is None

    # Check mock delivery
    assert len(sent_emails) == 1
    assert sent_emails[0]["email"] == "priya@example.com"
    raw_otp = sent_emails[0]["code"]
    assert len(raw_otp) == 6
    assert raw_otp.isdigit()

    # Challenge must be stored in DB with hashed OTP and hashed password
    challenge = EmailOtpChallenge.query.filter_by(email="priya@example.com").first()
    assert challenge is not None
    assert challenge.is_consumed is False
    assert challenge.attempts == 0
    assert challenge.otp_hash != raw_otp  # NEVER plaintext
    assert challenge.password_hash != "SecurePassword123!"  # NEVER plaintext
    assert challenge.name == "Priya Sharma"
    assert challenge.institution == "IIT Bombay"


def test_request_otp_duplicate_email(client, db_session, monkeypatch):
    """Test requesting OTP for an already registered email returns 409 Conflict."""
    sent_emails = []
    monkeypatch.setattr(EmailService, "send_otp_email", lambda *args, **kwargs: sent_emails.append(args))

    # Pre-create user
    user = User(name="Existing User", email="existing@example.com")
    user.set_password("OldPassword123!")
    user.save()

    response = client.post("/api/v1/auth/register/request-otp", json={
        "name": "New Person",
        "email": "existing@example.com",
        "password": "NewPassword123!",
    })
    assert response.status_code == 409
    data = response.get_json()
    assert data["success"] is False
    assert data["error"]["code"] == "CONFLICT"
    assert len(sent_emails) == 0


def test_request_otp_resend_cooldown(client, db_session, monkeypatch):
    """Test requesting OTP twice within 60s enforces resend cooldown with 429."""
    monkeypatch.setattr(EmailService, "send_otp_email", lambda *a, **k: None)

    payload = {
        "name": "Rohan Patel",
        "email": "rohan@example.com",
        "password": "Password123!",
    }
    # 1. First request succeeds
    first_res = client.post("/api/v1/auth/register/request-otp", json=payload)
    assert first_res.status_code == 200

    # 2. Immediate second request is blocked by 60s cooldown
    second_res = client.post("/api/v1/auth/register/request-otp", json=payload)
    assert second_res.status_code == 429
    data = second_res.get_json()
    assert data["success"] is False
    assert data["error"]["code"] == "TOO_MANY_REQUESTS"
    assert "Please wait" in data["error"]["message"]


def test_verify_otp_success_and_login(client, db_session, monkeypatch):
    """
    Test verifying correct OTP creates user, consumes challenge, sets cookie,
    and enables normal login.
    """
    captured_otp = {}

    def mock_send(recipient_email, otp_code, recipient_name=None):
        captured_otp["code"] = otp_code

    monkeypatch.setattr(EmailService, "send_otp_email", mock_send)

    # 1. Request OTP
    reg_payload = {
        "name": "Ananya Gupta",
        "email": "ananya@example.com",
        "password": "MySecretPass999!",
        "institution": "BITS Pilani",
        "track": "Software Developer",
    }
    req_res = client.post("/api/v1/auth/register/request-otp", json=reg_payload)
    assert req_res.status_code == 200

    otp_code = captured_otp["code"]

    # 2. Verify OTP
    verify_res = client.post("/api/v1/auth/register/verify-otp", json={
        "email": "ananya@example.com",
        "otp": otp_code,
    })
    assert verify_res.status_code == 201

    data = verify_res.get_json()
    assert data["success"] is True
    assert "token" in data
    assert data["user"]["email"] == "ananya@example.com"
    assert data["user"]["name"] == "Ananya Gupta"
    assert "password" not in data["user"]
    assert "password_hash" not in data["user"]

    # Session cookie must be set
    cookie = verify_res.headers.get("Set-Cookie")
    assert cookie is not None
    assert "auth_token=" in cookie

    # Challenge must be marked is_consumed = True
    challenge = EmailOtpChallenge.query.filter_by(email="ananya@example.com").first()
    assert challenge.is_consumed is True

    # User must now exist in database
    created_user = User.query.filter_by(email="ananya@example.com").first()
    assert created_user is not None
    assert created_user.check_password("MySecretPass999!") is True

    # 3. User can now log in via standard /auth/login
    login_res = client.post("/api/v1/auth/login", json={
        "email": "ananya@example.com",
        "password": "MySecretPass999!",
    })
    assert login_res.status_code == 200
    assert login_res.get_json()["success"] is True


def test_verify_otp_single_use(client, db_session, monkeypatch):
    """Test OTP code cannot be re-used once consumed."""
    captured = {}

    def mock_send(*args, **kwargs):
        captured["code"] = kwargs.get("otp_code") or (args[1] if len(args) > 1 else None)

    monkeypatch.setattr(EmailService, "send_otp_email", mock_send)

    client.post("/api/v1/auth/register/request-otp", json={
        "name": "Vikram Das",
        "email": "vikram@example.com",
        "password": "Password123!",
    })

    # First verify succeeds
    res1 = client.post("/api/v1/auth/register/verify-otp", json={
        "email": "vikram@example.com",
        "otp": captured["code"],
    })
    assert res1.status_code == 201

    # Second verify with same code fails
    res2 = client.post("/api/v1/auth/register/verify-otp", json={
        "email": "vikram@example.com",
        "otp": captured["code"],
    })
    assert res2.status_code == 400
    assert "No pending verification code found" in res2.get_json()["error"]["message"]


def test_verify_otp_invalid_attempts_and_lockout(client, db_session, monkeypatch):
    """
    Test invalid OTP entry decrements remaining attempts and locks out at 5.
    """
    captured = {}

    def mock_send(*args, **kwargs):
        captured["code"] = kwargs.get("otp_code") or (args[1] if len(args) > 1 else None)

    monkeypatch.setattr(EmailService, "send_otp_email", mock_send)

    client.post("/api/v1/auth/register/request-otp", json={
        "name": "Neha Verma",
        "email": "neha@example.com",
        "password": "Password123!",
    })

    # Attempts 1 through 4 with wrong code
    for i in range(1, 5):
        res = client.post("/api/v1/auth/register/verify-otp", json={
            "email": "neha@example.com",
            "otp": "000000",
        })
        assert res.status_code == 400
        data = res.get_json()
        assert f"{5 - i} attempt" in data["error"]["message"]

    # 5th attempt with wrong code locks out
    res5 = client.post("/api/v1/auth/register/verify-otp", json={
        "email": "neha@example.com",
        "otp": "000000",
    })
    assert res5.status_code == 400
    assert "Maximum attempts reached" in res5.get_json()["error"]["message"]

    # 6th attempt (even with the correct code) is now rejected because challenge is consumed/locked
    res6 = client.post("/api/v1/auth/register/verify-otp", json={
        "email": "neha@example.com",
        "otp": captured["code"],
    })
    assert res6.status_code == 400


def test_verify_otp_expired(client, db_session, monkeypatch):
    """Test expired OTP (>10 mins) returns 400 with expiry message."""
    captured = {}

    def mock_send(*args, **kwargs):
        captured["code"] = kwargs.get("otp_code") or (args[1] if len(args) > 1 else None)

    monkeypatch.setattr(EmailService, "send_otp_email", mock_send)

    client.post("/api/v1/auth/register/request-otp", json={
        "name": "Aditya Rao",
        "email": "aditya@example.com",
        "password": "Password123!",
    })

    # Set expires_at in the past
    challenge = EmailOtpChallenge.query.filter_by(email="aditya@example.com").first()
    past_time = datetime.datetime.now(datetime.timezone.utc) - datetime.timedelta(minutes=15)
    challenge.expires_at = past_time
    challenge.save()

    res = client.post("/api/v1/auth/register/verify-otp", json={
        "email": "aditya@example.com",
        "otp": captured["code"],
    })
    assert res.status_code == 400
    assert "expired" in res.get_json()["error"]["message"].lower()


def test_request_otp_smtp_credentials_missing(client, db_session, monkeypatch):
    """Test clear error response when SMTP credentials are not configured."""
    monkeypatch.setenv("SMTP_USERNAME", "")
    monkeypatch.setenv("SMTP_PASSWORD", "")
    client.application.config["SMTP_USERNAME"] = ""
    client.application.config["SMTP_PASSWORD"] = ""

    res = client.post("/api/v1/auth/register/request-otp", json={
        "name": "Karan Mehra",
        "email": "karan@example.com",
        "password": "Password123!",
    })
    assert res.status_code == 503
    data = res.get_json()
    assert "Missing SMTP credentials" in data["error"]["message"]

    # Cleaned up; no challenge left to lock out user
    assert EmailOtpChallenge.query.filter_by(email="karan@example.com").first() is None


def test_request_otp_smtp_send_failure(client, db_session, monkeypatch):
    """Test clear error response when SMTP connection or send fails."""
    def mock_fail(*args, **kwargs):
        raise ServiceUnavailableError("Failed to send verification email. Please check SMTP settings or try again later.")

    monkeypatch.setattr(EmailService, "send_otp_email", mock_fail)

    res = client.post("/api/v1/auth/register/request-otp", json={
        "name": "Tanvi Jain",
        "email": "tanvi@example.com",
        "password": "Password123!",
    })
    assert res.status_code == 503
    data = res.get_json()
    assert "Failed to send verification email" in data["error"]["message"]

    # Challenge is removed on failure so the user isn't locked out
    assert EmailOtpChallenge.query.filter_by(email="tanvi@example.com").first() is None
