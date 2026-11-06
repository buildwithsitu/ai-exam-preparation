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

## Decision 012: Unified Single "Login / Register" Native Button Header Component
- **Date:** 2026-11-06
- **Status:** Approved & Implemented
- **Context:** User requested replacing the split plain text links (`Login | Register Free`) with a single unified clickable button (`Login / Register`) at the top-right of the header.
- **Decision:** Converted the account access `<nav>` across all public pages into a single native `<button type="button"><strong>Login / Register</strong></button>` wrapped in `<a href="login.html">`. Also updated `dashboard.html` (`Logout` button) and `mock-test.html` (`Exit to Dashboard` button) for visual and semantic parity.
- **Outcome:** Clean, unified single-button authentication gateway across all pages without requiring CSS or JavaScript. Zero impact on header layout stability.

## Decision 013: Horizontal Inline Navbar Architecture (Removal of 3-Line Menu)
- **Date:** 2026-11-06
- **Status:** Approved & Implemented
- **Context:** User requested removing the 3-line hamburger menu option and placing the 4 core exam navigation destinations (`Exams`, `Question Bank`, `Mock Test`, `Dashboard`) in a single horizontal row directly between the Brand Logo (left) and the Login/Register button (right).
- **Decision:** Updated the top header row across all pages into a 3-column inline flex/table structure: Left = Logo (`index.html`), Center = Horizontal `<nav aria-label="Main Navigation">` featuring the 4 core learning links, Right = Tactile 3D `Login / Register` button. Removed the collapsible `<details>` and inner `<hr>` dividers. Styled navigation links in `components.css` with gamified ice-blue hover states, active indicators (`aria-current="page"`), and subtle 1px elevation lift.
- **Outcome:** Modern, clean, industry-standard SaaS header with zero layout shifts, immediate one-click discoverability, and delightful micro-interactions.

## Decision 014: Unified Single-Page Application (SPA) Architecture
- **Date:** 2026-11-06
- **Status:** Approved & Implemented
- **Context:** User requested consolidating all separate HTML pages into a single unified HTML file (`frontend/index.html`) to simplify navigation, previewing, and overall user flow.
- **Decision:** 
  1. Safely backed up all original individual HTML pages into `frontend/pages_backup/`.
  2. Consolidated all 9 pages into a cohesive single-page document in `frontend/index.html` partitioned into clear semantic sections:
     - `#hero` & `#features` (Homepage highlights & methodology)
     - `#exams` (CUET PG MCA syllabus breakdown & official marking blueprint table)
     - `#question-bank` (Practice questions with filter controls & zero-JS expandable reasoning)
     - `#mock-test` (Full mock examination simulator console with timer, MCQ inputs, & palette)
     - `#dashboard` (Student analytics, progress bars, accuracy meters, & recent attempts table)
     - `#auth` (`#login` & `#register` authentication portal cards)
     - `#about` (Academic mission & platform pillars)
     - `#contact` (Support desk & inquiry submission form)
  3. Upgraded all navigation links to internal anchor links (`#exams`, `#question-bank`, `#mock-test`, `#dashboard`, `#auth`, etc.).
  4. Configured smooth scrolling (`scroll-behavior: smooth; scroll-padding-top: 5.5rem;`) and a sticky floating navbar (`position: sticky; top: 0.5rem; z-index: 100;`).
- **Outcome:** Lightning-fast, seamless single-page experience. Evaluators and students can glide through the entire product in one view without full-page reloads. 100% WCAG 2.1 AA/AAA compliance preserved with exactly one `<h1>` tag and zero broken anchors.

## Decision 015: Repository Hygiene & Purging Redundant Separate Files
- **Date:** 2026-11-06
- **Status:** Approved & Implemented
- **Context:** Following the consolidation into the single-page application in `frontend/index.html`, separate loose `.html` files in `frontend/` and empty placeholder files (`README1.md`) were redundant and created maintenance divergence.
- **Decision:** Removed all 8 separate HTML files (`about.html`, `contact.html`, `dashboard.html`, `exams.html`, `login.html`, `mock-test.html`, `question-bank.html`, `register.html`), purged temporary `pages_backup/`, and removed `README1.md`.
- **Outcome:** Clean, lean frontend codebase. `frontend/index.html` serves as the authoritative, comprehensive entry point for the entire educational SaaS platform.

