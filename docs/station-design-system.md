# Crafter Station design system

Implemented from the approved `crafter-station-system` direction, then adapted to Crafter Sans Bucle on `feat/station-bucle` (October 1, 2026). This changes the presentation of crafter.run, keeping the Crafter symbol, live catalogs, content, routes, localization, authentication and data APIs.

The route-preservation statement above describes the initial visual iteration.
The October 3 identity pruning below supersedes historical route, service and
booking descriptions. Current decisions are recorded in
`docs/handoffs/identity-pruning-2026-10-03.md`.

## Foundations

- `apps/web/app/globals.css`: semantic HSL tokens for light and dark, Tailwind aliases, nested `.theme-scope`, Fumadocs palette, syntax highlighting, chart colors.
- `apps/web/app/station.css`: spacing, responsive shell, typography, page introductions, editorial cards, artwork containers, menus and focus states.
- `apps/web/app/station-home.css`: the home page's centered frame, masthead, compact section headings and individual editorial compositions. Imported after the shared stylesheet.
- `apps/web/app/station-oss.css`: the Open Source page's sage/graphite palette, illustrated catalog and contribution compositions. Scoped to `.station-shell-oss` and `.oss-*`; the metrics route keeps its existing presentation.
- `apps/web/app/station-agenda.css`: hack0 calendar, with cobalt ink, continuous cool paper, a pale yellow event ticket, searchable agenda, archive and calendar subscriptions.
- `apps/web/app/station-pages.css`: secondary pages, with topic palettes, balanced desktop insets, illustrated introductions, soft cards, large team portraits, identity panels, booking choices and quieter data reports. `StationPageHero` and `StationPageArt` share this vocabulary. Documentation receives a scoped typographic/card pass while retaining Fumadocs. See `docs/handoffs/secondary-pages-2026-10-02.md`.
- `apps/web/app/station-network.css`: the homepage area cards, with green Research, blue Lab, violet Games and yellow Station.
- `apps/web/app/station-journal.css`: Crafter Journal, with violet ink, tinted paper, original SVG covers, a leading article and a varied two-column index. “Crafter Journal” stays on one line, including at 320 px, with a restrained display scale.
- `apps/web/app/station-universe.css`: Crafter Universe, with a warm paper atlas, four colored orbital links, four equally weighted illustrated areas and three practical starting points. Original full-size scenes live in `components/universe-artwork.tsx`.
- `apps/web/lib/fonts.ts`: original Crafter Sans Bucle Display 0.200 Medium 500 for headings; Text Preview 0.304 Regular 400 / Medium 500 / SemiBold 600 / Bold 700 for body, controls and metadata. No Geist is loaded. System monospace is reserved for code; Noto SC/JP supply CJK glyphs. Text cuts are experimental static outline derivatives, with further optical/hinting work remaining.
- Default body, controls, menus, buttons and ordinary metadata are **16 CSS px**. Principal descriptions are **18px**, including the homepage hero on mobile. **14px** is an explicit exception for compact uppercase labels and code/details. `text-xs`/`text-sm` default to 16px, with their uppercase variants at 14px. Reflow crowded layouts instead of reducing the type.
- The post-0.301 scale uses `--station-type-page: clamp(40px, 5vw, 72px)` and `--station-type-section: clamp(28px, 3.2vw, 44px)`. Introductory copy uses 1.6 leading; ordinary and secondary copy generally uses 1.65. The homepage's compact headings and each mobile composition retain their more specific sizes. Article body stays at 16px/1.75.
- `components/site-shell.tsx`: a single navigation/footer boundary in the locale layout. Standard pages use a transparent, floating left rail (`clamp(176px, 14vw, 220px)`) and a narrow social rail on the right. The home uses one continuous canvas with gentle tonal shifts behind both rails and the footer; its rails use stable semantic ink instead of difference blending. Equal left/right content insets keep the composition centered between the rails. Docs use a compact site header above Fumadocs' own navigation. Under 1024 px the rail becomes a modal menu.
- `components/theme-provider.tsx`: existing next-themes persistence and system preference. All theme controls use the same provider and three localized choices.
- `components/site-header.tsx`: five primary links, secondary “More” menu, compact language/theme controls and an event invitation. Radix provides the mobile modal, focus trapping, Escape/overlay close, return of focus and close on navigation. Dropdowns remain usable inside the menu. Authentication remains in the existing flows; the sidebar no longer advertises sign-in.
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

