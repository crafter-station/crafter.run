import { Rss } from "lucide-react"
import Link from "next/link"

import type { ChangelogLabels } from "@/components/changelog/labels"
import { changelogFeedPath } from "@/lib/changelog-paths"
import { type Locale, withLocale } from "@/lib/i18n"

export function ChangelogCta({ locale, t, markdownHref }: { locale: Locale; t: ChangelogLabels; markdownHref?: string }) {
  return <aside className="journal-invitation">
    <p className="station-label">{t.ctaEyebrow}</p><h2>{t.ctaTitle}</h2><p>{t.ctaBody}</p>
    <div className="journal-invitation-links">
      <Link href={withLocale("/newsletter", locale)}>{t.subscribe}</Link>
    </div>
    <div className="journal-invitation-feeds">
      <a href={changelogFeedPath(locale)}><Rss size={14} aria-hidden="true" />{t.rss}</a>
      {markdownHref && <a href={markdownHref}>{t.readAsMarkdown}</a>}
    </div>
  </aside>
}
