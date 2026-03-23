# Momentum — Life Planner + Habit Tracker

## Live App
**https://momentum-planner-nu.vercel.app**

## Repository
**https://github.com/BabaYaga2772/momentum-planner**

---

## Quick Start

**"Spin up Momentum"** → Claude should:
1. This file auto-loads — do NOT read the full docs unless needed
2. Read `AGENTS.md` — crew manifest: who owns what, full job board
3. Fetch latest `dev`, branch from it
4. Read ONLY the last 2-3 sessions from `docs/SESSIONS.md`, then write a 3-5 line summary as working memory. Do NOT keep full session history in context.
5. Only read `docs/ROADMAP.md`, `docs/DECISIONS.md`, `docs/BUGS.md` if the current task requires them. Never preload all docs.
6. Ask Bobby what's next

---

## Overview

A dark-themed life planning and habit tracking web app with AI coaching via Claude. Currently local-first (Dexie.js/IndexedDB). **Cloud sync migration to Supabase is the top architectural priority.**

---

## Features (Current)

- **Daily Planning**: Goals, top priorities, hourly schedule, tasks, notes, day review
- **Weekly Planning**: Last week review, weekly priorities, life area goals
- **Monthly Calendar**: Event management, month goals, color-coded by life area
- **Habit Tracking**: Yes/no, quantity, and timed habits with streak tracking
- **Mood Tracking**: 5-level emoji picker integrated into daily review
- **Gamification**: XP system, levels, 20 achievements, confetti animations
- **AI Coach**: Chat interface powered by Claude API
- **AI Insights**: Weekly analysis and suggestions

---

## Tech Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS + shadcn/ui
- Framer Motion (animations)
- Dexie.js (IndexedDB — **local-first, migration to Supabase pending**)
- Zustand (state management)
- Tiptap (rich text editor)
- Recharts (data visualization)
- Claude API (`claude-sonnet-4-20250514`) for AI features
- Deployed on **Vercel** (Hobby plan), auto-deploys on push to `main`

---

## Key Commands

- `npm run dev` — Start development server
- `npm run build` — Production build
- `npm run lint` — Run ESLint

---

## Environment Variables

- `ANTHROPIC_API_KEY` — Required for AI coach and insights features

---

## Project Structure

```
/src
  /app
    /page.tsx                 # Daily planning (home)
    /weekly/page.tsx          # Weekly planning
    /monthly/page.tsx         # Monthly calendar
    /habits/page.tsx          # Habit management
    /goals/page.tsx           # Goals by life area
    /insights/page.tsx        # Analytics & charts
    /coach/page.tsx           # AI coach chat
    /achievements/page.tsx    # Gamification hub
    /settings/page.tsx        # App settings
    /api/chat/route.ts        # Claude chat endpoint
    /api/insights/route.ts    # AI insights endpoint
  /components
    /ui                       # shadcn components
    /planner                  # Planning components
    /habits                   # Habit tracking
    /mood                     # Mood tracking
    /gamification             # XP, achievements, animations
    /charts                   # Recharts visualizations
    /ai                       # Chat interface
    /shared                   # Sidebar, navigation
  /lib
    /db.ts                    # Dexie.js database (migration target)
    /store.ts                 # Zustand store
    /types.ts                 # TypeScript types
    /utils.ts                 # Utilities
    /defaults.ts              # Constants & defaults
  /hooks
    /useDailyPlan.ts
    /useWeeklyPlan.ts
    /useHabits.ts
    /useGoals.ts
    /useEvents.ts
    /useUser.ts
    /useLifeAreas.ts
```

---

## Architecture Decisions

- **Local-first (current):** All data in IndexedDB via Dexie.js
- **Cloud-first (target):** Supabase for auth, database, and real-time sync — see `docs/DECISIONS.md`
- **Life Areas:** Customizable categories (Physical, Personal, Family, Work, Social, Others)
- **XP System:** Earn XP for completing habits, daily reviews, weekly planning

---

## Database Collections

- `lifeAreas` — Customizable life categories
- `goals` — Long-term, monthly, and weekly goals
- `dailyPlans` — Daily schedules, tasks, reviews, mood
- `weeklyPlans` — Weekly plans and reviews
- `monthlyPlans` — Monthly goals and notes
- `events` — Calendar events
- `habits` — Habit definitions
- `habitCompletions` — Daily habit completions
- `userData` — XP, level, achievements, settings

---

## Conventions

- Components use named exports
- Hooks prefixed with `use`
- Database operations through hooks, not directly in components
- All dates stored as ISO strings, displayed via date-fns
- Life area colors use Tailwind color classes

---

## Important Patterns

- Daily plans auto-create when navigating to a new date
- Weekly plans keyed by Monday of the week
- Streak calculation accounts for habit schedule (not just consecutive days)
- Achievements unlock via event system in `useUser` hook
- `useLiveQuery` for reads, `useEffect` for writes (Dexie pattern — will change post-migration)

---

## AI Integration

- API routes in `/app/api/chat` and `/app/api/insights`
- Uses `@anthropic-ai/sdk` with `claude-sonnet-4-20250514`
- Requires `ANTHROPIC_API_KEY` environment variable
- Current context: mood scores, active habits, goals, recent accomplishments
- **Target:** Full user context including business goals, project deadlines, and proactive triage

---

## Agent Coordination

- Read `AGENTS.md` at session start — it shows the full crew, job board, and what Manus has built
- Read `docs/AGENT_HANDOFF.md` at session start (most recent entry first)
- Prepend a new entry to `docs/AGENT_HANDOFF.md` at session end before committing
- Update `AGENTS.md` job board if any tasks change status
- **Never push to `main` directly** — always use feature branches targeting `dev`
- **Claude owns `src/`. Manus owns `docs/` and `marketing/`.** Do not cross the line.

---

## Session Protocol

**Starting:** This file auto-loads. Fetch `dev` (`git fetch origin dev`) and branch from it.
**Ending:** Update `docs/SESSIONS.md`, `CHANGELOG.md` if version-worthy. Push `claude/*` branch, open PR targeting `dev` (never `main`).

---

## Compaction Instructions

**Before compacting**, update these docs with any work done so far:
- `docs/SESSIONS.md` — Add/update current session entry
- `docs/DECISIONS.md` — Log any new decisions made
- `docs/BUGS.md` — Log any new bugs found/fixed
- `CHANGELOG.md` — If version-worthy changes were made
- Commit and push if possible

**When compacting context, always preserve:**
- Current task and progress
- List of files modified this session
- Any uncommitted changes
- Branch state (which branch, sync status)
- Last 2 session summaries from `docs/SESSIONS.md`

---

## Deployment

- Hosted on **Vercel** (Hobby plan)
- Auto-deploys on push to `main` branch
- `dev` branch = integration branch (never deploy directly from feature branches)
- Only Bobby merges `dev → main`

---

*Last updated: Mar 23, 2026 — Manus (Session M-01)*
