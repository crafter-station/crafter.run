# Website iteration — October 2, 2026

This is the latest continuity entry. Read it before the earlier identity,
Journal/Hub, calendar and 12 px handoffs.

## Current checkpoint

The user closed this iteration and requested a final handoff. The current
handoff, resume prompt and complete recovery snapshot are:

```text
/Users/raillyhugo/Documents/Codex/2026-10-02/listo-enlazado-desde-agents-md-handoff-2/outputs/crafter-final-handoff/HANDOFF.md
/Users/raillyhugo/Documents/Codex/2026-10-02/listo-enlazado-desde-agents-md-handoff-2/outputs/crafter-final-handoff/START-HERE.txt
/Users/raillyhugo/Documents/Codex/2026-10-02/listo-enlazado-desde-agents-md-handoff-2/outputs/crafter-final-handoff.zip
```

The final follow-up moves the desktop social rail **32px left** with
`--station-social-offset`; standard pages reserve matching space. The centered
editorial frames and the mobile drawer retain their layout. Reviewed on OSS
at 1280/1024px and Contact at 1024/320px without overflow.
The user's latest operational preference is **not to use the web search tool**.

Latest follow-up: the user found the overall typography too large after the
Text 0.301 correction. The website now uses smaller page/section headings,
16px secondary descriptions, tighter reading rhythm and reduced display
numbers. Main introductions remain 18px, ordinary text/controls 16px and
compact uppercase labels 14px. Shared tokens live in `station.css`; the
homepage, OSS, Universe, Agenda, Journal and Font styles refine that scale.
The font tester starts and resets at a true 64px. The corrected font binaries
are unchanged. See **Recalibrated website scale after Text 0.301** in the design
system; this supersedes the earlier statement that CSS values stay unchanged.

The latest follow-up moves the original Crafter Sans showcase into the website
at `/[lang]/font`, with its own remastered composition and the shared compact
shell. See `crafter-font-page.md` for the five-cut tester, real glyph inspector,
downloads, localized copy and source synchronization. The old localhost:8874
showcase is retained as a standalone reference; new page work lives in this repo.

Latest typography follow-up: Crafter Sans now owns body, controls and
metadata as well as headings. The new Text Preview 0.301 has real static
400/500/600/700 weights; original Bucle Display 0.200 remains unchanged.
The current font workspace is `/Users/raillyhugo/Programming/crafter-station/font`
and its `TEXT-HANDOFF.md` records sources, checks and remaining optical work.
No Geist family is loaded. System monospace is only for code; Noto covers CJK.
The latest user scale supersedes earlier 14px defaults: **18px** principal
descriptions, **16px** body/controls, **14px** compact uppercase labels or
explicit code/detail exceptions. The historical ZIP predates this follow-up.
The subsequent **0.301** optical correction removes the thin Regular inset,
enlarges text outlines 6% within the same em, and compensates spacing.
At that step the CSS values stayed unchanged; the subsequent CSS recalibration
above supersedes that intermediate state. See the latest scale entry in the
design system and the font workspace's `scale.html` comparison.

Follow-up: Universe has since received the user's requested visual refresh:
four equally weighted illustrated areas, quieter links and a useful three-path
closing section. See **Illustrated Universe directory — October 2, 2026** in
`docs/station-design-system.md`. Its full-size artwork is in
`apps/web/components/universe-artwork.tsx`. The existing ZIP below is the
checkpoint **before** this follow-up; it has not been regenerated.

The user then approved Universe and requested the same cleanup for OSS.
See **Quieter Open Source composition — October 2, 2026** in the design
system: repeated arrows/count removed, one link per repository card,
denser secondary cards and grouped actions. The existing ZIP also predates
this OSS follow-up.

The final requested pass also updates Agenda and Journal. See **Quieter
Agenda and Journal — October 2, 2026** in the design system: fewer repeated
arrows and counts, grouped actions, clearer filters, and quiet article
utilities/related stories. Original ticket/artwork and all calendar/editorial
data behavior remain. The ZIP predates this follow-up too.

- Checkout: `/Users/raillyhugo/Programming/crafter-station/crafter.run-bucle`
- Branch: `feat/station-bucle`
- HEAD: `e31a1323c23d2f7a596776b59f795784189b296b`
- The subsequent website iteration is **uncommitted**. Preserve its modified,
  removed and new files; do not reset this or another worktree.
