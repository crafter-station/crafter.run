import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { ArrowLink } from "@/components/arrow-link";
import { Container, SectionGap } from "@/components/grid-container";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { isLocale, withLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { team } from "@/lib/site";
import { cn } from "@/lib/utils";

export const dynamicParams = false;

export function generateStaticParams() {
  return ["en", "es", "pt"].map((lang) => ({ lang }));
}

export function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  return pageMetadata({ params, path: "/team", namespace: "pages.team" });
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = await getTranslations({ locale: lang, namespace: "pages.team" });
  const callout = await getTranslations({
    locale: lang,
    namespace: "teamWorkCallout",
  });
  const startups = await getTranslations({
    locale: lang,
    namespace: "home.workPreview",
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
        <Container innerClassName="border-b px-6 py-10 md:px-10 md:py-14">
          <div className="grid gap-8 md:grid-cols-[1fr_1.2fr] md:items-end">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
                {t("calendarEyebrow")}
              </p>
              <h2 className="mt-3 max-w-xl text-3xl tracking-tight md:text-4xl">
                {t("calendarTitle")}
              </h2>
            </div>
            <div>
              <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                {t("calendarDescription")}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {t("calendarInstructions")}
              </p>
              <Link href="#team-calendars" className="group mt-8 inline-block">
                <ArrowLink>{t("calendarCta")}</ArrowLink>
              </Link>
            </div>
          </div>
        </Container>
        <Container>
          <div id="team-calendars" className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
            {team.map((member, i) => {
              const col = (n: number) => i % n;
              return (
                <Link
                  key={member.name}
                  href={withLocale(`/team/${member.username}`, lang)}
                  className={cn(
                    "group relative flex flex-col items-center gap-3 px-4 py-8 text-center transition-colors hover:bg-accent/5",
                    col(2) !== 0 && "border-l border-line sm:border-l-0",
                    col(3) !== 0 && "sm:border-l sm:border-line lg:border-l-0",
                    col(4) !== 0 && "lg:border-l lg:border-line",
                    i >= 2 && "border-t border-line sm:border-t-0",
                    i >= 3 && "sm:border-t sm:border-line lg:border-t-0",
                    i >= 4 && "lg:border-t lg:border-line",
                  )}
                >
                  <div className="relative size-20 overflow-hidden rounded-full border border-line bg-secondary">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      sizes="80px"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {member.name}
                    </p>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                      {member.role}
                    </p>
                    <p className="mt-1 font-mono text-[10px] tracking-wider text-muted-foreground/70">
                      {member.location}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </Container>
        <SectionGap />
        <Container innerClassName="border-y px-6 py-12 md:px-10 md:py-16">
          <div className="grid gap-8 md:grid-cols-[1fr_1.35fr] md:items-end">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
                {startups("eyebrow")}
              </p>
              <h2 className="mt-3 text-3xl tracking-tight md:text-5xl">
                {startups("title")}
              </h2>
            </div>
            <div>
              <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                {startups("description")}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {callout("description")}
              </p>
              <Link
                href={withLocale("/team/work-with-us", lang)}
                className="group mt-8 inline-block"
              >
                <ArrowLink>{startups("cta")}</ArrowLink>
              </Link>
            </div>
          </div>
        </Container>
      </main>
      <SiteFooter locale={lang} />
    </>
  );
}
