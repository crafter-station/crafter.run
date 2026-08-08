import { notFound } from "next/navigation"
import Link from "next/link"
import { getTranslations } from "next-intl/server"
import { ArrowLink } from "@/components/arrow-link"
import { ContactPicker } from "@/components/contact-picker"
import { Container, SectionGap } from "@/components/grid-container"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { isLocale, withLocale } from "@/lib/i18n"
import { pageMetadata } from "@/lib/seo"
import { getServices } from "@/lib/site"

export const dynamicParams = false

export function generateStaticParams() {
  return ["en", "es", "pt", "zh", "ja"].map((lang) => ({ lang }))
}

export function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  return pageMetadata({ params, path: "/contact", namespace: "pages.contact" })
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const t = await getTranslations({ locale: lang, namespace: "pages.contact" })
  const common = await getTranslations({ locale: lang, namespace: "common" })
  const services = getServices(lang)

  return (
    <>
      <SiteHeader locale={lang} />
      <main className="flex-1">
        <Container innerClassName="px-6 py-16 md:px-10 md:py-24">
          <div className="max-w-4xl"><p className="font-mono text-[10px] uppercase tracking-[0.35em] text-accent">{t("eyebrow")}</p><h1 className="mt-5 text-balance text-5xl font-semibold tracking-tighter md:text-7xl">{t("title")}</h1><p className="mt-6 max-w-2xl text-balance text-lg leading-8 text-muted-foreground">{t("description")}</p></div>
        </Container>
        <SectionGap />
        <Container innerClassName="border-b px-6 py-10 md:px-10"><p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{t("eyebrow")}</p><h2 className="mt-3 text-3xl tracking-tight md:text-4xl">{t("section")}</h2><p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">{t("sectionDescription")}</p></Container>
        <Container><div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">{services.slice(0, 6).map((service, i) => <Link key={service.title} href={withLocale(service.href, lang)} className={"group min-h-56 p-8 transition-colors hover:bg-accent/10 " + (i > 0 ? "border-t border-line md:border-t-0 md:border-l " : "") + (i >= 2 ? "md:border-t xl:border-t-0 " : "")}><h3 className="text-lg tracking-tight">{service.title}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{service.body}</p><ArrowLink className="mt-8">{common("openCta")}</ArrowLink></Link>)}</div></Container>
        <SectionGap />
        <ContactPicker
          eyebrow={t("pickerEyebrow")}
          title={t("pickerTitle")}
          description={t("pickerDescription")}
          withLabel={t("pickerWith")}
          tracks={[
            {
              id: "startup",
              label: t("trackStartupLabel"),
              host: "Anthony Cueva",
              blurb: t("trackStartupBlurb"),
              calLink: "cuevaio/crafter-station-startup",
            },
            {
              id: "career",
              label: t("trackCareerLabel"),
              host: "Railly Hugo",
              blurb: t("trackCareerBlurb"),
              calLink: "railly/crafter-station-mentorship",
            },
            {
              id: "oss",
              label: t("trackOssLabel"),
              host: "Railly Hugo",
              blurb: t("trackOssBlurb"),
              calLink: "railly/crafter-station-oss",
            },
            {
              id: "sponsor",
              label: t("trackSponsorLabel"),
              host: "Anthony Cueva",
              blurb: t("trackSponsorBlurb"),
              calLink: "cuevaio/crafter-station-sponsor",
            },
          ]}
        />
      </main>
      <SiteFooter locale={lang} />
    </>
  )
}
