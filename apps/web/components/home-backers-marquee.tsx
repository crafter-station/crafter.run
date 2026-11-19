import Link from "next/link"

import { backersCopy } from "@/lib/backers-copy"
import { type Locale, withLocale } from "@/lib/i18n"
import { partnerEvents, partners } from "@/lib/partners"

/** Every hackathon backer as a slow monochrome loop under the hero. The full ledger lives further down. */
export function HomeBackersMarquee({ locale }: { locale: Locale }) {
  const t = backersCopy[locale]
  const logos = partners.map((partner) => (
    <li key={partner.name}>
      <img src={partner.logo} alt={partner.name} decoding="async" />
    </li>
  ))

  return (
    <section className="home-marquee" aria-label={t.title}>
      <Link href={withLocale("/services#proof", locale)} className="home-marquee-label station-label">
        {t.summary(partners.length, partnerEvents.length)}
      </Link>
      <div className="home-marquee-track">
        <ul>{logos}</ul>
        <ul aria-hidden="true">{logos}</ul>
      </div>
    </section>
  )
}
