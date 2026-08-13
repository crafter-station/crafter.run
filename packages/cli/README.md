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
crafter edit <ship-slug> --file <json-file> --revision <updated-at> --confirm
crafter update <ship-slug> --file <json-file> --confirm
```

`crafter handle` checks whether a Crafter handle is still available. `crafter onboard --file` creates or updates your Crafter profile from a JSON file with at least `handle` and `displayName` (run it without arguments to use the browser form instead):

```json
{
  "handle": "ada",
  "displayName": "Ada Lovelace",
  "bio": "Building compilers for fun.",
  "githubUrl": "https://github.com/ada",
  "originLocation": { "city": "London", "country": "United Kingdom", "countryCode": "GB" },
  "basedLocation": { "city": "London", "country": "United Kingdom", "countryCode": "GB" }
}
```

AI coding agents can follow [crafter.run/join/agent.md](https://crafter.run/join/agent.md) to walk a user through joining.

Run `crafter login` yourself in a local interactive terminal and keep it open until the browser confirms login. The CLI rejects non-interactive agent command runners because ending that process also ends the localhost OAuth callback server.

If login fails with `invalid_client` or "The requested OAuth 2.0 Client does not exist", the CLI is pointed at an OAuth client that Crafter's identity provider does not have. Run `env | grep CRAFTER_`, unset everything it prints, reinstall with `npm install --global @crafter/cli@latest`, and try again. `CRAFTER_CLI_OAUTH_ISSUER` and `CRAFTER_CLI_OAUTH_CLIENT_ID` override the OAuth target for local development and must be set together, because a client only exists on the issuer that registered it. The Crafter API's `CRAFTER_OAUTH_CLIENT_ID` is a separate variable and has no effect on the CLI.

Ship update files contain a public changelog entry:

```json
{
  "title": "Version 1.1",
  "description": "Added team workspaces and improved onboarding."
}
```

Use `crafter edit` to change a published Ship's metadata. Get the current `updatedAt` revision from `crafter ships`, then provide any fields to change in the JSON file:

```json
{
  "tagline": "A sharper description of the project",
  "links": [{ "type": "website", "url": "https://example.com" }]
}
```

`crafter update` remains the command for publishing changelog entries.

The CLI inspects only `README.md`, `package.json`, `crafter.ship.json`, and the Git origin by default. OAuth credentials are stored in the operating-system credential store.

See the public Ships directory at [crafter.run/ships](https://crafter.run/ships).
