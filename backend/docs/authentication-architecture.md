# ExamMate AI — Authentication & Session Architecture

## 1. Overview
ExamMate AI implements a **Dual-Mode Authentication & Session Strategy** combining cryptographically signed **JWT tokens** with **secure HttpOnly session cookies**. This architecture supports both local development proxying and production cross-origin / decoupled cloud hosting.

---

## 2. Password Security & Storage Standard
- **Never Plaintext:** Passwords are never stored in plaintext or logged.
- **Algorithm:** PBKDF2 with SHA-256 (`pbkdf2:sha256:100000$<salt>$<hash>`).
- **Iterations:** 100,000 HMAC rounds.
- **Salt:** 16-byte cryptographically secure pseudorandom salt (`secrets.token_hex(16)`) generated uniquely per user.
- **Timing Attack Defense:** Verification uses `hmac.compare_digest` for constant-time hash comparison.
- **Leakage Prevention:** `User.to_dict()` and `User.to_auth_dict()` explicitly exclude `password_hash` from all API responses.

---

## 3. Browser Session & Hosting Integration

### The Challenge
1. **Local Development:** The Vite frontend (`localhost:5173`) proxies `/api` to Flask (`localhost:5000`). Both share the same browser origin context.
2. **Production Hosting Options:**
   - **Scenario A (Unified Origin / Reverse Proxy):** Nginx or Cloudflare routes `/` to the React build and `/api` to Gunicorn/Flask.
   - **Scenario B (Decoupled Cross-Origin):** React is hosted on Vercel/Netlify (`app.exammate.ai`), while Flask runs on Render/AWS (`api.exammate.ai`). In this scenario, modern browsers (Safari ITP, Chrome Privacy Sandbox) restrict cross-site cookies.

### The Solution: Dual-Mode Authentication
The backend supports **both** transport mechanisms simultaneously:

| Method | Transport | Ideal Hosting Setup | Benefits |
| :--- | :--- | :--- | :--- |
| **HttpOnly Cookie** | `Cookie: auth_token=...; HttpOnly; SameSite=Lax; Path=/` | Unified domain / reverse proxy | Immune to JavaScript XSS token theft |
| **Bearer Token** | `Authorization: Bearer <jwt>` | Decoupled cross-origin / Mobile / SPA | Immune to third-party cookie blocking |

#### Request Authentication Hierarchy (`@require_auth` & `@optional_auth`):
1. **First Check:** Inspects `Authorization: Bearer <token>` HTTP header.
2. **Second Check:** If the header is missing, inspects the `auth_token` cookie.
3. If both are absent or invalid, raises `401 Unauthorized`.

---

## 4. Private Endpoint Protection & Authorization (Anti-IDOR)

To prevent Insecure Direct Object Reference (IDOR) attacks where User A attempts to view or tamper with User B's metrics:

1. **Identity Binding:**
   The `@require_auth` decorator validates the JWT signature using `SECRET_KEY` and sets `flask.g.current_user`.
2. **Endpoint Isolation:**
   - In `/api/v1/student/progress`, requests automatically operate on `g.current_user.id`.
   - If an authenticated request provides an explicit `student_id` parameter that does not match `g.current_user.id`, the backend immediately rejects the request with **`403 Forbidden`** (`FORBIDDEN`).
   - In `/api/v1/students/<id>`, access to another user's personal profile is rejected with **`403 Forbidden`**.

---

## 5. API Endpoints Reference

| Endpoint | Method | Auth | Description |
| :--- | :--- | :--- | :--- |
| `/api/v1/auth/register` | `POST` | Public | Register student with name, email, password, institution, track |
| `/api/v1/auth/login` | `POST` | Public | Authenticate with email/password; returns token and sets cookie |
| `/api/v1/auth/logout` | `POST` | Optional | Clears `auth_token` session cookie |
| `/api/v1/auth/me` | `GET` | Required | Retrieve signed-in student's profile & progress data |
| `/api/v1/auth/profile` | `PUT` | Required | Update name, track, institution, or change password |
