# Crafter Station design system

Implemented from the approved `crafter-station-system` direction, then adapted to Crafter Sans Bucle on `feat/station-bucle` (October 1, 2026). This changes the presentation of crafter.run, keeping the Crafter symbol, live catalogs, content, routes, localization, authentication and data APIs.

## Foundations

- `apps/web/app/globals.css`: semantic HSL tokens for light and dark, Tailwind aliases, nested `.theme-scope`, Fumadocs palette, syntax highlighting, chart colors.
- `apps/web/app/station.css`: spacing, responsive shell, typography, page introductions, editorial cards, artwork containers, menus and focus states.
- `apps/web/lib/fonts.ts`: self-hosted Crafter Sans Preview / Bucle Medium 500 (display and headings), Geist (body), Geist Mono (metadata). Bucle is version 0.200 with synthetic weights disabled. Existing Noto SC/JP fallbacks remain for CJK. Font provenance and third-party licenses are beside the fonts.
- `components/site-shell.tsx`: a single navigation/footer boundary in the locale layout. Standard pages use the 176 px rail with a centered symbol/wordmark, five primary links and a secondary “More” menu; docs use a compact site header above Fumadocs' own navigation. Under 1024 px the rail becomes a modal menu.
- `components/theme-provider.tsx`: existing next-themes persistence and system preference. All theme controls use the same provider and three localized choices.
- `components/site-header.tsx`: Radix modal menu, focus trapping, Escape/overlay close, return of focus and close on navigation. Dropdowns remain usable inside the menu.
- `components/ui/*`: shared form/card/button primitives use the same semantic colors and radii. Clerk receives matching colors, fonts and radius.
- `components/design-system-guide.tsx`: live reference at `/[lang]/brand`, above the existing asset downloads.

## Palette

| Role | Light | Dark |
| --- | --- | --- |
| Canvas | `#F7F7F2` | `#191B17` |
| Surface | `#EFEFE8` | `#22251F` |
| Ink | `#20221D` | `#F3F3E9` |
| Muted text | `#60635A` | `#B3B7A8` |
| Line | `#CFD1C8` | `#41443A` |
| Primary surface | `#20221D` | `#F8E9A4` |
| Accessible accent text | `#705400` | `#F4D56D` |
| Station brand | `#FFC107` | `#FFC107` |
| Station soft | `#F8E9A4` | `#F8E9A4` |

Yellow is a brand surface/detail, not small text on cream. Accent text has a separate accessible token. The four family colors occur in the organization section: Station yellow, Research green, Games violet, Lab blue. Project illustration fields retain their editorial colors in both themes; text surfaces adapt.

Measured contrast for text/background, muted text/background, accent/background, primary action, card text and error text is above 4.5:1 in both themes (lowest: light muted text, 5.70:1). This is a token contrast check, not a claim of a full accessibility audit.

## Compositions and behavior

- Home: the Bucle hero starts at the top, followed by the preserved dark Crafter Open Source feature. The rest is an editorial sequence: asymmetric project showcases, newly drawn event posters, existing team portraits, a four-organization diagram, actual blog articles and the contact form. Related community, calendar, research, services and social destinations are consolidated into these sections and the footer.
- Open source: dark introduction, existing metrics, and numbered editorial rows for the actual catalog. Search across name/description/language, intersecting owner and language filters, result count, reset and empty state remain. No project or contribution links removed.
- Products: the same catalog in illustrated editorial cards. Known artwork maps by project name; other repositories use decorative geometric illustrations, not invented product logos.
- Blog/article/docs: existing search, pagination, MDX, code highlighting, RSS, Markdown and agent links remain. Page titles and surfaces use the new system.
- Community/Ships/team/profiles: common shell and introductions, semantic cards, existing forms, votes, auth boundaries and API behavior.
- Events/sponsors/research/impact/tool landing pages/boards/contact: shared title scale, spacing, colors and navigation. Sponsor marks now work on light surfaces too.
- Timeline/OSS metrics: existing data visualizations and controls; theme-aware colors and corrected sticky offset for the new navigation.
- Hackathons immersive page: retains its content and interaction, adopts both palettes and the shared site shell.
- Localized and global 404: typography and theme; the standalone global 404 keeps its auth-independent document and theme control.
- Social preview images use Station colors, the original symbol and local Geist fonts (Noto subsets for CJK). The SVG favicon responds to the browser theme. SEO URLs, API, RSS, sitemap, MCP, Markdown twins and well-known endpoints keep their existing routes and behavior.