- Home: a centered Bucle masthead is followed by a compact open-source index, the four-area Crafter directory, Makeables, landscape event posters, an editorial ink portrait series, actual blog articles and a small contact panel. Related community, calendar, organizations and social destinations are consolidated into these sections and the footer.
- Open source: a sage/graphite workbench with a full-width title and prominent, data-driven stars, repository and issue-plus-PR totals. Continuous lime, aqua and violet washes bring more color behind the transparent rails. Four illustrated featured repositories lead a denser catalog. Search across name/description/language, intersecting owner and language filters, result count, reset and empty state remain. The contribution guide, activity link and paper-style idea invitation vary the page's rhythm. No project or contribution destinations removed.
- Crafter Universe: renames and develops Network around the four actual areas. The atlas links to Research, Lab, Games and Station. Each has its own large colored illustration, name, purpose, concise description, topics and grouped actions in a consistent two-column composition (one column on mobile). A closing section points to the Journal, open source and Ships according to the visitor's intent. `/network` and `/products` redirect to `/universe`. Crafter Hub is future work and is absent from the current runtime, navigation and SEO.
- Crafter Journal: original illustrations relate to each existing article. The first article leads, the fourth has a horizontal treatment, and others form a compact grid. Filtering uses a regular grid; search covers title, summary and author, with a localized count and reset. Existing chronology, bylines, pagination, MDX, code highlighting, RSS, Markdown twins and language fallback links remain. Article columns are sized for reading inside the balanced shell.
- Docs: retain the compact shared shell and their existing navigation.
- Community/Ships/team/profiles: common shell and introductions, semantic cards, existing forms, votes, auth boundaries and API behavior.
- Calendar (`/events`): the full public hack0 feed, including events organized by the wider community. Cobalt/pale-yellow identity, featured event ticket, upcoming/archive/all filters, accent-insensitive search, pagination, time-zone selection and Google/Apple/Outlook/iCal subscription links. The sidebar teaser uses the same feed.
- Sponsors/impact/generic workshop boards/contact: shared title scale, spacing, colors and navigation. Sponsor marks work on light surfaces too. The standalone Research and three tool landing pages were removed on October 3.
- Timeline/OSS metrics: existing data visualizations and controls; theme-aware colors and corrected sticky offset for the new navigation.
- Hackathons immersive page: retains its content and interaction, adopts both palettes and the shared site shell.
- Localized and global 404: typography and theme; the standalone global 404 keeps its auth-independent document and theme control.
- Social previews use warm paper, section pastel palettes, the original symbol,
  Crafter Display/Text and the site's own illustrations. Articles, approved
  team portraits, bounties, public profiles and Ships supply their actual
  content. OG/Twitter share versioned 1200×630 images. Noto SC/JP are local
  server fonts, so rendering requires no font-provider requests. See
  `docs/handoffs/social-previews-2026-10-06.md`.
  Hot Reload adds warm sage paper and the existing coffee illustration;
  edition/menu cards use the catalog's original poster and public event
  details. Future editions inherit this treatment through the catalog.
  See `docs/handoffs/hot-reload-social-2026-10-06.md`.
  Hot Reload dates, states and order cutoff now come from absolute catalog
  timestamps and each venue's time zone. Public pages, menus, account access
  and admin/export follow the selected language; closed orders have a
  read-only summary. Menus and budgets resolve per edition. See
  `docs/handoffs/hot-reload-lifecycle-2026-10-06.md`.
  The SVG favicon responds to the browser theme. API, RSS, sitemap, MCP,
  Markdown twins and well-known endpoints retain their existing behavior.

## Authoring

1. Use semantic classes (`bg-card`, `text-foreground`, `border-line`), not fixed neutral colors for interface surfaces.
2. Use `station-page-intro` for a page introduction, `station-section` for editorial spacing and `station-project-card` for illustrated projects.
3. Keep an actual heading and descriptive text outside decorative artwork. SVGs with baked-in typography are decorative only.
4. Put new interface copy in the existing message catalogs or `lib/station-copy.ts` with all five locales. Brand/project names stay unchanged.
5. Use `--station-header-height` for elements sticky under the site header.
6. Do not add page-level SiteHeader/SiteFooter: the locale layout owns them.
7. Keep `.theme-scope` when applying a nested palette.
8. Never introduce text below 14 px, including decorative text rendered by canvas or SVG. Keep implementation notes about caches, fallback data and API endpoints out of marketing copy.

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

This is a shared foundation. Distinct art direction for every major page proceeds gradually. Dated sections below preserve iteration history; the latest relevant entry supersedes earlier descriptions.

## Homepage personality and quieter navigation — October 1, 2026

- Research: visually reviewed Evil Martians home, Open Source, Products and Dev Propulsion Labs. Adapted changes of scale, distinct section compositions and editorial artwork; no Martian artwork or branding was copied.
- The two approved opening sections retain their content and style; only the redundant topline above the hero was removed.
- `components/featured-products.tsx`: actual catalog entries, original abstract radar and waveform art, two smaller editorial project links, computed catalog count. No stale numerical product claims displayed on the home.
- `components/station-sections.tsx`: original coffee and paper-boat SVGs; Station, Research, Games and Lab retain their identity colors. Keyboard focus highlights the matching organization node, just like hover.
- `components/station-home.tsx`: a new editorial ink portrait series and profile links, current blog index with language fallbacks, compact secondary destination links. New homepage copy lives in `lib/home-copy.ts` for all five locales.
- Sidebar: Station, Products, Open Source, Events and Blog remain visible. “More” contains the remaining destinations, without duplicate primary entries. Removed the family slogan and dots, reduced the logo and rail, and made language/theme/GitHub controls compact. Sign-in and signed-in actions remain.
- The mobile drawer uses the same navigation. Its secondary menu opens downward with viewport collision handling and a scrollable height. Desktop places it beside the rail. Escape returns focus to the trigger.
- Motion is limited to hover/focus responses; reduced-motion disables transitions. Interface surfaces follow theme tokens; poster fields deliberately keep their own palette in both themes.

Verification: production build passed; 83 existing tests passed. The standalone web typecheck still reports only the six pre-existing migration-script errors. Browser review covered desktop light/dark, mobile 390/320 px, all five locale home routes, menu Escape/focus and actual mobile navigation to Team. No production submissions or deployments were made.

## Active team and portrait series — October 1, 2026

Integrated the local `feat/team-former-members` changes without changing its worktree. Cueva, Emmy, Gabriel and Juan are alumni; the team directory, links.json, MCP and sitemap use the ten active members. Historical blog authors remain credited with working external links and no current `worksFor` claim. Featured homepage order is Railly, Ignacio (Jibaru), Shiara, Edward, independent of the team directory’s shuffle.

Four new charcoal/cream/pastel-yellow portraits generated through imagegen replace these members’ images across the home, profiles and bylines. Original images are retained, production copies are optimized WebP with alpha, and prompts/provenance live in `docs/team-portraits`. The portraits retain color in both themes.

