# GitHub Repo Audit Report — Bobby Siens (@BabaYaga2772)

**Audit Date:** 2026-03-11
**GitHub Profile:** [github.com/BabaYaga2772](https://github.com/BabaYaga2772)

---

## Overview Stats

| Metric | Value |
|---|---|
| **Total Public Repos** | 5 |
| **Original (Non-Fork) Repos** | 2 |
| **Qualifying Original Builds** | 1 (momentum-planner) |
| **Total Lines of Code** | ~7,585 |
| **Total Commits (Original Work)** | 3 |
| **Date Range** | Jan 26–27, 2026 |
| **Primary Language** | TypeScript |
| **Deployment Platform** | Vercel |

### Tech Stack Frequency

| Technology | Used In |
|---|---|
| Next.js (App Router) | momentum-planner |
| TypeScript | momentum-planner |
| Tailwind CSS | momentum-planner |
| shadcn/ui | momentum-planner |
| Zustand | momentum-planner |
| Dexie.js (IndexedDB) | momentum-planner |
| Framer Motion | momentum-planner |
| Recharts | momentum-planner |
| Tiptap | momentum-planner |
| Claude API (@anthropic-ai/sdk) | momentum-planner |
| Vercel (deployment) | momentum-planner |

---

## Important Note on Repo Visibility

> **The following projects Bobby mentioned are NOT publicly visible on GitHub and are likely private repos:**
>
> - **Vibteca** (aka "Vibe Check") — Relationship/chemistry app
> - **Dialed** (aka "Prime Protocol") — Fitness app
> - **Speed of Now Studios** — Production company repos
> - **CreatorBuddy.io** — AI SaaS for content creators
>
> **To include these in the audit, Bobby will need to either:**
> 1. Make those repos public (even temporarily), OR
> 2. Grant repo access / collaborator access so the audit can be re-run, OR
> 3. Provide details manually for each project
>
> This audit covers only what is publicly accessible as of 2026-03-11.

---

## Repos Excluded

| Repo | Reason |
|---|---|
| `awesome-flipperzero` | Fork (isFork = true) |
| `cobalt` | Fork (isFork = true) |
| `flipp_pomodoro` | Fork (isFork = true) |
| `Cursor-practice` | Empty repo (size = 0, no commits — Git Repository is empty) |

---

## Individual Repo Cards

---

### 1. Momentum Planner

```yaml
repo_name: momentum-planner
display_name: Momentum — Life Planner + Habit Tracker
description: >
  A dark-themed, full-featured life planning and habit tracking web app
  with AI coaching via Claude. Features daily/weekly/monthly planning,
  habit tracking with streaks, mood tracking, gamification with XP and
  achievements, and AI-powered insights.
status: MVP Complete / Active
tech_stack:
  frontend:
    - Next.js 16.1.5 (App Router)
    - React 19.2.3
    - TypeScript 5
    - Tailwind CSS 4
    - shadcn/ui (26+ components)
    - Framer Motion 12.29.2
    - Recharts 3.7.0
    - Tiptap 3.17.1 (rich text)
    - react-day-picker 9.13.0
    - Lucide React (icons)
    - canvas-confetti 1.9.4
    - sonner 2.0.7 (toasts)
  backend:
    - Next.js API Routes
    - Dexie.js 4.2.1 (IndexedDB)
  deployment:
    - Vercel (Hobby plan, auto-deploy on push)
  auth: None (local-first, no user accounts)
  ai_tools_used:
    - "[NEEDS BOBBY'S INPUT] — No AI tool references found in commits/code, but codebase quality and scope strongly suggest AI-assisted development"
features:
  - Daily planning with top 3 priorities, hourly schedule, tasks, notes
  - Weekly planning with review, priorities, life area goals
  - Monthly calendar with color-coded events by life area
  - Habit tracking (boolean, quantity, timed) with flexible scheduling
  - Streak calculation that accounts for habit schedule
  - Mood tracking with 5-level emoji picker
  - Gamification — XP system, 30 levels, 20 achievements
  - Confetti and particle animations on achievements/level-ups
  - AI Coach chat interface (Claude Sonnet)
  - AI Insights with weekly analysis and suggestions
  - Analytics dashboard with charts (Recharts)
  - 6 customizable life areas with colors and icons
  - Rich text editor for notes (Tiptap)
  - Settings page with life area customization
  - Dark theme with gradient/glow effects
  - Responsive design (mobile to desktop)
  - Toast notifications (sonner)
  - Skeleton loading states
  - Local-first architecture (all data in IndexedDB)
polish_level: 4.5  # Near production-ready. Polished UI, animations, error handling, loading states. Missing only auth and cloud sync.
lines_of_code: 7585
file_count:
  total_source_files: 73
  tsx_files: 58
  ts_files: 14
  css_files: 1
  components: 48
  pages: 10
  hooks: 7
  lib_files: 5
  api_routes: 2
  ui_components: 26+
commit_count: 3
first_commit: "2026-01-26T18:59:02-06:00"  # "Initial commit from Create Next App"
last_commit: "2026-01-27T02:07:13-06:00"   # "Update CLAUDE.md with deployment info and live URL"
build_duration: "~7 hours (first commit to last commit)"
has_auth: false
has_database: true  # Dexie.js / IndexedDB with 10 collections
has_api: true       # 2 API routes (chat, insights) + Claude API integration
has_responsive_design: true
deployed_url: "https://momentum-planner-nu.vercel.app"
notable:
  - "7,585 lines of code committed in a single day (~7 hour window)"
  - "10 database collections with composite indexes"
  - "20-achievement gamification system with confetti/particle animations"
  - "Complex streak calculation logic handling 3 schedule types"
  - "Full AI integration with Claude for coaching and insights"
  - "Production-deployed on Vercel with live URL"
```

### Lines of Code Breakdown

| Directory | LOC |
|---|---|
| `src/components/` | 4,805 |
| `src/app/` (pages + API) | 1,492 |
| `src/hooks/` | 681 |
| `src/lib/` | 432 |
| `src/app/globals.css` | 175 |
| **Total** | **~7,585** |

### Database Schema (10 Collections)

1. `lifeAreas` — Customizable life categories (name, color, icon, order)
2. `goals` — Long-term, monthly, weekly goals with status tracking
3. `dailyPlans` — Daily schedules, priorities, tasks, reviews, mood
4. `weeklyPlans` — Weekly plans with reviews and life area goals
5. `monthlyPlans` — Monthly goals and notes
6. `events` — Calendar events with time, life area, color coding
7. `habits` — Habit definitions (3 types, flexible scheduling)
8. `habitCompletions` — Daily habit completion records
9. `userData` — XP, level, achievements, settings, streak freezes
10. `aiConversations` — Chat history for AI coach

---

## Timeline View

```
2026-01-26  18:59  CST  ── Initial commit from Create Next App
            19:53  CST  ── Life Planner - Momentum app (MASSIVE commit: full app)
2026-01-27  02:07  CST  ── Update CLAUDE.md with deployment info and live URL

            |<--- ~7 hours total build window --->|
```

**Note:** The bulk of the application (7,500+ lines) was committed in a single commit at 19:53 CST on January 26, 2026. This suggests the code was developed in an AI-assisted tool and then committed as a batch.

---

## Repos Needing Bobby's Input

The following projects were mentioned by Bobby but are **not visible** in the public GitHub profile. These are likely **private repositories**:

| Project Name | Alternate Names | Status |
|---|---|---|
| Vibteca | "Vibe Check" | [NEEDS BOBBY'S INPUT] |
| Dialed | "Prime Protocol" | [NEEDS BOBBY'S INPUT] |
| Speed of Now Studios | — | [NEEDS BOBBY'S INPUT] |
| CreatorBuddy.io | — | [NEEDS BOBBY'S INPUT] |

**To complete the full audit**, Bobby should:
1. Make these repos public temporarily, OR
2. Add a collaborator/token for API access, OR
3. Provide project details manually

---

*Report generated 2026-03-11 by Claude Code audit*
