from flask import Blueprint, jsonify, request
from app.models.user import User
from app.utils.errors import ConflictError, ForbiddenError, NotFoundError
from app.utils.security import optional_auth
from app.utils.validators import validate_json

api_v1_bp = Blueprint("api_v1", __name__)


@api_v1_bp.route("/info", methods=["GET"])
def api_info():
    """Return API metadata and supported endpoints."""
    return jsonify({
        "name": "ExamMate AI API",
        "version": "v1",
        "description": "Tech Career & Placement Preparation Platform Backend Foundation",
        "documentation": "/api/v1/health",
    }), 200


@api_v1_bp.route("/students", methods=["GET"])
def list_students():
    """Retrieve list of registered students."""
    users = User.query.filter_by(is_active=True).all()
    return jsonify({
        "success": True,
        "count": len(users),
        "data": [user.to_dict() for user in users],
    }), 200


@api_v1_bp.route("/students", methods=["POST"])
@validate_json(
    required_fields=["name", "email"],
    field_types={"name": str, "email": str},
)
def create_student():
    """
    Register a student. Demonstrates request validation and consistent error responses.
    """
    data = request.get_json()
    email = data["email"].strip().lower()
    name = data["name"].strip()

    # Check email uniqueness
    existing = User.query.filter_by(email=email).first()
    if existing:
        raise ConflictError(
            message=f"Student with email '{email}' already exists.",
            details={"email": ["Email address is already in use."]},
        )

    user = User(
        name=name,
        email=email,
        institution=data.get("institution", "Jawaharlal Nehru University (JNU), New Delhi"),
        track=data.get("track", "Software Developer"),
        overall_progress=data.get("overall_progress", 0),
        practice_done=data.get("practice_done", 0),
        projects_built=data.get("projects_built", 0),
        streak_days=data.get("streak_days", 0),
    )
    user.save()

    return jsonify({
        "success": True,
        "message": "Student registered successfully.",
        "data": user.to_dict(),
    }), 201


@api_v1_bp.route("/students/<int:student_id>", methods=["GET"])
@optional_auth
def get_student(student_id: int):
    """
    Retrieve a single student by ID.
    Enforces privacy protection: logged in users cannot access other users' private profiles.
    """
    from flask import g
    from app.extensions import db
    user = db.session.get(User, student_id)
    if not user:
        raise NotFoundError(message=f"Student with ID {student_id} was not found.")

    # Privacy check: if logged in as another student, access is forbidden
    if g.current_user and g.current_user.id != student_id:
        raise ForbiddenError(
            message="Access denied: You cannot access or view another user's personal profile."
        )

    return jsonify({
        "success": True,
        "data": user.to_dict(),
    }), 200
