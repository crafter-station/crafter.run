import Link from "next/link"
import type { CSSProperties, ReactNode } from "react"
import { HomeHead } from "@/components/home-head"
import { LocalizedLink } from "@/components/localized-link"
import { StatTiles } from "@/components/stat-tiles"
import type { Locale } from "@/lib/i18n"
import type { OssMetricPeriod, OssMetrics } from "@/lib/oss-metrics"
import type { OssRadar } from "@/lib/oss-radar"

export type OssMetricsCopy = {
  eyebrow: string
  title: string
  description: string
  catalogCta: string
  githubCta: string
  live: string
  partial: string
  snapshot: string
  updated: string
  repos: string
  openIssues: string
  openPrs: string
  window: string
  windowValue: string
  signalEyebrow: string
  signalTitle: string
  signalDescription: string
  before: string
  after: string
  daily: string
  metricsEyebrow: string
  metricsTitle: string
  metrics: {
    throughput: string
    throughputDescription: string
    merges: string
    mergesDescription: string
    externalClosed: string
    externalClosedDescription: string
    activeRepos: string
    activeReposDescription: string
  }
  radar: {
    eyebrow: string
    title: string
    description: string
    updated: string
    coverage: string
    coverageDescription: string
    reconcile: string
    reconcileDescription: string
    review: string
    reviewDescription: string
    discover: string
    discoverDescription: string
    delta: string
    added: string
    changed: string
    resolved: string
  }
  flowEyebrow: string
  flowTitle: string
  flowDescription: string
  issuesOpened: string
  issuesClosed: string
  prsOpened: string
  prsClosed: string
  acquisitionEyebrow: string
  acquisitionTitle: string
  acquisitionDescription: string
  externalOpened: string
  externalOpenedDescription: string
  externalResolved: string
  externalResolvedDescription: string
  backlog: string
  backlogDescription: string
  distributionEyebrow: string
  distributionTitle: string
  distributionDescription: string
  closures: string
  concentration: string
  concentrationDescription: string
  methodologyEyebrow: string
  methodologyTitle: string
  methodologyDescription: string
  methodologyItems: string[]
  contributeEyebrow: string
  contributeTitle: string
  contributeDescription: string
  contributeCta: string
}

const cols = (count: number) => ({ "--cols": count }) as CSSProperties

function rate(value: number, days: number) {
  return value / Math.max(days, 1 / 24)
}

function delta(pre: number, post: number) {
  if (pre === 0) return null
  return (post / pre - 1) * 100
}

function formatNumber(value: number, locale: string, digits = 1) {
  return new Intl.NumberFormat(locale, {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  }).format(value)
}

function formatInteger(value: number, locale: string) {
  return new Intl.NumberFormat(locale).format(value)
}

function formatDelta(value: number | null, locale: string) {
  if (value === null) return "—"
  return new Intl.NumberFormat(locale, {
    maximumFractionDigits: 0,
    signDisplay: "always",
    style: "percent",
  }).format(value / 100)
}

function MetricCell({ label, description, value, change, locale }: {
  label: string; description: string; value: string; change: number | null; locale: string
}) {
  return (
    <div className="metric-tile">
      <div className="metric-tile-top">
        <p className="home-label-sm">{label}</p>
        <span className="home-label-sm is-gold">{formatDelta(change, locale)}</span>
      </div>
      <p className="figure">{value}</p>
      <p className="tile-copy">{description}</p>
    </div>
  )
}

function FlowRow({ label, pre, post, days, locale }: {
  label: string; pre: number; post: number; days: number; locale: string
}) {
  const beforeRate = rate(pre, days)
  const afterRate = rate(post, days)
  const max = Math.max(beforeRate, afterRate, 1)

  return (
    <div className="flow-row">
      <p>{label}</p>
      {([["before", beforeRate], ["after", afterRate]] as const).map(([key, value]) => (
        <div key={key} className="flow-bar">
          <span className="flow-track"><span className={`is-${key}`} style={{ width: `${Math.max(3, (value / max) * 100)}%` }} /></span>
          <span className={`flow-num is-${key}`}>{formatNumber(value, locale)}</span>
        </div>
      ))}
    </div>
  )
}

function ChangePanel({ label, description, pre, post, days, locale }: {
  label: string; description: string; pre: number; post: number; days: number; locale: string
}) {
  const preRate = rate(pre, days)
  const postRate = rate(post, days)

  return (
    <div className="metric-tile">
      <p className="home-label-sm">{label}</p>
      <div className="metric-compare">
        <div>
          <p className="figure">{formatNumber(postRate, locale)}</p>
          <p className="metric-sub mt-2">{formatNumber(preRate, locale)} → {formatNumber(postRate, locale)}</p>
        </div>
        <p className="home-label-sm is-gold">{formatDelta(delta(preRate, postRate), locale)}</p>
      </div>
      <p className="tile-copy">{description}</p>
    </div>
  )
}

function RadarCell({ label, description, value }: { label: string; description: string; value: string }) {
  return (
    <div className="metric-tile">
      <p className="home-label-sm">{label}</p>
      <p className="figure">{value}</p>
      <p className="tile-copy">{description}</p>
    </div>
  )
}

