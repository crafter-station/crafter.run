# DevDay Lima · attendee entry details

Status: implemented and tested locally; **not released**. The calendar credential
and database migration remain deployment prerequisites. No real attendee data,
email, registration, approval or blast was created by this work.

## Event and scope

The requested Luma event is **DevDay Exchange Community: Lima**,
`https://luma.com/1iz8daqt`, event `evt-nTusHgBAKNtiP3p`, Codex Community Events
calendar `cal-63UOFcweB97l2gc`.

Its published schedule is **October 21, 2026, 18:00–21:00 America/Lima**, at
FISI–UNMSM, Av. Carlos Germán Amezaga #375, Cercado de Lima. In UTC this is
October 21 at 23:00 through October 22 at 02:00. An older vault plan mentioning
UTEC on October 22 is not the source for this page.

This is an independently organized community event. The page uses the original
Luma artwork and the existing Crafter visual system; it is not a Hot Reload
edition. No additional sponsorship or official-event claims were introduced.

## Routes and behavior

- `/[lang]/events/devday-lima`: public landing, original poster, localized
  metadata/OG, sitemap and Agenda link.
- `/[lang]/events/devday-lima/access`: dynamic, noindex entry flow. Sign in or
  create a Crafter account, then verify approved status in this particular event.
- `/[lang]/admin/event-access/devday-lima`: existing verified organizer gate.
- `/[lang]/admin/event-access/devday-lima/export`: private, no-store CSV.

All five locales are covered. Only verified Clerk emails are checked with Luma.
An approved status is required before reading the person's saved details and on
every save. Pending/declined, missing registration and unavailable checks have
separate safe states. The existing verified-secondary-email flow is reused.

Fields: full legal name, document type (DNI, foreign resident ID or passport),
document number, optional vehicle plate, and equipment type/brand/model, one
item per line. There is an explicit no-equipment choice and a required notice
acknowledgment. No document image or serial number is requested.

The operational default cutoff is the event start, configured in
`lib/access-events.ts`; it is **not a venue-confirmed deadline**. An earlier
deadline and equipment serial numbers remain optional organizer decisions.

`event_access` is a dedicated private table, unique by event and Clerk user.
Updates preserve creation time. These fields are not public profile fields,
analytics events or OG data. Errors never log submitted data or DB parameters.
Admin pages show name/email/status only; document, vehicle and equipment details
are in the explicit download. Export rechecks Luma, excludes non-approved people
and fails with 503 instead of exporting a partially verified list on an outage.
CSV cells are quoted and formula-like/numeric-only values get a text prefix.

## Deployment prerequisites

1. Configure **`LUMA_CODEX_API_KEY`** on `crafter-station/crafter-run` for Preview
   and Production, with access to the Codex Community calendar/event. There is
   deliberately no fallback to the hack0 `LUMA_API_KEY`. On October 6, the
   existing hack0 key returned **403, no access to this event** for an
   authenticated event lookup. This is not evidence of the new key's validity.
2. Apply `packages/db/drizzle/0022_low_mulholland_black.sql` to the databases
   serving these environments, after inspecting their existing migration state.
   It creates only `event_access` and its unique index. Do not blindly replay
   the entire migration history: the earlier vault handoff reports manually
   applying 0021, with its Drizzle ledger status unresolved.
3. Verify a designated approved account can save, reload, edit and appear in the
   organizer CSV; verify a non-approved account cannot submit. Use explicit test
   accounts/data and remove them through an authorized test procedure.
4. Merge only after prerequisites and preview checks are satisfied; then verify
   the production routes and original poster.

No database credential is available in this local checkout. Vercel correctly
returns `[SENSITIVE]` placeholders for restricted secrets; these were not used
as real credentials. No migration or migration-ledger change has been run.

Read-only preflight when a proper database connection is available:

```sql
select to_regclass('public.event_access'),
       to_regclass('public.event_orders'),
       to_regclass('drizzle.__drizzle_migrations');
```

Inspect the migration ledger before choosing the normal migration command or
reconciling a manually applied migration. Do not mark older migrations applied
without checking their schema effects.

## Validation and evidence

- 126 tests / 2666 assertions passed, including auth and approval denial, event
  identity, cutoff crossing during a lookup, revoked approval on update,
  document/plate/equipment validation, consent and safe CSV formatting.
- Production build passed. The web typecheck retains only the six prior errors
  in `scripts/migrate-supabase-boards.ts`.
- Landing and unauthenticated access pages reviewed in all five languages at
  320 px without horizontal overflow.
- The actual form component was exercised in a private local fixture with a
  synthetic approval/save dependency: validation, conditional vehicle/equipment,
  successful save, edit and closed controls. Five locales, both themes, 320 px
  and desktop were checked.
- This fixture is not an authenticated Luma → Clerk → database end-to-end test.
  That integration and migration execution are still unverified.

Local evidence is under the Codex workspace
`outputs/crafter-event-access/`: curated event metadata, HTTP/OG checks,
screenshots and layout results. The original cover source is
`https://images.lumacdn.com/uploads/5q/33f59454-7774-43a5-9ce1-246b8746da96.jpg`;
CSS alone softens its colors.

Preserve published Hot Reload behavior, approved team portraits, runtime fonts,
hidden Makeables/contact form and the deferred font launch. This feature does
not add LinkedIn/GitHub questions to Luma or send messages to accepted guests.
