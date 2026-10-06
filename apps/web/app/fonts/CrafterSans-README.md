# Crafter Sans · Bucle

## Current website family — October 4, 2026

The unchanged Display Medium 0.200 remains on headings. Body, UI and metadata
now use **Crafter Sans Text Preview 0.309**, with distinct static
Regular 400, Medium 500, SemiBold 600 and Bold 700 outlines. These text cuts
are development prototypes derived from the approved cubic display master,
with contour offsets and additional spacing; they are not finished manual
masters or comprehensively hinted production fonts.

Version 0.301 corrects the undersized appearance of the first text prototype:
the Regular inset is removed, all text outlines grow 6% within the same em,
and sidebearings compensate for the added width. Regular's visible `x` top is
now 551/1000 em and its `n` upright about 85/1000 em. CSS stays at 18/16/14px.

Version 0.302 redraws acute/grave accents on i/I to prevent `íì` and `ÍÌ`
from intersecting. All advances, other glyph outlines and the calibrated scale
remain unchanged. Validation now covers 48,400 spacing-character pairs per
cut, along with NFC/NFD shaping and the existing tabular numeral widths.

Version 0.303 opens the inner shoulder curves in n/h/m/u and b/d/p/q,
including the accented n/u variants: 18 changed glyphs per cut. The outer
silhouette, straight stems, glyph bounds, advances and vertical metrics stay
unchanged. The generator records the drawing changes; accented bases and
connected-contour topology have dedicated validation. Windows/Android review
is deferred until those devices are available.

Version 0.304 raises minus, multiplication and division onto the plus/equal
axis. Only these three glyphs move vertically; all advances, horizontal
metrics, other outlines and shaping features stay unchanged. The reading
corpus now covers punctuation, s/f accent combinations, dates, prices,
percentages and calculations. Each format checks the operator alignment.

Version 0.305 is the complete local website integration of AGFT Masters 0.006:
19 bases and ten n/u accents, with eight private components. The other 205
glyphs keep their 0.304 geometry, including public combining marks; a broader
test rejected the pilot dieresis over Medium k. All 233 Unicode mappings and
complete kerning/composition features remain. Some interpolated 500/600
advances change by one font unit. Existing f/t anchor limits remain pending.
The canonical 0.304 files and all historical experiments stay unchanged.

Version 0.306 corrects the f/t top anchors: f y=836→864 and t y=706→734
between 400 and 700. X positions, all drawings, advances and kerning remain.
All 72 f/t upper-mark combinations in the complete four-weight preview clear
the letters, resolving 63 collisions. Other anchor limits remain inherited.

Version 0.307 integrates compatible i/j/l from IJL Masters 0.008. Regular
cubic geometry and both endpoint dots are exact; the measured Bold corner
changes are bounded by 0.397613 units. All 239 other glyphs, precomposed
accents, corrected f/t anchors, kerning and composition tables stay intact.
SemiBold i/j/l advances increase by one unit; the other cuts retain theirs.
The pilot now has 22 bases and ten n/u accents. Inherited i/j/l mark limits
remain documented; no dotless substitution or stacked-accent support is added.

Version 0.308 integrates compatible k/v/w from KVW Masters 0.009. Regular
cubic geometry is exact; v/w are also exact in Bold. Four Bold k corners
reduce 96 to 60 points within 0.352473 units. The k top anchor rises from
y=847 to 875 between 400 and 700, clearing its supported upper marks and
resolving 23 inherited full-font collisions. The other 239 glyphs and all
precomposed accents stay unchanged. SemiBold v/w advances and the Medium k
left sidebearing increase by one unit. The pilot covers 25 bases, including
23 of 26 lowercase letters. i/j/l composition limitations remain.

Version 0.309 integrates x/y/z from XYZ Masters 0.010, completing all 26
lowercase masters within the 28-base pilot. Regular cubic geometry is exact;
x/y are also exact in Bold. Six Bold z corners reduce 95 to 41 points within
0.377432 units. All 239 other outlines, public marks, precomposed accents,
GPOS/GSUB/GDEF/OS2 tables and vertical metrics remain identical to 0.308.
Medium x/y/z advances increase by one unit (606/592/584); SemiBold y becomes
602. Regular/Bold metrics and all sidebearings remain unchanged. No new mark
collisions were introduced; inherited i/j/l composition limits remain.
Uppercase masters, the rest of the repertoire and family validation are pending.

Rebuild with `sources/build_text_master_xyz.py --output <fresh-directory>`
in the font workspace (preserve manual UFO edits), then run
`apps/web/scripts/sync-font-specimen.py --source <font-workspace>
--text-source <font-workspace>/web-preview/0.309` with the pinned Python.
Each validated iteration must update and reload `http://localhost:8875/es`,
including matching specimen versions, outlines and OTF/TTF/WOFF2 downloads.

Source, reproducible builder, UFO/SVG output and validation:
`/Users/raillyhugo/Programming/crafter-station/font/TEXT-HANDOFF.md`.

No Geist family is loaded. System monospace is reserved for code; Noto covers
CJK. Use 16px for body/controls, 18px for main descriptions, and 14px only for
compact uppercase labels or explicit small-code/detail exceptions.
No public release or license change was made. The following notes describe
the original, preserved display binary.

Self-hosted Medium 500, preview version 0.200, for Crafter Station's display
typography. The WOFF2 is copied unchanged from the approved Bucle 0.2 package.

The complete editable UFO, SVG sources, builder and validation reports are in
the local `crafter-sans-bucle-v02` deliverable. This file is not covered by the
neighboring Geist or Martian Grotesk OFL licenses. A public distribution license
for Crafter Sans has not been selected.

The user's release direction is **private development at
`crafter-station/font` for now, open source later**. The repository could not
be resolved with the handoff account, so its existence/access and visibility
are unverified. No font repository was created, pushed or published by the
handoff. See `docs/handoffs/crafter-identity-and-sans.md` from the repository
root for the complete source package and release notes. The embedding flag
`fsType=0` is not a distribution license.

Use real weight 500 for this display file and disable synthetic weights. Noto remains the CJK fallback. The display preview has 233 mapped
characters; it is not a full multilingual text family.

SHA-256:
`5d726edc3c763ff6c581e8006f4f7b1e01ba39878e85766d2d7c483830b092f4`
