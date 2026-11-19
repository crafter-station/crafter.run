import Link from "next/link"
import type { ReactNode } from "react"
import { notFound } from "next/navigation"
import { HomeHead } from "@/components/home-head"
import { CrafterStationLogo } from "@/components/crafter-station-logo"
import { NetworkArtwork } from "@/components/crafter-network"
import { UniverseArtwork } from "@/components/universe-artwork"
import { JsonLd } from "@/components/json-ld"
import { getNetwork } from "@/lib/network"
import { universeCopy } from "@/lib/universe-copy"
import { isLocale, locales, withLocale } from "@/lib/i18n"
import { buildMetadata } from "@/lib/seo"
import { breadcrumbList } from "@/lib/structured-data"

export const dynamicParams = false
export function generateStaticParams() { return locales.map(lang => ({ lang })) }
export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLocale(lang)) return {}
  const t = universeCopy[lang]
  return buildMetadata({ locale: lang, path: "/universe", title: t.name, description: t.description })
}

function ExploreLink({ href, children, secondary = false }: { href: string; children: ReactNode; secondary?: boolean }) {
  return <Link href={href} className={secondary ? "home-secondary-link" : "hero-cta"}
    {...(href.startsWith("https:") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
    {children}
  </Link>
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const t = universeCopy[lang]
  const areas = getNetwork(lang)
  const startingPaths = ["/blog", "/oss", "/ships"]

  return <>
    <JsonLd data={breadcrumbList(lang, [{ name: "Crafter Station", path: "/" }, { name: t.name, path: "/universe" }])} />
    <main className="station-home universe-page flex-1">
      <section className="universe-hero" aria-labelledby="universe-title">
        <p className="home-label">{t.eyebrow}</p>
        <div className="universe-hero-layout">
          <div className="universe-intro">
            <h1 id="universe-title">{t.title[0]}<span>{t.title[1]}</span></h1>
            <p>{t.intro}</p>
            <a className="hero-cta-ghost" href="#areas">{t.directory}</a>
          </div>
          <div className="universe-atlas">
            <nav className="universe-map" aria-label={t.mapLabel}>
              <svg className="universe-orbits" viewBox="0 0 460 360" fill="none" aria-hidden="true">
                <ellipse cx="230" cy="180" rx="178" ry="115" transform="rotate(-26 230 180)" />
                <ellipse cx="230" cy="180" rx="178" ry="115" transform="rotate(26 230 180)" />
                <circle cx="230" cy="180" r="67" strokeDasharray="2 6" />
              </svg>
              <div className="universe-map-center" aria-hidden="true"><CrafterStationLogo decorative /></div>
              {areas.map((area, index) => <a key={area.id} href={`#${area.id}`} data-area={area.id} className={`universe-map-node map-${area.id}`}>
                <span className="universe-map-art"><NetworkArtwork area={area.id} />{area.id === "station" && <CrafterStationLogo decorative className="universe-map-station-mark" />}</span>
                <span className="universe-map-name"><small>0{index + 1}</small>{area.name}</span>
              </a>)}
            </nav>
            <p className="universe-map-note">{t.mapNote}</p>
          </div>
        </div>
      </section>

      <section className="universe-directory" id="areas" aria-label={t.name}>
        <div className="universe-area-grid home-frame">
          {areas.map((area, index) => {
            const copy = t.areas[area.id]
            const primaryHref = area.id === "station" ? "https://crafters.chat" : area.href
            const secondaryPath = area.id === "research" ? "https://github.com/crafter-research" : area.id === "lab" ? "/oss" : null
            return <section key={area.id} id={area.id} data-area={area.id} className={`universe-area universe-${area.id}`} aria-labelledby={`${area.id}-title`}>
              <div className="universe-area-art">
                <p className="universe-area-top home-label">0{index + 1} / {copy.verb}</p>
                <UniverseArtwork area={area.id} />
              </div>
              <div className="universe-area-heading"><h2 id={`${area.id}-title`}>{area.name}</h2></div>
              <h3>{copy.title}</h3>
              <p className="universe-area-body">{copy.body}</p>
              <ul className="universe-topics" aria-label={copy.verb}>{copy.topics.split(" · ").map(topic => <li key={topic} className="home-label-sm">{topic}</li>)}</ul>
              <div className="universe-area-links">
                <ExploreLink href={primaryHref}>{copy.primary}</ExploreLink>
                {secondaryPath && <ExploreLink secondary href={withLocale(secondaryPath, lang)}>{copy.secondary}</ExploreLink>}
                {area.id === "station" && <div className="universe-community-links">
                  <ExploreLink secondary href={withLocale("/events", lang)}>{t.stationLinks[0]}</ExploreLink>
                  <ExploreLink secondary href={withLocale("/crafters", lang)}>{t.stationLinks[2]}</ExploreLink>
                </div>}
              </div>
            </section>
          })}
        </div>
      </section>

      <section className="universe-starting-points" aria-labelledby="universe-starting-title">
        <HomeHead id="universe-starting-title" index={2} label={t.starting.eyebrow} title={t.starting.title} lede={t.starting.body} />
        <div className="universe-starting-grid home-frame">
          {t.starting.paths.map((path, index) => <Link key={startingPaths[index]} className="universe-starting-card" href={withLocale(startingPaths[index], lang)}>
            <span className="home-label">{path.label}</span>
            <h3>{path.title}</h3>
            <p>{path.body}</p>
            <span className="universe-starting-action home-secondary-link">{path.action}</span>
          </Link>)}
        </div>
      </section>
    </main>
  </>
}
