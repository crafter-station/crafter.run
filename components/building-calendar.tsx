"use client"

import { useState } from "react"
import type { DayActivity } from "@/lib/github"
import { projectColor, repoLabel } from "@/lib/project-color"

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
const pad = (n: number) => String(n).padStart(2, "0")

export function BuildingCalendar({ days, label }: { days: DayActivity[]; label: string }) {
  const byDate = new Map(days.map((d) => [d.date, d.repos]))

  // Months that have activity, ascending ("YYYY-MM").
  const dataMonths = [...new Set(days.map((d) => d.date.slice(0, 7)))].sort()

  // Default to the month with the most activity so the section showcases the work.
  const totals = new Map<string, number>()
  for (const d of days) {
    const key = d.date.slice(0, 7)
    const sum = d.repos.reduce((acc, r) => acc + r.count, 0)
    totals.set(key, (totals.get(key) ?? 0) + sum)
  }
  const richest = [...totals.entries()].sort((a, b) => b[1] - a[1])[0][0]

  const [monthKey, setMonthKey] = useState(richest)
  const idx = dataMonths.indexOf(monthKey)
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
  const canNext = idx < dataMonths.length - 1
  const navBtn =
    "font-mono text-sm text-muted-foreground transition-colors enabled:hover:text-foreground disabled:opacity-30"

  return (
    <div>
      <div className="flex items-baseline justify-between">
        <h2 className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          {label}
        </h2>
        <div className="flex items-center gap-3">
          <button type="button" className={navBtn} disabled={!canPrev} onClick={() => canPrev && setMonthKey(dataMonths[idx - 1])} aria-label="Previous month">
            ‹
          </button>
          <p className="w-32 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60">
            {monthName} {year}
          </p>
          <button type="button" className={navBtn} disabled={!canNext} onClick={() => canNext && setMonthKey(dataMonths[idx + 1])} aria-label="Next month">
            ›
          </button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-7 gap-1.5">
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
                <div className="flex w-full flex-col gap-0.5">
                  {repos.map((repo) => (
                    <a
                      key={repo.name}
                      href={`https://github.com/${repo.name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={repoLabel(repo.name)}
                      className="flex items-center gap-1 text-muted-foreground hover:text-foreground"
                    >
                      <span className="size-1.5 shrink-0 rounded-full" style={{ backgroundColor: projectColor(repo.name) }} />
                      <span className="truncate text-[9px] leading-tight">{repoLabel(repo.name)}</span>
                    </a>
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
