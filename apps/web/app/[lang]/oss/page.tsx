import { notFound } from "next/navigation"
import Link from "next/link"
import { getTranslations } from "next-intl/server"
import { GitBranch, GitPullRequest, Lightbulb, MessageCircle, Star } from "lucide-react"
import { OssRepoGrid } from "@/components/oss-repo-grid"
import { ContributionPath } from "@/components/oss-art"
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
      <main className="oss-page">
        <section className="oss-hero" aria-labelledby="oss-title">
          <div className="oss-hero-topline">
            <span className="station-label">Crafter / Open Source</span>
            <span className="oss-open-note"><i aria-hidden="true" />{t("heroNote")}</span>
          </div>
          <h1 className="oss-display-title" id="oss-title"><span>{t("heroLine1")}</span>{" "}<span>{t("heroLine2")}</span></h1>
          <div className="oss-hero-layout">
            <div className="oss-hero-copy">
              <p>{t("description")}</p>
              <div className="oss-hero-actions">
                <a href="#repositories" className="oss-button">{t("exploreCta")}</a>
                <Link href="https://github.com/crafter-station/" target="_blank" rel="noopener noreferrer" className="oss-inline-link">
                  {t("githubCta")}
                </Link>
              </div>
            </div>
            <div className="oss-impact">
              <dl>
                <div className="oss-impact-stars"><dt>{t("panelStars")} <span>GitHub</span></dt><dd>{stars.toLocaleString(lang)}<Star size={29} strokeWidth={1.2} aria-hidden="true" /></dd></div>
                <div><dt>{t("panelRepos")}</dt><dd>{repos.length.toLocaleString(lang)}</dd></div>
                <div><dt>{t("panelIssues")}</dt><dd>{issues.toLocaleString(lang)}</dd></div>
              </dl>
              <Link href={withLocale("/oss/metrics", lang)} className="oss-inline-link">{t("metricsCta")}</Link>
            </div>
          </div>
        </section>
        <OssRepoGrid
          locale={lang} eyebrow={t("reposEyebrow")} title={t("reposTitle")} intro={t("reposDescription")}
          starsLabel={t("panelStars")}
          repos={repos.map(repo => ({ ...repo, openIssuesLabel: t("openIssues", { count: repo.openIssues }) }))}
          allLabel={t("filterAll")} filterLabel={t("filterLabel")} descriptionPending={t("descriptionPending")} repoCta={t("repoCta")}
        />
        <section id="contribute" className="oss-contribute" aria-labelledby="oss-contribute-title">
          <div className="oss-contribute-intro">
            <div><p className="station-label">{t("howEyebrow")}</p><h2 id="oss-contribute-title">{t("howTitle")}</h2></div>
            <ContributionPath />
          </div>
          <ol className="oss-steps">
            {(["step1", "step2", "step3"] as const).map((step, index) => {
              const Icon = steps[index]
              return <li key={step}>
                <div className="oss-step-top"><span className="station-label">0{index + 1}</span><Icon size={20} strokeWidth={1.5} aria-hidden="true" /></div>
                <h3>{t(`${step}Title`)}</h3><p>{t(`${step}Description`)}</p>
              </li>
            })}
          </ol>
          <div className="oss-activity">
            <GitBranch size={24} strokeWidth={1.5} aria-hidden="true" />
            <div><h3>{t("timelineTitle")}</h3><p>{t("timelineDescription")}</p>
              <div className="mt-4 flex flex-wrap gap-4">
                <Link href={withLocale("/timeline", lang)} className="oss-inline-link oss-soft-link">{t("timelineCta")}</Link>
                <Link href={withLocale("/impact/petdex", lang)} className="oss-inline-link oss-soft-link">{participationCopy[lang].impact}</Link>
              </div>
            </div>
          </div>
        </section>
        <section className="oss-invitations" aria-label={t("suggestEyebrow")}>
          <div className="oss-idea-note">
            <div className="oss-note-top"><span className="station-label">{t("suggestEyebrow")}</span><Lightbulb size={28} strokeWidth={1.2} aria-hidden="true" /></div>
            <h2>{t("suggestTitle")}</h2><p>{t("suggestDescription")}</p>
            <a href="#repositories" className="oss-inline-link oss-soft-link">{t("suggestBoardCta")}</a>
          </div>
          <div className="oss-community">
            <p className="station-label">{t("programEyebrow")}</p>
            <h2>{t("programTitle")}</h2><p>{t("programDescription")}</p>
            <div className="oss-community-actions"><Link href={withLocale("/contact", lang)} className="oss-inline-link oss-soft-link">{t("programCta")}</Link>
              <Link href="https://crafters.chat" target="_blank" rel="noopener noreferrer" className="oss-inline-link">{t("communityCta")}</Link></div>
          </div>
        </section>
      </main>
    </>
  )
}
