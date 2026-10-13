import { type AccessEvent, accessEvents } from "@/lib/access-events"
import { getEventMenu } from "@/lib/event-menu"
import { eventOrderSlug, type HotReloadEdition, hotReloadEditions } from "@/lib/hot-reload"
import type { Locale } from "@/lib/i18n"
import type { GuestSource } from "@/lib/luma-guests"

/** One admin entry per event. Modules are what the event collects from approved guests. */
export type AdminEvent = {
  slug: string
  title: string
  startsAt?: string
  timeZone: string
  lumaEventId?: string
  calendar: GuestSource
  access?: AccessEvent
  orders?: HotReloadEdition
}

export const adminEvents: AdminEvent[] = [
  ...accessEvents.map(event => ({
    slug: event.slug, title: event.title, startsAt: event.startsAt, timeZone: event.timeZone,
    lumaEventId: event.lumaEventId, calendar: event.lumaCalendar, access: event,
  })),
  ...hotReloadEditions.filter(edition => getEventMenu(edition)).map(edition => ({
    slug: eventOrderSlug(edition), title: `Hot Reload #${String(edition.number).padStart(2, "0")} · ${edition.venue}`,
    startsAt: edition.startsAt, timeZone: edition.timeZone, lumaEventId: edition.lumaEventId, calendar: "default" as const, orders: edition,
  })),
].sort((a, b) => (b.startsAt ?? "").localeCompare(a.startsAt ?? ""))

export function findAdminEvent(slug: string) {
  return adminEvents.find(event => event.slug === slug)
}

export const adminEventsUrl = (lang: Locale, slug: string) => `/${lang}/admin/events/${slug}`

export const adminEventsCopy: Record<Locale, { events: string; approved: string; unannounced: string }> = {
  en: { events: "Events", approved: "approved on Luma", unannounced: "Date to be announced" },
  es: { events: "Eventos", approved: "aprobados en Luma", unannounced: "Fecha por anunciar" },
  pt: { events: "Eventos", approved: "aprovados no Luma", unannounced: "Data a anunciar" },
  zh: { events: "活动", approved: "名已在 Luma 获批", unannounced: "日期待定" },
  ja: { events: "イベント", approved: "名が Luma で承認済み", unannounced: "日程未定" },
}
