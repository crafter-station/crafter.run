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

- If it reports that login is required, run \`crafter login\`. It prints a sign-in URL, tries to open the user's browser, and waits up to 5 minutes. Tell the user to complete sign-in there; if they do not have an account yet, they can create one on that same page. You never see or touch their credentials.
- If the browser does not open automatically (common in sandboxed shells), show the user the printed sign-in URL as a clickable link and ask them to open it. The URL redirects back to this machine, so the login completes as soon as they approve, as long as their browser runs on the same machine as this CLI. If the CLI is running on a remote machine, ask the user to run \`crafter login\` in a terminal on their own computer instead, then retry \`crafter whoami\` here.
- If \`crafter whoami\` returns a \`member\` object, the user already has a Crafter profile. Tell them, share \`${baseUrl}/en/crafters/<their-handle>\`, and ask whether they want to update the profile instead of creating one.

## Step 3: Build the profile with the user

Ask the user for these fields. Required:

- \`handle\`: 3 to 40 characters, lowercase letters, numbers, and internal hyphens. Their public username.
- \`displayName\`: 1 to 80 characters.

Optional (only include what the user provides):

- \`bio\`: up to 280 characters.
- \`avatarUrl\`: https image URL.
- \`githubUrl\`, \`gitlabUrl\`, \`linkedinUrl\`, \`instagramUrl\`, \`xUrl\`: profile URLs on the matching host.
- \`primaryWebsiteUrl\`, \`secondaryWebsiteUrl\`: personal sites.
- \`currentRole\`: up to 120 characters, for example "Frontend Engineer".

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
  "githubUrl": "https://github.com/ada"
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
