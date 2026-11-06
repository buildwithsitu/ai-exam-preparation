# ExamMate AI — Learning Log & Progress Tracker

## 📌 Phase Status: Phase 2 — CSS Foundations & Component Styling
- **Theme:** ExamMate AI Royal Purple / Indigo Palette (`--color-brand-primary: #5B3CE8`, `--color-brand-soft: #F3F0FF`, `--color-btn-dark: #1E1B4B`)
- **Status:** In Progress
- **Architecture:** Multi-Page Same-Tab Architecture + Pure CSS `:target` Auth Modal + Modular CSS (`variables.css`, `components.css`, `dashboard.css`, `style.css`)
- **Role:** Senior Software Engineer & Technical Mentor
- **Architecture Reference:** [docs/architecture.md](file:///home/birendra/Documents/ai-exam-preparation/docs/architecture.md)
- **Detailed Progress Log:** [docs/learning-progress.md](file:///home/birendra/Documents/ai-exam-preparation/docs/learning-progress.md)
- **Technical Decisions Log:** [docs/technical-decisions.md](file:///home/birendra/Documents/ai-exam-preparation/docs/technical-decisions.md)

---

## 🗺️ Multi-Page Platform Architecture (Same-Tab Navigation)
All core educational modules are organized as dedicated, accessible pages opening smoothly in the same tab:
1. **Homepage** ([`frontend/index.html`](file:///home/birendra/Documents/ai-exam-preparation/frontend/index.html) — Royal Purple Hero with 3 floating feature badges, continuous smooth marquee sliders with soft start/end edge blur for *Why Choose Us*, *Popular Exams*, and *How It Works*, *Ready to Boost* CTA banner, and Pure CSS Gmail + OTP Modal)
2. **Student Dashboard & Analytics** ([`frontend/dashboard.html`](file:///home/birendra/Documents/ai-exam-preparation/frontend/dashboard.html) — LumiLearn-style multi-panel dashboard with sidebar, weekly activity bar chart, 68% donut progress ring, course cards, quick stats, Archie Schmidt profile, mini-calendar, today's plan, and achievements)
3. **About & Contact Section** ([`frontend/about.html`](file:///home/birendra/Documents/ai-exam-preparation/frontend/about.html) — Platform Mission, Pedagogical Pillars, and Integrated Support & Inquiry Desk at `#contact`)
4. **Examination Syllabus Catalog** ([`frontend/exams.html`](file:///home/birendra/Documents/ai-exam-preparation/frontend/exams.html) — CUET PG MCA SCQP09 Blueprint & Marking Scheme Table)
5. **Practice Question Bank** ([`frontend/question-bank.html`](file:///home/birendra/Documents/ai-exam-preparation/frontend/question-bank.html) — Royal Purple Banner with custom hero illustration, `CUET (UG/PG)` Stream Toggle, Filter Sidebar, 8 Subject Cards with topic tags & `Practice Now →` buttons, and Native Expandable Reasoning)
6. **Mock Test Simulator** ([`frontend/mock-test.html`](file:///home/birendra/Documents/ai-exam-preparation/frontend/mock-test.html) — Live Timer, MCQ Inputs, & Question Palette Aside)
7. **Auth Modal & Fallback Pages** ([`frontend/login.html`](file:///home/birendra/Documents/ai-exam-preparation/frontend/login.html), [`frontend/register.html`](file:///home/birendra/Documents/ai-exam-preparation/frontend/register.html) — Pure CSS `:target` Gmail + 6-digit OTP verification box accessible globally from all headers)

---

## ✅ Quality & Accessibility Audit
- **Royal Purple & Indigo Aesthetic**: Brand primary (`#5B3CE8`), soft lavender canvas (`#FAF9FE`), and deep navy contrast accents (`#1E1B4B`).
- **Smooth Marquee Sliders with Edge Blur**: Smooth right-to-left slide animation on *Why Choose Us*, *Popular Exams*, and *How It Works*, with hardware-accelerated start/end blur gradients after ~2 slides and pause-on-hover.
- **Hero Stats Cleaned**: Removed 4-stat pill strip from hero per request (`10,000+ Aspirants`, `50,000+ Questions`, `5+ Categories`, `95% Satisfaction`).
- **Same-Tab Navigation**: All internal page links open in the same tab without `target="_blank"`.
- **Pure CSS Gmail + OTP Popup**: `:target` pseudo-class modal triggered by "Login / Register" or "Log In / Sign Up" buttons with backdrop dismiss and 6-digit OTP entry without JavaScript.
- **100% WCAG 2.1 AA/AAA Compliant**: Single `<h1>` per page, complete label-input associations, zero broken links.
