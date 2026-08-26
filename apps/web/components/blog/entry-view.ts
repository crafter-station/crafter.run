/**
 * The index's data shape, kept free of `node:fs`.
 *
 * `components/blog/entry-list.tsx` is a client component and imports from
 * here; `components/blog/format.ts` builds these values on the server and
 * pulls in the content loader to do it. Splitting the shape from the builder
 * is what keeps the loader (and the filesystem) out of the browser bundle.
 */
import type { BlogKind } from "@/lib/blog"
import type { Locale } from "@/lib/i18n"

/** An author as the bylines need them: resolved, with a profile path and an
    initial ready to paint when there is no portrait. */
export type EntryAuthor = {
  id: string
  name: string
  role: string
  initials: string
  avatar: string
  /** Locale-relative profile path, `/team/<username>`. */
  path: string
}

/**
 * A post flattened for the index.
 *
 * The index list owns the filter and search state on the client, so
 * everything it renders has to survive the serialization boundary: dates
 * arrive pre-formatted rather than as an `Intl` call, and authors arrive
 * resolved rather than as ids.
 */
export type EntryView = {
  slug: string
  /** Locale the post is written in; differs from the page's when the index
      fell back to another language. */
  locale: Locale
  href: string
  title: string
  summary: string
  kind: BlogKind
  kindLabel: string
  /** Machine-readable date for `<time datetime>`. */
  date: string
  dateLong: string
  dateShort: string
  reading: string
  authors: EntryAuthor[]
  byline: string
  /** Set when the entry is rendered in a language other than the page's. */
  languageNote?: string
}

/** Entries bucketed by publication day, preserving the newest-first order they
    arrive in. One bucket is one rung of the timeline. */
export function groupByDate(entries: EntryView[]) {
  const groups: { date: string; long: string; short: string; entries: EntryView[] }[] = []

  for (const entry of entries) {
    const last = groups.at(-1)
    if (last?.date === entry.date) {
      last.entries.push(entry)
      continue
    }
    groups.push({ date: entry.date, long: entry.dateLong, short: entry.dateShort, entries: [entry] })
  }

  return groups
}
