import Link from "next/link"
import { notFound } from "next/navigation"
import { getTranslations } from "next-intl/server"

import { HomeHead } from "@/components/home-head"
import { MakersWall } from "@/components/ships/makers-wall"
import { PublishWays } from "@/components/ships/publish-ways"
import { ShipCard } from "@/components/ships/ship-card"
import { FeaturedShip } from "@/components/ships/ship-featured"
import { ShipsPulse } from "@/components/ships/ships-pulse"
import { isLocale, locales } from "@/lib/i18n"
import { baseUrl, pageMetadata } from "@/lib/seo"
import { buildActivity } from "@/lib/ship-activity"
import { shipsFeedPath } from "@/lib/ship-feed"
import { listAllShips, listCrafters, listShipsWithUpdates } from "@/lib/ships"
import {
  buildMakers,
  hasLiveLink,
  isDefaultView,
  parseShipsView,
  pickFeatured,
  shipsQuery,
  shipTotals,
  sortShips,
} from "@/lib/ships-showcase"

export const dynamic = "force-dynamic"

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

const pageSize = 24
const pulseSize = 6

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const base = await pageMetadata({ params, path: "/ships", namespace: "pages.ships" })
  if (!isLocale(lang)) return base
  return {
    ...base,
    alternates: { ...base.alternates, types: { "application/atom+xml": `${baseUrl}${shipsFeedPath(lang)}` } },
  }
}

