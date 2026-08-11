import { notFound } from "next/navigation"
import { getTranslations } from "next-intl/server"
import { type OssMetricsCopy, OssMetricsDashboard } from "@/components/oss-metrics-dashboard"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { isLocale, locales } from "@/lib/i18n"
import { getOssMetrics } from "@/lib/oss-metrics"
import { pageMetadata } from "@/lib/seo"

export const revalidate = 3600

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  return pageMetadata({
    params,
    path: "/oss/metrics",
    namespace: "pages.ossMetrics",
  })
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()

  const [t, metrics] = await Promise.all([
    getTranslations({ locale: lang, namespace: "pages.ossMetrics" }),
    getOssMetrics(),
  ])
  const copy: OssMetricsCopy = {
    eyebrow: t("eyebrow"),
    title: t("title"),
    description: t("description"),
    catalogCta: t("catalogCta"),
    githubCta: t("githubCta"),
    live: t("live"),
    partial: t("partial"),
    snapshot: t("snapshot"),
    updated: t("updated"),
    repos: t("repos"),
    openIssues: t("openIssues"),
    openPrs: t("openPrs"),
    window: t("window"),
    windowValue: t("windowValue", {
      days: Math.max(1, Number(metrics.windowDays.toFixed(1))),
    }),
    signalEyebrow: t("signalEyebrow"),
    signalTitle: t("signalTitle"),
    signalDescription: t("signalDescription"),
    before: t("before"),
    after: t("after"),
    daily: t("daily"),
    metricsEyebrow: t("metricsEyebrow"),
    metricsTitle: t("metricsTitle"),
    metrics: {
      throughput: t("metrics.throughput"),
      throughputDescription: t("metrics.throughputDescription"),
      merges: t("metrics.merges"),
      mergesDescription: t("metrics.mergesDescription"),
      externalClosed: t("metrics.externalClosed"),
      externalClosedDescription: t("metrics.externalClosedDescription"),
      activeRepos: t("metrics.activeRepos"),
      activeReposDescription: t("metrics.activeReposDescription"),
    },
    flowEyebrow: t("flowEyebrow"),
    flowTitle: t("flowTitle"),
    flowDescription: t("flowDescription"),
    issuesOpened: t("issuesOpened"),
    issuesClosed: t("issuesClosed"),
    prsOpened: t("prsOpened"),
    prsClosed: t("prsClosed"),
    acquisitionEyebrow: t("acquisitionEyebrow"),
    acquisitionTitle: t("acquisitionTitle"),
    acquisitionDescription: t("acquisitionDescription"),
    externalOpened: t("externalOpened"),
    externalOpenedDescription: t("externalOpenedDescription"),
    externalResolved: t("externalResolved"),
    externalResolvedDescription: t("externalResolvedDescription"),
    backlog: t("backlog"),
    backlogDescription: t("backlogDescription"),
    distributionEyebrow: t("distributionEyebrow"),
    distributionTitle: t("distributionTitle"),
    distributionDescription: t("distributionDescription"),
    closures: t("closures"),
    concentration: t("concentration"),
    concentrationDescription: t("concentrationDescription"),
    methodologyEyebrow: t("methodologyEyebrow"),
    methodologyTitle: t("methodologyTitle"),
    methodologyDescription: t("methodologyDescription"),
    methodologyItems: [1, 2, 3, 4, 5].map((index) => t(`methodologyItems.${index}`)),
    contributeEyebrow: t("contributeEyebrow"),
    contributeTitle: t("contributeTitle"),
    contributeDescription: t("contributeDescription"),
    contributeCta: t("contributeCta"),
  }

  return (
    <>
      <SiteHeader locale={lang} />
      <main className="flex-1">
        <OssMetricsDashboard metrics={metrics} locale={lang} copy={copy} />
      </main>
      <SiteFooter locale={lang} />
    </>
  )
}