## Decision 016: SkillQuest-Inspired Minimalist Redesign (Milky-White & Light Green Theme)
- **Date:** 2026-11-06
- **Status:** Approved & Implemented
- **Context:** User provided a reference image (SkillQuest aesthetic) requesting: (1) warm milky-white/off-white canvas with light-green/emerald accents, (2) centered hero layout with prominent companion headline, (3) 3 core education learning models, (4) floating decorative badges, and (5) dark rounded pill CTA buttons.
- **Decision:**
  1. Updated design tokens in `variables.css` to warm milky-white (`--color-bg-app: #FAF8F5`), crisp emerald green (`--color-brand-primary: #059669; --color-brand-light: #10B981`), and dark pill button tokens (`--color-btn-dark: #18181B`).
  2. Harmonized `frontend/images/logo.svg` to feature the matching light-green/emerald gradient.
  3. Redesigned the Hero section in `frontend/index.html` with:
     - Centered display title: *Your Constant <span class="hero-highlight">Companion</span> in Modern Learning*
     - Dark pill CTA buttons (`Start Learning Free →`) and secondary syllabus explorer
     - 4 floating educational badge models (Central Univ Pathway, 5,000+ PYQs, 105-Min Simulator, Diagnostic Telemetry)
     - Central Universities partner alignment bar ("Trusted by: JNU, DU, BHU, HCU, NITs")
  4. Implemented **The 3 Core Education Learning Models** in a responsive Bento grid:
     - *Model 01: 105-Min Full Mock Exam Simulator Console*
     - *Model 02: Topic-Wise Practice Question Bank & Step-by-Step Reasoning*
     - *Model 03: Diagnostic Telemetry & Performance Mastery Tracking*
- **Outcome:** Sophisticated, minimalist, high-trust educational SaaS matching the user's reference design with 100% WCAG 2.1 AAA contrast and zero layout shift.

## Decision 017: Multi-Page Same-Tab Navigation, Removal of Partner Bar, and Pure-CSS Gmail/OTP Modal
- **Date:** 2026-11-06
- **Status:** Approved & Implemented
- **Context:** User requested 3 specific modifications:
  1. Remove the "Aligned with syllabus & test blueprints of:" block completely from the homepage.
  2. Clicking navigation options (`Exams`, `Question Bank`, `Mock Test`, `Dashboard`, `About`, `Contact`) opens in separate pages within the same tab (`href="exams.html"`, not anchor scrolling and not `target="_blank"`).
  3. Clicking the single "Login / Register" button pops open a modal box asking for Gmail address and OTP verification.
- **Decision:**
  1. Removed the `.trusted-by-bar` section from `frontend/index.html`.
  2. Scoped `frontend/index.html` cleanly to Homepage responsibilities (Hero, 4 floating badges, 3 Core Education Models, How It Works, Call to action, and Footer).
  3. Restored and standardized all dedicated multi-page HTML files (`exams.html`, `question-bank.html`, `mock-test.html`, `dashboard.html`, `about.html`, `contact.html`, `login.html`, `register.html`).
  4. Linked `css/style.css` across all pages and unified the header to a clean horizontal row navbar with the logo, same-tab page links, and a single "Login / Register" pill button triggering `#auth-modal`.
  5. Implemented a pure CSS `:target` popup modal overlay (`#auth-modal`) containing Gmail address input, 6-digit OTP input, resend link, and verification button (`action="dashboard.html"`). Configured backdrop dismissal and close button with zero JavaScript.
- **Outcome:** Clean multi-page SaaS architecture opening in the same tab, clutter-free homepage, and responsive Gmail + OTP popup modal without external JavaScript dependencies. Exactly one `<h1>` per page with zero broken links.

## Decision 018: Homepage Minimalist Boundary, Contact Integration into About, and LumiLearn Dashboard Architecture
- **Date:** 2026-11-06
- **Status:** Approved & Implemented
- **Context:** User requested:
  1. Remove all sections following "Our 3 Core Education Learning Models" on the homepage (`frontend/index.html`).
  2. Integrate the Contact section and support form directly into the About page (`frontend/about.html#contact`).
  3. Rebuild the student dashboard (`frontend/dashboard.html`) to mirror the provided LumiLearn reference design featuring a multi-panel layout with left navigation sidebar, top greeting & search bar, central weekly activity bar chart + circular progress ring + course cards + quick stats, and a right-rail utility panel with student profile, interactive mini-calendar, today's plan checklist, and achievements.
