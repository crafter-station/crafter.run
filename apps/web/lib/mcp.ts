import { z } from "zod"

import { defaultLocale, isLocale, locales, type Locale } from "@/lib/i18n"
import { getOssRepos } from "@/lib/oss"
import { searchApi } from "@/lib/search"
import { baseUrl } from "@/lib/seo"
import { getClosedProducts, getOpenSourceProducts, getProducts, siteConfig } from "@/lib/site"
import { source } from "@/lib/source"
import { teamMembers } from "@/lib/team"
import { listCrafters, listPublishedShips } from "@/lib/ships"

export const MCP_SERVER_NAME = "crafter-station"
export const MCP_SERVER_VERSION = "1.0.0"
export const MCP_ENDPOINT = `${baseUrl}/mcp`

/**
 * Protocol revisions this server speaks, newest first. `initialize` echoes the
 * client's requested revision when it is one of these, otherwise it answers
 * with the newest and lets the client decide whether to continue.
 */
export const SUPPORTED_PROTOCOL_VERSIONS = ["2025-06-18", "2025-03-26", "2024-11-05"]

export const MCP_INSTRUCTIONS = `Read-only access to Crafter Station: open source docs, the OSS repo catalog, products, the team, and community Ships.

Start with search_docs for anything about the CLIs (awake, mermaid, neon-cli, skillkit, trx), then get_doc for the full page in Markdown. Every tool takes an optional locale (${locales.join(", ")}) and defaults to ${defaultLocale}.

This server never writes. To publish a Ship or create a profile on a user's behalf, follow ${baseUrl}/join/agent.md, which drives the authenticated @crafter/cli instead.`

const localeInput = z
  .enum(locales)
  .optional()
  .describe(`Content language. One of ${locales.join(", ")}. Defaults to ${defaultLocale}.`)

function resolveLocale(value: string | undefined): Locale {
  return value && isLocale(value) ? value : defaultLocale
}

function docUrl(url: string) {
  return `${baseUrl}${url}`
}

/**
 * The product catalog is a heterogeneous literal: only open source entries
 * carry `sourceUrl` and `openSource`, and only some carry `metrics`. Reading
 * the optional half through one shape keeps the tool output uniform.
 */
function normalizeProduct(product: ReturnType<typeof getProducts>[number]) {
  const optional = product as { sourceUrl?: string; openSource?: boolean; metrics?: readonly string[] }
  return {
    slug: product.slug,
    title: product.title,
    tagline: product.tagline,
    description: product.description,
    url: product.url,
    technologies: [...product.technologies],
    sourceUrl: optional.sourceUrl ?? null,
    openSource: optional.openSource === true,
    metrics: optional.metrics ? [...optional.metrics] : null,
  }
}

type ToolResult = {
  /** Rendered for clients that only show text. */
  text: string
  /** The same answer as data, for clients that read structuredContent. */
  data: unknown
}

type Tool<Schema extends z.ZodType> = {
  name: string
  title: string
  description: string
  schema: Schema
  readOnly: true
  run: (input: z.output<Schema>) => Promise<ToolResult>
}

function defineTool<Schema extends z.ZodType>(tool: Omit<Tool<Schema>, "readOnly">): Tool<Schema> {
  return { ...tool, readOnly: true }
}

const searchDocs = defineTool({
  name: "search_docs",
  title: "Search the docs",
  description:
    "Full-text search across Crafter Station's open source documentation and guides. Returns page titles, section headings, and URLs. Use get_doc to read a result in full.",
  schema: z.object({
    query: z.string().min(1).max(200).describe("What to look for, for example 'transcribe youtube' or 'neon billing'."),
    locale: localeInput,
    limit: z.number().int().min(1).max(20).optional().describe("Maximum results. Defaults to 10."),
  }),
  async run({ query, locale, limit }) {
    const language = resolveLocale(locale)
    const results = await searchApi.search(query, { locale: language })
    const trimmed = results.slice(0, limit ?? 10).map((result) => ({
      // The index wraps matches in <mark> for the browser dialog; a model
      // reading this wants the sentence, not the highlighting.
      title: result.content.replace(/<\/?mark>/g, ""),
      type: result.type,
      url: `${baseUrl}${result.url}`,
    }))

    if (trimmed.length === 0) {
      return { text: `No documentation matches "${query}" in ${language}.`, data: { query, locale: language, results: [] } }
    }

    return {
      text: trimmed.map((result) => `- ${result.title} (${result.type}) ${result.url}`).join("\n"),
      data: { query, locale: language, results: trimmed },
    }
  },
})

