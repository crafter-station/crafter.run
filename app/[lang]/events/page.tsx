import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { ArrowLink } from "@/components/arrow-link";
import { EventsList, type EventListItem } from "@/components/events-list";
import { Container, SectionGap } from "@/components/grid-container";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { isLocale, withLocale } from "@/lib/i18n";
import { fetchCrafterStationEvents, formatEventDate } from "@/lib/luma";
import { pageMetadata } from "@/lib/seo";

export const revalidate = 21600;

export const dynamicParams = false;

export function generateStaticParams() {
  return ["en", "es", "pt"].map((lang) => ({ lang }));
}

export function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  return pageMetadata({ params, path: "/events", namespace: "pages.events" });
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = await getTranslations({ locale: lang, namespace: "pages.events" });
  const sponsors = await getTranslations({
    locale: lang,
    namespace: "pages.events-sponsors",
  });
  const common = await getTranslations({ locale: lang, namespace: "common" });
  const { upcoming, past, filterTags } = await fetchCrafterStationEvents();

  const toListItem = (event: (typeof upcoming)[number]): EventListItem => ({
    id: event.id,
    title: event.title,
    description: event.description,
    url: event.url,
    coverUrl: event.coverUrl,
    location: event.location,
    date: formatEventDate(event.startAt, lang),
    tags: event.tags,
  });

  return (
    <>
      <SiteHeader locale={lang} />
      <main className="flex-1">
        <Container innerClassName="px-6 py-16 md:px-10 md:py-24">
          <div className="max-w-4xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-accent">
              {t("eyebrow")}
            </p>
            <h1 className="mt-5 text-balance text-5xl font-semibold tracking-[-0.05em] md:text-7xl">
              {t("title")}
            </h1>
            <p className="mt-6 max-w-2xl text-balance text-lg leading-8 text-muted-foreground">
              {t("description")}
            </p>
          </div>
        </Container>
        <SectionGap />
        <Container innerClassName="border-b px-6 py-10 md:px-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            {t("eyebrow")}
          </p>
          <h2 className="mt-3 text-3xl tracking-tight md:text-4xl">
            {t("section")}
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {t("sectionDescription")}
          </p>
        </Container>
        <Container>
          <EventsList
            upcoming={upcoming.map(toListItem)}
            past={past.map(toListItem)}
            filterTags={filterTags}
            labels={{
              all: t("all"),
              upcoming: t("upcoming"),
              past: t("past"),
              register: t("register"),
              noEvents: t("noEvents"),
              noFilteredEvents: t("noFilteredEvents"),
            }}
          />
        </Container>
        <SectionGap />
        <Container innerClassName="border-y px-6 py-12 md:px-10 md:py-16">
          <div className="grid gap-8 md:grid-cols-[1fr_1.35fr] md:items-end">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
                {sponsors("eyebrow")}
              </p>
              <h2 className="mt-3 text-3xl tracking-tight md:text-5xl">
                {sponsors("title")}
              </h2>
            </div>
            <div>
              <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                {sponsors("description")}
              </p>
              <a
                href={withLocale("/events/sponsors", lang)}
                className="group mt-8 inline-block"
              >
                <ArrowLink>{common("openCta")}</ArrowLink>
              </a>
            </div>
          </div>
        </Container>
      </main>
      <SiteFooter locale={lang} />
    </>
  );
}
