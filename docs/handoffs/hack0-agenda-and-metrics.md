# hack0 calendar, Open Source metrics and Journal masthead

Latest website iteration on `feat/station-bucle`, reviewed October 2, 2026.

## Requested outcome

- Make Open Source more expressive, with its key metrics prominent.
- Keep Events as a distinctive page for the full public hack0 calendar.
- Bring the Journal title into the same typographic family as the other pages.
- Preserve the transparent rails, centered frame, five locales, both themes, and the user's correction that Crafter Hub is future work.

## Open Source

`apps/web/app/[lang]/oss/page.tsx` and `apps/web/app/station-oss.css` now lead with a wide title and a large star total, with repository and open issue-plus-PR counts beneath it. The introductory copy and actions occupy the other column. Continuous lime, aqua and violet washes strengthen the existing sage identity.

All metrics still derive from `getOssRepos()`. The reviewed snapshot displayed 7,305 stars, 21 repositories and 151 open issues plus PRs; these are not hardcoded live claims. The localized saved-reference explanation remains visible. The featured repository artwork, searchable catalog, filters, contribution content and destinations remain.

## hack0 calendar

`/[lang]/events` is now Agenda / Calendar in navigation, localized across all five languages. It uses cobalt ink, cool paper, a pale-yellow ticket for the next or ongoing event, compact aggregate counts, upcoming cards and archive rows.

### Source and boundaries

- Public calendar: `https://luma.com/hack0`.
- Official iCal subscription, discovered through the calendar's **Add iCal Subscription** control: `https://api.luma.com/ics/get?entity=calendar&id=cal-HBdmsARYSzYhpuc`.
- Public feed only; no credentials or new dependencies.
- The reviewed feed had 265 `VEVENT`s; all 265 parsed. At review, 17 were upcoming or ongoing and 248 were past.
- The calendar includes community organizers, not only events hosted by Crafter Station.
- The feed does not supply cover images or tags. Native ticket/date artwork is used. An unpublished venue is labeled as a location to check on Luma, never guessed to be online.
- `lib/luma.ts` remains the separate API-key/tag integration for the legacy hackathon page.

### Implementation

- `lib/hack0-calendar-data.ts`: public URLs, typed events, ICS parsing, partitioning, date/time formatting.
- `lib/hack0-calendar.ts`: request memoization and Next data caching for 30 minutes, with an 8-second upstream timeout.
- `lib/hack0-calendar.test.ts`: parser and date semantics tests.
- `lib/agenda-copy.ts`: five-language interface copy.
- `components/agenda-calendar.tsx`: upcoming/archive/all controls, accent-insensitive title/location/organizer search, 12-at-a-time pagination and time-zone selection.
- `app/[lang]/events/page.tsx`: metadata, hero ticket, source counts, subscription links and community invitation.
- `app/station-agenda.css`: scoped visual identity, both themes, responsive layout and reduced-motion rule.
- `components/station-event-teaser.tsx`: the shared sidebar reads the same public feed.

The parser unfolds ICS lines, decodes escaped text, ignores nested alarms, deduplicates by UID/sequence and honors cancellation. UTC timestamps and all-day dates retain their semantics; all-day end dates are exclusive. Unsupported floating/TZID date formats are rejected rather than assigned a guessed zone. Events remain upcoming until their end. Only HTTPS event destinations on `luma.com` or `lu.ma` are accepted.

The default display zone is Lima, explicitly labeled UTC−5. Users can choose UTC or their browser's zone. Google, Apple, Outlook and raw iCal subscription links are present. Subscription completion was not exercised.

When the source is unavailable, the page links to Luma, displays dashes instead of invented zero counts and disables its empty filter/search controls. This branch was reviewed in code, not tested through an induced production outage.

## Journal

`components/blog/hero.tsx` and `app/station-journal.css` now use two equally sized lines, Crafter / Journal, with the same display scale and line-height as Universe and a theme-aware violet second line. Existing artwork, content order, authorship, filters, search, locale fallbacks, article pages, RSS and Markdown twins remain.

## Verification

- `bun run build`: passed; all 303 static pages generated.
- `bun test apps/web packages/cli packages/db apps/api`: 95 passed, 0 failed, 275 assertions across 15 files.
- Six new calendar tests cover folding/escaping/Unicode, missing venues, all-day end dates, in-progress classification, deduplication/cancellation, rejected dates/links and nested alarms/upstream HTML.
- Standalone web TypeScript reports only the six known errors in `scripts/migrate-supabase-boards.ts` (optional migration-key headers and top-level await); no new page or integration errors.
- `git diff --check`: passed.
- Visual checks: all five locales at 320 px for Agenda, OSS and Journal without horizontal overflow; desktop light and dark; 1024 px sidebar clearance.
- Agenda interaction checks: archive pagination from 12 to 24, accent-insensitive search, empty results, singular `1 evento`, time-zone changes, and the ticket's visible keyboard focus.
- The ticket's focus outline is inset so its cutout mask does not hide keyboard focus.
- Reduced-motion behavior reviewed in CSS; no new animation loop was introduced.

Preview: `http://localhost:8875/es/events`, served with:

```sh
bun run --cwd apps/web dev --webpack --hostname localhost --port 8875
```

Saved viewport screenshots:

- `/Users/raillyhugo/Documents/Codex/2026-10-01/done-documented-the-full-history-decisions/outputs/station-iteration/oss-metrics-desktop-light.png`
- `/Users/raillyhugo/Documents/Codex/2026-10-01/done-documented-the-full-history-decisions/outputs/station-iteration/hack0-agenda-desktop-light.png`
- `/Users/raillyhugo/Documents/Codex/2026-10-01/done-documented-the-full-history-decisions/outputs/station-iteration/journal-masthead-desktop-light.png`
- `/Users/raillyhugo/Documents/Codex/2026-10-01/done-documented-the-full-history-decisions/outputs/station-iteration/journal-masthead-desktop-dark.png`

Temporary viewport overrides were reset and the preview restored to light. Existing uncommitted work remains intact. No commit, push, deployment, subscription or event submission was performed.
