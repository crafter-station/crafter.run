/**
 * Markdown renderings of the blog, for agents and feed readers.
 *
 * A post's body is already markdown, so serving it as markdown is not a
 * conversion: it is the source, minus the frontmatter, with a header and a
 * footer that give an agent the same context a reader gets from the page
 * chrome. What this is, when it was published, who wrote it, and where the
 * rest of the archive lives.
 *
 * That last part matters more than it looks. A model that lands on one post
 * with no path back to the index has to guess at the archive's shape; a footer
 * link to the markdown sitemap turns a single page into an entry point.
 */
import { blogCopy } from "@/components/blog/copy"
import { byline, dateLabel } from "@/components/blog/format"
import { getIndexPosts, type BlogPost } from "@/lib/blog"
import { blogPath, blogPostPath, blogSitemapMdPath } from "@/lib/blog-paths"
import type { Locale } from "@/lib/i18n"
import { baseUrl } from "@/lib/seo"
import { siteConfig } from "@/lib/site"

/**
 * Strips fence meta (`showLineNumbers`, `{3-5}`) so a fence arrives as plain
 * ```bash. The meta is an instruction to the page highlighter; "which line we
 * drew a bar next to" means nothing without the page it was drawn on.
 */
function stripFenceMeta(body: string): string {
  return body.replace(/^(\s*(?:```|~~~)\s*[\w+-]*)[^\n]*$/gm, "$1")
}

/** One post as a standalone markdown document. */
export function postMarkdown(post: BlogPost, locale: Locale): string {
  const t = blogCopy[locale].markdown
  const meta = [
    `**${t.published}:** ${dateLabel(post.date, locale)}`,
    ...(post.updated && post.updated !== post.date
      ? [`**${t.updated}:** ${dateLabel(post.updated, locale)}`]
      : []),
    `**${t.authors}:** ${byline(post.authors, locale)}`,
  ].join(" | ")

  return [
    `# ${post.title}`,
    "",
    `> ${post.summary}`,
    "",
    meta,
    "",
    "---",
    "",
    stripFenceMeta(post.body),
    "",
    "---",
    "",
    `**${t.more}:** [${t.allPosts}](${baseUrl}${blogSitemapMdPath(locale)}) | [${siteConfig.name}](${baseUrl})`,
    "",
  ].join("\n")
}

/**
 * Every post in one locale, grouped by year.
 *
 * Grouping is not decoration: it gives a model a cheap way to scope a question
 * to a period without reading all of the posts.
 */
export function blogSitemapMarkdown(locale: Locale): string {
  const posts = getIndexPosts(locale)
  const t = blogCopy[locale].markdown

  const lines = [
    `# ${t.sitemapTitle}`,
    "",
    t.sitemapIntro(posts.length),
    "",
    `${baseUrl}${blogPath(locale)}`,
    "",
    "---",
    "",
  ]

  let currentYear = ""
  for (const post of posts) {
    const year = post.date.slice(0, 4)
    if (year !== currentYear) {
      currentYear = year
      lines.push(`## ${year}`, "")
    }
    // The post's own locale, not the reader's: the index falls back to another
    // language when a translation is missing, and the link must resolve.
    const lang = post.locale === locale ? "" : ` (${post.locale})`
    lines.push(
      `- [${post.title}](${baseUrl}${blogPostPath(post.locale, post.slug)}.md) - ${post.date}${lang}: ${post.summary}`,
    )
  }

  lines.push("")
  return lines.join("\n")
}
