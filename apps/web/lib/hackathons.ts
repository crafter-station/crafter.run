import type { Locale } from "@/lib/i18n"

/** Public facts about hackathons Crafter Station organized. Nothing here comes from attendee data. */

export type HackathonJudge = { name: string; role: string }

type HackathonText = {
  /** One sentence for llms.txt, metadata and cards. */
  summary: string
  /** Short paragraphs shown under the title. */
  body: string[]
  date: string
  place: string
  /** Extra labeled facts, e.g. the prize or attendance. */
  facts: { label: string; value: string }[]
  /** Heading above the judges list, when there is one. */
  judgesTitle?: string
}

export type Hackathon = {
  slug: string
  name: string
  /** ISO date or year. A year is used when the exact day is not on record. */
  startDate: string
  endDate?: string
  /** Place names for structured data. */
  places: string[]
  country?: "PE"
  officialUrl?: string
  deckUrl?: string
  judges?: HackathonJudge[]
  copy: Record<Locale, HackathonText>
}

export const hackathons: Hackathon[] = [
  {
    slug: "ia-hackathon-peru-2025",
    name: "IA Hackathon Perú 2025",
    startDate: "2025-11-29",
    endDate: "2025-11-30",
    places: ["Peru"],
    country: "PE",
    officialUrl: "https://peru.ai-hackathon.co",
    judges: [
      { name: "Adrian Mastronardi", role: "CTO, Habi" },
      { name: "Martin Pelaez", role: "CTO & co-founder, Finity" },
      { name: "Piero Sifuentes", role: "Co-founder & CTO, Hapi" },
      { name: "Sebastian Ruiz", role: "Program Lead, UTEC Ventures" },
      { name: "Gonzalo Aller", role: "Business Incubator Manager" },
    ],
    copy: {
      en: {
        summary: "AI hackathon in Peru on 29 and 30 November 2025, co-organized by Crafter Station.",
        body: [
          "IA Hackathon Perú 2025 was an AI hackathon held in Peru on 29 and 30 November 2025. Crafter Station co-organized it.",
          "The official site has the format, the schedule and the results.",
        ],
        date: "29 to 30 November 2025",
        place: "Peru",
        facts: [
          { label: "Main prize", value: "USD 1,500 in cash and an invitation to represent Peru at START Hack in Switzerland, with stay and meals included." },
          { label: "Next editions", value: "Two more editions are planned for 2026." },
        ],
        judgesTitle: "Judges",
      },
      es: {
        summary: "Hackathon de IA en Perú el 29 y 30 de noviembre de 2025, coorganizado por Crafter Station.",
        body: [
          "IA Hackathon Perú 2025 fue un hackathon de inteligencia artificial realizado en Perú el 29 y 30 de noviembre de 2025. Crafter Station lo coorganizó.",
          "El sitio oficial tiene el formato, el cronograma y los resultados.",
        ],
        date: "29 y 30 de noviembre de 2025",
        place: "Perú",
        facts: [
          { label: "Premio principal", value: "USD 1,500 en efectivo y una invitación para representar a Perú en START Hack, en Suiza, con estadía y comidas incluidas." },
          { label: "Próximas ediciones", value: "Hay dos ediciones más planificadas para 2026." },
        ],
        judgesTitle: "Jurado",
      },
      pt: {
        summary: "Hackathon de IA no Peru em 29 e 30 de novembro de 2025, coorganizado pela Crafter Station.",
        body: [
          "O IA Hackathon Perú 2025 foi um hackathon de inteligência artificial realizado no Peru em 29 e 30 de novembro de 2025. A Crafter Station o coorganizou.",
          "O site oficial traz o formato, o cronograma e os resultados.",
        ],
        date: "29 e 30 de novembro de 2025",
        place: "Peru",
        facts: [
          { label: "Prêmio principal", value: "USD 1.500 em dinheiro e um convite para representar o Peru no START Hack, na Suíça, com hospedagem e refeições incluídas." },
          { label: "Próximas edições", value: "Mais duas edições estão planejadas para 2026." },
        ],
        judgesTitle: "Jurados",
      },
      zh: {
        summary: "2025 年 11 月 29 日至 30 日在秘鲁举办的 AI 黑客松，由 Crafter Station 联合主办。",
        body: [
          "IA Hackathon Perú 2025 是 2025 年 11 月 29 日至 30 日在秘鲁举办的 AI 黑客松，由 Crafter Station 联合主办。",
          "赛制、日程和结果请见官方网站。",
        ],
        date: "2025 年 11 月 29 日至 30 日",
        place: "秘鲁",
        facts: [
          { label: "主要奖项", value: "1,500 美元现金，以及代表秘鲁参加瑞士 START Hack 的邀请，含食宿。" },
          { label: "后续赛事", value: "2026 年计划再举办两届。" },
        ],
        judgesTitle: "评委",
      },
      ja: {
        summary: "2025年11月29日と30日にペルーで開催された AI ハッカソン。Crafter Station が共同主催。",
        body: [
          "IA Hackathon Perú 2025 は、2025年11月29日と30日にペルーで開催された AI ハッカソンです。Crafter Station が共同主催しました。",
          "形式、スケジュール、結果は公式サイトにあります。",
        ],
        date: "2025年11月29日から30日",
        place: "ペルー",
        facts: [
          { label: "最優秀賞", value: "現金1,500米ドルと、スイスの START Hack にペルー代表として参加する招待。滞在費と食事を含みます。" },
          { label: "次回の開催", value: "2026年にさらに2回の開催を予定しています。" },
        ],
        judgesTitle: "審査員",
      },
    },
  },
  {
    slug: "v0-crafter-station-hackathon-2025",
    name: "v0 x Crafter Station Hackathon",
    startDate: "2025",
    places: ["Lima", "Medellín", "Bogotá", "Arequipa"],
    deckUrl: "https://v0.crafter.run/deck",
    copy: {
      en: {
        summary: "2025 hackathon across Lima, Medellín, Bogotá and Arequipa: 220+ registered, 118 attended, 66 projects built.",
        body: ["The v0 x Crafter Station Hackathon took place in 2025 in four cities: Lima, Medellín, Bogotá and Arequipa.", "The deck has the full recap."],
        date: "2025",
        place: "Lima, Medellín, Bogotá and Arequipa",
        facts: [
          { label: "Registered", value: "220+" },
          { label: "Attended", value: "118" },
          { label: "Projects built", value: "66" },
        ],
      },
      es: {
        summary: "Hackathon de 2025 en Lima, Medellín, Bogotá y Arequipa: más de 220 inscritos, 118 asistentes y 66 proyectos construidos.",
        body: ["El v0 x Crafter Station Hackathon se realizó en 2025 en cuatro ciudades: Lima, Medellín, Bogotá y Arequipa.", "El deck tiene el resumen completo."],
        date: "2025",
        place: "Lima, Medellín, Bogotá y Arequipa",
        facts: [
          { label: "Inscritos", value: "Más de 220" },
          { label: "Asistentes", value: "118" },
          { label: "Proyectos construidos", value: "66" },
        ],
      },
      pt: {
        summary: "Hackathon de 2025 em Lima, Medellín, Bogotá e Arequipa: mais de 220 inscritos, 118 presentes e 66 projetos construídos.",
        body: ["O v0 x Crafter Station Hackathon aconteceu em 2025 em quatro cidades: Lima, Medellín, Bogotá e Arequipa.", "O deck traz o resumo completo."],
        date: "2025",
        place: "Lima, Medellín, Bogotá e Arequipa",
        facts: [
          { label: "Inscritos", value: "Mais de 220" },
          { label: "Presentes", value: "118" },
          { label: "Projetos construídos", value: "66" },
        ],
      },
      zh: {
        summary: "2025 年在利马、麦德林、波哥大和阿雷基帕举办的黑客松：220 多人报名，118 人到场，完成 66 个项目。",
        body: ["v0 x Crafter Station Hackathon 于 2025 年在四座城市举办：利马、麦德林、波哥大和阿雷基帕。", "完整回顾请见演示文稿。"],
        date: "2025 年",
        place: "利马、麦德林、波哥大和阿雷基帕",
        facts: [
          { label: "报名人数", value: "220 多人" },
          { label: "到场人数", value: "118" },
          { label: "完成的项目", value: "66" },
        ],
      },
      ja: {
        summary: "2025年にリマ、メデジン、ボゴタ、アレキパで開催されたハッカソン。登録220人以上、参加118人、66件のプロジェクト。",
        body: ["v0 x Crafter Station Hackathon は、2025年にリマ、メデジン、ボゴタ、アレキパの4都市で開催されました。", "詳しい振り返りはデッキにあります。"],
        date: "2025年",
        place: "リマ、メデジン、ボゴタ、アレキパ",
        facts: [
          { label: "登録者", value: "220人以上" },
          { label: "参加者", value: "118" },
          { label: "作られたプロジェクト", value: "66" },
        ],
      },
    },
  },
]

