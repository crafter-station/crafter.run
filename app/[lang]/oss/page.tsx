import { notFound } from "next/navigation";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { ArrowLink } from "@/components/arrow-link";
import { Container, SectionGap } from "@/components/grid-container";
import { HeroNetworkPanel } from "@/components/hero-network-panel";
import { OssRepoGrid } from "@/components/oss-repo-grid";
import { PixelArrow } from "@/components/pixel-arrow";
import { LocalizedLink } from "@/components/localized-link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { isLocale } from "@/lib/i18n";
import { getOssRepos } from "@/lib/oss";
import { pageMetadata } from "@/lib/seo";

export const revalidate = 86400;

export function generateStaticParams() {
  return ["en", "es", "pt", "zh", "ja"].map((lang) => ({ lang }));
}

export function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  return pageMetadata({ params, path: "/oss", namespace: "pages.oss" });
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = await getTranslations({ locale: lang, namespace: "pages.oss" });
  const repos = await getOssRepos();

  return (
    <>
      <SiteHeader locale={lang} />
      <main className="flex-1">
        <Container innerClassName="px-6 py-16 md:px-10 md:py-24 lg:pr-16 xl:pr-24">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_auto] lg:gap-20">
            <div className="max-w-4xl">
              <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-accent">
                {t("eyebrow")}
              </p>
              <h1 className="mt-5 text-balance text-5xl font-semibold tracking-tighter md:text-7xl">
                {t("title")}
              </h1>
              <p className="mt-6 max-w-2xl text-balance text-lg leading-8 text-muted-foreground">
                {t("description")}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
                <LocalizedLink
                  href="/projects/next"
                  locale={lang}
                  className="group inline-flex items-center gap-3 border border-background bg-foreground px-6 py-3 font-medium text-background transition-colors hover:bg-foreground/90"
                >
                  {t("suggestCta")}
                  <PixelArrow />
                </LocalizedLink>
                <Link
                  href="https://github.com/crafter-station/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <ArrowLink>{t("githubCta")}</ArrowLink>
                </Link>
                <LocalizedLink
                  href="/oss/metrics"
                  locale={lang}
                  className="group focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                >
                  <ArrowLink>{t("metricsCta")}</ArrowLink>
                </LocalizedLink>
              </div>
            </div>
            <HeroNetworkPanel
              eyebrow={t("panelEyebrow")}
              starsLabel={t("panelStars")}
              reposLabel={t("panelRepos")}
              issuesLabel={t("panelIssues")}
            />
          </div>
        </Container>
        <SectionGap />
        <OssRepoGrid
          eyebrow={t("reposEyebrow")}
          title={t("reposTitle")}
          intro={t("reposDescription")}
          repos={repos.map((repo) => ({
            ...repo,
            openIssuesLabel: t("openIssues", { count: repo.openIssues }),
          }))}
          allLabel={t("filterAll")}
          descriptionPending={t("descriptionPending")}
          repoCta={t("repoCta")}
        />
        <SectionGap />
        <Container>
          <section className="grid grid-cols-1 border-y border-line md:grid-cols-[1.2fr_1fr]">
            <div className="border-b border-line p-8 md:border-b-0 md:border-r md:p-10">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                {t("timelineEyebrow")}
              </p>
              <h2 className="mt-4 text-3xl tracking-tight md:text-4xl">
                {t("timelineTitle")}
              </h2>
              <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                {t("timelineDescription")}
              </p>
            </div>
            <div className="flex items-center p-8 md:p-10">
              <LocalizedLink href="/timeline" locale={lang} className="group">
                <ArrowLink>{t("timelineCta")}</ArrowLink>
              </LocalizedLink>
            </div>
          </section>
        </Container>
        <SectionGap />
        <Container innerClassName="border-b px-6 py-10 md:px-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            {t("howEyebrow")}
          </p>
          <h2 className="mt-3 text-3xl tracking-tight md:text-4xl">
            {t("howTitle")}
          </h2>
        </Container>
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3">
            {(["step1", "step2", "step3"] as const).map((step, i) => (
              <div
                key={step}
                className={
                  "p-8 md:p-10 " +
                  (i > 0 ? "border-t border-line md:border-t-0 md:border-l " : "")
                }
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
                  0{i + 1}
                </p>
                <h3 className="mt-4 text-xl tracking-tight">
                  {t(`${step}Title`)}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {t(`${step}Description`)}
                </p>
              </div>
            ))}
          </div>
        </Container>
        <SectionGap />
        <Container>
          <section className="grid grid-cols-1 border-y border-line md:grid-cols-[1.2fr_1fr]">
            <div className="border-b border-line p-8 md:border-b-0 md:border-r md:p-10">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
                {t("suggestEyebrow")}
              </p>
              <h2 className="mt-4 text-3xl tracking-tight md:text-4xl">
                {t("suggestTitle")}
              </h2>
              <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                {t("suggestDescription")}
              </p>
            </div>
            <div className="flex items-center p-8 md:p-10">
              <LocalizedLink
                href="/projects/next"
                locale={lang}
                className="group inline-flex items-center gap-3 border border-background bg-foreground px-6 py-3 font-medium text-background transition-colors hover:bg-foreground/90"
              >
                {t("suggestBoardCta")}
                <PixelArrow />
              </LocalizedLink>
            </div>
          </section>
        </Container>
        <SectionGap />
        <Container>
          <section className="grid grid-cols-1 border-y border-line md:grid-cols-[1.2fr_1fr]">
            <div className="border-b border-line p-8 md:border-b-0 md:border-r md:p-10">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                {t("programEyebrow")}
              </p>
              <h2 className="mt-4 text-3xl tracking-tight md:text-4xl">
                {t("programTitle")}
              </h2>
              <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                {t("programDescription")}
              </p>
            </div>
            <div className="flex flex-col justify-center gap-4 p-8 md:p-10">
              <LocalizedLink href="/contact" locale={lang} className="group">
                <ArrowLink>{t("programCta")}</ArrowLink>
              </LocalizedLink>
              <Link
                href="https://crafters.chat"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <ArrowLink>{t("communityCta")}</ArrowLink>
              </Link>
            </div>
          </section>
        </Container>
      </main>
      <SiteFooter locale={lang} />
    </>
  );
}
