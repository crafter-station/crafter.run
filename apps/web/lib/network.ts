import { defaultLocale, type Locale, withLocale } from "@/lib/i18n"
import { stationCopy } from "@/lib/station-copy"

export const networkAreas = [
  { id: "research", name: "Research", domain: "crafter.ing", href: "https://crafter.ing", color: "#79ac65", surface: "#dce6c9", ink: "#304a32" },
  { id: "lab", name: "Lab", domain: "github.com/crafter-lab", href: "https://github.com/crafter-lab", color: "#6f9bce", surface: "#dce7ed", ink: "#324c60" },
  { id: "games", name: "Games", domain: "games.crafter.run", href: "https://games.crafter.run", color: "#9d83d2", surface: "#e6def1", ink: "#554168" },
  { id: "station", name: "Station", domain: "crafter.run", href: "/", color: "#f8e9a4", surface: "#f0e7bf", ink: "#554b27" },
] as const

export type NetworkArea = typeof networkAreas[number]["id"]

const descriptions: Record<Locale, Record<NetworkArea, string>> = {
  es: {
    research: "Preguntas abiertas y conocimiento compartido. Investigamos nuevas formas de crear con tecnología.",
    lab: "Hardware, fabricación y prototipos físicos. Exploramos cómo conectar el código con objetos que podemos construir, tocar y probar.",
    games: "Mundos por imaginar, mecánicas por descubrir. Creamos desde la curiosidad de jugar.",
    station: "El punto de encuentro. Comunidad, código abierto y experiencias para construir en compañía.",
  },
  en: {
    research: "Open questions and shared knowledge. Exploring new ways to create with technology.",
    lab: "Hardware, fabrication, and physical prototypes. We explore how code connects with objects we can build, touch, and test.",
    games: "Worlds to imagine, mechanics to discover. Creating through the curiosity of play.",
    station: "Our meeting point. Community, open source, and experiences for building together.",
  },
  pt: {
    research: "Perguntas abertas e conhecimento compartilhado. Pesquisamos novas formas de criar com tecnologia.",
    lab: "Hardware, fabricação e protótipos físicos. Exploramos como conectar código a objetos que podemos construir, tocar e testar.",
    games: "Mundos para imaginar, mecânicas para descobrir. Criamos a partir da curiosidade de jogar.",
    station: "Nosso ponto de encontro. Comunidade, código aberto e experiências para construir em companhia.",
  },
  zh: {
    research: "开放的问题，共享的知识。探索用技术创造的新方式。",
    lab: "硬件、制造与实体原型。我们探索如何将代码与可以构建、触摸和测试的物体连接起来。",
    games: "想象世界，发现玩法。从游戏的好奇心出发创造。",
    station: "我们的相聚之处。通过社区、开源与活动，一起构建。",
  },
  ja: {
    research: "開かれた問いと、分かち合う知識。テクノロジーでつくる新しい方法を探ります。",
    lab: "ハードウェア、製作、実物のプロトタイプ。つくり、触れ、試せるものとコードをつなぐ方法を探ります。",
    games: "世界を想像し、遊び方を発見する。遊ぶ好奇心から、つくり始めます。",
    station: "みんなが出会う場所。コミュニティ、オープンソース、イベントを通じて、一緒につくります。",
  },
}

export function getNetwork(locale: Locale = defaultLocale) {
  return networkAreas.map(area => ({
    ...area,
    href: area.href === "/" ? withLocale("/", locale) : area.href,
    tagline: stationCopy[locale][area.id],
    description: descriptions[locale][area.id],
  }))
}
