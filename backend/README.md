# ExamMate AI — Backend Foundation (Flask + PostgreSQL)

Production-ready backend foundation for **ExamMate AI** built with Flask, SQLAlchemy, Alembic database migrations, PostgreSQL, and comprehensive request validation.

---

## 📁 Project Architecture

```
backend/
├── app/
│   ├── __init__.py           # Application Factory (create_app)
│   ├── config.py             # Environment-based configs (Dev, Test, Prod)
│   ├── extensions.py         # SQLAlchemy, Migrate, CORS extensions
│   ├── models/
│   │   ├── __init__.py       # Model exports
│   │   ├── base.py           # BaseModel (id, created_at, updated_at, to_dict)
│   │   └── user.py           # Student/User model & placement tracking
│   ├── routes/
│   │   ├── __init__.py       # Blueprint registry
│   │   ├── health.py         # GET /api/v1/health & GET /api/v1/ping
│   │   └── api_v1.py         # Students CRUD & validation demo endpoints
│   ├── services/
│   │   ├── __init__.py
│   │   └── health_service.py # DB ping latency & server uptime monitoring
│   └── utils/
│       ├── __init__.py
│       ├── errors.py         # Consistent JSON error formatting & handlers
│       └── validators.py     # @validate_json request payload decorator
├── migrations/
│   ├── alembic.ini           # Alembic migration configuration
│   ├── env.py                # Migration runtime environment
│   ├── script.py.mako        # Migration template
│   └── versions/
│       └── 0001_initial_users_table.py  # Initial users schema migration
├── tests/
│   ├── __init__.py
│   ├── conftest.py           # Pytest fixtures (client, app, in-memory DB)
│   ├── test_config.py        # Environment configuration tests
│   ├── test_errors.py        # Validation & error contract tests
│   └── test_health.py        # Health check & DB ping tests
├── .env.example              # Documented environment variables template
├── docker-compose.yml        # One-command PostgreSQL 16 container setup
├── pytest.ini                # Pytest configuration
├── requirements.txt          # Python dependencies
└── run.py                    # Server entrypoint
```

---

## 🚀 Quickstart & Local Development Setup

### 1. Prerequisites
- **Python 3.12+**
- **PostgreSQL 14+** (or Docker)

### 2. Create Virtual Environment & Install Dependencies
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### 3. Configure Environment Variables
Copy the example environment configuration:
```bash
cp .env.example .env
```

Review `.env` settings:
```ini
FLASK_ENV=development
FLASK_DEBUG=True
PORT=5000
DATABASE_URL=postgresql+psycopg2://postgres:postgres@localhost:5432/exammate_dev
CORS_ORIGINS=http://localhost:5173,http://127.0.0.1:5173

# Gmail SMTP Email Verification Settings
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=your-email@gmail.com
SMTP_PASSWORD=your-google-app-password
SMTP_FROM_EMAIL=your-email@gmail.com
```

### 📧 Gmail SMTP & Render Production Setup Guide

Registration requires email OTP verification. To enable Gmail SMTP delivery:

#### 1. Generate a Google App Password
1. Sign in to your Google Account and navigate to **Security** (`https://myaccount.google.com/security`).
2. Ensure **2-Step Verification** is turned **ON** on your account.
3. Open **App Passwords** directly at: 👉 **`https://myaccount.google.com/apppasswords`**
4. Enter an App name (e.g. `ExamMate AI`) and click **Create**.
5. Google will display a 16-character password (e.g., `abcd efgh ijkl mnop`). Copy this code.

#### 2. Configure in Render (Production Backend)
1. In your **Render Dashboard**, click on your ExamMate backend Web Service.
2. Navigate to **Environment** in the left sidebar.
3. Add the following environment variables:
   - `SMTP_HOST`: `smtp.gmail.com`
   - `SMTP_PORT`: `587`
   - `SMTP_USERNAME`: `your-email@gmail.com`
   - `SMTP_PASSWORD`: `<your-16-character-app-password>` *(Keep private! Never commit this to Git!)*
   - `SMTP_FROM_EMAIL`: `your-email@gmail.com`
4. Click **Save Changes**. Render will automatically redeploy with email delivery enabled.