## Authoring

1. Use semantic classes (`bg-card`, `text-foreground`, `border-line`), not fixed neutral colors for interface surfaces.
2. Use `station-page-intro` for a page introduction, `station-section` for editorial spacing and `station-project-card` for illustrated projects.
3. Keep an actual heading and descriptive text outside decorative artwork. SVGs with baked-in typography are decorative only.
4. Put new interface copy in the existing message catalogs or `lib/station-copy.ts` with all five locales. Brand/project names stay unchanged.
5. Use `--station-header-height` for elements sticky under the site header.
6. Do not add page-level SiteHeader/SiteFooter: the locale layout owns them.
7. Keep `.theme-scope` when applying a nested palette.

## Verification and limits

Run from the repository root:

```sh
bun install --frozen-lockfile
bun run build
bunx tsc -p apps/web/tsconfig.json --noEmit --incremental false
bun test apps/web packages/cli packages/db apps/api
```

The web TypeScript baseline already contained errors in `scripts/migrate-supabase-boards.ts` (optional migration key header and top-level await). Those remain outside this design change. The pre-existing pagination variant mismatch was fixed as part of the button system.

Local visual review for this iteration uses `bun run --cwd apps/web dev --hostname localhost --port 8875`. Open `http://localhost:8875/es`. This isolated checkout has no configured integration environment. Clerk uses its temporary development instance; a production server requires `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`. Without the local API/database and Luma credentials, live data/authenticated mutations cannot be fully exercised. The existing unavailable/empty states remain. Do not run production migrations or submit sample Ships/board data for visual QA.

## Bucle iteration verification

- Production build passed; 83 existing tests passed.
- Standalone web typecheck still reports the six pre-existing errors in `scripts/migrate-supabase-boards.ts`; no changed presentation file appears in those diagnostics.
- Home reviewed in light/dark at 1440 px, plus 390 px and 320 px without document overflow. The sidebar symbol and wordmark share its exact horizontal center.
- Mobile menu navigation, Escape and focus restoration verified.
- OSS query, intersecting owner filter, language filter, empty state and reset verified in the browser; all 22 catalog entries return after reset.
- Products, blog, events, docs and brand checked at desktop and mobile widths. Portuguese, Chinese and Japanese home routes checked; CJK font fallbacks retained.
- Local auth uses the existing temporary development mode. No authenticated submissions, database mutations, production deployment or merge were performed.

This is a shared foundation. Distinct art direction for every major page is a subsequent, gradual exploration. A dimensional symbol can be explored as hero artwork while the navigation retains the flat mark.

## Homepage personality and quieter navigation — October 1, 2026

- Research: visually reviewed Evil Martians home, Open Source, Products and Dev Propulsion Labs. Adapted changes of scale, distinct section compositions and editorial artwork; no Martian artwork or branding was copied.
- The two approved opening sections retain their content and style; only the redundant topline above the hero was removed.
- `components/featured-products.tsx`: actual catalog entries, original abstract radar and waveform art, two smaller editorial project links, computed catalog count. No stale numerical product claims displayed on the home.
- `components/station-sections.tsx`: original coffee and paper-boat SVGs; Station, Research, Games and Lab retain their identity colors. Keyboard focus highlights the matching organization node, just like hover.
- `components/station-home.tsx`: existing team portraits and profile links, current blog index with language fallbacks, compact secondary destination links. New homepage copy lives in `lib/home-copy.ts` for all five locales.
- Sidebar: Station, Products, Open Source, Events and Blog remain visible. “More” contains the remaining destinations, without duplicate primary entries. Removed the family slogan and dots, reduced the logo and rail, and made language/theme/GitHub controls compact. Sign-in and signed-in actions remain.
- The mobile drawer uses the same navigation. Its secondary menu opens downward with viewport collision handling and a scrollable height. Desktop places it beside the rail. Escape returns focus to the trigger.
- Motion is limited to hover/focus responses; reduced-motion disables transitions. Interface surfaces follow theme tokens; poster fields deliberately keep their own palette in both themes.

Verification: production build passed; 83 existing tests passed. The standalone web typecheck still reports only the six pre-existing migration-script errors. Browser review covered desktop light/dark, mobile 390/320 px, all five locale home routes, menu Escape/focus and actual mobile navigation to Team. No production submissions or deployments were made.
