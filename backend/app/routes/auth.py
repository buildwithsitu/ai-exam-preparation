import os
from flask import Blueprint, jsonify, make_response, request, g
from app.services.auth_service import AuthService
from app.utils.security import require_auth
from app.utils.validators import validate_json

auth_bp = Blueprint("auth", __name__)


def is_production() -> bool:
    return os.getenv("FLASK_ENV", "").lower() == "production"


def create_auth_response(user, token, expires_at, status_code=200, message="Success"):
    """
    Generate response containing auth token in JSON body
    AND setting an HttpOnly, SameSite cookie for seamless dual-mode auth.
    """
    payload = {
        "success": True,
        "message": message,
        "token": token,
        "expiresAt": expires_at.isoformat(),
        "user": user.to_auth_dict(),
    }
    response = make_response(jsonify(payload), status_code)
    
    # Set secure HttpOnly session cookie
    response.set_cookie(
        "auth_token",
        token,
        httponly=True,
        samesite="Lax",
        secure=is_production(),
        expires=expires_at,
        path="/",
    )
    return response


@auth_bp.route("/auth/register", methods=["POST"])
@validate_json(
    required_fields=["name", "email", "password"],
    field_types={"name": str, "email": str, "password": str},
)
def register():
    """
    Register a new user account with hashed password.
    Returns auth token and user profile, setting session cookie.
    """
    data = request.get_json()
    user, token, expires_at = AuthService.register(
        name=data["name"],
        email=data["email"],
        password=data["password"],
        institution=data.get("institution"),
        track=data.get("track"),
    )
    return create_auth_response(
        user=user,
        token=token,
        expires_at=expires_at,
        status_code=201,
        message="Account registered successfully.",
    )


@auth_bp.route("/auth/register/request-otp", methods=["POST"])
@validate_json(
    required_fields=["name", "email", "password"],
    field_types={"name": str, "email": str, "password": str},
)
def request_registration_otp():
    """
    Initiate registration by generating and emailing a 6-digit OTP.
    Enforces validation, uniqueness, and a 60-second resend cooldown.
    """
    data = request.get_json()
    result = AuthService.request_registration_otp(
        name=data["name"],
        email=data["email"],
        password=data["password"],
        institution=data.get("institution"),
        track=data.get("track"),
    )
    return jsonify(result), 200


@auth_bp.route("/auth/register/verify-otp", methods=["POST"])
@validate_json(
    required_fields=["email", "otp"],
    field_types={"email": str, "otp": str},
)
def verify_registration_otp():
    """
    Verify single-use email OTP code and complete user account registration.
    Sets HttpOnly session cookie and returns auth token.
    """
    data = request.get_json()
    user, token, expires_at = AuthService.verify_registration_otp(
        email=data["email"],
        otp=data["otp"],
    )
    return create_auth_response(
        user=user,
        token=token,
        expires_at=expires_at,
        status_code=201,
        message="Email verified and account registered successfully.",
    )


@auth_bp.route("/auth/login", methods=["POST"])
@validate_json(
    required_fields=["email", "password"],
    field_types={"email": str, "password": str},
)
def login():
    """
    Authenticate user credentials against stored PBKDF2 password hash.
    Returns auth token and user profile, setting session cookie.
    """
    data = request.get_json()
    user, token, expires_at = AuthService.login(
        email=data["email"],
        password=data["password"],
    )
    return create_auth_response(
        user=user,
        token=token,
        expires_at=expires_at,
        status_code=200,
        message="Logged in successfully.",
    )


@auth_bp.route("/auth/logout", methods=["POST"])
def logout():
    """
    Clear session cookie and terminate client session.
    """
    response = make_response(jsonify({
        "success": True,
        "message": "Successfully logged out.",
    }), 200)
    response.delete_cookie("auth_token", path="/")
    return response


@auth_bp.route("/auth/me", methods=["GET"])
@require_auth
def get_current_user_profile():
    """
    Protected endpoint: Return the authenticated user profile and progress stats.
    """
    user = g.current_user
    return jsonify({
        "success": True,
        "user": user.to_auth_dict(),
        "progress": user.to_progress_dict(),
    }), 200


@auth_bp.route("/auth/profile", methods=["PUT"])
@require_auth
def update_profile():
    """
    Protected endpoint: Update the signed-in user's profile and/or password.
    """
    if not request.is_json:
        return jsonify({
            "success": False,
            "error": {"code": "BAD_REQUEST", "message": "Content-Type must be application/json"},
        }), 400

    data = request.get_json() or {}
    updated_user = AuthService.update_profile(g.current_user.id, data)
    return jsonify({
        "success": True,
        "message": "Profile updated successfully.",
        "user": updated_user.to_auth_dict(),
    }), 200
