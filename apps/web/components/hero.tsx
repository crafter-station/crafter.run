import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { CrafterStationLogo } from "@/components/crafter-station-logo"
import { type Locale } from "@/lib/i18n"
import { stationCopy } from "@/lib/station-copy"
import { bucleCopy } from "@/lib/bucle-copy"

export function HeroContent({
  locale, eventsCta, eventsHref, ossCta, ossHref,
}: {
  locale: Locale; eventsCta: string; eventsHref: string; ossCta: string; ossHref: string;
}) {
  const t = stationCopy[locale]
  const b = bucleCopy[locale]
  return (
    <>
      <div className="station-topline">
        <span className="station-label">Crafter Station / {t.built}</span>
        <a href="https://crafters.chat" target="_blank" rel="noopener noreferrer">{t.join}<ArrowUpRight size={13} aria-hidden="true" /></a>
      </div>
      <section className="station-hero" aria-labelledby="station-title">
        <div className="station-hero-kicker station-label"><span>01 / Crafter Station</span><span>{t.built}</span></div>
        <div className="station-hero-grid">
          <h1 id="station-title" lang="en"><span>Craft.</span><span>Ship.</span><span>Repeat.</span></h1>
          <div className="station-hero-side">
            <CrafterStationLogo decorative className="station-hero-symbol" />
            <p className="station-hero-description">{b.hero}</p>
            <div className="station-hero-actions">
              <Link href={ossHref} className="station-editorial-link">{ossCta}<ArrowUpRight size={17} aria-hidden="true" /></Link>
              <Link href={eventsHref} className="station-text-link">{eventsCta}<ArrowUpRight size={15} aria-hidden="true" /></Link>
            </div>
          </div>
        </div>
        <div className="station-hero-footer station-label"><span>{t.hero}</span><span>CRAFTER.RUN</span></div>
      </section>
    </>
  )
}
