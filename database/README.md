# Database & Infrastructure — AI Exam Preparation Platform

This directory contains the database migration scripts, initial schema definitions, vector index configurations, and local infrastructure setup.

## Services
1. **PostgreSQL 16 + pgvector**: Stores core relational entities (users, questions, syllabus, exam attempts) and semantic document embeddings.
2. **Redis 7**: Caching layer, real-time exam state autosave, rate limiting, and background task message broker.

## Local Development with Docker Compose
Run the following from this directory:
```bash
docker compose up -d
```

## Directory Structure
```
database/
├── migrations/                # Alembic / SQL schema migration files
├── seeds/                     # Initial seed data (GATE/CS Syllabus taxonomy, sample PYQs)
├── schema.sql                 # Reference raw PostgreSQL + pgvector DDL
├── docker-compose.yml         # Container configuration for Postgres + pgvector + Redis
└── README.md
```

