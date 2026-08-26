# AGENTS.md

## Commands
- Use Bun for dependency/script commands; this is a Bun workspace with one root `bun.lock` and `packageManager` pinned in the root `package.json`.
- `bun run dev` starts `apps/web` on port 3000 and `apps/api` on port 3001 through Turbo; `bun run dev:web` and `bun run dev:api` run either app alone.
- `bun run build` is the production smoke test through Turbo. It typechecks and bundles `apps/api` and `packages/cli`, but Next does not typecheck `apps/web` because `apps/web/next.config.mjs` sets `typescript.ignoreBuildErrors: true`.
- `bun run db:generate` generates Drizzle migrations; `bun run db:migrate` applies them to `DATABASE_URL`.
- `bun run db:migrate:supabase` is the idempotent one-time board-data importer and requires `SUPABASE_MIGRATION_URL` plus `SUPABASE_MIGRATION_SERVICE_ROLE_KEY` outside app env validation.
- `bun run lint` currently fails: `apps/web/package.json` calls `eslint .`, but ESLint is not installed/configured.
- `bunx tsc -p apps/web/tsconfig.json --noEmit --incremental false` currently fails on a pre-existing pagination variant mismatch and migration-script compiler/header typing.
- `bun test apps/web packages/cli packages/db apps/api` runs all current tests; pass a test file and `-t '<name>'` for one case, for example `bun test apps/api/test/api.test.ts -t 'reports health'`. Anything importing `apps/web/lib/source.ts` only resolves inside the bundler, so a test that reaches the docs corpus must stub that module with `mock.module`.

## App Shape
- This is a Turborepo. The Next 16 App Router site lives in `apps/web`; the Hono service API lives in `apps/api`; shared packages belong in `packages/` only when they have multiple consumers.
- Public pages live under `apps/web/app/[lang]`; `apps/web/proxy.ts` redirects non-localized paths to `/${defaultLocale}` and excludes API/static assets.
- Supported locales are `en`, `es`, `pt`, `zh`, and `ja`. Locale state is duplicated in `apps/web/lib/i18n.ts`, `apps/web/i18n/routing.ts`, `apps/web/messages/*.json`, and many page-level `generateStaticParams()` implementations.
- `next-intl` is wired through `apps/web/next.config.mjs` using `./i18n/request.ts`; page copy comes from `apps/web/messages/{locale}.json` unless it is static catalog/team data in `apps/web/lib/site.ts` or `apps/web/lib/team.ts`.
- SEO routes are centralized in `apps/web/lib/seo.ts`; update `indexablePaths` when adding/removing public pages so metadata, sitemap, and alternates stay aligned.
- Blog posts are MDX files in `apps/web/content/blog/<slug>.<locale>.mdx`, loaded by `apps/web/lib/blog.ts` (frontmatter is validated with Zod; `authors` are `username`s from `lib/team.ts`). A post only needs the locales it is written in: the index in every locale lists it and links to the best available language, the post page and the `.md` twin exist only where a file does, and hreflang and the sitemap narrow to match. `/[lang]/blog/rss.xml` and `/[lang]/blog/sitemap.md` are generated; UI copy lives in `apps/web/components/blog/copy.ts`, hero copy in `pages.blog` in the message catalogs.
- schema.org output is centralized in `apps/web/lib/structured-data.ts`; every page composes from the one `Organization` node in `apps/web/app/[lang]/layout.tsx` rather than restating it, and `documentedPackages` maps a docs slug to the npm package that page documents.
- The agent-facing surface is unlocalized and must stay out of `/[lang]`: `/mcp` (read-only MCP server, tools in `apps/web/lib/mcp.ts`), `/agents.md`, `/openapi.json`, and `/.well-known/{mcp,ai-plugin}.json`. The App Router will not route a dot directory, so the well-known documents live under `apps/web/app/well-known/` and are rewritten in `next.config.mjs`. `/mcp` is the only dotless one, so it is named in the `apps/web/proxy.ts` matcher exclusion; adding another dotless agent route means adding it there too.
- Adding an MCP tool means adding it to the `tools` array in `apps/web/lib/mcp.ts`; `/agents.md`, `/openapi.json`, and `/.well-known/mcp.json` all read from `describeTools()` and update themselves.
- Shared layout primitives and site components live in `apps/web/components/`; shadcn/Radix components live in `apps/web/components/ui` with aliases from `apps/web/components.json` (`@/components`, `@/lib`, `@/hooks`).
- There are two 404s and they are not interchangeable. `app/[lang]/not-found.tsx` answers a `notFound()` thrown inside a localized route and keeps the header and footer. A URL matching no route never reaches a layout, so it is served by `app/global-not-found.tsx`, which owns its own document and therefore re-imports `globals.css` and the fonts, runs without a Clerk provider, and needs `experimental.globalNotFound` in `next.config.mjs`. Both render `components/not-found-view.tsx`.
- `global-not-found.tsx` has no params, so `proxy.ts` stamps the request's locale on the `LOCALE_HEADER` from `apps/web/lib/i18n.ts` and the page reads it back, falling through to `Accept-Language` then the default. Anything else that has to render outside `[lang]` should recover its locale the same way.
- `components/liquid-surface.tsx` owns the water simulation; callers supply a painter and get refraction for free (`liquid-hero.tsx` paints the brand mark, `not-found-surface.tsx` paints the figure). A painter draws only its subject, gets device pixels, and must read fonts and colours off the live document because next/font family names and theme tokens are resolved at runtime.

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
- Missing `LUMA_API_KEY` makes `apps/web/lib/luma.ts` return empty event lists and log a warning; event pages revalidate every 6 hours.
- Project and workshop boards remain in Next route handlers and use `packages/db` over Neon HTTP; new Ships APIs live in Hono. Browser realtime uses `NEXT_PUBLIC_PORTAL_KEY`, and route handlers publish invalidations with `PORTAL_SECRET`.
- Missing `OPENAI_API_KEY` skips AI spam moderation for next-project and Ship submissions; deterministic validation still runs.
- `RESEND_API_KEY` is validated but not currently used; `/api/contact` only validates email and returns `204`.

## Assets And Config Gotchas
- `apps/web/scripts/generate-assets.ts` is a Bun-only Sharp script with no package script; it regenerates OG images and icons from `apps/web/public/effecto-poster-original.jpg`, writing into `apps/web/public/` and `apps/web/app/`.
- `apps/web/next.config.mjs` sets `images.unoptimized: true`, allows dev origin `dev.cueva.io`, and permanently redirects `/vibe` to Luma.
- Configure separate Vercel projects with Root Directories `apps/web` and `apps/api`. Point `api.crafter.run` at the API project, set the web project's `API_URL` and `NEXT_PUBLIC_API_URL` to that origin, and keep app-specific cron configuration in `apps/web/vercel.json`.
- `opencode.jsonc` defines `../crafter.com` as the legacy Crafter Station site reference; use it only when current copy/design intent is not clear from this repo.
