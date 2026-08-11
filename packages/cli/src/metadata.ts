import { shipDraftInputSchema, type ShipDraftInput } from "@crafter/contracts"

type MetadataSources = {
  packageJson?: unknown
  readme?: string
  shipConfig?: unknown
  gitRemote?: string
}

type JsonObject = Record<string, unknown>

function object(value: unknown): JsonObject {
  return value !== null && typeof value === "object" && !Array.isArray(value) ? (value as JsonObject) : {}
}

function text(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined
}

function slugify(value: string): string {
  return value
    .replace(/^@[^/]+\//, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80)
}

function repositoryUrl(value: unknown): string | undefined {
  const raw = text(value) ?? text(object(value).url)
  if (!raw) return undefined
  const normalized = raw
    .replace(/^git\+/, "")
    .replace(/^git@github\.com:/, "https://github.com/")
    .replace(/\.git$/, "")
  return normalized.startsWith("http://") || normalized.startsWith("https://") ? normalized : undefined
}

function readmeSummary(readme?: string): string | undefined {
  if (!readme) return undefined
  const paragraph = readme
    .replace(/```[\s\S]*?```/g, "")
    .split(/\n\s*\n/)
    .map((part) => part.replace(/^#+\s+.*$/gm, "").replace(/\[([^\]]+)\]\([^)]*\)/g, "$1").trim())
    .find((part) => part.length >= 20)
  return paragraph?.replace(/\s+/g, " ")
}

export function inferShipMetadata(sources: MetadataSources): ShipDraftInput {
  const pkg = object(sources.packageJson)
  const explicit = object(sources.shipConfig)
  const packageName = text(pkg.name)
  const name = text(explicit.name) ?? packageName?.replace(/^@[^/]+\//, "") ?? ""
  const packageDescription = text(pkg.description)
  const summary = readmeSummary(sources.readme)
  const repo = repositoryUrl(explicit.repository) ?? repositoryUrl(pkg.repository) ?? repositoryUrl(sources.gitRemote)
  const homepage = text(pkg.homepage)
  const inferredLinks = [repo && { type: "repository", url: repo }, homepage && { type: "website", url: homepage }].filter(Boolean)
  return shipDraftInputSchema.parse({
    slug: text(explicit.slug) ?? slugify(name),
    name,
    tagline: text(explicit.tagline) ?? packageDescription ?? summary?.slice(0, 180) ?? "",
    description: text(explicit.description) ?? summary ?? packageDescription ?? "",
    source: "cli",
    links: explicit.links ?? inferredLinks,
    provenance: explicit.provenance ?? [
      packageName && "package.json",
      sources.readme && "README.md",
      sources.gitRemote && "git remote.origin.url",
      sources.shipConfig && "crafter.ship.json",
    ].filter(Boolean),
  })
}
