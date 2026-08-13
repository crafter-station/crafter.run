import { baseUrl } from "@/lib/seo"

export const revalidate = false

export function GET() {
  const body = `# Join Crafter Station

Instructions for AI coding agents helping a human join the Crafter Station community directory at ${baseUrl}.

You are acting on behalf of a human. Every piece of profile data must come from them or be explicitly approved by them before you submit anything. Use the \`crafter\` CLI for all authentication and API calls. Do not implement HTTP or token handling yourself, and do not fill in website forms for the user.

## Safety rules

- Never ask for, read, or handle the user's password, email codes, or any credential. Authentication happens in their own browser via \`crafter login\`.
- Never invent profile data. Ask the user for anything you do not know. Leave optional fields out rather than guessing.
- Do not read \`.env*\` files, credentials, or files outside the current working directory.
- Show the exact JSON you intend to submit and get an explicit yes before running the final command.
- If a command fails twice in a row, stop and show the user the error instead of retrying.

## Step 1: Install or update the CLI

Requires Node.js 18 or newer (\`node --version\`).

Run this even if \`crafter\` is already on the PATH: installing \`@latest\` updates an existing install in place, and older releases are missing commands these instructions depend on.

\`\`\`sh
npm install --global @crafter/cli@latest
crafter --version
\`\`\`

\`crafter --version\` must print 0.3.1 or higher. If it errors with "Unknown command" or prints a lower version, the install is stale: run the install command again. If the global install fails (for example with a permissions error) or stays stale, skip it and prefix every \`crafter\` command in these instructions with \`npx -y @crafter/cli@latest\` instead, for example \`npx -y @crafter/cli@latest whoami\`.

## Step 2: Authenticate

\`\`\`sh
crafter whoami
\`\`\`

- If it reports that login is required, do not run \`crafter login\` through your command tool. Ask the user to run \`crafter login\` themselves in a local interactive terminal, leave that command running, and complete sign-in in their browser within 5 minutes. The terminal must stay open because it owns the localhost OAuth callback server. You never see or touch their credentials.
- Wait for the user to confirm that their terminal printed \`Logged in.\`, then retry \`crafter whoami\`. If their browser shows \`127.0.0.1 refused to connect\`, the login command stopped before the callback arrived; ask them to start \`crafter login\` again in their terminal and keep it running through browser confirmation.
- If their browser or terminal shows \`invalid_client\` or "The requested OAuth 2.0 Client does not exist", update with \`npm install --global @crafter/cli@latest\` and retry \`crafter login\`. The public CLI always uses Crafter's production OAuth application; do not ask the user to inspect or change environment variables.
- If \`crafter whoami\` returns a \`member\` object, the user already has a Crafter profile. Tell them, share \`${baseUrl}/en/crafters/<their-handle>\`, and ask whether they want to update the profile instead of creating one.

## Step 3: Build the profile with the user

Start from a draft, not an empty questionnaire. Prefill any field you already have evidence for: your own memory or context about the user, \`git config user.name\`, the owner of the current repository's origin remote, \`gh api user\` when the GitHub CLI is authenticated, or author fields in the current project's README or package.json. Tell the user where each prefilled value came from. Never fill a field you have no evidence for; leave it blank and ask. Then walk through the draft with the user so they can correct or complete every field.

The fields. Required:

- \`handle\`: 3 to 40 characters, lowercase letters, numbers, and internal hyphens. Their public username.
- \`displayName\`: 1 to 80 characters.

Optional (only include what the user provides):

- \`bio\`: up to 280 characters.
- \`avatarUrl\`: https image URL.
- \`githubUrl\`, \`gitlabUrl\`, \`linkedinUrl\`, \`instagramUrl\`, \`xUrl\`: profile URLs on the matching host.
- \`primaryWebsiteUrl\`, \`secondaryWebsiteUrl\`: personal sites.
- \`currentRole\`: up to 120 characters, for example "Frontend Engineer".
- \`originLocation\` and \`basedLocation\`: optional structured places. Each may include \`city\`, \`region\`, \`country\`, and \`countryCode\` (ISO 3166-1 alpha-2). Prefer city plus country so names like Córdoba, Argentina stay distinct from Córdoba, Spain. Example: \`{ "city": "Lima", "country": "Peru", "countryCode": "PE" }\`. Leave either object out rather than guessing. Do not invent coordinates or place IDs.

Check availability before proposing a handle:

\`\`\`sh
crafter handle <handle>
\`\`\`

If it is taken, suggest close alternatives and let the user pick. Job-seeking and salary preferences are private settings the user can edit later at ${baseUrl}/en/settings/profile; do not collect them here.

## Step 4: Confirm

Write the approved fields to a temporary file outside the user's project, for example \`/tmp/crafter-profile.json\` or your scratch directory. Show the user its exact contents and ask whether to submit. Wait for an explicit yes.

Example:

\`\`\`json
{
  "handle": "ada",
  "displayName": "Ada Lovelace",
  "bio": "Building compilers for fun.",
  "githubUrl": "https://github.com/ada",
  "originLocation": { "city": "London", "country": "United Kingdom", "countryCode": "GB" },
  "basedLocation": { "city": "London", "country": "United Kingdom", "countryCode": "GB" }
}
\`\`\`

## Step 5: Submit

\`\`\`sh
crafter onboard --file /tmp/crafter-profile.json --confirm
\`\`\`

On success it prints the created profile and a \`profileUrl\`. Share that URL with the user and delete the profile file.

Error handling:

- "already in use" (409): the handle was claimed meanwhile. Run \`crafter handle\` again and ask the user for a new one.
- Validation errors: show the message to the user and fix the field together.

## After joining

Invite the user to ship a project to the community directory. From a project root, \`crafter ship\` creates a reviewable draft, or install the skill for guided shipping:

\`\`\`sh
npx skills add crafter-station/crafter.run --skill crafter-ship
\`\`\`
`

  return new Response(body, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  })
}
