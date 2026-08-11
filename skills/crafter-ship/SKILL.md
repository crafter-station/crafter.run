---
name: crafter-ship
description: Create a reviewable Crafter Station Ship draft from the current project using the deterministic Crafter CLI. Use when the user says "ship this to Crafter", "publish this on Crafter", or wants to submit the current app, package, experiment, or repository to the Crafter community directory.
---

# Ship To Crafter

Use the `crafter` CLI for installation, authentication, metadata validation, Ship submission, and publishing. Do not implement HTTP or token handling yourself, and do not submit Ships through the website.

## Install The CLI

1. Verify Node.js 18 or newer is installed with `node --version`. If Node.js is unavailable or too old, ask the user to install a supported version from [nodejs.org](https://nodejs.org) and stop.
2. Install or update the public CLI before authenticating with `npm install --global @crafter/cli@latest`.
3. Confirm `crafter` is available with `command -v crafter`.
4. Verify the installation with `crafter help`.

Do not clone the Crafter repository or invoke its internal source as a substitute for installing the published CLI.

## Safety Rules

- Draft first. Never publish in the same step as draft creation.
- Publish only after showing the exact draft and receiving explicit user confirmation.
- Inspect only `README.md`, `package.json`, `crafter.ship.json`, and `git remote.origin.url` by default.
- Never inspect `.env*`, credentials, home directories, git history, or arbitrary files.
- Tell the user which sources were used. The CLI includes them in `provenance`.
- Do not invent links or claims. Ask for missing required fields.

## Workflow

1. Install and verify the CLI as described above.
2. Check authentication with `crafter whoami`. If needed, run `crafter login`. If it returns `member: null`, run `crafter onboard` and let the user create their Crafter profile.
3. Submit a draft by running `crafter ship` from the project root. Every Ship submission must use this command or `crafter ship --file <json-file>`.
4. If validation reports missing metadata, create or edit `crafter.ship.json` with only the fields the user approves, then run `crafter ship` again.
5. Present the returned Ship draft and `previewUrl` to the user.
6. Stop and ask whether to publish.
7. Only after an explicit yes, run `crafter publish <draft-id> --revision <updatedAt-from-preview> --confirm`. If the draft changed, show the new revision and ask again.
8. Return the published Ship URL.

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
