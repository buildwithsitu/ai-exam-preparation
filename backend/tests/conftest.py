import pytest
from app import create_app
from app.extensions import db


@pytest.fixture(scope="session")
def app():
    """Create and configure a Flask application instance for testing."""
    test_app = create_app("testing")
    yield test_app


@pytest.fixture(scope="function")
def client(app):
    """Test client for issuing requests."""
    return app.test_client()


@pytest.fixture(scope="function")
def runner(app):
    """CLI test runner."""
    return app.test_cli_runner()


@pytest.fixture(scope="function")
def db_session(app):
    """
    Provide an isolated database session per test function.
    Creates all tables in the in-memory SQLite database before test,
    and drops them cleanly after test completion.
    """
    with app.app_context():
        db.create_all()
        yield db.session
        db.session.remove()
        db.drop_all()
