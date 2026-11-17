---
name: profile
description: Read or fill the member's crafter.run profile (handle, bio, current role, job seeking, origin and based city, roles open to, social links) from the terminal with the Crafter CLI. Use when the user says "update my Crafter profile", "fill my crafter.run profile", "set my bio on Crafter" or wants to complete onboarding without the browser form.
---

# Crafter Profile

Use `crafter profile` to read and edit the signed-in member's profile. Do not call the API or handle tokens yourself.

## Safety Rules

- Dry run first. `crafter profile update` writes nothing until `--confirm`.
- Show the user the dry-run diff and apply with `--confirm` only after an explicit yes.
- Never invent values. Ask for missing fields, and only use sources the user points you to.
- Do not run `crafter login` through an agent command tool: ask the user to run it in their own interactive terminal and tell you when it prints `Logged in.`

## Workflow

1. Check the CLI with `command -v crafter` (`npm install --global @crafter/cli@latest` if missing).
2. Read the current state: `crafter profile get --json`. `"member": null` means no profile yet.
3. Write the change as JSON. With an existing profile the file is partial: include only the fields to change. Without one, `handle` and `displayName` are required (check a handle with `crafter handle <handle>`).
4. Dry run: `crafter profile update --file patch.json --json` (or `--file -` with stdin). Review `changes`.
5. Show the diff to the user. After an explicit yes, run the same command with `--confirm`.
6. Report the returned `profileUrl`.

## Fields

`handle`, `displayName`, `bio` (max 280), `avatarUrl`, `currentRole`, `isJobSeeking` (boolean), `rolesOpenTo` (up to 10 strings), `workArrangements` (`remote`, `onsite`, `hybrid`), `onsiteCity` (required with onsite or hybrid, forbidden otherwise), `salaryRange` (`{ "min", "max", "currency" }`, private), `resumeUrl` (private), `githubUrl`, `gitlabUrl`, `linkedinUrl`, `instagramUrl`, `xUrl` (each on its own domain), `primaryWebsiteUrl`, `secondaryWebsiteUrl`, `originLocation` and `basedLocation` (`{ "city", "region", "country", "countryCode" }`).

Set a nullable field to `null` to clear it. `originLocation` and `basedLocation` are replaced as a whole. Unknown keys are rejected.

```json
{
  "bio": "Building agents that ship.",
  "currentRole": "AI engineer",
  "isJobSeeking": false,
  "basedLocation": { "city": "Lima", "countryCode": "PE" },
  "githubUrl": "https://github.com/ada"
}
```

## Exit codes and errors

- `0`: success, including a dry run and "no profile yet".
- `2`: usage or validation error. The message (and, with `--json`, `error.issues`) lists each `field` and the reason. Fix the file and rerun.
- `1`: runtime or API error: not signed in, network, rate limit (wait a minute), handle taken (pick another).

With `--json`, errors are JSON on stderr: `{ "error": { "code", "message", "issues": [{ "field", "message" }] } }`.

`crafter onboard` still works (bare: opens the browser form; `--file <json> --confirm`: full upsert). Prefer `crafter profile update`.
