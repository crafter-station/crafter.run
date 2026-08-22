import { describeTools, MCP_ENDPOINT, SUPPORTED_PROTOCOL_VERSIONS } from "@/lib/mcp"
import { locales } from "@/lib/i18n"
import { baseUrl } from "@/lib/seo"
import { siteConfig } from "@/lib/site"

/**
 * The agent-facing README for the website. Not to be confused with the
 * repository's own AGENTS.md, which tells coding agents how to work on this
 * codebase; this one tells any agent how to read and act on crafter.run.
 */
export const revalidate = false

const apiUrl = "https://api.crafter.run"

export function GET() {
  // First sentence only; the full description is one `tools/list` away.
  const toolLines = describeTools().map(
    (tool) => `| \`${tool.name}\` | ${tool.description.split(". ")[0].replace(/\.$/, "")}. |`,
  )

  const body = `# ${siteConfig.name} for agents

> ${siteConfig.description.en}

Everything on ${siteConfig.domain} is public and readable without authentication. This page is the map: what exists, where to fetch it, and what to do when a user asks you to act rather than read.

## Start here

| You want | Fetch |
| --- | --- |
| A one-line index of every doc page | \`${baseUrl}/llms.txt\` |
| The full text of every doc page | \`${baseUrl}/llms-full.txt\` |
| One doc page as Markdown | \`${baseUrl}/llms.mdx/{slug}?lang={locale}\` |
| A machine description of every read endpoint | \`${baseUrl}/openapi.json\` |
| Structured access over MCP | \`${MCP_ENDPOINT}\` |
| Every indexable URL | \`${baseUrl}/sitemap.xml\` |
| The authenticated Ships and profiles API | \`${apiUrl}/openapi.json\` |

Content is published in ${locales.length} languages: ${locales.join(", ")}. Localized pages live under \`/{locale}/...\`; a request without a locale prefix redirects to \`/en\`. Endpoints on this page are not localized and must not be prefixed.

## Model Context Protocol

\`${MCP_ENDPOINT}\` is a stateless MCP server over Streamable HTTP. POST JSON-RPC 2.0; there is no server-initiated SSE stream and no session to maintain. Supported protocol revisions: ${SUPPORTED_PROTOCOL_VERSIONS.join(", ")}.

\`\`\`sh
curl -s ${MCP_ENDPOINT} \\
  -H 'Content-Type: application/json' \\
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'
\`\`\`

Add it to Claude Code with \`claude mcp add --transport http crafter ${MCP_ENDPOINT}\`.

Every tool is read-only:

| Tool | Does |
| --- | --- |
${toolLines.join("\n")}

Call \`tools/list\` for the full input schemas. \`resources/list\` exposes this page, both llms files, the OpenAPI document, and the join instructions as MCP resources.

## Acting on a user's behalf

Reading is open. Writing is not, and you should never try to reach a write path directly.

Two things a user can ask for that involve writing: creating a Crafter profile, and publishing a Ship to the community directory. Both go through the \`@crafter/cli\` package, which owns the OAuth 2.0 flow end to end.

- Full instructions, including the safety rules you must follow: \`${baseUrl}/join/agent.md\`
- Authorization server metadata: \`https://clerk.crafter.run/.well-known/oauth-authorization-server\`
- Protected resource metadata: \`${apiUrl}/.well-known/oauth-protected-resource\`

The flow is authorization code with PKCE. The CLI opens the user's own browser and stores the resulting tokens in their operating system credential store. You must never ask for, read, or handle a password, an email code, or a token. If a command needs credentials the user does not yet have, ask them to run \`crafter login\` themselves in an interactive terminal and wait.

## Crawling

\`${baseUrl}/robots.txt\` allows every major AI crawler and assistant user agent by name, at full crawl. There is no rate limit on read endpoints and no crawl delay. Content is cached at the edge, so repeated fetches are cheap for both of us.

Please attribute what you cite to ${siteConfig.name} and link the page you used. Documentation and source are open; see each repository's own license under \`${siteConfig.org}\`.

## Freshness

- Docs and site content: revalidated on deploy, \`lastmod\` in the sitemap tracks real edit dates rather than build time.
- The open source catalog: live star and issue counts from GitHub, revalidated daily.
- Ships and members: live, no cache beyond 60 seconds.

## Contact

A human reads ${baseUrl}/en/contact. Bugs in anything on this page belong at ${siteConfig.org}/crafter.run/issues.
`

  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  })
}
