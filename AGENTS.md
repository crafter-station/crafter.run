# AGENTS.md

## Commands
- Use Bun for dependency/script commands; this is a Bun workspace with one root `bun.lock` and `packageManager` pinned in the root `package.json`.
- `bun run dev` starts `apps/web` on port 3000 and `apps/api` on port 3001 through Turbo; `bun run dev:web` and `bun run dev:api` run either app alone.
- `bun run build` is the production smoke test through Turbo. It typechecks and bundles `apps/api` and `packages/cli`, but Next does not typecheck `apps/web` because `apps/web/next.config.mjs` sets `typescript.ignoreBuildErrors: true`.
- `bun run db:generate` generates Drizzle migrations; `bun run db:migrate` applies them to `DATABASE_URL`.
- `bun run db:migrate:supabase` is the idempotent one-time board-data importer and requires `SUPABASE_MIGRATION_URL` plus `SUPABASE_MIGRATION_SERVICE_ROLE_KEY` outside app env validation.
- `bun run lint` currently fails: `apps/web/package.json` calls `eslint .`, but ESLint is not installed/configured.
- `bunx tsc -p apps/web/tsconfig.json --noEmit --incremental false` currently fails on pre-existing migration-script compiler/header typing.
- `bun test apps/web packages/cli packages/db apps/api` runs all current tests; pass a test file and `-t '<name>'` for one case, for example `bun test apps/api/test/api.test.ts -t 'reports health'`. Anything importing `apps/web/lib/source.ts` only resolves inside the bundler, so a test that reaches the docs corpus must stub that module with `mock.module`.

