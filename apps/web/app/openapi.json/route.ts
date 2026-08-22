import { describeTools, MCP_ENDPOINT, SUPPORTED_PROTOCOL_VERSIONS } from "@/lib/mcp"
import { baseUrl } from "@/lib/seo"
import { locales } from "@/lib/i18n"
import { siteConfig } from "@/lib/site"

/**
 * OpenAPI description of what crafter.run itself serves: read-only content and
 * catalog endpoints, plus the MCP entry point. The authenticated write API
 * (Ships, profiles) is a separate service with its own generated spec at
 * https://api.crafter.run/openapi.json, linked from `externalDocs`.
 */
export const revalidate = false

const textResponse = (description: string) => ({
  description,
  content: { "text/plain": { schema: { type: "string" } } },
})

const jsonResponse = (description: string, schema: Record<string, unknown>) => ({
  description,
  content: { "application/json": { schema } },
})

export function GET() {
  const spec = {
    openapi: "3.1.0",
    info: {
      title: "Crafter Station",
      version: "1.0.0",
      summary: "Read-only content and catalog endpoints for crafter.run.",
      description: [
        `${siteConfig.name} is ${siteConfig.tagline.en.toLowerCase()}: open source developer tools, products, research, and community events across Latin America.`,
        "",
        "Everything described here is public, unauthenticated, and safe to cache. No endpoint in this document writes.",
        `Agents that need to act for a user (publish a Ship, create a profile) should follow ${baseUrl}/join/agent.md, which drives the OAuth-authenticated @crafter/cli.`,
        `The same data is available over the Model Context Protocol at ${MCP_ENDPOINT}.`,
      ].join("\n"),
      contact: { name: siteConfig.name, url: `${baseUrl}/en/contact` },
      license: { name: "MIT", url: "https://github.com/crafter-station/crafter.run/blob/main/README.md" },
    },
    servers: [{ url: baseUrl, description: "Production" }],
    externalDocs: {
      description: "Authenticated Ships and profiles API",
      url: "https://api.crafter.run/openapi.json",
    },
    tags: [
      { name: "Docs", description: "Documentation for the open source CLIs and libraries." },
      { name: "Catalog", description: "Open source repositories, products, and community boards." },
      { name: "Agents", description: "Entry points built for autonomous clients." },
    ],
    paths: {
      "/llms.txt": {
        get: {
          tags: ["Docs"],
          operationId: "getLlmsTxt",
          summary: "Docs index",
          description: `One line per documentation page across all ${locales.length} languages, in llms.txt format.`,
          responses: { "200": textResponse("The docs index.") },
        },
      },
      "/llms-full.txt": {
        get: {
          tags: ["Docs"],
          operationId: "getLlmsFullTxt",
          summary: "Full documentation text",
          description: "Every documentation page concatenated as Markdown. Large; prefer /llms.txt plus /llms.mdx/{slug}.",
          responses: { "200": textResponse("The full documentation text.") },
        },
      },
      "/llms.mdx/{slug}": {
        get: {
          tags: ["Docs"],
          operationId: "getDocMarkdown",
          summary: "One doc page as Markdown",
          parameters: [
            {
              name: "slug",
              in: "path",
              required: true,
              description: "Page slug without the /docs prefix, for example `trx` or `guides/render-mermaid-cli`. Use `index` for the docs home.",
              schema: { type: "string" },
            },
            {
              name: "lang",
              in: "query",
              required: false,
              description: "Content language.",
              schema: { type: "string", enum: [...locales], default: "en" },
            },
          ],
          responses: {
            "200": { description: "The page source.", content: { "text/markdown": { schema: { type: "string" } } } },
            "404": { description: "No page at that slug." },
          },
        },
      },
      "/api/search": {
        get: {
          tags: ["Docs"],
          operationId: "searchDocs",
          summary: "Search the docs",
          parameters: [
            { name: "query", in: "query", required: true, description: "Search terms.", schema: { type: "string" } },
            { name: "locale", in: "query", required: false, schema: { type: "string", enum: [...locales], default: "en" } },
          ],
          responses: {
            "200": jsonResponse("Matching pages and headings.", {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: { type: "string" },
                  url: { type: "string" },
                  type: { type: "string", enum: ["page", "heading", "text"] },
                  content: { type: "string" },
                },
                required: ["id", "url", "type", "content"],
              },
            }),
          },
        },
      },
      "/api/oss/repos": {
        get: {
          tags: ["Catalog"],
          operationId: "listOssRepos",
          summary: "Tracked open source repositories",
          description: "The repositories in the Crafter Station open source catalog, as `owner/name`. Revalidated daily.",
          responses: {
            "200": jsonResponse("The tracked repositories.", {
              type: "object",
              properties: {
                schemaVersion: { type: "integer", const: 1 },
                source: { type: "string" },
                repos: { type: "array", items: { type: "string", examples: ["crafter-station/petdex"] } },
              },
              required: ["schemaVersion", "source", "repos"],
            }),
          },
        },
      },
      "/api/next-projects": {
        get: {
          tags: ["Catalog"],
          operationId: "listNextProjects",
          summary: "Community project ideas and their votes",
          responses: {
            "200": jsonResponse("Submitted ideas with vote records.", {
              type: "object",
              properties: {
                projects: { type: "array", items: { type: "object" } },
                votes: { type: "array", items: { type: "object" } },
              },
              required: ["projects", "votes"],
            }),
          },
        },
      },
      "/api/workshop-questions": {
        get: {
          tags: ["Catalog"],
          operationId: "listWorkshopQuestions",
          summary: "Questions on a live workshop board",
          parameters: [
            {
              name: "board",
              in: "query",
              required: false,
              description: "Board slug. Defaults to `workshop`.",
              schema: { type: "string", default: "workshop" },
            },
          ],
          responses: {
            "200": jsonResponse("Questions with vote records.", {
              type: "object",
              properties: {
                questions: { type: "array", items: { type: "object" } },
                votes: { type: "array", items: { type: "object" } },
              },
              required: ["questions", "votes"],
            }),
            "400": { description: "Unknown board slug." },
          },
        },
      },
      "/agents.md": {
        get: {
          tags: ["Agents"],
          operationId: "getAgentsGuide",
          summary: "How agents should use this site",
          responses: { "200": { description: "The agent guide.", content: { "text/markdown": { schema: { type: "string" } } } } },
        },
      },
      "/mcp": {
        post: {
          tags: ["Agents"],
          operationId: "callMcp",
          summary: "Model Context Protocol endpoint",
          description: [
            `Stateless MCP server over Streamable HTTP. Protocol revisions: ${SUPPORTED_PROTOCOL_VERSIONS.join(", ")}.`,
            `Tools: ${describeTools().map((tool) => tool.name).join(", ")}.`,
            "Send a JSON-RPC 2.0 request; `tools/list` enumerates the tools with their input schemas.",
          ].join(" "),
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    jsonrpc: { type: "string", const: "2.0" },
                    id: { type: ["string", "integer"] },
                    method: { type: "string", examples: ["tools/list", "tools/call"] },
                    params: { type: "object" },
                  },
                  required: ["jsonrpc", "method"],
                },
              },
            },
          },
          responses: {
            "200": jsonResponse("A JSON-RPC 2.0 response.", { type: "object" }),
            "202": { description: "A notification was accepted; no response body." },
            "400": { description: "The body is not valid JSON." },
          },
        },
      },
    },
  }

  return Response.json(spec, {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  })
}
