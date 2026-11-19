"use client"

import { useEffect, useState } from "react"
import { HACK0_TIME_ZONE } from "@/lib/hack0-calendar-data"

export type CountdownLabels = { days: string; hours: string; minutes: string; seconds: string; live: string }

/** Whole days, hours, minutes and seconds left until `target`; null once it has passed. */
export function countdownParts(target: number, now: number) {
  const left = target - now
  if (left <= 0) return null
  const total = Math.floor(left / 1000)
  return { d: Math.floor(total / 86400), h: Math.floor(total / 3600) % 24, m: Math.floor(total / 60) % 60, s: total % 60 }
}

const pad = (value: number) => String(value).padStart(2, "0")

/**
 * Live countdown to an instant. The server and the first client render share one stable value
 * (placeholders), and the clock starts ticking after mount, so there is nothing to hydrate wrong.
 */
export function EventCountdown({ startAt, endAt, labels, variant = "inline", className }: {
  startAt: string
  endAt?: string
  labels: CountdownLabels
  variant?: "inline" | "blocks"
  className?: string
}) {
  const [now, setNow] = useState<number | null>(null)
  useEffect(() => {
    setNow(Date.now())
    const timer = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(timer)
  }, [])

  const target = Date.parse(startAt)
  const parts = now === null ? null : countdownParts(target, now)
  const started = now !== null && parts === null
  const over = started && endAt !== undefined && now !== null && now >= Date.parse(endAt)
  const cells: [string, string, string][] = [
    ["d", parts ? String(parts.d) : "--", labels.days],
    ["h", parts ? pad(parts.h) : "--", labels.hours],
    ["m", parts ? pad(parts.m) : "--", labels.minutes],
    ["s", parts ? pad(parts.s) : "--", labels.seconds],
  ]
  const spoken = parts ? `${parts.d} ${labels.days} ${parts.h} ${labels.hours} ${parts.m} ${labels.minutes}` : undefined
  if (over) return null

  return (
    <span className={`event-countdown${className ? ` ${className}` : ""}`} data-variant={variant} data-live={now !== null || undefined}
      role="timer" aria-label={started ? labels.live : spoken}>
      {started ? <span className="event-countdown-live">{labels.live}</span> : cells.map(([key, value, unit]) => (
        <span key={key} className="event-countdown-cell" aria-hidden="true">
          <b>{value}</b><i>{unit}</i>
        </span>
      ))}
    </span>
  )
}

/** The start of an event in the visitor's own timezone; Lima time until the browser takes over. */
export function EventLocalTime({ startAt, allDay, locale, yourTime, limaTime }: {
  startAt: string; allDay: boolean; locale: string; yourTime: string; limaTime: string
}) {
  const [local, setLocal] = useState(false)
  useEffect(() => setLocal(true), [])
  const zone = allDay ? "UTC" : local ? undefined : HACK0_TIME_ZONE
  const text = new Intl.DateTimeFormat(locale, {
    weekday: "short", day: "numeric", month: "short", ...(allDay ? {} : { hour: "numeric", minute: "2-digit", timeZoneName: "short" }), timeZone: zone,
  }).format(new Date(startAt)).replace(/\s/g, " ")
  return <span className="event-local-time">{text}{allDay ? "" : ` · ${local ? yourTime : limaTime}`}</span>
}