## App Shape
- This is a Turborepo. The Next 16 App Router site lives in `apps/web`; the Hono service API lives in `apps/api`; shared packages belong in `packages/` only when they have multiple consumers.
- Public pages live under `apps/web/app/[lang]`; `apps/web/proxy.ts` redirects non-localized paths to `/${defaultLocale}` and excludes API/static assets.
- Supported locales are `en`, `es`, `pt`, `zh`, and `ja`. Locale state is duplicated in `apps/web/lib/i18n.ts`, `apps/web/i18n/routing.ts`, `apps/web/messages/*.json`, and many page-level `generateStaticParams()` implementations.
- `next-intl` is wired through `apps/web/next.config.mjs` using `./i18n/request.ts`; page copy comes from `apps/web/messages/{locale}.json` unless it is static catalog/team data in `apps/web/lib/site.ts` or `apps/web/lib/team.ts`.
- SEO routes are centralized in `apps/web/lib/seo.ts`; update `indexablePaths` when adding/removing public pages so metadata, sitemap, and alternates stay aligned.
- Blog posts are MDX files in `apps/web/content/blog/<slug>.<locale>.mdx`, loaded by `apps/web/lib/blog.ts` (frontmatter is validated with Zod; `authors` are `username`s from `lib/team.ts`). `date` is day-granularity, so posts sharing a day sort by the optional `order` field, highest first, before falling back to slug; keep `date` and `order` identical across a slug's locales or the languages order differently. A post only needs the locales it is written in: the index in every locale lists it and links to the best available language, the post page and the `.md` twin exist only where a file does, and hreflang and the sitemap narrow to match. `/[lang]/blog/rss.xml` and `/[lang]/blog/sitemap.md` are generated; UI copy lives in `apps/web/components/blog/copy.ts`, hero copy in `pages.blog` in the message catalogs.
- schema.org output is centralized in `apps/web/lib/structured-data.ts`; every page composes from the one `Organization` node in `apps/web/app/[lang]/layout.tsx` rather than restating it, `documentedPackages` maps a docs slug to the npm package that page documents, and `sourceVideos` maps a blog slug to the recording a post was written from, which emits the `VideoObject` and its chapter `Clip`s.
- The agent-facing surface is unlocalized and must stay out of `/[lang]`: `/mcp` (read-only MCP server, tools in `apps/web/lib/mcp.ts`), `/agents.md`, `/openapi.json`, and `/.well-known/{mcp,ai-plugin}.json`. The App Router will not route a dot directory, so the well-known documents live under `apps/web/app/well-known/` and are rewritten in `next.config.mjs`. `/mcp` is the only dotless one, so it is named in the `apps/web/proxy.ts` matcher exclusion; adding another dotless agent route means adding it there too.
- Adding an MCP tool means adding it to the `tools` array in `apps/web/lib/mcp.ts`; `/agents.md`, `/openapi.json`, and `/.well-known/mcp.json` all read from `describeTools()` and update themselves.
- Shared layout primitives and site components live in `apps/web/components/`; shadcn/Radix components live in `apps/web/components/ui` with aliases from `apps/web/components.json` (`@/components`, `@/lib`, `@/hooks`).
- There are two 404s and they are not interchangeable. `app/[lang]/not-found.tsx` answers a `notFound()` thrown inside a localized route and keeps the header and footer. A URL matching no route never reaches a layout, so it is served by `app/global-not-found.tsx`, which owns its own document and therefore re-imports `globals.css` and the fonts, runs without a Clerk provider, and needs `experimental.globalNotFound` in `next.config.mjs`. Both render `components/not-found-view.tsx`.
- `global-not-found.tsx` has no params, so `proxy.ts` stamps the request's locale on the `LOCALE_HEADER` from `apps/web/lib/i18n.ts` and the page reads it back, falling through to `Accept-Language` then the default. Anything else that has to render outside `[lang]` should recover its locale the same way.
- `components/liquid-surface.tsx` owns the water simulation; callers supply a painter and get refraction for free (`liquid-hero.tsx` paints the brand mark, `not-found-surface.tsx` paints the figure). A painter draws only its subject, gets device pixels, and must read fonts and colours off the live document because next/font family names and theme tokens are resolved at runtime. It runs one step per 1/60s regardless of display refresh, pauses through an `IntersectionObserver` and `visibilitychange`, and rebuilds itself on `webglcontextlost`.
- The surface keeps three rasters at different sizes: the canvas is the CSS box, the painted texture is that box in device pixels, and the wave field is device independent and capped, so the water looks identical on every display. Anything that changes the field's size must also update `gradientScale`, which is what keeps refraction the same strength at any resolution.
- A painter that picks a layout must branch on `viewportWidth` from its paint context, never on its own `width / dpr`: the surfaces sit inside a bordered container and cross a breakpoint a couple of pixels after the matching Tailwind rule does. A painter may return a `LiquidFocus` to say where its subject landed, and idle drops will rain there.
- The 404's backdrop is chosen at runtime by `components/not-found-backdrop.tsx`: the black hole on WebGPU, the hero's water on WebGL, and neither under reduced motion, which leaves the DOM figure the page renders regardless. Both backdrops are `next/dynamic` on purpose. Next ships the `not-found` boundary with every route's client bundle, so a static import there puts three.js and nine compiled shaders on the blog and the docs.
- `components/black-hole/` is vendored from `vercel-labs/vgpu` under the MIT license kept beside it; its README says what was taken and how to mark local edits. Its `.wgsl` files are a module graph resolved at build time by the `turbopack.rules` entry in `next.config.mjs`, so adding a shader there means importing it, not inlining a string.
- `.theme-scope` in `app/globals.css` is what lets a subtree flip palette on its own. Tailwind substitutes the `@theme` aliases at computed-value time on `:root`, so a nested `.dark` changes the raw tokens and nothing reads them again; pair the two classes or the swap silently does nothing.
- The homepage uses `components/hero.tsx`, Crafter Sans Bucle and the original flat symbol; dimensional assembly artwork remains under `public/station` as an exploration. `liquid-hero.tsx` remains available as a 404 fallback; keep its painter and viewport calculations together when editing that legacy surface.

