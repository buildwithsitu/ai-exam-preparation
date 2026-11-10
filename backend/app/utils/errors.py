from datetime import datetime, timezone
from typing import Any, Dict, Optional
from flask import Flask, jsonify, request
from werkzeug.exceptions import HTTPException


def get_current_iso_timestamp() -> str:
    """Return the current UTC timestamp formatted as ISO-8601."""
    return datetime.now(timezone.utc).isoformat()


def format_error_response(
    code: str,
    message: str,
    details: Optional[Dict[str, Any]] = None,
    status_code: int = 500,
):
    """Generate a consistent, structured JSON error response."""
    payload = {
        "success": False,
        "error": {
            "code": code,
            "message": message,
            "details": details,
        },
        "path": request.path if request else "",
        "timestamp": get_current_iso_timestamp(),
    }
    return jsonify(payload), status_code


class APIError(Exception):
    """Base exception for application-level API errors."""

    status_code: int = 500
    code: str = "INTERNAL_SERVER_ERROR"

    def __init__(
        self,
        message: str = "An unexpected error occurred.",
        details: Optional[Dict[str, Any]] = None,
        status_code: Optional[int] = None,
        code: Optional[str] = None,
    ):
        super().__init__(message)
        self.message = message
        self.details = details
        if status_code is not None:
            self.status_code = status_code
        if code is not None:
            self.code = code

    def to_response(self):
        return format_error_response(
            code=self.code,
            message=self.message,
            details=self.details,
            status_code=self.status_code,
        )


class BadRequestError(APIError):
    status_code = 400
    code = "BAD_REQUEST"


class UnauthorizedError(APIError):
    status_code = 401
    code = "UNAUTHORIZED"


class ForbiddenError(APIError):
    status_code = 403
    code = "FORBIDDEN"


class ValidationError(APIError):
    status_code = 422
    code = "VALIDATION_ERROR"


class NotFoundError(APIError):
    status_code = 404
    code = "NOT_FOUND"


class MethodNotAllowedError(APIError):
    status_code = 405
    code = "METHOD_NOT_ALLOWED"


class ConflictError(APIError):
    status_code = 409
    code = "CONFLICT"


class ServiceUnavailableError(APIError):
    status_code = 503
    code = "SERVICE_UNAVAILABLE"


def register_error_handlers(app: Flask) -> None:
    """Register uniform JSON error handlers across the Flask application."""

    @app.errorhandler(APIError)
    def handle_api_error(error: APIError):
        return error.to_response()

    @app.errorhandler(400)
    def handle_400(error):
        message = getattr(error, "description", "Bad Request")
        return format_error_response("BAD_REQUEST", message, status_code=400)

    @app.errorhandler(404)
    def handle_404(error):
        message = getattr(error, "description", "The requested resource was not found.")
        return format_error_response("NOT_FOUND", message, status_code=404)

    @app.errorhandler(405)
    def handle_405(error):
        message = getattr(error, "description", "The method is not allowed for the requested URL.")
        return format_error_response("METHOD_NOT_ALLOWED", message, status_code=405)

    @app.errorhandler(422)
    def handle_422(error):
        message = getattr(error, "description", "Unprocessable Entity")
        return format_error_response("VALIDATION_ERROR", message, status_code=422)

    @app.errorhandler(500)
    def handle_500(error):
        app.logger.exception("Internal Server Error: %s", error)
        message = "An internal server error occurred. Please try again later."
        return format_error_response("INTERNAL_SERVER_ERROR", message, status_code=500)

    @app.errorhandler(HTTPException)
    def handle_http_exception(error: HTTPException):
        code = getattr(error, "name", "HTTP_ERROR").upper().replace(" ", "_")
        return format_error_response(
            code=code,
            message=error.description,
            status_code=error.code or 500,
        )

    try:
        from sqlalchemy.exc import OperationalError

        @app.errorhandler(OperationalError)
        def handle_operational_error(error: OperationalError):
            app.logger.exception("Database Operational Error: %s", error)
            return format_error_response(
                code="DATABASE_UNAVAILABLE",
                message="Database connection refused. If using PostgreSQL, ensure it is running (e.g. docker compose -f backend/docker-compose.yml up -d) or configure SQLite.",
                status_code=503,
            )
    except ImportError:
        pass

    @app.errorhandler(Exception)
    def handle_generic_exception(error: Exception):
        app.logger.exception("Uncaught Exception: %s", error)
        # If debug mode, provide detailed exception text to assist development
        debug_mode = False
        try:
            from flask import current_app
            debug_mode = bool(current_app and current_app.config.get("DEBUG"))
        except Exception:
            pass

        err_msg = str(error) if debug_mode else "An unexpected internal error occurred."
        return format_error_response(
            code="INTERNAL_SERVER_ERROR",
            message=err_msg,
            status_code=500,
        )
