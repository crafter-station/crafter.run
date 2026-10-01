import Link from "next/link"
import type { CSSProperties } from "react"
import { ArrowUpRight } from "lucide-react"
import { CrafterStationLogo } from "@/components/crafter-station-logo"
import { type Locale, withLocale } from "@/lib/i18n"
import { stationCopy } from "@/lib/station-copy"
import { homeCopy } from "@/lib/home-copy"

function CoffeeArt() {
  return <svg viewBox="0 0 430 310" className="home-coffee-art" fill="none" aria-hidden="true">
    <g className="home-coffee-steam" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
      <path d="M167 101c-58-47 66-45 16-96M220 98c55-49-66-49-13-93M258 107c-35-30 47-36 23-69" />
    </g>
    <ellipse cx="212" cy="271" rx="142" ry="22" stroke="currentColor" strokeWidth="2" />
    <path d="M307 137h34c64 0 52 89-21 85" stroke="currentColor" strokeWidth="22" />
    <path d="M102 129h213l-18 106c-5 53-166 53-178 0Z" fill="currentColor" />
    <ellipse cx="208" cy="130" rx="107" ry="26" fill="#e8ebdd" stroke="currentColor" strokeWidth="3" />
    <ellipse cx="208" cy="134" rx="86" ry="16" fill="currentColor" />
    <path d="m178 172-22 22 22 22m58-44 22 22-22 22m-19-54-15 67" stroke="#e8ebdd" strokeWidth="6" />
  </svg>
}

function BoatArt() {
  return <svg className="home-boat-art" viewBox="0 0 460 310" fill="none" aria-hidden="true">
    <g className="home-paper-boat" stroke="#f8e9a4" strokeWidth="1.5" strokeLinejoin="round">
      <path d="m49 199 190-84 176 84-164 86Z" fill="#25291f" />
      <path d="m49 199 142 9 48-93Z" fill="#f8e9a4" />
      <path d="m191 208 48-174 49 174Z" fill="#f8e9a4" />
      <path d="m239 34 49 174 127-9Z" fill="#b4a56c" />
      <path d="m49 199 202 86 164-86-164 30Z" fill="#f8e9a4" />
      <path d="m49 199 202 30 164-30M239 34v195" stroke="#25291f" />
    </g>
    <g stroke="#f8e9a4" opacity=".4">
      <path d="M0 272q58-20 115 0t115 0 115 0 115 0M0 292q58-20 115 0t115 0 115 0 115 0" />
    </g>
  </svg>
}

export function StationEvents({ locale }: { locale: Locale }) {
  const t = homeCopy[locale]
  const s = stationCopy[locale]
  return (
    <section className="home-events" aria-labelledby="home-events-title">
      <div className="home-events-heading">
        <p className="station-label">04 / {s.eventsLabel}</p>
        <h2 id="home-events-title">{t.events}</h2>
        <p className="home-events-intro">{t.eventsBody}</p>
      </div>
      <div className="home-posters">
        <Link href={withLocale("/events",locale)} className="home-poster home-poster-brew">
          <div className="home-poster-meta station-label"><span>CRAFTER PRESENTS</span><ArrowUpRight size={22} aria-hidden="true" /></div>
          <h3>Code<br />Brew<span className="home-poster-star" aria-hidden="true">✳</span></h3>
          <CoffeeArt />
          <p className="home-poster-line">{t.brew}</p>
          <div className="home-poster-bottom station-label"><span>COFFEE / CODE / COMMUNITY</span><span>↗</span></div>
        </Link>
        <Link href={withLocale("/hackathon",locale)} className="home-poster home-poster-ship">
          <div className="home-poster-meta station-label"><span>CRAFTER HACKATHONS</span><ArrowUpRight size={22} aria-hidden="true" /></div>
          <h3><span>Ship</span><em>or</em><span className="home-sink">Sink</span></h3>
          <BoatArt />
          <p className="home-poster-line">{t.ship}</p>
          <div className="home-poster-bottom station-label"><span>MAKE SOMETHING REAL.</span><span>↗</span></div>
        </Link>
      </div>
      <div className="home-events-footer">
        <Link href={withLocale("/events",locale)} className="station-editorial-link">{t.calendar}<ArrowUpRight size={18} aria-hidden="true" /></Link>
        <Link href={withLocale("/events/sponsors",locale)} className="station-text-link">{t.sponsor}<ArrowUpRight size={16} aria-hidden="true" /></Link>
      </div>
    </section>
  )
}

export function StationFamily({ locale }: { locale: Locale }) {
  const t = stationCopy[locale]
  const h = homeCopy[locale]
  const family = [
    { name: "Station", body: t.station, color: "#F8E9A4", domain: "crafter.run", href: withLocale("/", locale) },
    { name: "Research", body: t.research, color: "#79AC65", domain: "crafter.ing", href: "https://crafter.ing" },
    { name: "Games", body: t.games, color: "#9D83D2", domain: "games.crafter.run", href: "https://games.crafter.run" },
    { name: "Lab", body: t.lab, color: "#6F9BCE", domain: "circuitkit", href: "https://github.com/crafter-lab" },
  ]
  return (
    <section id="family" className="home-family dark theme-scope" aria-labelledby="home-family-title">
      <p className="station-label">06 / {h.family}</p>
      <div className="home-family-layout">
        <div className="home-family-story">
          <h2 id="home-family-title">{h.familyTitle}</h2>
          <div className="home-family-orbit" aria-hidden="true">
            <div className="home-orbit-ring" />
            <div className="home-orbit-ring home-orbit-ring-2" />
            <CrafterStationLogo decorative className="home-orbit-center" />
            {family.map((org,i) => <span key={org.name} className={`home-orbit-point orbit-${i}`} style={{"--org-color":org.color} as CSSProperties}><CrafterStationLogo decorative className="home-orbit-mark" /></span>)}
          </div>
          <p>{h.familyBody}</p>
        </div>
        <div className="home-family-directory">
          {family.map((org,i) => <Link key={org.name} href={org.href} className={`home-org org-${i}`} style={{"--org-color":org.color} as CSSProperties} {...(org.href.startsWith("https") ? {target: "_blank", rel: "noopener noreferrer"} : {})}>
            <span className="home-org-number station-label">0{i+1}</span>
            <div><h3>{org.name}</h3><p>{org.body}</p><span className="station-label">{org.domain}</span></div>
            <ArrowUpRight size={25} aria-hidden="true" />
          </Link>)}
        </div>
      </div>
    </section>
  )
}
