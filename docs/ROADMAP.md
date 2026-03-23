# Momentum — Product Roadmap

**Vision:** Transform Momentum from a personal habit tracker into a full operational command center — the civilian equivalent of a military daily battle rhythm, built for a veteran entrepreneur running multiple businesses simultaneously.

---

## Phase 1 — Foundation (COMPLETE)
*Original build by Claude*

- Daily/weekly/monthly planning
- Habit tracking (boolean, quantity, timed)
- Mood tracking
- Gamification (XP, levels, 20 achievements)
- AI coach (Claude API)
- AI insights (weekly analysis)
- Local-first storage (Dexie.js/IndexedDB)
- Deployed on Vercel

---

## Phase 2 — Agent Infrastructure (IN PROGRESS — JOB-001)
*Manus Session M-01*

- Multi-agent workflow (AGENTS.md, CLAUDE.md, docs/)
- `dev` branch as integration gate
- Job board + session log
- Agent handoff protocol

---

## Phase 3 — Cloud Sync (JOB-002)
*Owner: Claude*

- Migrate from Dexie.js to Supabase
- Email/password auth + user profiles
- All data persisted in Supabase (Postgres)
- Multi-device sync
- Data migration path for existing local data

---

## Phase 4 — Hierarchical Project Management (JOB-003)
*Owner: Claude*

- Add "Projects" layer beneath Life Areas
- Projects tied to specific business entities (e.g., "CreatorBuddy MVP", "MBA Financial Management", "Speed of Now — Wedding Season")
- Task tagging by context (`@deep-work`, `@admin`, `@errand`, `@shoot`)
- Project-level progress tracking

---

## Phase 5 — AI Chief of Staff Upgrade (JOB-004)
*Owner: Claude*

- Feed AI full user context: business goals, project deadlines, not just habits
- Proactive triage: AI suggests schedule adjustments when priorities are missed
- Voice input for daily reviews and brain dumps (parsed into structured tasks)
- Morning briefing that reads like a commander's daily update

---

## Phase 6 — Command Center Dashboard (JOB-005)
*Owner: Claude*

- Rebuild insights page as operational dashboard
- High-level "operational readiness" view
- Cross-project status at a glance
- Hooks for external data (GitHub commits, financial metrics — future)

---

## Phase 7 — UI/UX Premium Overhaul (JOB-006)
*Owner: Claude*

- Cyberpunk-adjacent dark aesthetic
- Tesla/Starlink-inspired design language
- Premium tool feel — not a consumer habit tracker
- Bobby sign-off required before starting

---

## Phase 8 — Marketing Site (JOB-007)
*Owner: Manus*

- Landing page for Momentum as a standalone product
- Positioned for potential SaaS launch or open-source showcase
- Manus builds in `marketing/` directory

---

## Backlog

- Mobile PWA / React Native app
- Stripe integration (premium tier)
- Public sharing of habit streaks / achievements
- Integration with Speed of Now Productions workflow (shoot scheduling, client deadlines)
- CreatorBuddy.io cross-integration

---

*Last updated: Mar 23, 2026 — Manus (Session M-01)*
