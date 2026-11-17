import { StationPageHero } from "@/components/station-page-hero"
import Link from "next/link"
import { ArrowUpRight, PackageOpen, Rss, Terminal } from "lucide-react"
import { getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"

import { Container, SectionGap } from "@/components/grid-container"
import { InstallSkillCommand } from "@/components/install-skill-command"
import { ShipUpvote } from "@/components/ship-upvote"
import { isLocale, locales } from "@/lib/i18n"
import { baseUrl, pageMetadata } from "@/lib/seo"
import { lastActivityAt, relativeTime } from "@/lib/ship-activity"
import { shipsFeedPath } from "@/lib/ship-feed"
import { listShipsPage } from "@/lib/ships"

export const dynamic = "force-dynamic"

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

const pageSize = 24

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
  searchParams: Promise<{ page?: string }>
}) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const requested = Number.parseInt((await searchParams).page ?? "1", 10)
  const pageNumber = Number.isInteger(requested) && requested > 1 ? Math.min(requested, 10_000) : 1

  const [t, page] = await Promise.all([
    getTranslations({ locale: lang, namespace: "pages.ships" }),
    listShipsPage({ limit: pageSize, offset: (pageNumber - 1) * pageSize }),
  ])
  const shipsResult = page?.ships ?? null
  const ships = shipsResult ?? []
  const total = page?.pagination?.total ?? ships.length
  const crafterCount = page?.pagination?.crafterCount ?? new Set(ships.map((ship) => ship.owner.handle)).size
  const pages = Math.max(1, Math.ceil(total / pageSize))
  const now = Date.now()
  const pageHref = (n: number) => (n <= 1 ? `/${lang}/ships` : `/${lang}/ships?page=${n}`)

  return (
    <>

      <main className="flex-1">
        <StationPageHero eyebrow={t("eyebrow")} title={t("title")} description={t("description")} art="ships">
          <InstallSkillCommand label={t("installLabel")} copyLabel={t("copyInstallCommand")} copiedLabel={t("copiedInstallCommand")} />
        </StationPageHero>
        <Container><div className="station-stat-strip station-stat-strip-two">
          <Stat value={shipsResult === null ? "--" : total} label={t("shipCount", { count: total })} />
          <Stat value={shipsResult === null ? "--" : crafterCount} label={t("crafterCount", { count: crafterCount })} />
        </div></Container>

        <SectionGap />

        <Container innerClassName="border-b px-6 py-10 md:px-10">
          <p className="font-label text-xs uppercase tracking-[0.3em] text-muted-foreground">
            {t("manifestEyebrow")}
          </p>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-3xl tracking-tight md:text-4xl">{t("manifestTitle")}</h2>
            <a href={shipsFeedPath(lang)} className="inline-flex items-center gap-1.5 font-label text-xs uppercase tracking-[0.18em] transition-colors hover:text-accent">
              <Rss className="size-3.5" aria-hidden="true" />
              {t("rss")}
            </a>
          </div>
        </Container>

        <Container>
          {shipsResult === null ? (
            <RepositoryMessage
              icon={<Terminal className="mx-auto size-8 text-accent" strokeWidth={1.5} />}
              title={t("unavailableTitle")}
              description={t("unavailableDescription")}
            />
          ) : ships.length === 0 ? (
            <div className="station-directory-empty grid place-items-center text-center">
              <div className="max-w-lg">
                <PackageOpen className="mx-auto size-8 text-accent" strokeWidth={1.5} />
                <h2 className="mt-6 text-3xl tracking-tight">{t("emptyTitle")}</h2>
                <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-muted-foreground">
                  {t("emptyDescription")}
                </p>
                <div className="mx-auto mt-8 flex w-fit items-center gap-3 border border-line bg-secondary/30 px-4 py-3 text-left font-label text-xs">
                  <Terminal className="size-4 text-accent" />
                  <span className="text-muted-foreground">$</span>
                  <code>crafter ship</code>
                  <span className="border border-line px-2 py-0.5 text-xs uppercase tracking-wider text-muted-foreground">
                    {t("comingSoon")}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="station-card-grid">
              {ships.map((ship, index) => (
                <article
                  key={ship.id}
                  className="group min-h-72 border-b border-line p-8 transition-colors hover:bg-accent-surface/10 md:border-r xl:min-h-80"
                >
                  {ship.imageUrl ? <img src={ship.imageUrl} alt="" className="mb-6 aspect-video w-full border border-line object-cover" /> : null}
                  <div className="flex items-start justify-between gap-6">
                    <p className="font-label text-xs uppercase tracking-[0.28em] text-muted-foreground">
                      {String((pageNumber - 1) * pageSize + index + 1).padStart(3, "0")}
                    </p>
                    <div className="flex items-center gap-3">
                      <p className="font-label text-xs text-muted-foreground">@{ship.owner.handle}</p>
                      <ShipUpvote shipId={ship.id} slug={ship.slug} initialVoteCount={ship.voteCount} locale={lang} />
                    </div>
                  </div>
                  <h3 className={ship.imageUrl ? "mt-8 text-3xl font-medium tracking-tight" : "mt-12 text-3xl font-medium tracking-tight"}>
                    <Link href={`/${lang}/ships/${ship.slug}`} className="transition-colors hover:text-accent">
                      {ship.name}
                    </Link>
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{ship.tagline}</p>
                  <p className="mt-5 text-xs text-muted-foreground">
                    {t("by", { name: ship.owner.displayName })}
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    <time dateTime={lastActivityAt(ship)}>{t("updated", { when: relativeTime(lastActivityAt(ship), lang, now) })}</time>
                    {ship.updateCount ? ` · ${t("updateCount", { count: ship.updateCount })}` : ""}
                  </p>
                  {ship.latestUpdate ? (
                    <p className="mt-2 text-sm leading-6">{t("latestUpdate", { title: ship.latestUpdate.title })}</p>
                  ) : null}
                  {ship.links.length > 0 ? (
                    <div className="mt-8 flex flex-wrap gap-x-5 gap-y-3">
                      {ship.links.map((link) => (
                        <Link
                          key={`${link.type}-${link.url}`}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 font-label text-xs uppercase tracking-[0.18em] transition-colors hover:text-accent"
                        >
                          {t(`links.${link.type}`)}
                          <ArrowUpRight className="size-3" />
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </article>
              ))}
            </div>
          )}
          {pages > 1 && shipsResult !== null ? (
            <nav aria-label={t("pageOf", { page: pageNumber, pages })} className="flex items-center justify-between gap-4 border-b border-line px-6 py-6 font-label text-xs uppercase tracking-[0.18em] md:px-10">
              {pageNumber > 1 ? <Link href={pageHref(pageNumber - 1)} rel="prev" className="transition-colors hover:text-accent">{`← ${t("previous")}`}</Link> : <span />}
              <span className="text-muted-foreground">{t("pageOf", { page: pageNumber, pages })}</span>
              {pageNumber < pages ? <Link href={pageHref(pageNumber + 1)} rel="next" className="transition-colors hover:text-accent">{`${t("next")} →`}</Link> : <span />}
            </nav>
          ) : null}
        </Container>
      </main>

    </>
  )
}

function Stat({ value, label, bordered = false }: { value: number | string; label: string; bordered?: boolean }) {
  return (
    <div className={bordered ? "border-l border-line p-5" : "p-5"}>
      <p className="font-label text-3xl font-medium tabular-nums">{value}</p>
      <p className="mt-2 font-label text-xs uppercase tracking-[0.22em] text-muted-foreground">{label}</p>
    </div>
  )
}

function RepositoryMessage({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="station-directory-empty grid place-items-center text-center">
      <div className="max-w-lg">
        {icon}
        <h2 className="mt-6 text-3xl tracking-tight">{title}</h2>
        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}
