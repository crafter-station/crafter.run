# Crafter identity and Crafter Sans continuity

## Current font follow-up — October 2, 2026

The user requested Crafter Sans for the entire interface, including metadata;
system monospace only for code. The current source workspace and handoff are
`/Users/raillyhugo/Programming/crafter-station/font/TEXT-HANDOFF.md`.

Bucle Display 0.200 is unchanged. Text Preview 0.301 adds experimental static
Regular 400, Medium 500, SemiBold 600 and Bold 700 cuts with real contour
changes and extra text spacing. All 12 binaries pass structural/shaping
checks, 6,725 pairs per weight, and a byte-identical second build. Further
manual optical work, hinting and cross-platform review remain.

The website loads Crafter for body, controls and metadata and the original
display master for titles. No Geist is loaded. Noto remains for CJK glyphs.
Default UI/body is now 16px; principal descriptions are 18px on desktop and
mobile; 14px is restricted to compact uppercase labels and explicit details
or code. No remote font repository, license decision or release was made.
The rest of this document is the preserved October 1 checkpoint.

October 1, 2026. Final implementation checkpoint: `7f3d5fa` on `feat/station-bucle`.
This documentation checkpoint does not change runtime behavior.

## Read first

- [Station design system](../station-design-system.md).
- [Team portrait process](../team-portraits/README.md).
- [Bundled Crafter Sans provenance](../../apps/web/app/fonts/CrafterSans-README.md).

The complete private session handoff, including research, rejected proposals,
font sources, Paper status, final screenshots and recovery files, is in the
design workspace:

```text
/Users/raillyhugo/Documents/Codex/2026-09-30/listo-qued-documentado-y-enlazado-desde/outputs/crafter-session-handoff/HANDOFF.md
```

The sibling `START-HERE.txt` resumes the work; the ZIP beside the handoff folder
is portable. These are local design-workspace files, not deployed website routes.

## Approved direction

The original Crafter symbol, Evil Martians-inspired editorial composition,
cream/charcoal/soft yellow, Bucle display typography and quieter 176 px sidebar
are approved. The first two homepage sections stay. Further individual page
art direction can proceed gradually within the shared system.

Keep five locales and both themes. Use neutral Spanish. Preserve Station yellow,
Research green, Games purple and Lab blue. Do not reintroduce the removed sidebar
slogan or return to the superseded five-brand proposals.

Homepage people are Railly, Ignacio/Jibaru, Shiara, Edward in that exact order.
Cueva, Emmy, Gabriel and Juan are alumni; historical authorship remains credited.
Final portraits have alpha and custom lower clips, with the yellow plate ending
behind the shoulders. Ignacio's final image has fuller hair and dark sunglasses.

## Font release direction

The user intends **Crafter Sans** to become open source. For now its intended
repository **`crafter-station/font` must be private**. A lookup with the current
account could not resolve it; do not assume absence or verified visibility.
No font repository was created or imported by this handoff.

The ready-to-import font tree is at:

```text
/Users/raillyhugo/Documents/Codex/2026-09-30/listo-qued-documentado-y-enlazado-desde/outputs/crafter-sans-private-repo
```

It includes approved 0.200 binaries, UFO/SVG sources, reproducible scripts,
specimen, provenance and release-status instructions. Internal family:
`Crafter Sans Preview`; one real Medium 500; 233 mapped characters. No
distribution license selected. Neighboring OFLs and embedding metadata do not
grant a license to Crafter Sans.

Paper's v0.2 rhythm and Station boards are complete; Open Source has only its
header and Code Brew is pending. Local SVG/PNG equivalents are complete.

## Branch and validation state

The earlier `feat/station-design-system` branch was pushed at `5b011c4`.
The Bucle/home/team implementation was local through `7f3d5fa`; this handoff
does not push, merge or deploy it.

The original checkout at `../crafter.run` is on `feat/team-former-members` with
user changes. It was preserved while adapting those changes into this branch.
Do not reset or clean it.

Recorded final validation: production build passed; 88 tests, 0 failures.
Standalone web TypeScript retains six baseline migration-script errors.
Next build skips web typechecking; ESLint is not configured. Real auth/data/Luma
mutations were not end-to-end exercised. Documentation changes do not rerun
or improve those historical integration checks.

Restart the local site if needed:

```sh
bun run --cwd apps/web dev --hostname localhost --port 8875
```

Use `http://localhost:8875/es`. Check for an existing listener first; no listener
was present during handoff inspection.
