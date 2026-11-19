import type { Locale } from "@/lib/i18n"

type BucleCopy = {
  hero: string
  ossTitle: string
  ossSubtitle: string
  ossBody: string
  ossExplore: string
  interfaces: string
  companions: string
  tools: string
  brew: string
  ship: string
  encounter: string
  make: string
}

export const bucleCopy: Record<Locale, BucleCopy> = {
  es: {
    hero: "Eventos, código abierto, trabajos y proyectos shipeados: donde builders y empresas de Latinoamérica trabajan juntos.",
    ossTitle: "Código abierto.", ossSubtitle: "Posibilidades abiertas.",
    ossBody: "Herramientas que nacen de la curiosidad y crecen cuando las compartimos.",
    ossExplore: "Explorar todo el código abierto",
    interfaces: "Interfaces", companions: "Compañeros digitales", tools: "Herramientas",
    brew: "Café, código y comunidad.", ship: "Una idea. Un equipo. A lanzar.",
    encounter: "Encuentros", make: "Construir juntos",
  },
  en: {
    hero: "Events, open source, jobs and shipped projects: where Latin American builders and companies work together.",
    ossTitle: "Open source.", ossSubtitle: "Open possibilities.",
    ossBody: "Tools born from curiosity, made better by sharing.",
    ossExplore: "Explore all open source",
    interfaces: "Interfaces", companions: "Digital companions", tools: "Tools",
    brew: "Coffee, code & community.", ship: "An idea. A crew. Time to ship.",
    encounter: "Get together", make: "Build together",
  },
  pt: {
    hero: "Eventos, código aberto, vagas e projetos lançados: onde builders e empresas da América Latina trabalham juntos.",
    ossTitle: "Código aberto.", ossSubtitle: "Possibilidades abertas.",
    ossBody: "Ferramentas que nascem da curiosidade e crescem quando compartilhamos.",
    ossExplore: "Explorar todo o código aberto",
    interfaces: "Interfaces", companions: "Companheiros digitais", tools: "Ferramentas",
    brew: "Café, código e comunidade.", ship: "Uma ideia. Uma equipe. Hora de lançar.",
    encounter: "Encontros", make: "Criar juntos",
  },
  zh: {
    hero: "活动、开源、工作机会与已发布的项目：拉美开发者与企业在这里携手共建。",
    ossTitle: "开放源代码。", ossSubtitle: "开放无限可能。",
    ossBody: "工具源于好奇，在分享中不断成长。",
    ossExplore: "探索所有开源项目",
    interfaces: "界面", companions: "数字伙伴", tools: "工具",
    brew: "咖啡、代码与社区。", ship: "一个想法。一支团队。一起发布。",
    encounter: "相聚", make: "一起创造",
  },
  ja: {
    hero: "イベント、オープンソース、仕事、リリースしたプロジェクト。ラテンアメリカのビルダーと企業がともに働く場所。",
    ossTitle: "オープンソース。", ossSubtitle: "ひらかれた可能性。",
    ossBody: "好奇心から生まれ、共有することで育つツール。",
    ossExplore: "すべてのオープンソースを見る",
    interfaces: "インターフェース", companions: "デジタルの仲間", tools: "ツール",
    brew: "コーヒー、コード、コミュニティ。", ship: "アイデアと仲間。さあ、リリースしよう。",
    encounter: "出会う", make: "一緒につくる",
  },
}
