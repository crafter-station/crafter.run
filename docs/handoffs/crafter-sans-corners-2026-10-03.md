# Crafter Sans · H/n corner refinement

October 3, 2026. **Text 0.304 and Display 0.200 stay unchanged.**
This follows the isolated hinting/master checkpoint in
`crafter-sans-experiments-2026-10-03.md`.

## Result and decision

A separate, measured reduction replaces four cubic segments per H/n corner
with one. UFO point counts fall from **108 to 36 in H** and **104 to 50 in n**.
Regular geometry is exact. Bold corner interiors have a conservative
**0.5017053523 font-unit distance bound**, approximately 0.009032 CSS px at
18px before rasterization. This is an approximation, not an identical Bold
outline. Endpoints, tangents, extrema, stems, advances and metrics remain;
O/o are unchanged. Regular retains eight/six collapsed corner curves.

Use this reduced construction for the next isolated h/m/u expansion, then
b/d/p/q. Preserve the approved joins and measure every new glyph separately.
Do not promote it into the website or call it a completed variable family.

## Source and evidence

Font workspace: `/Users/raillyhugo/Programming/crafter-station/font`.
Read `TEXT-HANDOFF.md`, `TEXT-ROADMAP.md` and
`experiments/2026-10-03-master-corners/README.md` for method and commands.

Scripts: `sources/refine_text_master_corners.py` and
`sources/render_text_master_corners.py`. The first pilot is frozen, with
35 reference files inside the new experiment. Preserve manual UFO edits
before rebuilding; the editable UFOs are generated exports, not automatically
read back by the compiler.

The new family is `Crafter Sans HONo Corners`, internal version 0.002.
It includes two UFOs, a designspace and seven TTF/WOFF2 weights from 400 to 700.
The current sample only supports H/O/n/o/space.

- 31 cubic interpolation positions pass compatibility, contour, bounds,
  area and stem progression checks. Seven compiled cuts retain exact bounds.
- Shaping, metrics, TTF/WOFF2 parity and all 16 pilot letter pairs per cut pass
  (112 checks total). No repertoire-wide or accent claim is made for this pilot.
- FreeType 2.13.2 has 28 native A/B pairs at 16/18/32/36ppem, both sides
  unhinted. Regular is identical. Maximum coverage change is 2/255 at
  16/18ppem and 6/255 across the matrix.
- Safari 26.6.2 and Chromium 154 (UAs), this Mac/DPR 2: all seven weights,
  16/18px, both themes, plus 64px shape control; no visible regression in
  these samples. Fourteen faces load, no synthesis, equal 508px columns.
- Chromium 320px layout keeps the actual font sizes and has no overflow.
  This is responsive layout QA, not an Android test.
- All 123 generated files reproduce byte-for-byte across two builds;
  2,106 original files remain unchanged. Fourteen served WOFF2 hashes match.
  The portable package includes an additional rebuild report.

Proof: `http://localhost:8874/experiments/2026-10-03-master-corners/index.html`.
Artifacts:
`/Users/raillyhugo/Documents/Codex/2026-10-02/listo-enlazado-desde-agents-md-handoff-3/outputs/crafter-sans-corners/`.

Older experiment artifacts and ZIP are preserved. No canonical fonts,
website CSS/runtime, licensing or release status changed. No website build
or broad suite was needed for these isolated font files and handoff changes.
Earlier website validation is historical evidence, not a new run.
Windows/Android remain deferred. The hinting trial remains unpromoted.
Preserve the previous uncommitted work on `feat/station-bucle`.

## Local preview

The font proof runs from the existing HTTP server on 8874. The canonical
website specimen remains `http://localhost:8875/es/font`. Check each listener
before starting a server. Recovery uses the existing real-Noto fixture:

```sh
NEXT_FONT_GOOGLE_MOCKED_RESPONSES=/Users/raillyhugo/Documents/Codex/2026-10-02/listo-enlazado-desde-agents-md-handoff-3/work/crafter-sans-reading/noto-production-cache/responses.cjs bun run --cwd apps/web dev --hostname localhost --port 8875
```

Run from the web checkout. Keep `apps/web/next-env.d.ts` importing
`./.next/types/routes.d.ts` after startup; do not edit `lib/fonts.ts`.
Stop dev before a production build using the same `.next` directory.
