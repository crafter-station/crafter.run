import { type Locale } from "@/lib/i18n"
import { landingCopy } from "@/lib/landing-copy"
import { teamMembers } from "@/lib/team"

const CONTACT_EMAIL = "railly@crafterstation.com"
const BOOKING_URL = "https://cal.com/railly/30min"
const FOUNDERS = ["railly", "tarmeno", "edward"]

/** The closing call to action: who to talk to, a call, a coffee, or an email. */
export function HomeContact({ locale }: { locale: Locale }) {
  const t = landingCopy[locale]
  const people = teamMembers.filter((member) => FOUNDERS.includes(member.username))
  const names = new Intl.ListFormat(locale, { type: "disjunction" }).format(people.map((person) => person.name.split(" ")[0]))
  const coffee = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(t.coffeeSubject)}`

  return (
    <section id="contact" className="home-hire" aria-labelledby="home-hire-title">
      <div className="home-hire-panel">
        <div className="home-hire-copy">
          <p className="station-label">{t.contactLabel}</p>
          <h2 id="home-hire-title">{t.contactTitle}</h2>
          <p>{t.contactBody(names)}</p>
        </div>
        {/* Same cutout and plate as "The people behind it"; the clip paths are defined once in StationPeople. */}
        <ul className="home-hire-people home-portraits">
          {people.map((person, i) => (
            <li key={person.username} className="home-portrait">
              <div className="home-portrait-image">
                <div className="home-portrait-cutout" style={{ clipPath: `url(#portrait-crop-${i})` }}>
                  <span className="home-portrait-plate" style={{ clipPath: `url(#portrait-shape-${i})` }} aria-hidden="true" />
                  <img src={person.image} alt="" width="768" height="768" loading="lazy" />
                </div>
              </div>
              <div className="home-portrait-caption"><span>{person.name}</span></div>
            </li>
          ))}
        </ul>
        <div className="home-hire-actions">
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="home-hire-primary">{t.bookCall}</a>
          <a href={coffee} className="home-hire-secondary">{t.coffee}</a>
          <a href={`mailto:${CONTACT_EMAIL}`} className="home-hire-email">{CONTACT_EMAIL}</a>
        </div>
      </div>
    </section>
  )
}
