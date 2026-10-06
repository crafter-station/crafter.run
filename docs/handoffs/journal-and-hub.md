# Crafter Journal and Hub — superseded concept

**Scope correction:** the user clarified that Hub is future work and should not appear on the current site. The renamed Network page is now Crafter Universe at `/[lang]/universe`. The Hub runtime files and links have been removed. Journal remains. See `journal-and-universe.md` for the current implementation. Everything below records the earlier, superseded local exploration.

Local iteration, October 2, 2026, on `feat/station-bucle`.

## Decisions

- The blog is **Crafter Journal**, retaining `/[lang]/blog` and every article URL.
- The former Network page becomes **Crafter Hub** at `/[lang]/hub`.
- The user confirmed that the café, coworking and studio are a **concept in
  development**, not an operating venue. The page explicitly says no venue or
  opening date has been announced. There are no booking controls or invented
  dates, facilities, availability or recruitment services.
- Research, Lab, Games and Station remain the four organizational directions
  on the homepage. They are distinct from the proposed Hub spaces and programs.
- Original Crafter symbol, Bucle Medium 500, Geist, transparent navigation,
  social rail, event invitation and minimal footer remain.

## Editorial direction

The reference reviewed was Evil Martians' Martian Chronicles:
`https://evilmartians.com/chronicles`.
The adapted principles are a publication masthead, topical navigation,
illustrated covers and varied article scale. No reference artwork or article
content was copied.

Journal uses violet accents, tinted paper and six original inline SVG covers
related to the existing posts. The first article leads, the fourth has a
horizontal composition, and the other entries form a two-column grid. Search
results use a regular grid. Titles after the masthead are restrained; article
body and metadata columns are sized for reading within the central frame.

Hub uses warm clay and an original axonometric sketch. Radix tabs explore café,
coworking, studio and a meeting space, highlighting each zone in the drawing.
The page then offers current community, event and Ships destinations. Proposed
podcasts, AI sessions and talent connections have their own clearly marked
concept section. The final invitation leads to the existing contact page.

## Implementation

- Journal: `app/station-journal.css`, `components/blog/artwork.tsx`, blog
  masthead/index/filter/CTA components, and the index/archive/article routes.
- Hub: `app/[lang]/hub/page.tsx`, `app/station-hub.css`,
  `components/hub-space.tsx`, `lib/hub-copy.ts`.
- Shared shell, navigation, ecosystem links and SEO reference `/hub`.
- `/network` and `/products`, including all supported localized versions,
  permanently redirect directly to `/hub`.
- `list_network` still returns the organizational areas. The legacy
  `org.products` array remains empty. The retired catalog, Visagente promotion
  and Normal repositories were not restored.
- Hub and Journal copy covers all five locales. The existing blog locale
  fallbacks, historical bylines, chronology, pagination, MDX, feeds, Markdown
  twins and share controls remain.
- No new dependencies or animation loops. SVGs are decorative and headings
  remain real text. Reduced motion disables the small hover/tab transitions.

## Verification

- Production build: 3 tasks successful.
- Existing test suite: 89 pass, 0 fail, 260 assertions.
- Standalone web TypeScript: only the six known errors in
  `scripts/migrate-supabase-boards.ts`; no new errors.
- `git diff --check`: clean.
- Browser: both themes; both pages at 320 px in all five locales without
  horizontal overflow. At 1024 px the sidebar ends at 176 px and content starts
  at 200 px. Temporary viewport overrides were reset.
- Journal: topic filters, empty search, reset, localized result count and author
  search. Existing translated fallback labels render correctly.
- Hub: tabs change content and drawing highlights; arrow-key navigation works.
- Article: MDX headings/tables/code blocks and copy controls render; the article
  remains within 320 px. No real submissions, auth or data mutations exercised.
- HTTP: old page routes return 308; Atom feed, Markdown index and a post's
  Markdown twin return 200 with their expected content types.
- Hub DOM metadata: canonical `/es/hub`, six alternate-language links.
- The current corpus has six articles, so there is no second live archive
  page to exercise. Pagination implementation is retained.

Captures and logs are in the active design workspace:

```text
/Users/raillyhugo/Documents/Codex/2026-10-01/done-documented-the-full-history-decisions/outputs/station-iteration/
/Users/raillyhugo/Documents/Codex/2026-10-01/done-documented-the-full-history-decisions/work/home-iteration/
```

Preview: `http://localhost:8875/es/blog` and `http://localhost:8875/es/hub`.
Use Bun and the Webpack dev server on port 8875. Check the listener before
starting another process. No commit, push, merge or deployment was performed.
