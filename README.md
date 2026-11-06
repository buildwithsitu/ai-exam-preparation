# ExamMate AI — Competitive Examination Preparation Platform

An intelligent, student-centric competitive examination preparation platform designed specifically for aspirants of **CUET (UG & PG)**, alongside upcoming support for SSC, Banking, and Railway examinations.

---

## 📁 Repository Structure

```
ai-exam-preparation/
│
├── frontend/                  # Accessible HTML5/CSS3 Web Application
│   ├── index.html             # Homepage with Hero, Marquee Sliders, & CTA
│   ├── dashboard.html         # Student Learning Dashboard & Analytics
│   ├── question-bank.html     # CUET UG/PG Question Bank with Subject Cards
│   ├── exams.html             # Examination Catalog & Syllabus Blueprint
│   ├── mock-test.html         # Timed Mock Examination Simulator Console
│   ├── about.html             # Platform Mission, Vision, & Support Desk (#contact)
│   ├── contact.html           # Dedicated Student Inquiry Forwarder
│   ├── login.html             # Student Sign-In Portal
│   ├── register.html          # Student Registration Portal
│   ├── css/                   # Modular Stylesheets (Tokens, Components, Dashboard)
│   └── images/                # Vector SVG Assets & Visual Diagrams
│
├── docs/                      # Architectural, requirement, and learning documentation
│   ├── project-overview.md    # Product vision, problem statement, and goals
│   ├── requirements.md        # Functional and non-functional specifications
│   ├── architecture.md        # Platform architecture and data flow specs
│   ├── technical-decisions.md # Architecture Decision Records (ADRs)
│   └── learning-progress.md   # Step-by-step progress and implementation milestones
│
├── database/                  # PostgreSQL schema and Docker Compose definitions
├── backend/                   # Backend API specifications and microservice stubs
└── PROGRESS.md                # Real-time task tracking and implementation status
```

---

## 🚀 Core Educational Features

- **🎯 Authentic Mock Exam Simulator**: Replicates standard computer-based test (CBT) layouts with question palettes, timers, section switchers, and official negative marking schemes.
- **📚 Curated CUET Question Bank**: Structured chapter-wise problem sets for CUET UG (General Test, English, Domains) and CUET PG (SCQP09 Computer Science & Mathematics).
- **📊 Real-time Student Learning Telemetry**: Visual learning activity charts, syllabus completion rings, daily study checklists, and streak tracking.
- **📱 Responsive, Accessible & Lightweight**: 100% pure HTML5/CSS3 architecture without heavy framework bloat, fully accessible (WCAG 2.1 AA) and deployable on GitHub Pages.
- **🔐 Secure & Seamless Access**: Pure CSS modal authentication supporting Gmail verification and OTP workflows.

---

## 🛠️ Technology Stack

| Layer | Technologies | Current Status |
| :--- | :--- | :--- |
| **Frontend** | HTML5, CSS3 (Modern Flexbox/Grid, CSS Custom Properties), Vanilla JS | **Active & Production-Ready** |
| **Deployment** | GitHub Pages / Static Web Hosting | **Compatible** |
| **Backend (Phase 2)** | Python (FastAPI / Supabase Auth) | Specification Ready |
| **Database (Phase 2)** | PostgreSQL / Supabase | Schema Ready (`database/schema.sql`) |

---

## 💻 Local Development Setup

To preview and develop the frontend locally:

```bash
# Clone the repository
git clone https://github.com/your-username/ai-exam-preparation.git
cd ai-exam-preparation

# Open the frontend in any web browser
# On Linux:
xdg-open frontend/index.html

# Or serve via Python simple HTTP server:
python3 -m http.server 8080 --directory frontend/
# Then open http://localhost:8080 in your browser
```

---

## 📄 License & Attribution

Developed with academic dedication for competitive examination aspirants. &copy; 2026 ExamMate AI Team. All rights reserved.
