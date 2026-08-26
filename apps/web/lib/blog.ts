/**
 * Blog content loader.
 *
 * Posts are MDX files in `content/blog/<slug>.<locale>.mdx`, so a post ships
 * in the same pull request as the work it describes and is reviewed with it.
 * One file per locale keyed by the same slug: the URL is stable across
 * languages, which is what lets the post page build an honest hreflang
 * cluster from the slug alone.
 *
 * A post written in only some locales is normal. The post page exists only
 * where a file exists; the index in every locale still lists the post and
 * links to the best available language, labelled, so nothing 404s and no
 * empty page is ever published.
 *
 * Everything here runs at build time. Pages and route handlers that call it
 * are statically generated, so `readFileSync` never happens on a request path.
 */
import fs from "node:fs"
import path from "node:path"

import matter from "gray-matter"
import { z } from "zod"

import { defaultLocale, isLocale, locales, type Locale } from "@/lib/i18n"
import { localizedUrl } from "@/lib/seo"
import { getTeamMember, teamMembers, type TeamMember } from "@/lib/team"

/** Entries per index page. Also the size of the first page, which is the one
    that gets crawled and shared, so it should feel complete. */
export const POSTS_PER_PAGE = 20

const CONTENT_DIR = path.join(process.cwd(), "content", "blog")

/** `lastmod` floor for an empty blog; only reachable before the first post. */
const BLOG_EPOCH = "1970-01-01"

/** Display label only. Deliberately not a taxonomy: no per-kind routes, no
    filter pages, nothing extra for a crawler to spend budget on. */
export const BLOG_KINDS = ["engineering", "community", "product", "research"] as const
export type BlogKind = (typeof BLOG_KINDS)[number]

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/

/** Authors are team members, keyed by `username` in lib/team.ts. */
export type AuthorId = TeamMember["username"]

export function isAuthorId(value: string): value is AuthorId {
  return teamMembers.some((member) => member.username === value)
}

export function getAuthor(id: AuthorId): TeamMember {
  const member = getTeamMember(id)
  if (!member) throw new Error(`Unknown blog author "${id}". Add them to lib/team.ts.`)
  return member
}

const frontmatterSchema = z.object({
  title: z.string().min(1),
  summary: z.string().min(1),
  date: z.string().regex(ISO_DATE, "date must be YYYY-MM-DD"),
  updated: z.string().regex(ISO_DATE, "updated must be YYYY-MM-DD").optional(),
  /**
   * Hand-authored social card, overriding the generated one.
   *
   * A path under `public/` (`/og/blog/<slug>.jpg`) or an absolute URL. Must be
   * 1200x630: every consumer crops to that ratio. Omit it and the post gets the
   * generated card from `/og`, which is the right answer for almost every post.
   */
  image: z
    .string()
    .refine(
      (value) => value.startsWith("/") || value.startsWith("https://"),
      "image must be a root-relative path (/og/...) or an https:// URL",
    )
    .optional(),
  kind: z.enum(BLOG_KINDS),
  authors: z
    .array(z.string())
    .min(1)
    .refine((ids) => ids.every(isAuthorId), {
      message: "authors must be team usernames from lib/team.ts",
    }),
})

export type BlogPost = Omit<z.infer<typeof frontmatterSchema>, "authors"> & {
  authors: AuthorId[]
  slug: string
  locale: Locale
  /** MDX source with the frontmatter block removed. */
  body: string
}

/** `<slug>.<locale>.mdx`; the slug itself may not contain a dot. */
const FILENAME = /^([a-z0-9][a-z0-9-]*)\.([a-z]{2})\.mdx$/

/** Segments that already mean something under /blog. A post named `page`
    would be shadowed by the archive route; `sitemap` by the markdown index. */
const RESERVED_SLUGS = new Set(["page", "md", "sitemap", "rss", "feed", "atom"])

