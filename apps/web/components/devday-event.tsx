import { MapPin } from "lucide-react"
import Link from "next/link"
import { type AccessEvent, accessEventDay, accessEventHours } from "@/lib/access-events"
import { findEventBadge } from "@/lib/event-badge"
import { eventAccessCopy } from "@/lib/event-access-copy"
import { hotReloadBadgeCopy } from "@/lib/hot-reload-badge-copy"
import type { Locale } from "@/lib/i18n"

/** DevDay-site hero: date and venue on one line, the title in event colors, lede and pill actions. */
export function DevdayHero({ event, locale, entry = false, admin = false }: { event: AccessEvent; locale: Locale; entry?: boolean; admin?: boolean }) {
  const t = eventAccessCopy[locale]
  const weekday = new Intl.DateTimeFormat(locale, { timeZone: event.timeZone, weekday: "long" }).format(new Date(event.startsAt))
  return (
    <section className="dd-hero">
      <div className="dd-meta">
        <span>{weekday[0].toUpperCase() + weekday.slice(1)}, {accessEventDay(event, locale)} · {accessEventHours(event, locale)}</span>
        <span className="dd-place"><MapPin aria-hidden size={20} strokeWidth={1.75} />{event.venue}</span>
      </div>
      {entry ? (
        <h1 className="dd-title dd-title-sm">{t.entry}</h1>
      ) : (
        <h1 className="dd-title" aria-label={event.title}>
          <span className="dd-green">DevDay</span> Exchange <span className="dd-bracket">[</span><span className="dd-purple">Lima</span><span className="dd-bracket">]</span>
        </h1>
      )}
      <div className="dd-lede">
        <p>{entry ? t.entryIntro : t.intro}</p>
        {entry ? null : <strong>{t.format}</strong>}
      </div>
      {entry ? null : (
        <div className="dd-actions">
          <Link className="dd-pill" href={`/${locale}/events/${event.slug}/access`}>{t.access}</Link>
          <a className="dd-pill dd-pill-ghost" href={event.lumaUrl} target="_blank" rel="noopener noreferrer">{t.request} ↗</a>
          {/* Admins see the badge before it opens to everyone. */}
          {findEventBadge(event.slug)?.entry || admin ? <Link className="dd-pill dd-pill-ghost" href={`/${locale}/events/${event.slug}/badge`}>{hotReloadBadgeCopy[locale].badge}</Link> : null}
        </div>
      )}
    </section>
  )
}

/** Steps as hairline cards, then what to bring next to the event poster. */
export function DevdayEventBody({ event, locale }: { event: AccessEvent; locale: Locale }) {
  const t = eventAccessCopy[locale]
  return (
    <>
      <section className="dd-section">
        <h2 className="dd-h2">{t.flowTitle}</h2>
        <ol className="dd-cards">
          {t.steps.map((step, i) => (
            <li key={step} className="dd-card">
              <span className="dd-card-n">0{i + 1}</span>
              <h3>{step}</h3>
              <p>{t.stepBodies[i]}</p>
            </li>
          ))}
        </ol>
      </section>
      <section className="dd-section dd-split">
        <div>
          <h2 className="dd-h2">{t.bring}</h2>
          <p className="dd-body" style={{ marginTop: 20 }}>{t.bringBody}</p>
          <div className="dd-venue">
            <h3 className="dd-place"><MapPin aria-hidden size={18} strokeWidth={1.75} />{event.venue}</h3>
            <p className="dd-body">{event.address}</p>
            <p className="dd-body">{t.disclaimer}</p>
          </div>
        </div>
        <figure className="dd-poster">
          {/* Official DevDay Exchange art, shown as is. */}
          <img src={event.cover} alt={event.title} width={800} height={800} />
          <figcaption>{t.format}</figcaption>
        </figure>
      </section>
    </>
  )
}