Verification: production build passed; 88 tests passed, including active roster/public links/MCP and historical authorship regressions. Standalone web typecheck retains the six existing migration-script errors. Local HTTP checks confirmed all four featured profiles return 200, retired profiles return 404, and no former-member profile remains in sitemap.xml.

Portrait refinement: the final four portraits are background-free cutouts with custom SVG/CSS `clip-path` backplates. Background and subject share the lower clip; the pastel-yellow shape stops behind the shoulders, preventing a yellow fringe below the torso. Hair extends naturally beyond the colored plate. Ignacio uses the user-requested fuller hairstyle and dark sunglasses. Final visual review covered both desktop themes and 390/320 px mobile.

## Floating navigation and home rhythm — October 1, 2026

- The sidebar has no surface or dividing border. Its links and wordmark use difference blending to stay legible as the light, yellow and dark home sections pass behind them. The original Crafter symbol is retained. Uppercase links, a small active marker and generous edge spacing replace the numbered navigation tiles.
- X, Instagram, GitHub and YouTube occupy a separate right-hand rail, with the actual brand marks and existing destinations. Mobile presents the same links at the bottom of the drawer.
- Language and theme share a compact horizontal treatment and consistently spaced dropdowns. Native language names, selection checks, localized theme labels, keyboard interaction and theme persistence remain.
- `components/station-event-teaser.tsx` uses the earliest upcoming event from the existing Luma integration. When there is no upcoming event, configuration or response, the stamp says “Nos vemos pronto” and links to the calendar. It does not invent an event date.
- Product artwork and captions are separate; the journal pairs a lavender illustrated feature with two smaller posts. The yellow contact section retains the existing email form. New home copy covers all five locales.
- At a 1280 px viewport, section title sizes are about 46 px for products, 49 px for events, 58 px for people, 41 px for family, 44 px for journal and 70 px for the closing invitation. The opening open-source section keeps its larger display role. Section spacing and artwork heights have also been reduced.
- Home full-width backgrounds apply to both its sections and its closing navigation block. The latter must retain the rail inset; omitting the `nav` element from this rule causes the sidebar collision fixed in this iteration.
- The footer is a compact signature, copyright and three links: Team, Contact and Brand. At 1280 px it is approximately 125 px tall. The large repeated directory has been removed.

Verification: production build and 88 tests pass. The web typecheck still reports only the six existing migration-script errors. Browser checks confirmed 320 px and 390 px layouts without document overflow, language-menu collision handling at 320 px, Escape/focus restoration from dropdown to trigger and from drawer to menu button, desktop light/dark blending, and the corrected closing navigation inset (47 px clear of the sidebar at 1280 px). The compact footer was also reviewed at 390 px; switching to Japanese closes the drawer and preserves the layout. Docs retain their compact header without either side inset. The event preview currently uses the calendar fallback because this checkout has no Luma key. No form submissions, publication or deployment were performed.

## Centered home composition — October 1, 2026

The user's subsequent comparison with Evil Martians supersedes the earlier oversized opening and section-title scale. The current home groups its masthead around one axis and uses a quieter editorial sequence below it.

- The desktop content frame has equal insets: `max(200px, 16vw, calc((100vw - 1120px) / 2))`. At 1512 px this gives 242 px on each side and approximately 1028 px of content. Backgrounds still continue behind both transparent rails.
- The original symbol, inline “Craft. Ship. Repeat.” title, description and actions share a centered masthead. The display title remains the primary typographic moment.
- Section headings are generally 25 px on desktop and 24 px on mobile. Open source is a compact three-repository index; below 560 px it becomes aligned rows. Products retain staggered artwork, events use landscape posters, and the four portraits retain their cutouts and order.
- The family section pairs a small diagram with a two-column directory. The journal combines one illustrated feature and two text entries. Contact is a compact two-column panel, followed by the minimal footer.
- The left rail uses 28–64 px edge padding and switches to a shorter vertical arrangement at viewport heights up to 760 px. The event stamp remains 132 px. The social rail is centered vertically.
- Home-specific styles live in `station-home.css`; other pages retain the shared presentation. Webpack now uses the existing WGSL loader as well, allowing a stable alternative local preview command: `bun run --cwd apps/web dev --webpack --hostname localhost --port 8875`.

Verification: production build passed; 88 tests passed. Web TypeScript still reports only the six baseline migration-script errors. Visual review covered both themes, 1512, 1280, 1024, 390 and 320 px widths, portraits, contact, and the closing navigation. At 1024 px the event stamp clears the content by 28 px; the sidebar fits at 1280×720 without scrolling. All five home locales were checked at 320 px without document overflow. Mobile dropdown containment, Escape, return of focus and Japanese locale navigation passed. External submissions and authenticated data mutations were not exercised.

## Continuous atmosphere and stable navigation — October 1, 2026

This supersedes the homepage's alternating section backgrounds and difference-blended rails. The canvas stays cream in light mode and charcoal in dark mode, with broad, low-opacity warm and green tonal variations. Grain and gradients belong to `.station-shell-home` so they extend behind navigation and through the footer without a section boundary. Events, family and contact are transparent; project art, posters, portraits and the journal card retain their individual colors.

