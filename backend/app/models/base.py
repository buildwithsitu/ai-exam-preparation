from datetime import datetime, timezone
from typing import Any, Dict
from app.extensions import db


class BaseModel(db.Model):
    """Abstract base model with primary key, timestamps, and utility methods."""

    __abstract__ = True

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    created_at = db.Column(
        db.DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        nullable=False,
    )
    updated_at = db.Column(
        db.DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
        nullable=False,
    )

    def save(self) -> "BaseModel":
        """Persist model instance to database."""
        db.session.add(self)
        db.session.commit()
        return self

    def delete(self) -> None:
        """Remove model instance from database."""
        db.session.delete(self)
        db.session.commit()

    def to_dict(self) -> Dict[str, Any]:
        """Serialize model columns to dictionary."""
        data = {}
        for column in self.__table__.columns:
            val = getattr(self, column.name)
            if isinstance(val, datetime):
                data[column.name] = val.isoformat()
            else:
                data[column.name] = val
        return data
