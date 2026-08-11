---
name: crafter-ship
description: Create a reviewable Crafter Station Ship draft from the current project using the deterministic Crafter CLI. Use when the user says "ship this to Crafter", "publish this on Crafter", or wants to submit the current app, package, experiment, or repository to the Crafter community directory.
---

# Ship To Crafter

Use the `crafter` CLI for authentication, metadata validation, API calls, and publishing. Do not implement HTTP or token handling yourself.

## Safety Rules

- Draft first. Never publish in the same step as draft creation.
- Publish only after showing the exact draft and receiving explicit user confirmation.
- Inspect only `README.md`, `package.json`, `crafter.ship.json`, and `git remote.origin.url` by default.
- Never inspect `.env*`, credentials, home directories, git history, or arbitrary files.
- Tell the user which sources were used. The CLI includes them in `provenance`.
- Do not invent links or claims. Ask for missing required fields.

## Workflow

1. Check authentication with `crafter whoami`. If needed, run `crafter login`. If it returns `member: null`, run `crafter onboard` and let the user create their Crafter profile.
2. Run `crafter ship` from the project root.
3. If validation reports missing metadata, create or edit `crafter.ship.json` with only the fields the user approves, then run `crafter ship` again.
4. Present the returned Ship draft and `previewUrl` to the user.
5. Stop and ask whether to publish.
6. Only after an explicit yes, run `crafter publish <draft-id> --revision <updatedAt-from-preview> --confirm`. If the draft changed, show the new revision and ask again.
7. Return the published Ship URL.

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
