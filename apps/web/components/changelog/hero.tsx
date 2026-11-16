import { Rss } from "lucide-react"
import Link from "next/link"

import type { ChangelogLabels } from "@/components/changelog/labels"
import { changelogFeedPath, changelogSitemapMdPath } from "@/lib/changelog-paths"
import { type Locale, withLocale } from "@/lib/i18n"

export function ChangelogHero({ locale, eyebrow, title, description, t }: {
  locale: Locale; eyebrow: string; title: string; description: string; t: ChangelogLabels
}) {
  return <header className="journal-masthead">
    <div className="journal-topline"><p className="station-label">{eyebrow}</p>
      <Link href={withLocale("/newsletter", locale)}>{t.subscribe}</Link></div>
    <div className="journal-title-row">
      <h1>{title}<span>.</span></h1>
      <svg viewBox="0 0 160 160" fill="none" className="journal-emblem" aria-hidden="true">
        <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <path d="M52 14v132" strokeDasharray="2 6" />
          <circle cx="52" cy="38" r="9" fill="var(--journal-paper)" />
          <circle cx="52" cy="80" r="9" fill="currentColor" />
          <circle cx="52" cy="122" r="9" fill="var(--journal-paper)" />
          <path d="M76 38h58M76 80h40M76 122h66" />
        </g>
      </svg>
    </div>
    <div className="journal-deck"><p>{description}</p><nav aria-label={t.rss}>
      <a href={changelogFeedPath(locale)}><Rss size={14} aria-hidden="true" />&nbsp;{t.rss}</a>
      <a href={changelogSitemapMdPath(locale)}>{t.markdownIndex}</a>
      <a href="/agents.md">{t.agents}</a>
    </nav></div>
  </header>
}
