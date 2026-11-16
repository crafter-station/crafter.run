import { notFound } from "next/navigation"
import { getTranslations } from "next-intl/server"
import { Container, SectionGap } from "@/components/grid-container"
import { NewsletterForm } from "@/components/newsletter-form"
import { StationPageHero } from "@/components/station-page-hero"
import { isLocale, locales } from "@/lib/i18n"
import { pageMetadata } from "@/lib/seo"

export const dynamicParams = false
export function generateStaticParams() { return locales.map(lang => ({ lang })) }
export function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  return pageMetadata({ params, path: "/newsletter", namespace: "pages.newsletter" })
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const t = await getTranslations({ locale: lang, namespace: "pages.newsletter" })
  const gets = [
    { title: t("shipsTitle"), body: t("shipsBody") },
    { title: t("peopleTitle"), body: t("peopleBody") },
    { title: t("metricsTitle"), body: t("metricsBody") },
  ]

  return (
    <main className="flex-1">
      <StationPageHero eyebrow={t("eyebrow")} title={t("title")} description={t("description")} art="conversation" />
      <SectionGap />
      <Container>
        <div className="newsletter-layout">
          <section aria-labelledby="newsletter-gets">
            <h2 id="newsletter-gets" className="newsletter-heading">{t("getsTitle")}</h2>
            <ol className="newsletter-gets">
              {gets.map(item => (
                <li key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </li>
              ))}
            </ol>
            <div className="newsletter-perks">
              <h3>{t("perksTitle")}</h3>
              <p>{t("perksBody")}</p>
            </div>
          </section>
          <section className="newsletter-card" aria-labelledby="newsletter-join">
            <h2 id="newsletter-join" className="newsletter-heading">{t("formTitle")}</h2>
            <NewsletterForm
              locale={lang}
              copy={{
                emailLabel: t("emailLabel"),
                emailPlaceholder: t("emailPlaceholder"),
                submit: t("submit"),
                submitting: t("submitting"),
                subscribed: t("subscribed"),
                alreadySubscribed: t("alreadySubscribed"),
                invalid: t("invalid"),
                unavailable: t("unavailable"),
                fine: t("fine"),
              }}
            />
          </section>
        </div>
      </Container>
      <SectionGap />
    </main>
  )
}
