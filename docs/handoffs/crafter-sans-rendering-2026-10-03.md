# Crafter Sans · Browser and hinting checkpoint

October 3, 2026. **Text stays at 0.304; Display stays at 0.200.**
No website runtime, CSS scale, font binary, license or release changed.

Read these in `/Users/raillyhugo/Programming/crafter-station/font`:

- `TEXT-HANDOFF.md` and `TEXT-ROADMAP.md` for continuity.
- `RENDERING-REVIEW.md` for the exact browser sample matrix.
- `HINTING-PLAN.md` for the next controlled experiment and master pilot.
- `text-hinting-audit.json` for the measured baseline.

## Results

The same WOFF2 reading corpus was reviewed in native Safari 26.6.2/WebKit
and the existing Chromium in-app browser (UA 154.0.0.0), on macOS 26.7,
DPR 2. Regular/Medium were inspected in light mode, SemiBold/Bold in dark,
all at 16 and 18 CSS px. Both use the same 508px text widths.
Accents, interior joins, punctuation, digits, operators and paragraphs
showed no new visible defect in those samples.

The proof confirms the selected face is loaded before capture and records
conditions. Two browser engines on one Mac do not establish Windows,
Android, low-density display, or an independent font rasterizer.
Windows/Android remain deferred until actual devices are available.

The read-only audit found zero glyph/global TrueType instructions, no CVT
or gasp tables, and no CFF stem/mask operators or explicit Private hints in
the 12 Text files. The plan now includes per-weight measured alignments,
isolated candidate directories, raster conditions, regression criteria,
and a separate H/O/n/o compatible-master pilot.
The static OTF command signatures differ in 231 of 234 glyphs; this does
not constitute a complete master-compatibility audit.
No autohinter was installed or run, and no 0.305 was generated.

## Verification and artifacts

This checkpoint adds two local diagnostic scripts and documentation.
Binary hashes are compared before/after; source and website copies remain
unchanged. The scripts regenerate deterministic outputs. Served WOFF2
bytes are checked against source hashes. No production build or full test
rerun is warranted by unchanged runtime/fonts; the passing build and
95-test results remain in `crafter-sans-text-0304.md`.

New artifacts:
`/Users/raillyhugo/Documents/Codex/2026-10-02/listo-enlazado-desde-agents-md-handoff-3/outputs/crafter-sans-rendering/`.
This includes captures, browser conditions, audit, verification, SHA-256
manifest, summary and a portable proof with the four exact WOFF2 cuts.
The sibling `work/crafter-sans-rendering/` preserves continuity documents
from before this turn and the input hash inventory; dev logs remain private.

## Continue

New proof: `http://localhost:8874/rendering-review.html`.
Optical comparison: `http://localhost:8874/reading-review.html`.
Website specimen: `http://localhost:8875/es/font`.

The website dev server was recovered with the same real-Noto fixture as
the previous checkpoint. See `crafter-sans-text-0304.md` for the command,
cache limits and upstream-loader caveat. Check listeners before starting
anything; stop dev before compiling against its `.next`.
Keep `next-env.d.ts` importing `./.next/types/routes.d.ts`.

Next work follows `HINTING-PLAN.md`; it can proceed locally without claiming
unavailable device coverage. Preserve previous uncommitted changes on
`feat/station-bucle`, all font advances and the 18/16/14px site hierarchy.
No commit, push, deployment, publication or license decision occurred.
