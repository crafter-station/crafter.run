# Crafter Station

[Crafter Station](https://crafter.run) is the LatAm network of shippers: a community and open-source ecosystem for builders to meet, learn, and build in public.

This repository contains the public website, the Ships API and directory, shared data contracts, the database schema, and the [`@crafter/cli`](https://www.npmjs.com/package/@crafter/cli) package.

## Repository structure

| Path | Purpose |
| --- | --- |
| [`apps/web`](apps/web) | Next.js 16 website, localized in English, Spanish, Portuguese, Chinese, and Japanese |
| [`apps/api`](apps/api) | Hono API for members, Ships, votes, uploads, and OAuth-backed CLI access |
| [`packages/contracts`](packages/contracts) | Shared Zod request and response schemas |
| [`packages/db`](packages/db) | Drizzle schema and PostgreSQL migration history |
| [`packages/cli`](packages/cli) | Published `crafter` command-line client |
| [`skills/crafter-ship`](skills/crafter-ship) | Agent workflow for creating reviewable Ship drafts |

The workspace uses [Bun](https://bun.sh), [Turborepo](https://turborepo.com), TypeScript, React 19, Tailwind CSS 4, PostgreSQL, and Drizzle ORM.

## Getting started

### Prerequisites

- [Bun 1.3.14](https://bun.sh/docs/installation)
- A PostgreSQL database for data-backed features
- Clerk credentials for authentication flows

### Install and run

```bash
git clone https://github.com/crafter-station/crafter.run.git
cd crafter.run
bun install

cp apps/web/.env.example apps/web/.env.local
cp apps/api/.env.example apps/api/.env

bun run dev
```

The web app runs at [localhost:3000](http://localhost:3000) and the API at [localhost:3001](http://localhost:3001). You can also run them independently with `bun run dev:web` or `bun run dev:api`.

The marketing site works without third-party credentials. Database-backed pages and API routes require `DATABASE_URL`; authentication requires Clerk. Missing optional integrations degrade gracefully where possible.

## Environment

Start with the checked-in example files:

- [`apps/web/.env.example`](apps/web/.env.example)
- [`apps/api/.env.example`](apps/api/.env.example)

Common variables are:

| Variable | Used by | Purpose |
| --- | --- | --- |
| `DATABASE_URL` | Web, API, DB | PostgreSQL connection for boards, members, and Ships |
| `API_URL` | Web server | Server-side API origin; defaults to `http://localhost:3001` in development |
| `NEXT_PUBLIC_API_URL` | Web browser | Browser-facing API origin |
| `CLERK_SECRET_KEY` | Web, API | Clerk server authentication |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Web | Clerk browser authentication |
| `CLERK_PUBLISHABLE_KEY` | API | Clerk token verification |
| `WEB_ORIGINS` | API | Comma-separated browser origins allowed by CORS |
| `CRAFTER_OAUTH_CLIENT_ID` | API | OAuth client accepted by the Crafter CLI |
| `OPENAI_API_KEY` | Web, API | Optional AI spam moderation |
| `GITHUB_TOKEN` | Web | Optional higher-rate GitHub data fetching |
| `LUMA_API_KEY` | Web | Optional event data from Luma |
| `NEXT_PUBLIC_PORTAL_KEY` / `PORTAL_SECRET` | Web | Optional board realtime updates and invalidation |
| `CRON_SECRET` | Web | Protects cron and indexing routes |

Do not commit populated environment files or credentials.

## Database

The schema and the single migration history live in `packages/db`. After setting `DATABASE_URL`, apply existing migrations with:

```bash
bun run db:migrate
```

After changing [`packages/db/src/schema.ts`](packages/db/src/schema.ts), generate a migration with:

```bash
bun run db:generate
```

Review generated SQL before applying or committing it. `bun run db:migrate:supabase` is a one-time legacy board-data importer, not part of normal local setup.

## API

The API exposes:

- `GET /health` for process health
- `GET /openapi.json` for the OpenAPI document
- Versioned application routes under `/v1`

With the API running:

```bash
curl http://localhost:3001/health
curl http://localhost:3001/openapi.json
```

Shared API schemas belong in `packages/contracts`; database access and schema changes belong in `packages/db`.

## Useful commands

| Command | Description |
| --- | --- |
| `bun run dev` | Run the web and API development servers |
| `bun run dev:web` | Run only the web app |
| `bun run dev:api` | Run only the API |
| `bun run build` | Run the production build through Turbo |
| `bun test apps/api` | Run API tests |
| `bun test packages/cli` | Run CLI tests |
| `bun run cli -- <command>` | Run the CLI directly from source |
| `bun run db:generate` | Generate a Drizzle migration |
| `bun run db:migrate` | Apply pending database migrations |

## Crafter CLI

The CLI creates a reviewable draft before anything is published to the Ships directory.

```bash
npm install --global @crafter/cli

crafter login
crafter whoami
crafter ship
crafter publish <draft-id> --revision <updated-at> --confirm
```

See [`packages/cli/README.md`](packages/cli/README.md) for the complete CLI workflow.

## Contributing

Keep changes focused and place code at the narrowest appropriate layer:

- Public pages and components belong in `apps/web`.
- API behavior belongs in `apps/api`.
- Cross-app validation contracts belong in `packages/contracts`.
- Schema and migrations belong in `packages/db`.
- User-facing copy should stay aligned across the five locale files in `apps/web/messages`.

Before opening a pull request, run the relevant tests and the production smoke test:

```bash
bun test apps/api
bun test packages/cli
bun run build
```

Found a bug or have an idea? [Open an issue](https://github.com/crafter-station/crafter.run/issues).
