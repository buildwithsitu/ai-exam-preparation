import pytest


def test_get_progress_default_student(client, db_session):
    """Test GET /api/v1/student/progress returns initialized zero progress."""
    response = client.get("/api/v1/student/progress")
    assert response.status_code == 200

    data = response.get_json()
    assert data["success"] is True
    progress = data["data"]

    # Verify zero initialized state
    assert progress["overallProgress"] == 0
    assert progress["practiceDone"] == 0
    assert progress["streakDays"] == 0
    assert progress["student"]["name"] == "Situ Chandra"
    assert progress["student"]["email"] == "situsavvy1111@gmail.com"
    assert len(progress["tasks"]) == 3
    assert len(progress["resumeSteps"]) == 5


def test_reset_progress(client, db_session):
    """Test POST /api/v1/student/progress/reset resets all values."""
    # First load demo data
    client.post("/api/v1/student/progress/demo")
    
    # Then reset
    response = client.post("/api/v1/student/progress/reset")
    assert response.status_code == 200

    progress = response.get_json()["data"]
    assert progress["overallProgress"] == 0
    assert progress["practiceDone"] == 0
    assert progress["streakDays"] == 0
    assert progress["problemsSolved"] == 0
    assert progress["recentMock"] is None
    for task in progress["tasks"]:
        assert task["done"] is False


def test_load_demo_progress(client, db_session):
    """Test POST /api/v1/student/progress/demo populates sample numbers."""
    response = client.post("/api/v1/student/progress/demo")
    assert response.status_code == 200

    progress = response.get_json()["data"]
    assert progress["overallProgress"] == 56
    assert progress["practiceDone"] == 24
    assert progress["streakDays"] == 15
    assert progress["problemsSolved"] == 180
    assert progress["recentMock"]["score"] == 78


def test_toggle_task(client, db_session):
    """Test POST /api/v1/student/progress/toggle-task."""
    # Toggle task 1
    response = client.post("/api/v1/student/progress/toggle-task", json={"taskId": 1})
    assert response.status_code == 200

    progress = response.get_json()["data"]
    task1 = next(t for t in progress["tasks"] if t["id"] == 1)
    assert task1["done"] is True
    assert progress["overallProgress"] == 5


def test_toggle_resume_step(client, db_session):
    """Test POST /api/v1/student/progress/toggle-resume-step."""
    response = client.post("/api/v1/student/progress/toggle-resume-step", json={"stepIndex": 0})
    assert response.status_code == 200

    progress = response.get_json()["data"]
    assert progress["resumeSteps"][0]["completed"] is True


def test_solve_problem(client, db_session):
    """Test POST /api/v1/student/progress/solve-problem."""
    response = client.post("/api/v1/student/progress/solve-problem")
    assert response.status_code == 200

    progress = response.get_json()["data"]
    assert progress["problemsSolved"] == 1
    assert progress["practiceDone"] == 1
    assert progress["practiceStreak"] == 1
    assert progress["accuracyPercent"] == 100
    assert progress["overallProgress"] == 2
