import Link from "next/link"
import { notFound } from "next/navigation"
import { getTranslations } from "next-intl/server"
import type { CSSProperties } from "react"

import { Container, SectionGap } from "@/components/grid-container"
import { HomeHead } from "@/components/home-head"
import { StationPageHero } from "@/components/station-page-hero"
import { LocalizedLink } from "@/components/localized-link"
import {
  ProjectTimeline,
  type ProjectTimelineCopy,
} from "@/components/project-timeline"
import { isLocale, locales } from "@/lib/i18n"
import { getProjectTimeline } from "@/lib/project-timeline-cache"
import { pageMetadata } from "@/lib/seo"

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
    orgLabel: t("orgLabel"),
    orgs: {
      all: t("orgs.all"),
      station: t("orgs.station"),
      research: t("orgs.research"),
      team: t("orgs.team"),
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
      scope: t("stats.scope"),
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

      <main className="flex-1">
        <StationPageHero
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
          actions={
            <>
              <a href="#timeline" className="hero-cta">{t("exploreCta")}</a>
              <Link href="https://github.com/crafter-station" target="_blank" rel="noopener noreferrer" className="home-secondary-link">{t("githubCta")} ↗</Link>
              <Link href="https://github.com/crafter-research" target="_blank" rel="noopener noreferrer" className="home-secondary-link">{t("githubResearchCta")} ↗</Link>
            </>
          }
        >
          <aside className="timeline-signal home-frame">
            <div className="timeline-signal-head home-label">
              <span>{t("signalLabel")}</span>
              <span>{t("oneYear")}</span>
            </div>
            <div className="timeline-signal-chart" aria-label={t("signalLabel")}>
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
            <div className="station-stat-strip">
              {[
                [formatNumber(activeProjects), t("heroStats.active")],
                [formatNumber(teamCommits), t("heroStats.commits")],
                [formatNumber(githubStars), t("heroStats.stars")],
              ].map(([value, label]) => (
                <div key={label}>
                  <p>{value}</p>
                  <p className="home-label-sm">{label}</p>
                </div>
              ))}
            </div>
          </aside>
        </StationPageHero>

        <div id="timeline" className="scroll-mt-24">
          <Container innerClassName="timeline-head">
            <HomeHead id="timeline-title" index={1} label={t("timelineEyebrow")} title={t("timelineTitle")} lede={t("timelineDescription")} />
          </Container>
          <Container>
            <ProjectTimeline data={data} locale={lang} copy={copy} />
          </Container>
        </div>

        <SectionGap />

        <Container>
          <section className="station-card-grid timeline-method">
            {[
              ["01", t("method.barTitle"), t("method.barDescription")],
              ["02", t("method.intensityTitle"), t("method.intensityDescription")],
              ["03", t("method.coreTitle"), t("method.coreDescription")],
            ].map(([number, title, description]) => (
              <div key={number}>
                <p className="home-label">{number}</p>
                <h3 className="mt-5 text-xl tracking-tight">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{description}</p>
              </div>
            ))}
          </section>
        </Container>

        <SectionGap />

        <Container>
          <section className="station-callout timeline-callout home-frame">
            <div>
              <p className="home-label">{t("catalogEyebrow")}</p>
              <h2 className="mt-4 text-3xl tracking-tight md:text-4xl">{t("catalogTitle")}</h2>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">{t("catalogDescription")}</p>
            </div>
            <div>
              <LocalizedLink href="/oss" locale={lang} className="home-action-link">{t("catalogCta")} →</LocalizedLink>
            </div>
          </section>
        </Container>
      </main>

    </>
  )
}
