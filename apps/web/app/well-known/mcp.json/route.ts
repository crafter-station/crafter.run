import { describeTools, MCP_ENDPOINT, MCP_SERVER_NAME, MCP_SERVER_VERSION, SUPPORTED_PROTOCOL_VERSIONS } from "@/lib/mcp"
import { baseUrl } from "@/lib/seo"
import { siteConfig } from "@/lib/site"

/**
 * Served at /.well-known/mcp.json through a rewrite in next.config.mjs: the
 * App Router will not route a directory whose name starts with a dot.
 *
 * A client that only knows the domain looks here to find the endpoint, so this
 * stays a pointer, not a second copy of the tool definitions. `tools` lists
 * names only; `tools/list` on the endpoint itself is the source of truth.
 */
export const revalidate = false

export function GET() {
  const manifest = {
    schemaVersion: "2025-06-18",
    name: MCP_SERVER_NAME,
    title: siteConfig.name,
    version: MCP_SERVER_VERSION,
    description: `Read-only access to ${siteConfig.name}: open source documentation, the repository catalog, products, the team, and community Ships.`,
    servers: [
      {
        name: MCP_SERVER_NAME,
        url: MCP_ENDPOINT,
        transport: "streamable-http",
        protocolVersions: SUPPORTED_PROTOCOL_VERSIONS,
        authentication: "none",
      },
    ],
    capabilities: { tools: true, resources: true, prompts: false },
    tools: describeTools().map((tool) => ({ name: tool.name, description: tool.description })),
    documentation: `${baseUrl}/agents.md`,
    openapi: `${baseUrl}/openapi.json`,
    contact: `${baseUrl}/en/contact`,
  }

  return Response.json(manifest, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  })
}