#### 3. Security Highlights
- **No Plaintext Passwords or OTPs**: Passwords are saved with PBKDF2; OTPs are saved with HMAC-SHA256 using `SECRET_KEY`.
- **Single-Use Verification**: Once verified, challenges are marked consumed immediately.
- **Expiry & Rate Limiting**: OTPs expire after 10 minutes, allow 5 attempts maximum, and enforce a 60-second resend cooldown.
- **Fail-Safe**: If SMTP credentials are missing or sending fails, the API responds with 503 Service Unavailable and never pretends the code was sent. Credentials, passwords, and OTP codes are strictly never logged.

### 4. Start PostgreSQL Database

#### Option A: Using Docker Compose (Recommended)
```bash
docker compose up -d
```
This spins up PostgreSQL on port `5432` with username `postgres`, password `postgres`, and database `exammate_dev`.

#### Option B: Using Local Native PostgreSQL
```bash
# In psql or bash:
createuser -s postgres
createdb -U postgres exammate_dev
```

### 5. Apply Database Migrations
Apply all database migrations up to the latest revision:
```bash
flask db upgrade
```

To create a new migration after modifying models in `app/models/`:
```bash
flask db migrate -m "describe schema change"
flask db upgrade
```

### 6. Start the Development Server
```bash
python run.py
```
The server will start listening at:
👉 **`http://localhost:5000`**

---

## 📡 API Endpoints

### 1. Authentication & Email OTP Verification

ExamMate AI implements secure email OTP verification during registration:
- Registration details (name, email, password, college, track) are entered by the user.
- A 6-digit numeric OTP is generated via Python's `secrets` module and emailed via Gmail SMTP.
- The unverified password is PBKDF2-hashed and the OTP is HMAC-SHA256 hashed with the server `SECRET_KEY` before storing in the database.
- OTPs expire after **10 minutes**, allow at most **5 verification attempts**, and have a **60-second resend cooldown**.
- Once verified, the challenge is consumed (single-use), the user account is created, and an auth token is issued.

#### Endpoints:

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/api/v1/auth/register/request-otp` | `POST` | Validate registration fields & dispatch a 6-digit OTP code to email |
| `/api/v1/auth/register/verify-otp` | `POST` | Verify single-use OTP code and create user account (returns token + cookie) |
| `/api/v1/auth/register` | `POST` | Direct account registration (legacy / testing fallback) |
| `/api/v1/auth/login` | `POST` | Authenticate with email & password hash |
| `/api/v1/auth/logout` | `POST` | Invalidate session cookie |
| `/api/v1/auth/me` | `GET` | (Protected) Fetch signed-in user profile & progress |
| `/api/v1/auth/profile` | `PUT` | (Protected) Update profile information or change password |

---

### 2. Health & Liveness Checks

#### `GET /api/v1/health`
Verifies server uptime and PostgreSQL database connectivity.

**Response (HTTP 200 OK — Healthy):**
```json
{
  "success": true,
  "status": "healthy",
  "timestamp": "2026-11-10T19:05:00.000000+00:00",
  "environment": "development",
  "version": "1.0.0",
  "services": {
    "server": {
      "status": "running",
      "uptime_seconds": 142.5
    },
    "database": {
      "status": "connected",
      "engine": "postgresql",
      "latency_ms": 2.14,
      "pool": {
        "size": 5,
        "checked_in": 5,
        "checked_out": 0
      }
    }
  }
}
```

**Response (HTTP 503 Service Unavailable — DB Down):**
```json
{
  "success": false,
  "status": "unhealthy",
  "timestamp": "2026-11-10T19:05:00.000000+00:00",
  "environment": "development",
  "version": "1.0.0",
  "services": {
    "server": {
      "status": "running",
      "uptime_seconds": 142.5
    },
    "database": {
      "status": "disconnected",
      "engine": "postgresql",
      "latency_ms": 15.2,
      "error": "could not connect to server: Connection refused"
    }
  }
}
```

#### `GET /api/v1/ping`
Lightweight probe returning `{"status": "ok", "message": "pong"}` (HTTP 200).

---

### 2. Student Progress & Dashboard Sync Endpoints

The frontend React dashboard syncs bidirectionally with these endpoints:

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/api/v1/student/progress` | `GET` | Retrieve complete student metrics, streaks, and checklists |
| `/api/v1/student/progress` | `PUT` | Save updated student metrics to PostgreSQL |
| `/api/v1/student/progress/reset` | `POST` | Reset all student progress, streak, and checklist metrics to 0% |
| `/api/v1/student/progress/demo` | `POST` | Load sample demo data (56% progress, 180 solved, 15 streak) |
| `/api/v1/student/progress/toggle-task` | `POST` | Toggle completion status of daily tasks (`{"taskId": 1}`) |
| `/api/v1/student/progress/toggle-resume-step` | `POST` | Toggle resume checklist step (`{"stepIndex": 0}`) |
| `/api/v1/student/progress/solve-problem` | `POST` | Record a solved coding problem and increment metrics |

