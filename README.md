![hero](https://crafter.run/og?title=Crafter%20Station&lang=en)

<p align="center">
	<h1 align="center"><b>Crafter Station</b></h1>
<p align="center">
    The LatAm network of shippers
    <br />
    <br />
    <a href="https://crafter.run">Website</a>
    ·
    <a href="https://crafter.run/en/crafters">Crafters</a>
    ·
    <a href="https://crafter.run/en/ships">Ships</a>
    ·
    <a href="https://crafter.run/en/docs">Docs</a>
    ·
    <a href="https://discord.gg/crafterstation">Discord</a>
    ·
    <a href="https://github.com/crafter-station/crafter.run/issues">Issues</a>
  </p>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@crafter/cli">
    <img src="https://img.shields.io/npm/v/%40crafter%2Fcli?style=for-the-badge&label=%40crafter%2Fcli&color=cb3837&logo=npm" alt="npm version" />
  </a>
</p>

## About Crafter Station

Crafter Station is a community and open-source ecosystem for builders in Latin America and beyond to meet, learn, and ship in public. This monorepo runs all of it: the website, the Ships API and directory, the published CLI, shared contracts, and the database schema.

## Features

**Crafters directory**: Public profiles for every registered member of the community, localized in five languages.<br/>
**Ships**: A build-in-public directory. Projects go through a reviewable draft before publishing, then collect votes and changelog-style updates.<br/>
**Agent-first onboarding**: Join by pasting one prompt into your AI coding agent. The agent installs the CLI, walks you through browser sign-in, drafts your profile from what it already knows about you, and submits only after you approve.<br/>
**Crafter CLI**: A deterministic command-line client for authentication, onboarding, and draft-first shipping, published as [`@crafter/cli`](https://www.npmjs.com/package/@crafter/cli).<br/>
**Agent skill**: The `crafter-ship` skill teaches coding agents to ship a project safely: draft first, explicit confirmation, honest provenance.<br/>
**Open API**: A versioned Hono API with an OpenAPI document at [`api.crafter.run/openapi.json`](https://api.crafter.run/openapi.json).<br/>

## Join with your agent

Paste this into Claude Code, Cursor, or any coding agent:

```text
Help me join the Crafter Station community. Run `curl -s https://crafter.run/join/agent.md`
and follow the instructions it returns. Prefill a profile draft from what you already know
about me, and confirm everything with me before submitting anything.
```

Ship a project from any repository:

```bash
npx skills add crafter-station/crafter.run --skill crafter-ship
```

## Get started

Requires [Bun 1.3.14](https://bun.sh/docs/installation). The marketing site runs without credentials; database-backed pages need `DATABASE_URL` and authentication needs Clerk keys.

```bash
git clone https://github.com/crafter-station/crafter.run.git
cd crafter.run
bun install

cp apps/web/.env.example apps/web/.env.local
cp apps/api/.env.example apps/api/.env

bun run dev
```

The web app runs at [localhost:3000](http://localhost:3000) and the API at [localhost:3001](http://localhost:3001). Run them independently with `bun run dev:web` or `bun run dev:api`.

## Architecture

- Monorepo
- Bun
- Turborepo
- TypeScript
- Next.js 16
- React 19
- Hono
- Tailwind CSS 4
- Drizzle ORM
- Zod
- next-intl

### Hosting

- Vercel (website, API, blob storage, cron)
- Neon (PostgreSQL)
- Clerk (authentication and CLI OAuth)

### Services

- OpenAI (content moderation)
- Luma (events)
- Portal (realtime boards)
- GitHub Actions + Changesets (CI and npm releases)
- thum.io (Ship screenshots)

## Repository structure

| Path | Purpose |
| --- | --- |
| [`apps/web`](apps/web) | Next.js website, localized in English, Spanish, Portuguese, Chinese, and Japanese |
| [`apps/api`](apps/api) | Hono API for members, Ships, votes, uploads, and OAuth-backed CLI access |
| [`packages/contracts`](packages/contracts) | Shared Zod request and response schemas |
| [`packages/db`](packages/db) | Drizzle schema and PostgreSQL migration history |
| [`packages/cli`](packages/cli) | Published `crafter` command-line client |
| [`skills/crafter-ship`](skills/crafter-ship) | Agent workflow for creating reviewable Ship drafts |

## Development

<details>
<summary><b>Environment variables</b></summary>

Start with the checked-in example files: [`apps/web/.env.example`](apps/web/.env.example) and [`apps/api/.env.example`](apps/api/.env.example).

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

</details>

<details>
<summary><b>Database</b></summary>

The schema and the single migration history live in `packages/db`. After setting `DATABASE_URL`, apply existing migrations with:

```bash
bun run db:migrate
```

After changing [`packages/db/src/schema.ts`](packages/db/src/schema.ts), generate a migration with:

```bash
bun run db:generate
```

Review generated SQL before applying or committing it.

</details>

<details>
<summary><b>Useful commands</b></summary>

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

</details>

## Crafter CLI

The CLI keeps humans in control: profiles and Ships are drafted, shown, and only submitted after explicit confirmation.

```bash
npm install --global @crafter/cli@latest

crafter login
crafter whoami
crafter handle <handle>
crafter onboard --file profile.json --confirm
crafter ship
crafter publish <draft-id> --revision <updated-at> --confirm
```

See [`packages/cli/README.md`](packages/cli/README.md) for the complete workflow.

## Contributing

Keep changes focused and place code at the narrowest appropriate layer:

- Public pages and components belong in `apps/web`.
- API behavior belongs in `apps/api`.
- Cross-app validation contracts belong in `packages/contracts`.
- Schema and migrations belong in `packages/db`.
- User-facing copy should stay aligned across the five locale files in `apps/web/messages`.

Before opening a pull request, run the relevant tests and the production build:

```bash
bun test apps/api
bun test packages/cli
bun run build
```

Pull requests are squash-merged. Found a bug or have an idea? [Open an issue](https://github.com/crafter-station/crafter.run/issues).
