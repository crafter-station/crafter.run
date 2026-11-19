import { notFound } from "next/navigation"
import Link from "next/link"
import { getTranslations } from "next-intl/server"
import { GitBranch, GitPullRequest, MessageCircle } from "lucide-react"
import { OssRepoGrid } from "@/components/oss-repo-grid"
import { HomeHead } from "@/components/home-head"
import { StatTiles } from "@/components/stat-tiles"
import { JsonLd } from "@/components/json-ld"
import { isLocale, withLocale } from "@/lib/i18n"
import { getOssRepos } from "@/lib/oss"
import { pageMetadata } from "@/lib/seo"
import { breadcrumbList, repositoryListSchema } from "@/lib/structured-data"
import { participationCopy } from "@/lib/participation-copy"

export const revalidate = 86400

export function generateStaticParams() {
  return ["en", "es", "pt", "zh", "ja"].map((lang) => ({ lang }))
}

export function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  return pageMetadata({ params, path: "/oss", namespace: "pages.oss" })
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const t = await getTranslations({ locale: lang, namespace: "pages.oss" })
  const nav = await getTranslations({ locale: lang, namespace: "nav" })
  const repos = await getOssRepos()
  const stars = repos.reduce((sum, repo) => sum + repo.stars, 0)
  const issues = repos.reduce((sum, repo) => sum + repo.openIssues, 0)
  const steps = [GitBranch, MessageCircle, GitPullRequest]

  return (
    <>
      <JsonLd data={[
        repositoryListSchema({ repos, locale: lang, name: nav("oss"), path: "/oss" }),
        breadcrumbList(lang, [{ name: "Crafter Station", path: "/" }, { name: nav("oss"), path: "/oss" }]),
      ]} />
      <main className="station-home oss-page flex-1">
        <section className="inner-hero" aria-labelledby="oss-title">
          <p className="home-label">{t("eyebrow")}</p>
          <div className="inner-hero-grid">
            <h1 id="oss-title">{t("heroLine1")} {t("heroLine2")}</h1>
            <div className="inner-hero-side">
              <p>{t("description")}</p>
              <div className="inner-hero-actions">
                <a href="#repositories" className="hero-cta">{t("exploreCta")}</a>
                <Link href="https://github.com/crafter-station/" target="_blank" rel="noopener noreferrer" className="home-secondary-link">
                  {t("githubCta")}
                </Link>
              </div>
            </div>
          </div>
          <div className="oss-hero-stats">
            <StatTiles items={[[stars.toLocaleString(lang), t("panelStars")], [repos.length.toLocaleString(lang), t("panelRepos")], [issues.toLocaleString(lang), t("panelIssues")]]} />
            <Link href={withLocale("/oss/metrics", lang)} className="home-secondary-link mt-4">{t("metricsCta")}</Link>
          </div>
        </section>
        <OssRepoGrid
          locale={lang} eyebrow={t("reposEyebrow")} title={t("reposTitle")} intro={t("reposDescription")}
          starsLabel={t("panelStars")}
          repos={repos.map(repo => ({ ...repo, openIssuesLabel: t("openIssues", { count: repo.openIssues }) }))}
          allLabel={t("filterAll")} filterLabel={t("filterLabel")} descriptionPending={t("descriptionPending")} repoCta={t("repoCta")}
        />
        <section id="contribute" className="oss-contribute" aria-labelledby="oss-contribute-title">
          <HomeHead id="oss-contribute-title" index={2} label={t("howEyebrow")} title={t("howTitle")} />
          <div className="oss-tiles home-frame">
            <ol className="oss-steps">
              {(["step1", "step2", "step3"] as const).map((step, index) => {
                const Icon = steps[index]
                return <li key={step}>
                  <div className="oss-step-top"><span className="home-label-sm">0{index + 1}</span><Icon size={20} strokeWidth={1.5} aria-hidden="true" /></div>
                  <h3>{t(`${step}Title`)}</h3><p>{t(`${step}Description`)}</p>
                </li>
              })}
            </ol>
            <div className="oss-activity">
              <GitBranch size={24} strokeWidth={1.5} aria-hidden="true" />
              <div><h3>{t("timelineTitle")}</h3><p>{t("timelineDescription")}</p>
                <div className="home-panel-links">
                  <Link href={withLocale("/timeline", lang)} className="home-action-link">{t("timelineCta")}</Link>
                  <Link href={withLocale("/impact/petdex", lang)} className="home-action-link">{participationCopy[lang].impact}</Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="oss-head-only" aria-labelledby="oss-suggest-title">
          <HomeHead id="oss-suggest-title" index={3} label={t("suggestEyebrow")} title={t("suggestTitle")} lede={t("suggestDescription")}>
            <a href="#repositories" className="home-action-link">{t("suggestBoardCta")}</a>
          </HomeHead>
        </section>
        <section className="oss-head-only" aria-labelledby="oss-program-title">
          <HomeHead id="oss-program-title" index={4} label={t("programEyebrow")} title={t("programTitle")} lede={t("programDescription")}>
            <Link href={withLocale("/contact", lang)} className="home-action-link">{t("programCta")}</Link>
            <Link href="https://crafters.chat" target="_blank" rel="noopener noreferrer" className="home-secondary-link">{t("communityCta")}</Link>
          </HomeHead>
        </section>
      </main>
    </>
  )
}
