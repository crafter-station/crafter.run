import type { Locale } from "@/lib/i18n"
import { getTeamMember, type TeamMember } from "@/lib/team"

/** Areas where the Crew works. Each one is led by a Core member. */
export const crewAreas = ["hack0", "research"] as const

export type CrewArea = (typeof crewAreas)[number]

export const crewAreaLeads: Record<CrewArea, TeamMember["username"]> = {
  hack0: "nacho",
  research: "liz",
}

export type CrewOrg = { name: string; url: string }

export const crewOrgs = {
  datadaf: { name: "DATAdaf", url: "https://datadaf.com" },
  nucleolab: { name: "Núcleo Lab", url: "https://www.nucleo.la" },
} satisfies Record<string, CrewOrg>

export type CrewOrgId = keyof typeof crewOrgs

/**
 * People who collaborate in one area of Crafter without being Core. Kept apart from
 * `teamMembers` on purpose: that list grants access to the private /core pages.
 */
export type CrewMember = {
  username: string
  name: string
  area: CrewArea
  role: Record<Locale, string>
  org?: CrewOrgId
  link: string
  image?: string
}

export const crewMembers: CrewMember[] = [
  {
    username: "mayckolco",
    name: "Mayckol Cruzado",
    area: "hack0",
    role: {
      en: "Notion, Make and Replit Ambassador",
      es: "Ambassador de Notion, Make y Replit",
      pt: "Ambassador de Notion, Make e Replit",
      zh: "Notion、Make 与 Replit 大使",
      ja: "Notion・Make・Replit アンバサダー",
    },
    org: "nucleolab",
    link: "https://www.mayckolco.com",
    image: "/team/crew/mayckol-v1.webp",
  },
  {
    username: "javierfloresmacias",
    name: "Javier Flores Macías",
    area: "hack0",
    role: {
      en: "n8n Ambassador, teaches at Platzi",
      es: "Ambassador de n8n, profesor en Platzi",
      pt: "Ambassador de n8n, professor na Platzi",
      zh: "n8n 大使，Platzi 讲师",
      ja: "n8n アンバサダー、Platzi 講師",
    },
    org: "nucleolab",
    link: "https://www.linkedin.com/in/javierfloresmacias/",
    image: "/team/crew/javo-v1.webp",
  },
  {
    username: "dieego_jesus",
    name: "Diego Jesus",
    area: "research",
    role: {
      en: "Political scientist, data visualization",
      es: "Politólogo, visualización de datos",
      pt: "Cientista político, visualização de dados",
      zh: "政治学者，数据可视化",
      ja: "政治学者、データ可視化",
    },
    org: "datadaf",
    link: "https://x.com/dieego_jesus",
    image: "/team/crew/diego-v1.webp",
  },
  {
    username: "antony-alvarez",
    name: "Antony Alvarez",
    area: "research",
    role: {
      en: "Political scientist, data analysis",
      es: "Politólogo, análisis de datos",
      pt: "Cientista político, análise de dados",
      zh: "政治学者，数据分析",
      ja: "政治学者、データ分析",
    },
    org: "datadaf",
    link: "https://datadaf.com",
    image: "/team/crew/antony-v1.webp",
  },
  {
    username: "bdiazc90",
    name: "Bruno Díaz",
    area: "research",
    role: {
      en: "Software developer, built masfacil.pe",
      es: "Desarrollador, creó masfacil.pe",
      pt: "Desenvolvedor, criou masfacil.pe",
      zh: "开发者，masfacil.pe 作者",
      ja: "開発者、masfacil.pe の作者",
    },
    link: "https://github.com/bdiazc90",
    image: "/team/crew/bruno-v1.webp",
  },
]

export function crewByArea(members: CrewMember[] = crewMembers) {
  return crewAreas.map((area) => {
    const lead = getTeamMember(crewAreaLeads[area])
    if (!lead || lead.alumni) throw new Error(`Crew area ${area} needs an active Core lead`)
    return { area, lead, members: members.filter((member) => member.area === area) }
  })
}

export function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase()
}
