# ExamMate AI — Modern Career & Placement Preparation Platform

An intelligent, student-centric learning and career platform designed for **Software Development, Data Analytics, and Campus Placements**. Build skills, build projects, and get placed.

---

## 📁 Repository Structure

```
ai-exam-preparation/
│
├── frontend/                  # Modern, Accessible HTML5/CSS3 Web Application
│   ├── index.html             # 1. Homepage (Hero, Benefits, Paths, How It Works)
│   ├── about.html             # 2. About Us (Mission, Academic Standards, JNU Contacts)
│   ├── login.html             # 3A. Student Login Page
│   ├── register.html          # 3B. Free Student Registration Page
│   ├── dashboard.html         # 4. Student Dashboard ("What Should I Do Next?")
│   ├── exams.html             # 5. Career Paths & Learning Tracks Catalog
│   ├── resources.html         # 6. Learning Resources, Notes & Cheat-Sheets
│   ├── question-bank.html     # 7. Practice & Coding Question Bank (DSA, Web, SQL)
│   ├── mock-test.html         # 8. Timed Technical Assessment Simulator Console
│   ├── performance.html       # 9. Performance & Progress Telemetry
│   ├── career-prep.html       # 10. Practical Projects, ATS Resume & Interview Hub
│   ├── profile.html           # 11. Profile & Goal Settings Page
│   ├── contact.html           # 12. Contact & Student Support Desk
│   ├── css/                   # Modular Stylesheets (Tokens, Components, Dashboard)
│   │   ├── variables.css      # CSS Design Tokens & Dark Mode Overrides
│   │   ├── components.css     # Buttons, Cards, Modals, Navbar, Sliders
│   │   ├── dashboard.css      # Activity Bar Charts, Donut Meters, Calendar
│   │   └── style.css          # Master Stylesheet Orchestrator
│   ├── js/                    # Lightweight Vanilla JavaScript (Zero Dependencies)
│   │   ├── theme.js           # Dark / Light Mode Switcher & LocalStorage Sync
│   │   └── dashboard.js       # Dynamic Schedule, Views & Telemetry Handlers
│   └── images/                # Vector SVG Assets & Visual Diagrams
│
└── docs/                      # Architectural & Learning Documentation
    ├── architecture.md        # Platform architecture and data flow specs
    ├── technical-decisions.md # Architecture Decision Records (ADRs)
    └── learning-progress.md   # Step-by-step progress and implementation milestones
```

---

## 🚀 The 12 Platform Modules

1. **Homepage (`index.html`)**: Clear introduction, benefits slider, learning tracks overview, how-it-works progression, and authentication CTAs.
2. **About Us (`about.html`)**: Mission, vision, core academic standards, team coordinates at Jawaharlal Nehru University (JNU), New Delhi.
3. **Registration & Login (`register.html`, `login.html`)**: Streamlined onboarding with goal track selection, input validation, and password security.
4. **Student Dashboard (`dashboard.html`)**: Central workspace answering *"What should I do next?"*, syllabus donut ring, active SDE track, and today's plan checklist.
5. **Career Paths & Learning Tracks (`exams.html`)**: 3 structured learning tracks (Software Developer, Data Analyst, Data Scientist) with roadmap milestones.
6. **Learning Resources (`resources.html`)**: Curated study notes, formula sheets, cheat-sheets, and downloadable blueprints by difficulty.
7. **Coding Practice (`question-bank.html`)**: Multi-parameter question browsing (DSA, Web Dev, SQL, Aptitude) with instant test cases and optimal solutions.
8. **Assessments & Mocks (`mock-test.html`)**: Timed technical assessment simulator with question palette and score breakdown.
9. **Performance & Progress (`performance.html`)**: Telemetry insights, topic-wise accuracy breakdown, and weak-area smart alerts.
10. **Projects, Resume & Interview Prep (`career-prep.html`)**: Industry portfolio projects, 5-point ATS resume checklist, and technical/HR interview drills.
11. **Profile & Settings (`profile.html`)**: Student info, primary career track selector, daily study targets, and account controls.
12. **Contact & Support (`contact.html`)**: Ticket submission form, direct email (`situsavvy1111@gmail.com`), location at JNU New Delhi, and FAQ accordion.

---

## 🛠️ Technology & Design Principles

- **100% Vanilla Web Stack**: Pure HTML5, CSS3, and modern Vanilla JS (zero external runtime dependencies, 100% GitHub Pages static hosting compatible).
- **Dark / Light Mode**: Seamless theme switching with instant anti-FOUC script and CSS variable theming.
- **Accessibility & Performance**: Semantic landmark tags (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`), keyboard skip links, single `<h1>` per page, and fully responsive across mobile, tablet, and desktop screens.


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

Developed with academic dedication for career and placement preparation students. &copy; 2026 ExamMate AI Team. All rights reserved.
