from typing import Any, Dict, Optional
from sqlalchemy.orm.attributes import flag_modified
from app.extensions import db
from app.models.user import User, default_tasks, default_resume_steps
from app.utils.errors import NotFoundError


class ProgressService:
    """Service to manage student placement progress, streaks, and checklists."""

    DEFAULT_STUDENT_EMAIL = "situsavvy1111@gmail.com"
    DEFAULT_STUDENT_NAME = "Situ Chandra"

    @classmethod
    def get_or_create_default_student(cls) -> User:
        """Fetch primary student or auto-seed Situ Chandra if table is empty."""
        user = User.query.filter_by(email=cls.DEFAULT_STUDENT_EMAIL).first()
        if not user:
            user = User(
                name=cls.DEFAULT_STUDENT_NAME,
                email=cls.DEFAULT_STUDENT_EMAIL,
                institution="Jawaharlal Nehru University (JNU), New Delhi",
                track="Software Developer",
                overall_progress=0,
                practice_done=0,
                projects_built=0,
                streak_days=0,
                tasks=default_tasks(),
                resume_steps=default_resume_steps(),
            )
            user.save()
        return user

    @classmethod
    def get_student(cls, student_id: Optional[int] = None) -> User:
        """Retrieve student by ID or fall back to default student."""
        if student_id is not None:
            user = db.session.get(User, student_id)
            if not user:
                raise NotFoundError(message=f"Student with ID {student_id} not found.")
            return user
        return cls.get_or_create_default_student()

    @classmethod
    def get_progress(cls, student_id: Optional[int] = None) -> Dict[str, Any]:
        """Get formatted student progress."""
        user = cls.get_student(student_id)
        return user.to_progress_dict()

    @classmethod
    def update_progress(cls, student_id: Optional[int], data: Dict[str, Any]) -> Dict[str, Any]:
        """Update student progress fields from payload."""
        user = cls.get_student(student_id)

        # Mapping of frontend camelCase to model snake_case
        field_mapping = {
            "overallProgress": "overall_progress",
            "practiceDone": "practice_done",
            "projectsBuilt": "projects_built",
            "streakDays": "streak_days",
            "webDevProgress": "web_dev_progress",
            "dsaProgress": "dsa_progress",
            "jsProgress": "js_progress",
            "reactProgress": "react_progress",
            "pythonProgress": "python_progress",
            "sqlProgress": "sql_progress",
            "problemsSolved": "problems_solved",
            "accuracyPercent": "accuracy_percent",
            "practiceStreak": "practice_streak",
            "tasks": "tasks",
            "resumeSteps": "resume_steps",
            "recentMock": "recent_mock",
        }

        for frontend_key, model_key in field_mapping.items():
            if frontend_key in data:
                val = data[frontend_key]
                if isinstance(val, int) and "progress" in model_key:
                    val = max(0, min(100, val))
                setattr(user, model_key, val)
                if model_key in ("tasks", "resume_steps", "recent_mock"):
                    flag_modified(user, model_key)

        user.save()
        return user.to_progress_dict()

    @classmethod
    def reset_progress(cls, student_id: Optional[int] = None) -> Dict[str, Any]:
        """Reset student progress to 0%."""
        user = cls.get_student(student_id)
        user.reset_progress()
        return user.to_progress_dict()

    @classmethod
    def load_demo(cls, student_id: Optional[int] = None) -> Dict[str, Any]:
        """Load sample demo data for preview."""
        user = cls.get_student(student_id)
        user.load_demo_progress()
        return user.to_progress_dict()

    @classmethod
    def toggle_task(cls, task_id: int, student_id: Optional[int] = None) -> Dict[str, Any]:
        """Toggle completion of a daily task."""
        user = cls.get_student(student_id)
        current_tasks = [dict(t) for t in (user.tasks or default_tasks())]

        task_found = False
        was_done = False
        for task in current_tasks:
            if task.get("id") == task_id:
                task_found = True
                task["done"] = not task.get("done", False)
                was_done = task["done"]
                break

        if not task_found:
            raise NotFoundError(message=f"Task with ID {task_id} not found.")

        user.tasks = current_tasks
        flag_modified(user, "tasks")
        user.overall_progress = min(100, max(0, user.overall_progress + (5 if was_done else -5)))
        user.save()

        return user.to_progress_dict()

    @classmethod
    def toggle_resume_step(cls, step_index: int, student_id: Optional[int] = None) -> Dict[str, Any]:
        """Toggle completion of a resume checklist step."""
        user = cls.get_student(student_id)
        current_steps = [dict(s) for s in (user.resume_steps or default_resume_steps())]

        if step_index < 0 or step_index >= len(current_steps):
            raise NotFoundError(message=f"Resume step index {step_index} out of range.")

        current_steps[step_index]["completed"] = not current_steps[step_index].get("completed", False)
        user.resume_steps = current_steps
        flag_modified(user, "resume_steps")
        user.save()

        return user.to_progress_dict()

    @classmethod
    def record_solved_problem(cls, student_id: Optional[int] = None) -> Dict[str, Any]:
        """Increment solved problem metrics."""
        user = cls.get_student(student_id)
        user.problems_solved += 1
        user.practice_done += 1
        user.streak_days = max(1, user.streak_days)
        user.practice_streak = max(1, user.practice_streak + 1)
        user.overall_progress = min(100, user.overall_progress + 2)
        
        if user.accuracy_percent == 0:
            user.accuracy_percent = 100
        else:
            user.accuracy_percent = min(100, round((user.accuracy_percent + 100) / 2))

        user.save()
        return user.to_progress_dict()
