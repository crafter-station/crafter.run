/**
 * URL shapes for the blog's machine-readable surfaces.
 *
 * Referenced from the page head, the visible feed link, the proxy that
 * negotiates markdown, and the route handlers themselves, so they are defined
 * once here. Deliberately outside `lib/seo.ts`: `indexablePaths` describes
 * HTML pages, and a feed or a markdown rendering is neither a page nor
 * something that belongs in the sitemap.
 *
 * This module must stay free of `node:fs`: `proxy.ts` imports it.
 */
import type { Locale } from "@/lib/i18n"

/** Path segment that serves a post as markdown. Internal: reached by rewrite
    from `/{locale}/blog/{slug}.md`, never linked as itself. */
export const BLOG_MARKDOWN_SEGMENT = "md"

/** Matches `/{locale}/blog/{slug}` and nothing deeper. */
export const BLOG_POST_PATH = /^\/([a-z]{2})\/blog\/([a-z0-9][a-z0-9-]*)$/

export function blogPath(locale: Locale): string {
  return `/${locale}/blog`
}

export function blogPostPath(locale: Locale, slug: string): string {
  return `/${locale}/blog/${slug}`
}

export function blogPagePath(locale: Locale, page: number): string {
  return page === 1 ? blogPath(locale) : `/${locale}/blog/page/${page}`
}

/** Atom feed for a locale. Named rss.xml because that is what people type. */
export function blogFeedPath(locale: Locale): string {
  return `/${locale}/blog/rss.xml`
}

/** Agent-facing index of every post, as markdown. */
export function blogSitemapMdPath(locale: Locale): string {
  return `/${locale}/blog/sitemap.md`
}

/** The `.md` twin a reader or agent appends to a post URL. */
export function blogPostMarkdownPath(locale: Locale, slug: string): string {
  return `${blogPostPath(locale, slug)}.md`
}

/** Rewrite target backing the `.md` twin and `Accept: text/markdown`. */
export function blogPostMarkdownRoute(locale: Locale, slug: string): string {
  return `/${locale}/blog/${BLOG_MARKDOWN_SEGMENT}/${slug}`
}