function Section({ id, index, label, title, lede, action, children }: {
  id: string; index: number; label: string; title: string; lede?: string; action?: ReactNode; children: ReactNode
}) {
  return (
    <section aria-labelledby={id}>
      <HomeHead id={id} index={index} label={label} title={title} lede={lede}>{action}</HomeHead>
      {children}
    </section>
  )
}

function topShare(period: OssMetricPeriod) {
  const topTwo = period.closuresByRepo.slice(0, 2).reduce((sum, repo) => sum + repo.count, 0)
  return period.totalClosed === 0 ? 0 : (topTwo / period.totalClosed) * 100
}

export function OssMetricsDashboard({
  metrics,
  radar,
  locale,
  copy,
}: {
  metrics: OssMetrics
  radar: OssRadar
  locale: Locale
  copy: OssMetricsCopy
}) {
  const throughputPre = rate(metrics.pre.totalClosed, metrics.windowDays)
  const throughputPost = rate(metrics.post.totalClosed, metrics.windowDays)
  const mergesPre = rate(metrics.pre.prsMerged, metrics.windowDays)
  const mergesPost = rate(metrics.post.prsMerged, metrics.windowDays)
  const externalPre = rate(metrics.pre.externalPrsClosed, metrics.windowDays)
  const externalPost = rate(metrics.post.externalPrsClosed, metrics.windowDays)
  const activePre = (metrics.pre.activeRepos / metrics.repoCount) * 100
  const activePost = (metrics.post.activeRepos / metrics.repoCount) * 100
  const maxClosures = metrics.post.closuresByRepo[0]?.count ?? 1
  const updated = new Intl.DateTimeFormat(locale, {
    dateStyle: "medium",
    timeZone: "UTC",
  }).format(new Date(metrics.generatedAt))
  const sourceLabel = metrics.incomplete
    ? copy.partial
    : metrics.source === "github"
      ? copy.live
      : copy.snapshot
  const radarUpdated = new Intl.DateTimeFormat(locale, {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "UTC",
  }).format(new Date(radar.generatedAt))

  return (
    <>
      <section className="inner-hero" aria-labelledby="metrics-title">
        <p className="home-label">{copy.eyebrow}</p>
        <div className="inner-hero-grid">
          <h1 id="metrics-title">{copy.title}</h1>
          <div className="inner-hero-side">
            <p>{copy.description}</p>
            <div className="inner-hero-actions">
              <LocalizedLink href="/oss" locale={locale} className="home-action-link">{copy.catalogCta}</LocalizedLink>
              <Link href="https://github.com/crafter-station" target="_blank" rel="noopener noreferrer" className="home-action-link">{copy.githubCta}</Link>
            </div>
          </div>
        </div>
        <StatTiles items={[
          [formatInteger(metrics.repoCount, locale), copy.repos],
          [formatInteger(metrics.openIssues, locale), copy.openIssues],
          [formatInteger(metrics.openPrs, locale), copy.openPrs],
        ]} />
      </section>

      <Section id="metrics-signal" index={1} label={`${copy.signalEyebrow} · ${sourceLabel}`} title={copy.signalTitle} lede={copy.signalDescription}
        action={<span className="home-label">{copy.updated} · {updated}</span>}>
        <div className="signal-tiles tile-grid home-frame" style={cols(4)}>
          <div className="metric-tile">
            <p className="home-label-sm">{copy.daily}</p>
            <p className="figure">{formatDelta(delta(throughputPre, throughputPost), locale)}</p>
          </div>
          {[[copy.before, throughputPre], [copy.after, throughputPost]].map(([label, value]) => (
            <div key={String(label)} className="metric-tile">
              <p className="home-label-sm">{label} · {copy.daily}</p>
              <p className="figure">{formatNumber(Number(value), locale)}</p>
            </div>
          ))}
          <div className="metric-tile">
            <p className="home-label-sm">{copy.window}</p>
            <p className="figure">{copy.windowValue}</p>
          </div>
        </div>
      </Section>

      <Section id="metrics-rhythm" index={2} label={copy.metricsEyebrow} title={copy.metricsTitle}>
        <div className="tile-grid home-frame" style={cols(4)}>
          <MetricCell label={copy.metrics.throughput} description={copy.metrics.throughputDescription}
            value={formatNumber(throughputPost, locale)} change={delta(throughputPre, throughputPost)} locale={locale} />
          <MetricCell label={copy.metrics.merges} description={copy.metrics.mergesDescription}
            value={formatNumber(mergesPost, locale)} change={delta(mergesPre, mergesPost)} locale={locale} />
          <MetricCell label={copy.metrics.externalClosed} description={copy.metrics.externalClosedDescription}
            value={formatNumber(externalPost, locale)} change={delta(externalPre, externalPost)} locale={locale} />
          <MetricCell label={copy.metrics.activeRepos} description={copy.metrics.activeReposDescription}
            value={`${metrics.post.activeRepos}/${metrics.repoCount}`} change={delta(activePre, activePost)} locale={locale} />
        </div>
      </Section>

      <Section id="metrics-radar" index={3} label={copy.radar.eyebrow} title={copy.radar.title} lede={copy.radar.description}
        action={<span className="home-label">{copy.radar.updated} · {radarUpdated}</span>}>
        <div className="tile-grid home-frame" style={cols(4)}>
          <RadarCell label={copy.radar.coverage} description={copy.radar.coverageDescription} value={`${radar.summary.successful}/${radar.summary.repoCount}`} />
          <RadarCell label={copy.radar.reconcile} description={copy.radar.reconcileDescription} value={formatInteger(radar.summary.reconcileCandidates, locale)} />
          <RadarCell label={copy.radar.review} description={copy.radar.reviewDescription} value={formatInteger(radar.summary.reviewCandidates, locale)} />
          <RadarCell label={copy.radar.discover} description={copy.radar.discoverDescription} value={formatInteger(radar.summary.discoverRepos, locale)} />
          <div className="tile-wide">
            <p className="home-label-sm">{copy.radar.delta}</p>
            <p className="metric-sub mt-3">
              +{formatInteger(radar.summary.added, locale)} {copy.radar.added} · {formatInteger(radar.summary.changed, locale)} {copy.radar.changed} · {formatInteger(radar.summary.resolved, locale)} {copy.radar.resolved}
            </p>
          </div>
        </div>
      </Section>

      <Section id="metrics-flow" index={4} label={copy.flowEyebrow} title={copy.flowTitle} lede={copy.flowDescription}>
        <div className="flow-table home-frame">
          <div className="flow-head home-label-sm">
            <span />
            <span>{copy.before}</span>
            <span className="is-after">{copy.after}</span>
          </div>
          <div className="flow-legend home-label-sm" aria-hidden="true">
            <span>{copy.before}</span>
            <span className="is-after">{copy.after}</span>
          </div>
          <FlowRow label={copy.issuesOpened} pre={metrics.pre.issuesOpened} post={metrics.post.issuesOpened} days={metrics.windowDays} locale={locale} />
          <FlowRow label={copy.issuesClosed} pre={metrics.pre.issuesClosed} post={metrics.post.issuesClosed} days={metrics.windowDays} locale={locale} />
          <FlowRow label={copy.prsOpened} pre={metrics.pre.prsOpened} post={metrics.post.prsOpened} days={metrics.windowDays} locale={locale} />
          <FlowRow label={copy.prsClosed} pre={metrics.pre.prsClosed} post={metrics.post.prsClosed} days={metrics.windowDays} locale={locale} />
        </div>
      </Section>

      <Section id="metrics-acquisition" index={5} label={copy.acquisitionEyebrow} title={copy.acquisitionTitle} lede={copy.acquisitionDescription}>
        <div className="tile-grid home-frame" style={cols(3)}>
          <ChangePanel label={copy.externalOpened} description={copy.externalOpenedDescription}
            pre={metrics.pre.externalPrsOpened} post={metrics.post.externalPrsOpened} days={metrics.windowDays} locale={locale} />
          <ChangePanel label={copy.externalResolved} description={copy.externalResolvedDescription}
            pre={metrics.pre.externalPrsClosed} post={metrics.post.externalPrsClosed} days={metrics.windowDays} locale={locale} />
          <ChangePanel label={copy.backlog} description={copy.backlogDescription}
            pre={metrics.pre.netBacklog} post={metrics.post.netBacklog} days={metrics.windowDays} locale={locale} />
        </div>
      </Section>

      <Section id="metrics-distribution" index={6} label={copy.distributionEyebrow} title={copy.distributionTitle} lede={copy.distributionDescription}>
        <div className="dist-grid tile-grid home-frame">
          <div className="metric-tile">
            <p className="home-label-sm">{copy.concentration}</p>
            <p className="figure">{formatNumber(topShare(metrics.post), locale, 0)}%</p>
            <p className="tile-copy">{copy.concentrationDescription}</p>
          </div>
          <div>
            <div className="flex items-center justify-between pb-3 home-label-sm">
              <span>{copy.distributionEyebrow}</span>
              <span>{copy.closures}</span>
            </div>
            <div className="dist-rows">
              {metrics.post.closuresByRepo.slice(0, 8).map((repo) => (
                <div key={repo.repo}>
                  <span className="dist-name">{repo.repo}</span>
                  <span className="dist-bar"><span style={{ width: `${Math.max(4, (repo.count / maxClosures) * 100)}%` }} /></span>
                  <span className="dist-count">{repo.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section id="metrics-method" index={7} label={copy.methodologyEyebrow} title={copy.methodologyTitle} lede={copy.methodologyDescription}>
        <ol className="tile-grid tile-grid-2 home-frame" style={cols(2)}>
          {copy.methodologyItems.map((item, index) => (
            <li key={item} className="method-item">
              <span className="home-label-sm">0{index + 1}</span>
              <p>{item}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="metrics-contribute" index={8} label={copy.contributeEyebrow} title={copy.contributeTitle} lede={copy.contributeDescription}
        action={<LocalizedLink href="/oss" locale={locale} className="hero-cta">{copy.contributeCta}</LocalizedLink>}>
        {null}
      </Section>
    </>
  )
}
