# Crafter Sans Text 0.304 — October 3, 2026

The user approved the next reading pass: punctuation, s/f with accents,
paragraphs and mixed numbers at 16/18px. Windows/Android remain deferred
until actual devices are available.

Source: `/Users/raillyhugo/Programming/crafter-station/font`.
Read its `TEXT-HANDOFF.md` and `TEXT-ROADMAP.md` next.

## Finding and change

The 0.303 proof records Regular at 16px using:
`12 + 8 = 20; 12 − 8 = 4; 6 × 7 = 42; 8 ÷ 2 = 4.`
The minus, multiplication and division centers were lower than plus/equal.
Regular centers were 297 / 306.5 / 305 units versus 339.5 for plus.
The enlarged operator row makes the mismatch easier to inspect.

Text 0.304 raises the complete minus/multiply/divide drawings by +40 / +31 /
+32 source units, followed by the existing 1.06 scale. Applying translation
after weight derivation preserves the offset geometry. Only these three
glyphs change in each cut. CFF coordinate rounding can vary by one unit.
All operator centers now fit within 1.5 units of each other in every format.

Every horizontal metric, kerning/composition feature, other outline and
line metric is preserved. Display 0.200 remains byte-identical. There is no
CSS change. This is not a mathematical typesetting family or a MATH-table
implementation; it is a text-font alignment correction.

The inspected s/f, accent combinations, quotes, parentheses, dashes,
punctuation and digits did not justify another drawing change in this corpus.
Their outlines remain. This is bounded optical evidence, not exhaustive
typographic certification.

## Proofs and verification

- `sources/text-reading-corpus.json` contains the additional strings.
- `sources/render_reading_comparison.py` generates `reading-review.html`,
  comparing frozen 0.303 WOFF2 references against the current version.
- The join proof is frozen at 0.302 → 0.303 and the accent proof at
  0.301 → 0.302, with versioned references on both sides.
- The shared reading corpus is included in shaping/NFC/NFD validation.
- All 12 formats/cuts check the operator axis; 48,400 pairs per cut pass.
- All 12 binaries reproduce byte-for-byte.
- Full geometry comparison changes only minus/multiply/divide. All X
  coordinates and advances remain; GPOS/GSUB bytes are identical.
- Fifteen HTTP downloads match the source fonts. Inspector JSON changes
  only the three operators; the four Text cuts report 0.304.
- The corrected minus was exercised in Bold outline mode.
- Browser review includes four weights, 16/18px, both themes, the four size
  controls at 320px, and five localized Font routes without document overflow.
- Build passes: 3 tasks and 263 generated pages. Tests: 95 / 276 assertions.
- Standalone TypeScript retains the six existing migration-script errors.
  Lint remains unconfigured.

## Local development recovery

The production build above passed with the original font configuration.
A fresh dev request subsequently failed in Next/Turbopack's Noto Sans SC
Google-font loader: Google returned `/l/font?kit=…&skey=…&v=…` URLs, and the
generated internal query failed with “queries have exactly one entry”.
Restarting alone did not fix it. No Crafter or Noto configuration was changed.

The current dev process uses the **real Noto CSS and WOFF2 bytes from the
passing production build** as local fetch responses. The fixture is private,
outside the repository, and is not part of the deliverable or a font rewrite:

```sh
cd /Users/raillyhugo/Programming/crafter-station/crafter.run-bucle
NEXT_FONT_GOOGLE_MOCKED_RESPONSES=/Users/raillyhugo/Documents/Codex/2026-10-02/listo-enlazado-desde-agents-md-handoff-3/work/crafter-sans-reading/noto-production-cache/responses.cjs \
  bun run --cwd apps/web dev --hostname localhost --port 8875
```

The environment variable is Next's local response-fixture mechanism; the
fixture here contains actual font data, not placeholder outlines. Japanese
and Chinese pages render and finish loading fonts. This is a temporary local
recovery, not a fix to the upstream loader. A future cold dev/build should
recheck normal Google resolution before removing the workaround.
Never copy this cache, dev logs or temporary auth setup data into a release.
Check the listener before starting and stop dev before another build.

## Continue

The first local reading pass is complete. Next: another Mac browser engine,
then an evidence-based hinting plan and interpolation-compatible masters.
Extend the reading corpus if actual usage exposes another problem. Preserve
the approved seeds and the 18/16/14px CSS hierarchy.

Previews: `http://localhost:8875/es/font` and
`http://localhost:8874/reading-review.html`.
Artifacts:
`/Users/raillyhugo/Documents/Codex/2026-10-02/listo-enlazado-desde-agents-md-handoff-3/outputs/crafter-sans-reading/`.
The sibling `work/crafter-sans-reading/before/` preserves 2,438 source/font/
reference files from 0.303; `website-before/` preserves 48 integration files.
Their hash inventories accompany them.

Prior changes on `feat/station-bucle` remain uncommitted. No commit, push,
deployment, publication or license change occurred.
