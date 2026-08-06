import { notFound } from "next/navigation";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { ArrowLink } from "@/components/arrow-link";
import { Badge } from "@/components/ui/badge";
import { Container, SectionGap } from "@/components/grid-container";
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
        <Container innerClassName="px-6 py-16 md:px-10 md:py-24">
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
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
              <Link
                href="https://github.com/crafter-station/"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <ArrowLink>{t("githubCta")}</ArrowLink>
              </Link>
            </div>
          </div>
        </Container>
        <SectionGap />
        <Container innerClassName="border-b px-6 py-10 md:px-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            {t("reposEyebrow")}
          </p>
          <h2 className="mt-3 text-3xl tracking-tight md:text-4xl">
            {t("reposTitle")}
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {t("reposDescription")}
          </p>
        </Container>
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            {repos.map((repo, i) => (
              <Link
                key={repo.repo}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className={
                  "group flex min-h-56 flex-col p-8 transition-colors hover:bg-accent/10 " +
                  (i > 0
                    ? "border-t border-line md:border-t-0 md:border-l "
                    : "") +
                  (i >= 2 ? "md:border-t xl:border-t-0 " : "") +
                  (i >= 3 ? "xl:border-t xl:border-l " : "")
                }
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                  {repo.repo}
                </p>
                <h3 className="mt-3 text-2xl tracking-tight">{repo.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {repo.description ?? t("descriptionPending")}
                </p>
                <div className="mt-auto pt-5">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">★ {repo.stars.toLocaleString()}</Badge>
                    {repo.openIssues > 0 ? (
                      <Badge variant="secondary">
                        {t("openIssues", { count: repo.openIssues })}
                      </Badge>
                    ) : null}
                    {repo.language ? (
                      <Badge variant="outline">{repo.language}</Badge>
                    ) : null}
                  </div>
                  <ArrowLink className="mt-6">{t("repoCta")}</ArrowLink>
                </div>
              </Link>
            ))}
          </div>
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
