import Link from "next/link"
import { ArrowLink } from "@/components/arrow-link"
import { Container, SectionGap } from "@/components/grid-container"
import { LocalizedLink } from "@/components/localized-link"
import { PixelArrow } from "@/components/pixel-arrow"
import type { Locale } from "@/lib/i18n"
import type { OssMetricPeriod, OssMetrics } from "@/lib/oss-metrics"
import { projectColor } from "@/lib/project-color"
import { cn } from "@/lib/utils"

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

function MetricCell({
  label,
  description,
  value,
  change,
  locale,
  color,
  className,
}: {
  label: string
  description: string
  value: string
  change: number | null
  locale: string
  color: string
  className?: string
}) {
  return (
    <div className={cn("relative flex min-h-56 flex-col overflow-hidden p-7 md:p-8", className)}>
      <span className="absolute inset-x-0 top-0 h-1" style={{ backgroundColor: color }} />
      <div className="flex items-start justify-between gap-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          {label}
        </p>
        <span
          className="border px-2 py-1 font-mono text-[10px] tabular-nums"
          style={{ borderColor: color, color }}
        >
          {formatDelta(change, locale)}
        </span>
      </div>
      <p
        className="mt-auto font-mono text-5xl tracking-[-0.06em] md:text-6xl"
        style={{ color }}
      >
        {value}
      </p>
      <p className="mt-4 max-w-xs text-xs leading-relaxed text-muted-foreground">{description}</p>
    </div>
  )
}

function FlowRow({
  label,
  pre,
  post,
  days,
  locale,
  color,
}: {
  label: string
  pre: number
  post: number
  days: number
  locale: string
  color: string
}) {
  const beforeRate = rate(pre, days)
  const afterRate = rate(post, days)
  const max = Math.max(beforeRate, afterRate, 1)

  return (
    <div className="grid gap-4 border-t border-line py-5 md:grid-cols-[0.7fr_1fr_1fr] md:items-center md:gap-8">
      <p className="text-sm text-foreground">{label}</p>
      {[
        ["pre", beforeRate],
        ["post", afterRate],
      ].map(([key, value]) => (
        <div key={key} className="flex items-center gap-4">
          <span className="h-1.5 flex-1 bg-foreground/8">
            <span
              className={cn("block h-full", key === "pre" && "bg-foreground/35")}
              style={{
                width: `${Math.max(3, (Number(value) / max) * 100)}%`,
                backgroundColor: key === "post" ? color : undefined,
              }}
            />
          </span>
          <span
            className="w-12 text-right font-mono text-sm tabular-nums"
            style={{ color: key === "post" ? color : undefined }}
          >
            {formatNumber(Number(value), locale)}
          </span>
        </div>
      ))}
    </div>
  )
}

function ChangePanel({
  label,
  description,
  pre,
  post,
  days,
  locale,
  color,
  className,
}: {
  label: string
  description: string
  pre: number
  post: number
  days: number
  locale: string
  color: string
  className?: string
}) {
  const preRate = rate(pre, days)
  const postRate = rate(post, days)

  return (
    <div className={cn("relative overflow-hidden p-7 md:p-8", className)}>
      <span className="absolute inset-x-0 top-0 h-1" style={{ backgroundColor: color }} />
      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
        {label}
      </p>
      <div className="mt-8 flex items-end justify-between gap-6">
        <div>
          <p className="font-mono text-4xl tracking-[-0.05em]" style={{ color }}>
            {formatNumber(postRate, locale)}
          </p>
          <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            {formatNumber(preRate, locale)} → {formatNumber(postRate, locale)}
          </p>
        </div>
        <p className="font-mono text-2xl" style={{ color }}>
          {formatDelta(delta(preRate, postRate), locale)}
        </p>
      </div>
      <p className="mt-6 max-w-sm text-xs leading-relaxed text-muted-foreground">{description}</p>
    </div>
  )
}

function topShare(period: OssMetricPeriod) {
  const topTwo = period.closuresByRepo.slice(0, 2).reduce((sum, repo) => sum + repo.count, 0)
  return period.totalClosed === 0 ? 0 : (topTwo / period.totalClosed) * 100
}

