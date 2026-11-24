import type { Locale } from "@/lib/i18n"

/* Public event catalog. Keep dates as absolute instants, with the venue's zone
   for display. Menu keys select a reusable catalog; orders belong to editions. */

export type Announcement = { author: string; role: string; url: string }

export type HotReloadEdition = {
  number: number
  /** Omit until the venue is confirmed; the city still shows. */
  venue?: string
  venueUrl?: string
  city: string
  startsAt?: string
  endsAt?: string
  timeZone: string
  /** Defaults to startsAt. An undated edition cannot accept orders. */
  ordersCloseAt?: string
  description?: Record<Locale, string>
  partner?: string
  seats?: number
  poster?: string
  /** Optional compatible copy when the source poster uses an unsupported codec. */
  socialPoster?: string
  lumaUrl?: string
  /** Group chat attendees are invited to once their order is saved. */
  whatsappUrl?: string
  lumaEventId?: string
  announcements?: Announcement[]
  menu?: string
}

export const hotReloadEditions: HotReloadEdition[] = [
  {
    number: 1,
    venue: "Don Salazar Specialty Coffee",
    venueUrl: "https://www.donsalazar.com/",
    city: "Miraflores, Lima",
    seats: 20,
    startsAt: "2026-10-17T15:00:00.000Z",
    endsAt: "2026-10-17T17:00:00.000Z",
    timeZone: "America/Lima",
    description: {
      en: "Bring your side project, something to show or a question for the table. Expect Vercel news, an important announcement and a few surprises. Coffee and a bite are on us.",
      es: "Trae tu side project, algo que quieras mostrar o una pregunta para la mesa. Habrá novedades de Vercel, un anuncio importante y algunas sorpresas para quienes vengan. El café y algo para picar van por nuestra cuenta.",
      pt: "Traga seu side project, algo para mostrar ou uma pergunta para a mesa. Teremos novidades da Vercel, um anúncio importante e algumas surpresas. O café e um lanche são por nossa conta.",
      zh: "带上你的个人项目、想展示的作品或想交流的问题。现场会有 Vercel 的新消息、重要公告和一些惊喜。咖啡和小食由我们招待。",
      ja: "個人プロジェクトや見せたいもの、話し合いたい質問を持ち寄ろう。Vercel の最新情報、大切なお知らせ、ちょっとしたサプライズも。コーヒーと軽食はこちらで用意します。",
    },
    partner: "Vercel",
    poster: "/events/hot-reload/01.avif",
    socialPoster: "/events/hot-reload/01-social.png",
    lumaUrl: "https://luma.com/7o3puw27",
    lumaEventId: "evt-lzVFBY3M7lMWmH7",
    whatsappUrl: "https://chat.whatsapp.com/DI2eDxE2ofg6sm6cN5tB50",
    announcements: [
      {
        author: "Railly Hugo",
        role: "Vercel",
        url: "https://www.linkedin.com/posts/railly-hugo_voy-a-estar-unos-d%C3%ADas-en-lima-y-quiero-share-7513028817230270464-r53p/",
      },
      {
        author: "Carlos Tarmeño",
        role: "Crafter Station",
        url: "https://www.linkedin.com/posts/carlos-tarmeno_hotreload-crafterstation-vercel-share-7513036031965933568-FiA9/",
      },
    ],
    menu: "don-salazar",
  },
  {
    number: 2,
    city: "Jesús María, Lima",
    startsAt: "2026-12-12T15:00:00.000Z",
    endsAt: "2026-12-12T18:00:00.000Z",
    timeZone: "America/Lima",
    description: {
      en: "Bring your project: a short pitch and one question, \"how can we help?\". The goal is to leave with someone to build it with. Coffee is on us.",
      es: "Trae tu proyecto: un pitch corto y una pregunta, \"¿en qué te ayudamos?\". La idea es salir con alguien con quien construirlo. El café va por nuestra cuenta.",
      pt: "Traga seu projeto: um pitch curto e uma pergunta, \"como podemos ajudar?\". A ideia é sair com alguém para construir junto. O café é por nossa conta.",
      zh: "带上你的项目：一段简短的介绍，再加一个问题：“我们能帮你什么？”目标是找到一起把它做出来的人。咖啡由我们招待。",
      ja: "プロジェクトを持ってきてください。短いピッチと「何を手伝えるか」という質問をひとつ。一緒に作る仲間を見つけるのが目的です。コーヒーはこちらで用意します。",
    },
    partner: "Vercel",
    poster: "/events/hot-reload/02.webp",
    socialPoster: "/events/hot-reload/02-social.png",
    lumaUrl: "https://luma.com/hack0-5u0o",
  },
]

export function findEdition(number: string) {
  return hotReloadEditions.find((edition) => String(edition.number) === number)
}

function instant(value?: string) {
  if (!value || !/(Z|[+-]\d{2}:\d{2})$/.test(value)) return null
  const time = Date.parse(value)
  return Number.isFinite(time) ? time : null
}

export type HotReloadStatus = "unannounced" | "upcoming" | "live" | "past" | "started"

export function hotReloadStatus(edition: HotReloadEdition, now = Date.now()): HotReloadStatus {
  const start = instant(edition.startsAt)
  const end = instant(edition.endsAt)
  if (start === null) return "unannounced"
  if (now < start) return "upcoming"
  if (end === null || end <= start) return "started"
  return now < end ? "live" : "past"
}

export function orderDeadline(edition: HotReloadEdition) {
  if (instant(edition.startsAt) === null) return null
  const close = instant(edition.ordersCloseAt ?? edition.startsAt)
  const end = instant(edition.endsAt)
  return close === null ? null : Math.min(close, end ?? Infinity)
}

export function ordersOpen(edition: HotReloadEdition, now = Date.now()) {
  const deadline = orderDeadline(edition)
  return Boolean(edition.menu && edition.lumaEventId && deadline !== null && now < deadline)
}

export function eventOrderSlug(edition: HotReloadEdition) {
  // Preserve existing Hot Reload #1 orders and the compound user/event key.
  return `hot-reload-${edition.number}`
}

export function hotReloadDate(edition: HotReloadEdition, locale: Locale, value = edition.startsAt) {
  const time = instant(value)
  return time === null ? null : new Intl.DateTimeFormat(locale, {
    dateStyle: "long", timeZone: edition.timeZone,
  }).format(time)
}

export function hotReloadTime(edition: HotReloadEdition, locale: Locale) {
  const start = instant(edition.startsAt)
  return start === null ? null : new Intl.DateTimeFormat(locale, {
    hour: "numeric", minute: "2-digit", timeZoneName: "short", timeZone: edition.timeZone,
  }).format(start)
}

export function hotReloadDeadline(edition: HotReloadEdition, locale: Locale) {
  const deadline = orderDeadline(edition)
  return deadline === null ? null : new Intl.DateTimeFormat(locale, {
    year: "numeric", month: "short", day: "numeric", hour: "numeric", minute: "2-digit",
    timeZoneName: "short", timeZone: edition.timeZone,
  }).format(deadline)
}

export function hotReloadCacheAge(edition: HotReloadEdition, now = Date.now()) {
  const transitions = [instant(edition.startsAt), instant(edition.endsAt), orderDeadline(edition)]
    .filter((value): value is number => value !== null && value > now)
  return Math.max(0, Math.min(300, ...transitions.map(time => Math.floor((time - now) / 1000))))
}
