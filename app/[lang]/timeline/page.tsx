import Link from "next/link"
import { notFound } from "next/navigation"
import { getTranslations } from "next-intl/server"
import type { CSSProperties } from "react"

import { ArrowLink } from "@/components/arrow-link"
import { Container, SectionGap } from "@/components/grid-container"
import { LocalizedLink } from "@/components/localized-link"
import {
  ProjectTimeline,
  type ProjectTimelineCopy,
} from "@/components/project-timeline"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { isLocale, locales } from "@/lib/i18n"
import { getProjectTimeline } from "@/lib/project-timeline-cache"
import { pageMetadata } from "@/lib/seo"
import { cn } from "@/lib/utils"

type SignalStyle = CSSProperties & {
  "--timeline-height": string
  "--timeline-opacity": string
}

export const dynamicParams = false
export const revalidate = 86400

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  return pageMetadata({ params, path: "/timeline", namespace: "pages.timeline" })
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()

  const [t, data] = await Promise.all([
    getTranslations({ locale: lang, namespace: "pages.timeline" }),
    getProjectTimeline(),
  ])

  const weeklyTotals = Array<number>(data.weeks.length).fill(0)
  let activeProjects = 0
  for (const project of data.projects) {
    let hasTeamActivity = false
    for (const contributor of project.contributors) {
      if (!contributor.coreMember) continue
      for (let weekIndex = 0; weekIndex < data.weeks.length; weekIndex += 1) {
        const count = contributor.weeks[weekIndex] ?? 0
        weeklyTotals[weekIndex] += count
        if (count > 0) hasTeamActivity = true
      }
    }
    if (hasTeamActivity && !project.archived) activeProjects += 1
  }
  const maxWeek = Math.max(1, ...weeklyTotals)
  const teamCommits = weeklyTotals.reduce((total, count) => total + count, 0)
  const githubStars = data.projects.reduce(
    (total, project) => total + project.stars,
    0,
  )
  const formatNumber = (value: number) =>
    new Intl.NumberFormat(lang, {
      notation: value >= 1000 ? "compact" : "standard",
      maximumFractionDigits: 1,
    }).format(value)

  const copy: ProjectTimelineCopy = {
    timelineLabel: t("timelineLabel"),
    searchPlaceholder: t("searchPlaceholder"),
    filterLabel: t("filterLabel"),
    filters: {
      active: t("filters.active"),
      all: t("filters.all"),
      archived: t("filters.archived"),
    },
    sortLabel: t("sortLabel"),
    sorts: {
      activity: t("sorts.activity"),
      recent: t("sorts.recent"),
      stars: t("sorts.stars"),
    },
    rangeLabel: t("rangeLabel"),
    ranges: {
      threeMonths: t("ranges.threeMonths"),
      sixMonths: t("ranges.sixMonths"),
      oneYear: t("ranges.oneYear"),
    },
    stats: {
      projects: t("stats.projects"),
      allCommits: t("stats.allCommits"),
      teamCommits: t("stats.teamCommits"),
      stars: t("stats.stars"),
      contributors: t("stats.contributors"),
    },
    allContributors: t("allContributors"),
    coreTeam: t("coreTeam"),
    updated: t("updated"),
    liveData: t("liveData"),
    snapshotData: t("snapshotData"),
    projectColumn: t("projectColumn"),
    timelineColumn: t("timelineColumn"),
    today: t("today"),
    showMore: t("showMore"),
    noResultsTitle: t("noResultsTitle"),
    noResultsDescription: t("noResultsDescription"),
    legend: t("legend"),
    less: t("less"),
    more: t("more"),
    commits: t("commits"),
    commit: t("commit"),
    teamCommit: t("teamCommit"),
    contributor: t("contributor"),
    noCommits: t("noCommits"),
    weekOf: t("weekOf"),
    details: t("details"),
    openGithub: t("openGithub"),
    openWebsite: t("openWebsite"),
    created: t("created"),
    lastPush: t("lastPush"),
    stars: t("stars"),
    forks: t("forks"),
    issues: t("issues"),
    license: t("license"),
    activity: t("activity"),
    contributorBreakdown: t("contributorBreakdown"),
    teamBadge: t("teamBadge"),
    archivedBadge: t("archivedBadge"),
    incomplete: t("incomplete"),
  }

  return (
    <>
      <SiteHeader locale={lang} />
      <main className="flex-1">
        <Container innerClassName="overflow-hidden">
          <div className="grid lg:grid-cols-[1.2fr_0.8fr]">
            <div className="px-6 py-16 md:px-10 md:py-24 lg:border-r lg:border-line">
              <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-accent">
                {t("eyebrow")}
              </p>
              <h1 className="mt-5 max-w-4xl text-balance text-5xl font-semibold tracking-[-0.055em] md:text-7xl">
                {t("title")}
              </h1>
              <p className="mt-6 max-w-2xl text-balance text-lg leading-8 text-muted-foreground">
                {t("description")}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                <a
                  href="#timeline"
                  className="group transition-transform duration-150 active:scale-[0.97]"
                >
                  <ArrowLink>{t("exploreCta")}</ArrowLink>
                </a>
                <Link
                  href="https://github.com/crafter-station"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group transition-transform duration-150 active:scale-[0.97]"
                >
                  <ArrowLink>{t("githubCta")}</ArrowLink>
                </Link>
              </div>
            </div>

            <aside className="flex min-h-80 flex-col justify-between bg-secondary/15 p-6 md:p-10">
              <div className="flex items-center justify-between gap-4 font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground">
                <span>{t("signalLabel")}</span>
                <span>{t("oneYear")}</span>
              </div>
              <div
                className="mt-10 flex h-36 items-end gap-px border-b border-line"
                aria-label={t("signalLabel")}
              >
                {weeklyTotals.map((count, index) => (
                  <span
                    key={data.weeks[index]}
                    className="timeline-signal-bar min-w-px flex-1 rounded-t-[1px] bg-foreground"
                    style={{
                      "--timeline-height": count
                        ? `${Math.max(5, (count / maxWeek) * 100).toFixed(2)}%`
                        : "1px",
                      "--timeline-opacity": count ? "0.75" : "0.12",
                    } as SignalStyle}
                    title={`${data.weeks[index]}: ${count}`}
                  />
                ))}
              </div>
              <div className="mt-8 grid grid-cols-3 border border-line">
                {[
                  [formatNumber(activeProjects), t("heroStats.active")],
                  [formatNumber(teamCommits), t("heroStats.commits")],
                  [formatNumber(githubStars), t("heroStats.stars")],
                ].map(([value, label], index) => (
                  <div
                    key={label}
                    className={cn(
                      "p-3 sm:p-4",
                      index > 0 && "border-l border-line",
                    )}
                  >
                    <p className="font-mono text-lg tracking-tight sm:text-xl">{value}</p>
                    <p className="mt-1 text-[10px] leading-tight text-muted-foreground">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </Container>

        <SectionGap />

        <div id="timeline" className="scroll-mt-24">
          <Container innerClassName="border-b px-6 py-10 md:px-10">
            <div className="grid gap-5 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                  {t("timelineEyebrow")}
                </p>
                <h2 className="mt-3 text-3xl tracking-tight md:text-4xl">
                  {t("timelineTitle")}
                </h2>
              </div>
              <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground lg:justify-self-end">
                {t("timelineDescription")}
              </p>
            </div>
          </Container>
          <Container>
            <ProjectTimeline data={data} locale={lang} copy={copy} />
          </Container>
        </div>

        <SectionGap />

        <Container>
          <section className="grid border-y border-line md:grid-cols-3">
            {[
              ["01", t("method.barTitle"), t("method.barDescription")],
              ["02", t("method.intensityTitle"), t("method.intensityDescription")],
              ["03", t("method.coreTitle"), t("method.coreDescription")],
            ].map(([number, title, description], index) => (
              <div
                key={number}
                className={cn(
                  "p-8 md:p-10",
                  index > 0 && "border-t border-line md:border-l md:border-t-0",
                )}
              >
                <p className="font-mono text-[9px] tracking-[0.25em] text-accent">
                  {number}
                </p>
                <h3 className="mt-5 text-xl tracking-tight">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {description}
                </p>
              </div>
            ))}
          </section>
        </Container>

        <SectionGap />

        <Container>
          <section className="grid border-y border-line md:grid-cols-[1.2fr_0.8fr]">
            <div className="border-b border-line p-8 md:border-b-0 md:border-r md:p-10">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                {t("catalogEyebrow")}
              </p>
              <h2 className="mt-4 text-3xl tracking-tight md:text-4xl">
                {t("catalogTitle")}
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                {t("catalogDescription")}
              </p>
            </div>
            <div className="flex items-center p-8 md:p-10">
              <LocalizedLink href="/projects" locale={lang} className="group">
                <ArrowLink>{t("catalogCta")}</ArrowLink>
              </LocalizedLink>
            </div>
          </section>
        </Container>
      </main>
      <SiteFooter locale={lang} />
    </>
  )
}