## Integrations
- Web env validation is in `apps/web/env.ts`; all listed env vars are optional. `API_URL` defaults to `http://localhost:3001`.
- `apps/api/src/dev.ts` loads `apps/api/.env*`, then fills a missing `DATABASE_URL` from `apps/web/.env*`; Drizzle commands also load env from `apps/web` via `packages/db/drizzle.config.ts`.
- `apps/api` exposes `/health`, `/openapi.json`, `/.well-known/oauth-protected-resource`, and versioned routes under `/v1`; it requires `DATABASE_URL` for data routes and accepts comma-separated browser origins through `WEB_ORIGINS`.
- Every 401 from `apps/api` carries a `WWW-Authenticate` header pointing at its RFC 9728 metadata, which names Clerk as the authorization server. `CLERK_OAUTH_ISSUER` overrides that issuer outside production.
- `packages/cli` provides the `crafter` executable; run it locally with `bun run cli -- <command>`. Its OAuth credentials are stored in the operating-system credential store, never project files.
- The public CLI's OAuth issuer and client are fixed production values. It must ignore all OAuth environment variables so updating the CLI repairs stale or conflicting local configuration automatically.
- CLI changes must include a Changesets file. Follow `docs/cli-releases.md` for versioning, the generated release PR, npm publishing, verification, and recovery; do not manually bump or publish normal releases.
- `packages/contracts` owns shared Zod API schemas. `packages/db` owns the Drizzle schema and the single migration history; do not create app-local migration folders.
- `skills/crafter-ship/SKILL.md` is the portable agent workflow. It delegates all auth and API behavior to `packages/cli` and must preserve draft-first publishing.
- `skills/video-to-blog/SKILL.md` turns a recorded talk into a series of blog posts. Invoke it for any "write posts from this video" request rather than transcribing by hand: it owns the caption pipeline, the entity-repair step that auto-captions make mandatory, and the `sourceVideos` registration that gives a post its `VideoObject`. Its `scripts/prepublish.py` is the fastest check that new posts match house style and that the `date`/`order` pair has not drifted across locales.
- `/events` and the sidebar teaser use the public hack0 iCal feed through `lib/hack0-calendar.ts`, cached for 30 minutes, with no API key. It includes every published calendar event and organizer, not only the Crafter Station tag. The parser, date handling and source URLs live in `lib/hack0-calendar-data.ts`; interface copy is in `lib/agenda-copy.ts`. Preserve cancellation/deduplication, UTC vs all-day semantics, the complete searchable archive, explicit display time zone and honest unavailable state. `lib/luma.ts` remains a separate legacy tagged API integration; `/hackathon` now redirects to Agenda. Without `LUMA_API_KEY`, that legacy source returns empty lists.
- Project and workshop boards remain in Next route handlers and use `packages/db` over Neon HTTP; new Ships APIs live in Hono. Browser realtime uses `NEXT_PUBLIC_PORTAL_KEY`, and route handlers publish invalidations with `PORTAL_SECRET`.
- Missing `OPENAI_API_KEY` skips AI spam moderation for next-project and Ship submissions; deterministic validation still runs.
- `RESEND_API_KEY` is validated but not currently used; `/api/contact` only validates email and returns `204`.

## Assets And Config Gotchas
- `apps/web/scripts/generate-assets.ts` regenerates icons and calls the shared social fallback generator. For OG work alone, use `bun run --cwd apps/web generate:social-art` and `generate:social-fallbacks`; the latter needs the app on localhost:8875 or `OG_ORIGIN`. Never restore the retired photo-background OG composition.
- `apps/web/next.config.mjs` sets `images.unoptimized: true`, allows dev origin `dev.cueva.io`, and permanently redirects `/vibe` to Luma.
- Configure separate Vercel projects with Root Directories `apps/web` and `apps/api`. Point `api.crafter.run` at the API project, set the web project's `API_URL` and `NEXT_PUBLIC_API_URL` to that origin, and keep app-specific cron configuration in `apps/web/vercel.json`.
- `opencode.jsonc` defines `../crafter.com` as the legacy Crafter Station site reference; use it only when current copy/design intent is not clear from this repo.

## Station Visual System
- **Hot Reload lifecycle, October 6, 2026:** read
  `docs/handoffs/hot-reload-lifecycle-2026-10-06.md`. Absolute dates and the
  venue time zone drive status and order cutoff; #1 closes October 17 at
  10:00 Lima. Menus, budgets, approvals, orders and admin/export resolve
  per edition. Keep `hot-reload-1` and historical menu catalogs stable;
  use new menu keys for future price/item changes. All five languages
  cover the complete flow, including account access. No database migration.
