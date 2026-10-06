![Crafter Station](https://crafter.run/og?v=station-20261006&lang=en&path=%2F&title=Craft.+Ship.+Repeat.&description=A+community+turning+curiosity+into+projects.)

# Crafter Station

Craft. Ship. Repeat. A community turning curiosity into projects.

Crafter is one spark with four directions:

- **[Research](https://crafter.ing)**: open questions about AI, agents, and engineering.
- **[Lab](https://github.com/crafter-lab)**: hardware, fabrication, and physical prototypes.
- **[Games](https://games.crafter.run)**: worlds we build and play.
- **[Station](https://crafter.run)**: the community, with Hot Reload meetups, Bounties, and Ships.

This repo is the Station: the website at [crafter.run](https://crafter.run), its API, and the [`@crafter/cli`](https://www.npmjs.com/package/@crafter/cli).

[Universe](https://crafter.run/en/universe) · [Open source](https://crafter.run/en/oss) · [Events](https://crafter.run/en/events) · [Discord](https://discord.gg/kgsjU4sD7)

## Run it

Requires [Bun](https://bun.sh). The site runs without credentials; database and auth pages need the variables in the `.env.example` files.

```bash
bun install
cp apps/web/.env.example apps/web/.env.local
cp apps/api/.env.example apps/api/.env
bun run dev
```

Web on [localhost:3000](http://localhost:3000), API on [localhost:3001](http://localhost:3001).

| Path | What |
| --- | --- |
| `apps/web` | Next.js site |
| `apps/api` | Hono API |
| `packages/db` | Drizzle schema and migrations |
| `packages/contracts` | Shared Zod schemas |
| `packages/cli` | `crafter` CLI |

## Contributing

Run `bun test apps/api`, `bun test packages/cli`, and `bun run build` before opening a PR. Found a bug? [Open an issue](https://github.com/crafter-station/crafter.run/issues).
