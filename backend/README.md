# Backend — AI Exam Preparation Platform

This directory contains the core backend API services, AI orchestration engine, and exam simulation management.

## Recommended Stack
- **Language**: Python 3.11+
- **Framework**: FastAPI (Asynchronous REST & SSE streaming)
- **ORM / Database Driver**: SQLAlchemy 2.0 (asyncio) / Alembic, asyncpg
- **AI & RAG Orchestration**: LangChain / LlamaIndex
- **Validation**: Pydantic v2
- **Task Queue & Cache**: Celery / ARQ with Redis 7

## Planned Structure
```
backend/
├── app/
│   ├── api/                   # API versioned route controllers
│   │   └── v1/
│   │       ├── auth.py        # Authentication & user profile endpoints
│   │       ├── syllabus.py    # Syllabus hierarchy & topic tree
│   │       ├── questions.py   # Question bank & AI generation
│   │       ├── tests.py       # Test session runner & auto-grading
│   │       ├── tutor.py       # RAG-based AI tutor streaming
│   │       └── analytics.py   # Mastery scores & spaced repetition
│   ├── core/                  # Configuration, security, JWT, database session
│   ├── models/                # SQLAlchemy database entities
│   ├── schemas/               # Pydantic request/response schemas
│   ├── services/              # Business logic (scoring, SM-2 algorithm, RAG)
│   └── workers/               # Background task workers (PDF ingestion, embedding)
├── tests/                     # Unit and integration test suites
├── requirements.txt           # Python package dependencies
└── Dockerfile                 # Container definition
```

