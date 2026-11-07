import Link from "next/link"
import { type Locale, withLocale } from "@/lib/i18n"
import { siteConfig } from "@/lib/site"
import { stationCopy } from "@/lib/station-copy"
import { bucleCopy } from "@/lib/bucle-copy"
import { navCopy } from "@/lib/navigation-copy"
import { agendaCopy } from "@/lib/agenda-copy"
import { agendaCity } from "@/lib/agenda-cities"
import { getOssRepos } from "@/lib/oss"
import { fetchHack0Calendar } from "@/lib/hack0-calendar"
import { partitionHack0Events } from "@/lib/hack0-calendar-data"
import { BRAND_MARK_PATH } from "@/lib/brand"
import fontVersions from "@/lib/font-versions.json"

export async function HeroContent({
  locale, eventsCta, eventsHref,
}: {
  locale: Locale; eventsCta: string; eventsHref: string; ossCta: string; ossHref: string;
}) {
  const t = stationCopy[locale]
  const b = bucleCopy[locale]
  const nav = navCopy[locale]
  const agenda = agendaCopy[locale]
  const [repos, calendar] = await Promise.all([getOssRepos(), fetchHack0Calendar()])
  const top = repos.slice(0, 3)
  const cities = new Set(calendar.events.map(event => agendaCity(event.location)?.key).filter(Boolean))
  const next = partitionHack0Events(calendar.events).upcoming[0]
  return (
      <section className="station-masthead hero-name" aria-labelledby="station-title">
        <svg className="hero-knot" viewBox="-8 -8 273 273" aria-hidden="true"><path d={BRAND_MARK_PATH} pathLength={1} /></svg>
        <div className="hero-light" aria-hidden="true" />
        <p className="hero-eyebrow"><span>{t.nonProfit}</span><span>{t.place}</span><span>{t.builders}</span></p>
        <h1 id="station-title"><span className="sr-only">{`${siteConfig.tagline[locale]}. `}</span>crafter station</h1>
        <div className="hero-claim">
          <p>{b.hero}</p>
          <div className="hero-actions">
            <a href="https://crafters.chat" target="_blank" rel="noopener noreferrer" className="hero-cta">{t.join}</a>
            <Link href={eventsHref} className="hero-cta-ghost">{eventsCta}</Link>
          </div>
        </div>
        <div className="hero-proof">
          <Link href={withLocale("/oss", locale)} className="hero-cell">
            <span className="hero-cell-label">{nav.oss}</span>
            <ul>{top.map(repo => <li key={repo.repo}><span>{repo.name}</span><span>{repo.stars.toLocaleString("en-US")} ★</span></li>)}</ul>
          </Link>
          <Link href={eventsHref} className="hero-cell">
            <span className="hero-cell-label">{nav.events}</span>
            <strong>{agenda.results.replace("{count}", String(calendar.events.length))}</strong>
            <span className="hero-cell-meta">{agenda.stamps.replace("{count}", String(cities.size))}{next ? ` · ${agenda.next}: ${next.title.replace(/[\p{Extended_Pictographic}\u{FE0F}\u{200D}]/gu, "").replace(/\s+/g, " ").trim()}` : ""}</span>
          </Link>
          <Link href={withLocale("/font", locale)} className="hero-cell">
            <span className="hero-cell-label">{t.ownType}</span>
            <strong className="hero-cell-type">Crafter Sans</strong>
            <span className="hero-cell-meta">Bucle {fontVersions.display} · Text {fontVersions.text}</span>
          </Link>
        </div>
      </section>
  )
}
