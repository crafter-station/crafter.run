import { Rss } from "lucide-react"
import Link from "next/link"

import type { ChangelogLabels } from "@/components/changelog/labels"
import { changelogFeedPath, changelogSitemapMdPath } from "@/lib/changelog-paths"
import { type Locale, withLocale } from "@/lib/i18n"

export function ChangelogHero({ locale, eyebrow, title, description, t }: {
  locale: Locale; eyebrow: string; title: string; description: string; t: ChangelogLabels
}) {
  return <header className="journal-masthead">
    <div className="journal-topline"><p className="station-label">{eyebrow}</p></div>
    <div className="journal-title-row">
      <h1>{title}<span>.</span></h1>
    </div>
    <div className="journal-deck"><p>{description}</p><nav aria-label={t.rss}>
      <Link href={withLocale("/newsletter", locale)}>{t.subscribe}</Link>
      <a href={changelogFeedPath(locale)}><Rss size={14} aria-hidden="true" />&nbsp;{t.rss}</a>
      <a href={changelogSitemapMdPath(locale)}>{t.markdownIndex}</a>
      <a href="/agents.md">{t.agents}</a>
    </nav></div>
  </header>
}
