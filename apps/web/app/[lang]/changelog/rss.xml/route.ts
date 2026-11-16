import { notFound } from "next/navigation"
import { getTranslations } from "next-intl/server"

import { crafterMember, getIndexEntries } from "@/lib/changelog"
import { changelogEntryPath, changelogFeedPath, changelogPath } from "@/lib/changelog-paths"
import { isLocale, locales, type Locale } from "@/lib/i18n"
import { baseUrl } from "@/lib/seo"
import { siteConfig } from "@/lib/site"

/**
 * Atom 1.0 feed of the changelog, one per locale. Mirrors the blog feed:
 * entries carry the markdown body as content, and the feed lists every entry
 * in the reader's language when it exists, else in English, each tagged with
 * the language it is actually in. `feed.xml` and `atom.xml` rewrite here.
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

const instant = (date: string) => `${date}T00:00:00Z`

function buildFeed(locale: Locale, title: string, subtitle: string): string {
  const entries = getIndexEntries(locale)
  const indexUrl = `${baseUrl}${changelogPath(locale)}`
  const selfUrl = `${baseUrl}${changelogFeedPath(locale)}`
  // With no entries there is nothing to date the feed from; the epoch beats
  // "now", which would churn the file on every build.
  const updated = instant(entries.map((entry) => entry.date).sort().at(-1) ?? "1970-01-01")

  const items = entries.map((entry) => {
    const url = `${baseUrl}${changelogEntryPath(entry.locale, entry.slug)}`
    const authors = entry.crafters
      .map((id) => `    <author><name>${escapeXml(crafterMember(id).name)}</name></author>`)
    return [
      `  <entry xml:lang="${entry.locale}">`,
      `    <id>${escapeXml(url)}</id>`,
      `    <title>${escapeXml(entry.title)}</title>`,
      `    <link rel="alternate" type="text/html" href="${escapeXml(url)}"/>`,
      `    <link rel="alternate" type="text/markdown" href="${escapeXml(url)}.md"/>`,
      `    <published>${instant(entry.date)}</published>`,
      `    <updated>${instant(entry.date)}</updated>`,
      `    <category term="${escapeXml(entry.area)}"/>`,
      `    <category term="${escapeXml(entry.kind)}"/>`,
      ...authors,
      `    <summary type="text">${escapeXml(entry.summary)}</summary>`,
      `    <content type="text">${escapeXml(entry.body)}</content>`,
      "  </entry>",
    ].join("\n")
  })

  return [
    '<?xml version="1.0" encoding="utf-8"?>',
    `<feed xmlns="http://www.w3.org/2005/Atom" xml:lang="${locale}">`,
    `  <id>${escapeXml(indexUrl)}</id>`,
    `  <title>${escapeXml(title)}</title>`,
    `  <subtitle>${escapeXml(subtitle)}</subtitle>`,
    `  <updated>${updated}</updated>`,
    `  <link rel="self" type="application/atom+xml" href="${escapeXml(selfUrl)}"/>`,
    `  <link rel="alternate" type="text/html" href="${escapeXml(indexUrl)}"/>`,
    "  <author>",
    `    <name>${escapeXml(siteConfig.name)}</name>`,
    `    <uri>${escapeXml(baseUrl)}</uri>`,
    "  </author>",
    ...items,
    "</feed>",
    "",
  ].join("\n")
}

export async function GET(_request: Request, { params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const t = await getTranslations({ locale: lang, namespace: "pages.changelog" })

  return new Response(buildFeed(lang, t("feedTitle"), t("feedSubtitle")), {
    headers: {
      "Content-Type": "application/atom+xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  })
}
