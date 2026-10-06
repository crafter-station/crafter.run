import Link from "next/link"
import type { BlogCopy } from "@/components/blog/copy"
import { type Locale, withLocale } from "@/lib/i18n"

export function BlogCta({ locale, t }: { locale: Locale; t: BlogCopy }) {
  return <aside className="journal-invitation">
    <p className="station-label">{t.cta.eyebrow}</p><h2>{t.cta.title}</h2><p>{t.cta.body}</p>
    <div className="journal-invitation-links">
      <a href="https://crafters.chat" target="_blank" rel="noopener noreferrer">{t.cta.primary}</a>
      <Link href={withLocale("/universe", locale)}>{t.cta.secondary}</Link>
    </div>
  </aside>
}
