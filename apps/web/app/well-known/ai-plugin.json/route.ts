import { MCP_ENDPOINT } from "@/lib/mcp"
import { baseUrl } from "@/lib/seo"
import { siteConfig } from "@/lib/site"

/**
 * The original plugin manifest format. Kept because several agent directories
 * and readiness scanners still probe for it; new clients should read
 * /.well-known/mcp.json or /openapi.json instead. Served through a rewrite in
 * next.config.mjs for the same dot-directory reason as mcp.json.
 */
export const revalidate = false

export function GET() {
  const manifest = {
    schema_version: "v1",
    name_for_human: siteConfig.name,
    name_for_model: "crafter_station",
    description_for_human: siteConfig.description.en,
    description_for_model: `Read-only access to ${siteConfig.name}: documentation for its open source CLIs and libraries, the open source repository catalog, products, the core team, and projects published by the community. All endpoints are public and safe to call. Nothing here writes.`,
    auth: { type: "none" },
    api: { type: "openapi", url: `${baseUrl}/openapi.json` },
    mcp: { url: MCP_ENDPOINT, transport: "streamable-http" },
    logo_url: `${baseUrl}/brand/logo-liquid.png`,
    contact_url: `${baseUrl}/en/contact`,
    legal_info_url: `${baseUrl}/en/contact`,
  }

  return Response.json(manifest, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  })
}
