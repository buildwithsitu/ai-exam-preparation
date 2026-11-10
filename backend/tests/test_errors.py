import pytest


def test_404_error_response_format(client):
    """Test 404 responses conform to the consistent JSON error contract."""
    response = client.get("/api/v1/non-existent-endpoint")
    assert response.status_code == 404

    data = response.get_json()
    assert data["success"] is False
    assert data["error"]["code"] == "NOT_FOUND"
    assert "timestamp" in data
    assert data["path"] == "/api/v1/non-existent-endpoint"


def test_405_error_response_format(client):
    """Test 405 Method Not Allowed returns uniform error format."""
    response = client.post("/api/v1/health")
    assert response.status_code == 405

    data = response.get_json()
    assert data["success"] is False
    assert data["error"]["code"] == "METHOD_NOT_ALLOWED"


def test_validation_missing_json_body(client):
    """Test non-JSON request body raises 400 Bad Request."""
    response = client.post(
        "/api/v1/students",
        data="not a json payload",
        content_type="text/plain",
    )
    assert response.status_code == 400
    data = response.get_json()
    assert data["success"] is False
    assert data["error"]["code"] == "BAD_REQUEST"


def test_validation_missing_required_fields(client):
    """Test missing required fields raises 422 with field-level details."""
    response = client.post(
        "/api/v1/students",
        json={},
    )
    assert response.status_code == 422
    data = response.get_json()
    assert data["success"] is False
    assert data["error"]["code"] == "VALIDATION_ERROR"
    details = data["error"]["details"]
    assert "name" in details
    assert "email" in details


def test_validation_field_type_mismatch(client):
    """Test invalid data types raises 422 validation error."""
    response = client.post(
        "/api/v1/students",
        json={"name": 12345, "email": "valid@example.com"},
    )
    assert response.status_code == 422
    data = response.get_json()
    assert data["success"] is False
    assert "name" in data["error"]["details"]


def test_student_crud_flow_and_conflict(client, db_session):
    """Test student registration, lookup, and conflict detection."""
    student_payload = {
        "name": "Situ Chandra",
        "email": "situ@example.com",
        "track": "Software Developer",
        "institution": "Jawaharlal Nehru University (JNU), New Delhi",
    }

    # 1. Register student -> 201 Created
    create_res = client.post("/api/v1/students", json=student_payload)
    assert create_res.status_code == 201
    created_data = create_res.get_json()
    assert created_data["success"] is True
    student_id = created_data["data"]["id"]

    # 2. Get student by ID -> 200 OK
    get_res = client.get(f"/api/v1/students/{student_id}")
    assert get_res.status_code == 200
    assert get_res.get_json()["data"]["email"] == "situ@example.com"

    # 3. Duplicate registration -> 409 Conflict
    dup_res = client.post("/api/v1/students", json=student_payload)
    assert dup_res.status_code == 409
    dup_data = dup_res.get_json()
    assert dup_data["success"] is False
    assert dup_data["error"]["code"] == "CONFLICT"


def test_student_not_found(client, db_session):
    """Test querying non-existent student raises 404."""
    response = client.get("/api/v1/students/99999")
    assert response.status_code == 404
    data = response.get_json()
    assert data["success"] is False
    assert data["error"]["code"] == "NOT_FOUND"