function readAll(): BlogPost[] {
  if (!fs.existsSync(CONTENT_DIR)) return []

  const posts: BlogPost[] = []

  for (const filename of fs.readdirSync(CONTENT_DIR).sort()) {
    if (!filename.endsWith(".mdx")) continue

    const match = FILENAME.exec(filename)
    if (!match) {
      throw new Error(
        `Blog file "${filename}" must be named <slug>.<locale>.mdx (lowercase slug, no dots).`,
      )
    }

    const [, slug, locale] = match as unknown as [string, string, string]
    if (RESERVED_SLUGS.has(slug)) {
      throw new Error(`Blog slug "${slug}" is reserved by a blog route; rename "${filename}".`)
    }
    if (!isLocale(locale)) {
      throw new Error(
        `Blog file "${filename}" targets locale "${locale}", which is not one of: ${locales.join(", ")}.`,
      )
    }

    const raw = fs.readFileSync(path.join(CONTENT_DIR, filename), "utf8")
    const { data, content } = matter(raw)
    const parsed = frontmatterSchema.safeParse(data)
    if (!parsed.success) {
      throw new Error(
        `Invalid frontmatter in "${filename}": ${parsed.error.issues
          .map((issue) => `${issue.path.join(".") || "(root)"} ${issue.message}`)
          .join("; ")}`,
      )
    }

    posts.push({
      ...parsed.data,
      authors: parsed.data.authors as AuthorId[],
      slug,
      locale,
      body: content.trim(),
    })
  }

  // Newest first, slug as the tiebreak so same-day posts keep a stable order
  // across builds. An unstable order would churn the sitemap and the feed.
  return posts.sort((a, b) =>
    a.date === b.date ? a.slug.localeCompare(b.slug) : b.date.localeCompare(a.date),
  )
}

// Read once per process. The dev server re-evaluates the module on change, so
// editing a post still shows up without a restart.
let cache: BlogPost[] | null = null

function allPosts(): BlogPost[] {
  cache ??= readAll()
  return cache
}

/** Every post written in one locale, newest first. */
export function getPosts(locale: Locale): BlogPost[] {
  return allPosts().filter((post) => post.locale === locale)
}

export function getPost(slug: string, locale: Locale): BlogPost | undefined {
  return allPosts().find((post) => post.slug === slug && post.locale === locale)
}

/** Distinct slugs, newest first. One entry per post regardless of translations. */
export function getSlugs(): string[] {
  return [...new Set(allPosts().map((post) => post.slug))]
}

/** Locales a given post is actually written in, in site order. */
export function postLocales(slug: string): Locale[] {
  const written = new Set(allPosts().filter((post) => post.slug === slug).map((post) => post.locale))
  return locales.filter((locale) => written.has(locale))
}

/**
 * The index for a locale: every post, in the reader's language when it exists
 * and otherwise in the default locale (or the first language it was written
 * in). Callers read `post.locale` to know which one they got and label it.
 */
export function getIndexPosts(locale: Locale): BlogPost[] {
  return getSlugs().flatMap((slug) => {
    const own = getPost(slug, locale)
    if (own) return [own]
    const fallback = getPost(slug, defaultLocale) ?? getPost(slug, postLocales(slug)[0]!)
    return fallback ? [fallback] : []
  })
}

/**
 * hreflang cluster for one post: only the languages it is written in, so a
 * crawler is never sent to a URL that 404s. `x-default` follows the site's
 * default locale when the post has it, and the first written language otherwise.
 */
export function postLanguageAlternates(slug: string): Record<string, string> {
  const written = postLocales(slug)
  const fallback = written.includes(defaultLocale) ? defaultLocale : written[0]!
  return {
    ...Object.fromEntries(written.map((locale) => [locale, localizedUrl(`/blog/${slug}`, locale)])),
    "x-default": localizedUrl(`/blog/${slug}`, fallback),
  }
}

/** Newest publication date across all posts, for the sitemap `lastmod`. */
export function blogUpdated(): string {
  const dates = allPosts().map((post) => post.updated ?? post.date)
  return dates.sort().at(-1) ?? BLOG_EPOCH
}

export function pageCount(locale: Locale): number {
  return Math.max(1, Math.ceil(getIndexPosts(locale).length / POSTS_PER_PAGE))
}

/** 1-indexed slice of the index, matching the `/blog/page/2` URL. */
export function getPage(locale: Locale, page: number): BlogPost[] {
  const start = (page - 1) * POSTS_PER_PAGE
  return getIndexPosts(locale).slice(start, start + POSTS_PER_PAGE)
}
