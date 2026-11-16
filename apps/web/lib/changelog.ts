/**
 * Changelog content loader.
 *
 * Entries are MDX files in `content/changelog/<YYYY-MM-DD>-<slug>.<locale>.mdx`
 * and exist only in `en` and `es`. The date in the filename is the sort key and
 * must equal the frontmatter `date`; the URL is `/changelog/<slug>`, stable
 * across languages. Every locale's index lists every entry and links to the
 * best available language, the same contract as the blog.
 *
 * Validation is strict on purpose: an unknown or alumni crafter, a dangling
 * cover, a slug reused on another day, or a date that differs between locales
 * throws while the module loads, which fails the build rather than publishing
 * a quietly wrong entry.
 */
import fs from "node:fs"
import path from "node:path"

import matter from "gray-matter"
import { z } from "zod"

import { defaultLocale, locales, type Locale } from "@/lib/i18n"
import { localizedUrl } from "@/lib/seo"
import { getTeamMember, type TeamMember } from "@/lib/team"

export const CHANGELOG_LOCALES = ["en", "es"] as const satisfies readonly Locale[]
export type ChangelogLocale = (typeof CHANGELOG_LOCALES)[number]

export const CHANGELOG_AREAS = ["research", "lab", "games", "station"] as const
export type ChangelogArea = (typeof CHANGELOG_AREAS)[number]

export const CHANGELOG_KINDS = ["ship", "update", "event", "roundup"] as const
export type ChangelogKind = (typeof CHANGELOG_KINDS)[number]

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/
const FILENAME = /^(\d{4}-\d{2}-\d{2})-([a-z0-9][a-z0-9-]*)\.([a-z]{2})\.mdx$/

/** Segments that already mean something under /changelog. */
const RESERVED_SLUGS = new Set(["md", "sitemap", "rss", "feed", "atom"])

const https = z.string().url().refine((value) => value.startsWith("https://"), "must be an https:// URL")

/** The crafters a changelog can credit: members of lib/team.ts who are not alumni. */
export function isCrafterId(value: string): boolean {
  const member = getTeamMember(value)
  return Boolean(member && !member.alumni)
}

const frontmatterSchema = z.object({
  title: z.string().min(1),
  summary: z.string().min(1),
  date: z.string().regex(ISO_DATE, "date must be YYYY-MM-DD"),
  /** Tie-break within a day, highest first. Keep identical across locales. */
  order: z.number().int().optional(),
  area: z.enum(CHANGELOG_AREAS),
  kind: z.enum(CHANGELOG_KINDS),
  crafters: z.array(z.string()).superRefine((ids, ctx) => {
    for (const id of ids) {
      const member = getTeamMember(id)
      if (!member) {
        ctx.addIssue({ code: "custom", message: `unknown crafter "${id}"; usernames come from lib/team.ts` })
      } else if (member.alumni) {
        ctx.addIssue({ code: "custom", message: `crafter "${id}" is alumni and cannot be credited` })
      }
    }
  }),
  ships: z.array(z.string().regex(/^[a-z0-9][a-z0-9-]*$/, "ships are /ships slugs")).optional(),
  repos: z.array(z.string().regex(/^[\w.-]+\/[\w.-]+$/, 'repos are "org/name"')).optional(),
  links: z.array(z.object({ label: z.string().min(1), url: https })).optional(),
  image: z.string().startsWith("/", "image must be a root-relative path").optional(),
  video: z.string().startsWith("/", "video must be a root-relative path").optional(),
  evidence: z.array(https),
})

export type ChangelogEntry = Omit<z.infer<typeof frontmatterSchema>, "crafters"> & {
  crafters: TeamMember["username"][]
  slug: string
  locale: ChangelogLocale
  /** MDX source with the frontmatter block removed. */
  body: string
}

/**
 * Parses and validates one entry. Pure apart from the optional `assetExists`
 * check, so tests can exercise every rule without touching the filesystem.
 */
export function parseEntry(
  filename: string,
  raw: string,
  assetExists: (publicPath: string) => boolean = () => true,
): ChangelogEntry {
  const match = FILENAME.exec(filename)
  if (!match) {
    throw new Error(
      `Changelog file "${filename}" must be named <YYYY-MM-DD>-<slug>.<locale>.mdx (lowercase slug, no dots).`,
    )
  }
  const [, fileDate, slug, locale] = match as unknown as [string, string, string, string]

  if (RESERVED_SLUGS.has(slug)) {
    throw new Error(`Changelog slug "${slug}" is reserved by a changelog route; rename "${filename}".`)
  }
  if (!(CHANGELOG_LOCALES as readonly string[]).includes(locale)) {
    throw new Error(
      `Changelog file "${filename}" targets locale "${locale}"; entries exist only in ${CHANGELOG_LOCALES.join(", ")}.`,
    )
  }

  const { data, content } = matter(raw)
  // YAML reads an unquoted `date: 2026-11-15` as a Date at UTC midnight.
  if (data.date instanceof Date) data.date = data.date.toISOString().slice(0, 10)
  const parsed = frontmatterSchema.safeParse(data)
  if (!parsed.success) {
    throw new Error(
      `Invalid frontmatter in "${filename}": ${parsed.error.issues
        .map((issue) => `${issue.path.join(".") || "(root)"} ${issue.message}`)
        .join("; ")}`,
    )
  }
  if (parsed.data.date !== fileDate) {
    throw new Error(`"${filename}": frontmatter date ${parsed.data.date} does not match the filename date ${fileDate}.`)
  }
  for (const asset of [parsed.data.image, parsed.data.video]) {
    if (asset && !assetExists(asset)) {
      throw new Error(`"${filename}" references ${asset}, which does not exist under public/.`)
    }
  }

  return {
    ...parsed.data,
    crafters: parsed.data.crafters,
    slug,
    locale: locale as ChangelogLocale,
    body: content.trim(),
  }
}