- `.station-shell-home` overrides both rails to normal blending and semantic foreground ink. Scrolling past contact no longer splits the sidebar into two colors.
- The family directory follows the surrounding theme. Its identity colors use darker text equivalents in light mode. Contact inputs, focus and actions use semantic theme tokens.
- `components/station-atmosphere` adds original flowing contours behind the masthead, inspired by the depth of the Evil Martians reference rather than copying its artwork. The server-rendered SVG, static grain and glow work without WebGPU.
- The optional renderer dynamically imports the existing `vgpu` dependency only on desktop at 1024 px or wider, with motion enabled and data saving off. It requests a low-power adapter and draws one transparent, premultiplied-alpha pass at a maximum of 24 fps and 650,000 pixels, never exceeding CSS resolution.
- Intersection and document visibility pause the frame loop. Resizing updates its resolution budget, theme changes update the ink, and breakpoint changes or unmount dispose the GPU resources. Initialization errors and device loss retain the static composition. Mobile, reduced motion and unavailable WebGPU use the SVG fallback.

Verification: production build passed; all 88 existing tests passed. The standalone web typecheck still reports only the six known migration-script errors, with no atmosphere diagnostics. Browser review covered light/dark desktop, light 390/320 px and the mobile-to-desktop lifecycle without document overflow. The GPU paused below the masthead, resumed on return, and restarted after the mobile breakpoint; the observed 1512 px backing canvas used 649,077 pixels. The GPU console had no errors. Reduced-motion and data-saving guards were reviewed in source; those preferences were not emulated in the browser. No form submissions or deployment were performed.

Top-edge refinement: the page's color washes now use a separate pseudo-element with a 160 px entrance fade; the hero atmosphere also fades along its upper edge. Removed the SVG's straight registration lines so the decoration cannot read as a horizontal yellow rule. This follow-up was visually checked in desktop light/dark and at 390 px with no horizontal overflow; it changes CSS and decorative SVG only.

Hero actions: both links now use `.station-masthead-cta`, Geist 500 at 12 px, 44 px minimum height and matching 16 px arrows. Open source uses the semantic primary fill; events uses a quiet outline. At 320 px they stack with equal widths. The original localized destinations and copy remain; desktop and 390/320 px layouts were visually reviewed in both palettes.

## Open Source workbench — October 1, 2026

Open Source is the first major sidebar page to receive its own art direction. Visually reviewed Evil Martians' Open Source page for compact aggregate metrics, illustrated projects and changes in catalog density. No reference artwork or branding was copied.

- The exact `/[lang]/oss` route receives `.station-shell-oss`: a continuous sage-tinted canvas with paper grain, stable semantic navigation ink and a sage active marker. Equal desktop insets retain the approved centered frame and clear both rails.
- `components/oss-art.tsx` contains original decorative SVG drawings: an isometric assembly of code/interface/terminal modules, four project illustrations and a contribution branch diagram. These are editorial illustrations, not official project logos. They add no dependency, network asset or GPU renderer.
- Petdex, Agentfiles, Tinte and Elements have individual colored artwork fields, mapped by exact repository identifier. The remaining catalog uses compact three-column cards, two at intermediate desktop widths and one on mobile. Fixed artwork fields retain dark ink and visible keyboard focus in both themes.
- Aggregate repository, star and issue-plus-PR counts are computed from the existing `getOssRepos()` data. Catalog ranking and descriptions remain data-driven. The localized note acknowledges the saved reference when GitHub is unavailable; no hardcoded live totals were introduced.
- Search, intersecting organization/language filters, live result count, empty state and reset remain. Radix radio menus provide matching dropdowns, viewport collision handling and Escape/focus restoration. Filtered results use compact cards.
- The contribution guide describes each project's own process without claiming a common stack. The LatAm invitation describes support being prepared, not an already-running program. Copy is localized in all five message catalogs, with CJK font fallbacks and neutral Spanish.
- Metadata, repository/breadcrumb JSON-LD, daily revalidation and the GitHub, metrics, timeline, ideas board, contact and community destinations remain. This iteration does not restyle the metrics route or approved homepage.

Verification: production build passed; all 88 existing tests passed. The standalone web typecheck retains only the six baseline migration-script errors. Browser checks covered desktop light/dark, 1024 px sidebar clearance, mobile 390/320 px, the contribution guide and footer, and all five locales at 320 px without horizontal overflow. At 1024 px the content begins at 200 px and the sidebar ends at 176 px. Search and combined organization/language filtering, empty-state reset to all 22 current entries, dropdown containment and Escape/focus restoration passed. Reduced-motion rules were reviewed in source, not emulated. No authenticated submissions, publication or deployment were performed.

## Four-area directory and product retirement — October 2, 2026

The user requested removal of the Products section and its catalog, specifically excluding Visagente and Normal, and a classification into Research, Lab, Games and Station.

- `lib/network.ts` is the shared four-area directory with existing public destinations and five localized descriptions. `components/crafter-network.tsx` renders original orbital, layered-code, game-cube and community illustrations; these are decorative drawings, not replacement brand marks.
- “The network” / “La red” replaces Products in the desktop sidebar and mobile navigation. `/[lang]/network` uses the approved centered insets and a four-color composition. Metadata, sitemap and breadcrumb data reference the new route. Both localized and unlocalized `/products` URLs permanently redirect to it.
- The homepage's product showcase is replaced by four compact area cards, in Research / Lab / Games / Station order. The later duplicate family section is removed. Original masthead, open-source preview, events, portraits, journal and contact remain.
- Removed the product page, featured-product component, product data/model helpers, product JSON-LD, unused translations, showcase/family CSS and product-shipping statistic.
- `list_network` replaces `list_products` in the read-only MCP surface, discovery documents and corresponding blog explanation. `/links.json` exposes `org.network`; `org.products` remains an empty array solely to avoid breaking existing link-directory consumers.
- Visagente is removed from the hackathon partner list and its artwork, plus the former-member promotional bio/website. Historical author credit remains, using the existing GitHub profile.
- Normal is removed from the OSS seeds and both related repositories from the activity snapshot. `isListedRepository` also excludes them from live refresh and previously cached timeline results, preventing their return after refresh. The current OSS catalog has 21 entries; totals continue to be computed from the remaining repositories.

