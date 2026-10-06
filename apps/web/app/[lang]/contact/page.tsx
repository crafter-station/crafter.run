import Link from "next/link"
import { notFound } from "next/navigation"
import { getTranslations } from "next-intl/server"
import { ArrowLink } from "@/components/arrow-link"
import { Container, SectionGap } from "@/components/grid-container"
import { StationPageHero } from "@/components/station-page-hero"
import { isLocale, locales, withLocale } from "@/lib/i18n"
import { getParticipationPaths, participationCopy } from "@/lib/participation-copy"
import { pageMetadata } from "@/lib/seo"

export const dynamicParams = false
export function generateStaticParams() { return locales.map(lang => ({ lang })) }
export function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  return pageMetadata({ params, path: "/contact", namespace: "pages.contact" })
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const t = await getTranslations({ locale: lang, namespace: "pages.contact" })
  const copy = participationCopy[lang]

  return (
    <main className="flex-1">
      <StationPageHero eyebrow={t("eyebrow")} title={t("title")} description={t("description")} art="conversation" />
      <SectionGap />
      <Container>
        <div className="station-card-grid">
          {getParticipationPaths(lang).map(path => (
            <Link key={path.href} href={withLocale(path.href, lang)}
              {...(path.href.startsWith("https:") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
              <h2 className="text-2xl">{path.title}</h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">{path.body}</p>
              <ArrowLink>{path.action}</ArrowLink>
            </Link>
          ))}
        </div>
      </Container>
      <SectionGap />
      <Container>
        <section id="collaborate" className="station-callout">
          <span id="engineering-calendar" aria-hidden="true" />
          <h2>{copy.contact.title}</h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">{copy.contact.body}</p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <a className="station-button" href="https://crafters.chat" target="_blank" rel="noopener noreferrer">{copy.contact.community}</a>
            <Link href={withLocale("/team", lang)} className="station-text-link">{copy.contact.team}</Link>
          </div>
        </section>
      </Container>
    </main>
  )
}
