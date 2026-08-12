# AGENTS.md

## Commands
- Use Bun for dependency/script commands; this is a Bun workspace with one root `bun.lock` and `packageManager` pinned in the root `package.json`.
- `bun run dev` starts `apps/web` on port 3000 and `apps/api` on port 3001 through Turbo; `bun run dev:web` and `bun run dev:api` run either app alone.
- `bun run build` is the production smoke test through Turbo. It typechecks and bundles `apps/api` and `packages/cli`, but Next does not typecheck `apps/web` because `apps/web/next.config.mjs` sets `typescript.ignoreBuildErrors: true`.
- `bun run db:generate` generates Drizzle migrations; `bun run db:migrate` applies them to `DATABASE_URL`.
- `bun run db:migrate:supabase` is the idempotent one-time board-data importer and requires `SUPABASE_MIGRATION_URL` plus `SUPABASE_MIGRATION_SERVICE_ROLE_KEY` outside app env validation.
- `bun run lint` currently fails: `apps/web/package.json` calls `eslint .`, but ESLint is not installed/configured.
- `bunx tsc -p apps/web/tsconfig.json --noEmit --incremental false` currently fails on pre-existing docs locale narrowing, a pagination variant mismatch, AI moderation type depth, and migration-script compiler/header typing.
- `bun test packages/cli packages/db apps/api` runs all current tests; pass a test file and `-t '<name>'` for one case, for example `bun test apps/api/test/api.test.ts -t 'reports health'`.

## App Shape
- This is a Turborepo. The Next 16 App Router site lives in `apps/web`; the Hono service API lives in `apps/api`; shared packages belong in `packages/` only when they have multiple consumers.
- Public pages live under `apps/web/app/[lang]`; `apps/web/proxy.ts` redirects non-localized paths to `/${defaultLocale}` and excludes API/static assets.
- Supported locales are `en`, `es`, `pt`, `zh`, and `ja`. Locale state is duplicated in `apps/web/lib/i18n.ts`, `apps/web/i18n/routing.ts`, `apps/web/messages/*.json`, and many page-level `generateStaticParams()` implementations.
- `next-intl` is wired through `apps/web/next.config.mjs` using `./i18n/request.ts`; page copy comes from `apps/web/messages/{locale}.json` unless it is static catalog/team data in `apps/web/lib/site.ts` or `apps/web/lib/team.ts`.
- SEO routes are centralized in `apps/web/lib/seo.ts`; update `indexablePaths` when adding/removing public pages so metadata, sitemap, and alternates stay aligned.
- Shared layout primitives and site components live in `apps/web/components/`; shadcn/Radix components live in `apps/web/components/ui` with aliases from `apps/web/components.json` (`@/components`, `@/lib`, `@/hooks`).

## Integrations
- Web env validation is in `apps/web/env.ts`; all listed env vars are optional. `API_URL` defaults to `http://localhost:3001`.
- `apps/api/src/dev.ts` loads `apps/api/.env*`, then fills a missing `DATABASE_URL` from `apps/web/.env*`; Drizzle commands also load env from `apps/web` via `packages/db/drizzle.config.ts`.
- `apps/api` exposes `/health`, `/openapi.json`, and versioned routes under `/v1`; it requires `DATABASE_URL` for data routes and accepts comma-separated browser origins through `WEB_ORIGINS`.
- `packages/cli` provides the `crafter` executable; run it locally with `bun run cli -- <command>`. Its OAuth credentials are stored in the operating-system credential store, never project files.
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
