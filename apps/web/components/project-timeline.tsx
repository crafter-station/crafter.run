"use client"

import {
  startTransition,
  useDeferredValue,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type FocusEvent as ReactFocusEvent,
  type PointerEvent as ReactPointerEvent,
} from "react"
import {
  ArrowUpRight,
  CalendarClock,
  GitCommitHorizontal,
  Search,
  Star,
  Users,
  type LucideIcon,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import type {
  ProjectTimelineData,
  TimelineContributor,
  TimelineCoreMember,
  TimelineProject,
} from "@/lib/project-timeline"
import { projectColor } from "@/lib/project-color"
import { cn } from "@/lib/utils"

const RANGE_OPTIONS = [13, 26, 52] as const
const INITIAL_VISIBLE_PROJECTS = 32

type RangeWeeks = (typeof RANGE_OPTIONS)[number]
type ProjectFilter = "active" | "all" | "archived"
type ProjectSort = "activity" | "recent" | "stars"

export type ProjectTimelineCopy = {
  timelineLabel: string
  searchPlaceholder: string
  filterLabel: string
  filters: {
    active: string
    all: string
    archived: string
  }
  sortLabel: string
  sorts: {
    activity: string
    recent: string
    stars: string
  }
  rangeLabel: string
  ranges: {
    threeMonths: string
    sixMonths: string
    oneYear: string
  }
  stats: {
    projects: string
    allCommits: string
    teamCommits: string
    stars: string
    contributors: string
  }
  allContributors: string
  coreTeam: string
  updated: string
  liveData: string
  snapshotData: string
  projectColumn: string
  timelineColumn: string
  today: string
  showMore: string
  noResultsTitle: string
  noResultsDescription: string
  legend: string
  less: string
  more: string
  commits: string
  commit: string
  teamCommit: string
  contributor: string
  noCommits: string
  weekOf: string
  details: string
  openGithub: string
  openWebsite: string
  created: string
  lastPush: string
  stars: string
  forks: string
  issues: string
  license: string
  activity: string
  contributorBreakdown: string
  teamBadge: string
  archivedBadge: string
  incomplete: string
}

type HoveredWeek = {
  projectName: string
  weekIndex: number
  x: number
  y: number
  above: boolean
}

type TimelineStyle = CSSProperties & {
  "--timeline-color"?: string
  "--timeline-height"?: string
  "--timeline-left"?: string
  "--timeline-opacity"?: string
  "--timeline-width"?: string
}

function sum(values: number[]) {
  return values.reduce((total, value) => total + value, 0)
}

function initials(value: string) {
  return value
    .split(/[\s._-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("")
}

function compactNumber(value: number, locale: string) {
  return new Intl.NumberFormat(locale, {
    notation: value >= 1000 ? "compact" : "standard",
    maximumFractionDigits: 1,
  }).format(value)
}

function weekDate(value: string) {
  return new Date(`${value}T00:00:00Z`)
}

function monthDateForWeek(value: string) {
  return new Date(weekDate(value).getTime() + 3 * 24 * 60 * 60 * 1000)
}

function monthKeyForWeek(value: string) {
  const date = monthDateForWeek(value)
  return `${date.getUTCFullYear()}-${date.getUTCMonth()}`
}

function countLabel(count: number, singular: string, plural: string) {
  return `${count} ${count === 1 ? singular : plural}`
}

function formatDate(value: string, locale: string, includeYear = false) {
  return new Intl.DateTimeFormat(locale, {
    month: "short",
    day: "numeric",
    year: includeYear ? "numeric" : undefined,
    timeZone: "UTC",
  }).format(new Date(value.includes("T") ? value : `${value}T00:00:00Z`))
}

function formatWeek(value: string, locale: string) {
  const start = weekDate(value)
  const end = new Date(start.getTime() + 6 * 24 * 60 * 60 * 1000)
  const startLabel = formatDate(value, locale)
  const endLabel = new Intl.DateTimeFormat(locale, {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(end)
  return `${startLabel} - ${endLabel}`
}

function contributorCount(
  contributor: TimelineContributor,
  startIndex: number,
) {
  return sum(contributor.weeks.slice(startIndex))
}

function ContributorAvatar({
  contributor,
  coreMember,
  className,
}: {
  contributor?: TimelineContributor
  coreMember?: TimelineCoreMember
  className?: string
}) {
  const label =
    coreMember?.name ??
    contributor?.coreMember?.name ??
    contributor?.name ??
    contributor?.login ??
    "?"
  const image =
    coreMember?.image ??
    contributor?.coreMember?.image ??
    contributor?.avatarUrl ??
    undefined

  return (
    <Avatar className={cn("size-7 border border-background bg-secondary", className)}>
      {image ? <AvatarImage src={image} alt="" className="object-cover" /> : null}
      <AvatarFallback className="font-mono text-[8px] uppercase">
        {initials(label)}
      </AvatarFallback>
    </Avatar>
  )
}

function ProjectDetailSheet({
  project,
  open,
  selectedWeek,
  selectedLogin,
  startIndex,
  visibleWeeks,
  locale,
  copy,
  onOpenChange,
}: {
  project: TimelineProject | null
  open: boolean
  selectedWeek: number | null
  selectedLogin: string | null
  startIndex: number
  visibleWeeks: string[]
  locale: string
  copy: ProjectTimelineCopy
  onOpenChange: (open: boolean) => void
}) {
  if (!project) return null

  const selectedContributor = selectedLogin
    ? project.contributors.find(
        (contributor) =>
          contributor.login.toLowerCase() === selectedLogin.toLowerCase(),
      )
    : null
  const activity = (selectedContributor?.weeks ?? project.weeks).slice(startIndex)
  const maxActivity = Math.max(1, ...activity)
  const contributors = project.contributors
    .map((contributor) => ({
      contributor,
      count: contributorCount(contributor, startIndex),
    }))
    .filter((item) => item.count > 0)
    .sort((a, b) => b.count - a.count)
  const selectedWeekContributors =
    selectedWeek === null
      ? []
      : project.contributors
          .map((contributor) => ({
            contributor,
            count: contributor.weeks[selectedWeek] ?? 0,
          }))
          .filter((item) => item.count > 0)
          .sort((a, b) => b.count - a.count)
  const selectedWeekCount =
    selectedWeek === null ? 0 : (project.weeks[selectedWeek] ?? 0)
  const selectedWeekTeamCommits = selectedWeekContributors
    .filter((item) => item.contributor.coreMember)
    .reduce((total, item) => total + item.count, 0)
  const visibleTotal = sum(project.weeks.slice(startIndex))
  const visibleTeamTotal = project.contributors
    .filter((contributor) => contributor.coreMember)
    .reduce(
      (total, contributor) =>
        total + contributorCount(contributor, startIndex),
      0,
    )
  const displayedTotal = selectedContributor ? sum(activity) : visibleTotal
  const displayedTeamTotal = selectedContributor
    ? selectedContributor.coreMember
      ? displayedTotal
      : 0
    : visibleTeamTotal
  const color = projectColor(project.fullName)

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="project-detail-sheet w-full overflow-y-auto p-0 data-[state=closed]:duration-150 data-[state=open]:duration-200 sm:max-w-lg"
      >
        <SheetHeader className="border-b border-line px-6 pb-6 pt-10 text-left sm:px-8">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="timeline-color size-2 rounded-full"
              style={{ "--timeline-color": color } as TimelineStyle}
              aria-hidden
            />
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
              {project.fullName}
            </p>
            <Badge variant="outline" className="gap-1 font-mono font-normal">
              <Star aria-hidden className="size-3" />
              {compactNumber(project.stars, locale)}
              <span className="sr-only">{copy.stars}</span>
            </Badge>
            {project.archived ? (
              <Badge variant="secondary">{copy.archivedBadge}</Badge>
            ) : null}
            {!project.complete ? (
              <Badge variant="outline">{copy.incomplete}</Badge>
            ) : null}
          </div>
          <SheetTitle className="pt-2 text-3xl tracking-[-0.04em]">
            {project.name}
          </SheetTitle>
          <SheetDescription className="max-w-md pt-1 leading-relaxed">
            {project.description ?? project.fullName}
          </SheetDescription>
        </SheetHeader>

        {selectedWeek !== null ? (
          <section className="border-b border-line bg-secondary/30 px-6 py-5 sm:px-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-muted-foreground">
                  {copy.weekOf}
                </p>
                <p className="mt-1 text-sm font-medium">
                  {formatWeek(visibleWeeks[selectedWeek - startIndex], locale)}
                </p>
              </div>
              <div className="text-right">
                <p className="font-mono text-lg font-medium">
                  {compactNumber(selectedWeekCount, locale)}
                </p>
                <p className="text-xs text-muted-foreground">
                  {selectedWeekCount === 1 ? copy.commit : copy.commits}
                </p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-line pt-3 text-xs text-muted-foreground">
              <span>
                {countLabel(
                  selectedWeekContributors.length,
                  copy.contributor,
                  copy.stats.contributors.toLowerCase(),
                )}
              </span>
              <span>
                {countLabel(
                  selectedWeekTeamCommits,
                  copy.teamCommit,
                  copy.stats.teamCommits.toLowerCase(),
                )}
              </span>
            </div>
            {selectedWeekContributors.length ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {selectedWeekContributors.slice(0, 6).map(({ contributor, count }) => (
                  <div
                    key={contributor.login}
                    className="flex items-center gap-2 rounded-full border border-line bg-background py-1 pl-1 pr-2.5 text-xs"
                  >
                    <ContributorAvatar contributor={contributor} className="size-5" />
                    <span className="max-w-28 truncate">{contributor.name}</span>
                    <span className="font-mono text-[9px] text-muted-foreground">{count}</span>
                  </div>
                ))}
              </div>
            ) : null}
          </section>
        ) : null}

        <div className="flex flex-col gap-8 px-6 py-8 sm:px-8">
          <section aria-label={copy.details}>
            <div className="grid grid-cols-2 border border-line">
              {[
                [copy.stats.allCommits, compactNumber(displayedTotal, locale)],
                [copy.stats.teamCommits, compactNumber(displayedTeamTotal, locale)],
                [copy.stats.contributors, compactNumber(contributors.length, locale)],
                [copy.stats.stars, compactNumber(project.stars, locale)],
              ].map(([label, value], index) => (
                <div
                  key={label}
                  className={cn(
                    "p-4",
                    index % 2 === 1 && "border-l border-line",
                    index >= 2 && "border-t border-line",
                  )}
                >
                  <p className="font-mono text-xl tracking-tight">{value}</p>
                  <p className="mt-1 text-[11px] text-muted-foreground">{label}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className="mb-4 flex items-center justify-between gap-4">
              <h3 className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                {copy.activity}
              </h3>
              <span className="font-mono text-[9px] text-muted-foreground">
                {visibleWeeks.length}w
              </span>
            </div>
            <div className="flex h-20 items-end gap-px border-b border-line" aria-hidden>
              {activity.map((count, index) => (
                <span
                  key={visibleWeeks[index]}
                  className="timeline-data-bar min-w-px flex-1 rounded-t-[2px]"
                  style={{
                    "--timeline-color": color,
                    "--timeline-height": count
                      ? `${Math.max(8, (count / maxActivity) * 100)}%`
                      : "2px",
                    "--timeline-opacity": count ? "0.85" : "0.12",
                  } as TimelineStyle}
                />
              ))}
            </div>
          </section>

          <section>
            <h3 className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
              {copy.contributorBreakdown}
            </h3>
            <div className="mt-4 divide-y divide-line border-y border-line">
              {contributors.length ? (
                contributors.map(({ contributor, count }) => (
                  <div
                    key={contributor.login}
                    className="flex w-full items-center gap-3 py-3 text-left"
                  >
                    <ContributorAvatar contributor={contributor} className="size-8" />
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-2">
                        <span className="truncate text-sm font-medium">
                          {contributor.coreMember?.name ?? contributor.name}
                        </span>
                        {contributor.coreMember ? (
                          <Badge variant="secondary" className="px-1.5 py-0 font-mono text-[8px] uppercase">
                            {copy.teamBadge}
                          </Badge>
                        ) : null}
                      </span>
                      <span className="mt-0.5 block truncate font-mono text-[10px] text-muted-foreground">
                        @{contributor.login}
                      </span>
                    </span>
                    <span className="font-mono text-xs text-muted-foreground">
                      {compactNumber(count, locale)}
                    </span>
                  </div>
                ))
              ) : (
                <p className="py-5 text-sm text-muted-foreground">{copy.noCommits}</p>
              )}
            </div>
          </section>

          <section className="grid gap-2 text-xs text-muted-foreground">
            <div className="flex items-center justify-between gap-4 border-b border-line py-2">
              <span>{copy.created}</span>
              <span className="font-mono text-foreground">
                {formatDate(project.createdAt, locale, true)}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4 border-b border-line py-2">
              <span>{copy.lastPush}</span>
              <span className="font-mono text-foreground">
                {formatDate(project.pushedAt, locale, true)}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4 border-b border-line py-2">
              <span>{copy.forks}</span>
              <span className="font-mono text-foreground">{project.forks}</span>
            </div>
            <div className="flex items-center justify-between gap-4 border-b border-line py-2">
              <span>{copy.issues}</span>
              <span className="font-mono text-foreground">{project.openIssues}</span>
            </div>
            {project.license ? (
              <div className="flex items-center justify-between gap-4 border-b border-line py-2">
                <span>{copy.license}</span>
                <span className="font-mono text-foreground">{project.license}</span>
              </div>
            ) : null}
          </section>

          {project.topics.length ? (
            <div className="flex flex-wrap gap-2">
              {project.topics.map((topic) => (
                <Badge key={topic} variant="outline" className="font-normal">
                  {topic}
                </Badge>
              ))}
            </div>
          ) : null}

          <div className="flex flex-wrap gap-2">
            <Button asChild className="transition-transform duration-150 active:scale-[0.97]">
              <a href={project.url} target="_blank" rel="noopener noreferrer">
                {copy.openGithub}
                <ArrowUpRight data-icon="inline-end" />
              </a>
            </Button>
            {project.homepageUrl ? (
              <Button
                asChild
                variant="outline"
                className="transition-transform duration-150 active:scale-[0.97]"
              >
                <a
                  href={project.homepageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {copy.openWebsite}
                  <ArrowUpRight data-icon="inline-end" />
                </a>
              </Button>
            ) : null}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export function ProjectTimeline({
  data,
  locale,
  copy,
}: {
  data: ProjectTimelineData
  locale: string
  copy: ProjectTimelineCopy
}) {
  const [range, setRange] = useState<RangeWeeks>(13)
  const [filter, setFilter] = useState<ProjectFilter>("active")
  const [sort, setSort] = useState<ProjectSort>("recent")
  const [query, setQuery] = useState("")
  const deferredQuery = useDeferredValue(query)
  const [selectedLogin, setSelectedLogin] = useState<string | null>(null)
  const [selectedProjectName, setSelectedProjectName] = useState<string | null>(null)
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null)
  const [hoveredWeek, setHoveredWeek] = useState<HoveredWeek | null>(null)
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_PROJECTS)
  const scrollRef = useRef<HTMLDivElement>(null)
  const scrollFrameRef = useRef<number | null>(null)

  const startIndex = Math.max(0, data.weeks.length - range)
  const visibleWeeks = data.weeks.slice(startIndex)

  const rows = data.projects
    .map((project) => {
      const selectedContributor = selectedLogin
        ? project.contributors.find(
            (contributor) =>
              contributor.login.toLowerCase() === selectedLogin.toLowerCase(),
          )
        : null
      const teamActivity = Array<number>(visibleWeeks.length).fill(0)

      for (const contributor of project.contributors) {
        if (!contributor.coreMember) continue
        for (let index = 0; index < visibleWeeks.length; index += 1) {
          teamActivity[index] += contributor.weeks[startIndex + index] ?? 0
        }
      }

      const activity = selectedLogin
        ? selectedContributor?.weeks.slice(startIndex) ??
          Array<number>(visibleWeeks.length).fill(0)
        : teamActivity

      const contributors = project.contributors
        .map((contributor) => ({
          contributor,
          count: contributorCount(contributor, startIndex),
        }))
        .filter((item) => item.count > 0)
        .sort((a, b) => b.count - a.count)

      return {
        project,
        activity,
        total: sum(activity),
        contributors,
      }
    })
    .filter((row) => {
      if (filter === "active" && (row.total === 0 || row.project.archived)) {
        return false
      }
      if (filter === "all" && row.project.archived) return false
      if (filter === "archived" && !row.project.archived) return false

      const normalizedQuery = deferredQuery.trim().toLowerCase()
      if (!normalizedQuery) return true
      return [
        row.project.name,
        row.project.fullName,
        row.project.description,
        row.project.language,
        ...row.project.topics,
      ]
        .filter(Boolean)
        .some((value) => value?.toLowerCase().includes(normalizedQuery))
    })

  rows.sort((a, b) => {
    if (sort === "recent") {
      return b.project.pushedAt.localeCompare(a.project.pushedAt)
    }
    if (sort === "stars") {
      return b.project.stars - a.project.stars || b.total - a.total
    }
    return b.total - a.total || b.project.pushedAt.localeCompare(a.project.pushedAt)
  })

  const visibleRows = rows.slice(0, visibleCount)
  const totalTeamCommits = rows.reduce((total, row) => total + row.total, 0)
  const totalStars = rows.reduce((total, row) => total + row.project.stars, 0)

  const coreMembers = data.coreMembers
    .map((member) => {
      const contributions = data.projects.reduce((total, project) => {
        const contributor = project.contributors.find(
          (item) => item.login.toLowerCase() === member.login.toLowerCase(),
        )
        return total + (contributor ? contributorCount(contributor, startIndex) : 0)
      }, 0)
      return { member, contributions }
    })
    .sort((a, b) => b.contributions - a.contributions)

  const selectedProject = selectedProjectName
    ? data.projects.find((project) => project.fullName === selectedProjectName) ?? null
    : null

  const monthGroups: { key: string; label: string; start: number; span: number }[] = []
  for (let index = 0; index < visibleWeeks.length; index += 1) {
    const middleOfWeek = monthDateForWeek(visibleWeeks[index])
    const key = monthKeyForWeek(visibleWeeks[index])
    const current = monthGroups[monthGroups.length - 1]
    if (current?.key === key) {
      current.span += 1
    } else {
      monthGroups.push({
        key,
        label: new Intl.DateTimeFormat(locale, {
          month: "short",
          year: middleOfWeek.getUTCMonth() === 0 ? "2-digit" : undefined,
          timeZone: "UTC",
        }).format(middleOfWeek),
        start: index,
        span: 1,
      })
    }
  }

  const hoveredProject = hoveredWeek
    ? data.projects.find((project) => project.fullName === hoveredWeek.projectName) ?? null
    : null
  const hoveredContributors =
    hoveredWeek && hoveredProject
      ? hoveredProject.contributors
          .filter((contributor) =>
            selectedLogin
              ? contributor.login.toLowerCase() === selectedLogin.toLowerCase()
              : Boolean(contributor.coreMember),
          )
          .map((contributor) => ({
            contributor,
            count: contributor.weeks[hoveredWeek.weekIndex] ?? 0,
          }))
          .filter((item) => item.count > 0)
          .sort((a, b) => b.count - a.count)
      : []
  const hoveredTotal =
    hoveredWeek && hoveredProject
      ? hoveredContributors.reduce((total, item) => total + item.count, 0)
      : 0

  const timelineMinWidth = range === 52 ? 65 : range === 26 ? 44 : 42
  const timelineGridStyle = {
    gridTemplateColumns: `repeat(${visibleWeeks.length}, minmax(0, 1fr))`,
  } satisfies CSSProperties
  const summaryStats: {
    label: string
    value: number
    Icon: LucideIcon
  }[] = [
    { label: copy.stats.projects, value: rows.length, Icon: CalendarClock },
    { label: copy.stats.teamCommits, value: totalTeamCommits, Icon: GitCommitHorizontal },
    { label: copy.stats.stars, value: totalStars, Icon: Star },
  ]

  useEffect(() => {
    const node = scrollRef.current
    if (!node) return
    node.scrollLeft = node.scrollWidth
    syncTimelineLabels(node)
  }, [range])

  useEffect(() => {
    const node = scrollRef.current
    if (node) syncTimelineLabels(node)
  }, [deferredQuery, filter, selectedLogin, sort, visibleCount])

  useEffect(
    () => () => {
      if (scrollFrameRef.current !== null) {
        cancelAnimationFrame(scrollFrameRef.current)
      }
    },
    [],
  )

  function syncTimelineLabels(node: HTMLDivElement) {
    const transform = `translate3d(${node.scrollLeft}px, 0, 0)`
    for (const label of node.querySelectorAll<HTMLElement>(
      "[data-timeline-sticky]",
    )) {
      label.style.transform = transform
    }
  }

  function handleTimelineScroll() {
    const node = scrollRef.current
    if (!node || scrollFrameRef.current !== null) return
    scrollFrameRef.current = requestAnimationFrame(() => {
      syncTimelineLabels(node)
      scrollFrameRef.current = null
    })
  }

  function updateRange(value: string) {
    if (!value) return
    startTransition(() => {
      setRange(Number(value) as RangeWeeks)
      setVisibleCount(INITIAL_VISIBLE_PROJECTS)
    })
  }

  function updateFilter(value: string) {
    if (!value) return
    startTransition(() => {
      setFilter(value as ProjectFilter)
      setVisibleCount(INITIAL_VISIBLE_PROJECTS)
    })
  }

  function selectContributor(login: string | null) {
    startTransition(() => {
      setSelectedLogin(login)
      setFilter("active")
      setVisibleCount(INITIAL_VISIBLE_PROJECTS)
      setSelectedProjectName(null)
      setSelectedWeek(null)
    })
  }

  function inspectProject(projectName: string, weekIndex: number | null = null) {
    setHoveredWeek(null)
    setSelectedProjectName(projectName)
    setSelectedWeek(weekIndex)
  }

  function showWeekTooltip(
    event:
      | ReactPointerEvent<HTMLButtonElement>
      | ReactFocusEvent<HTMLButtonElement>,
    projectName: string,
    weekIndex: number,
  ) {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = Math.min(
      Math.max(rect.left + rect.width / 2, 152),
      window.innerWidth - 152,
    )
    const above = rect.top > 210
    setHoveredWeek({
      projectName,
      weekIndex,
      x,
      y: above ? rect.top - 8 : rect.bottom + 8,
      above,
    })
  }

  function jumpToToday() {
    const node = scrollRef.current
    if (!node) return
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    node.scrollTo({
      left: node.scrollWidth,
      behavior: reduceMotion ? "auto" : "smooth",
    })
  }

  return (
    <div aria-label={copy.timelineLabel}>
      <section className="border-b border-line px-4 py-5 sm:px-6 md:px-10">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.28em] text-muted-foreground">
              {copy.coreTeam}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {copy.allContributors}
            </p>
          </div>
          <div className="hidden items-center gap-2 font-mono text-[9px] text-muted-foreground md:flex">
            <span className="size-1.5 rounded-full bg-foreground/60" aria-hidden />
            {data.source === "live" ? copy.liveData : copy.snapshotData}
            <span aria-hidden>/</span>
            {copy.updated} {formatDate(data.generatedAt, locale, true)}
          </div>
        </div>

        <div
          className="timeline-scroll -mx-4 mt-4 flex items-center gap-2 overflow-x-auto px-4 pb-1 sm:-mx-6 sm:px-6 md:-mx-10 md:px-10"
          role="group"
          aria-label={copy.coreTeam}
        >
          <button
            type="button"
            aria-pressed={selectedLogin === null}
            onClick={() => selectContributor(null)}
            className={cn(
              "flex h-10 shrink-0 items-center gap-2 rounded-full border px-3 text-xs transition-[transform,background-color,border-color,color] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97]",
              selectedLogin === null
                ? "border-foreground bg-foreground text-background"
                : "border-line bg-background text-muted-foreground hover:text-foreground",
            )}
          >
            <Users aria-hidden className="size-3.5" />
            {copy.filters.all}
          </button>

          {coreMembers.map(({ member, contributions }) => {
            const selected =
              selectedLogin?.toLowerCase() === member.login.toLowerCase()
            return (
              <button
                key={member.login}
                type="button"
                aria-pressed={selected}
                onClick={() => selectContributor(selected ? null : member.login)}
                className={cn(
                  "flex h-10 shrink-0 items-center gap-2 rounded-full border py-1 pl-1 pr-3 text-left transition-[transform,background-color,border-color,color] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97]",
                  selected
                    ? "border-foreground bg-foreground text-background"
                    : "border-line bg-background text-muted-foreground hover:border-foreground/40 hover:text-foreground",
                )}
              >
                <ContributorAvatar coreMember={member} className="size-8" />
                <span className="max-w-24 truncate text-xs">{member.name.split(" ")[0]}</span>
                <span
                  className={cn(
                    "font-mono text-[9px]",
                    selected ? "text-background/60" : "text-muted-foreground",
                  )}
                  title={countLabel(contributions, copy.commit, copy.commits)}
                >
                  {compactNumber(contributions, locale)}
                </span>
              </button>
            )
          })}
        </div>
      </section>

      <section className="grid grid-cols-3 border-b border-line">
        {summaryStats.map(({ label, value, Icon }, index) => (
          <div
            key={label}
            className={cn(
              "min-w-0 p-3 sm:p-5",
              index > 0 && "border-l border-line",
            )}
          >
            <div className="flex items-center justify-between gap-3">
              <p className="font-mono text-2xl tracking-[-0.04em] sm:text-3xl">
                {compactNumber(value, locale)}
              </p>
              <Icon aria-hidden className="size-4 text-muted-foreground" />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">{label}</p>
          </div>
        ))}
      </section>

      <section className="sticky top-[5.05rem] z-30 border-b border-line bg-background/95 px-4 py-3 backdrop-blur-md sm:px-6 md:px-10">
        <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex min-w-0 flex-1 flex-col gap-2 sm:flex-row sm:items-center">
            <label className="relative block min-w-0 flex-1 sm:max-w-xs">
              <span className="sr-only">{copy.searchPlaceholder}</span>
              <Search
                aria-hidden
                className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground"
              />
              <Input
                type="search"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value)
                  setVisibleCount(INITIAL_VISIBLE_PROJECTS)
                }}
                placeholder={copy.searchPlaceholder}
                className="h-9 pl-9 text-xs"
              />
            </label>

            <div className="timeline-scroll overflow-x-auto">
              <ToggleGroup
                type="single"
                value={filter}
                onValueChange={updateFilter}
                variant="outline"
                size="sm"
                aria-label={copy.filterLabel}
                className="w-max justify-start"
              >
                <ToggleGroupItem value="active">{copy.filters.active}</ToggleGroupItem>
                <ToggleGroupItem value="all">{copy.filters.all}</ToggleGroupItem>
                <ToggleGroupItem value="archived">{copy.filters.archived}</ToggleGroupItem>
              </ToggleGroup>
            </div>
          </div>

          <div className="flex items-center justify-between gap-2 sm:justify-start">
            <Select
              value={sort}
              onValueChange={(value) => {
                startTransition(() => {
                  setSort(value as ProjectSort)
                  setVisibleCount(INITIAL_VISIBLE_PROJECTS)
                })
              }}
            >
              <SelectTrigger className="h-9 w-36 text-xs" aria-label={copy.sortLabel}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent align="end">
                <SelectGroup>
                  <SelectItem value="activity">{copy.sorts.activity}</SelectItem>
                  <SelectItem value="recent">{copy.sorts.recent}</SelectItem>
                  <SelectItem value="stars">{copy.sorts.stars}</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <ToggleGroup
              type="single"
              value={String(range)}
              onValueChange={updateRange}
              variant="outline"
              size="sm"
              aria-label={copy.rangeLabel}
            >
              <ToggleGroupItem value="13">{copy.ranges.threeMonths}</ToggleGroupItem>
              <ToggleGroupItem value="26">{copy.ranges.sixMonths}</ToggleGroupItem>
              <ToggleGroupItem value="52">{copy.ranges.oneYear}</ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>
      </section>

      <div
        ref={scrollRef}
        onScroll={handleTimelineScroll}
        className="timeline-scroll relative overflow-x-auto overscroll-x-contain"
      >
        <div
          className="grid min-w-full"
          style={{
            gridTemplateColumns: `clamp(11.5rem, 23vw, 17rem) minmax(${timelineMinWidth}rem, 1fr)`,
          }}
          role="table"
          aria-label={copy.timelineLabel}
        >
          <div
            data-timeline-sticky
            className="z-20 flex h-12 will-change-transform items-center justify-between gap-3 border-b border-r border-line bg-background px-4 sm:px-5"
            role="columnheader"
          >
            <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground">
              {copy.projectColumn}
            </span>
            <button
              type="button"
              onClick={jumpToToday}
              className="font-mono text-[9px] text-muted-foreground transition-[transform,color] duration-150 hover:text-foreground active:scale-[0.94]"
            >
              {copy.today}
            </button>
          </div>

          <div
            className="relative h-12 border-b border-line"
            role="columnheader"
            aria-label={copy.timelineColumn}
          >
            <div
              className="grid h-full"
              style={timelineGridStyle}
            >
              {monthGroups.map((group) => (
                <div
                  key={group.key}
                  className="flex items-center border-l border-line px-2 first:border-l-0"
                  style={{ gridColumn: `${group.start + 1} / span ${group.span}` }}
                >
                  <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">
                    {group.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {visibleRows.length ? (
            visibleRows.flatMap((row) => {
              const color = projectColor(row.project.fullName)
              const activeIndexes = row.activity.flatMap((count, index) =>
                count > 0 ? [index] : [],
              )
              const first = activeIndexes[0] ?? -1
              const last = activeIndexes[activeIndexes.length - 1] ?? -1

              const maxActivity = Math.max(1, ...row.activity)
              const topContributors = row.contributors
                .filter((item) => item.contributor.coreMember)
                .slice(0, 3)

              return [
                <div
                  key={`${row.project.fullName}-label`}
                  data-timeline-sticky
                  className="timeline-project-row group/row z-20 grid min-h-19 will-change-transform grid-cols-[minmax(0,1fr)_auto] items-center gap-2 border-b border-r border-line bg-background px-4 transition-colors sm:px-5"
                  role="rowheader"
                >
                  <button
                    type="button"
                    onClick={() => inspectProject(row.project.fullName)}
                    className="min-w-0 text-left transition-transform duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.98]"
                  >
                    <span className="flex min-w-0 items-center gap-2">
                      <span
                        className="timeline-color size-1.5 shrink-0 rounded-full"
                        style={{ "--timeline-color": color } as TimelineStyle}
                        aria-hidden
                      />
                      <span className="truncate text-sm font-medium tracking-tight">
                        {row.project.name}
                      </span>
                      <span
                        className="flex shrink-0 items-center gap-1 font-mono text-[9px] text-muted-foreground"
                        title={`${compactNumber(row.project.stars, locale)} ${copy.stars.toLowerCase()}`}
                      >
                        <Star aria-hidden className="size-3" />
                        {compactNumber(row.project.stars, locale)}
                        <span className="sr-only">{copy.stars}</span>
                      </span>
                      {row.project.archived ? (
                        <span className="font-mono text-[8px] uppercase text-muted-foreground">
                          {copy.archivedBadge}
                        </span>
                      ) : null}
                    </span>
                    <span className="mt-1.5 flex items-center gap-2 pl-3.5">
                      <span className="min-w-0 flex-1 truncate font-mono text-[9px] text-muted-foreground">
                        {row.project.owner}
                      </span>
                      <span className="shrink-0 whitespace-nowrap font-mono text-[9px] text-muted-foreground/70">
                        {countLabel(row.total, copy.commit, copy.commits)}
                      </span>
                    </span>
                    <span className="mt-1.5 flex h-5 items-center pl-3.5">
                      {topContributors.length ? (
                        <span className="flex -space-x-1.5">
                          {topContributors.map(({ contributor }) => (
                            <ContributorAvatar
                              key={contributor.login}
                              contributor={contributor}
                              className="size-5"
                            />
                          ))}
                        </span>
                      ) : (
                        <span className="font-mono text-[8px] uppercase tracking-wider text-muted-foreground/50">
                          {copy.noCommits}
                        </span>
                      )}
                    </span>
                  </button>
                  <a
                    href={row.project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${copy.openGithub}: ${row.project.name}`}
                    className="rounded-sm p-1.5 text-muted-foreground transition-[transform,color] duration-150 hover:text-foreground active:scale-[0.92] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <ArrowUpRight aria-hidden className="size-3.5" />
                  </a>
                </div>,

                <div
                  key={`${row.project.fullName}-timeline`}
                  className="timeline-project-row group/row relative min-h-19 border-b border-line"
                  role="cell"
                >
                  <div
                    className="pointer-events-none absolute inset-0 grid"
                    style={timelineGridStyle}
                    aria-hidden
                  >
                    {visibleWeeks.map((week, index) => {
                      const startsMonth =
                        index === 0 ||
                        monthKeyForWeek(week) !==
                          monthKeyForWeek(visibleWeeks[index - 1])
                      return (
                        <span
                          key={week}
                          className={cn(
                            startsMonth && index > 0 && "border-l border-line",
                            index === visibleWeeks.length - 1 && "border-r border-accent-surface/30",
                          )}
                        />
                      )
                    })}
                  </div>

                  {first >= 0 && last >= first ? (
                    <span
                      className="timeline-project-span pointer-events-none absolute top-1/2 h-7 -translate-y-1/2 rounded-md opacity-[0.12] transition-opacity duration-150 group-hover/row:opacity-[0.18]"
                      style={{
                        "--timeline-color": color,
                        "--timeline-left": `${((first / visibleWeeks.length) * 100).toFixed(4)}%`,
                        "--timeline-width": `${(((last - first + 1) / visibleWeeks.length) * 100).toFixed(4)}%`,
                      } as TimelineStyle}
                      aria-hidden
                    />
                  ) : null}

                  <div
                    className="relative z-10 grid min-h-19 items-center"
                    style={timelineGridStyle}
                  >
                    {visibleWeeks.map((week, index) => {
                      const count = row.activity[index] ?? 0
                      const inSpan = first >= 0 && index >= first && index <= last
                      const intensity = count
                        ? 0.28 +
                          (Math.log(count + 1) / Math.log(maxActivity + 1)) * 0.72
                        : 0
                      const globalWeekIndex = startIndex + index

                      if (count === 0) {
                        return <span key={week} className="h-8" aria-hidden />
                      }

                      return (
                        <button
                          key={week}
                          type="button"
                          onPointerEnter={(event) =>
                            showWeekTooltip(
                              event,
                              row.project.fullName,
                              globalWeekIndex,
                            )
                          }
                          onPointerLeave={() => setHoveredWeek(null)}
                          onFocus={(event) =>
                            showWeekTooltip(
                              event,
                              row.project.fullName,
                              globalWeekIndex,
                            )
                          }
                          onBlur={() => setHoveredWeek(null)}
                          onClick={() =>
                            inspectProject(row.project.fullName, globalWeekIndex)
                          }
                          className={cn(
                            "group/week relative h-8 focus-visible:z-20 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-1 focus-visible:ring-offset-background",
                            inSpan && "cursor-pointer",
                          )}
                          aria-label={`${row.project.name}, ${copy.weekOf} ${formatWeek(week, locale)}, ${countLabel(count, copy.teamCommit, copy.stats.teamCommits.toLowerCase())}`}
                        >
                          {count > 0 ? (
                            <span
                              className={cn(
                                "timeline-activity-segment absolute inset-y-1 inset-x-px transition-[opacity,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] group-active/week:scale-[0.94]",
                                index === first && "rounded-l-[4px]",
                                index === last && "rounded-r-[4px]",
                              )}
                              style={{
                                "--timeline-color": color,
                                "--timeline-opacity": intensity.toFixed(4),
                              } as TimelineStyle}
                              aria-hidden
                            />
                          ) : null}
                        </button>
                      )
                    })}
                  </div>
                </div>,
              ]
            })
          ) : (
            <div className="col-span-2 flex min-h-72 flex-col items-center justify-center border-b border-line px-6 text-center">
              <p className="text-lg font-medium">{copy.noResultsTitle}</p>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
                {copy.noResultsDescription}
              </p>
            </div>
          )}
        </div>
      </div>

      {visibleCount < rows.length ? (
        <div className="flex justify-center border-b border-line p-5">
          <Button
            type="button"
            variant="outline"
            onClick={() =>
              startTransition(() =>
                setVisibleCount((count) => count + INITIAL_VISIBLE_PROJECTS),
              )
            }
            className="transition-transform duration-150 active:scale-[0.97]"
          >
            {copy.showMore} {Math.min(INITIAL_VISIBLE_PROJECTS, rows.length - visibleCount)}
          </Button>
        </div>
      ) : null}

      <section className="flex flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6 md:px-10">
        <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
          <span className="font-mono uppercase tracking-[0.2em]">{copy.legend}</span>
          <span>{copy.less}</span>
          {[0.18, 0.38, 0.62, 0.9].map((opacity) => (
            <span
              key={opacity}
              className="size-3 rounded-[2px] bg-foreground"
              style={{ opacity }}
              aria-hidden
            />
          ))}
          <span>{copy.more}</span>
        </div>
        <p className="font-mono text-[9px] text-muted-foreground md:hidden">
          {data.source === "live" ? copy.liveData : copy.snapshotData} / {copy.updated}{" "}
          {formatDate(data.generatedAt, locale, true)}
        </p>
      </section>

      {hoveredWeek && hoveredProject ? (
        <div
          className="pointer-events-none fixed z-70 w-72"
          style={{
            left: hoveredWeek.x,
            top: hoveredWeek.y,
            transform: hoveredWeek.above
              ? "translate(-50%, -100%)"
              : "translate(-50%, 0)",
          }}
          aria-hidden
        >
          <div className="timeline-tooltip rounded-lg border border-line bg-popover p-3 text-popover-foreground shadow-2xl shadow-black/30">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-xs font-medium">{hoveredProject.fullName}</p>
                <p className="mt-1 font-mono text-[9px] text-muted-foreground">
                  {formatWeek(data.weeks[hoveredWeek.weekIndex], locale)}
                </p>
              </div>
              <div className="shrink-0 text-right">
                <p className="font-mono text-sm">{hoveredTotal || "0"}</p>
                <p className="mt-0.5 text-[9px] text-muted-foreground">
                  {hoveredTotal === 1
                    ? copy.teamCommit
                    : copy.stats.teamCommits.toLowerCase()}
                </p>
              </div>
            </div>
            {hoveredContributors.length ? (
              <div className="mt-3 flex items-center gap-1.5 border-t border-line pt-2">
                <div className="flex -space-x-1.5">
                  {hoveredContributors.slice(0, 4).map(({ contributor }) => (
                    <ContributorAvatar
                      key={contributor.login}
                      contributor={contributor}
                      className="size-6"
                    />
                  ))}
                </div>
                <p className="min-w-0 truncate text-[10px] text-muted-foreground">
                  {hoveredContributors
                    .slice(0, 2)
                    .map(({ contributor }) => contributor.coreMember?.name ?? contributor.name)
                    .join(", ")}
                  {hoveredContributors.length > 2
                    ? ` +${hoveredContributors.length - 2}`
                    : ""}
                </p>
              </div>
            ) : (
              <p className="mt-2 text-[10px] text-muted-foreground">{copy.noCommits}</p>
            )}
          </div>
        </div>
      ) : null}

      <ProjectDetailSheet
        project={selectedProject}
        open={selectedProject !== null}
        selectedWeek={selectedWeek}
        selectedLogin={selectedLogin}
        startIndex={startIndex}
        visibleWeeks={visibleWeeks}
        locale={locale}
        copy={copy}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedProjectName(null)
            setSelectedWeek(null)
          }
        }}
      />
    </div>
  )
}
