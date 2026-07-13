import type { DayActivity } from "@/lib/github"
import { projectColor, repoLabel } from "@/lib/project-color"

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
const pad = (n: number) => String(n).padStart(2, "0")

function RepoLink({ name, dotClass }: { name: string; dotClass: string }) {
  return (
    <a
      href={`https://github.com/${name}`}
      target="_blank"
      rel="noopener noreferrer"
      title={repoLabel(name)}
      className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground"
    >
      <span className={`${dotClass} shrink-0 rounded-full`} style={{ backgroundColor: projectColor(name) }} />
      <span className="truncate">{repoLabel(name)}</span>
    </a>
  )
}

function MonthGrid({
  year,
  month,
  byDate,
}: {
  year: number
  month: number
  byDate: Map<string, DayActivity["repos"]>
}) {
  const monthName = new Date(year, month, 1).toLocaleString("en-US", { month: "long" })
  const startOffset = (new Date(year, month, 1).getDay() + 6) % 7 // Monday-first
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const cells: (number | null)[] = [
    ...Array(startOffset).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]
  const dateStr = (day: number) => `${year}-${pad(month + 1)}-${pad(day)}`

  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60">
        {monthName} {year}
      </p>
      <div className="mt-4 grid grid-cols-7 gap-1.5">
        {WEEKDAYS.map((w) => (
          <div key={w} className="pb-1 text-left font-mono text-[9px] uppercase tracking-[0.15em] text-muted-foreground/50">
            {w}
          </div>
        ))}
        {cells.map((day, i) => {
          if (day === null) return <div key={`empty-${i}`} aria-hidden />
          const date = dateStr(day)
          const repos = byDate.get(date)
          const isActive = !!repos?.length
          return (
            <div
              key={date}
              className={`flex aspect-square flex-col items-start gap-1 overflow-hidden border p-2 ${
                isActive ? "border-line" : "border-transparent"
              }`}
            >
              <span className={`font-mono text-[10px] leading-none ${isActive ? "text-foreground" : "text-muted-foreground/30"}`}>
                {day}
              </span>
              {repos?.length ? (
                <div className="flex w-full flex-col gap-0.5 text-[9px] leading-tight">
                  {repos.map((repo) => (
                    <RepoLink key={repo.name} name={repo.name} dotClass="size-1.5" />
                  ))}
                </div>
              ) : null}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function BuildingCalendar({
  days,
  currentYear,
  currentMonth,
  label,
}: {
  days: DayActivity[]
  currentYear: number
  currentMonth: number // 0-indexed
  label: string
}) {
  const byDate = new Map(days.map((d) => [d.date, d.repos]))

  const current = { year: currentYear, month: currentMonth }
  const previous = {
    year: currentMonth === 0 ? currentYear - 1 : currentYear,
    month: currentMonth === 0 ? 11 : currentMonth - 1,
  }

  const monthKeys = new Set([
    `${current.year}-${pad(current.month + 1)}`,
    `${previous.year}-${pad(previous.month + 1)}`,
  ])
  const listDays = days
    .filter((d) => monthKeys.has(d.date.slice(0, 7)))
    .sort((a, b) => b.date.localeCompare(a.date))

  const fmtDay = (date: string) => {
    const [y, m, d] = date.split("-").map(Number)
    return new Date(y, m - 1, d).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div>
      <h2 className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
        {label}
      </h2>

      {/* Desktop / tablet: current + previous month grids */}
      <div className="mt-6 hidden space-y-10 sm:block">
        <MonthGrid year={current.year} month={current.month} byDate={byDate} />
        <MonthGrid year={previous.year} month={previous.month} byDate={byDate} />
      </div>

      {/* Mobile: readable day-by-day list */}
      <div className="mt-6 divide-y divide-line border-t border-line sm:hidden">
        {listDays.length ? (
          listDays.map((d) => (
            <div key={d.date} className="flex gap-4 py-3">
              <p className="w-24 shrink-0 font-mono text-xs text-muted-foreground">{fmtDay(d.date)}</p>
              <div className="flex min-w-0 flex-col gap-1 text-sm">
                {d.repos.map((repo) => (
                  <RepoLink key={repo.name} name={repo.name} dotClass="size-2" />
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="py-3 font-mono text-xs text-muted-foreground/50">No public activity yet.</p>
        )}
      </div>
    </div>
  )
}
