# System Requirements Specification (SRS)

## 1. Introduction
This document defines the Functional Requirements (FR) and Non-Functional Requirements (NFR) for the **AI Exam Preparation Platform**.

---

## 2. Functional Requirements (FR)

### 2.1 User Authentication & Profile Management
- **FR-1.1 (Registration & Login)**: System shall support secure sign-up and login via email/password, OAuth2 (Google, GitHub), and magic link authentication.
- **FR-1.2 (Role-Based Access Control - RBAC)**: System shall distinguish between `Student`, `Instructor/Admin`, and `System Administrator` roles.
- **FR-1.3 (Exam Profile Configuration)**: Users shall select target examinations (e.g., GATE CS, FE Exam, GRE), exam year, target percentile, and specific weak areas during onboarding.

### 2.2 Syllabus & Knowledge Base Management
- **FR-2.1 (Hierarchical Syllabus Tree)**: System shall maintain structured syllabi categorized into `Subject` $\rightarrow$ `Topic` $\rightarrow$ `Subtopic` (e.g., *Computer Science* $\rightarrow$ *Operating Systems* $\rightarrow$ *CPU Scheduling Algorithms*).
- **FR-2.2 (Document Ingestion & Knowledge Grounding)**: Instructors/Admins shall be able to upload reference materials (PDFs, Markdown notes, Past Exam Papers) which are automatically chunked, embedded, and tagged to the syllabus tree.
- **FR-2.3 (Metadata Annotation)**: Documents and syllabus nodes must support metadata tags: weightage, difficulty, Bloom's taxonomy level (Recall, Understanding, Application, Analysis).

### 2.3 AI-Powered Question Generator & Bank
- **FR-3.1 (Multi-Format Question Generation)**:
  - **MCQ (Multiple Choice Questions)**: Single correct option out of four.
  - **MSQ (Multiple Select Questions)**: One or more correct options out of four, requiring exact matching.
  - **NAT (Numerical Answer Type)**: Exact numerical answer within a configurable floating-point tolerance range $[x - \epsilon, x + \epsilon]$.
  - **Descriptive / Subjective**: Step-by-step problem requiring AI rubric evaluation.
- **FR-3.2 (Difficulty Calibration)**: Generated questions must be explicitly parameterizable by difficulty (Easy, Medium, Hard, Olympiad/Advanced) and cognitive level.
- **FR-3.3 (LaTeX & Code Syntax Formatting)**: System shall render complex mathematical expressions ($\LaTeX$), chemical notations, and syntax-highlighted code blocks.
- **FR-3.4 (Automated Grounded Explanations)**: Every question must come with step-by-step solutions citing the underlying principle or textbook reference.

### 2.4 Mock Test & Examination Engine
- **FR-4.1 (Exam Interface Replica)**: Provide a real-time exam console with:
  - Question palette with status indicators (Answered, Unanswered, Marked for Review, Visited/Not Visited).
  - Countdown timer with auto-submit on expiration.
  - Built-in on-screen scientific calculator matching standard competitive exam specifications.
  - Question scratchpad / virtual notes.
- **FR-4.2 (Configurable Test Modes)**:
  - *Full Mock*: Full syllabus, strict time limits, realistic negative marking rules (e.g., $-0.33$ or $-0.66$).
  - *Subject / Topic Test*: Targeted drills with optional immediate feedback.
  - *Custom Quiz*: User-selected subtopics, question counts, and difficulty filters.
- **FR-4.3 (Instant Scoring & Post-Test Analysis)**:
  - Total score, accuracy percentage, time spent per question, percentile estimate.
  - Category breakdown showing strengths, time sinks, and avoidable negative marking penalties.

### 2.5 RAG-based AI Tutor & Socratic Assistant
- **FR-5.1 (Interactive Doubt Clarification)**: Students can ask questions regarding any test question, syllabus topic, or theory concept.
- **FR-5.2 (Socratic Hint Mode)**: Rather than instantly revealing the answer, the AI tutor shall offer progressive hints guiding the student toward the solution.
- **FR-5.3 (Reference Citations)**: AI answers must include verifiable references and chapter citations from ingested knowledge materials.
- **FR-5.4 (Guardrails & Hallucination Mitigation)**: Questions outside the domain or exam scope must be rejected or redirected to relevant topics.

### 2.6 Mistake Notebook & Spaced Repetition (SRS)
- **FR-6.1 (Automated Mistake Capture)**: Incorrect or skipped questions are automatically added to the student's personal "Mistake Notebook".
- **FR-6.2 (Error Classification)**: Students can tag errors as *Conceptual Gap*, *Calculation Error*, *Misread Question*, or *Time Pressure*.
- **FR-6.3 (Spaced Repetition Scheduler)**: Implements an SM-2 / Leitner algorithm to schedule revision of incorrect problems at intervals of 1, 3, 7, 14, and 30 days.

---

## 3. Non-Functional Requirements (NFR)

### 3.1 Performance & Latency
- **NFR-1.1**: Test console UI interactions (switching questions, saving answers) must execute with latency $< 50\text{ ms}$.
- **NFR-1.2**: AI Tutor streaming response Time to First Token (TTFT) must be $< 1.5\text{ s}$.
- **NFR-1.3**: Document ingestion and embedding generation must process standard 100-page PDF textbooks in $< 90\text{ s}$.

### 3.2 Scalability & Availability
- **NFR-2.1**: The system must sustain at least 5,000 concurrent mock test sessions with 99.9% uptime.
- **NFR-2.2**: Backend services must be stateless and horizontally scalable behind a load balancer.

### 3.3 Security & Compliance
- **NFR-3.1 (Data Encryption)**: All data in transit must use TLS 1.3; sensitive stored data (passwords, tokens, user data) must use AES-256 encryption.
- **NFR-3.2 (API Authentication & Rate Limiting)**: API endpoints must be protected with JWT tokens and IP/user rate-limiting to prevent LLM abuse and DDoS attacks.
- **NFR-3.3 (Data Privacy)**: Compliance with standard data privacy principles; student performance data must not be exposed to third parties.

### 3.4 Usability & Accessibility
- **NFR-4.1**: Fully responsive web design supporting desktops, tablets, and mobile displays.
- **NFR-4.2**: High-contrast dark mode and light mode matching WCAG 2.1 AA accessibility guidelines.
- **NFR-4.3**: Keyboard navigation shortcuts for exam interface (e.g., `Alt+N` for Next, `Alt+S` for Save & Mark).

---

## 4. Hardware & Software Constraints
- **Client Platforms**: Modern evergreen web browsers (Chrome $\ge 110$, Firefox $\ge 110$, Safari $\ge 16$, Edge $\ge 110$).
- **Deployment Platform**: Dockerized container deployment with cloud orchestration (Kubernetes or Cloud Run/ECS).

