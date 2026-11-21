import { type Locale, withLocale } from "@/lib/i18n"

export type FeaturedTopic = {
  slug: string
  badge: string
  text: string
  cta: string
  ariaLabel: string
  href: string
  hrefLang: "en" | "es"
}

const SLUG = "ojito-0-2-4"

const copy: Record<Locale, Omit<FeaturedTopic, "slug" | "href" | "hrefLang">> = {
  en: {
    badge: "New",
    text: "Ojito 0.2.4 · Your Mac's memory now speaks Spanish & Claude Desktop",
    cta: "Read changelog",
    ariaLabel: "Featured release",
  },
  es: {
    badge: "Nuevo",
    text: "Ojito 0.2.4 · La memoria de tu Mac ya habla español y Claude Desktop",
    cta: "Leer changelog",
    ariaLabel: "Lanzamiento destacado",
  },
  pt: {
    badge: "Novo",
    text: "Ojito 0.2.4 · A memória do seu Mac agora fala espanhol e Claude Desktop",
    cta: "Ler changelog",
    ariaLabel: "Lançamento em destaque",
  },
  zh: {
    badge: "新发布",
    text: "Ojito 0.2.4 · 你的 Mac 记忆现已支持西班牙语与 Claude Desktop",
    cta: "查看更新日志",
    ariaLabel: "精选发布",
  },
  ja: {
    badge: "新着",
    text: "Ojito 0.2.4 · Mac の記憶がスペイン語と Claude Desktop に対応",
    cta: "更新履歴を見る",
    ariaLabel: "注目のリリース",
  },
}

export function getFeaturedTopic(locale: Locale): FeaturedTopic {
  const hrefLang: "en" | "es" = locale === "es" ? "es" : "en"
  return {
    slug: SLUG,
    ...copy[locale],
    href: withLocale(`/changelog/${SLUG}`, hrefLang),
    hrefLang,
  }
}
