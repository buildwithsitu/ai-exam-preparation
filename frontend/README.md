# Frontend — AI Exam Preparation Platform

This directory contains the client-side single-page / server-rendered web application.

## Recommended Stack
- **Framework**: Next.js (App Router) or Vite + React with TypeScript
- **Styling**: Tailwind CSS
- **Component UI**: shadcn/ui & Radix UI
- **Math & Code Rendering**: `katex`, `react-katex`, `prismjs`
- **Charts & Visualization**: `recharts`
- **State & Data Fetching**: TanStack Query (React Query) + Zustand

## Planned Structure
```
frontend/
├── src/
│   ├── app/                   # Next.js App Router pages & routes
│   │   ├── (auth)/            # Sign-in, sign-up, password reset
│   │   ├── (dashboard)/       # Student dashboard, syllabus browser
│   │   ├── exam/              # Live test runner console
│   │   ├── tutor/             # Interactive AI tutor chat interface
│   │   └── analytics/         # Weakness diagnostics and mistake notebook
│   ├── components/            # Reusable UI components (buttons, modals, calculator)
│   ├── hooks/                 # Custom React hooks (useTimer, useExamState)
│   ├── lib/                   # API clients, KaTeX utilities, helpers
│   └── types/                 # TypeScript interfaces and schemas
├── public/                    # Static assets (favicons, illustrations)
└── package.json
```