Verification: production build and all 89 tests passed, including directory/MCP and withdrawn-catalog assertions. The standalone web typecheck reports only the six baseline migration-script errors. Visual checks covered both themes, the homepage's four-column desktop/two-column 320 px directory, all five network locales at 320 px, CJK typography, 1024 px sidebar clearance, the Products redirect, mobile navigation and Escape/focus restoration. No horizontal overflow was observed. No publishing, deployment or authenticated submissions were performed.


## Journal and Hub iteration

The Journal redesign remains. The initial Hub interpretation was subsequently corrected by the user: Hub is a future idea, not the intended replacement for Network. The active replacement is now **Crafter Universe** at `/[lang]/universe`, focused on Research, Lab, Games and Station. No Hub venue, programs or promotional content remains in the website. Journal and Universe keep the approved transparent rails, equal desktop insets, Bucle Medium 500, five locales and both themes. Both use original inline SVG without a new animation loop or dependency. See `docs/handoffs/journal-and-universe.md` for the corrected scope; `docs/handoffs/journal-and-hub.md` is historical.


## hack0 calendar, prominent OSS metrics and Journal masthead — October 2, 2026

The latest iteration supersedes the compact OSS metrics, oversized Journal wordmark and generic Events introduction described above. `docs/handoffs/hack0-agenda-and-metrics.md` records the feed, source coverage, current behavior and verification. Hub remains deferred.

Verification: production build and all 95 tests pass. The standalone web typecheck retains only the six baseline migration-script errors. All five locales of Agenda, OSS and Journal were checked at 320 px without horizontal overflow, alongside both desktop palettes and 1024 px sidebar clearance. Agenda search, empty/singular results, archive pagination, time-zone selection and ticket keyboard focus were checked in the browser. The public hack0 source works without an API key; only the legacy tagged hackathon integration still requires one.

## Readable type and a useful closing section — October 2, 2026

This supersedes the smaller metadata sizes, two-line Journal title and OSS fallback-data notes described in earlier entries. Every interface size below 12 px was raised across the shared shell, main pages, forms, profiles, metrics, timelines, hackathons, code captions and 404. The homepage now ends with the existing exploration links, ten localized FAQs, the contact form and the compact footer. The FAQs cover the community, open source, first contributions, the core team, the four Crafter areas, hack0, ideas and working together. They use native disclosures without a client-side accordion dependency.

Open Source uses the same restrained title scale as the other pages; its numeric metrics keep their larger size. “Crafter Journal” stays on one line at desktop and 320 px. The repeated OSS cache explanation and profile-form API endpoint label were removed. A calendar date-format whitespace mismatch discovered during locale review was also corrected. Implementation and verification are recorded in `docs/handoffs/readable-type-and-faq.md`.

## Cleaner compositions and a hack0 ticket — October 2, 2026

- The sidebar invitation is a compact, slightly rotated ticket. Bucle day numerals are 64 px; the separate uppercase month is 19 px (17 px for longer abbreviations and CJK). The month stays on one line. The weekday, title and action remain at least 12 px. Transparent cutouts have their own curved outlines, aligned with the perforated action stub. The ticket uses inherited ink and a translucent surface, with an inset keyboard focus outline.
- The ticket keeps the public hack0 source, external event destination, all-day UTC handling and Lima time zone for timed events. Its accessible label includes the complete localized date and event title. With no upcoming event it remains an invitation to the calendar, without a fabricated date.
- The homepage's “Gente curiosa. Cosas por hacer.” / “CRAFTER.RUN” strip and all five translations of that unused slogan are removed.
- Space, typography, illustrations and soft surfaces separate the principal compositions. Removed repeated horizontal rules and decorative card borders from Home, OSS, Journal, Universe, Agenda and the shared footer. Native FAQ disclosures use a subtle active surface. Form controls, keyboard focus indicators, artwork and the ticket's physical outline remain intentional.

Verification: production build passed (three workspace tasks); all 95 existing tests passed (276 assertions). The web typecheck still reports only the six pre-existing migration-script errors. Visual review covered light/dark, the 1024 px sidebar, a 320 px drawer across five locale outputs, and the mobile Home, Journal, Universe and Agenda layouts without horizontal overflow. Ticket and FAQ keyboard focus, disclosure activation, drawer Escape/focus restoration and the 12 px text floor were checked. The local preview remains on port 8875.

## Quieter navigation and a 14 px minimum — October 2, 2026

This supersedes the earlier 12 px floor and homepage arrow treatments.

- Every interface text size is at least **14 CSS px**. `text-xs` and `text-sm` share a 14 px floor; labels, small/sub/sup, inline and block code, avatar initials, calendar captions and the 404 canvas follow it. Explicit 12/13 px declarations were raised in the shared shell, all five principal compositions and the hackathon archive. The building calendar header wraps instead of overflowing on a 320 px profile.
- Language and theme are two aligned rows. Language displays its native name. Both triggers use a small rotating disclosure chevron; the matching menus use restrained surfaces, generous item spacing and short open/close animations. Reduced-motion rules also cover the portaled menus.
- “More” is a single-column, grouped dropdown anchored below its trigger. It uses the same visual treatment as preferences, preserves all 14 secondary destinations, scrolls within available viewport space and retains Radix keyboard navigation, Escape and focus restoration. Opening it does not move the preferences or hack0 ticket.
- Homepage cards, event posters, portraits, Journal links, exploration links, FAQ actions and hero buttons no longer repeat arrow icons. The existing original artwork, people and content remain. Source and Universe introductions group their title and description; their action is a compact, softly filled button. Events and people keep primary and secondary actions together. The Journal action sits beside its heading.
- The ticket keeps its outlined transparent notches. Its action stub is slightly taller to accommodate the larger type.

