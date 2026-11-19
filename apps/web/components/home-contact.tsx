import Link from "next/link"

import { HomeHead } from "@/components/home-head"
import { HomePortraits } from "@/components/home-portraits"
import { PortraitDefs } from "@/components/station-home"
import { type Locale, withLocale } from "@/lib/i18n"
import { landingCopy } from "@/lib/landing-copy"
import { activeTeamMembers, featuredTeamMembers } from "@/lib/team"

const CONTACT_EMAIL = "railly@crafterstation.com"
const BOOKING_URL = "https://cal.com/railly/30min"

const portrait = (person: { username: string; name: string; image: string }) => ({ username: person.username, name: person.name, image: person.image })

/** The closing section: the people behind Crafter Station, then a call, a coffee, or an email. */
export function HomeContact({ locale, index }: { locale: Locale; index: number }) {
  const t = landingCopy[locale]
  const coffee = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(t.coffeeSubject)}`

  return (
    <section id="contact" className="home-hire" aria-labelledby="home-hire-title">
      <PortraitDefs />
      <HomeHead id="home-hire-title" index={index} label={t.sections.contact} title={t.contactTitle} lede={t.contactBody()}>
        <Link href={withLocale("/team", locale)} className="home-secondary-link">{t.meetTeam}</Link>
      </HomeHead>
      <div className="home-hire-panel home-frame">
        <HomePortraits initial={featuredTeamMembers.map(portrait)} pool={activeTeamMembers.filter((person) => person.image).map(portrait)} locale={locale} />
        <div className="home-hire-actions">
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="home-hire-primary">{t.bookCall}</a>
          <a href={coffee} className="home-hire-secondary">{t.coffee}</a>
          <a href={`mailto:${CONTACT_EMAIL}`} className="home-hire-email">{CONTACT_EMAIL}</a>
        </div>
      </div>
    </section>
  )
}
