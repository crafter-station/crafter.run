import Link from "next/link"
import { CrafterStationLogo } from "@/components/crafter-station-logo"
import { type Locale } from "@/lib/i18n"
import { siteConfig } from "@/lib/site"
import { stationCopy } from "@/lib/station-copy"
import { bucleCopy } from "@/lib/bucle-copy"
import { StationAtmosphere } from "@/components/station-atmosphere"

export function HeroContent({
  locale, eventsCta, eventsHref, ossCta, ossHref,
}: {
  locale: Locale; eventsCta: string; eventsHref: string; ossCta: string; ossHref: string;
}) {
  const t = stationCopy[locale]
  const b = bucleCopy[locale]
  return (
      <section className="station-masthead" aria-labelledby="station-title">
        <StationAtmosphere />
        <div className="station-masthead-core">
          <div className="station-masthead-art" aria-hidden="true">
            <CrafterStationLogo decorative />
          </div>
          <p className="station-label">{t.built}</p>
          <h1 id="station-title"><span className="sr-only">{`${siteConfig.name}, ${siteConfig.tagline[locale]}. `}</span><span lang="en">Craft.</span>{" "}<span lang="en">Ship.</span>{" "}<span lang="en">Repeat.</span></h1>
          <p className="station-masthead-description">{b.hero}</p>
          <div className="station-masthead-actions">
            <Link href={ossHref} className="station-masthead-cta station-masthead-cta-primary">{ossCta}</Link>
            <Link href={eventsHref} className="station-masthead-cta">{eventsCta}</Link>
          </div>
        </div>
      </section>
  )
}
