import { notFound } from "next/navigation"
import { getTranslations } from "next-intl/server"
import { CrewSection } from "@/components/crew-section"
import { Container, SectionGap } from "@/components/grid-container"
import { JoinCallout } from "@/components/join-callout"
import { StationPageHero } from "@/components/station-page-hero"
import { crewMembers } from "@/lib/crew"
import { isLocale, locales } from "@/lib/i18n"
import { pageMetadata } from "@/lib/seo"

export const dynamicParams = false

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  return pageMetadata({ params, path: "/team/crew", namespace: "pages.crew" })
}

const steps = [1, 2, 3] as const

export default async function CrewPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const t = await getTranslations({ locale: lang, namespace: "pages.crew" })

  return (
    <main className="flex-1">
      <StationPageHero eyebrow={t("eyebrow")} title={t("title")} description={t("description")} art="people">
        <p className="station-team-count">{t("count", { count: crewMembers.length })}</p>
      </StationPageHero>
      <Container>
        <CrewSection locale={lang} heading={false} />
      </Container>
      <SectionGap />
      <Container>
        <p className="station-label text-accent">{t("howEyebrow")}</p>
        <h2 className="mt-3">{t("howTitle")}</h2>
        <ol className="station-card-grid station-crew-steps mt-8">
          {steps.map((step) => (
            <li key={step}>
              <p className="station-label text-accent">0{step}</p>
              <h3 className="mt-3">{t(`step${step}Title`)}</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">{t(`step${step}Body`)}</p>
            </li>
          ))}
        </ol>
      </Container>
      <SectionGap />
      <JoinCallout locale={lang} />
    </main>
  )
}
