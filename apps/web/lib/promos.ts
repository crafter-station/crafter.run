import type { Locale } from "@/lib/i18n"

/**
 * Event promoted at the end of every blog post while it is upcoming.
 * Pages are static, so a promo disappears on the first build after `endsAt`.
 */
export type Promo = {
  href: string
  image: string
  endsAt: string
  copy: Record<Locale, { title: string; body: string; cta: string }>
}

const promos: Promo[] = [
  {
    href: "https://luma.com/hack0-lfc2",
    image: "/promos/taste-hacking.webp",
    endsAt: "2026-11-20T01:30:00Z",
    copy: {
      es: {
        title: "Taste hacking: desarma cualquier web y reconstrúyela con IA.",
        body: "Workshop online de hack0 con Railly Hugo. Jueves 19 de noviembre, 7 p. m. hora de Lima.",
        cta: "Reservar mi lugar",
      },
      en: {
        title: "Taste hacking: take apart any website and rebuild it with AI.",
        body: "An online hack0 workshop with Railly Hugo, in Spanish. Thursday, November 19, 7 p.m. Lima time.",
        cta: "Save my spot",
      },
      pt: {
        title: "Taste hacking: desmonte qualquer site e reconstrua com IA.",
        body: "Workshop online da hack0 com Railly Hugo, em espanhol. Quinta, 19 de novembro, 19h no horário de Lima.",
        cta: "Garantir minha vaga",
      },
      zh: {
        title: "Taste hacking：拆解任何网站，再用 AI 重建。",
        body: "hack0 线上工作坊，由 Railly Hugo 主讲，西班牙语进行。11 月 19 日（周四）利马时间晚上 7 点。",
        cta: "预留名额",
      },
      ja: {
        title: "Taste hacking：どんなサイトも分解して、AI で作り直す。",
        body: "Railly Hugo による hack0 のオンラインワークショップ（スペイン語）。11 月 19 日（木）リマ時間 19 時。",
        cta: "参加を予約する",
      },
    },
  },
]

export function activePromo(now = new Date()): Promo | undefined {
  return promos.find((promo) => new Date(promo.endsAt) > now)
}
