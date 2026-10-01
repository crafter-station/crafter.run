import Link from "next/link"
import { ArrowDown, ArrowUpRight } from "lucide-react"
import { type Locale } from "@/lib/i18n"
import { stationCopy } from "@/lib/station-copy"

export function HeroContent({
  locale, description, eventsCta, eventsHref, ossCta, ossHref,
}: {
  locale: Locale; description: string; eventsCta: string; eventsHref: string; ossCta: string; ossHref: string;
}) {
  const t = stationCopy[locale]
  return (
    <>
      <div className="station-topline">
        <span className="station-label">Crafter Station / {t.built}</span>
        <a href="https://crafters.chat" target="_blank" rel="noopener noreferrer">{t.join}<ArrowUpRight size={13} aria-hidden="true" /></a>
      </div>
      <section className="station-hero">
        <p className="station-eyebrow">{t.hero}</p>
        <div className="station-hero-grid">
          <h1 lang="en"><span>CRAFT.</span><span>SHIP.</span><span className="station-outline">REPEAT.</span></h1>
          <div aria-hidden="true">
            <img className="station-hero-art station-art-light" src="/station/assembly.svg" alt="" width="500" height="490" fetchPriority="high" />
            <img className="station-hero-art station-art-dark" src="/station/assembly-dark.svg" alt="" width="500" height="490" />
          </div>
        </div>
        <div className="station-hero-bottom">
          <div>
            <p className="station-hero-description">{description}</p>
            <div className="station-hero-actions">
              <Link href={ossHref} className="station-button">{ossCta}<ArrowUpRight size={16} aria-hidden="true" /></Link>
              <Link href={eventsHref} className="station-text-link">{eventsCta}<ArrowDown size={15} aria-hidden="true" /></Link>
            </div>
          </div>
          <p className="station-label station-hero-caption">01 / {t.caption}</p>
        </div>
      </section>
    </>
  )
}
