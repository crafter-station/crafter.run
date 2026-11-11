import { Rss } from "lucide-react"
import Link from "next/link"
import type { BlogCopy } from "@/components/blog/copy"
import { blogFeedPath } from "@/lib/blog-paths"
import { type Locale, withLocale } from "@/lib/i18n"

export function BlogCta({ locale, t, markdownHref }: { locale: Locale; t: BlogCopy; markdownHref?: string }) {
  return <aside className="journal-invitation">
    <p className="station-label">{t.cta.eyebrow}</p><h2>{t.cta.title}</h2><p>{t.cta.body}</p>
    <div className="journal-invitation-links">
      <a href="https://crafters.chat" target="_blank" rel="noopener noreferrer">{t.cta.primary}</a>
      <Link href={withLocale("/universe", locale)}>{t.cta.secondary}</Link>
    </div>
    <div className="journal-invitation-feeds">
      <a href={blogFeedPath(locale)}><Rss size={14} aria-hidden="true" />{t.subscribe}</a>
      {markdownHref && <a href={markdownHref}>{t.readAsMarkdown}</a>}
    </div>
  </aside>
}
