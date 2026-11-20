import Link from "next/link"
import { notFound } from "next/navigation"
import { Container, SectionGap } from "@/components/grid-container"
import { JsonLd } from "@/components/json-ld"
import { StationPageHero } from "@/components/station-page-hero"
import { findHackathon, hackathonPath, hackathons, hackathonUi } from "@/lib/hackathons"
import { isLocale, locales, withLocale } from "@/lib/i18n"
import { buildMetadata } from "@/lib/seo"
import { siteConfig } from "@/lib/site"
import { breadcrumbList, hackathonSchema } from "@/lib/structured-data"

export const dynamicParams = false
export function generateStaticParams() {
  return locales.flatMap((lang) => hackathons.map((hackathon) => ({ lang, slug: hackathon.slug })))
}

type Params = Promise<{ lang: string; slug: string }>

export async function generateMetadata({ params }: { params: Params }) {
  const { lang, slug } = await params
  const hackathon = findHackathon(slug)
  if (!isLocale(lang) || !hackathon) return {}
  return buildMetadata({
    locale: lang,
    path: `/events/hackathons/${hackathon.slug}`,
    title: hackathon.name,
    description: hackathon.copy[lang].summary,
  })
}

export default async function Page({ params }: { params: Params }) {
  const { lang, slug } = await params
  const hackathon = findHackathon(slug)
  if (!isLocale(lang) || !hackathon) notFound()
  const t = hackathon.copy[lang]
  const ui = hackathonUi[lang]
  const others = hackathons.filter((item) => item.slug !== hackathon.slug)
  const facts = [
    { label: ui.date, value: t.date },
    { label: ui.place, value: t.place },
    { label: ui.organizer, value: siteConfig.name },
    ...t.facts,
  ]

  return (
    <main className="flex-1">
      <JsonLd
        data={[
          hackathonSchema(hackathon, lang, t.summary),
          breadcrumbList(lang, [
            { name: siteConfig.name, path: "/" },
            { name: ui.events, path: "/events" },
            { name: hackathon.name, path: `/events/hackathons/${hackathon.slug}` },
          ]),
        ]}
      />
      <StationPageHero
        eyebrow={ui.eyebrow}
        title={hackathon.name}
        description={t.summary}
        actions={
          <>
            {hackathon.officialUrl ? (
              <a className="hero-cta" href={hackathon.officialUrl} target="_blank" rel="noopener">
                {ui.official} ↗
              </a>
            ) : null}
            {hackathon.deckUrl ? (
              <a className="hero-cta" href={hackathon.deckUrl} target="_blank" rel="noopener">
                {ui.deck} ↗
              </a>
            ) : null}
          </>
        }
      />
      <SectionGap />
      <Container>
        <section className="station-callout home-frame">
          {t.body.map((paragraph) => (
            <p key={paragraph} className="max-w-2xl leading-relaxed text-muted-foreground [&:not(:first-child)]:mt-4">
              {paragraph}
            </p>
          ))}
          <dl className="mt-8 grid gap-6 sm:grid-cols-2">
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt className="home-label-sm">{fact.label}</dt>
                <dd className="mt-1 leading-relaxed">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </section>
      </Container>
      {hackathon.judges && t.judgesTitle ? (
        <>
          <SectionGap />
          <Container>
            <section className="station-callout home-frame">
              <h2 className="text-2xl">{t.judgesTitle}</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {hackathon.judges.map((judge) => (
                  <li key={judge.name}>
                    <strong>{judge.name}</strong>
                    <span className="block text-muted-foreground">{judge.role}</span>
                  </li>
                ))}
              </ul>
            </section>
          </Container>
        </>
      ) : null}
      <SectionGap />
      <Container>
        <p className="flex flex-wrap items-center gap-6 py-6">
          <Link href={withLocale("/events", lang)} className="home-secondary-link">
            {ui.back}
          </Link>
          {others.map((other) => (
            <Link key={other.slug} href={hackathonPath(lang, other)} className="home-secondary-link">
              {other.name}
            </Link>
          ))}
        </p>
      </Container>
    </main>
  )
}