/** Sorts newest first, then `order` (highest first), then slug for stability. */
export function sortEntries<T extends { date: string; order?: number; slug: string }>(entries: T[]): T[] {
  return entries.sort((a, b) => {
    if (a.date !== b.date) return b.date.localeCompare(a.date)
    if ((a.order ?? 0) !== (b.order ?? 0)) return (b.order ?? 0) - (a.order ?? 0)
    return a.slug.localeCompare(b.slug)
  })
}

/** Cross-file rules: a slug is one entry, so its locales must agree on when. */
export function assertConsistent(entries: readonly ChangelogEntry[]): void {
  const bySlug = new Map<string, ChangelogEntry>()
  for (const entry of entries) {
    const first = bySlug.get(entry.slug)
    if (!first) {
      bySlug.set(entry.slug, entry)
      continue
    }
    if (first.date !== entry.date) {
      throw new Error(
        `Changelog slug "${entry.slug}" has date ${first.date} in ${first.locale} and ${entry.date} in ${entry.locale}.`,
      )
    }
    if ((first.order ?? 0) !== (entry.order ?? 0)) {
      throw new Error(`Changelog slug "${entry.slug}" has a different order in ${first.locale} and ${entry.locale}.`)
    }
  }
}

function contentDir(): string {
  // `bun test` runs from the repo root; Next runs from apps/web.
  const here = path.join(process.cwd(), "content", "changelog")
  return fs.existsSync(here) ? here : path.join(process.cwd(), "apps", "web", "content", "changelog")
}

function publicDir(): string {
  const here = path.join(process.cwd(), "public")
  return fs.existsSync(here) ? here : path.join(process.cwd(), "apps", "web", "public")
}

function readAll(): ChangelogEntry[] {
  const dir = contentDir()
  if (!fs.existsSync(dir)) return []

  const entries = fs
    .readdirSync(dir)
    .sort()
    .filter((filename) => filename.endsWith(".mdx"))
    .map((filename) =>
      parseEntry(filename, fs.readFileSync(path.join(dir, filename), "utf8"), (asset) =>
        fs.existsSync(path.join(publicDir(), asset)),
      ),
    )

  assertConsistent(entries)
  return sortEntries(entries)
}

// Read once per process; the dev server re-evaluates the module on change.
let cache: ChangelogEntry[] | null = null

function allEntries(): ChangelogEntry[] {
  cache ??= readAll()
  return cache
}

export function getEntries(locale: Locale): ChangelogEntry[] {
  return allEntries().filter((entry) => entry.locale === locale)
}

export function getEntry(slug: string, locale: Locale): ChangelogEntry | undefined {
  return allEntries().find((entry) => entry.slug === slug && entry.locale === locale)
}

/** Distinct slugs, newest first. */
export function getSlugs(): string[] {
  return [...new Set(allEntries().map((entry) => entry.slug))]
}

export function entryLocales(slug: string): Locale[] {
  const written = new Set(allEntries().filter((entry) => entry.slug === slug).map((entry) => entry.locale))
  return locales.filter((locale) => written.has(locale as ChangelogLocale))
}

/** Every entry in the reader's language when it exists, else in the default one. */
export function getIndexEntries(locale: Locale): ChangelogEntry[] {
  return getSlugs().flatMap((slug) => {
    const own = getEntry(slug, locale)
    if (own) return [own]
    const fallback = getEntry(slug, defaultLocale) ?? getEntry(slug, entryLocales(slug)[0]!)
    return fallback ? [fallback] : []
  })
}

export function filterByArea<T extends { area: ChangelogArea }>(entries: readonly T[], area: ChangelogArea | undefined): T[] {
  return area ? entries.filter((entry) => entry.area === area) : [...entries]
}

export function parseArea(value: string | string[] | undefined): ChangelogArea | undefined {
  const first = Array.isArray(value) ? value[0] : value
  return (CHANGELOG_AREAS as readonly string[]).includes(first ?? "") ? (first as ChangelogArea) : undefined
}

/** Neighbours in the unfiltered timeline: `newer` is the one above, `older` the one below. */
export function getNeighbors(slug: string, locale: Locale) {
  const list = getIndexEntries(locale)
  const index = list.findIndex((entry) => entry.slug === slug)
  return { newer: index > 0 ? list[index - 1] : undefined, older: index >= 0 ? list[index + 1] : undefined }
}

export function entryLanguageAlternates(slug: string): Record<string, string> {
  const written = entryLocales(slug)
  const fallback = written.includes(defaultLocale) ? defaultLocale : written[0]!
  return {
    ...Object.fromEntries(written.map((locale) => [locale, localizedUrl(`/changelog/${slug}`, locale)])),
    "x-default": localizedUrl(`/changelog/${slug}`, fallback),
  }
}

export function changelogUpdated(): string {
  return allEntries().map((entry) => entry.date).sort().at(-1) ?? "1970-01-01"
}

/** Crafter ids that appear in at least one entry, for display. */
export function crafterMember(id: string): TeamMember {
  const member = getTeamMember(id)
  if (!member) throw new Error(`Unknown crafter "${id}".`)
  return member
}
