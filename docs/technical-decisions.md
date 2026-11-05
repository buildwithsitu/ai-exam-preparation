# Technical Decisions Log — ExamMate AI

## Decision 001: Pure HTML5 Scope for Phase 1
- **Date:** 2026-11-05
- **Status:** Approved & Implemented
- **Context:** The developer is in MCA 1st year and has completed HTML fundamentals (Days 1–10).
- **Decision:** Build the entire initial multi-page application with **pure semantic HTML5** without any CSS, JavaScript, frameworks, or databases.
- **Outcome:** Clean separation of concerns; solid understanding of document hierarchy and accessibility before adding CSS or JavaScript.

## Decision 002: Project Folder Layout
- **Date:** 2026-11-05
- **Status:** Approved & Implemented
- **Context:** Deciding where static HTML documents live.
- **Decision:** Place all public HTML pages inside `frontend/`, maintain documentation inside `docs/`, and keep root for project-wide repository configurations.

## Decision 003: Semantic Landmark Strategy
- **Date:** 2026-11-05
- **Status:** Approved & Implemented
- **Decision:** Every page must feature exactly one `<h1>` inside its primary content or header, a single `<main>` element, a `<header>` containing a `<nav aria-label="...">`, and a `<footer>`.
- **Reasoning:** Screen readers and search engine crawlers rely on these landmarks to construct the document outline (WCAG 2.1).

## Decision 004: Accessible Form Structure
- **Date:** 2026-11-05
- **Status:** Approved & Implemented
- **Decision:** All forms (`register.html`, `login.html`, `contact.html`, `mock-test.html`, `question-bank.html`) must use explicit `<label for="...">` associations matching the input's `id`. Related options (such as multiple-choice answers or exam preferences) must be enclosed in `<fieldset>` with an informative `<legend>`.
- **Reasoning:** Screen readers announce the `<legend>` context when a student focuses on any radio button inside that group.

## Decision 005: Native Expandable Content with Details/Summary
- **Date:** 2026-11-05
- **Status:** Approved & Implemented
- **Decision:** Used native HTML5 `<details>` and `<summary>` in `question-bank.html` for answer reveal and explanations instead of requiring JavaScript accordion scripts.
- **Reasoning:** Provides zero-dependency progressive disclosure that works reliably in all browsers and assistive technologies out-of-the-box.

## Decision 006: Native Progress & Meter Elements
- **Date:** 2026-11-05
- **Status:** Approved & Implemented
- **Decision:** Used `<progress>` for syllabus coverage completion and `<meter>` for accuracy percentages in `dashboard.html`.
- **Reasoning:** `<progress>` represents a task in progress toward a known goal, while `<meter>` measures a scalar value within a known range with low/high/optimum thresholds.

## Decision 007: Horizontal (Row-Wise) Footer Navigation in Pure HTML
- **Date:** 2026-11-05
- **Status:** Approved & Implemented
- **Context:** Standard HTML unordered lists (`<ul><li>`) render vertically as column bullets without CSS.
- **Decision:** Formatted footer links inline inside `<nav aria-label="Footer Navigation"><p>...</p></nav>` separated by non-breaking spaces and pipe delimiters (`&nbsp;|&nbsp;`).
- **Outcome:** Clean horizontal (row-wise) layout across all 9 pages while maintaining 100% semantic compliance without requiring CSS.

## Decision 008: Scope Refinement — Exclusive Focus on CUET PG
- **Date:** 2026-11-05
- **Status:** Approved & Implemented
- **Context:** To ensure the highest depth of syllabus coverage and relevance for the MCA first-year project vision, generic SSC and Banking content diluted domain depth.
- **Decision:** Purged all references to SSC CGL and Banking examinations. Redesigned all examination catalogs, question banks, registration radio groups, and dashboard drills to center strictly on **CUET PG (MCA, M.Sc CS, and Data Science)**.
- **Outcome:** Highly cohesive product; tailored question paper blueprints, marking schemes (+4, -1), and 75-question mock simulator benchmarks matching official NTA SCQP09 specifications.

## Decision 009: Logo-Driven Home Navigation Pattern
- **Date:** 2026-11-05
- **Status:** Approved & Implemented
- **Context:** Modern web design convention uses the brand logo as the primary link to the homepage (`/index.html`), making a redundant "Home" text link in the navbar unnecessary.
- **Decision:** Created a vector SVG brand logo at `frontend/images/logo.svg`. Wrapped the logo image in `<a href="index.html">` across all headers, removed header sub-taglines, and removed the "Home" item from the main `<nav>` list.
- **Outcome:** Cleaner navigation hierarchy; clicking the logo smoothly returns the student to the homepage on every page.

## Decision 010: Pure HTML5 Split-Header & Collapsible Menu Architecture
- **Date:** 2026-11-05
- **Status:** Approved & Implemented
- **Context:** Desired layout requires Logo on the top-left, Login/Register on the top-right, and an expandable navigation menu on the left without introducing CSS.
- **Decision:** 
  1. Utilized a borderless structural table (`<table width="100%" border="0">`) in the header to position the logo on the left and account navigation on the right (`align="right"`).
  2. Implemented native HTML5 `<details>` and `<summary>` for the left-aligned navigation drawer, allowing students to click to expand or hide site navigation (Exams, Question Bank, Mock Test, Dashboard, About, Contact).
- **Outcome:** Clean visual positioning and interactive collapsible navigation achieved purely in HTML5 with zero CSS and zero JavaScript.

## Decision 011: Decoupled Header Architecture to Prevent Layout Shifts
- **Date:** 2026-11-05
- **Status:** Approved & Implemented
- **Context:** Placing `<details>` inside the same table row as the brand logo caused the column width to expand from 30px to ~160px when opened, horizontally pushing the adjacent logo and distorting the top header elements.
- **Decision:** Decoupled the top brand/auth table from the collapsible navigation drawer. The top `<table width="100%">` strictly houses the logo (`align="left"`) and account access (`align="right"`). The 3-line collapsible menu `<nav>` (`<details><summary><big><strong>&#9776;</strong></big></summary>`) sits independently directly below the top table separated by `<hr>`.
- **Outcome:** 0px Cumulative Layout Shift (CLS) on the logo and auth links. Expanding or collapsing the 3-line menu never shifts the logo horizontally or vertically. Fully preserves 100% valid semantic HTML5 with zero CSS.
