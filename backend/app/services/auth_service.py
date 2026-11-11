import datetime
import re
from typing import Any, Dict, Optional, Tuple
from app.extensions import db
from app.models.user import User, default_tasks, default_resume_steps
from app.models.otp import EmailOtpChallenge
from app.services.email_service import EmailService
from app.utils.errors import (
    BadRequestError,
    ConflictError,
    NotFoundError,
    TooManyRequestsError,
    UnauthorizedError,
)
from app.utils.security import (
    generate_auth_token,
    generate_otp,
    hash_otp,
    hash_password,
    verify_otp,
)


EMAIL_REGEX = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")


class AuthService:
    """Service handling user registration, authentication, and profile updates."""

    @classmethod
    def request_registration_otp(
        cls,
        name: str,
        email: str,
        password: str,
        institution: Optional[str] = None,
        track: Optional[str] = None,
    ) -> Dict[str, Any]:
        """
        Validate registration data, enforce 60s cooldown, hash unverified password & OTP,
        and dispatch OTP via email. User is NOT created yet.
        """
        clean_name = (name or "").strip()
        clean_email = (email or "").strip().lower()

        if not clean_name:
            raise BadRequestError(
                message="Validation failed.",
                details={"name": ["Full name is required."]},
            )

        if not clean_email or not EMAIL_REGEX.match(clean_email):
            raise BadRequestError(
                message="Validation failed.",
                details={"email": ["A valid email address is required."]},
            )

        if not password or len(password) < 8:
            raise BadRequestError(
                message="Validation failed.",
                details={"password": ["Password must be at least 8 characters long."]},
            )

        # Check existing registered user
        existing_user = User.query.filter_by(email=clean_email).first()
        if existing_user:
            raise ConflictError(
                message=f"An account with email '{clean_email}' already exists.",
                details={"email": ["Email address is already registered."]},
            )

        # Enforce 60-second cooldown on the most recent challenge for this email
        recent_challenge = (
            EmailOtpChallenge.query.filter_by(email=clean_email)
            .order_by(EmailOtpChallenge.id.desc())
            .first()
        )
        if recent_challenge and not recent_challenge.can_resend(cooldown_seconds=60):
            wait_seconds = recent_challenge.remaining_cooldown(cooldown_seconds=60)
            raise TooManyRequestsError(
                message=f"Please wait {wait_seconds} seconds before requesting another verification code.",
                details={"retry_after": wait_seconds},
            )

        # Invalidate previous unconsumed challenges for this email
        EmailOtpChallenge.query.filter_by(email=clean_email, is_consumed=False).update(
            {"is_consumed": True}
        )

        # Generate 6-digit OTP code using secrets module
        otp_code = generate_otp(6)
        otp_h = hash_otp(otp_code)
        pwd_h = hash_password(password)  # Secure PBKDF2 hash, never plaintext!

        now = datetime.datetime.now(datetime.timezone.utc)
        expires_at = now + datetime.timedelta(minutes=10)

        challenge = EmailOtpChallenge(
            email=clean_email,
            otp_hash=otp_h,
            password_hash=pwd_h,
            name=clean_name,
            institution=institution or "Jawaharlal Nehru University (JNU), New Delhi",
            track=track or "Software Developer",
            attempts=0,
            expires_at=expires_at,
            last_sent_at=now,
            is_consumed=False,
        )
        db.session.add(challenge)
        db.session.commit()

        # Send email via EmailService. If delivery fails or SMTP unconfigured,
        # roll back the challenge so it doesn't block future requests.
        try:
            EmailService.send_otp_email(
                recipient_email=clean_email,
                otp_code=otp_code,
                recipient_name=clean_name,
            )
        except Exception:
            db.session.delete(challenge)
            db.session.commit()
            raise

        return {
            "success": True,
            "message": f"Verification code sent to {clean_email}.",
            "email": clean_email,
            "cooldownSeconds": 60,
            "expiresInMinutes": 10,
        }

    @classmethod
    def verify_registration_otp(
        cls,
        email: str,
        otp: str,
    ) -> Tuple[User, str, datetime.datetime]:
        """
        Verify single-use OTP code and create the User account.
        Enforces 10-minute expiry, max 5 attempts, and constant-time comparison.
        """
        clean_email = (email or "").strip().lower()
        clean_otp = (otp or "").strip()

        if not clean_email or not EMAIL_REGEX.match(clean_email):
            raise BadRequestError(
                message="Validation failed.",
                details={"email": ["A valid email address is required."]},
            )

        if not clean_otp:
            raise BadRequestError(
                message="Validation failed.",
                details={"otp": ["Verification code is required."]},
            )

        # Find latest unconsumed challenge for this email
        challenge = (
            EmailOtpChallenge.query.filter_by(email=clean_email, is_consumed=False)
            .order_by(EmailOtpChallenge.id.desc())
            .first()
        )
        if not challenge:
            raise BadRequestError(
                message="No pending verification code found for this email. Please request a new code."
            )

        # Check expiration (10 minutes)
        if challenge.is_expired():
            challenge.is_consumed = True
            challenge.save()
            raise BadRequestError(
                message="Verification code has expired. Please request a new code."
            )

        # Check maximum verification attempts (5 attempts limit)
        if challenge.attempts >= 5:
            challenge.is_consumed = True
            challenge.save()
            raise TooManyRequestsError(
                message="Maximum verification attempts exceeded. Please request a new code."
            )

        # Verify OTP code using constant-time comparison
        is_valid = verify_otp(clean_otp, challenge.otp_hash)
        if not is_valid:
            challenge.attempts += 1
            challenge.save()
            remaining = max(0, 5 - challenge.attempts)
            if remaining == 0:
                challenge.is_consumed = True
                challenge.save()
                raise BadRequestError(
                    message="Invalid verification code. Maximum attempts reached. Please request a new code."
                )
            raise BadRequestError(
                message=f"Invalid verification code. {remaining} attempt{'s' if remaining != 1 else ''} remaining.",
                details={"remainingAttempts": remaining},
            )

        # Single-use code: mark consumed
        challenge.is_consumed = True
        challenge.save()

        # Prevent race condition: ensure email is not already registered
        existing = User.query.filter_by(email=clean_email).first()
        if existing:
            raise ConflictError(
                message=f"An account with email '{clean_email}' already exists."
            )

        # Create user account with pre-hashed password
        user = User(
            name=challenge.name,
            email=clean_email,
            password_hash=challenge.password_hash,
            institution=challenge.institution or "Jawaharlal Nehru University (JNU), New Delhi",
            track=challenge.track or "Software Developer",
            overall_progress=0,
            practice_done=0,
            projects_built=0,
            streak_days=0,
            tasks=default_tasks(),
            resume_steps=default_resume_steps(),
        )
        user.save()

        token, expires_at = generate_auth_token(user.id, user.email)
        return user, token, expires_at

    @classmethod
    def register(
        cls,
        name: str,
        email: str,
        password: str,
        institution: Optional[str] = None,
        track: Optional[str] = None,
    ) -> Tuple[User, str, datetime.datetime]:
        """
        Register a new user account with a secure password hash.
        """
        clean_name = (name or "").strip()
        clean_email = (email or "").strip().lower()

        if not clean_name:
            raise BadRequestError(
                message="Validation failed.",
                details={"name": ["Full name is required."]},
            )

        if not clean_email or not EMAIL_REGEX.match(clean_email):
            raise BadRequestError(
                message="Validation failed.",
                details={"email": ["A valid email address is required."]},
            )

        if not password or len(password) < 8:
            raise BadRequestError(
                message="Validation failed.",
                details={"password": ["Password must be at least 8 characters long."]},
            )

        # Check existing user
        existing = User.query.filter_by(email=clean_email).first()
        if existing:
            raise ConflictError(
                message=f"An account with email '{clean_email}' already exists.",
                details={"email": ["Email address is already registered."]},
            )

        user = User(
            name=clean_name,
            email=clean_email,
            institution=institution or "Jawaharlal Nehru University (JNU), New Delhi",
            track=track or "Software Developer",
            overall_progress=0,
            practice_done=0,
            projects_built=0,
            streak_days=0,
            tasks=default_tasks(),
            resume_steps=default_resume_steps(),
        )
        user.set_password(password)
        user.save()

        token, expires_at = generate_auth_token(user.id, user.email)
        return user, token, expires_at

    @classmethod
    def login(
        cls,
        email: str,
        password: str,
    ) -> Tuple[User, str, datetime.datetime]:
        """
        Authenticate a user by verifying their email and password hash.
        """
        clean_email = (email or "").strip().lower()
        if not clean_email or not password:
            raise UnauthorizedError(message="Please provide both email and password.")

        user = User.query.filter_by(email=clean_email).first()
        if not user or not user.is_active:
            raise UnauthorizedError(message="Invalid email or password.")

        if not user.check_password(password):
            raise UnauthorizedError(message="Invalid email or password.")

        token, expires_at = generate_auth_token(user.id, user.email)
        return user, token, expires_at

    @classmethod
    def get_profile(cls, user_id: int) -> User:
        """Fetch user by ID."""
        user = db.session.get(User, user_id)
        if not user or not user.is_active:
            raise NotFoundError(message="User account not found.")
        return user

    @classmethod
    def update_profile(cls, user_id: int, data: Dict[str, Any]) -> User:
        """
        Update user profile information and optional password change.
        """
        user = cls.get_profile(user_id)

        if "name" in data and data["name"]:
            user.name = data["name"].strip()

        if "institution" in data and data["institution"]:
            user.institution = data["institution"].strip()

        if "track" in data and data["track"]:
            user.track = data["track"].strip()

        # Handle password change
        if "new_password" in data and data["new_password"]:
            current_pw = data.get("current_password")
            if not current_pw or not user.check_password(current_pw):
                raise BadRequestError(
                    message="Password change failed.",
                    details={"current_password": ["Current password is incorrect."]},
                )

            new_pw = data["new_password"]
            if len(new_pw) < 8:
                raise BadRequestError(
                    message="Password change failed.",
                    details={"new_password": ["New password must be at least 8 characters long."]},
                )

            user.set_password(new_pw)

        user.save()
        return user
