"use client"

import { useState } from "react"
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

  // Navigation is limited to the current month and the previous month.
  const currentKey = `${currentYear}-${pad(currentMonth + 1)}`
  const prev = new Date(currentYear, currentMonth - 1, 1)
  const prevKey = `${prev.getFullYear()}-${pad(prev.getMonth() + 1)}`
  const months = [prevKey, currentKey] // ascending

  const [monthKey, setMonthKey] = useState(currentKey)
  const idx = months.indexOf(monthKey)
  const [yy, mm] = monthKey.split("-").map(Number)
  const year = yy
  const month = mm - 1 // 0-indexed

  const monthName = new Date(year, month, 1).toLocaleString("en-US", { month: "long" })
  const startOffset = (new Date(year, month, 1).getDay() + 6) % 7 // Monday-first
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const cells: (number | null)[] = [
    ...Array(startOffset).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]
  const dateStr = (day: number) => `${year}-${pad(month + 1)}-${pad(day)}`

  const canPrev = idx > 0
  const canNext = idx < months.length - 1
  const navBtn =
    "font-mono text-sm text-muted-foreground transition-colors enabled:hover:text-foreground disabled:opacity-30"

  const listDays = days
    .filter((d) => d.date.slice(0, 7) === monthKey)
    .sort((a, b) => b.date.localeCompare(a.date))
  const fmtDay = (date: string) => {
    const [y, m, d] = date.split("-").map(Number)
    return new Date(y, m - 1, d).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })
  }

  return (
    <div>
      <div className="flex items-baseline justify-between">
        <h2 className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{label}</h2>
        <div className="flex items-center gap-3">
          <button type="button" className={navBtn} disabled={!canPrev} onClick={() => canPrev && setMonthKey(months[idx - 1])} aria-label="Previous month">
            ‹
          </button>
          <p className="w-32 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60">
            {monthName} {year}
          </p>
          <button type="button" className={navBtn} disabled={!canNext} onClick={() => canNext && setMonthKey(months[idx + 1])} aria-label="Next month">
            ›
          </button>
        </div>
      </div>

      {/* Desktop / tablet: month grid */}
      <div className="mt-6 hidden grid-cols-7 gap-1.5 sm:grid">
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
          <p className="py-3 font-mono text-xs text-muted-foreground/50">No public activity this month.</p>
        )}
      </div>
    </div>
  )
}
