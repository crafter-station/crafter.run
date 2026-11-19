import Link from "next/link"

import { HomeHead } from "@/components/home-head"
import { ServiceArt } from "@/components/service-art"
import { type Locale, withLocale } from "@/lib/i18n"
import { landingCopy } from "@/lib/landing-copy"

// Each tile opens the matching category on the services page.
const anchors = ["events", "devrel", "education", "open-source"] as const

/** What companies hire Crafter Station for, with the event or project that proves each one. */
export function HomeServices({ locale, index }: { locale: Locale; index: number }) {
  const t = landingCopy[locale]
  return (
    <section className="home-services" aria-labelledby="home-services-title">
      <HomeHead id="home-services-title" index={index} label={t.sections.services} title={t.servicesTitle} lede={t.servicesLabel}>
        <Link href={withLocale("/services", locale)} className="home-action-link">{t.servicesCta}</Link>
      </HomeHead>
      <ol className="home-services-grid home-frame">
        {t.services.map((service, i) => (
          <li key={service.title}>
            <Link href={withLocale(`/services#${anchors[i]}`, locale)} className="home-service">
              <span className="home-label-sm">0{i + 1}</span>
              <ServiceArt kind={i as 0 | 1 | 2 | 3} />
              <h3>{service.title}</h3>
              <p>{service.body}</p>
              <span className="home-service-proof home-label-sm">{service.proof}</span>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  )
}
