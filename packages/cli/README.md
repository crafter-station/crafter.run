# @crafter/cli

Create reviewable Crafter Station Ship drafts from a local project, then publish only after explicit confirmation.

## Install

```bash
bun add --global @crafter/cli
```

## Usage

```bash
crafter login
crafter whoami
crafter ship
crafter publish <draft-id> --revision <updated-at> --confirm
```

The CLI inspects only `README.md`, `package.json`, `crafter.ship.json`, and the Git origin by default. OAuth credentials are stored in the operating-system credential store.

See the public Ships directory at [crafter.run/ships](https://crafter.run/ships).
