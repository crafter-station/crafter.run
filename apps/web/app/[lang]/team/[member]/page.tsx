import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getTranslations } from "next-intl/server"
import type { ReactNode } from "react"
import { ArrowLink } from "@/components/arrow-link"
import { BuildingCalendar } from "@/components/building-calendar"
import { CalEmbed } from "@/components/cal-embed"
import { CurrentlyListening } from "@/components/currently-listening"
import { GearList } from "@/components/gear-list"
import { Container, SectionGap } from "@/components/grid-container"
import { LocalTime } from "@/components/local-time"
import { MemberTabs } from "@/components/member-tabs"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { JsonLd } from "@/components/json-ld"
import { getBuildingActivity } from "@/lib/github"
import { isLocale, withLocale } from "@/lib/i18n"
import { buildMetadata } from "@/lib/seo"
import { breadcrumbList, personSchema } from "@/lib/structured-data"
import { getTeamMember, teamMembers } from "@/lib/team"

export const dynamicParams = false
export const revalidate = 86400

function calSlug(cal?: string) {
  return cal?.replace("https://cal.com/", "")
}

const STACK_ORDER = ["Languages", "Frontend", "Backend", "Database", "Data", "AI", "DevOps & Cloud", "Design", "Game", "Tools"]
const SOFTWARE_ORDER = ["Editor & Terminal", "Design", "Game", "Productivity", "Media", "Communication", "Browser"]
const HARDWARE_ORDER = ["Computers", "Audio & Video", "Peripherals", "Accessories"]

// Software every team member uses; merged into each member's own software.
const COMMON_SOFTWARE: { category: string; items: string[] }[] = [
  { category: "Productivity", items: ["Linear"] },
  { category: "Communication", items: ["WhatsApp"] },
]

function orderGroups<T extends { category: string }>(groups: T[], order: string[]): T[] {
  const rank = (c: string) => {
    const i = order.indexOf(c)
    return i === -1 ? order.length : i
  }
  return [...groups].sort((a, b) => rank(a.category) - rank(b.category))
}

type GearItem = string | { name: string; detail?: string }

function mergeSoftware(
  software: { category: string; items: GearItem[] }[] | undefined,
): { category: string; items: GearItem[] }[] {
  const nameOf = (item: GearItem) => (typeof item === "string" ? item : item.name)
  const groups = (software ?? []).map((g) => ({ category: g.category, items: [...g.items] }))
  for (const common of COMMON_SOFTWARE) {
    const existing = groups.find((g) => g.category === common.category)
    if (existing) {
      for (const item of common.items) {
        if (!existing.items.some((i) => nameOf(i) === item)) existing.items.push(item)
      }
    } else {
      groups.push({ category: common.category, items: [...common.items] })
    }
  }
  return groups
}

function socials(member: NonNullable<ReturnType<typeof getTeamMember>>) {
  return [
    member.github && { label: "GitHub", href: member.github },
    member.x && { label: "X", href: member.x },
    member.linkedin && { label: "LinkedIn", href: member.linkedin },
    member.instagram && { label: "Instagram", href: member.instagram },
    member.website && { label: "Website", href: member.website },
    member.email && { label: "Email", href: `mailto:${member.email}` },
  ].filter(Boolean) as { label: string; href: string }[]
}

const raillyImpact = {
  en: {
    eyebrow: "Petdex impact, Q2 2026",
    metrics: [
      ["28,875", "npm downloads"],
      ["3,218", "net new stars"],
      ["612", "Petdex contributions"],
      ["#86", "OSSCAR Emerging"],
    ],
    report: "Impact report",
    github: "Petdex on GitHub",
  },
  es: {
    eyebrow: "Impacto de Petdex, Q2 2026",
    metrics: [
      ["28,875", "descargas npm"],
      ["3,218", "nuevas estrellas netas"],
      ["612", "contribuciones a Petdex"],
      ["#86", "OSSCAR Emerging"],
    ],
    report: "Reporte de impacto",
    github: "Petdex en GitHub",
  },
  pt: {
    eyebrow: "Impacto do Petdex, Q2 2026",
    metrics: [
      ["28,875", "downloads npm"],
      ["3,218", "novas estrelas liquidas"],
      ["612", "contribuicoes ao Petdex"],
      ["#86", "OSSCAR Emerging"],
    ],
    report: "Relatorio de impacto",
    github: "Petdex no GitHub",
  },
  zh: {
    eyebrow: "Petdex 影响力，2026 年 Q2",
    metrics: [
      ["28,875", "npm 下载量"],
      ["3,218", "净新增 star"],
      ["612", "Petdex 贡献"],
      ["#86", "OSSCAR Emerging"],
    ],
    report: "影响力报告",
    github: "Petdex 的 GitHub",
  },
  ja: {
    eyebrow: "Petdex のインパクト、2026年Q2",
    metrics: [
      ["28,875", "npm ダウンロード"],
      ["3,218", "純増スター"],
      ["612", "Petdex へのコントリビューション"],
      ["#86", "OSSCAR Emerging"],
    ],
    report: "インパクトレポート",
    github: "GitHub で Petdex を見る",
  },
} as const

