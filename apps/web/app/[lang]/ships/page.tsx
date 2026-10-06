import { StationPageHero } from "@/components/station-page-hero"
import Link from "next/link"
import { ArrowUpRight, PackageOpen, Terminal } from "lucide-react"
import { getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"

import { Container, SectionGap } from "@/components/grid-container"
import { InstallSkillCommand } from "@/components/install-skill-command"
import { ShipUpvote } from "@/components/ship-upvote"
import { isLocale, locales } from "@/lib/i18n"
import { pageMetadata } from "@/lib/seo"
import { listPublishedShips } from "@/lib/ships"

export const dynamic = "force-dynamic"

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  return pageMetadata({ params, path: "/ships", namespace: "pages.ships" })
}

export default async function ShipsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()

  const [t, shipsResult] = await Promise.all([
    getTranslations({ locale: lang, namespace: "pages.ships" }),
    listPublishedShips(),
  ])
  const ships = shipsResult ?? []
  const crafterCount = new Set(ships.map((ship) => ship.owner.handle)).size

  return (
    <>

      <main className="flex-1">
        <StationPageHero eyebrow={t("eyebrow")} title={t("title")} description={t("description")} art="ships">
          <InstallSkillCommand label={t("installLabel")} copyLabel={t("copyInstallCommand")} copiedLabel={t("copiedInstallCommand")} />
        </StationPageHero>
        <Container><div className="station-stat-strip station-stat-strip-two">
          <Stat value={shipsResult === null ? "--" : ships.length} label={t("shipCount", { count: ships.length })} />
          <Stat value={shipsResult === null ? "--" : crafterCount} label={t("crafterCount", { count: crafterCount })} />
        </div></Container>

        <SectionGap />

        <Container innerClassName="border-b px-6 py-10 md:px-10">
          <p className="font-label text-xs uppercase tracking-[0.3em] text-muted-foreground">
            {t("manifestEyebrow")}
          </p>
          <h2 className="mt-3 text-3xl tracking-tight md:text-4xl">{t("manifestTitle")}</h2>
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
                      {String(index + 1).padStart(3, "0")}
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
