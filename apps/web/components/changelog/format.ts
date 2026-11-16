/**
 * Locale-aware shaping of changelog entries for the pages. Server-only: it
 * reaches into the loader, which reads the filesystem.
 */
import { dateLabel, dateLabelShort, initials, INTL_LOCALE } from "@/components/blog/format"
import type { EntryAuthor } from "@/components/blog/entry-view"
import { crafterMember, type ChangelogArea, type ChangelogEntry, type ChangelogKind } from "@/lib/changelog"
import { changelogEntryPath } from "@/lib/changelog-paths"
import type { Locale } from "@/lib/i18n"

export type ChangelogView = {
  slug: string
  locale: Locale
  href: string
  title: string
  summary: string
  date: string
  dateLong: string
  dateShort: string
  area: ChangelogArea
  kind: ChangelogKind
  image?: string
  video?: string
  crafters: EntryAuthor[]
  byline: string
  ships: string[]
  repos: string[]
  /** Set when the entry is rendered in a language other than the page's. */
  entryLocale?: Locale
}

export function crafterAuthors(ids: readonly string[]): EntryAuthor[] {
  return ids.map((id) => {
    const member = crafterMember(id)
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

/** "A", "A and B", "A, B and C" with the locale's conjunction. */
export function crafterByline(ids: readonly string[], locale: Locale): string {
  const names = ids.map((id) => crafterMember(id).name)
  const and = { en: " and ", es: " y ", pt: " e ", zh: "和", ja: "、" }[locale]
  if (names.length <= 1) return names.join("")
  if (locale === "ja") return names.join(and)
  return `${names.slice(0, -1).join(", ")}${and}${names.at(-1)}`
}

export function toView(entry: ChangelogEntry, locale: Locale): ChangelogView {
  return {
    slug: entry.slug,
    locale: entry.locale,
    href: changelogEntryPath(entry.locale, entry.slug),
    title: entry.title,
    summary: entry.summary,
    date: entry.date,
    dateLong: dateLabel(entry.date, locale),
    dateShort: dateLabelShort(entry.date, locale),
    area: entry.area,
    kind: entry.kind,
    ...(entry.image ? { image: entry.image } : {}),
    ...(entry.video ? { video: entry.video } : {}),
    crafters: crafterAuthors(entry.crafters),
    byline: crafterByline(entry.crafters, locale),
    ships: entry.ships ?? [],
    repos: entry.repos ?? [],
    ...(entry.locale !== locale ? { entryLocale: entry.locale } : {}),
  }
}

/** Entries bucketed by calendar month, preserving newest-first order. */
export function groupByMonth(views: readonly ChangelogView[], locale: Locale) {
  const format = new Intl.DateTimeFormat(INTL_LOCALE[locale], { month: "long", year: "numeric", timeZone: "UTC" })
  const groups: { key: string; label: string; entries: ChangelogView[] }[] = []
  for (const view of views) {
    const key = view.date.slice(0, 7)
    const last = groups.at(-1)
    if (last?.key === key) {
      last.entries.push(view)
      continue
    }
    groups.push({ key, label: format.format(new Date(`${view.date}T12:00:00Z`)), entries: [view] })
  }
  return groups
}

/** Readable label for an evidence URL: host and path without the scheme. */
export function evidenceLabel(url: string): string {
  const parsed = new URL(url)
  return `${parsed.host}${parsed.pathname}`.replace(/\/$/, "")
}
