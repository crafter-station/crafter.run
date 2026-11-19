import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

import { HomeContact } from "@/components/home-contact"
import { HomeHead } from "@/components/home-head"
import { StationBackers } from "@/components/station-backers"
import { isLocale } from "@/lib/i18n"
import { pageMetadata } from "@/lib/seo"
import { hackathonEditions, pastSponsorNames, servicesCopy } from "@/lib/services-copy"
import { collaborations } from "@/lib/site"

const CONTACT_EMAIL = "railly@crafterstation.com"
const BOOKING_URL = "https://cal.com/railly/30min"

export const dynamicParams = false

export function generateStaticParams() {
  return ["en", "es", "pt", "zh", "ja"].map((lang) => ({ lang }))
}

export function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  return pageMetadata({ params, path: "/services", namespace: "pages.services" })
}

const pastSponsors = collaborations.filter((item) => (pastSponsorNames as readonly string[]).includes(item.name))

/** What companies hire Crafter Station for, grouped by category, with the proof behind each group. */
export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const t = servicesCopy[lang]
  const money = new Intl.NumberFormat(lang, { style: "currency", currency: "USD", maximumFractionDigits: 0 })

  return (
    <main className="station-home svc flex-1">
      <section className="inner-hero" aria-labelledby="svc-title">
        <p className="home-label">{t.label}</p>
        <div className="inner-hero-grid">
          <h1 id="svc-title">{t.claim}</h1>
          <div className="inner-hero-side">
            <p>{t.lede}</p>
            <div className="inner-hero-actions">
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="hero-cta">{t.book}</a>
              <a href={`mailto:${CONTACT_EMAIL}`} className="hero-cta-ghost">{t.email}</a>
            </div>
          </div>
        </div>
        <nav className="svc-jump" aria-label={t.label}>
          {t.categories.map((category) => (
            <a key={category.id} href={`#${category.id}`}>{category.label}</a>
          ))}
          <a href="#proof">{t.proofLabel}</a>
        </nav>
      </section>

      {t.categories.map((category, i) => (
        <section key={category.id} id={category.id} className="svc-cat" aria-labelledby={`svc-${category.id}-title`}>
          <HomeHead id={`svc-${category.id}-title`} index={i + 1} label={category.label} title={category.title} lede={category.lede} />
          <ul className="svc-grid home-frame">
            {category.services.map((service) => (
              <li key={service.title}>
                <a href="#contact" className="svc-item">
                  <h3>{service.title}</h3>
                  <p>{service.body}</p>
                  <span className="svc-proof home-label-sm">{service.proof}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <section id="proof" className="svc-proof-section" aria-labelledby="svc-proof-title">
        <HomeHead id="svc-proof-title" index={5} label={t.proofLabel} title={t.proofTitle} lede={t.proofLede} />
        <ul className="svc-stats home-frame">
          {t.stats.map(([value, label]) => (
            <li key={label}>
              <strong>{value}</strong>
              <span className="home-label-sm">{label}</span>
            </li>
          ))}
        </ul>

        <div className="home-backers svc-editions">
          <div className="home-backers-head"><h3>{t.editionsTitle}</h3></div>
          <ol className="svc-editions-list">
            {hackathonEditions.map((edition, i) => (
              <li key={edition.name}>
                <a href={edition.href} target="_blank" rel="noopener noreferrer">
                  <span className="home-label-sm">{String(i + 1).padStart(2, "0")}</span>
                  <span className="svc-edition-main">
                    <strong>{edition.name}</strong>
                    <span className="home-label-sm">{t.places[i]} · {edition.year} · {edition.duration}</span>
                  </span>
                  <span className="svc-edition-figure">
                    <strong>{money.format(edition.raised)}</strong>
                    <span className="home-label-sm">{t.raised}</span>
                  </span>
                  <span className="svc-edition-figure">
                    <strong>{money.format(edition.prize)}</strong>
                    <span className="home-label-sm">{t.prize}</span>
                  </span>
                  <span className="home-backers-arrow" aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
          </ol>
        </div>

        <StationBackers locale={lang} showAll={false} />

        <div className="home-backers">
          <div className="home-backers-head">
            <h3>{t.sponsorsTitle}</h3>
            <p>{t.sponsorsSummary}</p>
          </div>
          <ul className="home-backers-logos">
            {pastSponsors.map((sponsor) => (
              <li key={sponsor.name}>
                <a href={sponsor.href} target="_blank" rel="noopener noreferrer">
                  <Image src={sponsor.logo} alt="" width={160} height={48} unoptimized />
                  <span className="station-label">{sponsor.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <HomeContact locale={lang} index={6} />
    </main>
  )
}
