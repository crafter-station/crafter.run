import type { Locale } from "@/lib/i18n"

/** Public event facts only. Attendee data must never enter this catalog or OG. */
export type AccessEvent = {
  slug: string
  title: string
  lumaEventId: string
  lumaUrl: string
  lumaCalendar: "codex"
  startsAt: string
  endsAt: string
  accessClosesAt: string
  timeZone: string
  venue: string
  address: string
  cover: string
}

export const accessEvents: AccessEvent[] = [{
  slug: "devday-lima",
  title: "DevDay Exchange Community: Lima",
  lumaEventId: "evt-nTusHgBAKNtiP3p",
  lumaUrl: "https://luma.com/1iz8daqt",
  lumaCalendar: "codex",
  startsAt: "2026-10-21T23:00:00.000Z",
  endsAt: "2026-10-22T02:00:00.000Z",
  // Operational default, not a deadline supplied by the venue.
  accessClosesAt: "2026-10-21T23:00:00.000Z",
  timeZone: "America/Lima",
  venue: "FISI · UNMSM",
  address: "Av. Carlos Germán Amezaga #375, Cercado de Lima",
  cover: "/events/devday-lima/cover.jpg",
}]

export function findAccessEvent(slug: string) {
  return accessEvents.find(event => event.slug === slug)
}

export function accessOpen(event: AccessEvent, now = Date.now()) {
  const deadline = Date.parse(event.accessClosesAt)
  return Number.isFinite(deadline) && now < deadline
}

export function accessEventDate(event: AccessEvent, locale: Locale, deadline = false) {
  return new Intl.DateTimeFormat(locale, {
    timeZone: event.timeZone, day: "numeric", month: "long", year: "numeric",
    hour: "2-digit", minute: "2-digit", hourCycle: "h23",
  }).format(new Date(deadline ? event.accessClosesAt : event.startsAt))
}

export function accessEventHours(event: AccessEvent, locale: Locale) {
  const format = new Intl.DateTimeFormat(locale, { timeZone: event.timeZone, hour: "2-digit", minute: "2-digit", hourCycle: "h23" })
  return `${format.format(new Date(event.startsAt))}–${format.format(new Date(event.endsAt))} · Lima`
}

export function accessEventDay(event: AccessEvent, locale: Locale) {
  return new Intl.DateTimeFormat(locale, { timeZone: event.timeZone, day: "numeric", month: "long", year: "numeric" }).format(new Date(event.startsAt))
}
