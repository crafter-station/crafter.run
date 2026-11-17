---
name: ship
description: Create a reviewable Crafter Station Ship draft from the current project using the deterministic Crafter CLI. Use when the user says "ship this to Crafter", "publish this on Crafter", or wants to submit the current app, package, experiment, or repository to the Crafter community directory.
---

# Ship To Crafter

Use the `crafter` CLI for authentication, metadata validation, Ship submission, and publishing. Do not implement HTTP or token handling yourself.

## Check The CLI

1. Confirm `crafter` is available with `command -v crafter`. If it is missing, verify Node.js 18 or newer with `node --version`, then install it with `npm install --global @crafter/cli@latest`.
2. Verify with `crafter help`. This guide was served by the installed CLI, so it matches that version. To update, run `npm install --global @crafter/cli@latest`.

Do not clone the Crafter repository or invoke its internal source as a substitute for the published CLI.

## Safety Rules

- Draft first. Never publish in the same step as draft creation.
- You create and fill the draft. The human decides to publish: run `crafter publish ... --confirm` only after showing the exact draft and receiving an explicit yes.
- Inspect only `README.md`, `package.json`, `crafter.ship.json`, and `git remote.origin.url` by default.
- Never inspect `.env*`, credentials, home directories, git history, or arbitrary files.
- Tell the user which sources were used. The CLI includes them in `provenance`.
- Do not invent links or claims. Ask for missing required fields.

## Workflow

1. Check the CLI as described above.
2. Check authentication with `crafter whoami`. If login is needed, do not run `crafter login` through an agent command tool: ask the user to run it in their own local interactive terminal, keep it running through browser confirmation, and tell you when it prints `Logged in.` Then retry `crafter whoami`. If it returns `member: null`, help the user create their Crafter profile: gather `handle` and `displayName` (plus any optional fields they provide, including structured `originLocation` and `basedLocation` with city and country), check availability with `crafter handle <handle>`, show the exact JSON, and only after explicit approval run `crafter onboard --file <json-file> --confirm`. Bare `crafter onboard` opens the browser form instead. If login fails with `invalid_client` or "The requested OAuth 2.0 Client does not exist", update with `npm install --global @crafter/cli@latest` and retry. The public CLI always uses Crafter's production OAuth application; do not ask the user to inspect or change environment variables.
3. Submit a draft by running `crafter ship` from the project root. Every Ship submission must use this command or `crafter ship --file <json-file>`.
4. If validation reports missing metadata, create or edit `crafter.ship.json` with only the fields the user approves, then run `crafter ship` again.
5. Present the returned Ship draft and `previewUrl` to the user.
6. Stop and ask whether to publish.
7. Only after an explicit yes, run `crafter publish <draft-id> --revision <updatedAt-from-preview> --confirm`. If the draft changed, show the new revision and ask again.
8. Report the result according to the review rules below, and return the Ship URL.

## Review

Publishing does not always make the Ship public right away.

- A member's first published Ship goes to `pending` until a Crafter admin approves it. Only abuse and spam are rejected, not quality. Tell the user it is waiting for review and do not present it as live.
- After that first approval the member is trusted: later Ships publish directly.
- Core and crew members are trusted from the start, so their Ships publish directly.
- Updates on an approved Ship publish immediately.

Check the `status` in the publish response, and `crafter ships` to see it later.

## Publish An Update

1. Confirm the Ship is already published and identify its slug.
2. Create a JSON file containing a `title` and `description`, then show the exact update to the user.
3. Stop and ask whether to publish it. Updates are public immediately and cannot be edited.
4. Only after an explicit yes, run `crafter update <ship-slug> --file <json-file> --confirm`.
5. Return the published Ship URL.

## Release Updates From GitHub

A Ship is created once: paste a repository or website link in the web form, or run `crafter ship`. Afterwards, add the `crafter-ship` topic (https://github.com/topics/crafter-ship) to the public GitHub repo and each new GitHub Release becomes an update on the Ship. This works only for public GitHub repos that use Releases, for owners whose Ship is approved and whose GitHub account is linked to crafter.run and is the repo owner or a contributor. Releases from the last 2 days are imported daily, and the Ship owner can sync on demand with "Sync releases" on the Ship page.

## Optional Config

```json
{
  "slug": "project-slug",
  "name": "Project name",
  "tagline": "A concise description of what it does",
  "description": "A public description of at least 20 characters.",
  "links": [
    { "type": "repository", "url": "https://github.com/org/repo" },
    { "type": "website", "url": "https://example.com" }
  ]
}
```

The CLI validates this file against the same versioned contracts used by the website and API.
