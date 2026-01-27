# Momentum - Life Planner + Habit Tracker

A beautiful, dark-themed life planning and habit tracking web app built with Next.js, featuring AI coaching via Claude.

## Features

### Daily Planning
- Full daily plan page with goals, top priorities, hourly schedule
- Primary/secondary task lists
- Rich text notes editor (Tiptap)
- Day review section with accomplishments, lessons, gratitude

### Weekly Planning
- Weekly plan page with last week review
- Weekly priorities and action items
- Life area goals grid
- Week navigation with mini calendar

### Monthly Calendar
- Full month calendar grid
- Event creation with life area assignment
- Month goals and notes sidebar
- Color-coded events by life area

### Habit Tracking
- Habit CRUD with multiple types (yes/no, quantity, timed)
- Flexible scheduling (daily, specific days, X times per week)
- Streak calculation and visualization
- Habit history calendar (contribution graph style)

### Mood Tracking
- 5-level emoji mood picker
- Mood notes
- Integrated into daily review
- Mood trend visualization chart

### Gamification
- XP system with levels
- 20 achievements to unlock
- Confetti and level-up animations
- Achievement notifications

### AI Integration
- Claude API integration for chat coach
- AI insights generation
- Weekly analysis and suggestions

## Tech Stack

- **Framework:** Next.js 14 (App Router) + TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **Animations:** Framer Motion
- **State Management:** Zustand
- **Local Storage:** IndexedDB via Dexie.js
- **AI:** Claude API (Anthropic SDK)
- **Charts:** Recharts
- **Icons:** Lucide React
- **Rich Text:** Tiptap
- **Date Handling:** date-fns

## Getting Started

### Installation

```bash
cd life-planner
npm install
```

### Environment Setup

For AI features, create a `.env.local` file:

```
ANTHROPIC_API_KEY=your_api_key_here
```

Get your API key from https://console.anthropic.com/

### Run Development Server

```bash
npm run dev
```

Open http://localhost:3000

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
/src
  /app
    /page.tsx                 # Daily planning (home page)
    /weekly/page.tsx          # Weekly planning
    /monthly/page.tsx         # Monthly calendar
    /habits/page.tsx          # Habit management
    /goals/page.tsx           # Goals by life area
    /insights/page.tsx        # Analytics & charts
    /coach/page.tsx           # AI coach chat
    /achievements/page.tsx    # Gamification hub
    /settings/page.tsx        # App settings & life areas
    /api/chat/route.ts        # Claude API endpoint
    /api/insights/route.ts    # AI insights endpoint

  /components
    /ui                       # shadcn components
    /planner                  # Planning components
    /habits                   # Habit tracking components
    /mood                     # Mood tracking components
    /gamification             # XP, achievements, animations
    /charts                   # Recharts visualizations
    /ai                       # AI chat interface
    /shared                   # Shared components

  /lib
    /db.ts                    # Dexie.js database setup
    /store.ts                 # Zustand store
    /types.ts                 # TypeScript types
    /utils.ts                 # Utilities
    /defaults.ts              # Default data & constants

  /hooks
    /useDailyPlan.ts
    /useWeeklyPlan.ts
    /useHabits.ts
    /useGoals.ts
    /useEvents.ts
    /useUser.ts
    /useLifeAreas.ts
```

## Data Storage

All data is stored locally in your browser using IndexedDB. No data is sent to any server except when using AI features (which sends context to Claude API).

Database collections:
- `lifeAreas` - Customizable life categories
- `goals` - Long-term, monthly, and weekly goals
- `dailyPlans` - Daily schedules, tasks, reviews
- `weeklyPlans` - Weekly plans and reviews
- `monthlyPlans` - Monthly goals and notes
- `events` - Calendar events
- `habits` - Habit definitions
- `habitCompletions` - Daily habit completions
- `userData` - XP, level, achievements

## Key Patterns

- Daily plans auto-create when navigating to a new date
- Weekly plans are keyed by Monday of the week
- Streak calculation accounts for habit schedule (not just consecutive days)
- Achievements unlock via event system in useUser hook
- All dates stored as ISO strings, displayed via date-fns

## License

MIT