- **Hot Reload social previews, October 6, 2026:** read
  `docs/handoffs/hot-reload-social-2026-10-06.md`. Index, dynamic editions
  and menus use the shared OG system with their own metadata in five
  locales. Adding `hotReloadEditions` entries automatically supplies
  edition metadata, OG data and sitemap entries; menus stay `noindex`.
  Use public catalog fields only, never guest/order data in previews.
  The original AVIF remains intact; its compatible `socialPoster` PNG
  avoids unsupported codecs. Keep `public/events` in `/og` tracing.
- **Social previews, October 6, 2026:** read
  `docs/handoffs/social-previews-2026-10-06.md`. `/og` renders the editorial
  paper/pastel family with Crafter Display/Text, section artwork and canonical
  content for articles, team, bounties, public profiles and Ships. OG/Twitter
  share versioned 1200×630 URLs; Ships now have their own metadata.
  Preserve approved portraits and the original bounty poster. Local Noto
  SC/JP WOFFs remove request-time font downloads; keep their OFL licenses
  and the `/og` file-tracing declarations. Makeables remains hidden.
- **Makeables temporarily hidden, October 6, 2026:** user asked to hide it
  for now. Do not render `StationMakeables` on the homepage or expose the
  Makeables participation card on Contact. The component, artwork, styles
  and all five translations are preserved for later restoration. This
  supersedes the Makeables visibility in the previous handoff; Bounties
  and its real speaker photos remain published.
- **Makeables / Bounties breathing room, October 6, 2026:** read
  `docs/handoffs/bounties-breathing-2026-10-06.md`. Keep the open Makeables
  composition and its custom pass/card/sticker art. Bounties uses unboxed
  sections and vertical steps; the detail has no sticky reward sidebar.
  Five real speaker portraits from the official UTEC event page live in
  `public/bounties/speakers` with source/hash provenance in `docs/bounties`.
  Their muted treatment is CSS-only. Preserve bounty rules, the closed
  deadline, original poster, approved team portraits and runtime fonts.
- **Bounties editorial, October 6, 2026:** read
  `docs/handoffs/bounties-editorial-2026-10-06.md`. `/[lang]/bounties` is the
  localized challenge board; details share its paper, honey and terracotta
  visual system in `station-bounties.css`. Keep the original campaign image;
  its subdued ink treatment is CSS-only. Preserve actual deadline status,
  auth/submission behavior and reward rules. The first bounty is closed.
  No fabricated winners or open challenges. The root is in More and sitemap.
- **Release authorized, October 5, 2026:** hide the contact email form for
  this launch; keep the community/collaboration links. Crafter Sans is used
  only as site typography, not launched as a font product: `/font` is not a
  public route or navigation/sitemap entry. Its page is preserved in the
  private `_font-preview` folder; distribution files and outline exports
  live in ignored `apps/web/.work/font-preview/assets`. The sync script
  updates runtime fonts and this private destination. User authorized
  PR + merge into the existing `crafter-run` Vercel project for `crafter.run`.
  Preserve current main's bounty features and verify the resulting deployment.
- **Team portraits, October 5, 2026:** read
  `docs/handoffs/team-portraits-2026-10-05.md`. All nine active members now
  use the editorial ink series. Six new portraits generated and integrated:
  liz, cris, nicolas, nacho, tarmeno, henryjing. Homepage order is Railly →
  Ignacio/Jibaru → Liz → Edward. Shiara is Alumni; Gabriel Antunes is hidden
  from both rosters while historical bylines remain intact. 95 tests and
  build pass (258 pages). No deploy; preserve all previous uncommitted work.
  Latest correction: Cris uses `cris-cutout-v5.webp`, derived from v8.
  The user rejected v7/v4's oversized head, vector-like drawing, hoodie
  and chest C. Keep the homogeneous series: plain black crew-neck T-shirt,
  restrained ink/pencil lines and comparable head framing. The original
  cartoon supplies identity cues only, not clothing or drawing style.
  Liz uses `liz-cutout-v3.webp`: the user approved this 23.5% closer crop
  of v2; preserve her drawing unchanged. Keep the simplified cartoon style
  and upright viewer-facing gaze. See the handoff and
  `docs/team-portraits/cris-series-match-2026-10-05.json`.