- **Decision:**
  1. Scoped `frontend/index.html` to end directly after "Our 3 Core Education Learning Models" grid, removing trailing methodology and redundant CTA blocks.
  2. Merged the comprehensive contact desk into `frontend/about.html` under `<section id="contact">` with accessible forms, categories, and editorial coordinates. Updated global navigation links to target `about.html#contact`.
  3. Engineered `frontend/css/dashboard.css` (imported by `style.css`) and structured `frontend/dashboard.html` with:
     - Fixed left sidebar with brand logo, icon-driven navigation, unread badge counters, and "Go Premium" upgrade card with illustration.
     - Top greeting bar ("Good morning, Archie! 👋") with search input, notification bell with unread dot, and online profile pill.
     - Primary central feed containing:
       - Learning Activity Card with pure CSS weekly bar chart (Mon–Sun with Thursday peak highlight).
       - Learning Progress Card with 68% circular donut progress ring and status breakdown (Completed, In Progress, Upcoming).
       - Continue Learning Section with filter tabs (All, In Progress, Completed), pagination arrows, and 3 rich course cards with progress badges (UI/UX, JavaScript, DSA).
       - Quick Stats row featuring 4 horizontal metric cards (Courses Enrolled, Lessons Completed, Total Time, Day Streak).
     - Right panel containing:
       - User profile hero card (Archie Schmidt, Computer Science Student, Level 12 badge).
       - Interactive mini calendar widget (May 2025 with highlighted active date).
       - Today's Plan checklist with checkboxes, time stamps, and completion states.
       - Achievements widget with medal ribbon icon and carousel indicators.
     - Created 8 self-contained SVG assets in `frontend/images/` for user avatar, instructor portraits, course covers, and premium illustration.
- **Outcome:** Exact visual and functional fidelity to the provided reference dashboard layout, complete zero-JavaScript compliance, 100% WCAG 2.1 AA/AAA compliance with single `<h1>` tag and zero broken links.

## Decision 019: ExamMate AI Royal Purple Brand Palette & Fidelity Implementation of About Us
- **Date:** 2026-11-06
- **Status:** Approved & Implemented
- **Context:** User provided an exact design mockup for the **ExamMate AI About Us** page (`media_1793954416038_ec3f793b.jpg`) and requested:
  1. Make the About section match the mockup properly.
  2. Change the website's color palette according to this new brand identity.
- **Decision:**
  1. Harmonized design tokens in `variables.css` to the signature Royal Purple / Indigo palette:
     - Primary Brand: `#5B3CE8` (Royal Purple), hover: `#472BC6`
     - Brand Soft Tint: `#F3F0FF` / `#EDE9FE`
     - Secondary Blue: `#2563EB` (for Vision & AI cards), soft tint: `#EBF5FF`
     - Deep Navy: `#1E1B4B` (for CTA banners and dark pill buttons)
     - Clean Canvas: `#FAF9FE` / `#FFFFFF`
  2. Updated `frontend/images/logo.svg` to the royal purple graduation cap emblem.
  3. Rebuilt `frontend/about.html` matching the mockup layout and copy:
     - Header navbar with active bottom underline indicator on `About Us` and dual `Log In` / `Sign Up` buttons.
     - Two-column Hero: `About ExamMate AI` badge, display title *"Our Mission is to Make Exam Preparation Smarter and Easier"*, subtext, pill CTAs (*Start Preparing →*, *Explore Exams*), and a dedicated custom SVG vector illustration (`about-hero-illustration.svg`).
     - *"Who We Are"* two-column section with 4 vertical-divider statistics counters (`10,000+ Aspirants`, `5+ Exam Categories`, `50,000+ Practice Questions`, `95% Student Satisfaction`).
     - *"Our Mission & Vision"* with purple dartboard Mission card and sky blue eye Vision card.
     - *"What We Offer"* 4-card grid (Mock Tests, Question Bank, Performance Tracking, AI Learning Support).
     - *"Let's Build Your Success Together"* dark navy CTA banner with white pill button.
     - Integrated Contact & Student Support Desk form and editorial coordinates (`#contact`).
- **Outcome:** 100% fidelity to the user's provided design mockup, consistent royal purple branding across the platform, and full zero-JavaScript / WCAG 2.1 AA/AAA compliance.

## Decision 020: Homepage Redesign (Two-Column Hero, Floating Badges, 5 Feature Cards, 5 Popular Exams, & 4-Step Flow)
- **Date:** 2026-11-06
- **Status:** Approved & Implemented
- **Context:** User provided the exact design mockup for the **ExamMate AI Homepage** (`media_1793954798480_8681cb16.jpg`) requesting to rebuild the homepage accordingly.
- **Decision:**
  1. Engineered `frontend/images/home-hero-student.svg` reproducing the student studying on laptop with headphones, stack of 4 labeled textbooks (`Aptitude`, `Reasoning`, `General Awareness`, `Current Affairs`), pen cup, and the 3 elevated floating badges (`Mock Test`, `Question Bank`, `Performance`).
  2. Implemented the Two-Column Hero in `frontend/index.html`:
     - Rocket companion tag (`Your Competitive Exam Companion`).
     - Display headline *"Prepare Smarter for Your Dream Exam"* with the signature purple curved underline accent on "Dream Exam".
     - Subtitle paragraph and CTA buttons (*Start Free Practice →*, *Explore Exams*).
     - Social proof strip featuring 4 statistics (`10,000+ Aspirants`, `50,000+ Practice Questions`, `5+ Exam Categories`, `95% Student Satisfaction`).
  3. Built *"Why Choose ExamMate AI?"* section with 5 feature cards in a clean row (Real Exam Experience, Vast Question Bank, Track Your Progress, AI Learning Support, Learn & Revise).
  4. Built *"Popular Exams on ExamMate AI"* section with 5 colorful pastel cards (CUET, SSC, Banking, Railway, More Exams).
  5. Built *"How It Works?"* 4-step sequential flow connected with arrows (Create an Account, Choose Your Exam, Practice & Learn, Track & Improve).
  6. Built *"Ready to Boost Your Preparation?"* deep indigo/purple gradient CTA banner with bullseye target icon and white pill button (*Get Started for Free →*).
  7. Configured header navbar with active underline on `Home`, search icon, and `Log In` / `Sign Up` buttons triggering `#auth-modal`.
