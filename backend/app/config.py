import os
from typing import List


def normalize_database_url(url: str | None) -> str | None:
    """Ensure PostgreSQL URLs use the psycopg2 driver dialect."""
    if not url:
        return url
    if url.startswith("postgres://"):
        return url.replace("postgres://", "postgresql+psycopg2://", 1)
    if url.startswith("postgresql://") and not url.startswith("postgresql+"):
        return url.replace("postgresql://", "postgresql+psycopg2://", 1)
    return url


class BaseConfig:
    """Base configuration shared across all environments."""

    APP_NAME: str = os.getenv("APP_NAME", "ExamMate AI Backend")
    APP_VERSION: str = os.getenv("APP_VERSION", "1.0.0")
    SECRET_KEY: str = os.getenv("SECRET_KEY", "dev-secret-key-change-in-production")
    
    # SQLAlchemy
    SQLALCHEMY_TRACK_MODIFICATIONS: bool = False
    SQLALCHEMY_ENGINE_OPTIONS = {
        "pool_pre_ping": True,
        "pool_recycle": 300,
    }

    # CORS
    _raw_cors = os.getenv("CORS_ORIGINS", "http://localhost:5173,http://127.0.0.1:5173")
    CORS_ORIGINS: List[str] = [origin.strip() for origin in _raw_cors.split(",") if origin.strip()]


class _ConfigUriProperty:
    """Descriptor that evaluates database URI dynamically at property access time."""

    def __init__(self, getter):
        self.getter = getter

    def __get__(self, obj, cls=None):
        return self.getter()


class DevelopmentConfig(BaseConfig):
    """Configuration for local development."""

    DEBUG: bool = True
    TESTING: bool = False
    ENV: str = "development"

    default_dev_db = "postgresql+psycopg2://postgres:postgres@localhost:5432/exammate_dev"

    @_ConfigUriProperty
    def SQLALCHEMY_DATABASE_URI():
        raw_url = os.getenv("DATABASE_URL", DevelopmentConfig.default_dev_db)
        # If targeting local PostgreSQL, check if port 5432 is accepting connections.
        # If local PostgreSQL is not running, gracefully fall back to local SQLite
        # so local development works immediately without crashing on connection refused!
        if "postgresql" in raw_url and ("localhost" in raw_url or "127.0.0.1" in raw_url):
            try:
                import socket
                from urllib.parse import urlparse
                parsed = urlparse(raw_url)
                host = parsed.hostname or "localhost"
                port = parsed.port or 5432
                with socket.create_connection((host, port), timeout=0.2):
                    return normalize_database_url(raw_url)
            except Exception:
                import pathlib
                base_dir = pathlib.Path(__file__).resolve().parent.parent
                return f"sqlite:///{base_dir / 'exammate_dev.db'}"

        return normalize_database_url(raw_url)


class TestingConfig(BaseConfig):
    """Configuration for automated test execution."""

    DEBUG: bool = False
    TESTING: bool = True
    ENV: str = "testing"

    # Fast in-memory SQLite by default for isolated automated testing
    @_ConfigUriProperty
    def SQLALCHEMY_DATABASE_URI():
        return normalize_database_url(
            os.getenv("TEST_DATABASE_URL", "sqlite:///:memory:")
        )

    SQLALCHEMY_ENGINE_OPTIONS = {}  # In-memory SQLite does not require connection pooling


class ProductionConfig(BaseConfig):
    """Configuration for production deployment."""

    DEBUG: bool = False
    TESTING: bool = False
    ENV: str = "production"

    @_ConfigUriProperty
    def SQLALCHEMY_DATABASE_URI():
        return normalize_database_url(os.getenv("DATABASE_URL"))
    
    # Production-tuned connection pool
    SQLALCHEMY_ENGINE_OPTIONS = {
        "pool_pre_ping": True,
        "pool_size": 10,
        "max_overflow": 20,
        "pool_recycle": 1800,
    }


config_by_name = {
    "development": DevelopmentConfig,
    "testing": TestingConfig,
    "production": ProductionConfig,
    "default": DevelopmentConfig,
}


def get_config(env_name: str | None = None) -> type[BaseConfig]:
    """Retrieve configuration class by environment name."""
    if not env_name:
        env_name = os.getenv("FLASK_ENV", "development").lower()
    return config_by_name.get(env_name, DevelopmentConfig)
