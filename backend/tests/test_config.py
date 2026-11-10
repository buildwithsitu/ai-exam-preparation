from app.config import (
    DevelopmentConfig,
    ProductionConfig,
    TestingConfig,
    get_config,
    normalize_database_url,
)


def test_normalize_database_url():
    """Verify legacy postgres:// URLs are converted to postgresql+psycopg2://."""
    assert (
        normalize_database_url("postgres://user:pass@host:5432/db")
        == "postgresql+psycopg2://user:pass@host:5432/db"
    )
    assert (
        normalize_database_url("postgresql://user:pass@host:5432/db")
        == "postgresql+psycopg2://user:pass@host:5432/db"
    )
    assert (
        normalize_database_url("sqlite:///:memory:")
        == "sqlite:///:memory:"
    )
    assert normalize_database_url(None) is None


def test_development_config():
    """Test DevelopmentConfig settings."""
    cfg = DevelopmentConfig()
    assert cfg.DEBUG is True
    assert cfg.TESTING is False
    assert cfg.ENV == "development"
    assert ("postgresql" in cfg.SQLALCHEMY_DATABASE_URI) or ("sqlite" in cfg.SQLALCHEMY_DATABASE_URI)
    assert cfg.SQLALCHEMY_TRACK_MODIFICATIONS is False


def test_testing_config():
    """Test TestingConfig settings."""
    cfg = TestingConfig()
    assert cfg.DEBUG is False
    assert cfg.TESTING is True
    assert cfg.ENV == "testing"
    assert "sqlite" in cfg.SQLALCHEMY_DATABASE_URI


def test_production_config(monkeypatch):
    """Test ProductionConfig settings."""
    monkeypatch.setenv(
        "DATABASE_URL",
        "postgresql://prod_user:secret@prod-db.example.com:5432/exammate_prod",
    )
    cfg = ProductionConfig()
    assert cfg.DEBUG is False
    assert cfg.TESTING is False
    assert cfg.ENV == "production"
    assert "postgresql+psycopg2://" in cfg.SQLALCHEMY_DATABASE_URI
    assert cfg.SQLALCHEMY_ENGINE_OPTIONS["pool_size"] == 10


def test_get_config_factory():
    """Test get_config resolver."""
    assert get_config("development") == DevelopmentConfig
    assert get_config("testing") == TestingConfig
    assert get_config("production") == ProductionConfig
    assert get_config("unknown_env") == DevelopmentConfig
