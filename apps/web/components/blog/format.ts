/**
 * Locale-aware labels for the blog: dates, reading time, bylines, and the
 * builder for the flattened entry shape in `entry-view.ts`. Server-only: it
 * reaches into the content loader, which reads the filesystem.
 *
 * Formatters are built once per locale and reused; constructing an
 * Intl.DateTimeFormat per row is the usual quiet cost in a list view.
 *
 * Dates are authored as calendar days with no timezone. Parsing them at midday
 * UTC keeps the rendered day identical in every timezone the site is read
 * from, where `new Date("2026-08-09")` would roll back a day west of Greenwich.
 */
import { blogCopy } from "@/components/blog/copy"
import { getAuthor, type AuthorId, type BlogPost } from "@/lib/blog"
import { blogPostPath } from "@/lib/blog-paths"
import type { EntryAuthor, EntryView } from "@/components/blog/entry-view"
import type { Locale } from "@/lib/i18n"

export const INTL_LOCALE: Record<Locale, string> = {
  en: "en-US",
  es: "es-ES",
  pt: "pt-BR",
  zh: "zh-CN",
  ja: "ja-JP",
}

const cache = new Map<string, Intl.DateTimeFormat>()

function formatter(locale: Locale, month: "long" | "short"): Intl.DateTimeFormat {
  const key = `${INTL_LOCALE[locale]}:${month}`
  let existing = cache.get(key)
  if (!existing) {
    existing = new Intl.DateTimeFormat(INTL_LOCALE[locale], {
      day: "numeric",
      month,
      year: "numeric",
      timeZone: "UTC",
    })
    cache.set(key, existing)
  }
  return existing
}

function instant(iso: string): Date {
  return new Date(`${iso}T12:00:00Z`)
}

/** "2026-08-09" → "August 9, 2026" (en) / "9 de agosto de 2026" (es). */
export function dateLabel(iso: string, locale: Locale): string {
  return formatter(locale, "long").format(instant(iso))
}

/**
 * Same day, abbreviated: "Aug 9 2026" / "9 ago 2026".
 *
 * Built from parts rather than formatted whole because Spanish's short form is
 * "9 de ago de 2026", barely shorter than the long one and still too wide for
 * the narrow date column on a phone. Dropping the literals keeps the locale's
 * field order and month name while losing only the connectives.
 */
export function dateLabelShort(iso: string, locale: Locale): string {
  return formatter(locale, "short")
    .formatToParts(instant(iso))
    .filter((part) => part.type === "day" || part.type === "month" || part.type === "year")
    // Some locales abbreviate with a trailing period ("sept."), which reads as
    // a sentence break once the connectives are gone.
    .map((part) => part.value.replace(/\.$/, ""))
    .join(" ")
}

/**
 * Reading time in whole minutes, floored at one.
 *
 * Counts the MDX source as written, code fences and all: a reader still has
 * to work through a code block. CJK has no word boundaries to split on, so
 * those locales count characters at a conventional 400 per minute.
 */
export function readingMinutes(body: string, locale: Locale): number {
  const text = body.trim()
  const units =
    locale === "zh" || locale === "ja"
      ? text.replace(/\s+/g, "").length / 400
      : text.split(/\s+/).filter(Boolean).length / 200
  return Math.max(1, Math.round(units))
}

/** "A", "A and B", "A, B and C", with the locale's own conjunction. */
export function byline(ids: readonly AuthorId[], locale: Locale): string {
  const names = ids.map((id) => getAuthor(id).name)
  const and = { en: " and ", es: " y ", pt: " e ", zh: "和", ja: "、" }[locale]
  if (names.length <= 1) return names.join("")
  if (locale === "ja") return names.join(and)
  return `${names.slice(0, -1).join(", ")}${and}${names.at(-1)}`
}

export function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]!.toUpperCase())
    .join("")
}

export function entryAuthors(post: BlogPost): EntryAuthor[] {
  return post.authors.map((id) => {
    const member = getAuthor(id)
    return {
      id,
      name: member.name,
      role: member.role,
      initials: initials(member.name),
      avatar: member.image,
      path: `/team/${member.username}`,
    }
  })
}

export function toEntryViews(posts: readonly BlogPost[], locale: Locale): EntryView[] {
  const t = blogCopy[locale]
  return posts.map((post) => ({
    slug: post.slug,
    locale: post.locale,
    href: blogPostPath(post.locale, post.slug),
    title: post.title,
    summary: post.summary,
    kind: post.kind,
    kindLabel: t.kinds[post.kind],
    date: post.date,
    dateLong: dateLabel(post.date, locale),
    dateShort: dateLabelShort(post.date, locale),
    reading: t.readingTime(readingMinutes(post.body, post.locale)),
    authors: entryAuthors(post),
    byline: byline(post.authors, locale),
    ...(post.locale !== locale
      ? { languageNote: `${t.availableIn} ${t.languages[post.locale]}` }
      : {}),
  }))
}
