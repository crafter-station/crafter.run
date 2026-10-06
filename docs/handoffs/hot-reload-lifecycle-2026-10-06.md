# Hot Reload lifecycle, edition orders and languages · October 6, 2026

The user approved the first three post-launch priorities: automatic event
states and order cutoff, independent edition menus/orders/admin, and the full
five-language experience. Analytics and the existing lint/typecheck backlog
remain separate work.

## Dates and order lifecycle

`apps/web/lib/hot-reload.ts` is the public catalog. Dates are absolute ISO
timestamps with `Z` or an explicit offset; `timeZone` controls display.
Current edition #1 is October 17, 2026, 10:00–12:00 in `America/Lima`
(`15:00–17:00Z`), confirmed against its entry in the existing public hack0
iCal integration. Luma event: `evt-lzVFBY3M7lMWmH7`.

- `startsAt`/`endsAt` drive upcoming, happening now and finished labels.
- Missing start means date to be announced; unknown end means already
  started once the event begins, without inventing a finish.
- Orders close at `startsAt` unless `ordersCloseAt` supplies another
  absolute timestamp, capped at `endsAt` when known.
- The current cutoff is October 17, 2026 at **10:00 Lima**. There is no cron,
  manual flag or redeploy needed for the transition.
- Undated editions and invalid cutoffs cannot accept orders.
- Public event/menu pages render dynamically. Social preview caching is
  bounded by the next status or cutoff transition.
- The client disables editing at the deadline. The server checks the same
  deadline before approval lookup and immediately before persistence.
- Saved orders remain visible after closing. Unsaved edits never appear as
  the saved order, and the summary uses the stored total.

## Adding another edition

1. Append a unique, stable `number` to `hotReloadEditions`, with venue, city,
   time zone and absolute dates. Add its Luma URL and **its own** event ID.
2. Select a key from `eventMenus` in `apps/web/lib/event-menu.ts`, or add a
   new catalog with its currency, budget, drinks, foods and translations.
   Omit `menu` if that edition does not offer meal ordering.
3. Add an optional five-language description, partner, seats and poster.
   Existing OG/sitemap routes continue to discover editions automatically.
   Menus remain `noindex` and outside the sitemap.
4. Set `ordersCloseAt` only when the default event-start cutoff is unsuitable.
5. Run the tests and build. Review the edition and menu in all five locales.

Menu catalogs used by historical editions should be treated as immutable.
For changed products, prices, currency or budget, create a new key and point
the new edition to it. Keep old item IDs and edition numbers stable: the
database stores IDs and totals, and historical names/prices resolve through
the edition's selected catalog. Different menu catalogs may reuse an item ID.

Edition #1 keeps the existing `hot-reload-1` key and Don Salazar prices, with
the same **S/32** cap. Other editions use `hot-reload-{number}`. Reads, saves,
admin summaries and CSV exports all resolve the selected edition and menu.
Luma approval is checked against that edition's event. No schema migration
or existing-order rewrite is required.

## Languages

`hot-reload-copy.ts` covers public pages, status/deadline labels, order forms,
validation, confirmation, email linking, admin and export in en/es/pt/zh/ja.
`event-menu-copy.ts` translates every current item name/description. Spanish
is the canonical menu text; stable IDs/prices are language-independent.
The locale layout also supplies the matching authentication translations,
using the already-installed localization package as a direct dependency.
Posters and proper names retain their original content.

## Verification

- Production build passes.
- 115 tests / 2468 assertions pass: exact boundaries, date/time zones,
  cutoff during guest lookup, edition isolation with different items/prices/
  budgets, approval/error handling, OG transitions and translation coverage.
- Web typecheck still reports only the six existing migration-script errors.
  The build uses the documented local Noto response cache; it is not deployed.
- Browser form QA uses the actual component in an ignored local fixture,
  synthetic attendees and an in-memory action adapter. Production orders and
  email verification are not submitted for QA.
- Preview/production evidence and screenshots are in the chat workspace:
  `outputs/crafter-hot-reload-lifecycle/`.

Preserve approved portraits, fonts, poster originals, hidden Makeables and
the hidden contact form. Do not reopen the font product launch.
