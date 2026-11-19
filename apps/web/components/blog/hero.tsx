import type { BlogCopy } from "@/components/blog/copy"
import { blogSitemapMdPath } from "@/lib/blog-paths"
import type { Locale } from "@/lib/i18n"

export function BlogHero({ locale, eyebrow, title, description, subtitle, t }: {
  locale: Locale; eyebrow: string; title: string; description: string; subtitle?: string; t: BlogCopy
}) {
  return <header className="journal-masthead">
    <div className="journal-topline"><p className="home-label">{eyebrow}</p></div>
    <div className="journal-title-row">
      <h1>{title}</h1>
    </div>
    <div className="journal-deck"><p>{subtitle ?? description}</p><nav aria-label={t.surfaces.agents}>
      <a className="home-secondary-link" href={blogSitemapMdPath(locale)}>{t.surfaces.markdownIndex}</a>
      <a className="home-secondary-link" href="/agents.md">{t.surfaces.agents}</a>
    </nav></div>
  </header>
}
