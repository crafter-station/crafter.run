import { z } from "zod"

export const CHANGELOG_AREAS = ["research", "lab", "games", "station"] as const
export type ChangelogArea = (typeof CHANGELOG_AREAS)[number]

export const CHANGELOG_KINDS = ["ship", "update", "event", "roundup"] as const
export type ChangelogKind = (typeof CHANGELOG_KINDS)[number]

export const CHANGELOG_LOCALES = ["en", "es"] as const
export type ChangelogLocale = (typeof CHANGELOG_LOCALES)[number]

export const CHANGELOG_SLUG = /^[a-z0-9][a-z0-9-]*$/
/** Segments that already mean something under /changelog. */
export const CHANGELOG_RESERVED_SLUGS: ReadonlySet<string> = new Set(["md", "sitemap", "rss", "feed", "atom"])
export const CHANGELOG_ISO_DATE = /^\d{4}-\d{2}-\d{2}$/

const https = z.string().url().refine((value) => value.startsWith("https://"), "must be an https:// URL")

/**
 * Frontmatter of a changelog entry. Rules that need the team roster or the
 * filesystem (known crafters, alumni, files on disk) live in the web loader.
 */
export const changelogFrontmatterSchema = z.object({
  title: z.string().min(1),
  summary: z.string().min(1),
  date: z.string().regex(CHANGELOG_ISO_DATE, "date must be YYYY-MM-DD"),
  /** Tie-break within a day, highest first. Keep identical across locales. */
  order: z.number().int().optional(),
  area: z.enum(CHANGELOG_AREAS),
  kind: z.enum(CHANGELOG_KINDS),
  crafters: z.array(z.string()),
  ships: z.array(z.string().regex(CHANGELOG_SLUG, "ships are /ships slugs")).optional(),
  repos: z.array(z.string().regex(/^[\w.-]+\/[\w.-]+$/, 'repos are "org/name"')).optional(),
  links: z.array(z.object({ label: z.string().min(1), url: https })).optional(),
  image: z.string().startsWith("/", "image must be a root-relative path").optional(),
  video: z.string().startsWith("/", "video must be a root-relative path").optional(),
  evidence: z.array(https),
})
export type ChangelogFrontmatter = z.infer<typeof changelogFrontmatterSchema>
