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
crafter profile get [--json]
crafter profile update --file <path|-> [--confirm] [--json]
crafter ship
crafter publish <draft-id> --revision <updated-at> --confirm
crafter edit <ship-slug> --file <json-file> --revision <updated-at> --confirm
crafter update <ship-slug> --file <json-file> --confirm
crafter changelog new <slug> [--area <research|lab|games|station>] [--kind <ship|update|event|roundup>]
crafter changelog check <dir> [--json]
crafter changelog submit <dir> [--confirm]
crafter skills list
crafter skills get <name> [--full | --ref <ref>]
```

## Agent skills

The CLI bundles agent skills that always match the installed version: `ship` (publish a Ship), `profile` (read and update your profile) and `changelog` (publish a crafter.run changelog entry).

```bash
crafter skills list              # name and description, add --json for machine output
crafter skills get ship          # print a skill
crafter skills get changelog --full            # plus its references
crafter skills get changelog --ref media       # one reference
crafter skills get --all
crafter skills path [name]
```

To let your coding agent discover them, install the discovery stub with `npx skills add crafter-station/crafter.run --skill crafter`; it only points at `crafter skills`.

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


`crafter profile get` prints your profile (`--json` for agents). `crafter profile update --file <path|->` validates a partial JSON file against the same contract as the API and prints a dry-run diff; add `--confirm` to apply. Without a profile it creates one (needs `handle` and `displayName`), so it covers `crafter onboard --file`, which keeps working. Exit codes: 0 success, 1 runtime or API error, 2 usage or validation error; with `--json`, errors are JSON on stderr listing each field and reason.

Run `crafter login` yourself in a local interactive terminal and keep it open until the browser confirms login. The CLI rejects non-interactive agent command runners because ending that process also ends the localhost OAuth callback server.

If login fails with `invalid_client` or "The requested OAuth 2.0 Client does not exist", update with `npm install --global @crafter/cli@latest` and try again. The public CLI always uses Crafter's production OAuth application; environment variables cannot redirect authentication.

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

## Changelog entries

Members of the `crafter-station` GitHub organization can publish a changelog entry at [crafter.run/changelog](https://crafter.run/changelog) as a pull request. This path needs the [GitHub CLI](https://cli.github.com) signed in (`gh auth login`, plus `gh auth refresh -s read:org` if membership checks fail); it does not use `crafter login`.

```bash
crafter changelog new my-launch        # scaffolds ./crafter-changelog/my-launch/en.mdx and es.mdx
crafter changelog check crafter-changelog/my-launch
crafter changelog submit crafter-changelog/my-launch            # dry run: prints the plan, pushes nothing
crafter changelog submit crafter-changelog/my-launch --confirm  # opens the pull request
```

Media goes in the same folder and is referenced as `/changelog/<slug>/<file>`. `check` validates offline: frontmatter, both locales with the same date, every referenced file present, and a warning above 2 MB per file or on em dashes. `submit` identifies you with `gh api user`, confirms you belong to the organization, maps your login to a current core crafter on the team page, and refuses if the branch `changelog/<slug>` or an entry with that slug already exists. With `--confirm` it creates the commit through the GitHub API on branch `changelog/<slug>` and opens a pull request; it never merges, a maintainer does. Community projects that are not core crafters use `crafter ship` instead.

The CLI inspects only `README.md`, `package.json`, `crafter.ship.json`, and the Git origin by default. OAuth credentials are stored in the operating-system credential store.

See the public Ships directory at [crafter.run/ships](https://crafter.run/ships).
