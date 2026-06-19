import Link from "next/link"
import { getTranslations } from "next-intl/server"
import { ArrowLink } from "@/components/arrow-link"
import { Container } from "@/components/grid-container"
import { LocalizedLink } from "@/components/localized-link"
import {
  collaborations,
  getCommunityOffers,
  getEvents,
  getResearchLinks,
  getServices,
  getStats,
} from "@/lib/site"
import { type Locale } from "@/lib/i18n"

export async function ProofStats({ locale }: { locale: Locale }) {
  const stats = getStats(locale)

  return (
    <Container>
      <div className="grid grid-cols-2 md:grid-cols-4">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className={
              "p-6 md:p-8 " +
              (i % 2 ? "border-l border-line " : "") +
              (i >= 2 ? "border-t border-line md:border-t-0 " : "") +
              (i > 0 ? "md:border-l md:border-line" : "")
            }
          >
            <p className="font-mono text-3xl tracking-tight text-accent md:text-4xl">
              {stat.value}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </Container>
  )
}

export async function WorkWithUsPreview({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "home.workPreview" })
  const services = getServices(locale)

  return (
    <div id="work">
      <Container innerClassName="border-b py-6">
        <h2 className="text-center font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          {t("section")}
        </h2>
      </Container>
      <hr className="border-line" />
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1.9fr]">
          <div className="border-b border-line p-8 lg:border-b-0 lg:border-r">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              {t("eyebrow")}
            </p>
            <h2 className="mt-4 max-w-lg text-3xl tracking-tight md:text-4xl">
              {t("title")}
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground">
              {t("description")}
            </p>
            <LocalizedLink href="/team/work-with-us" locale={locale} className="group mt-8 inline-block">
              <ArrowLink>{t("cta")}</ArrowLink>
            </LocalizedLink>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            {services.slice(0, 6).map((service, i) => (
              <LocalizedLink
                key={service.title}
                href={service.href}
                locale={locale}
                className={
                  "group flex min-h-56 flex-col justify-between p-8 transition-colors hover:bg-accent/10 " +
                  (i % 2 ? "md:border-l md:border-line " : "") +
                  (i >= 2 ? "md:border-t md:border-line xl:border-t-0 " : "") +
                  (i % 3 ? "xl:border-l xl:border-line " : "") +
                  (i > 0 ? "border-t border-line md:border-t-0" : "")
                }
              >
                <div>
                  <h3 className="text-lg tracking-tight">{service.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {service.body}
                  </p>
                </div>
                <ArrowLink className="mt-8">{t("cardCta")}</ArrowLink>
              </LocalizedLink>
            ))}
          </div>
        </div>
      </Container>
    </div>
  )
}

export async function CollaborationStrip({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "home.collaborations" })

  return (
    <Container innerClassName="overflow-hidden">
      <div className="grid grid-cols-1 border-b border-line lg:grid-cols-[360px_1fr]">
        <div className="border-b border-line p-8 lg:border-b-0 lg:border-r">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            {t("eyebrow")}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {t("description")}
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
          {collaborations.map((item, i) => (
            <a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className={
                "group flex h-28 items-center justify-center gap-3 p-5 transition-colors hover:bg-foreground/[0.03] " +
                (i % 2 ? "border-l border-line sm:border-l-0 " : "") +
                (i % 3 ? "sm:border-l sm:border-line lg:border-l-0 " : "") +
                (i % 5 ? "lg:border-l lg:border-line " : "") +
                (i >= 2 ? "border-t border-line sm:border-t-0 " : "") +
                (i >= 3 ? "sm:border-t sm:border-line lg:border-t-0 " : "") +
                (i >= 5 ? "lg:border-t lg:border-line" : "")
              }
            >
              {item.logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.logo}
                  alt=""
                  className={
                    "h-5 max-w-8 object-contain opacity-80 transition-opacity group-hover:opacity-100 " +
                    ("preserveLogoColors" in item && item.preserveLogoColors
                      ? ""
                      : "brightness-0 invert")
                  }
                />
              ) : null}
              <span className="font-mono text-xs uppercase tracking-[0.22em] text-foreground/80 transition-colors group-hover:text-foreground">
                {item.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </Container>
  )
}

export async function CommunityPreview({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "home.communityPreview" })
  const communityOffers = getCommunityOffers(locale)

  return (
    <Container>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr]">
        <div className="border-b border-line p-8 md:border-b-0 md:border-r">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            {t("eyebrow")}
          </p>
          <h2 className="mt-4 text-3xl tracking-tight md:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            {t("description")}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="https://crafters.chat" className="group" target="_blank" rel="noopener noreferrer">
              <ArrowLink>{t("communityCta")}</ArrowLink>
            </Link>
            <LocalizedLink href="/events" locale={locale} className="group">
              <ArrowLink>{t("eventsCta")}</ArrowLink>
            </LocalizedLink>
          </div>
        </div>
        <div className="divide-y divide-line">
          {communityOffers.map((offer, i) => (
            <div key={offer} className="flex items-start gap-5 p-6 md:p-8">
              <span className="font-mono text-xs text-accent">[{i + 1}]</span>
              <p className="text-sm leading-relaxed text-foreground">{offer}</p>
            </div>
          ))}
        </div>
      </div>
    </Container>
  )
}

