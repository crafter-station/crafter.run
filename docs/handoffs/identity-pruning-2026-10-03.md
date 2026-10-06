# Identity pruning — October 3, 2026

The user approved the architecture proposal after the October 2 meeting review,
then explicitly rejected moving the old tool boards and Research landing page.
This correction supersedes the original audit and the secondary-page handoff.

## Final route decisions

- `/opencode`, `/claude-code`, `/n8n` and `/research` are deleted in all five
  locales. Their unlocalized URLs also return 404 directly, without a locale
  redirect or replacement page.
- The generic workshop page rejects the `opencode`, `claude-code` and `n8n`
  slugs, including old `?embed=1` links. Other workshop boards remain.
- Research remains one of the four organizations in Universe. Its secondary
  action now links to the Research GitHub organization.
- `/team/work-with-us` and `/work-with-us` permanently redirect to `/contact`.
- `/projects/next` permanently redirects to `/oss#contribute`.
- `/hackathon` permanently redirects to `/events`.
- `/events-sponsors` permanently redirects to `/events/sponsors`.
- These consolidations preserve the locale and query string. Unlocalized
  versions redirect directly to the English destination.
- Removed pages are absent from SEO paths, sitemap, current copy and navigation.
  Board records, votes, ideas and their APIs were not purged or migrated.

## Identity and participation

- The primary navigation remains Station, Universe, Open Source, Agenda and
  Journal. More groups Crafters, Ships, Team, event partnerships, Contact and
  existing resources. Metrics, Timeline and Petdex remain discoverable from
  Open Source; hackathon history remains linked from Agenda and sponsors.
- Contact now offers contributions, workshops, gatherings and Makeables kits.
  The old agency service catalog and personal booking picker are removed.
  The conversation action uses the public community channel; no calendar
  ownership was reassigned. The old `engineering-calendar` fragment is retained
  as an anchor beside the new collaboration section.
- Team, sponsors, FAQs, homepage invitations and OSS calls to action follow
  this participation model. The hackathon history CTA also leads to Contact.
- Lab describes hardware, fabrication and physical prototypes in all five
  locales, including the shared directory, Universe, FAQs and agent tools.
- Home highlights Makeables as a Crafter project, not a fifth organization.
- The current homepage event poster and format catalog use Hot Reload.
  Agenda presents it as in preparation, without an invented date or registration.
  The complete public hack0 calendar remains functional.
- Historical names, sponsor logos, Timeline references and the Code Brew font
  specimen remain historical material.

The source was the two-page local report of the October 2 meeting with Ignacio
Velásquez, “Makeables, eventos y organizaciones” (59 minutes). That report states
that its transcript coverage is partial. This implementation does not claim that
the meeting cancelled consulting or mentoring, finalized the four organizations'
vision, or completed legal incorporation.

## Files

New shared copy: `apps/web/lib/participation-copy.ts`.
New homepage section: `apps/web/components/station-makeables.tsx`.
Routing is in `apps/web/next.config.mjs`, `apps/web/proxy.ts`,
`apps/web/lib/seo.ts` and the generic workshop board page.
The five message catalogs and shared navigation/identity copy are updated.

## Verification

- Final production build passed: 3 tasks, 263 generated pages.
- Existing suite passed: 95 tests, 276 assertions, no failures.
- Final standalone web typecheck reports only the six pre-existing errors in
  `apps/web/scripts/migrate-supabase-boards.ts`, lines 33, 53, 68, 82, 98 and 111.
  Next still ignores web type errors during build; lint is unconfigured.
- 72 HTTP checks passed: deleted localized and unlocalized routes, retired
  generic-board slugs, old embed links, redirects, aliases and query preservation.
- Sitemap has 198 URLs and no retired routes. The public links directory
  describes Lab as hardware and making.
- Browser: 8 routes × 5 locales at 320px, all 40 combinations with a heading,
  no document overflow and no links to retired pages.
- Mobile menu opening, More contents and Escape close passed.
- Desktop visual review covered Contact, the reduced menu, Universe, Makeables
  and Hot Reload; Contact and Universe were also reviewed in dark mode.
- `git diff --check` passed. No authenticated submissions, votes, bookings,
  calendar subscriptions or data mutations were exercised.

## Continuity

Active checkout: `/Users/raillyhugo/Programming/crafter-station/crafter.run-bucle`,
branch `feat/station-bucle`. Preserve all earlier uncommitted work.
Preview: `http://localhost:8875/es/contact`. Check the listener before starting
another server; stop dev before rebuilding against the same `.next`.
The user's preference remains no web search and no subagents.

Deliverables:
`/Users/raillyhugo/Documents/Codex/2026-10-02/listo-enlazado-desde-agents-md-handoff-3/outputs/crafter-identity-prune/`.
This includes screenshots, the summary and machine-readable verification.
The same chat's `work/identity-prune/before/` holds 339 pre-iteration source
copies; build, test and typecheck logs are beside it. The development preview
log may contain a temporary authentication setup URL; do not publish that log.

No commit, push, deployment or database migration was performed.