- **Launch focus, October 5, 2026:** the user asked for the 20/80 path to ship
  the redesign. Read `docs/handoffs/redesign-ship-focus-2026-10-05.md`.
  Freeze Text 0.309 (400/500/600/700) and Display 0.200 for this candidate.
  Fix only reproduced defects affecting actual site use. Full i/j/l mark
  coverage, remaining compatible masters, variable, italics and family
  publication are deferred; they are not prerequisites for the redesign.
  Build/95 tests and the 40-route Latin corpus pass. Local production HTTP
  needs the authentication publishable key; verify destination configuration
  before deployment. Previous source work and binaries remain preserved.
- General handoff, October 4, 2026: read
  /Users/raillyhugo/Documents/Codex/2026-10-02/listo-enlazado-desde-agents-md-handoff-3/outputs/crafter-final-handoff/HANDOFF.md.
  START-HERE.txt and the verified recovery ZIP are beside it. Includes the full
  current source snapshot, explicit deleted paths, fonts and evidence. Latest
  font remains Text 0.309; next work starts with i/j/l accent composition.
- **Current local font: Text 0.309 / XYZ Masters 0.010.** 26/26 lowercase
  masters complete. Read docs/handoffs/crafter-sans-xyz-2026-10-04.md and
  font workspace web-preview/0.309/README.md. 28 bases, ten n/u accents,
  two UFOs, seven cuts, 31 positions. Regular x/y/z exact in cubics; x/y also
  exact in Bold; six z corners 95→41 points, bound 0.377432. 52 inherited pilot
  glyphs preserved. Complete preview: 233 mappings /242 glyphs, 239 other forms
  intact. Medium x/y/z advances +1; SemiBold y +1. GPOS/GSUB/GDEF/OS2 unchanged,
  including corrected f/t/k anchors. i/j/l mark limits remain; no new collisions.
  193,600 full pairs and 10,108 pilot pairs pass. Two builds and independent
  recovery reproduce 419 files; 6,542 previous files intact. Chromium/Safari
  and 320px reviewed. /es and /es/font synchronized; 20 fonts and five outline
  JSONs hash-verified. Continue accent composition, uppercase/rest, family review.
  Each validated iteration must update http://localhost:8875/es, full runtime,
  specimen versions/outlines/downloads, then reload and verify the homepage.
  This local flow is authorized, superseding older integration prohibitions.
  Preserve canonical Text 0.304, Display 0.200, all historical experiments,
  manual UFO edits and previous uncommitted work. No deploy. Windows/Android
  deferred. Completing lowercase masters does not complete the whole family.
- **Previous local font: Text 0.308 / KVW Masters 0.009.** k/v/w integrated;
  read docs/handoffs/crafter-sans-kvw-2026-10-03.md. 25 compatible bases,
  including 23 of 26 lowercase masters; x/y/z completed above. Regular cubic geometry
  exact; v/w also exact in Bold; four k corners within 0.352473 units.
  k top Y=847→875 resolves 23 inherited full-font collisions. f/t fixes,
  public marks, precomposed accents and 239 other outlines remain. i/j/l
  upper-mark composition still has inherited collision limits. Full preview:
  233 mappings /242 glyphs; Medium k LSB +1 and SemiBold v/w advances +1.
  The user requested updating http://localhost:8875/es with every validated
  iteration. Sync the complete preview, runtime, specimen versions/outlines
  and downloads, reload /es and verify it without routine confirmation.
  This supersedes older prohibitions on local integration. Read the 0.308
  handoff for the sync command and dev recovery. Source: font workspace
  web-preview/0.308/. Canonical Text 0.304, Display 0.200 and historical
  experiments stay frozen. No deploy. Previous IJL details remain in
  docs/handoffs/crafter-sans-ijl-2026-10-03.md.
