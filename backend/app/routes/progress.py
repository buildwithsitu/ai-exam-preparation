from typing import Optional
from flask import Blueprint, jsonify, request, g
from app.services.progress_service import ProgressService
from app.utils.errors import ForbiddenError
from app.utils.security import optional_auth
from app.utils.validators import validate_json

progress_bp = Blueprint("progress", __name__)


def resolve_authorized_student_id() -> Optional[int]:
    """
    Resolve the target student ID and protect against IDOR.
    If authenticated, returns g.current_user.id.
    If an authenticated user attempts to pass someone else's student_id, raises ForbiddenError.
    """
    requested_id = request.args.get("student_id", type=int)
    if g.current_user:
        if requested_id and requested_id != g.current_user.id:
            raise ForbiddenError(
                message="Access denied: You cannot access or modify another student's progress."
            )
        return g.current_user.id
    return requested_id


@progress_bp.route("/student/progress", methods=["GET"])
@optional_auth
def get_student_progress():
    """Retrieve the current student's progress and placement KPIs."""
    student_id = resolve_authorized_student_id()
    progress_data = ProgressService.get_progress(student_id)
    return jsonify({
        "success": True,
        "data": progress_data,
    }), 200


@progress_bp.route("/student/progress", methods=["PUT"])
@optional_auth
def update_student_progress():
    """Update student progress attributes."""
    if not request.is_json:
        return jsonify({
            "success": False,
            "error": {"code": "BAD_REQUEST", "message": "Content-Type must be application/json"},
        }), 400

    student_id = resolve_authorized_student_id()
    data = request.get_json() or {}
    progress_data = ProgressService.update_progress(student_id, data)
    return jsonify({
        "success": True,
        "message": "Progress updated successfully.",
        "data": progress_data,
    }), 200


@progress_bp.route("/student/progress/reset", methods=["POST"])
@optional_auth
def reset_student_progress():
    """Reset all student progress, streak, and checklist metrics to 0%."""
    student_id = resolve_authorized_student_id()
    progress_data = ProgressService.reset_progress(student_id)
    return jsonify({
        "success": True,
        "message": "All student progress has been reset to 0%.",
        "data": progress_data,
    }), 200


@progress_bp.route("/student/progress/demo", methods=["POST"])
@optional_auth
def load_demo_student_progress():
    """Load rich demo progress for previewing dashboard features."""
    student_id = resolve_authorized_student_id()
    progress_data = ProgressService.load_demo(student_id)
    return jsonify({
        "success": True,
        "message": "Sample demo progress loaded successfully.",
        "data": progress_data,
    }), 200


@progress_bp.route("/student/progress/toggle-task", methods=["POST"])
@optional_auth
@validate_json(required_fields=["taskId"])
def toggle_student_task():
    """Toggle completion status of a daily task."""
    student_id = resolve_authorized_student_id()
    data = request.get_json()
    task_id = int(data["taskId"])
    progress_data = ProgressService.toggle_task(task_id, student_id)
    return jsonify({
        "success": True,
        "message": f"Task {task_id} toggled.",
        "data": progress_data,
    }), 200


@progress_bp.route("/student/progress/toggle-resume-step", methods=["POST"])
@optional_auth
@validate_json(required_fields=["stepIndex"])
def toggle_student_resume_step():
    """Toggle completion status of a resume checklist step."""
    student_id = resolve_authorized_student_id()
    data = request.get_json()
    step_index = int(data["stepIndex"])
    progress_data = ProgressService.toggle_resume_step(step_index, student_id)
    return jsonify({
        "success": True,
        "message": f"Resume step {step_index} toggled.",
        "data": progress_data,
    }), 200


@progress_bp.route("/student/progress/solve-problem", methods=["POST"])
@optional_auth
def solve_student_problem():
    """Record a solved coding problem and increment metrics."""
    student_id = resolve_authorized_student_id()
    progress_data = ProgressService.record_solved_problem(student_id)
    return jsonify({
        "success": True,
        "message": "Problem solved! Progress and streak incremented.",
        "data": progress_data,
    }), 200
