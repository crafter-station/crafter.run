import type { Locale } from "@/lib/i18n"

const es = {
  title: "Quién hizo posible cada evento",
  summary: (partners: number, events: number) => `${partners} empresas e instituciones en ${events} hackathons.`,
  raised: (amount: string) => `${amount} recaudados`,
  backers: (n: number) => (n === 1 ? "1 aliado" : `${n} aliados`),
  all: "Ver todos los hackathons",
}

const en: typeof es = {
  title: "Who backed each event",
  summary: (partners, events) => `${partners} companies and institutions across ${events} hackathons.`,
  raised: (amount) => `${amount} raised`,
  backers: (n) => (n === 1 ? "1 backer" : `${n} backers`),
  all: "See every hackathon",
}

const pt: typeof es = {
  title: "Quem tornou cada evento possível",
  summary: (partners, events) => `${partners} empresas e instituições em ${events} hackathons.`,
  raised: (amount) => `${amount} arrecadados`,
  backers: (n) => (n === 1 ? "1 apoiador" : `${n} apoiadores`),
  all: "Ver todos os hackathons",
}

const zh: typeof es = {
  title: "每场活动背后的支持者",
  summary: (partners, events) => `${events} 场黑客松，${partners} 家企业与机构。`,
  raised: (amount) => `筹集 ${amount}`,
  backers: (n) => `${n} 家支持者`,
  all: "查看全部黑客松",
}

const ja: typeof es = {
  title: "各イベントを支えてくれた人たち",
  summary: (partners, events) => `${events} 回のハッカソンで ${partners} の企業と機関。`,
  raised: (amount) => `${amount} を調達`,
  backers: (n) => `${n} の支援者`,
  all: "すべてのハッカソンを見る",
}

export const backersCopy: Record<Locale, typeof es> = { es, en, pt, zh, ja }
