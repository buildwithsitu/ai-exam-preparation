from datetime import datetime, timezone
from typing import Any, Dict, Optional
from app.extensions import db
from app.models.base import BaseModel


class EmailOtpChallenge(BaseModel):
    """
    Stores email verification OTP challenges for user registration.
    OTP codes and unverified passwords are NEVER stored in plaintext.
    """

    __tablename__ = "email_otp_challenges"

    email = db.Column(db.String(120), nullable=False, index=True)
    otp_hash = db.Column(db.String(255), nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)

    name = db.Column(db.String(100), nullable=False)
    institution = db.Column(db.String(150), nullable=True)
    track = db.Column(db.String(50), nullable=True)

    attempts = db.Column(db.Integer, default=0, nullable=False)
    expires_at = db.Column(db.DateTime(timezone=True), nullable=False)
    last_sent_at = db.Column(
        db.DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        nullable=False,
    )
    is_consumed = db.Column(db.Boolean, default=False, nullable=False)

    def is_expired(self) -> bool:
        """Check if challenge has passed its expiration time."""
        now = datetime.now(timezone.utc)
        expires = self.expires_at
        if expires.tzinfo is None:
            expires = expires.replace(tzinfo=timezone.utc)
        return now > expires

    def can_resend(self, cooldown_seconds: int = 60) -> bool:
        """Check if the resend cooldown period has elapsed."""
        now = datetime.now(timezone.utc)
        sent = self.last_sent_at
        if sent.tzinfo is None:
            sent = sent.replace(tzinfo=timezone.utc)
        elapsed = (now - sent).total_seconds()
        return elapsed >= cooldown_seconds

    def remaining_cooldown(self, cooldown_seconds: int = 60) -> int:
        """Calculate remaining cooldown seconds (0 if ready)."""
        now = datetime.now(timezone.utc)
        sent = self.last_sent_at
        if sent.tzinfo is None:
            sent = sent.replace(tzinfo=timezone.utc)
        elapsed = (now - sent).total_seconds()
        return max(0, int(cooldown_seconds - elapsed))

    def to_dict(self) -> Dict[str, Any]:
        """Override to guarantee otp_hash and password_hash are never exposed."""
        data = super().to_dict()
        data.pop("otp_hash", None)
        data.pop("password_hash", None)
        return data
