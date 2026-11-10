from flask import Flask
from app.routes.health import health_bp
from app.routes.api_v1 import api_v1_bp
from app.routes.progress import progress_bp
from app.routes.auth import auth_bp


def register_routes(app: Flask) -> None:
    """Register all application blueprints with their respective URL prefixes."""
    app.register_blueprint(health_bp, url_prefix="/api/v1")
    app.register_blueprint(api_v1_bp, url_prefix="/api/v1")
    app.register_blueprint(progress_bp, url_prefix="/api/v1")
    app.register_blueprint(auth_bp, url_prefix="/api/v1")


__all__ = ["health_bp", "api_v1_bp", "progress_bp", "auth_bp", "register_routes"]
