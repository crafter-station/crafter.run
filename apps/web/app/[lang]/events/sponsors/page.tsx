import { StationPageHero } from "@/components/station-page-hero"
import { notFound } from "next/navigation"
import { getTranslations } from "next-intl/server"
import Link from "next/link"
import { participationCopy } from "@/lib/participation-copy"
import { Container, SectionGap } from "@/components/grid-container"
import { isLocale, withLocale } from "@/lib/i18n"
import { pageMetadata } from "@/lib/seo"
import { collaborations, getEvents } from "@/lib/site"

export const dynamicParams = false

export function generateStaticParams() {
  return ["en", "es", "pt", "zh", "ja"].map((lang) => ({ lang }))
}

export function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  return pageMetadata({ params, path: "/events/sponsors", namespace: "pages.events-sponsors" })
}

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
  zh: {
    eyebrow: "往期赞助商",
    title: "已经为 Crafter Station 的 builder 到场的团队。",
    description:
      "我们曾与 devtools、AI 实验室、基础设施团队和金融科技创业公司合作，在拉美举办高质量的 builder 活动。",
  },
  ja: {
    eyebrow: "これまでのスポンサー",
    title: "すでに Crafter Station のビルダーのために動いてくれたチーム。",
    description:
      "devtools、AIラボ、インフラチーム、フィンテックスタートアップとともに、ラテンアメリカ各地で質の高いビルダーイベントに取り組んできました。",
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
  const events = getEvents(lang)
  const participation = participationCopy[lang]
  const sponsors = sponsorCopy[lang]

  return (
    <>

      <main className="flex-1">
        <StationPageHero
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
          art="events"
        />
        <SectionGap />
        <Container innerClassName="border-b px-6 py-10 md:px-10">
          <p className="font-label text-xs uppercase tracking-[0.3em] text-muted-foreground">{t("eyebrow")}</p>
          <h2 className="mt-3 text-3xl tracking-tight md:text-4xl">{t("section")}</h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">{t("sectionDescription")}</p>
        </Container>
        <Container>
          <div className="station-card-grid">
            {events.map((event, i) => (
              <article key={event.title} className={"min-h-56 p-8 " + (i > 0 ? "border-t border-line md:border-t-0 md:border-l " : "") + (i >= 2 ? "md:border-t xl:border-t-0 " : "")}>
                <h3 className="text-lg tracking-tight">{event.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{event.body}</p>
              </article>
            ))}
          </div>
        </Container>
        <SectionGap />
        <Container innerClassName="border-y px-6 py-10 md:px-10">
          <p className="font-label text-xs uppercase tracking-[0.3em] text-muted-foreground">
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
          <div className="station-sponsor-grid">
            {pastSponsors.map((item, i) => (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className={
                  "group flex min-h-32 flex-col items-center justify-center gap-4 p-6 text-center transition-colors hover:bg-accent-surface/10 " +
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
                      : "brightness-0 dark:invert")
                  }
                />
                <span className="font-label text-xs uppercase tracking-[0.22em] text-foreground/80 transition-colors group-hover:text-foreground">
                  {item.name}
                </span>
              </a>
            ))}
          </div>
        </Container>
        <SectionGap />
        <Container>
          <section className="station-callout">
            <h2>{participation.contact.title}</h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">{participation.contact.body}</p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link href={withLocale("/contact#collaborate", lang)} className="station-button">{participation.contact.community}</Link>
              <Link href={withLocale("/hackathons", lang)} className="station-text-link">{participation.history}</Link>
            </div>
          </section>
        </Container>
      </main>

    </>
  )
}
