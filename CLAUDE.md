# Momentum - Life Planner + Habit Tracker

## Overview
A dark-themed life planning and habit tracking web app with AI coaching via Claude.

## Development Principles
- **Security always**: Follow OWASP best practices. Sanitize inputs, escape outputs, validate on server, never trust client data. No secrets in client code.
- **Use modern best practices**: Always use the latest stable patterns and APIs. No legacy approaches.
- **No pointless code**: Every line must serve a purpose. No dead code, no unused imports, no over-engineering.
- **Question everything**: Before implementing, ask: Is there a better way? A faster way? A simpler way?
- **Performance first**: Choose the less resource-intensive solution. Optimize renders, minimize bundle size, lazy load where appropriate.
- **Simplicity over cleverness**: Readable, maintainable code beats clever one-liners.
- **Delete, don't comment**: Remove unused code entirely. Git has history.

## Tech Stack
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS + shadcn/ui
- Framer Motion (animations)
- Dexie.js (IndexedDB storage)
- Zustand (state management)
- Tiptap (rich text)
- Claude API (AI features)

## Key Commands
- `npm run dev` - Start development server
- `npm run build` - Production build
- `npm run lint` - Run ESLint

## Project Structure
- `/app` - Next.js pages and API routes
- `/components` - React components organized by feature
- `/lib` - Core utilities, database, store
- `/hooks` - Custom React hooks

## Architecture Decisions
- **Local-first**: All data in IndexedDB via Dexie.js, designed for future cloud sync
- **Life Areas**: Customizable categories that organize habits, goals, and tasks
- **XP System**: Users earn XP for habits, planning, and reviews

## Conventions
- Components use named exports
- Hooks prefixed with `use`
- Database operations through hooks, not directly in components
- All dates stored as ISO strings, displayed via date-fns
- Life area colors use Tailwind color classes

## AI Integration
- API routes in `/app/api/chat` and `/app/api/insights`
- Uses @anthropic-ai/sdk
- Context includes recent habits, mood, and review data

## Important Patterns
- Daily plans auto-create when navigating to a new date
- Weekly plans keyed by Monday of the week
- Streak calculation accounts for habit schedule (not just consecutive days)
- Achievements unlock via event system in useGameification hook
