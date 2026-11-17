import type { ActivityEvent } from "@/lib/ship-activity"
import type { Locale } from "@/lib/i18n"

/** XML text-node escaping. Ampersand first, or it double-escapes the rest. */
export function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}

export function shipsFeedPath(locale: Locale): string {
  return `/${locale}/ships/rss.xml`
}

/**
 * Atom 1.0 feed of community activity, one entry per ship publication and per update.
 * Same shape as the blog and changelog feeds; entries link to the ship page.
 */
export function buildShipsFeed(options: {
  locale: Locale
  baseUrl: string
  siteName: string
  title: string
  subtitle: string
  events: ActivityEvent[]
  labels: { published: string; update: string }
}): string {
  const { locale, baseUrl, events } = options
  const indexUrl = `${baseUrl}/${locale}/ships`
  const selfUrl = `${baseUrl}${shipsFeedPath(locale)}`
  const sorted = [...events].sort((a, b) => Date.parse(b.at) - Date.parse(a.at))
  // With no events there is nothing to date the feed from; the epoch beats "now".
  const updated = sorted[0]?.at ?? "1970-01-01T00:00:00Z"

  const entries = sorted.map((event) => {
    const url = `${baseUrl}/${locale}/ships/${event.ship.slug}`
    const id = event.kind === "published" ? url : `${url}#update-${event.id.split(":")[1]}`
    const label = event.kind === "published" ? options.labels.published : options.labels.update
    const title = event.kind === "published" ? `${label}: ${event.ship.name}` : `${label}: ${event.ship.name} - ${event.title}`
    return [
      "  <entry>",
      `    <id>${escapeXml(id)}</id>`,
      `    <title>${escapeXml(title)}</title>`,
      `    <link rel="alternate" type="text/html" href="${escapeXml(url)}"/>`,
      `    <published>${event.at}</published>`,
      `    <updated>${event.at}</updated>`,
      `    <category term="${event.kind}"/>`,
      `    <author><name>${escapeXml(event.ship.ownerName)}</name><uri>${escapeXml(`${baseUrl}/${locale}/crafters/${event.ship.ownerHandle}`)}</uri></author>`,
      `    <summary type="text">${escapeXml(event.description)}</summary>`,
      "  </entry>",
    ].join("\n")
  })

  return [
    '<?xml version="1.0" encoding="utf-8"?>',
    `<feed xmlns="http://www.w3.org/2005/Atom" xml:lang="${locale}">`,
    `  <id>${escapeXml(indexUrl)}</id>`,
    `  <title>${escapeXml(options.title)}</title>`,
    `  <subtitle>${escapeXml(options.subtitle)}</subtitle>`,
    `  <updated>${updated}</updated>`,
    `  <link rel="self" type="application/atom+xml" href="${escapeXml(selfUrl)}"/>`,
    `  <link rel="alternate" type="text/html" href="${escapeXml(indexUrl)}"/>`,
    "  <author>",
    `    <name>${escapeXml(options.siteName)}</name>`,
    `    <uri>${escapeXml(baseUrl)}</uri>`,
    "  </author>",
    ...entries,
    "</feed>",
    "",
  ].join("\n")
}
