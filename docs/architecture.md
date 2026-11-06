# System Architecture & Technical Design — ExamMate AI

## 1. High-Level Architecture Overview

The **ExamMate AI** platform employs a modern decoupled architecture featuring a high-performance **Vite + React SPA**, a lightweight **Python/Flask REST API**, a relational **PostgreSQL** database, and an **LLM + RAG** intelligence layer.

```mermaid
flowchart TD
    subgraph ClientLayer["Frontend Layer (React + Vite + TypeScript)"]
        WebApp["React 18/19 SPA\n(Vite + TypeScript + Tailwind CSS)"]
        Router["React Router\n(Client-Side Route Management)"]
        CodingConsole["Practice & Coding Console\n(Monaco / Code Runner)"]
        DashboardUI["Student Dashboard & Telemetry\n(Interactive Analytics)"]
    end

    subgraph APILayer["Backend Layer (Python + Flask)"]
        FlaskServer["Flask Application Server\n(REST API / Modular Blueprints)"]
        AuthBP["Auth Blueprint\n(JWT Authentication & Registration)"]
        CareerBP["Career & Syllabus Blueprint\n(Roadmaps, Resources, Topics)"]
        PracticeBP["Practice & Quiz Blueprint\n(Coding Problems, Test Cases)"]
        TelemetryBP["Telemetry & Progress Blueprint\n(Accuracy, Milestones)"]
        AIBP["AI & RAG Blueprint\n(Socratic Hints, Mock Interviewer)"]
    end

    subgraph DataLayer["Database Layer (PostgreSQL)"]
        PostgresDB[("PostgreSQL 16\n(Users, Attempts, Roadmaps, Questions)")]
        PGVector[("pgvector Extension\n(Syllabus & Problem Embeddings)")]
    end

    subgraph AILayer["AI Integration Layer (LLM & RAG)"]
        RAGPipeline["RAG Engine\n(Hybrid Vector Search + Chunk Retrieval)"]
        LLMProvider["LLM API\n(Gemini API / Claude / OpenAI)"]
    end

    WebApp --> Router
    Router --> CodingConsole
    Router --> DashboardUI

    WebApp --> FlaskServer
    FlaskServer --> AuthBP
    FlaskServer --> CareerBP
    FlaskServer --> PracticeBP
    FlaskServer --> TelemetryBP
    FlaskServer --> AIBP

    AuthBP --> PostgresDB
    CareerBP --> PostgresDB
    PracticeBP --> PostgresDB
    TelemetryBP --> PostgresDB

    AIBP --> RAGPipeline
    RAGPipeline --> PGVector
    RAGPipeline --> LLMProvider
```

---

## 2. Tech Stack Specification

| Component | Technology | Rationale |
| :--- | :--- | :--- |
| **Frontend Framework** | **React + TypeScript + Vite** | Instant HMR, ultra-fast build times, typed safety, modern component-driven development. |
| **Routing** | **React Router (v6/v7)** | Robust client-side routing across all platform modules (`/`, `/learn`, `/practice`, `/dashboard`, etc.). |
| **Styling & Design System**| **Tailwind CSS** | Utility-first styling mapping directly to our Royal Purple (`#5B3CE8`) and Dark Navy (`#120E2C`) tokens. |
| **Backend Framework** | **Python + Flask (REST API)** | Lightweight, highly readable, modular blueprints; direct compatibility with Python data science & AI libraries. |
| **Database** | **PostgreSQL 16** | ACID-compliant relational storage for user accounts, progress, question banks, and job trackers. |
| **Vector Extension** | **pgvector** | Seamless vector similarity search integrated directly inside PostgreSQL for RAG pipelines. |
| **AI Integration** | **LLM API + RAG** | Socratic explanations, code review hints, and realistic HR/technical mock interview evaluations. |

---

## 3. RAG Pipeline Architecture

```mermaid
sequenceDiagram
    autonumber
    actor Student
    participant Frontend as React Client (Vite + TS)
    participant Backend as Flask REST API
    participant VectorDB as PostgreSQL (pgvector)
    participant LLM as LLM API (Gemini / Claude)

    Student->>Frontend: Requests hint or explanation for coding problem
    Frontend->>Backend: POST /api/v1/ai/explain (problem_id, user_code, query)
    Backend->>VectorDB: Query problem context & optimal patterns
    VectorDB-->>Backend: Return relevant algorithmic patterns & edge cases
    Backend->>LLM: Prompt with Problem + Student Attempt + Retrieved Context
    LLM-->>Backend: Stream Socratic guidance (without leaking direct solution)
    Backend-->>Frontend: JSON / SSE stream response
    Frontend-->>Student: Displays formatted Markdown & interactive code feedback
```

