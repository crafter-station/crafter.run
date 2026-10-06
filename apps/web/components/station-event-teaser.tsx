import { ArrowUpRight } from "lucide-react"
import type { Locale } from "@/lib/i18n"
import { fetchHack0Calendar } from "@/lib/hack0-calendar"
import { HACK0_CALENDAR_URL, HACK0_TIME_ZONE, partitionHack0Events } from "@/lib/hack0-calendar-data"
import { stationCopy } from "@/lib/station-copy"

export async function StationEventTeaser({ locale }: { locale: Locale }) {
  const t = stationCopy[locale]
  // The calendar may be unavailable in local previews. Keep an honest invitation
  // in that space instead of inventing an event or making navigation fail.
  const event = await fetchHack0Calendar()
    .then(({ events }) => partitionHack0Events(events).upcoming[0])
    .catch(() => undefined)
  const start = event ? new Date(event.startAt) : null
  const timeZone = event?.allDay ? "UTC" : HACK0_TIME_ZONE
  const day = start
    ? new Intl.DateTimeFormat(locale, { day: "2-digit", timeZone })
      .formatToParts(start).find(part => part.type === "day")?.value
    : null
  const month = start
    ? new Intl.DateTimeFormat(locale, { month: "short", timeZone }).format(start).replace(/\.$/, "")
    : null
  const weekday = start
    ? new Intl.DateTimeFormat(locale, { weekday: "short", timeZone }).format(start).replace(/\.$/, "")
    : null
  const fullDate = start
    ? new Intl.DateTimeFormat(locale, { dateStyle: "full", timeZone }).format(start)
    : null

  return (
    <a className="station-event-stamp" href={event?.url ?? HACK0_CALENDAR_URL}
      data-pending={!event || undefined}
      target="_blank" rel="noopener noreferrer"
      aria-label={event
        ? `${t.nextEvent} · hack0 · ${fullDate} · ${event.title} · ${t.joinEvent}`
        : `hack0 · ${t.seeYouSoon.replace(/\n/g, " ")} · ${t.viewCalendar}`}
      title={event ? `${event.title} · ${fullDate}` : t.viewCalendar}>
      <span className="station-event-kicker" aria-hidden="true">
        <span>hack0</span>
        <svg className="station-event-spark" viewBox="0 0 24 24" fill="none">
          <path d="M12 2v20M2 12h20M5 5l14 14M5 19 19 5" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="12" cy="12" r="3" fill="currentColor" />
        </svg>
      </span>
      {event ? (
        <>
          <time className="station-event-date" dateTime={event.startAt} aria-label={fullDate ?? undefined}>
            <span className="station-event-day" aria-hidden="true">{day}</span>
            <span className="station-event-date-side" aria-hidden="true">
              <span className="station-event-month" data-wide={(month?.length ?? 0) > 3 || locale === "zh" || locale === "ja" || undefined}>{month}</span>
              <span className="station-event-weekday">{weekday}</span>
            </span>
          </time>
          <span className="station-event-title">{event.title}</span>
        </>
      ) : (
        <span className="station-event-soon">{t.seeYouSoon}</span>
      )}
      <span className="station-event-link">{event ? t.joinEvent : t.viewCalendar}<ArrowUpRight size={14} aria-hidden="true" /></span>
    </a>
  )
}
