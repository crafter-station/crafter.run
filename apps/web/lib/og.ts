import { defaultLocale, type Locale } from "@/lib/i18n"

/** Change when the visual system changes so previously shared URLs get a new image. */
export const OG_VERSION = "station-20261006"
export const OG_SIZE = { width: 1200, height: 630 } as const

export type SocialKind = "home" | "oss" | "universe" | "journal" | "events" | "hot-reload" | "bounties" | "team" | "people" | "ships" | "docs" | "contact" | "brand" | "metrics"

export function socialKind(path: string): SocialKind {
  if (path === "/") return "home"
  if (path.startsWith("/blog")) return "journal"
  if (path.startsWith("/bounties")) return "bounties"
  if (path.startsWith("/team")) return "team"
  if (path.startsWith("/crafters")) return "people"
  if (path.startsWith("/docs")) return "docs"
  if (path === "/events/hot-reload" || path.startsWith("/events/hot-reload/")) return "hot-reload"
  if (path.startsWith("/events")) return "events"
  if (path.startsWith("/oss/metrics") || path.startsWith("/impact") || path === "/timeline") return "metrics"
  if (path.startsWith("/oss")) return "oss"
  if (path === "/universe") return "universe"
  if (path.startsWith("/ships") || path === "/hackathons") return "ships"
  if (path === "/brand") return "brand"
  return "contact"
}

export function socialText(value: string | null | undefined, limit: number) {
  const text = (value ?? "").replace(/[\u0000-\u001f\u007f]/g, " ").replace(/\s+/g, " ").trim()
  const chars = Array.from(text)
  return chars.length <= limit ? text : `${chars.slice(0, limit - 1).join("").trimEnd()}…`
}

export function socialImageUrl(title: string, locale: Locale = defaultLocale, options: {
  path?: string
  description?: string
  eyebrow?: string
} = {}) {
  const params = new URLSearchParams({
    v: OG_VERSION,
    lang: locale,
    path: options.path ?? "/",
    title: socialText(title, 180),
  })
  if (options.description) params.set("description", socialText(options.description, 210))
  if (options.eyebrow) params.set("eyebrow", socialText(options.eyebrow, 70))
  return `/og?${params.toString()}`
}

export const socialLabels: Record<Locale, Record<SocialKind, string>> = {
  en: { home: "Made in the open", oss: "Open source", universe: "The Crafter universe", journal: "Crafter Journal", events: "Meet. Learn. Build.", "hot-reload": "Coffee, code and community", bounties: "The bounty board", team: "The people behind it", people: "The community", ships: "Made by the community", docs: "Documentation", contact: "Let's make something", brand: "The Crafter identity", metrics: "Built in the open" },
  es: { home: "Hecho en abierto", oss: "Código abierto", universe: "El universo Crafter", journal: "Crafter Journal", events: "Encontrarnos para crear", "hot-reload": "Café, código y comunidad", bounties: "El tablero de bounties", team: "La gente detrás", people: "La comunidad", ships: "Hecho por la comunidad", docs: "Documentación", contact: "Hagamos algo juntos", brand: "La identidad Crafter", metrics: "Construido en abierto" },
  pt: { home: "Feito em aberto", oss: "Código aberto", universe: "O universo Crafter", journal: "Crafter Journal", events: "Encontros para criar", "hot-reload": "Café, código e comunidade", bounties: "O mural de bounties", team: "As pessoas por trás", people: "A comunidade", ships: "Feito pela comunidade", docs: "Documentação", contact: "Vamos criar juntos", brand: "A identidade Crafter", metrics: "Construído em aberto" },
  zh: { home: "开放构建", oss: "开源", universe: "Crafter 宇宙", journal: "Crafter Journal", events: "相聚、学习、创造", "hot-reload": "咖啡、代码与社区", bounties: "悬赏看板", team: "幕后的伙伴", people: "社区", ships: "社区创造", docs: "文档", contact: "一起创造", brand: "Crafter 品牌", metrics: "开放构建" },
  ja: { home: "オープンにつくる", oss: "オープンソース", universe: "Crafter ユニバース", journal: "Crafter Journal", events: "出会い、学び、つくる", "hot-reload": "コーヒー、コード、コミュニティ", bounties: "バウンティボード", team: "つくる人たち", people: "コミュニティ", ships: "コミュニティの作品", docs: "ドキュメント", contact: "一緒につくろう", brand: "Crafter のアイデンティティ", metrics: "オープンなものづくり" },
}

export const socialPalettes: Record<SocialKind, { paper: string; ink: string; muted: string; accent: string; wash: string }> = {
  home: { paper: "#f7f6ee", ink: "#272b23", muted: "#686c5e", accent: "#e0bd55", wash: "#e9edda" },
  oss: { paper: "#f1f5e9", ink: "#294135", muted: "#637562", accent: "#bccf99", wash: "#dce8c7" },
  universe: { paper: "#f7f5eb", ink: "#454936", muted: "#747663", accent: "#d8cca1", wash: "#e7e9d4" },
  journal: { paper: "#f3eff7", ink: "#50425d", muted: "#7f718a", accent: "#cdbdde", wash: "#e3d9ed" },
  events: { paper: "#edf2f4", ink: "#324d65", muted: "#6b7f91", accent: "#dacf97", wash: "#dce7ec" },
  "hot-reload": { paper: "#f6f3e9", ink: "#424934", muted: "#757963", accent: "#c6b580", wash: "#e5e7d3" },
  bounties: { paper: "#f8f1e4", ink: "#664932", muted: "#8a7059", accent: "#b87951", wash: "#efd7a9" },
  team: { paper: "#f8f5e9", ink: "#363a2c", muted: "#7c7b63", accent: "#d8c375", wash: "#f0e6b5" },
  people: { paper: "#f3f2e9", ink: "#3d4537", muted: "#6f7a64", accent: "#c6cfa9", wash: "#e5e8d3" },
  ships: { paper: "#f7f3e8", ink: "#594932", muted: "#8a775c", accent: "#e3c685", wash: "#ede2c7" },
  docs: { paper: "#edf3f0", ink: "#344d45", muted: "#6c8178", accent: "#b7cfc2", wash: "#dce9e1" },
  contact: { paper: "#f2f3ea", ink: "#485239", muted: "#7a816c", accent: "#c6cdab", wash: "#e0e6cf" },
  brand: { paper: "#f8f4e5", ink: "#4c452c", muted: "#867b5b", accent: "#e5cc77", wash: "#f0e5b9" },
  metrics: { paper: "#edf2ee", ink: "#324b3e", muted: "#6c8171", accent: "#bad0b0", wash: "#dce8d8" },
}
