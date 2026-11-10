from typing import Any, Dict, List, Optional
from app.extensions import db
from app.models.base import BaseModel
from app.utils.security import hash_password, verify_password


def default_tasks() -> List[Dict[str, Any]]:
    return [
        {"id": 1, "text": "Solve 5 DSA problems", "done": False},
        {"id": 2, "text": "Complete React module", "done": False},
        {"id": 3, "text": "Update your resume", "done": False},
    ]


def default_resume_steps() -> List[Dict[str, Any]]:
    return [
        {"title": "Add Personal Details", "completed": False},
        {"title": "Add Education", "completed": False},
        {"title": "Add Skills", "completed": False},
        {"title": "Add Projects", "completed": False},
        {"title": "Review & Download", "completed": False},
    ]


class User(BaseModel):
    """Student and user entity model for ExamMate AI."""

    __tablename__ = "users"

    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False, index=True)
    password_hash = db.Column(db.String(255), nullable=True)

    institution = db.Column(
        db.String(150),
        default="Jawaharlal Nehru University (JNU), New Delhi",
        nullable=False,
    )
    track = db.Column(db.String(50), default="Software Developer", nullable=False)

    # Core Dashboard KPIs
    overall_progress = db.Column(db.Integer, default=0, nullable=False)
    practice_done = db.Column(db.Integer, default=0, nullable=False)
    projects_built = db.Column(db.Integer, default=0, nullable=False)
    streak_days = db.Column(db.Integer, default=0, nullable=False)

    # Topic-wise Progress
    web_dev_progress = db.Column(db.Integer, default=0, nullable=False)
    dsa_progress = db.Column(db.Integer, default=0, nullable=False)
    js_progress = db.Column(db.Integer, default=0, nullable=False)
    react_progress = db.Column(db.Integer, default=0, nullable=False)
    python_progress = db.Column(db.Integer, default=0, nullable=False)
    sql_progress = db.Column(db.Integer, default=0, nullable=False)

    # Coding Practice Metrics
    problems_solved = db.Column(db.Integer, default=0, nullable=False)
    accuracy_percent = db.Column(db.Integer, default=0, nullable=False)
    practice_streak = db.Column(db.Integer, default=0, nullable=False)

    # Structured Checklists & Activity (JSON format)
    tasks = db.Column(db.JSON, default=default_tasks, nullable=False)
    resume_steps = db.Column(db.JSON, default=default_resume_steps, nullable=False)
    recent_mock = db.Column(db.JSON, nullable=True)

    is_active = db.Column(db.Boolean, default=True, nullable=False)

    def set_password(self, password: str) -> None:
        """Hash and store user password."""
        self.password_hash = hash_password(password)

    def check_password(self, password: str) -> bool:
        """Verify plain password against stored hash."""
        if not self.password_hash:
            return False
        return verify_password(password, self.password_hash)

    def to_auth_dict(self) -> Dict[str, Any]:
        """Safe representation of user for auth responses."""
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "institution": self.institution,
            "track": self.track,
            "overallProgress": self.overall_progress,
            "practiceDone": self.practice_done,
            "projectsBuilt": self.projects_built,
            "streakDays": self.streak_days,
            "isActive": self.is_active,
            "createdAt": self.created_at.isoformat() if self.created_at else None,
            "updatedAt": self.updated_at.isoformat() if self.updated_at else None,
        }

    def to_dict(self) -> Dict[str, Any]:
        """Override to guarantee password_hash is never exposed in output."""
        data = super().to_dict()
        data.pop("password_hash", None)
        return data

    def to_progress_dict(self) -> Dict[str, Any]:
        """Format progress matching frontend React StudentProgressState."""
        return {
            "overallProgress": self.overall_progress,
            "practiceDone": self.practice_done,
            "projectsBuilt": self.projects_built,
            "streakDays": self.streak_days,
            "webDevProgress": self.web_dev_progress,
            "dsaProgress": self.dsa_progress,
            "jsProgress": self.js_progress,
            "reactProgress": self.react_progress,
            "pythonProgress": self.python_progress,
            "sqlProgress": self.sql_progress,
            "problemsSolved": self.problems_solved,
            "accuracyPercent": self.accuracy_percent,
            "practiceStreak": self.practice_streak,
            "tasks": self.tasks or default_tasks(),
            "resumeSteps": self.resume_steps or default_resume_steps(),
            "recentMock": self.recent_mock,
            "student": {
                "id": self.id,
                "name": self.name,
                "email": self.email,
                "institution": self.institution,
                "track": self.track,
            },
        }

    def reset_progress(self) -> None:
        """Reset all metrics and checklists to clean 0% state."""
        self.overall_progress = 0
        self.practice_done = 0
        self.projects_built = 0
        self.streak_days = 0
        self.web_dev_progress = 0
        self.dsa_progress = 0
        self.js_progress = 0
        self.react_progress = 0
        self.python_progress = 0
        self.sql_progress = 0
        self.problems_solved = 0
        self.accuracy_percent = 0
        self.practice_streak = 0
        self.tasks = default_tasks()
        self.resume_steps = default_resume_steps()
        self.recent_mock = None
        self.save()

    def load_demo_progress(self) -> None:
        """Load rich sample progress data for preview/testing."""
        self.overall_progress = 56
        self.practice_done = 24
        self.projects_built = 3
        self.streak_days = 15
        self.web_dev_progress = 72
        self.dsa_progress = 40
        self.js_progress = 60
        self.react_progress = 40
        self.python_progress = 65
        self.sql_progress = 55
        self.problems_solved = 180
        self.accuracy_percent = 58
        self.practice_streak = 12
        self.tasks = [
            {"id": 1, "text": "Solve 5 DSA problems", "done": True},
            {"id": 2, "text": "Complete React module", "done": False},
            {"id": 3, "text": "Update your resume", "done": False},
        ]
        self.resume_steps = [
            {"title": "Add Personal Details", "completed": True},
            {"title": "Add Education", "completed": True},
            {"title": "Add Skills", "completed": True},
            {"title": "Add Projects", "completed": True},
            {"title": "Review & Download", "completed": False},
        ]
        self.recent_mock = {
            "title": "DSA Mock Interview",
            "date": "Oct 30, 2026",
            "score": 78,
        }
        self.save()

    def __repr__(self) -> str:
        return f"<User {self.email} ({self.track})>"
