# UI/UX Design Brief: Momentum Premium Overhaul (JOB-006)

**Target Audience:** Bobby (Navy MC1 veteran, MBA candidate, multi-business owner, completionist/optimizer).
**Core Vibe:** A high-end operational command center. Not a consumer habit tracker.
**Visual References:** Tesla UI, Starlink app, Linear, Raycast, cyberpunk-adjacent minimalism.

---

## 1. The Core Aesthetic

Momentum needs to shed the "standard shadcn/ui dark mode" look and adopt a highly opinionated, premium aesthetic. It should feel like software used to launch rockets or manage a fleet of autonomous vehicles.

### Color Palette
- **Backgrounds:** Deep, true blacks (`#000000` to `#0A0A0A`) rather than washed-out grays.
- **Surfaces:** Extremely subtle elevations. Use 1px borders with low opacity (`rgba(255,255,255,0.05)`) instead of heavy drop shadows.
- **Accents:** High-contrast, electric accents used sparingly. Think Tesla's electric blue or a cyberpunk neon purple/cyan, but muted for daily productivity.
- **Text:** High-contrast white for primary data, muted slate for secondary metadata.

### Typography
- **Primary Font:** A clean, geometric sans-serif (e.g., Inter, Geist, or a monospaced font for data).
- **Data/Numbers:** Must use tabular lining (monospaced numbers) so metrics and times align perfectly in columns.
- **Hierarchy:** Extreme contrast in font weights. Tiny, uppercase, tracked-out labels for metadata; large, thin weights for primary metrics.

---

## 2. Layout & Architecture

### The "Command Center" Approach
- **Density:** High information density. Bobby is an optimizer; he doesn't need massive padding or whitespace. Pack the data tightly but keep it legible through strict alignment.
- **Navigation:** Move away from a standard top-nav or bulky sidebar. Consider a collapsible, icon-driven rail (like Linear or Discord) or a command-palette-first approach (like Raycast) where `Cmd+K` drives navigation.
- **Modularity:** Panels should feel like widgets in a dashboard. Use a strict grid system.

### Specific Component Upgrades

| Component | Current State | Target State |
|---|---|---|
| **Daily Schedule** | Standard list | A timeline view resembling a flight manifest or production call sheet. |
| **Habit Streaks** | Basic counters | Visual heatmaps (like GitHub contribution graphs) or glowing progress rings. |
| **Mood Tracker** | Emoji picker | A sleek, continuous slider or a minimalist 5-point data scale (no emojis). |
| **AI Coach** | Standard chat UI | A "terminal" or "console" style interface. The AI is a Chief of Staff, not a chatbot. |

---

## 3. Micro-Interactions & Polish

- **Haptics/Feedback:** Every action (checking a habit, completing a task) should have a crisp, satisfying visual snap.
- **Animations:** Fast and purposeful. No bouncy or playful animations. Use ease-out curves that feel mechanical and precise.
- **Glow Effects:** Use very subtle, blurred radial gradients behind active or completed items to give a "powered on" neon effect (cyberpunk influence).

---

## 4. User-Friendliness & AI Evolution

While the aesthetic is advanced, the UX must remain frictionless:
- **Progressive Disclosure:** Hide complex settings behind hover states or secondary clicks. Keep the primary view clean.
- **The "Eye" Icon:** Implement a floating, unobtrusive icon (e.g., an eye within a circle) that toggles "Context Mode." When active, it provides pop-up explanations or AI-driven insights for whatever module the user is looking at. This future-proofs the UI for deeper agentic AI integration.

---

## 5. Implementation Directives for Claude

When executing this brief (JOB-006):
1. **Lock the Theme:** Disable the light mode toggle. This app is dark-mode native.
2. **Tailwind Config:** Overwrite the default shadcn variables. Strip out the rounded corners (`radius: 0` or `0.25rem` max).
3. **Component Audit:** Review every existing component and strip away unnecessary borders, backgrounds, and padding.
4. **Data Viz:** Upgrade Recharts to use the new neon/electric accent colors against the true black background.

---
*Prepared by Manus — Mar 23, 2026*