Verification: production build passed (three workspace tasks, 303 static pages); all 95 tests passed (276 assertions). The separate web typecheck reports only the six known migration-script errors. Browser checks covered the main five pages in all five locales at 320 px with no text below 14 px or horizontal document overflow, plus docs, team/profile, timeline, OSS metrics, hackathon pages, brand, an article, contact and Ships. Light/dark desktop, 1024 px sidebar clearance, 390 px cards, dropdown keyboard navigation, nested Escape/focus return, mobile navigation through More and locale changes preserving the current route were checked. Reduced motion was verified in source. Local preview remains on port 8875.

## Illustrated Universe directory — October 2, 2026

The follow-up request brings Universe in line with the quieter homepage and gives all four areas equal visual weight.

- Removed the remaining repeated link and atlas arrows. No horizontal section rules or decorative card borders were introduced.
- Replaced tiny Research/Lab drawings, the isolated Games feature and the text-only Station list with four large original SVG scenes: research orbits and a notebook, layered code and a terminal, a game cube above an isometric plane, and community connections around the original Crafter symbol.
- The two-column directory uses shared subgrid rows to align illustrations, headings, descriptions, topics and primary actions, including when localized text wraps. Mobile uses a single natural reading column.
- Shortened descriptions in all five locales. Primary actions use each area's existing color; secondary actions stay nearby. Existing Research, Lab, Games, community, research notes, OSS, events, member and Ships destinations remain available.
- Added a localized closing section for learning (Journal), contributing (OSS) and sharing (Ships), without invented activity, projects or programs.
- Artwork stays static and decorative; no new client component, dependency, raster asset or animation loop. Both themes, the 14 px floor and reduced-motion hover behavior remain.

Verification: production build passed (3 tasks, 303 static pages), all 95 tests passed (276 assertions), and the web typecheck reports only the six existing migration-script errors. Browser review covered both themes on desktop and 320 px, all five locales at 320 px (four areas, four illustrations and three starting points; no horizontal overflow or text under 14 px), aligned actions and the 200 px content inset at 1024 px, atlas anchor navigation and keyboard focus. Reduced motion was reviewed in source. Changes remain local and uncommitted; preview remains on port 8875.

## Quieter Open Source composition — October 2, 2026

The user approved Universe and requested the same cleanup for the nearly finished OSS page. Its colors, illustrations, live metrics, catalog ranking and contribution content remain.

- Removed repeated CTA/card arrows and the redundant decorative catalog count. Functional filter chevrons, search/reset controls, stars and contribution icons remain.
- Moved the hero description/actions closer to the heading, grouped catalog copy, and kept activity, idea and community actions with their associated text.
- Each repository card is now a single accessible link, named with its localized action and full repository identifier. Keyboard focus outlines the whole card, inset for contrast on both the colored illustrations and neutral surfaces.
- Removed the unillustrated cards' decorative index/code row for a denser catalog. Preserved the four featured illustrations and the compact filtered view.
- Search, intersecting owner/language filters, live result count, empty state and reset are unchanged.

Verification: production build passed (3 tasks, 303 static pages), all 95 tests passed (276 assertions), and the web typecheck retains only the six pre-existing migration-script errors. Browser checks covered desktop and 320 px in both themes, all five locales at 320 px with no overflow or text below 14 px, the 200 px inset at 1024 px, combined search/owner/language filters, empty/reset behavior and whole-card keyboard focus. All 21 currently listed repositories retain one link each. Reduced-motion styles remain. Preview is running on port 8875; changes remain local and uncommitted.

## Quieter Agenda and Journal — October 2, 2026

The user approved OSS and requested the same final pass for Agenda and Journal.

- Agenda no longer repeats arrows on its hero, ticket, event cards, calendar links or invitation. The duplicate hero totals are removed; counts stay beside the upcoming/archive/all filters. Source attribution sits with the calendar.
- Hero and closing actions wrap together below their copy. Event cards retain dates, organizers, locations and their original destinations, with a whole-card keyboard outline and title underline. The pale ticket, perforation and barcode remain.
- Journal groups Markdown/agent links below its description and keeps a single RSS action in the masthead. On narrow phones the topline stacks naturally. The title remains on one line.
- Original article illustrations, chronology, authors and language notices remain. Repeated card/read arrows are removed; author and reading action wrap together. Topic/search/reset controls have clearer surfaces and generous hit areas.
- Article utility links and related stories use spacing and soft cards in place of the remaining horizontal dividers. The closing community invitation groups its actions with its copy. Pagination has quiet controls; functional previous/next arrows remain.
- Calendar feed/parsing, archive, time zones, unavailable states, subscription destinations, Journal content, locale fallbacks, RSS and Markdown generation are unchanged. No dependency or artwork was added. Reduced-motion styles cover both hover and keyboard artwork movement.

Verification: production build passed (3 tasks, 303 static pages); all 95 tests passed (276 assertions). The standalone web typecheck reports only the same six migration-script errors. Browser review covered both themes on desktop and 320 px, all five locales at 320 px with no document overflow or text below 14 px, the one-line Journal title, and the 200 px content inset at 1024 px. Agenda upcoming/archive/all, search/empty/reset, loading 12 more archived events, UTC/Lima time changes and card keyboard focus passed. Journal topic/search/empty/reset, article and related-card navigation/focus, and Japanese-to-English article fallback passed. RSS/Markdown destinations were reviewed; pagination beyond page one is not exercised by the current six-article dataset. Reduced motion was reviewed in source. No calendar subscription, RSVP, authenticated submission or deployment was performed. Preview remains on port 8875; changes remain local and uncommitted.

