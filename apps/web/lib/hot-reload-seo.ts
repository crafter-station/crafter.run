import { hotReloadDate, hotReloadTime, hotReloadStatus, hotReloadCacheAge, ordersOpen, orderDeadline, type HotReloadEdition } from "@/lib/hot-reload"
import { hotReloadCopy, hotReloadText } from "@/lib/hot-reload-copy"
import type { Locale } from "@/lib/i18n"
import { buildMetadata } from "@/lib/seo"

export function hotReloadPath(edition?: HotReloadEdition, menu = false) {
  return `/events/hot-reload${edition ? `/${edition.number}${menu ? "/menu" : ""}` : ""}`
}

/** Public catalog data only: social crawlers never need attendee or order access. */
export function hotReloadPreview(locale: Locale, edition?: HotReloadEdition, menu = false) {
  const t = hotReloadCopy[locale]
  const name = edition ? `Hot Reload #${String(edition.number).padStart(2, "0")}` : "Hot Reload"
  return {
    path: hotReloadPath(edition, menu),
    title: menu ? t.menu : name,
    description: edition
      ? menu ? hotReloadText(t.menuDescription, { venue: edition.venue }) : `${t.tagline} · ${edition.venue}, ${edition.city}.`
      : t.description,
    eyebrow: menu ? name : edition?.partner ? `Crafter Station × ${edition.partner}` : t.tagline,
    detail: edition
      ? [hotReloadDate(edition, locale) || t.unannounced, hotReloadTime(edition, locale), edition.city].filter(Boolean).join(" · ")
      : undefined,
    poster: edition?.socialPoster ?? edition?.poster,
    status: edition ? menu ? ordersOpen(edition) ? t.ordersOpen : orderDeadline(edition) === null ? t.ordersPending : t.ordersClosed : t[hotReloadStatus(edition)] : undefined,
    maxAge: edition ? hotReloadCacheAge(edition) : undefined,
  }
}

export function hotReloadMetadata(locale: Locale, edition?: HotReloadEdition, menu = false) {
  const preview = hotReloadPreview(locale, edition, menu)
  return {
    ...buildMetadata({
      locale,
      path: preview.path,
      title: menu ? `${preview.title} · ${preview.eyebrow}` : preview.title,
      description: preview.description,
    }),
    ...(menu ? { robots: { index: false } } : {}),
  }
}
