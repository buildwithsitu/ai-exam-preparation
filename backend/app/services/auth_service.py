import datetime
import re
from typing import Any, Dict, Optional, Tuple
from app.extensions import db
from app.models.user import User, default_tasks, default_resume_steps
from app.utils.errors import BadRequestError, ConflictError, NotFoundError, UnauthorizedError
from app.utils.security import generate_auth_token


EMAIL_REGEX = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")


class AuthService:
    """Service handling user registration, authentication, and profile updates."""

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
