import { Rss } from "lucide-react"
import Link from "next/link"

import type { ChangelogLabels } from "@/components/changelog/labels"
import { changelogFeedPath, changelogSitemapMdPath } from "@/lib/changelog-paths"
import { type Locale, withLocale } from "@/lib/i18n"

export function ChangelogHero({ locale, eyebrow, title, description, t }: {
  locale: Locale; eyebrow: string; title: string; description: string; t: ChangelogLabels
}) {
  return <header className="journal-masthead">
    <div className="journal-topline"><p className="home-label">{eyebrow}</p></div>
    <div className="journal-title-row">
      <h1>{title}</h1>
    </div>
    <div className="journal-deck"><p>{description}</p><nav aria-label={t.rss}>
      <Link className="home-secondary-link" href={withLocale("/newsletter", locale)}>{t.subscribe}</Link>
      <a className="home-secondary-link" href={changelogFeedPath(locale)}><Rss size={14} aria-hidden="true" />&nbsp;{t.rss}</a>
      <a className="home-secondary-link" href={changelogSitemapMdPath(locale)}>{t.markdownIndex}</a>
      <a className="home-secondary-link" href="/agents.md">{t.agents}</a>
    </nav></div>
  </header>
}