const listDocs = defineTool({
  name: "list_docs",
  title: "List the docs",
  description:
    "Every documentation page and guide for a language, with its slug, title, description, and URL. Slugs feed get_doc.",
  schema: z.object({ locale: localeInput }),
  async run({ locale }) {
    const language = resolveLocale(locale)
    const pages = source.getPages(language).map((page) => ({
      slug: page.slugs.join("/") || "index",
      title: page.data.title,
      description: page.data.description ?? null,
      url: docUrl(page.url),
    }))

    return {
      text: pages.map((page) => `- ${page.slug}: ${page.title}${page.description ? ` — ${page.description}` : ""}`).join("\n"),
      data: { locale: language, pages },
    }
  },
})

const getDoc = defineTool({
  name: "get_doc",
  title: "Read a doc page",
  description:
    "The full Markdown source of one documentation page. Pass a slug from list_docs or search_docs, for example 'trx' or 'guides/render-mermaid-cli'. Use 'index' for the docs home.",
  schema: z.object({
    slug: z.string().min(1).max(200).describe("Page slug without the /docs prefix, for example 'neon-cli'."),
    locale: localeInput,
  }),
  async run({ slug, locale }) {
    const language = resolveLocale(locale)
    const segments = slug.split("/").filter((segment) => segment.length > 0 && segment !== "index")
    const page = source.getPage(segments, language)

    if (!page) {
      const available = source
        .getPages(language)
        .map((candidate) => candidate.slugs.join("/") || "index")
        .join(", ")
      throw new Error(`No doc page at "${slug}" in ${language}. Available slugs: ${available}.`)
    }

    const markdown = await page.data.getText("processed")

    return {
      text: markdown,
      data: {
        slug: page.slugs.join("/") || "index",
        title: page.data.title,
        description: page.data.description ?? null,
        url: docUrl(page.url),
        locale: language,
        markdown,
      },
    }
  },
})

const listOssRepos = defineTool({
  name: "list_oss_repos",
  title: "List open source repos",
  description:
    "The Crafter Station open source catalog: repositories that accept outside contributors, with live star counts, open issue counts, primary language, and description.",
  schema: z.object({
    minStars: z.number().int().min(0).optional().describe("Only repos at or above this star count."),
  }),
  async run({ minStars }) {
    const repos = await getOssRepos()
    const filtered = minStars ? repos.filter((repo) => repo.stars >= minStars) : repos

    return {
      text: filtered
        .map((repo) => `- ${repo.repo} (${repo.stars} stars, ${repo.openIssues} open issues): ${repo.description ?? "no description"} ${repo.url}`)
        .join("\n"),
      data: {
        repos: filtered.map((repo) => ({
          repo: repo.repo,
          name: repo.name,
          url: repo.url,
          description: repo.description,
          stars: repo.stars,
          openIssues: repo.openIssues,
          language: repo.language,
        })),
      },
    }
  },
})

const listProducts = defineTool({
  name: "list_products",
  title: "List products",
  description:
    "Products built by Crafter Station, with tagline, description, live URL, source URL when open source, and headline metrics.",
  schema: z.object({
    locale: localeInput,
    openSource: z.boolean().optional().describe("Filter to open source products only, or to closed source only."),
  }),
  async run({ locale, openSource }) {
    const language = resolveLocale(locale)
    const filtered =
      openSource === undefined
        ? getProducts(language)
        : openSource
          ? getOpenSourceProducts(language)
          : getClosedProducts(language)
    const products = filtered.map(normalizeProduct)

    return {
      text: products.map((product) => `- ${product.title}: ${product.tagline} ${product.url}`).join("\n"),
      data: { locale: language, products },
    }
  },
})

const listTeam = defineTool({
  name: "list_team",
  title: "List the core team",
  description:
    "Crafter Station's core team: name, role, location, skills, public profile links, and profile URL on crafter.run.",
  schema: z.object({ locale: localeInput }),
  async run({ locale }) {
    const language = resolveLocale(locale)
    const members = teamMembers.map((member) => ({
      username: member.username,
      name: member.name,
      role: member.role,
      location: member.location ?? null,
      bio: member.bio[language],
      skills: member.skills,
      url: `${baseUrl}/${language}/team/${member.username}`,
      github: member.github ?? null,
      website: member.website ?? null,
    }))

    return {
      text: members.map((member) => `- ${member.name} (@${member.username}), ${member.role}${member.location ? `, ${member.location}` : ""}`).join("\n"),
      data: { locale: language, members },
    }
  },
})

