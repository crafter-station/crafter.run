import Link from "next/link"
import { accessEventDay, accessEventHours, type AccessEvent } from "@/lib/access-events"
import { eventAccessCopy } from "@/lib/event-access-copy"
import type { Locale } from "@/lib/i18n"

export function AccessEventHeader({ event, locale, entry = false }: { event: AccessEvent; locale: Locale; entry?: boolean }) {
  const t = eventAccessCopy[locale]
  return <header className={`entry-hero${entry ? " entry-hero-compact" : ""}`}>
    <div>
      <nav aria-label={t.agenda} className="entry-crumbs">
        <Link href={`/${locale}/events`}>{t.agenda}</Link>
        {entry ? <><span aria-hidden="true">/</span><Link href={`/${locale}/events/${event.slug}`}>{event.title}</Link></> : null}
      </nav>
      <p className="station-label entry-eyebrow">{t.eyebrow}</p>
      <h1>{entry ? t.entry : <>{event.title.split(":")[0]}<br /><span>{event.title.split(":").slice(1).join(":").trim()}</span></>}</h1>
      <p className="entry-intro">{entry ? t.entryIntro : t.intro}</p>
      <div className="entry-event-facts">
        <span>{accessEventDay(event, locale)}</span>
        <span>{accessEventHours(event, locale)}</span>
        <span>{event.venue}</span>
      </div>
      {!entry ? <div className="entry-actions">
        <Link className="station-button" href={`/${locale}/events/${event.slug}/access`}>{t.access}</Link>
        <a href={event.lumaUrl} target="_blank" rel="noopener noreferrer">{t.request}</a>
      </div> : null}
    </div>
    {!entry ? <figure className="entry-poster">
      {/* Original event art; presentation is CSS-only. */}
      <img src={event.cover} alt={event.title} width={800} height={800} />
      <figcaption>{t.format}</figcaption>
    </figure> : null}
  </header>
}
