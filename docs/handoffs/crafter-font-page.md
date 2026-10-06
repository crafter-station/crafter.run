# Crafter Sans specimen inside crafter.run — October 2, 2026

The user asked to recover the October 1 showcase, add all current font cuts,
remaster its presentation to fit Crafter, and move it into the website so it
would not be lost. They explicitly permitted a freer composition inspired by
`https://vercel.com/font`.

## Canonical implementation

- Route: `/[lang]/font`; `/font` uses the normal locale redirect to `/en/font`.
- Current Spanish preview: `http://localhost:8875/es/font`.
- Server page: `apps/web/app/[lang]/font/page.tsx`.
- Interactive specimen: `apps/web/components/font-specimen.tsx`.
- Scoped styles: `apps/web/app/station-font.css`.
- Five-locale copy: `apps/web/lib/font-copy.ts`.
- Glyph inventory: `apps/web/lib/font-glyphs.json`.
- Download binaries, outline data and notes: `apps/web/public/font/`.

The locale shell still owns header, menu, theme and footer. The Font route
uses its compact header, allowing a broad typographic composition. Standard
pages retain their existing shell. `/font` is included in SEO/sitemap paths
and the shared More menu.

## Design and behavior

Large live wordmark, Display/Text selector, cream/sage/violet/yellow surfaces,
quiet section navigation and no repeated decorative arrows or rules.
The actual font drawings are the primary artwork. Vercel informed the
type-first composition and family controls; no Vercel asset or CSS was copied.

- Original Bucle Display Medium 0.200 and Text 0.301 at 400/500/600/700.
- Editable text, actual 14–144px size, tracking, kerning, presets and reset.
  The initial/reset size is now 64px (previously 88px). All ordinary UI and
  secondary descriptions are 16px, the hero introduction 18px and compact
  uppercase metadata 14px. Choosing 14px in the specimen is an intentional
  font test. The later website scale pass reduces the wordmark, section
  headings, weight samples and numerical metadata; it does not rescale the
  font binary or override the size selected in the tester.
- Four text-weight compositions, with buttons that select the matching cut.
- 233-character browser with filled/outlined glyph inspection. Paths, advances,
  x-height and capital height come from the actual OTFs, not illustrative
  approximations. Combining marks and spaces retain their real metrics.
- Lazy outline loading has loading/error/retry states and cancels stale
  requests. No font or user text is sent to an external service.
- The editable historical Display comparison preserves 0.101 versus 0.200.
- Station, Open Source and Code Brew remain as specimen compositions.
- OTF, TTF and WOFF2 for the five current cuts: 15 download files. No claimed
  npm package, public distribution license, italic or variable axes.

## Font source and synchronization

Editable source workspace:
`/Users/raillyhugo/Programming/crafter-station/font`.
Read its `TEXT-HANDOFF.md` for the 0.301 scale correction and prototype limits.

After a reviewed font rebuild, use its pinned Python environment to run:

```sh
cd /Users/raillyhugo/Programming/crafter-station/font
.venv/bin/python sources/build_text_family.py
.venv/bin/python sources/validate_text_family.py
.venv/bin/python /Users/raillyhugo/Programming/crafter-station/crafter.run-bucle/apps/web/scripts/sync-font-specimen.py --source .
```

The sync script copies the website font binaries and downloads, derives each
cut's real SVG paths and metrics, and writes the inventory and hashes.
Check version labels/copy when advancing beyond 0.301.

The original standalone showcase is preserved in the font workspace at
`http://localhost:8874/`; it now has all five cuts in its tester. `text.html`
and `scale.html` are secondary diagnostics. Future website design work belongs
in the repository implementation above, not only in those standalone copies.
The October 1 historical source package and its old ZIP remain intact.

## Verification

Production build passed: 3 tasks, 308 static pages. 95 tests passed, 276
assertions. Standalone web TypeScript retains only the six
pre-existing migration-script errors; lint is not configured.
Browser checks covered all five cuts, true 16px sizing, custom text, tracking,
kerning, reset, outline mode, character selection including spaces, 233 glyph
buttons, the editable historical comparison and format selection.

All 15 download responses match the source SHA-256 hashes; each outline file
contains 233 mapped characters. `/font` correctly redirects to the locale route.
Both themes, all five languages at 320px, and the 1024px compact shell were
reviewed without document overflow, unintended sub-16px copy or Geist in site
content. Numeric metadata was aligned after the mobile review.

Rendering was reviewed in one browser engine. No authenticated action,
deployment, commit, push or remote font release was performed.
