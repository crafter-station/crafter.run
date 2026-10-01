import Link from "next/link"
import { ArrowUpRight, Coffee, Sailboat } from "lucide-react"
import { type Locale, withLocale } from "@/lib/i18n"
import { stationCopy } from "@/lib/station-copy"
import { bucleCopy } from "@/lib/bucle-copy"

export function StationEvents({ locale }: { locale: Locale }) {
  const t = stationCopy[locale]
  const b = bucleCopy[locale]
  return (
    <section className="station-section station-events">
      <div className="station-section-heading"><div><p className="station-eyebrow">{t.eventsLabel}</p><h2>{t.events}</h2></div></div>
      <div className="station-project-grid">
        {[
          { name: "Code Brew", type: b.encounter, description: t.brew, headline: b.brew, href: "/events", Icon: Coffee, className: "station-event-brew" },
          { name: "Ship or Sink", type: b.make, description: t.ship, headline: b.ship, href: "/hackathon", Icon: Sailboat, className: "station-event-ship" },
        ].map((event) => (
          <Link key={event.name} href={withLocale(event.href, locale)} className={`station-event-card ${event.className}`}>
            <div className="station-event-top station-label"><span>{event.type}</span><ArrowUpRight size={19} aria-hidden="true" /></div>
            <h3>{event.name}</h3>
            <div className="station-event-composition"><p>{event.headline}</p><event.Icon strokeWidth={1.15} aria-hidden="true" /></div>
            <p className="station-event-description">{event.description}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}

export function StationFamily({ locale }: { locale: Locale }) {
  const t = stationCopy[locale]
  const family = [
    { name: "Station", body: t.station, color: "#FFC107", domain: "crafter.run", href: withLocale("/", locale) },
    { name: "Research", body: t.research, color: "#79AC65", domain: "crafter.ing", href: "https://crafter.ing" },
    { name: "Games", body: t.games, color: "#9D83D2", domain: "games.crafter.run", href: "https://games.crafter.run" },
    { name: "Lab", body: t.lab, color: "#6F9BCE", domain: "circuitkit", href: "https://github.com/crafter-lab" },
  ]
  return (
    <section id="family" className="station-section">
      <div className="station-family-intro"><h2>{t.universe}</h2><p>{t.universeBody}</p></div>
      <div className="station-family-grid">
        {family.map((org) => <Link key={org.name} href={org.href} className="station-family-card" {...(org.href.startsWith("https") ? {target: "_blank", rel: "noopener noreferrer"} : {})}>
          <div className="station-gem" style={{ background: org.color }} aria-hidden="true" /><h3>{org.name}</h3><p>{org.body}</p><small>{org.domain} ↗</small>
        </Link>)}
      </div>
    </section>
  )
}
