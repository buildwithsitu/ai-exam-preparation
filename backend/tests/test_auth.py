import pytest
from app.models.user import User


def test_register_success(client, db_session):
    """Test successful user registration returns token, user info, and sets cookie."""
    payload = {
        "name": "Alex Kumar",
        "email": "alex@example.com",
        "password": "Password123!",
        "institution": "IIT Delhi",
        "track": "Software Developer",
    }
    response = client.post("/api/v1/auth/register", json=payload)
    assert response.status_code == 201

    data = response.get_json()
    assert data["success"] is True
    assert "token" in data
    assert data["user"]["email"] == "alex@example.com"
    assert data["user"]["name"] == "Alex Kumar"
    
    # Verify password hash is never leaked
    assert "password" not in data["user"]
    assert "password_hash" not in data["user"]

    # Verify session cookie was set
    cookie_header = response.headers.get("Set-Cookie")
    assert cookie_header is not None
    assert "auth_token=" in cookie_header
    assert "HttpOnly" in cookie_header


def test_register_duplicate_email(client, db_session):
    """Test duplicate registration returns 409 Conflict."""
    payload = {
        "name": "Alex Kumar",
        "email": "alex@example.com",
        "password": "Password123!",
    }
    client.post("/api/v1/auth/register", json=payload)
    dup_res = client.post("/api/v1/auth/register", json=payload)
    assert dup_res.status_code == 409
    data = dup_res.get_json()
    assert data["success"] is False
    assert data["error"]["code"] == "CONFLICT"


def test_register_short_password(client, db_session):
    """Test password under 8 chars fails validation."""
    payload = {
        "name": "Alex Kumar",
        "email": "alex@example.com",
        "password": "short",
    }
    response = client.post("/api/v1/auth/register", json=payload)
    assert response.status_code == 400
    data = response.get_json()
    assert data["success"] is False
    assert "password" in data["error"]["details"]


def test_register_invalid_email(client, db_session):
    """Test invalid email format fails."""
    payload = {
        "name": "Alex Kumar",
        "email": "not-an-email",
        "password": "Password123!",
    }
    response = client.post("/api/v1/auth/register", json=payload)
    assert response.status_code == 400
    assert "email" in response.get_json()["error"]["details"]


def test_login_success_and_failure(client, db_session):
    """Test login with correct vs incorrect credentials."""
    # Register
    client.post("/api/v1/auth/register", json={
        "name": "Sara Chen",
        "email": "sara@example.com",
        "password": "ValidPassword999",
    })

    # 1. Success
    res = client.post("/api/v1/auth/login", json={
        "email": "sara@example.com",
        "password": "ValidPassword999",
    })
    assert res.status_code == 200
    data = res.get_json()
    assert data["success"] is True
    assert "token" in data
    assert data["user"]["email"] == "sara@example.com"

    # 2. Wrong password
    bad_res = client.post("/api/v1/auth/login", json={
        "email": "sara@example.com",
        "password": "WrongPassword",
    })
    assert bad_res.status_code == 401
    assert bad_res.get_json()["error"]["code"] == "UNAUTHORIZED"

    # 3. Nonexistent email
    notfound_res = client.post("/api/v1/auth/login", json={
        "email": "ghost@example.com",
        "password": "ValidPassword999",
    })
    assert notfound_res.status_code == 401


def test_logout(client):
    """Test logout clears auth cookie."""
    response = client.post("/api/v1/auth/logout")
    assert response.status_code == 200
    cookie_header = response.headers.get("Set-Cookie")
    assert cookie_header is not None
    # Deleting cookie sets max-age=0 or expires in past
    assert "auth_token=;" in cookie_header or "Max-Age=0" in cookie_header


def test_get_current_user_profile(client, db_session):
    """Test protected GET /api/v1/auth/me endpoint."""
    reg = client.post("/api/v1/auth/register", json={
        "name": "Rahul Verma",
        "email": "rahul@example.com",
        "password": "SecurePassword123",
    })
    token = reg.get_json()["token"]

    # 1. With Bearer token
    res = client.get("/api/v1/auth/me", headers={"Authorization": f"Bearer {token}"})
    assert res.status_code == 200
    data = res.get_json()
    assert data["success"] is True
    assert data["user"]["email"] == "rahul@example.com"
    assert "progress" in data

    # 2. Without token -> 401
    client.delete_cookie("auth_token")
    unauth_res = client.get("/api/v1/auth/me")
    assert unauth_res.status_code == 401
    assert unauth_res.get_json()["error"]["code"] == "UNAUTHORIZED"


def test_update_profile_and_change_password(client, db_session):
    """Test updating user profile details and password change workflow."""
    reg = client.post("/api/v1/auth/register", json={
        "name": "Initial Name",
        "email": "user@example.com",
        "password": "InitialPassword123",
    })
    token = reg.get_json()["token"]
    headers = {"Authorization": f"Bearer {token}"}

    # 1. Update name and track
    update_res = client.put("/api/v1/auth/profile", headers=headers, json={
        "name": "Updated Name",
        "track": "Data Analyst",
    })
    assert update_res.status_code == 200
    assert update_res.get_json()["user"]["name"] == "Updated Name"
    assert update_res.get_json()["user"]["track"] == "Data Analyst"

    # 2. Change password
    pw_res = client.put("/api/v1/auth/profile", headers=headers, json={
        "current_password": "InitialPassword123",
        "new_password": "BrandNewPassword456",
    })
    assert pw_res.status_code == 200

    # 3. Verify old password fails to login
    old_login = client.post("/api/v1/auth/login", json={
        "email": "user@example.com",
        "password": "InitialPassword123",
    })
    assert old_login.status_code == 401

    # 4. Verify new password succeeds
    new_login = client.post("/api/v1/auth/login", json={
        "email": "user@example.com",
        "password": "BrandNewPassword456",
    })
    assert new_login.status_code == 200


def test_protect_private_endpoints_against_cross_user_access(client, db_session):
    """
    Test private endpoint protection: User A cannot access or tamper with User B's data.
    """
    # Create User A
    res_a = client.post("/api/v1/auth/register", json={
        "name": "User Alpha",
        "email": "alpha@example.com",
        "password": "PasswordA123",
    })
    token_a = res_a.get_json()["token"]
    user_a_id = res_a.get_json()["user"]["id"]

    # Create User B
    res_b = client.post("/api/v1/auth/register", json={
        "name": "User Beta",
        "email": "beta@example.com",
        "password": "PasswordB123",
    })
    user_b_id = res_b.get_json()["user"]["id"]

    headers_a = {"Authorization": f"Bearer {token_a}"}

    # User A tries to view User B's profile directly via /api/v1/students/<id>
    cross_res = client.get(f"/api/v1/students/{user_b_id}", headers=headers_a)
    assert cross_res.status_code == 403
    assert cross_res.get_json()["error"]["code"] == "FORBIDDEN"

    # User A can view their own profile
    own_res = client.get(f"/api/v1/students/{user_a_id}", headers=headers_a)
    assert own_res.status_code == 200
    assert own_res.get_json()["data"]["email"] == "alpha@example.com"

    # User A tries to tamper with User B's progress by passing student_id=user_b_id
    tamper_res = client.post(
        f"/api/v1/student/progress/reset?student_id={user_b_id}",
        headers=headers_a,
    )
    assert tamper_res.status_code == 403
    assert tamper_res.get_json()["error"]["code"] == "FORBIDDEN"
