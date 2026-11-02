# System Architecture & Technical Design

## 1. High-Level Architecture Overview

The **AI Exam Preparation Platform** employs a modern, decoupled microservices/modular monolith architecture designed for high availability, low-latency test simulations, and high-throughput AI orchestration.

```mermaid
flowchart TD
    subgraph ClientLayer["Client Layer (Frontend)"]
        WebClient["Next.js Web App\n(React 19 / TypeScript / Tailwind)"]
        ExamConsole["Exam Engine\n(Stateful Test Runner)"]
        AITutorUI["AI Tutor & Chat Console\n(SSE Streaming)"]
        AnalyticsUI["Analytics & Mistake Notebook\n(Recharts / KaTeX)"]
    end

    subgraph APILayer["API Gateway & Reverse Proxy"]
        NginxGateway["NGINX / Cloudflare Gateway\n(Rate Limiting & SSL Termination)"]
    end

    subgraph ServiceLayer["Application Backend (FastAPI / Python)"]
        AuthService["Auth & RBAC Service\n(JWT & OAuth2)"]
        ExamService["Exam & Scoring Engine\n(Timer, State, Result Analysis)"]
        SyllabusService["Syllabus & Bank Service\n(Hierarchical Taxonomy)"]
        AIEngine["AI Orchestration Engine\n(LangChain / LlamaIndex)"]
        AnalyticsService["Analytics & Spaced Repetition\n(SM-2 Algorithm)"]
    end

    subgraph AILayer["AI & RAG Pipeline"]
        LLMProvider["LLM API\n(Gemini 2.5 / OpenAI GPT-4o)"]
        EmbeddingEngine["Embeddings Model\n(Text-Embedding-3 / BGE-Large)"]
        DocumentParser["Document Ingestion\n(PyPDF / Unstructured / OCR)"]
    end

    subgraph DataLayer["Storage & Cache Layer"]
        PostgresDB[("Primary Database\n(PostgreSQL 16)")]
        VectorStore[("Vector Store\n(pgvector / Qdrant)")]
        RedisCache[("Cache & Message Broker\n(Redis 7)")]
        ObjectStore[("Object Storage\n(MinIO / AWS S3)")]
    end

    WebClient --> NginxGateway
    ExamConsole --> NginxGateway
    AITutorUI --> NginxGateway
    AnalyticsUI --> NginxGateway

    NginxGateway --> AuthService
    NginxGateway --> ExamService
    NginxGateway --> SyllabusService
    NginxGateway --> AIEngine
    NginxGateway --> AnalyticsService

    AIEngine --> LLMProvider
    AIEngine --> EmbeddingEngine
    DocumentParser --> EmbeddingEngine

    ExamService --> PostgresDB
    SyllabusService --> PostgresDB
    AnalyticsService --> PostgresDB

    EmbeddingEngine --> VectorStore
    AIEngine --> VectorStore

    ExamService --> RedisCache
    AIEngine --> RedisCache
    DocumentParser --> ObjectStore
```

---

## 2. Tech Stack Recommendations

| Component | Technology | Rationale |
| :--- | :--- | :--- |
| **Frontend Framework** | **Next.js 15+ (React 19, TypeScript)** | High performance, Server-Side Rendering (SSR) for syllabus/SEO, App Router, rapid layout composition. |
| **Styling & UI Kit** | **Tailwind CSS + shadcn/ui** | Clean, accessible, highly customizable component library with built-in dark/light mode. |
| **Formula & Code Rendering** | **KaTeX + PrismJS / Monaco** | Ultra-fast LaTeX mathematical formula typesetting and code syntax highlighting. |
| **Backend Framework** | **FastAPI (Python 3.12)** | Asynchronous high-performance web framework; native interoperability with AI/ML, NumPy, LangChain, and PyTorch. |
| **Relational Database** | **PostgreSQL 16** | Robust ACID compliance for user accounts, exams, questions, and test attempt submissions. |
| **Vector Database** | **pgvector (or Qdrant)** | Vector similarity search for RAG over syllabus textbooks and PYQs. |
| **Cache & Task Queue** | **Redis 7 + Celery / ARQ** | Fast session state storage, test attempt synchronization, rate limiting, and background document parsing. |
| **Object Storage** | **S3-compatible (MinIO / AWS S3)** | Storage for textbook PDFs, diagram images, and exported test reports. |

---

## 3. RAG Pipeline Architecture

```mermaid
sequenceDiagram
    autonumber
    actor Student
    participant Frontend as Web App (Client)
    participant Backend as FastAPI Server
    participant VectorDB as Vector Store (pgvector)
    participant LLM as LLM Engine (Gemini / GPT)

    Student->>Frontend: Enters doubt on Question / Topic
    Frontend->>Backend: POST /api/v1/ai/tutor/query (prompt, topic_id, context)
    Backend->>VectorDB: Query embeddings (hybrid dense + sparse BM25 search)
    VectorDB-->>Backend: Top-k syllabus chunks + textbook references
    Backend->>LLM: Formulate system prompt (Context + Question + Socratic instruction)
    LLM-->>Backend: Stream token chunks (SSE)
    Backend-->>Frontend: Server-Sent Events (SSE) data stream
    Frontend-->>Student: Renders real-time markdown + LaTeX response
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

