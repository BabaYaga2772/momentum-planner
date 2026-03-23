# Decision Log

> Log every significant architectural or product decision here with rationale. Agents: check this before making calls that could conflict with prior decisions.

---

## [Mar 23, 2026] — Multi-Agent Collaboration Model

**Decision:** Adopt the VibeCheck agent workflow for Momentum.
**Rationale:** Bobby already runs this model successfully on VibeCheck and A Custom Coach. Claude owns `src/`, Manus owns `docs/` and non-code deliverables. All branches target `dev`. Only Bobby merges `dev → main`.
**Made by:** Manus (M-01) + Bobby

---

## [Mar 23, 2026] — Cloud Migration Target: Supabase

**Decision:** Supabase is the target backend for cloud sync migration (JOB-002).
**Rationale:** Bobby's existing stack (Next.js, Vercel, GitHub) integrates cleanly with Supabase. VibeCheck already uses Supabase for auth and real-time. Consistent tooling across projects reduces cognitive overhead.
**Status:** CONFIRMED by Bobby — Mar 23, 2026
**Made by:** Manus (M-01) — confirmed by Bobby

---

## [Mar 23, 2026] — `dev` Branch as Integration Gate

**Decision:** All feature branches target `dev`, not `main`. Only Bobby merges `dev → main`.
**Rationale:** Prevents broken code from hitting the live Vercel deployment. Matches VibeCheck workflow.
**Made by:** Manus (M-01)

---