export default async function ShipsPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>
  searchParams: Promise<{ sort?: string; live?: string; page?: string }>
}) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const view = parseShipsView(await searchParams)

  const [t, result, profiles] = await Promise.all([
    getTranslations({ locale: lang, namespace: "pages.ships" }),
    listAllShips(),
    listCrafters(),
  ])
  const ships = result?.ships ?? []
  const now = Date.now()
  const totals = shipTotals(ships)
  const crafterCount = result?.pagination?.crafterCount ?? new Set(ships.map((ship) => ship.owner.handle)).size
  const makers = buildMakers(ships, profiles)
  const affiliations = new Map(makers.map((maker) => [maker.handle, maker.affiliation]))
  const featured = pickFeatured(ships)
  const events = buildActivity(ships, await listShipsWithUpdates(ships)).slice(0, pulseSize)
  const avatars = Object.fromEntries(ships.map((ship) => [ship.owner.handle, ship.owner.avatarUrl]))

  const liveCount = ships.filter(hasLiveLink).length
  const filtered = sortShips(ships, view.sort).filter((ship) => !view.live || hasLiveLink(ship))
  const wall = isDefaultView(view) && featured ? filtered.filter((ship) => ship.id !== featured.id) : filtered
  const pages = Math.max(1, Math.ceil(wall.length / pageSize))
  const pageNumber = Math.min(view.page, pages)
  const visible = wall.slice((pageNumber - 1) * pageSize, pageNumber * pageSize)
  const href = (next: Partial<typeof view>) => `/${lang}/ships${shipsQuery({ ...view, page: 1, ...next })}#ships-wall`

  const labels: Record<string, string> = {
    featuredLabel: t("featuredLabel"),
    pulseTitle: t("pulseTitle"),
    pulseLead: t("pulseLead"),
    pulseBy: t.raw("pulseBy") as string,
    pulsePublished: t("pulsePublished"),
    pulseUpdate: t("pulseUpdate"),
    core: t("core"),
    crew: t("crew"),
    repository: t("links.repository"),
    website: t("links.website"),
    demo: t("links.demo"),
    package: t("links.package"),
    social: t("links.social"),
  }
  // A zero would read as a flaw, so updates and votes only show once they exist.
  const stats = [
    { value: totals.ships, label: t("shipCount", { count: totals.ships }) },
    { value: crafterCount, label: t("crafterCount", { count: crafterCount }) },
    { value: totals.updates, label: t("statUpdates", { count: totals.updates }) },
    { value: totals.votes, label: t("statVotes", { count: totals.votes }) },
  ].filter((stat, index) => index < 2 || stat.value > 0)
  const common = await getTranslations({ locale: lang, namespace: "common" })

  return (
    <main className="station-home ships-page flex-1">
      <section className="inner-hero" aria-labelledby="ships-title">
        <p className="home-label">{t("eyebrow")}</p>
        <div className="inner-hero-grid">
          <h1 id="ships-title">{t("title")}</h1>
          <div className="inner-hero-side">
            <p>{t("heroLede")}</p>
            <div className="inner-hero-actions">
              <Link href={`/${lang}/ships/new`} className="hero-cta">{t("publish")}</Link>
              <a href="https://crafters.chat" target="_blank" rel="noopener noreferrer" className="hero-cta-ghost">{common("communityCta")}</a>
              <a href={shipsFeedPath(lang)} className="home-secondary-link">{t("rss")}</a>
            </div>
          </div>
          <div className="inner-hero-extra">
            {result ? (
              <dl className="ships-stats">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <dt className="home-label-sm">{stat.label}</dt>
                    <dd>{stat.value}</dd>
                  </div>
                ))}
              </dl>
            ) : null}
            {featured ? (
              <FeaturedShip
                ship={featured}
                locale={lang}
                now={now}
                labels={labels}
                votesLabel={t("votesCount", { count: featured.voteCount })}
                latestLabel={featured.latestUpdate ? t("latestUpdate", { title: featured.latestUpdate.title }) : null}
              />
            ) : null}
          </div>
        </div>
      </section>

      {result === null ? (
        <section aria-labelledby="ships-empty-title">
          <div className="jobs-empty home-frame">
            <h3 id="ships-empty-title">{t("unavailableTitle")}</h3>
            <p>{t("unavailableDescription")}</p>
          </div>
        </section>
      ) : ships.length === 0 ? (
        <section aria-labelledby="ships-empty-title">
          <div className="jobs-empty home-frame">
            <h3 id="ships-empty-title">{t("emptyTitle")}</h3>
            <p>{t("emptyDescription")}</p>
          </div>
        </section>
      ) : (
        <>
          <section aria-labelledby="ships-pulse-title">
            <HomeHead id="ships-pulse-title" index={1} label={t("eyebrow")} title={t("pulseTitle")} lede={t("pulseLead")} />
            <ShipsPulse events={events} avatars={avatars} locale={lang} now={now} labels={labels} />
          </section>

          <section aria-labelledby="ships-makers-title">
            <HomeHead id="ships-makers-title" index={2} label={t("eyebrow")} title={t("makersTitle")} lede={t("makersLead", { count: makers.length })} />
            <MakersWall
              makers={makers}
              locale={lang}
              labels={{
                wall: t("makersWall"),
                core: t("core"),
                crew: t("crew"),
                you: t("makersYou"),
                publish: t("publish"),
                ships: Object.fromEntries(makers.map((maker) => [maker.handle, t("makerShips", { count: maker.ships })])),
              }}
            />
          </section>

          <section id="ships-wall" className="ships-wall" aria-labelledby="ships-wall-title">
            <HomeHead id="ships-wall-title" index={3} label={t("gridEyebrow")} title={t("gridTitle")} lede={t("resultCount", { count: filtered.length })}>
              <div className="ships-filters" role="group" aria-label={t("sortLabel")}>
                <nav className="home-tabs" aria-label={t("sortLabel")}>
                  <Link href={href({ sort: "recent" })} scroll={false} aria-current={view.sort === "recent" ? "true" : undefined}>{t("sortRecent")}</Link>
                  <Link href={href({ sort: "votes" })} scroll={false} aria-current={view.sort === "votes" ? "true" : undefined}>{t("sortVotes")}</Link>
                </nav>
                <nav className="home-tabs" aria-label={t("filterLabel")}>
                  <Link href={href({ live: !view.live })} scroll={false} aria-current={view.live ? "true" : undefined}>
                    {t("filterLive")}
                    <span>{liveCount}</span>
                  </Link>
                </nav>
              </div>
            </HomeHead>
            {visible.length === 0 ? (
              <div className="jobs-empty home-frame">
                <h3>{t("noMatches")}</h3>
                <Link href={`/${lang}/ships#ships-wall`} className="hero-cta-ghost">{t("clearFilters")}</Link>
              </div>
            ) : (
              <ul className="ships-grid home-frame">
                {visible.map((ship) => (
                  <li key={ship.id}>
                    <ShipCard ship={ship} locale={lang} now={now} labels={labels} affiliation={affiliations.get(ship.owner.handle) ?? null} />
                  </li>
                ))}
              </ul>
            )}
            {pages > 1 ? (
              <nav aria-label={t("pageOf", { page: pageNumber, pages })} className="ships-pager">
                {pageNumber > 1 ? <Link href={`/${lang}/ships${shipsQuery({ ...view, page: pageNumber - 1 })}#ships-wall`} rel="prev" className="home-secondary-link">{`← ${t("previous")}`}</Link> : <span />}
                <span className="home-label">{t("pageOf", { page: pageNumber, pages })}</span>
                {pageNumber < pages ? <Link href={`/${lang}/ships${shipsQuery({ ...view, page: pageNumber + 1 })}#ships-wall`} rel="next" className="home-secondary-link">{`${t("next")} →`}</Link> : <span />}
              </nav>
            ) : null}
          </section>
        </>
      )}

      <section className="ships-cta" aria-labelledby="ships-cta-title">
        <HomeHead id="ships-cta-title" index={4} label={t("ctaEyebrow")} title={t("ctaTitle")} lede={t("ctaLead")}>
          <Link href={`/${lang}/ships/new`} className="hero-cta">{t("publish")}</Link>
        </HomeHead>
        <PublishWays
          locale={lang}
          labels={{
            label: t("ctaWays"),
            link: { tab: t("wayLinkTab"), title: t("wayLinkTitle"), body: t("wayLinkBody"), action: t("wayLinkAction") },
            agent: { tab: t("wayAgentTab"), title: t("wayAgentTitle"), body: t("wayAgentBody"), copy: t("copyPrompt"), copied: t("copiedPrompt") },
            topic: { tab: t("wayTopicTab"), title: t("wayTopicTitle"), body: t("wayTopicBody"), action: t("wayTopicAction") },
          }}
        />
      </section>
    </main>
  )
}
