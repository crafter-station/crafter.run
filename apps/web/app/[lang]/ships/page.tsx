import { PackageOpen, Plus, Rss, Terminal } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getTranslations } from "next-intl/server"

import { BandChrome } from "@/components/blog/band-chrome"
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

  return (
    <main className="journal-page ships-page">
      <BandChrome />
      <header className="journal-band ships-band" data-chrome-band>
        <div className="ships-band-grid">
          <div className="ships-band-copy">
            <p className="journal-band-crumbs">{t("eyebrow")}</p>
            <h1>{t("title")}</h1>
            <p className="journal-band-summary">{t("heroLede")}</p>
            {result ? (
              <dl className="ships-stats">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <dt>{stat.label}</dt>
                    <dd>{stat.value}</dd>
                  </div>
                ))}
              </dl>
            ) : null}
            <div className="ships-band-actions">
              <Link href={`/${lang}/ships/new`} className="ships-button ships-button-band">
                <Plus aria-hidden="true" />
                {t("publish")}
              </Link>
              <a href={shipsFeedPath(lang)} className="ships-band-link">
                <Rss aria-hidden="true" />
                {t("rss")}
              </a>
            </div>
          </div>
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
      </header>

      {result === null ? (
        <section className="ships-empty">
          <Terminal aria-hidden="true" />
          <h2>{t("unavailableTitle")}</h2>
          <p>{t("unavailableDescription")}</p>
        </section>
      ) : ships.length === 0 ? (
        <section className="ships-empty">
          <PackageOpen aria-hidden="true" />
          <h2>{t("emptyTitle")}</h2>
          <p>{t("emptyDescription")}</p>
        </section>
      ) : (
        <>
          <div className="ships-split">
            <ShipsPulse events={events} avatars={avatars} locale={lang} now={now} labels={labels} />
            <MakersWall
              makers={makers}
              locale={lang}
              labels={{
                title: t("makersTitle"),
                lead: t("makersLead", { count: makers.length }),
                wall: t("makersWall"),
                core: t("core"),
                crew: t("crew"),
                you: t("makersYou"),
                publish: t("publish"),
                ships: Object.fromEntries(makers.map((maker) => [maker.handle, t("makerShips", { count: maker.ships })])),
              }}
            />
          </div>

          <section id="ships-wall" className="ships-wall" aria-labelledby="ships-wall-title">
            <header className="ships-wall-head">
              <div>
                <p className="station-label">{t("gridEyebrow")}</p>
                <h2 id="ships-wall-title">{t("gridTitle")}</h2>
              </div>
              <nav aria-label={t("sortLabel")} className="ships-filters">
                <Link href={href({ sort: "recent" })} scroll={false} aria-current={view.sort === "recent" ? "true" : undefined}>{t("sortRecent")}</Link>
                <Link href={href({ sort: "votes" })} scroll={false} aria-current={view.sort === "votes" ? "true" : undefined}>{t("sortVotes")}</Link>
                <span className="ships-filters-rule" aria-hidden="true" />
                <Link href={href({ live: !view.live })} scroll={false} aria-current={view.live ? "true" : undefined}>
                  {t("filterLive")}
                  <span>{liveCount}</span>
                </Link>
              </nav>
            </header>
            <p className="ships-count" aria-live="polite">{t("resultCount", { count: filtered.length })}</p>
            {visible.length === 0 ? (
              <div className="ships-empty ships-empty-inline">
                <p>{t("noMatches")}</p>
                <Link href={`/${lang}/ships#ships-wall`} className="ships-button ships-button-quiet">{t("clearFilters")}</Link>
              </div>
            ) : (
              <ul className="ships-grid">
                {visible.map((ship) => (
                  <li key={ship.id}>
                    <ShipCard ship={ship} locale={lang} now={now} labels={labels} affiliation={affiliations.get(ship.owner.handle) ?? null} />
                  </li>
                ))}
              </ul>
            )}
            {pages > 1 ? (
              <nav aria-label={t("pageOf", { page: pageNumber, pages })} className="ships-pager">
                {pageNumber > 1 ? <Link href={`/${lang}/ships${shipsQuery({ ...view, page: pageNumber - 1 })}#ships-wall`} rel="prev">{`← ${t("previous")}`}</Link> : <span />}
                <span>{t("pageOf", { page: pageNumber, pages })}</span>
                {pageNumber < pages ? <Link href={`/${lang}/ships${shipsQuery({ ...view, page: pageNumber + 1 })}#ships-wall`} rel="next">{`${t("next")} →`}</Link> : <span />}
              </nav>
            ) : null}
          </section>
        </>
      )}

      <section className="ships-cta" aria-labelledby="ships-cta-title">
        <div className="ships-cta-copy">
          <p className="station-label">{t("ctaEyebrow")}</p>
          <h2 id="ships-cta-title">{t("ctaTitle")}</h2>
          <p>{t("ctaLead")}</p>
          <Link href={`/${lang}/ships/new`} className="ships-button ships-button-band">
            <Plus aria-hidden="true" />
            {t("publish")}
          </Link>
        </div>
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
