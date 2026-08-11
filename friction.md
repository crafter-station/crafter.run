# Build Friction

## Turborepo Conversion

- The CLI build workflow begins before the CLI exists because this milestone only establishes its future workspace. CLI-specific blocks, command contracts, trust levels, and distribution choices are deferred rather than guessed.
- `surface-recon` is unnecessary for this milestone because it does not integrate an external service. Repository path reconnaissance is the relevant substitute.
- The app's ignored `.env.local` does not participate in `git mv`; it must move explicitly or local Next and Drizzle behavior silently changes.
- Vercel cron configuration is app-owned, so it moved with `apps/web`; deployment must set the Vercel Root Directory to `apps/web` rather than adding root build indirection.
