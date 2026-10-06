# Readable type, FAQs and quieter page titles

October 2, 2026. Current checkout: `feat/station-bucle`.

## User direction

- No website text or buttons below 12 px, anywhere.
- Remove unnecessary implementation explanations, particularly the repeated saved-GitHub-reference note.
- Add roughly ten useful FAQs before the homepage's existing contact input, including why Crafter builds open source and how to approach joining the core team.
- Reduce the Open Source title to match the other page scales.
- Keep “Crafter Journal” on one line.

## Implemented

All explicit interface type sizes below 12 px were raised across shared/page CSS and utility classes. This includes the sidebar stamp, controls, footer, five main pages, forms, profiles, ships, boards, team, metrics, timeline, hackathons, code captions and the 404.

The smallest utility, `text-xs`, now resolves to `max(12px, 0.75rem)`, preserving larger reader defaults. Native `small`, `sub`, `sup`, inline code and avatar counters have a 12 px floor. The 404 canvas caption also has a 12 CSS px floor. Tiny decorative labels were removed from the unused fallback project illustration. Agenda scope buttons can wrap rather than shrink.

The repeated OSS fallback explanation was removed from the hero, repository grid, props, five message catalogs and CSS. The profile form no longer displays its API endpoint. Data fetching, caching, empty/error handling and metric calculations remain unchanged.

Open Source uses `clamp(52px, 6.4vw, 92px)`, with 64 px at the intermediate desktop breakpoint and 42–64 px on mobile. The star/repository/issue totals retain their prominent sizing.

Journal's title spans remain inline, with no forced line break. It uses 36 px at 320 px; the decorative emblem steps aside on the narrowest screens so the title remains legible and on one line.

### Closing section

`components/station-faq.tsx` and `lib/faq-copy.ts` provide ten questions and answers in all five locales:

1. What is Crafter Station?
2. Why open source?
3. How to join the community.
4. Contributing beyond code.
5. A first contribution.
6. Becoming part of the core team.
7. Research, Lab, Games and Station.
8. Finding hack0 events.
9. Proposing an idea.
10. Working together on a project.

Core-team copy invites a conversation and collaboration; it does not invent hiring criteria or guarantee membership. Each answer links to an existing destination.

The accordion uses native `details`/`summary`, visible keyboard focus and exclusive opening, without a new client dependency. `suppressHydrationWarning` is scoped to each native disclosure because a visitor can toggle its browser-owned `open` attribute before React hydrates. Their choice remains intact.

The final homepage order is exploration links → FAQs → contact form → compact footer. The existing form behavior is preserved. No contact form was submitted during testing.

### Calendar rendering correction

The locale sweep found an English hydration mismatch caused by ICU using thin/non-breaking spaces around a multi-day date range. `hack0DateParts()` normalizes date/time whitespace to ordinary spaces on both server and browser. The existing date test now asserts exact output rather than normalizing its expectation, and also checks the time string.

## Verification

- Production build: passed, 303 static pages, all three workspace build tasks successful.
- Existing suite: **95 passed, 0 failed, 276 assertions** across 15 files.
- Standalone web TypeScript: only the same six baseline migration-script errors; no new diagnostics.
- Source audit: 285 TS/TSX/CSS files checked; no remaining explicit positive font size below 12 px.
- Browser computed-style audit: 35 route/locale views at 320 px, each with a minimum visible text size of 12 px and no document-width overflow.
- Coverage: the five main pages in all five locales, plus Spanish OSS metrics, timeline, team, contact, brand, research, ships, crafters, hackathons and docs.
- Mobile navigation and language dropdown: 12 px minimum, no overflow, Escape handling.
- Journal title spans share one line at 320 px and desktop.
- FAQ keyboard opening, exclusive disclosure behavior and focus outline verified. All five locale catalogs have ten unique FAQ IDs.
- Both palettes visually reviewed. The temporary viewport override was reset.
- A fresh English agenda render after the date normalization produced no browser errors.

Scratch logs and browser audit are under the session workspace's `work/home-iteration/`. User-facing screenshots are under:

`/Users/raillyhugo/Documents/Codex/2026-10-01/done-documented-the-full-history-decisions/outputs/station-iteration/`

Latest captures: `oss-readable-type-desktop.png`, `journal-single-line-desktop.png`, `journal-single-line-mobile.png`, `home-faq-desktop-light.png` and `home-contact-after-faq.png`.

The preview continues at port 8875. Existing uncommitted changes are preserved; no commit, push or deployment was requested.
