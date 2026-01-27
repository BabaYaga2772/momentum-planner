# Momentum - Life Planner + Habit Tracker

## Live App
**https://momentum-planner-nu.vercel.app**

## Repository
**https://github.com/BabaYaga2772/momentum-planner**

## Overview
A dark-themed life planning and habit tracking web app with AI coaching via Claude.

## Features
- **Daily Planning**: Goals, top priorities, hourly schedule, tasks, notes, day review
- **Weekly Planning**: Last week review, weekly priorities, life area goals
- **Monthly Calendar**: Event management, month goals, color-coded by life area
- **Habit Tracking**: Yes/no, quantity, and timed habits with streak tracking
- **Mood Tracking**: 5-level emoji picker integrated into daily review
- **Gamification**: XP system, levels, 20 achievements, confetti animations
- **AI Coach**: Chat interface powered by Claude API
- **AI Insights**: Weekly analysis and suggestions

## Tech Stack
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS + shadcn/ui
- Framer Motion (animations)
- Dexie.js (IndexedDB storage)
- Zustand (state management)
- Tiptap (rich text editor)
- Recharts (data visualization)
- Claude API (AI features)

## Key Commands
- `npm run dev` - Start development server
- `npm run build` - Production build
- `npm run lint` - Run ESLint

## Deployment
- Hosted on **Vercel** (Hobby plan)
- Auto-deploys on push to main branch
- Environment variable needed for AI: `ANTHROPIC_API_KEY`

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
    /db.ts                    # Dexie.js database
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

## Architecture Decisions
- **Local-first**: All data in IndexedDB via Dexie.js, designed for future cloud sync
- **Life Areas**: Customizable categories (Physical, Personal, Family, Work, Social, Others)
- **XP System**: Earn XP for completing habits, daily reviews, weekly planning

## Database Collections
- `lifeAreas` - Customizable life categories
- `goals` - Long-term, monthly, and weekly goals
- `dailyPlans` - Daily schedules, tasks, reviews, mood
- `weeklyPlans` - Weekly plans and reviews
- `monthlyPlans` - Monthly goals and notes
- `events` - Calendar events
- `habits` - Habit definitions
- `habitCompletions` - Daily habit completions
- `userData` - XP, level, achievements, settings

## Conventions
- Components use named exports
- Hooks prefixed with `use`
- Database operations through hooks, not directly in components
- All dates stored as ISO strings, displayed via date-fns
- Life area colors use Tailwind color classes

## Important Patterns
- Daily plans auto-create when navigating to a new date
- Weekly plans keyed by Monday of the week
- Streak calculation accounts for habit schedule (not just consecutive days)
- Achievements unlock via event system in useUser hook
- useLiveQuery for reads, useEffect for writes (Dexie pattern)

## AI Integration
- API routes in `/app/api/chat` and `/app/api/insights`
- Uses @anthropic-ai/sdk with claude-sonnet-4-20250514
- Requires `ANTHROPIC_API_KEY` environment variable