**Example Progress Response (HTTP 200 OK):**
```json
{
  "success": true,
  "data": {
    "overallProgress": 0,
    "practiceDone": 0,
    "projectsBuilt": 0,
    "streakDays": 0,
    "webDevProgress": 0,
    "dsaProgress": 0,
    "jsProgress": 0,
    "reactProgress": 0,
    "pythonProgress": 0,
    "sqlProgress": 0,
    "problemsSolved": 0,
    "accuracyPercent": 0,
    "practiceStreak": 0,
    "tasks": [
      { "id": 1, "text": "Solve 5 DSA problems", "done": false },
      { "id": 2, "text": "Complete React module", "done": false },
      { "id": 3, "text": "Update your resume", "done": false }
    ],
    "resumeSteps": [
      { "title": "Add Personal Details", "completed": false },
      { "title": "Add Education", "completed": false },
      { "title": "Add Skills", "completed": false },
      { "title": "Add Projects", "completed": false },
      { "title": "Review & Download", "completed": false }
    ],
    "recentMock": null,
    "student": {
      "id": 1,
      "name": "Situ Chandra",
      "email": "situsavvy1111@gmail.com",
      "institution": "Jawaharlal Nehru University (JNU), New Delhi",
      "track": "Software Developer"
    }
  }
}
```

---

### 3. Request Validation & Student Endpoints

#### `POST /api/v1/students`
Register a student with payload validation.

**Request:**
```http
POST /api/v1/students
Content-Type: application/json

{
  "name": "Situ Chandra",
  "email": "situ@example.com",
  "institution": "Jawaharlal Nehru University (JNU), New Delhi",
  "track": "Software Developer"
}
```

**Response (HTTP 201 Created):**
```json
{
  "success": true,
  "message": "Student registered successfully.",
  "data": {
    "id": 1,
    "name": "Situ Chandra",
    "email": "situ@example.com",
    "institution": "Jawaharlal Nehru University (JNU), New Delhi",
    "track": "Software Developer",
    "overall_progress": 0,
    "practice_done": 0,
    "projects_built": 0,
    "streak_days": 0,
    "is_active": true,
    "created_at": "2026-11-10T19:05:00.000000+00:00",
    "updated_at": "2026-11-10T19:05:00.000000+00:00"
  }
}
```

---

## 🛡️ Consistent API Error Response Standard

All errors across the application adhere to a standardized JSON schema:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Request payload validation failed.",
    "details": {
      "email": ["This field is required."],
      "name": ["Expected str, got int."]
    }
  },
  "path": "/api/v1/students",
  "timestamp": "2026-11-10T19:05:00.000000+00:00"
}
```

### Standard Error Codes
| Status Code | Error Code | Description |
| :--- | :--- | :--- |
| `400` | `BAD_REQUEST` | Malformed JSON or missing `Content-Type: application/json` |
| `404` | `NOT_FOUND` | Requested route or database entity was not found |
| `405` | `METHOD_NOT_ALLOWED` | HTTP method not permitted on the route |
| `409` | `CONFLICT` | Resource already exists (e.g. duplicate email) |
| `422` | `VALIDATION_ERROR` | Required fields missing or type validation failure |
| `500` | `INTERNAL_SERVER_ERROR` | Unhandled server exception |
| `503` | `SERVICE_UNAVAILABLE` | Database or critical external service unreachable |

---

## 🧪 Automated Testing

The automated test suite runs against an isolated, fast in-memory SQLite database without needing external PostgreSQL to be active.

To execute the full test suite:
```bash
pytest
```

With verbose output and coverage:
```bash
pytest -v
```

### Test Coverage Highlights:
- `tests/test_health.py`: Validates 200 healthy status, 503 DB failure, ping, and root endpoints.
- `tests/test_config.py`: Validates Development, Testing, and Production configurations and PostgreSQL dialect normalization.
- `tests/test_errors.py`: Validates 400, 404, 405, 409, and 422 error response structures and CRUD workflows.

---

## 🏭 Production Deployment

To run in production with Gunicorn WSGI:
```bash
gunicorn --workers 4 --bind 0.0.0.0:5000 run:app
```
