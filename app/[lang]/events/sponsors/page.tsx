import { notFound } from "next/navigation"
import { getTranslations } from "next-intl/server"
import { ArrowLink } from "@/components/arrow-link"
import { CalEmbed } from "@/components/cal-embed"
import { Container, SectionGap } from "@/components/grid-container"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { isLocale, withLocale } from "@/lib/i18n"
import { pageMetadata } from "@/lib/seo"
import { collaborations, getServices } from "@/lib/site"

export const dynamicParams = false

export function generateStaticParams() {
  return ["en", "es", "pt"].map((lang) => ({ lang }))
}

export function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  return pageMetadata({ params, path: "/events/sponsors", namespace: "pages.events-sponsors" })
}

const calendarCopy = {
  en: {
    eyebrow: "Book a sponsor call",
    title: "Talk through the event format, audience, and activation fit.",
    description:
      "Pick a time and we will map the right sponsor package: hackathon support, Code Brew presence, product workshop, launch night, prizes, venue, or hands-on devtool activation.",
  },
  es: {
    eyebrow: "Agenda una llamada de sponsor",
    title: "Hablemos del formato, audiencia y activacion correcta.",
    description:
      "Elige un horario y mapeamos el paquete correcto: hackathon, Code Brew, workshop de producto, launch night, premios, venue o activacion hands-on de devtools.",
  },
  pt: {
    eyebrow: "Agende uma chamada de sponsor",
    title: "Vamos alinhar formato, audiencia e ativacao certa.",
    description:
      "Escolha um horario e mapeamos o pacote certo: hackathon, Code Brew, workshop de produto, launch night, premios, venue ou ativacao hands-on de devtools.",
  },
} as const

const sponsorCopy = {
  en: {
    eyebrow: "Past sponsors",
    title: "Teams that have already shown up for Crafter Station builders.",
    description:
      "We have worked with devtools, AI labs, infrastructure teams, and fintech startups on high-signal builder events across LatAm.",
  },
  es: {
    eyebrow: "Sponsors anteriores",
    title: "Equipos que ya apostaron por los builders de Crafter Station.",
    description:
      "Hemos trabajado con devtools, labs de IA, equipos de infraestructura y startups fintech en eventos de alto signal para builders en LatAm.",
  },
  pt: {
    eyebrow: "Sponsors anteriores",
    title: "Times que ja apareceram para os builders da Crafter Station.",
    description:
      "Ja trabalhamos com devtools, labs de IA, times de infraestrutura e startups fintech em eventos de alto sinal para builders no LatAm.",
  },
} as const

const pastSponsorNames = new Set(["Codex", "OpenAI", "Firecrawl", "Vercel", "v0", "Portal", "Wallbit"])
const pastSponsors = collaborations.filter((item) => pastSponsorNames.has(item.name))

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const t = await getTranslations({ locale: lang, namespace: "pages.events-sponsors" })
  const common = await getTranslations({ locale: lang, namespace: "common" })
  const services = getServices(lang)
  const calendar = calendarCopy[lang]
  const sponsors = sponsorCopy[lang]

  return (
    <>
      <SiteHeader locale={lang} />
      <main className="flex-1">
        <Container innerClassName="px-6 py-16 md:px-10 md:py-24">
          <div className="max-w-4xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-accent">{t("eyebrow")}</p>
            <h1 className="mt-5 text-balance text-5xl font-semibold tracking-[-0.05em] md:text-7xl">{t("title")}</h1>
            <p className="mt-6 max-w-2xl text-balance text-lg leading-8 text-muted-foreground">{t("description")}</p>
          </div>
        </Container>
        <SectionGap />
        <Container innerClassName="border-b px-6 py-10 md:px-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{t("eyebrow")}</p>
          <h2 className="mt-3 text-3xl tracking-tight md:text-4xl">{t("section")}</h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">{t("sectionDescription")}</p>
        </Container>
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service, i) => (
              <a key={service.title} href={withLocale(service.href, lang)} className={"group min-h-56 p-8 transition-colors hover:bg-accent/10 " + (i > 0 ? "border-t border-line md:border-t-0 md:border-l " : "") + (i >= 2 ? "md:border-t xl:border-t-0 " : "") + (i >= 3 ? "xl:border-l " : "")}>
                <h3 className="text-lg tracking-tight">{service.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{service.body}</p>
                <ArrowLink className="mt-8">{common("openCta")}</ArrowLink>
              </a>
            ))}
          </div>
        </Container>
        <SectionGap />
        <Container innerClassName="border-y px-6 py-10 md:px-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            {sponsors.eyebrow}
          </p>
          <h2 className="mt-3 max-w-3xl text-3xl tracking-tight md:text-4xl">
            {sponsors.title}
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {sponsors.description}
          </p>
        </Container>
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-7">
            {pastSponsors.map((item, i) => (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className={
                  "group flex min-h-32 flex-col items-center justify-center gap-4 p-6 text-center transition-colors hover:bg-accent/10 " +
                  (i % 2 ? "border-l border-line md:border-l-0 " : "") +
                  (i % 4 ? "md:border-l md:border-line xl:border-l-0 " : "") +
                  (i % 7 ? "xl:border-l xl:border-line " : "") +
                  (i >= 2 ? "border-t border-line md:border-t-0 " : "") +
                  (i >= 4 ? "md:border-t md:border-line xl:border-t-0" : "")
                }
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.logo}
                  alt=""
                  className={
                    "h-7 max-w-28 object-contain opacity-80 transition-opacity group-hover:opacity-100 " +
                    ("preserveLogoColors" in item && item.preserveLogoColors
                      ? ""
                      : "brightness-0 invert")
                  }
                />
                <span className="font-mono text-xs uppercase tracking-[0.22em] text-foreground/80 transition-colors group-hover:text-foreground">
                  {item.name}
                </span>
              </a>
            ))}
          </div>
        </Container>
        <SectionGap />
        <Container innerClassName="border-y px-6 py-10 md:px-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
            {calendar.eyebrow}
          </p>
          <h2 className="mt-3 max-w-3xl text-3xl tracking-tight md:text-4xl">
            {calendar.title}
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {calendar.description}
          </p>
        </Container>
        <CalEmbed calLink="cuevaio/crafter-station-sponsor" namespace="sponsor-events" />
      </main>
      <SiteFooter locale={lang} />
    </>
  )
}