export function findHackathon(slug: string) {
  return hackathons.find((hackathon) => hackathon.slug === slug)
}

/** The unlocalized route, as listed in indexablePaths. */
export function hackathonRoute(hackathon: Hackathon) {
  return `/events/hackathons/${hackathon.slug}`
}

export function hackathonPath(locale: Locale, hackathon: Hackathon) {
  return `/${locale}${hackathonRoute(hackathon)}`
}

export const hackathonUi: Record<
  Locale,
  { eyebrow: string; events: string; date: string; place: string; organizer: string; official: string; deck: string; back: string; more: string }
> = {
  en: { eyebrow: "Hackathon", events: "Events", date: "Date", place: "Place", organizer: "Organizer", official: "Official site", deck: "Read the deck", back: "All events", more: "Other hackathons" },
  es: { eyebrow: "Hackathon", events: "Eventos", date: "Fecha", place: "Lugar", organizer: "Organizador", official: "Sitio oficial", deck: "Ver el deck", back: "Todos los eventos", more: "Otros hackathons" },
  pt: { eyebrow: "Hackathon", events: "Eventos", date: "Data", place: "Local", organizer: "Organizador", official: "Site oficial", deck: "Ver o deck", back: "Todos os eventos", more: "Outros hackathons" },
  zh: { eyebrow: "黑客松", events: "活动", date: "日期", place: "地点", organizer: "主办方", official: "官方网站", deck: "查看演示文稿", back: "全部活动", more: "其他黑客松" },
  ja: { eyebrow: "ハッカソン", events: "イベント", date: "日付", place: "場所", organizer: "主催", official: "公式サイト", deck: "デッキを見る", back: "すべてのイベント", more: "ほかのハッカソン" },
}
