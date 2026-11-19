import { type Locale } from "@/lib/i18n"
import { landingCopy } from "@/lib/landing-copy"
import { HomeHead } from "@/components/home-head"

// One glyph per service, drawn on the same 48px grid as the brand mark.
const glyphs = [
  <path key="hack" d="M10 34h28M14 34V18l10-6 10 6v16M20 34v-8h8v8" />,
  <path key="devrel" d="M8 24c6-10 26-10 32 0-6 10-26 10-32 0Zm16 5a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z" />,
  <path key="workshop" d="M10 14h28v18H10zM18 38h12M24 32v6M16 22l4 4-4 4M24 30h8" />,
  <path key="oss" d="M18 16 9 24l9 8M30 16l9 8-9 8M27 12l-6 24" />,
]

/** What companies hire Crafter Station for, with the event or project that proves each one. */
export function HomeServices({ locale, index }: { locale: Locale; index: number }) {
  const t = landingCopy[locale]
  return (
    <section className="home-services" aria-labelledby="home-services-title">
      <HomeHead id="home-services-title" index={index} label={t.sections.services} title={t.servicesTitle} lede={t.servicesLabel}>
        <a href="#contact" className="home-action-link">{t.servicesCta}</a>
      </HomeHead>
      <ol className="home-services-grid home-frame">
        {t.services.map((service, i) => (
          <li key={service.title}>
            <a href="#contact" className="home-service">
              <span className="home-label-sm">0{i + 1}</span>
              <svg className="home-service-glyph" viewBox="0 0 48 48" aria-hidden="true">{glyphs[i]}</svg>
              <h3>{service.title}</h3>
              <p>{service.body}</p>
              <span className="home-service-proof home-label-sm">{service.proof}</span>
            </a>
          </li>
        ))}
      </ol>
    </section>
  )
}