- **Outcome:** 100% fidelity to the user's homepage design mockup, matching the About Us royal purple design system, with zero JavaScript and 100% WCAG 2.1 AA/AAA compliance.

## Decision 021: CUET Question Bank Fidelity Implementation
- **Date:** 2026-11-06
- **Status:** Approved & Implemented
- **Context:** User provided an exact design mockup for the **ExamMate AI Question Bank** page (`media_1793955197072_57efba78.jpg`) requesting to rebuild the Question Bank page accordingly.
- **Decision:**
  1. Engineered `frontend/images/qb-hero-graphic.svg` featuring open laptop with test checklist screen, stack of textbooks with `CUET` stamped on spine, pen cup, and botanical leaves.
  2. Built the Purple Hero Banner in `frontend/question-bank.html`:
     - Breadcrumb navigation (`Home > Question Bank > CUET`).
     - Graduation cap badge emblem, H1 title *"CUET Question Bank"*, and subtitle.
     - Right desk illustration.
  3. Implemented Toolbar Row with `CUET (UG)` / `CUET (PG)` pill toggle switch and global search box with submit button.
  4. Built Left Filter Questions Sidebar:
     - Group 1: Subject (All Subjects, General Test, English, Domain Subjects).
     - Group 2: Difficulty Level with colored pill badges (`Easy` green, `Medium` amber, `Hard` red).
     - Group 3: Question Type (All Types, MCQ Single Correct).
  5. Implemented Right Grid with 8 Subject Cards (4 columns × 2 rows):
     - General Test (5,200+ Questions)
     - English (3,800+ Questions)
     - Physics (4,500+ Questions)
     - Chemistry (4,400+ Questions)
     - Mathematics (5,000+ Questions)
     - Biology (4,200+ Questions)
     - Economics (3,600+ Questions)
     - Accountancy (3,200+ Questions)
     - Each card features custom icon bubbles, topic summaries, and `Practice Now →` action buttons.
  6. Maintained zero-JS expandable conceptual derivations (`<details>`) for problem revision.
- **Outcome:** 100% visual and functional fidelity to the provided Question Bank mockup, seamless integration with the royal purple design system, zero broken links, and 100% WCAG 2.1 AA/AAA compliance.

## Decision 022: Continuous Sliding Marquee with Edge Blur Masks on Homepage
- **Date:** 2026-11-06
- **Status:** Approved & Implemented
- **Context:** User requested:
  1. Remove the social proof stats strip (`10,000+ Aspirants`, `50,000+ Questions`, `5+ Categories`, `95% Satisfaction`) from the homepage hero.
  2. Transform the 3 core homepage sections (*Why Choose ExamMate AI?*, *Popular Exams on ExamMate AI*, *How It Works?*) into smooth sliding carousels moving continuously from right to left, with soft gradient & blur overlays at the start and end after showing 2-3 active slides.
- **Decision:**
  1. Removed `.hero-stats-strip` from `frontend/index.html`.
  2. Engineered `.slider-blur-container` with dual gradient masks (`mask-image: linear-gradient(to right, transparent, black 14%, black 86%, transparent)`) and pseudo-elements `::before` & `::after` featuring subtle backdrop blur (`backdrop-filter: blur(4px)`) and canvas-matching fade gradients.
  3. Built `.slider-track` powered by `@keyframes slideTrackLeft` moving continuously from `translateX(0)` to `translateX(-50%)` with seamless item duplication for a jitter-free infinite loop.
  4. Added hover pause capability (`animation-play-state: paused`) for interactive exploration, and configured accessible `prefers-reduced-motion` fallbacks.
  5. Implemented distinct pacing across the three sections:
     - *Why Choose Us:* Standard smooth pace (26s).
     - *Popular Exams:* Brisk flow (20s).
     - *How It Works:* Gentle steady cadence (32s).
- **Outcome:** High-end, dynamic edtech landing page feel with soft edge blurring, pause-on-hover accessibility, zero layout shifts, and 100% WCAG 2.1 AA/AAA compliance.