export async function EventsResearchPreview({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "home.eventsResearch" })
  const events = getEvents(locale)
  const researchLinks = getResearchLinks(locale)

  return (
    <Container>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="border-b border-line lg:border-b-0 lg:border-r">
          <div className="border-b border-line p-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              {t("eventsEyebrow")}
            </p>
            <h2 className="mt-3 text-3xl tracking-tight">{t("eventsTitle")}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2">
            {events.map((event, i) => (
              <LocalizedLink
                key={event.title}
                href="/events"
                locale={locale}
                className={
                  "group min-h-48 p-8 transition-colors hover:bg-accent/10 " +
                  (i % 2 ? "sm:border-l sm:border-line " : "") +
                  (i >= 2 ? "border-t border-line" : "")
                }
              >
                <h3 className="text-lg tracking-tight">{event.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {event.body}
                </p>
              </LocalizedLink>
            ))}
          </div>
        </div>
        <div>
          <div className="border-b border-line p-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              {t("researchEyebrow")}
            </p>
            <h2 className="mt-3 text-3xl tracking-tight">{t("researchTitle")}</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {t("researchDescription")}
            </p>
            <LocalizedLink href="/events/sponsors" locale={locale} className="group mt-6 inline-block">
              <ArrowLink>{t("partnerCta")}</ArrowLink>
            </LocalizedLink>
          </div>
          <div className="divide-y divide-line">
            {researchLinks.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block p-8 transition-colors hover:bg-accent/10"
              >
                <h3 className="text-lg tracking-tight">{link.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {link.body}
                </p>
                <ArrowLink className="mt-8">{t("openCta")}</ArrowLink>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Container>
  )
}

export async function CommunityQrCode({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "home.communityQr" })

  return (
    <Container>
      <div className="grid grid-cols-1 border-t border-line md:grid-cols-[1fr_280px]">
        <div className="flex flex-col justify-center p-8 md:p-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            {t("eyebrow")}
          </p>
          <h2 className="mt-3 max-w-2xl text-3xl tracking-tight md:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
            {t("description")}
          </p>
          <Link
            href="https://crafters.chat"
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-8 inline-block"
          >
            <ArrowLink>{t("cta")}</ArrowLink>
          </Link>
        </div>
        <div className="flex items-center justify-center border-t border-line p-8 md:border-l md:border-t-0 md:p-10">
          <div className="bg-white p-4">
            <img
              src="/crafters-chat-qr.svg"
              alt={t("alt")}
              className="size-48"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </Container>
  )
}

export async function InstagramFollow({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "home.instagram" })

  return (
    <Container>
      <div className="border-t border-line">
        <div className="grid grid-cols-1 md:grid-cols-[0.85fr_1.15fr]">
          <div className="border-b border-line p-8 md:border-b-0 md:border-r md:p-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              {t("eyebrow")}
            </p>
            <h2 className="mt-3 max-w-xl text-3xl tracking-tight md:text-4xl">
              {t("title")}
            </h2>
          </div>
          <div className="flex flex-col justify-center p-8 md:p-10">
            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
              {t("description")}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="https://instagram.com/crafter.station/"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <ArrowLink>{t("instagramCta")}</ArrowLink>
              </Link>
              <Link
                href="https://www.youtube.com/@crafterstation"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <ArrowLink>{t("youtubeCta")}</ArrowLink>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export async function OpenCalendars({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "home.openCalendars" })

  return (
    <Container>
      <div className="grid grid-cols-1 border-t border-line md:grid-cols-[0.9fr_1.1fr]">
        <div className="border-b border-line p-8 md:border-b-0 md:border-r md:p-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            {t("eyebrow")}
          </p>
          <h2 className="mt-3 max-w-xl text-3xl tracking-tight md:text-4xl">
            {t("title")}
          </h2>
        </div>
        <div className="p-8 md:p-10">
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {t("description")}
          </p>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {t("instructions")}
          </p>
          <LocalizedLink href="/team" locale={locale} className="group mt-8 inline-block">
            <ArrowLink>{t("cta")}</ArrowLink>
          </LocalizedLink>
        </div>
      </div>
    </Container>
  )
}
