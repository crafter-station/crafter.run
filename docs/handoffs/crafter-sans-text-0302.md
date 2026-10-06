# Crafter Sans Text 0.302 — October 3, 2026

The user asked to continue improving Crafter Sans according to the font plan.
Source of truth: `/Users/raillyhugo/Programming/crafter-station/font`.
Read that workspace's `TEXT-HANDOFF.md` and `TEXT-ROADMAP.md` for the next pass.

## Optical change

An audit of the complete spacing repertoire found overlapping acute/grave marks
in `íì` and `ÍÌ` in every weight. The old 6,725-pair audit did not include them.
Text 0.302 redraws acute/grave marks on narrow i/I before weight derivation,
reducing lateral reach while retaining height and horizontal terminal widths.

Only the four glyphs `iacute`, `igrave`, `Iacute`, `Igrave` change outlines.
Every glyph advance, other outline, kerning pair and vertical metric is
unchanged. The 0.301 visible-scale calibration remains. The corrected pairs
have approximately 50–66 font units of horizontal clearance.
All three Display 0.200 binaries remain byte-identical.

The four Text weights remain experimental static derivatives. This is a
targeted optical correction, not completed manual masters or a variable family.
Numerals were checked and already have uniform widths in each cut.

## Website integration

- Runtime WOFF2/TTF files, 15 downloads and real-outline inspector data are synced.
- `/font` and the brand guide read `lib/font-versions.json`, generated from
  the font binaries' name tables. Version labels no longer require a separate
  hardcoded update in those components.
- `scripts/sync-font-specimen.py` rejects inconsistent versions across Text cuts.
- Five-locale copy, 233-character repertoire, 18/16/14px CSS hierarchy and the
  original Bucle Display remain.
- Historical comparison 0.101 → 0.200 stays inside the canonical specimen.
  The new Text comparison is a local diagnostic in the font source workspace:
  `http://localhost:8874/text-review.html`.

## Verification

- Twelve Text binaries reproduced byte-for-byte in a second build.
- Shaping and NFC/NFD equivalence checked in OTF, TTF and WOFF2.
- 48,400 complete spacing-character pairs per weight: 193,600 checks,
  no intersections above the validator's one-square-unit tolerance.
- Structural comparison confirms only four changed outlines and identical
  advances. All three Display fingerprints match the previous checkpoint.
- All 15 website downloads match their source hashes. Inspector JSON has only
  the same four changed characters per Text cut; Display outline data is intact.
- Four weights and the corrected í in outline mode exercised in `/es/font`.
- Before/after reviewed at 14/16/18px, including Bold and dark mode. The
  diagnostic's 14/16/18/24px controls render those real CSS sizes at 320px.
- Canonical Font in five locales plus the Spanish homepage: 6 layouts at
  320px without document overflow.
- Final production build passed (3 tasks, 263 pages). Existing suite:
  95 tests, 276 assertions, no failures.
- Standalone web TypeScript retains the same six migration-script errors.
  Lint remains unconfigured. Browser review used one Mac browser engine;
  Windows, Android and additional engines remain pending.

## Continue

The next font work is platform evidence at 16/18px and an optical review of
joins/counters before hinting or interpolation-compatible masters. Do not
claim completion of platform testing from responsive browser emulation.
Italic and repertoire expansion remain separate later work.

Current previews:
`http://localhost:8875/es/font` and `http://localhost:8874/text-review.html`.
Stop website dev before building into the same `.next`.

Deliverables:
`/Users/raillyhugo/Documents/Codex/2026-10-02/listo-enlazado-desde-agents-md-handoff-3/outputs/crafter-sans-0302/`.
The current chat's `work/crafter-sans-0302/before/` preserves 2,417 pre-iteration
font/source files, with a hash inventory beside it; `website-before/` preserves
the integration assets. Earlier website changes remain uncommitted.
No publication, deployment, license change or remote repository action occurred.
