# Momentum Planner — Agent Crew Manifest

**App:** Momentum Planner — Life Planning + Habit Tracking + AI Coaching
**Live:** https://momentum-planner-nu.vercel.app
**Repo:** https://github.com/BabaYaga2772/momentum-planner
**Owner:** Bobby (BabaYaga2772)

---

## The Crew

| Agent | Role | Owns | Contact |
|---|---|---|---|
| **Claude** | App Engineering | `src/` — all app code, architecture, data models | claude.ai |
| **Manus** | Strategy, Research, Non-code Deliverables | `docs/` (non-session), `marketing/` (future), analysis, prompts | manus.im |
| **Cursor** | In-editor assist | Works in `src/` alongside Claude | Cursor IDE |
| **Bobby** | Product Owner | All product decisions, merges `dev → main` | — |

---

## Job Board

### Active / In Progress

| Job ID | Title | Description | Owner | Status | Started | Due |
|---|---|---|---|---|---|---|
| JOB-001 | Agent Infrastructure Setup | AGENTS.md, updated CLAUDE.md, docs/ scaffold, `dev` branch | Manus | DONE | Mar 23 | Mar 23 |
| JOB-002 | Cloud Sync Migration | Migrate from Dexie.js (IndexedDB) to Supabase — auth, database, real-time | Claude | OPEN | — | TBD |
| JOB-003 | Project/Operations Layer | Add hierarchical Projects beneath Life Areas; tag system for context | Claude | OPEN | — | TBD |
| JOB-004 | AI Chief of Staff Upgrade | Evolve AI coach: feed business goals + deadlines, proactive triage, voice input | Claude | OPEN | — | TBD |
| JOB-005 | Command Center Dashboard | Rebuild insights page as operational dashboard; external data hooks | Claude | OPEN | — | TBD |
| JOB-006 | UI/UX Premium Overhaul | Cyberpunk-adjacent dark aesthetic; Tesla/Starlink-inspired; pro tool feel | Claude | OPEN | — | TBD |
| JOB-007 | Marketing Site | Landing page for Momentum as a standalone product (future) | Manus | BACKLOG | — | TBD |

### Bobby's Decisions Needed

- **JOB-002:** Confirm Supabase as cloud backend (vs Firebase/PlanetScale)
- **JOB-003:** Define the "Projects" data model — how deep should the hierarchy go?
- **JOB-006:** Approve design direction before Claude starts UI overhaul

### Completed

| Job ID | Title | Owner | Completed |
|---|---|---|---|
| JOB-001 | Agent Infrastructure Setup | Manus | Mar 23, 2026 |

---

## Session Log

### [Mar 23, 2026] — Manus — Session M-01

**Jobs touched:** JOB-001
**What was done:**
- Analyzed full codebase (src/, lib/, hooks/, api routes)
- Reviewed VibeCheck and A Custom Coach for workflow patterns
- Wrote AGENTS.md (this file), updated CLAUDE.md, wrote Claude Code handoff prompt
- Created `docs/` directory scaffold
- Created `dev` branch

**Branch:** `manus/agent-infrastructure` → merge to `dev`

---

## Key Files Reference

| File | Owner | Purpose |
|---|---|---|
| `AGENTS.md` | All | **This file** — crew manifest, job board, session log |
| `CLAUDE.md` | Claude | Auto-loaded rules, architecture, session protocol |
| `docs/AGENT_HANDOFF.md` | All | Async coordination log — read most recent entry first |
| `docs/SESSIONS.md` | Claude | Full Claude session history |
| `docs/DECISIONS.md` | All | Decision log with rationale |
| `docs/ROADMAP.md` | All | Product roadmap by phase |
| `docs/BUGS.md` | Claude | Bug tracker |
| `src/` | Claude | App source code — do not modify without Claude context |

---

## Standing Rules for All Agents

1. **Never push directly to `main`.** Feature branches only. All branches target `dev`.
2. **Tag every commit with a Job ID.** Format: `[JOB-###] type: description`
3. **Claude owns `src/`. Manus owns `docs/` and `marketing/`.** Do not cross the line without flagging it.
4. **Cursor works in `src/` alongside Claude.** Never push directly to `main`.
5. **Read `docs/AGENT_HANDOFF.md`** at session start (most recent entry first).
6. **Update this file's job board** when task status changes.
7. **Append to Session Log** at session end.
8. **Self-merge your own PRs into `dev`** using `gh pr merge --merge --delete-branch`. Do not wait for Bobby.
9. **Only Bobby merges `dev → main`.** That is the only gate he needs to hold.
10. **Delete feature branches immediately after merge.** Remote stays clean.
11. **Bobby makes product decisions.** Agents execute. Flag blockers, don't make calls unilaterally.
12. **Local-first → cloud-first transition is the top architectural priority.** All new features should assume Supabase, not Dexie.js.

---

## How to Summon Each Agent

### Claude (app engineering)
Open claude.ai or Claude Code. `CLAUDE.md` auto-loads.
Claude will: read `AGENTS.md` + `docs/AGENT_HANDOFF.md` → branch from `dev` → do the work → update session log → push `claude/*` branch → open PR to `dev`.

### Manus (strategy + non-code)
Open manus.im, Momentum project.
Manus will: pull latest → read `AGENTS.md` → do the work → push `manus/*` branch → update session log.

### Cursor (in-editor assist)
Open Cursor in repo root. Works in `src/` alongside Claude's architecture.
Branch `cursor/*` for significant changes. Never push to `main`.

---

*Last updated: Mar 23, 2026 — Manus (Session M-01)*
