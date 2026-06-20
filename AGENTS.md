# AGENTS.md

## Commands
- Use Bun for dependency/script commands; this repo has `bun.lock` and no `packageManager` field.
- `bun run dev` starts the Next dev server.
- `bun run build` is the current production smoke test and succeeds, but it is not a typecheck because `next.config.mjs` sets `typescript.ignoreBuildErrors: true`.
- `bun run lint` currently fails: `package.json` calls `eslint .`, but ESLint is not installed/configured.
- `bun run tsc --noEmit` currently fails on `scripts/generate-assets.ts` because that script uses Bun-only `import.meta.dir`; it also updates the tracked `tsconfig.tsbuildinfo`.
- There are no test scripts or test files in the repo.

## App Shape
- This is a Next 16 App Router site. Public pages live under `app/[lang]`; `proxy.ts` redirects non-localized paths to `/${defaultLocale}` and excludes API/static assets.
- Supported locales are `en`, `es`, and `pt`. Locale state is duplicated in `lib/i18n.ts`, `i18n/routing.ts`, `messages/*.json`, and many page-level `generateStaticParams()` implementations.
- `next-intl` is wired through `next.config.mjs` using `./i18n/request.ts`; page copy comes from `messages/{locale}.json` unless it is static catalog/team data in `lib/site.ts` or `lib/team.ts`.
- SEO routes are centralized in `lib/seo.ts`; update `indexablePaths` when adding/removing public pages so metadata, sitemap, and alternates stay aligned.
- Shared layout primitives and site components live in `components/`; shadcn/Radix components live in `components/ui` with aliases from `components.json` (`@/components`, `@/lib`, `@/hooks`).

## Integrations
- Env validation is in `env.ts`; all listed env vars are optional.
- Missing `LUMA_API_KEY` makes `lib/luma.ts` return empty event lists and log a warning; event pages revalidate every 6 hours.
- `/api/next-projects` and `/api/next-projects/votes` require Supabase env to work server-side: `NEXT_PUBLIC_SUPABASE_URL` plus `SUPABASE_SERVICE_ROLE_KEY`; the client realtime board also needs `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
- Missing `OPENAI_API_KEY` skips AI spam moderation for next-project submissions.
- `RESEND_API_KEY` is validated but not currently used; `/api/contact` only validates email and returns `204`.

## Assets And Config Gotchas
- `scripts/generate-assets.ts` is a Bun-only Sharp script with no package script; it regenerates OG images and icons from `public/effecto-poster-original.jpg`, writing into `public/` and `app/`.
- `next.config.mjs` sets `images.unoptimized: true`, allows dev origin `dev.cueva.io`, and permanently redirects `/vibe` to Luma.
- `opencode.jsonc` defines `../crafter.com` as the legacy Crafter Station site reference; use it only when current copy/design intent is not clear from this repo.
