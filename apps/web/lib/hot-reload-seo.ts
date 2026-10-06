import type { HotReloadEdition } from "@/lib/hot-reload"
import type { Locale } from "@/lib/i18n"
import { buildMetadata } from "@/lib/seo"

const copy = {
  en: {
    tagline: "Coffee, code and community",
    description: "A coffee with the dev community. Bring your side project, share what you're building and meet the people behind it.",
    menu: "Choose your order",
    order: (venue: string) => `Choose your drink and food for Hot Reload at ${venue}.`,
    pending: "Date to be announced",
  },
  es: {
    tagline: "Café, código y comunidad",
    description: "Un café con la comunidad dev. Trae tu side project, comparte lo que estás construyendo y conoce a la gente detrás.",
    menu: "Elige tu pedido",
    order: (venue: string) => `Elige tu bebida y comida para Hot Reload en ${venue}.`,
    pending: "Fecha por anunciar",
  },
  pt: {
    tagline: "Café, código e comunidade",
    description: "Um café com a comunidade dev. Traga seu side project, compartilhe o que está construindo e conheça quem está por trás.",
    menu: "Escolha seu pedido",
    order: (venue: string) => `Escolha sua bebida e comida para o Hot Reload no ${venue}.`,
    pending: "Data a anunciar",
  },
  zh: {
    tagline: "咖啡、代码与社区",
    description: "和开发者社区喝杯咖啡。带上你的个人项目，分享正在构建的作品，认识背后的伙伴。",
    menu: "选择你的餐点",
    order: (venue: string) => `为在 ${venue} 举办的 Hot Reload 选择饮品和餐点。`,
    pending: "日期待公布",
  },
  ja: {
    tagline: "コーヒー、コード、コミュニティ",
    description: "開発者コミュニティとコーヒーを。個人プロジェクトを持ち寄り、つくっているものを共有して、仲間と出会おう。",
    menu: "注文を選ぶ",
    order: (venue: string) => `${venue} で開催する Hot Reload のドリンクとフードを選ぼう。`,
    pending: "日程は後日発表",
  },
} satisfies Record<Locale, {
  tagline: string
  description: string
  menu: string
  order: (venue: string) => string
  pending: string
}>

export function hotReloadPath(edition?: HotReloadEdition, menu = false) {
  return `/events/hot-reload${edition ? `/${edition.number}${menu ? "/menu" : ""}` : ""}`
}

/** Public catalog data only: social crawlers never need attendee or order access. */
export function hotReloadPreview(locale: Locale, edition?: HotReloadEdition, menu = false) {
  const t = copy[locale]
  const name = edition ? `Hot Reload #${String(edition.number).padStart(2, "0")}` : "Hot Reload"
  return {
    path: hotReloadPath(edition, menu),
    title: menu ? t.menu : name,
    description: edition
      ? menu ? t.order(edition.venue) : `${t.tagline} · ${edition.venue}, ${edition.city}.`
      : t.description,
    eyebrow: menu ? name : edition?.partner ? `Crafter Station × ${edition.partner}` : t.tagline,
    detail: edition
      ? [edition.date || t.pending, edition.time, edition.city].filter(Boolean).join(" · ")
      : undefined,
    poster: edition?.socialPoster ?? edition?.poster,
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
