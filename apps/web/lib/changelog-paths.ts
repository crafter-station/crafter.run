/**
 * URL shapes for the changelog and its machine-readable surfaces.
 *
 * Referenced from page heads, visible links, `proxy.ts` and the route
 * handlers, so they are defined once here. Must stay free of `node:fs`:
 * `proxy.ts` imports it.
 */
import type { Locale } from "@/lib/i18n"

/** Internal segment behind the `.md` twin; reached by rewrite, never linked. */
export const CHANGELOG_MARKDOWN_SEGMENT = "md"

/** Matches `/{locale}/changelog/{slug}` and nothing deeper. */
export const CHANGELOG_ENTRY_PATH = /^\/([a-z]{2})\/changelog\/([a-z0-9][a-z0-9-]*)$/

export function changelogPath(locale: Locale): string {
  return `/${locale}/changelog`
}

export function changelogEntryPath(locale: Locale, slug: string): string {
  return `/${locale}/changelog/${slug}`
}

export function changelogFeedPath(locale: Locale): string {
  return `/${locale}/changelog/rss.xml`
}

export function changelogSitemapMdPath(locale: Locale): string {
  return `/${locale}/changelog/sitemap.md`
}

export function changelogEntryMarkdownPath(locale: Locale, slug: string): string {
  return `${changelogEntryPath(locale, slug)}.md`
}

export function changelogEntryMarkdownRoute(locale: Locale, slug: string): string {
  return `/${locale}/changelog/${CHANGELOG_MARKDOWN_SEGMENT}/${slug}`
}
