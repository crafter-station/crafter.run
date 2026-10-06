# Journal and Crafter Universe

## Current scope

The user clarified that **Crafter Hub is future work**. The earlier Hub page
was a misunderstanding of the request to improve and rename Network. Its
runtime route, architectural sketch, café/coworking/studio copy and navigation
have been removed. Do not restore them as the current site direction.

Network is now **Crafter Universe / Universo Crafter**, at
`/[lang]/universe`. The sidebar uses the shorter “Universe” / “Universo”.
This name is the design choice made for the iteration, not a separately
confirmed naming decision from the user.

The page develops the four existing areas rather than duplicating the home:

- A decorative orbital atlas with actual anchor links to each area.
- Research and Lab in a compact paired composition, with purpose, themes and
  existing external and internal exploration destinations.
- Games in a horizontal illustrated composition.
- Station as the community entry, with events, Ships and member links.
- A quiet closing link to Journal.

The homepage retains its four compact area cards. The Journal redesign and
all article behavior remain; its secondary CTA now leads to Universe.

## Implementation

- `apps/web/app/[lang]/universe/page.tsx`
- `apps/web/app/station-universe.css`
- `apps/web/lib/universe-copy.ts`, all five locales
- `apps/web/components/crafter-network.tsx` exports the shared decorative
  area drawings and points the homepage CTA to Universe.
- Navigation, shared shell, ecosystem links, message catalogs, metadata and
  sitemap use the new route.
- `/network` and `/products`, including localized forms, redirect directly
  to `/universe`. `/hub` has no runtime page or redirect; it is reserved for
  future work.
- `list_network` and `org.network` remain compatible descriptions of the
  four areas. The legacy `org.products` array remains empty. Retired products,
  Visagente promotion and withdrawn Normal repositories remain excluded.

Original Crafter symbol, Bucle Medium 500, Geist and CJK fallbacks are kept.
The page has continuous warm paper/charcoal backgrounds, transparent rails,
equal desktop insets and restrained section typography. No new dependencies
or continuous animation loops; hover motion respects reduced motion.

## Verification

- `bun run build`: 3 tasks successful.
- `bun test apps/web packages/cli packages/db apps/api`: 89 pass, 0 fail,
  260 assertions.
- Standalone web TypeScript: the same six pre-existing errors, exclusively
  in `apps/web/scripts/migrate-supabase-boards.ts`.
- Browser: all five locales at 320 px in light and dark, without horizontal
  document overflow. Desktop reviewed at 1280 px and 1024 px. At 1024 px,
  the sidebar ends at 176 px and content starts at 200 px.
- Mobile menu includes Universe; Escape closes it and restores focus.
- Atlas anchor activation works with pointer and keyboard.
- Journal's existing design remains, and its corrected CTA navigates back
  to Universe.
- HTTP: Universe 200, old Network/Products routes 308 to Universe, Hub 404,
  sitemap 200 with Universe and no Hub entries.
- Universe metadata: localized canonical and six language alternates.
- Reduced-motion guards reviewed in source; the preference was not emulated.
- Authenticated submissions and external service behavior were not exercised.

The dev server runs with Bun/Webpack on port 8875. Check the listener before
starting another process:

```sh
bun run --cwd apps/web dev --webpack --hostname localhost --port 8875
```

Preview: `http://localhost:8875/es/universe`.
No commit, push, merge or deployment was performed.

Captures:
`/Users/raillyhugo/Documents/Codex/2026-10-01/done-documented-the-full-history-decisions/outputs/station-iteration/universe-*.png`

Logs:
`/Users/raillyhugo/Documents/Codex/2026-10-01/done-documented-the-full-history-decisions/work/home-iteration/`