- The original handoff and the subsequent Universe, OSS, Agenda and Journal
  UI requests are complete.
- No commit, push, merge or deployment was performed for this series.

Historical October 1 handoff, next-session prompt, screenshots and recovery
(the current complete package is linked above):

```text
/Users/raillyhugo/Documents/Codex/2026-10-01/done-documented-the-full-history-decisions/outputs/crafter-website-handoff/HANDOFF.md
/Users/raillyhugo/Documents/Codex/2026-10-01/done-documented-the-full-history-decisions/outputs/crafter-website-handoff/START-HERE.txt
/Users/raillyhugo/Documents/Codex/2026-10-01/done-documented-the-full-history-decisions/outputs/crafter-website-handoff.zip
```

## Decisions that supersede previous iterations

1. **16 CSS px default** for body, controls and ordinary metadata; **18px**
   principal descriptions, including the mobile hero. **14px** only for
   compact uppercase labels or explicit code/detail exceptions.
2. Original Crafter mark, real Bucle Medium 500 without synthetic bold,
   Crafter Sans Text body and Noto CJK fallbacks. Monospace is for code only.
3. Transparent sidebars, continuous gently textured backgrounds, centered
   content with equal insets, restrained headings and fewer decorative rules.
4. Language and theme are stacked. Matching animated menus; “More” is a
   single-column dropdown below its trigger, with grouped destinations.
   The inline-expansion experiment is not the final implementation.
5. Homepage cards/actions no longer repeat arrow icons. Group titles,
   descriptions and actions coherently.
6. Sidebar hack0 ticket retains large day/month, outlined transparent
   notches, accessible complete date/title and inset keyboard focus.
7. Network became `/universe`: Research, Lab, Games and Station.
   `/network` and `/products` redirect there. Hub is future work and has no
   runtime page. Retired Products, Visagente and Normal stay absent.
8. Open Source has prominent metrics and a restrained title. Do not restore
   cache/fallback implementation explanations in the UI.
9. Crafter Journal is on **one line**, including 320 px. Its two-line
   masthead documentation is historical.
10. Agenda and the sidebar read all public hack0 events via iCal, without
    an API key. The separate legacy `lib/luma.ts` integration remains.
11. Home closes with ten localized native FAQ disclosures, contact and
    the compact footer. The removed slogan strip stays removed.

The [design system](../station-design-system.md) contains implementation
history and the latest details. The [identity/font handoff](crafter-identity-and-sans.md)
still owns portrait provenance, font sources and historical Paper status.
Font development remains private at the intended `crafter-station/font`
repository; access/visibility remain unverified, public release deferred.
Paper was not revisited during this website iteration.

## Validation and restart

Latest code validation after the CSS scale pass: production build passed (3 tasks, 308 static pages);
95 tests passed, 276 assertions. The standalone web typecheck retains the six
known `scripts/migrate-supabase-boards.ts` errors. Next build skips web
typechecking and lint is not operational.

The scale pass checked six main pages in all five locales at 320px, both desktop
themes and the 1024px Font layout. The final social-rail change was checked in
the browser and with `git diff --check`, without rerunning the build/test suite.

Browser review of the final 0.301 correction covered the five main pages in
all five locales at 320 px without unintended ordinary text below 16 px or
document overflow (14px remains an explicit uppercase/code exception), plus secondary public pages,
light/dark desktop, 1024 px rail clearance, 390 px cards, keyboard navigation,
nested Escape/focus restoration and route-preserving locale changes.
Reduced motion was reviewed in source, not emulated.

No authenticated submissions, calendar subscriptions or form delivery were
exercised. The contact endpoint still validates an email and returns 204;
this iteration did not add email delivery.

Check for a listener before starting another server:

```sh
lsof -nP -iTCP:8875 -sTCP:LISTEN
bun run --cwd apps/web dev --webpack --hostname localhost --port 8875
```

Use `http://localhost:8875/es` from a persistent terminal. Stop this preview
before building against the same `.next` directory, then restart. Do not
dump raw dev-server logs: temporary configuration URLs may be present.

Resume from the next user request. Do not infer a new font, Paper, PR or
deployment task from the superseded next-step ordering in older handoffs.