---

## 4. Database Schema Design (Entity-Relationship Overview)

```mermaid
erDiagram
    USERS ||--o{ TEST_ATTEMPTS : submits
    USERS ||--o{ MISTAKE_LOGS : records
    USERS ||--o{ CHAT_SESSIONS : conducts
    
    SYLLABUS_NODES ||--|{ SYLLABUS_NODES : parent_child
    SYLLABUS_NODES ||--o{ QUESTIONS : contains
    
    TESTS ||--|{ TEST_QUESTIONS : includes
    QUESTIONS ||--|{ TEST_QUESTIONS : maps_to
    
    TEST_ATTEMPTS ||--|{ TEST_ANSWERS : includes
    TEST_QUESTIONS ||--|{ TEST_ANSWERS : answers
    
    QUESTIONS ||--o{ MISTAKE_LOGS : references

    USERS {
        uuid id PK
        string email
        string hashed_password
        string role
        jsonb target_exam_profile
        timestamp created_at
    }

    SYLLABUS_NODES {
        uuid id PK
        uuid parent_id FK
        string title
        string slug
        int level
        int sequence_order
    }

    QUESTIONS {
        uuid id PK
        uuid syllabus_node_id FK
        string question_type
        text content
        jsonb options
        jsonb correct_answer
        text explanation
        string difficulty
        jsonb citations
    }

    TESTS {
        uuid id PK
        string title
        string test_type
        int duration_minutes
        decimal total_marks
        decimal negative_marking_factor
        timestamp created_at
    }

    TEST_ATTEMPTS {
        uuid id PK
        uuid user_id FK
        uuid test_id FK
        decimal score_obtained
        int time_spent_seconds
        string status
        timestamp started_at
        timestamp completed_at
    }

    MISTAKE_LOGS {
        uuid id PK
        uuid user_id FK
        uuid question_id FK
        string error_type
        int repetition_interval
        timestamp next_review_date
    }
```

---

## 5. API Route Specification

### Authentication & User
- `POST /api/v1/auth/register`: Create a new user account.
- `POST /api/v1/auth/login`: Authenticate and issue JWT access/refresh tokens.
- `GET /api/v1/auth/me`: Fetch authenticated user profile and exam targets.

### Syllabus & Question Bank
- `GET /api/v1/syllabus/tree`: Retrieve hierarchical syllabus tree.
- `GET /api/v1/questions?topic_id={id}&difficulty={level}`: Fetch filtered questions.
- `POST /api/v1/questions/generate`: Trigger AI generation of targeted questions by syllabus subtopic.

### Mock Tests & Examination
- `GET /api/v1/tests`: List available mock tests.
- `POST /api/v1/tests/{id}/start`: Initialize a test attempt session, returning initial questions and timer token.
- `PUT /api/v1/tests/attempts/{attempt_id}/save`: Autosave candidate response for question $k$.
- `POST /api/v1/tests/attempts/{attempt_id}/submit`: Conclude test, compute marks, negative penalties, and percentile.

### AI Tutor & RAG
- `POST /api/v1/ai/tutor/chat`: Stream Socratic explanations and step-by-step guidance.
- `POST /api/v1/ai/explain-question`: Generate targeted breakdown for a missed question.

### Analytics & Spaced Repetition
- `GET /api/v1/analytics/dashboard`: Aggregate student mastery by subject and topic.
- `GET /api/v1/analytics/mistakes`: Retrieve questions due for revision under the SM-2 spaced repetition schedule.

---

## 6. Security, Resilience & Scalability Measures
1. **Deterministic Test State**: All test progress autosaves every 15 seconds to Redis; crashes or page reloads seamlessly recover the exact state without loss of time.
2. **LLM Cost & Rate Guardrails**:
   - Token usage budgeting per user tier.
   - Semantic response caching in Redis for identical conceptual queries.
3. **Containerized Microservices**: All tiers built as stateless Docker containers orchestrated via Docker Compose for local development and Kubernetes/Cloud Run for production.

