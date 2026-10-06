import { Rss } from "lucide-react"
import type { BlogCopy } from "@/components/blog/copy"
import { blogFeedPath, blogSitemapMdPath } from "@/lib/blog-paths"
import type { Locale } from "@/lib/i18n"

export function BlogHero({ locale, eyebrow, title, description, subtitle, t }: {
  locale: Locale; eyebrow: string; title: string; description: string; subtitle?: string; t: BlogCopy
}) {
  return <header className="journal-masthead">
    <div className="journal-topline"><p className="station-label">{eyebrow}</p>
      <a href={blogFeedPath(locale)}><Rss size={13} aria-hidden="true" />{t.subscribe}</a></div>
    <div className="journal-title-row">
      <h1 aria-label={title}><span>Crafter</span>{" "}<span>Journal.</span></h1>
      <svg viewBox="0 0 160 160" fill="none" className="journal-emblem" aria-hidden="true">
        <g stroke="currentColor" strokeWidth="1.5"><circle cx="80" cy="80" r="63" strokeDasharray="2 6" />
          <ellipse cx="80" cy="80" rx="56" ry="23" transform="rotate(-40 80 80)" />
          <ellipse cx="80" cy="80" rx="23" ry="56" transform="rotate(-40 80 80)" />
          <path d="m80 51 7 22 22 7-22 7-7 22-7-22-22-7 22-7Z" fill="currentColor" />
          <circle cx="121" cy="43" r="7" fill="var(--journal-paper)" /></g>
      </svg>
    </div>
    <div className="journal-deck"><p>{subtitle ?? description}</p><nav aria-label={t.surfaces.agents}>
      <a href={blogSitemapMdPath(locale)}>{t.surfaces.markdownIndex}</a>
      <a href="/agents.md">{t.surfaces.agents}</a>
    </nav></div>
  </header>
}
