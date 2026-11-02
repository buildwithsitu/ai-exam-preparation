<<<<<<< HEAD >>>>>>>>
# ai-exam-preparation
=======
# AI Exam Preparation Platform

An intelligent, adaptive exam preparation platform engineered to personalize learning, simulate competitive exams (e.g., GATE CS, GRE, Engineering Entrance), and reinforce conceptual mastery using domain-grounded Retrieval-Augmented Generation (RAG).

---

## 📁 Repository Structure

```
ai-exam-preparation/
│
├── docs/                      # Architectural, requirement, and project documentation
│   ├── project-overview.md    # Vision, problem statement, personas, and KPIs
│   ├── requirements.md        # Functional and non-functional specifications (SRS)
│   └── architecture.md        # System design, data flow, tech stack, and API specs
│
├── frontend/                  # Next.js / React web application and mock exam simulator
├── backend/                   # FastAPI application (Auth, Exam Engine, RAG, AI Tutor)
├── database/                  # PostgreSQL schemas, migrations, and vector store scripts
└── README.md                  # Project root overview and setup guidelines
```

---

## 🚀 Key Features

- **🎯 Authentic Mock Exam Simulator**: Replicates standard competitive test layouts with question palettes, timers, negative marking schemes, and on-screen scientific calculators.
- **🤖 Syllabus-Grounded AI Tutor**: Context-aware RAG pipeline indexing standard reference materials and previous year papers with citations and anti-hallucination guardrails.
- **📝 Multi-Format Question Generation**: AI-driven generation of Multiple Choice (MCQ), Multiple Select (MSQ), and Numerical Answer Type (NAT) questions calibrated by difficulty.
- **🔄 Spaced Repetition (SM-2) & Mistake Notebook**: Automatically logs incorrect attempts and schedules targeted recall drills at optimal memory intervals.
- **📊 Granular Mastery Analytics**: Real-time radar charts and topic heatmaps pinpointing knowledge gaps and time sinks.
- **📐 Mathematical & Code Support**: Native support for $\LaTeX$ typesetting and syntax-highlighted code blocks.

---

## 📚 Documentation Index

- [Project Overview](file:///home/birendra/Documents/ai-exam-preparation/docs/project-overview.md) — Problem statement, target personas, and core objectives.
- [Requirements Specification](file:///home/birendra/Documents/ai-exam-preparation/docs/requirements.md) — Comprehensive functional and non-functional requirements.
- [Architecture & Design](file:///home/birendra/Documents/ai-exam-preparation/docs/architecture.md) — High-level system architecture, ER diagrams, sequence flows, and API specifications.

---

## 🛠️ Recommended Tech Stack

| Tier | Technologies |
| :--- | :--- |
| **Frontend** | Next.js 15 (React 19), TypeScript, Tailwind CSS, shadcn/ui, KaTeX |
| **Backend** | Python 3.12, FastAPI, Pydantic v2, LangChain / LlamaIndex |
| **Database** | PostgreSQL 16 + pgvector, Redis 7 (Caching & Async Tasks) |
| **AI / Embeddings** | Gemini 2.5 / OpenAI GPT-4o, Text-Embedding-3 / BGE |
| **DevOps & Infra** | Docker, Docker Compose, GitHub Actions |

---

## ⚡ Quick Start (Local Development)

### 1. Prerequisites
- **Node.js**: $\ge 20.x$ and `pnpm` or `npm`
- **Python**: $\ge 3.11$
- **Docker & Docker Compose**: For PostgreSQL, pgvector, and Redis

### 2. Environment Setup
```bash
# Clone or navigate to the repository
cd ai-exam-preparation

# Start database and cache services
cd database
docker compose up -d

# Set up and launch backend
cd ../backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000

# Set up and launch frontend
cd ../frontend
npm install
npm run dev
```

---

## 📄 License
This project is licensed under the MIT License.

>>>>>>> 9070fb1 (Initial commit)
