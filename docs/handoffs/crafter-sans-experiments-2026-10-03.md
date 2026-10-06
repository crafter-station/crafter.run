# Crafter Sans · Implemented hinting and master experiments

October 3, 2026. **Text 0.304 and Display 0.200 stay unchanged.**
The user authorized the isolated Regular/Bold hinting trial and the H/O/n/o
compatible-master pilot. Both are now implemented.

## Current source of truth

Font workspace: `/Users/raillyhugo/Programming/crafter-station/font`.
Read `TEXT-HANDOFF.md`, `TEXT-ROADMAP.md` and
`experiments/2026-10-03-hinting-masters/README.md`.
The latter supersedes the earlier “planned, not implemented” status.
`HINTING-PLAN.md` remains the methodology.

The scripts are `sources/build_text_experiments.py`,
`sources/validate_text_experiments.py`, `sources/render_text_experiments.py`.
They write within the experiment directory, using a separately pinned
environment. The ordinary generator, canonical binaries, generated Text
sources and website integration were preserved.

## Results

Regular/Bold TTF/WOFF2 candidates use ttfautohint 1.8.4.16-eb64 with extra
x-height increase disabled. They retain original unhinted geometry, metrics,
coverage and shaping. Both pass NFC/NFD and 48,400 spacing pairs; WOFF2 retains
the same hint programs as TTF. Builds are reproducible.

Local FreeType 2.13.2 grayscale output covers 11–20/24/28/32/36 ppem.
Chromium reviews Regular/Bold at 14/16/18px in both themes, plus 24/32px
shape controls. Safari reviews Regular light and Bold dark at 14/16/18px.
Both engines run on the same Mac/DPR 2, with 512px text widths.
There is no clear visible benefit supporting promotion. The WOFF2 candidates
are roughly 50–60% larger, and FreeType coverage changes are size-dependent.
**Keep hinting experimental; do not synchronize it into this repository.**

The H/O/n/o pilot contains two editable cubic UFO masters, a designspace and
seven static proof weights from 400 to 700. Thirty-one interpolation positions
pass contour, area and stem-progression checks; real 16/18px intermediates
were inspected in Chromium and Safari. Frozen cubic endpoint geometry and
advances remain. Common quadratic conversion introduces small measured
differences from the existing TTFs, documented in the experiment validation.

This is only a four-glyph pilot. Regular H/n currently use coincident corner
controls to correspond with Bold's round corners. Simplify that provisional
structure and recheck it before extending to h/m/u and b/d/p/q.
Preserve manual pilot UFO edits before running its generated-export builder.
No full variable font or family-wide compatible-master claim is made.

Windows/Android remain deferred until the user has devices. No CFF hinting,
system-font installation, license change or publication occurred.

## Evidence and continuity

Chat artifacts:
`/Users/raillyhugo/Documents/Codex/2026-10-02/listo-enlazado-desde-agents-md-handoff-3/outputs/crafter-sans-experiments/`.

This includes captures, conditions, portable fonts/proof/sources, validation
and reproducibility reports. The pre-turn inventory confirms **1,945 original
files unchanged**; **156 generated/control files** reproduce byte-for-byte
in the recorded environment. Browser captures are observations.

Proof:
`http://localhost:8874/experiments/2026-10-03-hinting-masters/index.html`.
Earlier reading and engine comparisons remain in place.
The website's canonical specimen is still `http://localhost:8875/es/font`.
Check listeners before starting another server. The real-Noto loader fixture
and recovery command remain documented in `crafter-sans-text-0304.md`;
do not modify `lib/fonts.ts` for this dev-only loader workaround.
Keep `next-env.d.ts` importing `./.next/types/routes.d.ts`.

No website runtime or CSS changed, so no production build/full suite was
rerun. Prior passing runtime checks remain historical evidence.
Preserve previous uncommitted changes on `feat/station-bucle`.
No commit, push or deployment occurred.