export function OssMetricsDashboard({
  metrics,
  locale,
  copy,
}: {
  metrics: OssMetrics
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
  const throughputColor = projectColor("crafter-station/oss-throughput")
  const mergeColor = projectColor("crafter-station/oss-merges")
  const externalColor = projectColor("crafter-station/external-contributions")
  const breadthColor = projectColor("crafter-station/portfolio-breadth")
  const issueOpenedColor = projectColor("crafter-station/issues-opened")
  const issueClosedColor = projectColor("crafter-station/issues-closed")
  const prOpenedColor = projectColor("crafter-station/prs-opened")
  const prClosedColor = projectColor("crafter-station/prs-closed")

  return (
    <>
      <Container innerClassName="overflow-hidden">
        <div className="grid lg:grid-cols-[1.08fr_0.92fr]">
          <div className="flex flex-col lg:border-r lg:border-line">
            <div className="flex-1 px-6 py-16 md:px-10 md:py-24">
              <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-accent">
                {copy.eyebrow}
              </p>
              <h1 className="mt-5 max-w-4xl text-balance text-5xl font-semibold tracking-[-0.055em] md:text-7xl">
                {copy.title}
              </h1>
              <p className="mt-6 max-w-2xl text-balance text-lg leading-8 text-muted-foreground">
                {copy.description}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
                <LocalizedLink
                  href="/oss"
                  locale={locale}
                  className="group focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                >
                  <ArrowLink>{copy.catalogCta}</ArrowLink>
                </LocalizedLink>
                <Link
                  href="https://github.com/crafter-station"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                >
                  <ArrowLink>{copy.githubCta}</ArrowLink>
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-3 border-t border-line">
              {[
                [formatInteger(metrics.repoCount, locale), copy.repos],
                [formatInteger(metrics.openIssues, locale), copy.openIssues],
                [formatInteger(metrics.openPrs, locale), copy.openPrs],
              ].map(([value, label], index) => (
                <div
                  key={label}
                  className={cn("min-h-24 p-4 md:p-5", index > 0 && "border-l border-line")}
                >
                  <p className="font-mono text-lg tracking-tight tabular-nums">{value}</p>
                  <p className="mt-2 text-[10px] leading-tight text-muted-foreground">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <aside className="flex flex-col border-t border-line bg-secondary/15 lg:border-t-0">
            <div className="flex items-center justify-between border-b border-line px-6 py-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                {copy.signalEyebrow}
              </p>
              <span className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
                <span className="size-1.5" style={{ backgroundColor: throughputColor }} />
                {sourceLabel}
              </span>
            </div>
            <div className="flex flex-1 flex-col justify-center px-6 py-12 md:px-10">
              <p
                className="font-mono text-7xl tracking-[-0.08em] md:text-8xl"
                style={{ color: throughputColor }}
              >
                {formatDelta(delta(throughputPre, throughputPost), locale)}
              </p>
              <h2 className="mt-7 max-w-md text-balance text-2xl tracking-tight md:text-3xl">
                {copy.signalTitle}
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
                {copy.signalDescription}
              </p>
              <div className="mt-10 grid grid-cols-2 border border-line">
                {[
                  [copy.before, throughputPre],
                  [copy.after, throughputPost],
                ].map(([label, value], index) => (
                  <div
                    key={String(label)}
                    className={cn("p-4", index > 0 && "border-l border-line")}
                  >
                    <p
                      className="font-mono text-2xl tabular-nums"
                      style={{ color: index > 0 ? throughputColor : undefined }}
                    >
                      {formatNumber(Number(value), locale)}
                    </p>
                    <p className="mt-1 text-[10px] text-muted-foreground">
                      {label} · {copy.daily}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 border-t border-line">
              {[
                [copy.windowValue, copy.window],
                [updated, `${copy.updated} · ${sourceLabel}`],
              ].map(([value, label], index) => (
                <div
                  key={label}
                  className={cn("min-h-24 p-4 md:p-5", index > 0 && "border-l border-line")}
                >
                  <p className="font-mono text-lg tracking-tight tabular-nums">{value}</p>
                  <p className="mt-2 text-[10px] leading-tight text-muted-foreground">{label}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </Container>

      <SectionGap />

      <Container innerClassName="border-b px-6 py-10 md:px-10">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          {copy.metricsEyebrow}
        </p>
        <h2 className="mt-3 text-balance text-3xl tracking-tight md:text-4xl">
          {copy.metricsTitle}
        </h2>
      </Container>
      <Container>
        <div className="grid md:grid-cols-2 xl:grid-cols-4">
          <MetricCell
            label={copy.metrics.throughput}
            description={copy.metrics.throughputDescription}
            value={formatNumber(throughputPost, locale)}
            change={delta(throughputPre, throughputPost)}
            locale={locale}
            color={throughputColor}
          />
          <MetricCell
            label={copy.metrics.merges}
            description={copy.metrics.mergesDescription}
            value={formatNumber(mergesPost, locale)}
            change={delta(mergesPre, mergesPost)}
            locale={locale}
            color={mergeColor}
            className="border-t border-line md:border-l md:border-t-0"
          />
          <MetricCell
            label={copy.metrics.externalClosed}
            description={copy.metrics.externalClosedDescription}
            value={formatNumber(externalPost, locale)}
            change={delta(externalPre, externalPost)}
            locale={locale}
            color={externalColor}
            className="border-t border-line xl:border-l xl:border-t-0"
          />
          <MetricCell
            label={copy.metrics.activeRepos}
            description={copy.metrics.activeReposDescription}
            value={`${metrics.post.activeRepos}/${metrics.repoCount}`}
            change={delta(activePre, activePost)}
            locale={locale}
            color={breadthColor}
            className="border-t border-line md:border-l xl:border-t-0"
          />
        </div>
      </Container>

      <SectionGap />

      <Container innerClassName="grid lg:grid-cols-[0.78fr_1.22fr]">
        <div className="border-b border-line p-8 md:p-10 lg:border-b-0 lg:border-r">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            {copy.flowEyebrow}
          </p>
          <h2 className="mt-4 text-3xl tracking-tight md:text-4xl">{copy.flowTitle}</h2>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
            {copy.flowDescription}
          </p>
          <div className="mt-10 flex gap-6 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground lg:hidden">
            <span>{copy.before}</span>
            <span className="text-accent">{copy.after}</span>
          </div>
        </div>
        <div className="px-8 py-5 md:px-10">
          <div className="hidden grid-cols-[0.7fr_1fr_1fr] gap-8 pb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground md:grid">
            <span />
            <span>{copy.before}</span>
            <span className="text-accent">{copy.after}</span>
          </div>
          <FlowRow
            label={copy.issuesOpened}
            pre={metrics.pre.issuesOpened}
            post={metrics.post.issuesOpened}
            days={metrics.windowDays}
            locale={locale}
            color={issueOpenedColor}
          />
          <FlowRow
            label={copy.issuesClosed}
            pre={metrics.pre.issuesClosed}
            post={metrics.post.issuesClosed}
            days={metrics.windowDays}
            locale={locale}
            color={issueClosedColor}
          />
          <FlowRow
            label={copy.prsOpened}
            pre={metrics.pre.prsOpened}
            post={metrics.post.prsOpened}
            days={metrics.windowDays}
            locale={locale}
            color={prOpenedColor}
          />
          <FlowRow
            label={copy.prsClosed}
            pre={metrics.pre.prsClosed}
            post={metrics.post.prsClosed}
            days={metrics.windowDays}
            locale={locale}
            color={prClosedColor}
          />
        </div>
      </Container>

      <SectionGap />

      <Container innerClassName="border-b px-6 py-10 md:px-10">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          {copy.acquisitionEyebrow}
        </p>
        <h2 className="mt-3 max-w-3xl text-3xl tracking-tight md:text-4xl">
          {copy.acquisitionTitle}
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          {copy.acquisitionDescription}
        </p>
      </Container>
      <Container>
        <div className="grid md:grid-cols-3">
          <ChangePanel
            label={copy.externalOpened}
            description={copy.externalOpenedDescription}
            pre={metrics.pre.externalPrsOpened}
            post={metrics.post.externalPrsOpened}
            days={metrics.windowDays}
            locale={locale}
            color={externalColor}
          />
          <ChangePanel
            label={copy.externalResolved}
            description={copy.externalResolvedDescription}
            pre={metrics.pre.externalPrsClosed}
            post={metrics.post.externalPrsClosed}
            days={metrics.windowDays}
            locale={locale}
            color={mergeColor}
            className="border-t border-line md:border-l md:border-t-0"
          />
          <ChangePanel
            label={copy.backlog}
            description={copy.backlogDescription}
            pre={metrics.pre.netBacklog}
            post={metrics.post.netBacklog}
            days={metrics.windowDays}
            locale={locale}
            color={throughputColor}
            className="border-t border-line md:border-l md:border-t-0"
          />
        </div>
      </Container>

      <SectionGap />

      <Container innerClassName="grid lg:grid-cols-[0.8fr_1.2fr]">
        <div className="border-b border-line p-8 md:p-10 lg:border-b-0 lg:border-r">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            {copy.distributionEyebrow}
          </p>
          <h2 className="mt-4 text-3xl tracking-tight md:text-4xl">{copy.distributionTitle}</h2>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
            {copy.distributionDescription}
          </p>
          <div className="mt-10 border-t border-line pt-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              {copy.concentration}
            </p>
            <p className="font-mono text-5xl tracking-[-0.06em] text-accent">
              {formatNumber(topShare(metrics.post), locale, 0)}%
            </p>
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
              {copy.concentrationDescription}
            </p>
          </div>
        </div>
        <div className="p-8 md:p-10">
          <div className="flex items-center justify-between border-b border-line pb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            <span>{copy.distributionEyebrow}</span>
            <span>{copy.closures}</span>
          </div>
          <div>
            {metrics.post.closuresByRepo.slice(0, 8).map((repo) => (
              <div
                key={repo.repo}
                className="grid grid-cols-[minmax(0,1fr)_minmax(5rem,0.7fr)_2rem] items-center gap-4 border-b border-line py-4"
              >
                <span className="truncate font-mono text-xs">{repo.repo}</span>
                <span className="h-1 bg-foreground/8">
                  <span
                    className="block h-full"
                    style={{
                      width: `${Math.max(4, (repo.count / maxClosures) * 100)}%`,
                      backgroundColor: projectColor(repo.repo),
                    }}
                  />
                </span>
                <span className="text-right font-mono text-xs tabular-nums text-muted-foreground">
                  {repo.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Container>

      <SectionGap />

      <Container innerClassName="grid lg:grid-cols-[0.75fr_1.25fr]">
        <div className="border-b border-line p-8 md:p-10 lg:border-b-0 lg:border-r">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
            {copy.methodologyEyebrow}
          </p>
          <h2 className="mt-4 text-3xl tracking-tight md:text-4xl">{copy.methodologyTitle}</h2>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
            {copy.methodologyDescription}
          </p>
        </div>
        <ol className="grid md:grid-cols-2">
          {copy.methodologyItems.map((item, index) => (
            <li
              key={item}
              className={cn(
                "min-h-40 p-7 md:p-8",
                index % 2 === 1 && "md:border-l md:border-line",
                index > 1 && "border-t border-line",
              )}
            >
              <span className="font-mono text-[10px] tracking-[0.25em] text-accent">
                0{index + 1}
              </span>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{item}</p>
            </li>
          ))}
        </ol>
      </Container>

      <SectionGap />

      <Container>
        <section className="grid border-y border-line lg:grid-cols-[1.2fr_0.8fr]">
          <div className="border-b border-line p-8 md:p-10 lg:border-b-0 lg:border-r">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
              {copy.contributeEyebrow}
            </p>
            <h2 className="mt-4 text-3xl tracking-tight md:text-4xl">{copy.contributeTitle}</h2>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              {copy.contributeDescription}
            </p>
          </div>
          <div className="flex items-center p-8 md:p-10">
            <LocalizedLink
              href="/oss"
              locale={locale}
              className="group inline-flex items-center gap-3 border border-background bg-foreground px-6 py-3 font-medium text-background transition-colors hover:bg-foreground/90 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              {copy.contributeCta}
              <PixelArrow />
            </LocalizedLink>
          </div>
        </section>
      </Container>
    </>
  )
}
