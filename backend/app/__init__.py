import os
from typing import Optional
from flask import Flask, jsonify, redirect
from app.config import get_config
from app.extensions import cors, db, migrate
from app.models import BaseModel, User
from app.routes import register_routes
from app.utils.errors import register_error_handlers


def create_app(config_name: Optional[str] = None) -> Flask:
    """
    Application factory for ExamMate AI Flask Backend.

    Args:
        config_name: 'development', 'testing', or 'production'.
                     Defaults to FLASK_ENV environment variable.
    """
    app = Flask(__name__)

    # 1. Load configuration
    cfg = get_config(config_name)
    app.config.from_object(cfg)

    # 2. Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    cors.init_app(
        app,
        origins=app.config.get("CORS_ORIGINS", "*"),
        supports_credentials=True,
    )

    # 3. Register centralized error handlers
    register_error_handlers(app)

    # 4. Register API route blueprints
    register_routes(app)

    # 5. Root endpoint
    @app.route("/", methods=["GET"])
    def index():
        return jsonify({
            "name": app.config.get("APP_NAME", "ExamMate AI Backend"),
            "version": app.config.get("APP_VERSION", "1.0.0"),
            "status": "online",
            "health_check": "/api/v1/health",
            "documentation": "See backend/README.md",
        }), 200

    # 6. Shell context for CLI (`flask shell`)
    @app.shell_context_processor
    def make_shell_context():
        return {
            "db": db,
            "User": User,
            "BaseModel": BaseModel,
        }

    # 7. Auto-create tables in development/SQLite if not existing
    with app.app_context():
        try:
            db.create_all()
        except Exception as exc:
            app.logger.debug("Auto db.create_all() note: %s", exc)

    return app
