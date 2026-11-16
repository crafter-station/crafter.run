/**
 * Markdown renderings of the changelog, for agents and feed readers.
 *
 * An entry body is already markdown, so its twin is the source with a header
 * carrying the structured fields and a footer that links the rest of the
 * archive. Copy comes in through `Tr`, a plain translator over the
 * `pages.changelog` namespace, so this module stays free of React.
 */
import { dateLabel } from "@/components/blog/format"
import { crafterByline } from "@/components/changelog/format"
import { getIndexEntries, type ChangelogEntry } from "@/lib/changelog"
import { changelogEntryPath, changelogPath, changelogSitemapMdPath } from "@/lib/changelog-paths"
import type { Locale } from "@/lib/i18n"
import { baseUrl } from "@/lib/seo"
import { siteConfig } from "@/lib/site"

export type Tr = (key: string, values?: Record<string, string | number>) => string

/** `<Figure ... />` becomes a plain markdown image; fences lose their meta. */
function toPlainMarkdown(body: string): string {
  return body
    .replace(/^(\s*(?:```|~~~)\s*[\w+-]*)[^\n]*$/gm, "$1")
    .replace(/<Figure\b([^>]*?)\/>/g, (_, attrs: string) => {
      const attr = (name: string) => new RegExp(`${name}="([^"]*)"`).exec(attrs)?.[1] ?? ""
      const src = attr("src")
      const image = `![${attr("alt")}](${src.startsWith("/") ? `${baseUrl}${src}` : src})`
      const caption = attr("caption")
      return caption ? `${image}\n\n*${caption}*` : image
    })
}

export function entryMarkdown(entry: ChangelogEntry, locale: Locale, tr: Tr): string {
  const meta = [
    `**${tr("published")}:** ${dateLabel(entry.date, locale)}`,
    `**${tr("area")}:** ${tr(`areas.${entry.area}`)}`,
    `**${tr("kind")}:** ${tr(`kinds.${entry.kind}`)}`,
    ...(entry.crafters.length > 0 ? [`**${tr("crafters")}:** ${crafterByline(entry.crafters, locale)}`] : []),
  ].join(" | ")

  const list = (label: string, items: string[]) => (items.length > 0 ? [`**${label}**`, "", ...items, ""] : [])

  return [
    `# ${entry.title}`,
    "",
    `> ${entry.summary}`,
    "",
    meta,
    "",
    ...(entry.image ? [`![](${baseUrl}${entry.image})`, ""] : []),
    "---",
    "",
    toPlainMarkdown(entry.body),
    "",
    "---",
    "",
    ...list(tr("ships"), (entry.ships ?? []).map((ship) => `- [${ship}](${baseUrl}/${locale}/ships/${ship})`)),
    ...list(tr("repos"), (entry.repos ?? []).map((repo) => `- [${repo}](https://github.com/${repo})`)),
    ...list(tr("links"), (entry.links ?? []).map((link) => `- [${link.label}](${link.url})`)),
    ...list(tr("sources"), entry.evidence.map((source) => `- ${source}`)),
    `**${tr("allChanges")}:** [${tr("markdownIndex")}](${baseUrl}${changelogSitemapMdPath(locale)}) | [${siteConfig.name}](${baseUrl})`,
    "",
  ].join("\n")
}

/** Every entry in one locale, grouped by year. */
export function changelogSitemapMarkdown(locale: Locale, tr: Tr): string {
  const entries = getIndexEntries(locale)
  const lines = [
    `# ${tr("mdTitle")}`,
    "",
    tr("mdIntro", { count: entries.length }),
    "",
    `${baseUrl}${changelogPath(locale)}`,
    "",
    "---",
    "",
  ]

  let year = ""
  for (const entry of entries) {
    const entryYear = entry.date.slice(0, 4)
    if (entryYear !== year) {
      year = entryYear
      lines.push(`## ${year}`, "")
    }
    const lang = entry.locale === locale ? "" : ` (${entry.locale})`
    lines.push(
      `- [${entry.title}](${baseUrl}${changelogEntryPath(entry.locale, entry.slug)}.md) - ${entry.date} - ${tr(`areas.${entry.area}`)}${lang}: ${entry.summary}`,
    )
  }

  lines.push("")
  return lines.join("\n")
}