export function generateStaticParams() {
  return ["en", "es", "pt", "zh", "ja"].flatMap((lang) =>
    teamMembers.map((member) => ({ lang, member: member.username })),
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; member: string }>
}) {
  const { lang, member } = await params
  if (!isLocale(lang)) return {}
  const teamMember = getTeamMember(member)
  if (!teamMember) return {}

  return buildMetadata({
    locale: lang,
    path: `/team/${teamMember.username}`,
    title: `${teamMember.name}, ${teamMember.role}`,
    description: teamMember.bio[lang] ?? teamMember.bio.en,
  })
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string; member: string }>
}) {
  const { lang, member } = await params
  if (!isLocale(lang)) notFound()
  const teamMember = getTeamMember(member)
  if (!teamMember) notFound()

  const t = await getTranslations({ locale: lang, namespace: "member" })
  const nav = await getTranslations({ locale: lang, namespace: "nav" })
  const bio = teamMember.bio[lang] ?? teamMember.bio.en
  const links = socials(teamMember)
  const meetingSlug = calSlug(teamMember.cal)
  const building = await getBuildingActivity(teamMember.github)
  const impact = teamMember.username === "railly" ? raillyImpact[lang] : null

  const heading =
    "font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground"

  const projectLinks = teamMember.projects?.length
    ? teamMember.projects.map((project) =>
        typeof project === "string"
          ? { name: project, url: undefined }
          : project,
      )
    : []

  const tabs: { id: string; label: string; content: ReactNode }[] = []

  if (building) {
    tabs.push({
      id: "building",
      label: t("tabBuilding"),
      content: (
        <BuildingCalendar
          days={building.days}
          currentYear={new Date().getFullYear()}
          currentMonth={new Date().getMonth()}
          label={t("building")}
        />
      ),
    })
  }

  if (projectLinks.length) {
    tabs.push({
      id: "projects",
      label: t("tabProjects"),
      content: (
        <div className="divide-y divide-line border-t border-line">
          {projectLinks.map((project) =>
            project.url ? (
              <Link key={project.name} href={project.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between py-3 text-sm text-muted-foreground transition-colors hover:text-foreground">
                {project.name}
                <span aria-hidden>↗</span>
              </Link>
            ) : (
              <p key={project.name} className="py-3 text-sm text-muted-foreground">{project.name}</p>
            ),
          )}
        </div>
      ),
    })
  }

  if (teamMember.stack?.length) {
    tabs.push({
      id: "stack",
      label: t("tabStack"),
      content: <GearList groups={orderGroups(teamMember.stack, STACK_ORDER)} variant="chips" />,
    })
  }

  const softwareGroups = mergeSoftware(teamMember.software)
  if (softwareGroups.length) {
    tabs.push({
      id: "software",
      label: t("tabSoftware"),
      content: <GearList groups={orderGroups(softwareGroups, SOFTWARE_ORDER)} variant="list" />,
    })
  }

  if (teamMember.hardware?.length) {
    tabs.push({
      id: "hardware",
      label: t("tabHardware"),
      content: <GearList groups={orderGroups(teamMember.hardware, HARDWARE_ORDER)} variant="list" />,
    })
  }

  return (
    <>
      <JsonLd
        data={[
          personSchema(teamMember, lang),
          breadcrumbList(lang, [
            { name: "Crafter Station", path: "/" },
            { name: nav("team"), path: "/team" },
            { name: teamMember.name, path: `/team/${teamMember.username}` },
          ]),
        ]}
      />
      <SiteHeader locale={lang} />
      <main className="flex-1">
        <Container innerClassName="px-6 py-12 md:px-10 md:py-16">
          <Link href={withLocale("/team", lang)} className="group mb-10 inline-block">
            <ArrowLink>{t("back")}</ArrowLink>
          </Link>
          <div className="grid gap-10 lg:grid-cols-[300px_1fr] lg:gap-16">
            {/* Sticky identity sidebar */}
            <aside className="space-y-8 lg:sticky lg:top-24 lg:self-start">
              <div className="relative size-32 overflow-hidden border border-line bg-secondary md:size-40">
                <Image src={teamMember.image} alt={teamMember.name} fill className="object-cover" />
              </div>
              <div>
                <h1 className="text-3xl font-semibold tracking-[-0.04em]">{teamMember.name}</h1>
                <p className="mt-1 text-muted-foreground">{teamMember.role}</p>
                <div className="mt-4 space-y-1.5 font-mono text-xs text-muted-foreground">
                  {teamMember.location ? <p>📍 {teamMember.location}</p> : null}
                  {teamMember.timezone ? <p>🕒 <LocalTime timezone={teamMember.timezone} /></p> : null}
                  {teamMember.joinedYear ? <p>◇ {t("joined")} {teamMember.joinedYear}</p> : null}
                </div>
              </div>
              {links.length || teamMember.wechat ? (
                <div className="divide-y divide-line border-y border-line">
                  {links.map((link) => (
                    <Link key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between py-2.5 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground">
                      {link.label}
                      <span aria-hidden>↗</span>
                    </Link>
                  ))}
                  {teamMember.wechat ? (
                    <p className="flex items-center justify-between gap-4 py-2.5 font-mono text-xs text-muted-foreground">
                      <span>WeChat</span>
                      <span className="select-all">{teamMember.wechat}</span>
                    </p>
                  ) : null}
                </div>
              ) : null}
              {teamMember.listening ? (
                <div>
                  <CurrentlyListening listening={teamMember.listening} label={t("listening")} />
                </div>
              ) : null}
            </aside>

            {/* Scrolling content */}
            <div className="min-w-0">
              <section>
                <p className="flex items-start gap-4 text-sm leading-relaxed text-muted-foreground">
                  <span className="font-mono text-accent">[*]</span>
                  <span>{bio}</span>
                </p>
              </section>
              {impact ? (
                <section className="mt-10 border-y border-line">
                  <p className="px-4 py-4 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground md:px-6">
                    {impact.eyebrow}
                  </p>
                  <div className="grid grid-cols-2 border-t border-line md:grid-cols-4">
                    {impact.metrics.map(([value, label], index) => (
                      <div
                        key={label}
                        className={`${index % 2 ? "border-l" : ""} ${index > 1 ? "border-t md:border-t-0" : ""} ${index > 0 ? "md:border-l" : ""} border-line px-4 py-5 md:px-5`}
                      >
                        <p className="text-xl font-semibold tracking-tight">{value}</p>
                        <p className="mt-1 font-mono text-[10px] text-muted-foreground">{label}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-x-6 gap-y-3 border-t border-line px-4 py-4 md:px-6">
                    <Link href={withLocale("/impact/petdex", lang)} className="group">
                      <ArrowLink>{impact.report}</ArrowLink>
                    </Link>
                    <Link href="https://github.com/crafter-station/petdex" target="_blank" rel="noopener noreferrer" className="group">
                      <ArrowLink>{impact.github}</ArrowLink>
                    </Link>
                  </div>
                </section>
              ) : null}
              {tabs.length ? (
                <div className="mt-10">
                  <MemberTabs tabs={tabs} />
                </div>
              ) : null}
            </div>
          </div>
        </Container>

        {/* cal.com always at the very bottom, full width */}
        {teamMember.cal && meetingSlug ? (
          <>
            <SectionGap />
            <Container innerClassName="px-6 py-10 md:px-10">
              <h2 className={heading}>{t("calendar")}</h2>
              <p className="mt-3 max-w-xl text-sm text-muted-foreground">{t("calendarSub")}</p>
            </Container>
            <CalEmbed calLink={meetingSlug} namespace={teamMember.username} />
          </>
        ) : null}
      </main>
      <SiteFooter locale={lang} />
    </>
  )
}
