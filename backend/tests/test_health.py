import pytest
from app.services.health_service import HealthService


def test_health_check_healthy(client, db_session):
    """
    Test GET /api/v1/health returns 200 and healthy status
    when database is connected.
    """
    response = client.get("/api/v1/health")
    assert response.status_code == 200

    data = response.get_json()
    assert data["success"] is True
    assert data["status"] == "healthy"
    assert data["environment"] == "testing"
    assert "timestamp" in data
    assert "version" in data

    services = data["services"]
    assert services["server"]["status"] == "running"
    assert "uptime_seconds" in services["server"]

    assert services["database"]["status"] == "connected"
    assert services["database"]["engine"] in ("sqlite", "postgresql")
    assert isinstance(services["database"]["latency_ms"], (int, float))


def test_health_check_database_disconnected(client, monkeypatch):
    """
    Test GET /api/v1/health returns 503 Service Unavailable
    when the database ping fails.
    """
    def mock_check_database():
        return False, {
            "status": "disconnected",
            "engine": "postgresql",
            "latency_ms": 15.4,
            "error": "could not connect to server: Connection refused",
        }

    monkeypatch.setattr(HealthService, "check_database", mock_check_database)

    response = client.get("/api/v1/health")
    assert response.status_code == 503

    data = response.get_json()
    assert data["success"] is False
    assert data["status"] == "unhealthy"
    assert data["services"]["database"]["status"] == "disconnected"
    assert "Connection refused" in data["services"]["database"]["error"]


def test_liveness_ping(client):
    """Test GET /api/v1/ping returns 200 pong."""
    response = client.get("/api/v1/ping")
    assert response.status_code == 200
    data = response.get_json()
    assert data["status"] == "ok"
    assert data["message"] == "pong"


def test_root_index(client):
    """Test GET / returns API root information."""
    response = client.get("/")
    assert response.status_code == 200
    data = response.get_json()
    assert data["status"] == "online"
    assert data["health_check"] == "/api/v1/health"
