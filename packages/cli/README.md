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
crafter handle <handle>
crafter onboard --file <json-file> --confirm
crafter ship
crafter publish <draft-id> --revision <updated-at> --confirm
crafter update <ship-slug> --file <json-file> --confirm
```

`crafter handle` checks whether a Crafter handle is still available. `crafter onboard --file` creates or updates your Crafter profile from a JSON file with at least `handle` and `displayName` (run it without arguments to use the browser form instead):

```json
{
  "handle": "ada",
  "displayName": "Ada Lovelace",
  "bio": "Building compilers for fun.",
  "githubUrl": "https://github.com/ada"
}
```

AI coding agents can follow [crafter.run/join/agent.md](https://crafter.run/join/agent.md) to walk a user through joining.

Ship update files contain a public changelog entry:

```json
{
  "title": "Version 1.1",
  "description": "Added team workspaces and improved onboarding."
}
```

The CLI inspects only `README.md`, `package.json`, `crafter.ship.json`, and the Git origin by default. OAuth credentials are stored in the operating-system credential store.

See the public Ships directory at [crafter.run/ships](https://crafter.run/ships).
