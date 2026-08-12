# @crafter/cli

Create reviewable Crafter Station Ship drafts from a local project, then publish only after explicit confirmation.

## Install

```bash
npm install --global @crafter/cli
```

The CLI requires Node.js 18 or newer. Bun is not required.

## Usage

```bash
crafter login
crafter whoami
crafter ship
crafter publish <draft-id> --revision <updated-at> --confirm
crafter update <ship-slug> --file <json-file> --confirm
```

Ship update files contain a public changelog entry:

```json
{
  "title": "Version 1.1",
  "description": "Added team workspaces and improved onboarding."
}
```

The CLI inspects only `README.md`, `package.json`, `crafter.ship.json`, and the Git origin by default. OAuth credentials are stored in the operating-system credential store.

See the public Ships directory at [crafter.run/ships](https://crafter.run/ships).