## Crafter Sans across the interface and corrected optical scale — October 2, 2026

The user requested Crafter Sans for every interface label, date, control and
article; monospace is reserved for code. The existing private editable font
package was recovered into `/Users/raillyhugo/Programming/crafter-station/font`.
No font generation service or credential was needed.

- The original Bucle Display Medium 0.200 is unchanged. Text Preview **0.301**
  adds real static Regular 400, Medium 500, SemiBold 600 and Bold 700 outlines,
  with reproducible OTF/TTF/WOFF2 and editable UFO/SVG sources.
- The user then identified an undersized appearance. Measurement of the first
  Text prototype showed a 514-unit `x` top and a 67-unit `n` upright, compared
  with 530 and 84 in the local Geist Regular reference (1000-unit em).
  Version 0.301 removes the Regular inset, scales drawings by 6%, and reduces
  added sidebearings. Regular now measures 551 and 85 respectively.
  Advances, kerning, mark anchors and vertical metrics follow the outline scale.
- The CSS hierarchy stays **18px** for principal descriptions, **16px** for
  body/buttons/menus/ordinary metadata, and **14px** for explicit compact
  uppercase or code/detail exceptions. The hero description is 18px on mobile
  too. Layouts wrap rather than shrinking text.
- `lib/fonts.ts` no longer loads Geist Sans or Geist Mono. `font-label`
  resolves to Crafter Text; `font-mono` is a system monospace for code.
  Noto SC/JP fallbacks remain. The visual guide and dynamic OG images use
  Crafter Text. Historical third-party font assets/licenses remain as provenance.
- Text is still a computationally derived development prototype, not a finished
  hinted or variable family. Cross-platform rendering and manual optical
  refinement remain. Font license/release status did not change.

Verification: the final 0.301 production build passed (3 tasks, 303 static
pages). The UI migration passed 95 tests / 276 assertions; the standalone web
typecheck retains the six existing migration-script errors, and lint remains
unconfigured. All 12 font binaries passed charset, shaping, NFC/NFD and
vertical-bound checks, plus 6,725 intersection pairs per weight. A second
build reproduced all binaries byte-for-byte; original Display is unchanged.
Dynamic OG returned a valid 1200×630 PNG with the new TTF files.

The scale correction was reviewed at 320px on five principal pages in all five
locales, plus team, contact, brand, timeline, OSS metrics, docs, Ships and an
article: no document overflow or Geist in site content. Journal's title
remains one line. Main copy has no unintended text below 16px; code retains
the explicit 14px monospace exception. The mobile More menu stays inside the
viewport at 16px, with nested Escape restoring focus. Desktop light/dark and
the editable four-weight specimen were reviewed in the same browser engine.
Framework development overlays are outside the site's font system.

Current font handoff: `font/TEXT-HANDOFF.md` in the local font workspace.
Specimen: `http://localhost:8874/text.html`; before/after/Geist-reference
comparison: `http://localhost:8874/scale.html`. The comparison loads Geist only
on that standalone reference page. No deployment or external publication.

## Crafter Sans specimen moves into the website — October 2, 2026

The user asked to preserve and remaster the October 1 showcase within
`crafter.run/font`, with latitude to take inspiration from Vercel's font page.
The canonical implementation is now `/[lang]/font`; the normal `/font` locale
redirect works. `docs/handoffs/crafter-font-page.md` records its source and sync.

This page uses the existing compact header and footer, with a broader
type-first composition: live wordmark, Display/Text switching, softly colored
weight samples, real-outline character inspector and grouped download rows.
It retains the original Station/Open Source/Code Brew compositions and the
historical Bucle comparison, while removing repetitive rules and arrows.
Copy covers all five locales. The 18/16/14px hierarchy, both themes and
reduced-motion behavior remain. No Vercel artwork or CSS was copied.

The tester supports all five cuts, text editing, actual size, tracking,
kerning, presets and reset. The 233-character inspector reads generated
outlines/metrics from the original OTFs. Fifteen OTF/TTF/WOFF2 downloads,
usage notes and hashes live in `public/font/`; sources remain in the font
workspace. The sync script updates both runtime and download binaries.

Verification: production build passed (3 tasks, 308 static pages); 95 tests
passed (276 assertions). Only the six baseline migration-script TypeScript
errors remain. Both themes, all five locales at 320px, and 1024px were
reviewed with no document overflow, unexpected small body text or Geist.
All five cuts, real 16px size, tracking, kerning, reset, character/space
selection, filled/outline switching, 233 grid buttons, the historical
comparison and format selector were exercised. All 15 HTTP downloads match
their source hashes. The standalone port-8874 specimen and historical
archives remain available; current site work is saved in the repository.

## Recalibrated website scale after Text 0.301 — October 2, 2026

The user found the interface oversized after correcting the font's optical
scale. This pass adjusts the website CSS, preserving the corrected Text
0.301 drawings and the original Display master.

- Shared page titles now use 40–72px and large section titles 28–44px,
  with viewport interpolation and page-specific mobile rules. At 1280px,
  OSS, Universe, Agenda and Journal mastheads are 64px, previously about
  79–82px. The homepage masthead is about 82px instead of 96px.
- Body, buttons, controls and secondary descriptions remain 16px. Main
  introductions retain 18px; compact uppercase labels retain 14px. Leading
  is generally 1.65 for copy and 1.6 for introductions; Journal articles
  use 16px/1.75. Compact homepage section headings retain their hierarchy.
- Large metrics, featured-card titles and the mobile drawer's navigation
  were reduced proportionally. Artwork, page colors and interaction targets
  remain. No zoom, font-size adjustment or transformed text was introduced.
