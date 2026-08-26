import { notFound } from "next/navigation"

import { blogCopy } from "@/components/blog/copy"
import { getAuthor, getIndexPosts } from "@/lib/blog"
import { blogFeedPath, blogPath, blogPostPath } from "@/lib/blog-paths"
import { isLocale, locales, type Locale } from "@/lib/i18n"
import { baseUrl } from "@/lib/seo"
import { siteConfig } from "@/lib/site"

/**
 * Atom 1.0 feed, one per locale.
 *
 * Atom rather than RSS 2.0 because it requires a real timestamp (`updated`)
 * instead of RSS's optional pubDate, and it distinguishes summary from
 * content, so a reader can show the abstract and still have the full post.
 * The file is named `rss.xml` anyway, because that is what people type;
 * `feed.xml` and `atom.xml` rewrite to it in next.config.mjs.
 *
 * Entries carry the markdown body as their content. A feed that only links
 * back is a notification; one that carries the post is readable offline and
 * by an agent that will not make a second request.
 */

export const dynamic = "force-static"
export const dynamicParams = false

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

/** XML text-node escaping. Ampersand first, or it double-escapes the rest. */
function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}

function instant(date: string): string {
  return `${date}T00:00:00Z`
}

function buildFeed(locale: Locale): string {
  // The index list, not only the locale's own posts: a reader subscribed in a
  // language with no translation yet still hears about every post, each entry
  // tagged with the language it is actually in.
  const posts = getIndexPosts(locale)
  const t = blogCopy[locale].feed
  const indexUrl = `${baseUrl}${blogPath(locale)}`
  const selfUrl = `${baseUrl}${blogFeedPath(locale)}`

  // A feed's `updated` must not be older than its newest entry; with no
  // entries there is nothing to date it from, so fall back to the epoch
  // rather than to "now", which would churn the file on every build.
  const updated = instant(posts.map((post) => post.updated ?? post.date).sort().at(-1) ?? "1970-01-01")

  const entries = posts.map((post) => {
    const url = `${baseUrl}${blogPostPath(post.locale, post.slug)}`
    const authors = post.authors
      .map((id) => `    <author><name>${escapeXml(getAuthor(id).name)}</name></author>`)
      .join("\n")

    return [
      `  <entry xml:lang="${post.locale}">`,
      `    <id>${escapeXml(url)}</id>`,
      `    <title>${escapeXml(post.title)}</title>`,
      `    <link rel="alternate" type="text/html" href="${escapeXml(url)}"/>`,
      `    <link rel="alternate" type="text/markdown" href="${escapeXml(url)}.md"/>`,
      `    <published>${instant(post.date)}</published>`,
      `    <updated>${instant(post.updated ?? post.date)}</updated>`,
      `    <category term="${escapeXml(post.kind)}"/>`,
      authors,
      `    <summary type="text">${escapeXml(post.summary)}</summary>`,
      `    <content type="text">${escapeXml(post.body)}</content>`,
      "  </entry>",
    ].join("\n")
  })

  return [
    '<?xml version="1.0" encoding="utf-8"?>',
    `<feed xmlns="http://www.w3.org/2005/Atom" xml:lang="${locale}">`,
    `  <id>${escapeXml(indexUrl)}</id>`,
    `  <title>${escapeXml(t.title)}</title>`,
    `  <subtitle>${escapeXml(t.subtitle)}</subtitle>`,
    `  <updated>${updated}</updated>`,
    `  <link rel="self" type="application/atom+xml" href="${escapeXml(selfUrl)}"/>`,
    `  <link rel="alternate" type="text/html" href="${escapeXml(indexUrl)}"/>`,
    "  <author>",
    `    <name>${escapeXml(siteConfig.name)}</name>`,
    `    <uri>${escapeXml(baseUrl)}</uri>`,
    "  </author>",
    ...entries,
    "</feed>",
    "",
  ].join("\n")
}

export async function GET(_request: Request, { params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()

  return new Response(buildFeed(lang), {
    headers: {
      "Content-Type": "application/atom+xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  })
}
