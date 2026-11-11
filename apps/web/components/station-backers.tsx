import Image from "next/image"
import Link from "next/link"

import { backersCopy } from "@/lib/backers-copy"
import { type Locale, withLocale } from "@/lib/i18n"
import { partners, partnersByEvent } from "@/lib/partners"

/** A ledger of the hackathons and who backed each one, every logo linked to its company. */
export function StationBackers({ locale }: { locale: Locale }) {
  const t = backersCopy[locale]
  const groups = partnersByEvent()
  const money = new Intl.NumberFormat(locale, { style: "currency", currency: "USD", maximumFractionDigits: 0 })

  return (
    <div className="home-backers">
      <div className="home-backers-head">
        <h3 id="home-backers-title">{t.title}</h3>
        <p>{t.summary(partners.length, groups.length)}</p>
      </div>
      <ol className="home-backers-events">
        {groups.map(({ event, partners: backers }) => (
          <li key={event.id}>
            <a className="home-backers-event" href={event.href} target="_blank" rel="noreferrer">
              <span className="home-backers-name">{event.name}</span>
              <span className="station-label home-backers-meta">
                {event.year} · {t.raised(money.format(event.raised))} · {t.backers(backers.length)}
              </span>
              <span className="home-backers-arrow" aria-hidden="true">
                ↗
              </span>
            </a>
            <ul className="home-backers-logos">
              {backers.map((partner) => (
                <li key={partner.name}>
                  <a href={partner.href} target="_blank" rel="noreferrer">
                    <Image src={partner.logo} alt="" width={160} height={48} unoptimized />
                    <span className="station-label">{partner.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
      <Link href={withLocale("/hackathons", locale)} className="home-secondary-link home-backers-all">
        {t.all}
      </Link>
    </div>
  )
}