const listShips = defineTool({
  name: "list_ships",
  title: "List community Ships",
  description:
    "Projects published to the Crafter Station community directory by its members, newest first. Live data from the public Ships API.",
  schema: z.object({
    limit: z.number().int().min(1).max(100).optional().describe("Maximum Ships to return. Defaults to 25."),
  }),
  async run({ limit }) {
    const ships = await listPublishedShips()
    if (!ships) throw new Error("The Ships API is unavailable right now. Retry, or read the directory at " + `${baseUrl}/en/ships.`)

    const trimmed = ships.slice(0, limit ?? 25)

    return {
      text: trimmed.map((ship) => `- ${ship.name}: ${ship.tagline} ${baseUrl}/en/ships/${ship.slug}`).join("\n"),
      data: { count: trimmed.length, total: ships.length, ships: trimmed },
    }
  },
})

const listCraftersTool = defineTool({
  name: "list_crafters",
  title: "List community members",
  description:
    "Members of the Crafter Station community directory, with handle, display name, role, and links. Live data from the public members API.",
  schema: z.object({
    limit: z.number().int().min(1).max(200).optional().describe("Maximum members to return. Defaults to 50."),
  }),
  async run({ limit }) {
    const members = await listCrafters()
    if (!members) throw new Error("The members API is unavailable right now. Retry, or read the directory at " + `${baseUrl}/en/crafters.`)

    const trimmed = members.slice(0, limit ?? 50).map((member) => ({
      ...member,
      url: `${baseUrl}/en/crafters/${member.handle}`,
    }))

    return {
      text: trimmed.map((member) => `- ${member.displayName} (@${member.handle})${member.currentRole ? `, ${member.currentRole}` : ""} ${member.url}`).join("\n"),
      data: { count: trimmed.length, total: members.length, members: trimmed },
    }
  },
})

export const tools = [
  searchDocs,
  listDocs,
  getDoc,
  listOssRepos,
  listProducts,
  listTeam,
  listShips,
  listCraftersTool,
  // Each entry carries its own input schema, so the registry is widened once
  // here rather than making every caller reason about eight distinct shapes.
] as unknown as Tool<z.ZodType>[]

export function describeTools() {
  return tools.map((tool) => ({
    name: tool.name,
    title: tool.title,
    description: tool.description,
    inputSchema: z.toJSONSchema(tool.schema, { io: "input" }),
    annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
  }))
}

export async function callTool(name: string, args: unknown) {
  const tool = tools.find((candidate) => candidate.name === name)
  if (!tool) throw new UnknownToolError(name)

  const parsed = tool.schema.safeParse(args ?? {})
  if (!parsed.success) {
    throw new InvalidToolInputError(parsed.error.issues.map((issue) => `${issue.path.join(".") || "input"}: ${issue.message}`).join("; "))
  }

  return tool.run(parsed.data)
}

export class UnknownToolError extends Error {
  constructor(name: string) {
    super(`Unknown tool "${name}". Call tools/list for the available tools.`)
    this.name = "UnknownToolError"
  }
}

export class InvalidToolInputError extends Error {
  constructor(detail: string) {
    super(`Invalid arguments. ${detail}`)
    this.name = "InvalidToolInputError"
  }
}

/**
 * Documents exposed as MCP resources. These are the same URLs a crawler can
 * fetch, listed here so a client that prefers resources over tools still finds
 * the whole picture in one call.
 */
export const resources = [
  {
    uri: `${baseUrl}/llms.txt`,
    name: "llms.txt",
    title: "Docs index",
    description: "Every documentation page and guide, one line each, across all five languages.",
    mimeType: "text/plain",
  },
  {
    uri: `${baseUrl}/llms-full.txt`,
    name: "llms-full.txt",
    title: "Full documentation",
    description: "The complete text of every documentation page, concatenated.",
    mimeType: "text/plain",
  },
  {
    uri: `${baseUrl}/agents.md`,
    name: "agents.md",
    title: "Agent guide",
    description: `How agents should read and act on ${siteConfig.domain}: endpoints, data shapes, and the authenticated write path.`,
    mimeType: "text/markdown",
  },
  {
    uri: `${baseUrl}/openapi.json`,
    name: "openapi.json",
    title: "OpenAPI description",
    description: "OpenAPI 3.1 description of the public read-only endpoints on crafter.run.",
    mimeType: "application/json",
  },
  {
    uri: `${baseUrl}/join/agent.md`,
    name: "join/agent.md",
    title: "Join instructions",
    description: "Step-by-step instructions for an agent helping a human create a Crafter Station profile and publish a Ship.",
    mimeType: "text/markdown",
  },
] as const

export async function readResource(uri: string) {
  const resource = resources.find((candidate) => candidate.uri === uri)
  if (!resource) throw new Error(`Unknown resource "${uri}". Call resources/list for the available resources.`)

  const response = await fetch(resource.uri, { next: { revalidate: 3600 } })
  if (!response.ok) throw new Error(`Could not read ${uri}: upstream returned ${response.status}.`)

  return { uri: resource.uri, mimeType: resource.mimeType, text: await response.text() }
}