- The Font wordmark is capped at 248px instead of 310px. Weight samples,
  section descriptions and download names use the quieter scale. The tester
  starts/resets at 64px instead of 88px, with its actual 14–144px range intact.
  Mobile facts use a three-column grid so labels get consistent space.

Verification: production build passed (3 tasks, 308 static pages), all 95
tests passed (276 assertions), and `git diff --check` passed. Web TypeScript
retains only the six existing migration-script errors; lint is unconfigured.
Browser checks covered all six main pages in all five locales at 320px:
no document overflow or unintended sub-16px body text, and Journal stays
on one line. Desktop light/dark and the 1024px font layout were reviewed.
The tester renders actual 16px after keyboard selection and resets to 64px.
This is a presentation adjustment; font binaries were not rebuilt. Preview
remains local on port 8875, with no commit, push or deployment.

The final alignment follow-up moves the desktop social rail 32px left using
`--station-social-offset`. Standard pages reserve the same extra 32px to keep
content clear of the links; the centered editorial frames retain their position.
Icon size, vertical spacing and the mobile drawer are unchanged. Reviewed on
OSS at 1280/1024px and Contact at 1024/320px, without document overflow; the
desktop rail remains hidden below 1024px.

## Identity pruning and participation — October 3, 2026

This is the current architecture, superseding the earlier descriptions of
Research/tool landings, the agency catalog and the Contact booking selector.
The user approved the meeting-based proposal, then explicitly deleted
`/opencode`, `/claude-code`, `/n8n` and `/research` without redirects or replacement
pages. The three corresponding generic workshop slugs also return 404.
Research remains in Universe; historical event and sponsor material remains.

Contact, Team, sponsors, Home and FAQs now lead to projects, contributions,
workshops and community collaboration. More is reduced to community,
collaboration and resources. Lab describes hardware in five locales and in
agent-facing descriptions. Makeables has a soft illustrated panel after the
four organizations on Home. The current event poster uses Hot Reload; its
Agenda callout says it is in preparation, while the complete hack0 feed remains.
No dates, registrations or calendar ownership changes were invented.

Work-with-us routes redirect to Contact, project ideas to OSS contributions,
the singular hackathon route to Agenda, and the old sponsors alias to the
current sponsors page. SEO, translated copy and internal links follow those
decisions. Databases, board records and APIs were not purged or migrated.

Final validation: build passed (3 tasks, 263 generated pages); 95 tests passed
with 276 assertions. All 72 route checks and 40 mobile route/locale layouts
passed. The reduced mobile menu and desktop compositions were reviewed,
including Contact/Universe in dark mode. Standalone TypeScript retains only
the six pre-existing migration-script errors. Details, limits and screenshots
are linked from `docs/handoffs/identity-pruning-2026-10-03.md`.

## Text 0.302 optical refinement — October 3, 2026

Acute/grave accents on i/I are redrawn to prevent the `íì` and `ÍÌ` collisions
found by the expanded repertoire audit. This changes four glyph outlines in
each Text weight, with all advances, other outlines, vertical metrics and the
0.301 visible scale preserved. Display 0.200 remains byte-identical.
No CSS size or layout compensation was introduced.

The canonical Font page, brand guide, downloads and outline inspector now use
0.302. Version labels are generated from font metadata during synchronization.
The font source workspace retains a local before/after diagnostic at
`http://localhost:8874/text-review.html`; the site specimen remains `/font`.

Validation covers 48,400 pairs per weight, reproducible binaries, NFC/NFD,
unchanged numeral widths and matching HTTP downloads. Font in five locales
and the Spanish homepage pass the 320px layout check. Build and all 95 tests
pass; the six pre-existing migration TypeScript errors remain. Platform review
on Windows/Android and further optical refinement are still pending.
See `docs/handoffs/crafter-sans-text-0302.md`.

## Text 0.303 interior joins — October 3, 2026

Interior curves in n/h/m/u and b/d/p/q open slightly to relieve concentrated
ink at their joins. Accented n/u variants inherit the same bodies. Eighteen
glyphs change per weight; exterior silhouettes, straight stems, bounds,
advances, vertical metrics, calibrated scale and Display 0.200 are preserved.
The canonical Font page, brand guide, downloads and inspector use 0.303.
The CSS hierarchy remains 18/16/14px.

The local comparison is `http://localhost:8874/joins-review.html`, with real
0.302/0.303 WOFF2 fonts. The earlier accent comparison is frozen to its two
reference versions. All 12 Text binaries rebuild identically; 48,400 pairs
per cut, shaping, connected contours and accented bases pass. Build and all
95 tests pass. The six pre-existing migration TypeScript errors remain.

The user explicitly deferred Windows/Android testing because no devices are
available. Continue local paragraph, punctuation and curve review; hinting
and interpolation-compatible masters remain future work.
See `docs/handoffs/crafter-sans-text-0303.md`.

## Text 0.304 reading pass — October 3, 2026

The punctuation, s/f-accent, paragraph and mixed-number review found a
vertical mismatch among mathematical operators. Minus, multiplication and
division now align with plus/equal. Only those three glyphs move vertically;
advances, horizontal metrics, shaping, line metrics, other drawings and
Display remain intact. The reviewed s/f and punctuation retain their drawings.

The canonical specimen, downloads and inspector use Text 0.304. The local
proof is `http://localhost:8874/reading-review.html`; earlier join/accent
comparisons are frozen to their respective versions. CSS stays 18/16/14px.
The expanded corpus, 193,600 pair checks and 12 reproducible binaries pass.
Build and 95 tests pass; the existing six migration TypeScript errors remain.
See `docs/handoffs/crafter-sans-text-0304.md`, including the development-only
recovery for the Noto Google-font loader. Noto configuration is unchanged.