- Current font experiment, October 3: read docs/handoffs/crafter-sans-agft-2026-10-03.md and experiments/2026-10-03-master-agft/README.md in the font workspace. a/g y f/t completos en Crafter Sans AGFT Masters 0.006. Diecinueve bases, diez acentos n/u, ocho marcas y siete variantes. a/g cúbicas exactas; Regular f/t exacta, seis esquinas Bold por letra reducen f 138→84 y t 135→81 puntos, cotas 0,501706/0,393766 dentro de 0,51. 42 glifos compilados heredados y métricas intactos; veinte pares de kerning canónicos. Dos UFO, siete cortes, 31 posiciones, 5.887 parejas, 560 GPOS de posicionamiento y 70 ccmp. Límite conocido: 96 colisiones de marcas sobre f/t por anclas canónicas y=619; esas combinaciones no se aprueban ópticamente. Las 448 combinaciones sobre n/u/c/e/r/s/a/g pasan sin colisiones. Safari/Chromium 16/18px en ambos temas y marcos Chromium 320px revisados; diagnóstico anchor-limits.html. Dos builds reproducen 331 archivos; 4.149 previos y 603 referencias intactos. hmtx 400/700 exactos; algunos avances intermedios +1 frente a estáticos. Próximo bloque propuesto: corregir anclas f/t, luego i/j/l, aún sin implementar. Preservar ediciones manuales de UFO; los exports no se releen. Text 0.304 y Display 0.200 intactos, sin promoción ni hinting. Windows/Android aplazados. No alfabeto completo, familia variable ni acentos apilados. Proof: http://localhost:8874/experiments/2026-10-03-master-agft/index.html. Previous experiments and packages frozen.
- Current font continuation, October 3: read `docs/handoffs/crafter-sans-text-0304.md` and the font workspace's `TEXT-HANDOFF.md` / `TEXT-ROADMAP.md`. Text 0.304 aligns minus/multiply/divide after the local reading pass. All widths, other outlines, prior i/I/join corrections and Display 0.200 remain. Version labels come from binaries. Windows/Android are deferred until devices are available. Current comparison: `http://localhost:8874/reading-review.html`. See the handoff for the local Noto dev-loader recovery command.
- Identity continuity, October 3: read `docs/handoffs/identity-pruning-2026-10-03.md` for route decisions. The user explicitly deleted `/opencode`, `/claude-code`, `/n8n` and `/research` with no redirect or replacement; the three retired board slugs also return 404 under the generic workshop path. Research remains inside Universe. Contact and Team prioritize contributions/workshops, Lab means hardware, Makeables is featured on Home and Hot Reload is in preparation. The other approved consolidations use permanent redirects. Preserve historical content and stored board data.
- Secondary pages continuation, October 2: the user resumed after the final handoff and explicitly requested the remaining page redesign. Read `docs/handoffs/secondary-pages-2026-10-02.md` for the implemented scope and validation. Secondary routes use `station-pages.css`, `StationPageHero`, topic artwork and soft cards; docs retain their compact navigation. Preserve earlier uncommitted work and the approved main-page compositions.
- Final October 2 handoff: `/Users/raillyhugo/Documents/Codex/2026-10-02/listo-enlazado-desde-agents-md-handoff-2/outputs/crafter-final-handoff/HANDOFF.md`; resume prompt and verified recovery package are beside it. It includes the final CSS scale and 32px inward social rail. The requested iteration is complete; continue from the next user request. The user's latest operational preference is not to use the web search tool.
- Previous website continuity: `docs/handoffs/website-iteration-2026-10-02.md` links the complete October 2 handoff, resume prompt and recovery package; the current 18/16/14 px hierarchy, one-line Journal title, Universe scope and stacked preference menus supersede older visual iterations.
- Crafter Sans now has a canonical specimen at `/[lang]/font`, with `/font` using the normal locale redirect. Read `docs/handoffs/crafter-font-page.md` for the migrated showcase, all five cuts, real-outline inspector and asset sync. It uses the shared compact header; keep its five locales and 18/16/14px UI scale. The old port-8874 showcase remains a recovery/reference copy, not the website source of truth.
- For session continuity, read `docs/handoffs/crafter-identity-and-sans.md`; it links the complete local handoff and the private Crafter Sans import package.
- Read `docs/station-design-system.md` before changing shared presentation.
- The locale root owns `SiteShell`, navigation and footer; do not add per-page copies. Docs uses the compact shell.
- The homepage uses the original flat symbol and Bucle composition. Legacy liquid surfaces remain for 404 fallbacks.
- Light/dark tokens live in `app/globals.css`; shared layouts live in `app/station.css`, homepage compositions in `app/station-home.css`, the Open Source workbench in `app/station-oss.css`, the homepage area cards in `app/station-network.css`, the Journal in `app/station-journal.css`, the Crafter Universe atlas in `app/station-universe.css`, and the hack0 calendar in `app/station-agenda.css`. Keep both palettes, reduced motion, five locales, and `.theme-scope` working.
- `/universe` is Crafter Universe (Universo Crafter): the renamed and expanded Network page about Research, Lab, Games and Station. Its atlas, area descriptions and actual exploration links use `lib/universe-copy.ts`; the shared directory remains `lib/network.ts`. `/network` and `/products` permanently redirect to `/universe`. Crafter Hub is deferred future work: do not add a Hub page, physical venue, café, coworking, studio or proposed programs to the current site. This user correction supersedes the earlier Hub iteration in `docs/handoffs/journal-and-hub.md`. The homepage retains its four compact area cards, and `list_network` describes those areas. Do not reintroduce the retired product catalog, Visagente promotion or withdrawn Normal repositories. Public links retain an empty legacy `products` array.
- `/blog` is Crafter Journal: an illustrated editorial index, with compact filters and search, and a quieter article layout. Original SVG cover art is in `components/blog/artwork.tsx`. Keep posts in canonical chronological order, authorship, five-locale fallbacks, pagination, RSS, Markdown twins, MDX and code rendering intact.
- Current Journal/Universe scope is recorded in `docs/handoffs/journal-and-universe.md`; the subsequent OSS metrics, hack0 calendar and Journal masthead iteration is in `docs/handoffs/hack0-agenda-and-metrics.md`.
- Fonts are self-hosted through `lib/fonts.ts`. Crafter Sans Text Preview 0.309 supplies real 400/500/600/700 outlines for all body/interface/metadata text; the unchanged Bucle Display 0.200 uses Medium 500. Geist is no longer loaded. Use system monospace only for code and retain Noto CJK fallbacks. Current font source/handoff: `/Users/raillyhugo/Programming/crafter-station/font/TEXT-HANDOFF.md`. Text weights are development prototypes, not a finished hinted/variable family.
- Default website body, buttons, menus, forms and ordinary metadata to **16px**. Main descriptions use **18px**, including the homepage hero on mobile. **14px** is an explicit exception for compact uppercase labels and small code/details. `text-xs`/`text-sm` default to 16px; their uppercase variants may use 14px. Reflow instead of shrinking to fit.
- After Text 0.301's optical correction, use the recalibrated CSS hierarchy: shared page titles `clamp(40px, 5vw, 72px)`, large section titles `clamp(28px, 3.2vw, 44px)`, ordinary/secondary descriptions 16px with 1.65 leading, and main introductions 18px with 1.6 leading. Compact home headings keep their own smaller scale. The Font specimen starts/resets at a true 64px; its slider stays 14–144px. Keep the corrected font binaries; do not compensate with zoom or transforms. See the latest scale entry in the design system.
- Keep marketing copy free of cache/fallback/API implementation notes. The homepage closes with ten localized FAQs, then community/collaboration contact links, then the compact footer. The email form is hidden for launch. FAQ copy and destinations live in `lib/faq-copy.ts`; preserve the native keyboard-operable accordion. Journal keeps “Crafter Journal” on one line, including mobile; OSS uses the shared display scale while its numeric metrics remain prominent. See `docs/handoffs/readable-type-and-faq.md`.
- Separate marketing compositions with spacing, typography and soft surfaces; do not reintroduce repetitive horizontal rules or the removed “Gente curiosa. Cosas por hacer.” strip. The sidebar hack0 invitation is a compact ticket with a prominent day/month and outlined transparent notches. Keep its 14 px minimum type, accessible full date/title and keyboard focus.
- Sidebar preferences are stacked, with full native language names and matching animated menus. “More” opens a single-column dropdown below its trigger, retaining grouped destinations and keyboard navigation. Keep homepage actions near their title/copy, with a clear primary action and quieter secondary links; avoid repeated arrow decorations on links and cards.
