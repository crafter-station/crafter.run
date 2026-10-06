# Secondary pages — October 2, 2026

The user explicitly resumed after the final handoff and asked to update the
remaining pages with the approved visual direction. This entry follows the
previous closed iteration. The active checkout remains `crafter.run-bucle`,
branch `feat/station-bucle`, with the earlier uncommitted work preserved.

## Changes

- `station-pages.css` scopes the secondary-page canvas and its warm, green,
  violet and blue palettes. It shares the approved equal desktop insets,
  32px social offset, Crafter typography and 18/16/14px hierarchy.
- `StationPageHero` and seven original SVG scenes provide shorter introductions
  with copy, actions and artwork grouped together. Page titles were shortened
  in all five message catalogs without changing the underlying facts.
- Team puts its filters and larger portraits immediately after the introduction.
  The booking invitation and alumni follow the directory. Existing members,
  shuffle, area filters, portraits and destinations are retained.
- Team profiles use an identity panel, quieter social links and content panels.
  Member tabs now implement roving focus, Left/Right/Home/End, and explicit
  tab/panel relationships.
- Contact, work-with-us, sponsors, Research, brand, community, Ships, ideas and
  workshop pages use soft cards instead of the old bordered grid. Booking
  choices retain their selected state and original Cal destinations.
- Timeline and OSS metrics retain real data, filters, charts, provenance and
  counts; their surrounding layout and metrics panels were recomposed.
- Both hackathon pages adopt the calmer system. The immersive report keeps its
  navigation, reveal/count behavior and source content, with shorter sections,
  cards and no crosshair grid.
- Protected onboarding/profile/draft pages inherit the form treatment.
  Public Ship/member details retain their data and auth boundaries.
- Documentation keeps Fumadocs navigation, search, code, Markdown controls and
  content; its title, cards and utility controls receive the same cleanup.
- Fixed service links to retired `/team/cuevaio` and `/team/emmy` profiles.
  Product engineering now opens the existing work-with-us calendar anchor;
  growth automation opens Nacho's current profile.
- Brand's Text specimen label now correctly says 0.301. Font binaries did not
  change. The approved Home, Universe, OSS index, Agenda, Journal and Font
  compositions were not redesigned.

## Verification

- Final production build: 3 successful tasks, 308 generated pages.
- Existing suite: 95 passing tests, 276 assertions.
- Web typecheck: only the six pre-existing migration errors at
  `scripts/migrate-supabase-boards.ts` lines 33, 53, 68, 82, 98 and 111.
  Next still ignores web build type errors; lint remains unconfigured.
- `git diff --check` passed.
- Browser: 20 routes in each of en/es/pt/zh/ja at 320px, 100 combinations,
  with a rendered heading and no document overflow. Routes include team,
  contact, research, Ships, community, brand, work-with-us, sponsors, OpenCode,
  Claude Code, n8n, next-project ideas, workshop questions, both hackathon
  pages, Petdex, timeline, metrics, Railly's profile and documentation.
- Additional desktop review at 1280px and 1024px in both themes. The standard
  content starts at 200px at 1024px, clearing the left rail.
- Team Design/All filters and restored 10-member list passed. Profile tab
  selection and Home/End focus/selection passed. Contact booking selection
  passed; the selection retained its original integration.
- Final browser check removed the obsolete uppercase utility from member tabs:
  its 14px metadata rule overrode the intended 16px control size. All five
  profile locales were rechecked at 320px; tabs render at 16px without overflow.
  Hackathon introductions/captions were also confirmed at 18px/16px. This
  class-only adjustment followed the successful build and test run.
- Sign-in renders at 320px without document overflow. Authenticated submissions,
  voting, booking confirmation and publishing were not exercised. Data-backed
  community/Ships views retained their honest unavailable states in this local
  environment; populated public details and protected forms are type/build
  verified but not authenticated end-to-end.
- One browser engine was used. Reduced-motion rules were reviewed in source.

## Continuity

Preview: `http://localhost:8875/es/team` (the same development port).
No commit, push, deployment or data mutation was performed.
The user's operational preference remains **no web search tool**.

The current chat's `outputs/crafter-pages/` contains review screenshots and the
100-route layout report. `work/before-pages/` preserves the pre-edit versions
of presentation files; it is not a replacement for the older recovery ZIP.
Future edits belong in this active checkout.
