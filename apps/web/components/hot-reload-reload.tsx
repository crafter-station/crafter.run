"use client"

import { useCallback, useEffect, useRef, useState } from "react"

import { hotReloadText } from "@/lib/hot-reload-copy"

const DURATION = 2900
const EVENT = "hot-reload:fire"

type Copy = { reloaded: string; count: string; quips: string[]; tooMany: string }
type Run = { id: number; ms: number; count: number; quip: string }

/* R easter egg: the screen pours a cup, swirls it into ↻ and prints a fake reload log. */
export function HotReloadReload({ copy }: { copy: Copy }) {
  const [run, setRun] = useState<Run | null>(null)
  const busy = useRef(false)

  const fire = useCallback(() => {
    if (busy.current) return
    busy.current = true
    let count = 1
    try {
      count = Number(sessionStorage.getItem("hot-reload:reloads") ?? 0) + 1
      sessionStorage.setItem("hot-reload:reloads", String(count))
    } catch {}
    const quip = count >= 5 ? hotReloadText(copy.tooMany, { count }) : copy.quips[(count - 1) % copy.quips.length]
    setRun({ id: Date.now(), ms: 180 + Math.round(Math.random() * 320), count, quip })
    setTimeout(() => {
      setRun(null)
      busy.current = false
    }, DURATION)
  }, [copy])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement
      if (target.closest("input, textarea, select, [contenteditable]")) return
      if (e.key.toLowerCase() !== "r" || e.altKey || e.shiftKey || e.metaKey || e.ctrlKey) return
      e.preventDefault()
      fire()
    }
    window.addEventListener("keydown", onKey)
    window.addEventListener(EVENT, fire)
    return () => {
      window.removeEventListener("keydown", onKey)
      window.removeEventListener(EVENT, fire)
    }
  }, [fire])

  if (!run) return null

  return (
    <div key={run.id} className="hot-reload-overlay" role="status">
      <div className="hot-reload-overlay-body">
        <svg viewBox="0 0 200 200" className="reload-cup" aria-hidden="true">
          <circle cx="100" cy="100" r="94" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="1.5 4" />
          <path d="M168 96 h18 a8 8 0 0 1 0 16 h-18" fill="none" stroke="currentColor" strokeWidth="5" />
          <circle cx="100" cy="100" r="72" fill="none" stroke="currentColor" strokeWidth="5" />
          <circle className="reload-coffee" cx="100" cy="100" r="62" fill="currentColor" />
          <g className="reload-arrow">
            <path className="reload-swirl" d="M100 62 A38 38 0 1 1 67.09 81" fill="none" stroke="var(--hr-butter)" strokeWidth="7" strokeLinecap="round" pathLength={1} />
            <path className="reload-head" d="M74.09 68.88 L75.98 89.6 L55.2 77.6 Z" fill="var(--hr-butter)" />
          </g>
        </svg>
        <pre className="reload-log">
          <span style={{ animationDelay: "0.55s" }}>$ hot-reload --café</span>
          <span style={{ animationDelay: "1.15s" }}>✓ {hotReloadText(copy.reloaded, { ms: run.ms })}</span>
          <span style={{ animationDelay: "1.45s" }}>✓ {hotReloadText(copy.count, { count: String(run.count).padStart(2, "0") })}</span>
          <span style={{ animationDelay: "1.75s" }}>{run.quip}</span>
        </pre>
      </div>
    </div>
  )
}

/* Touch screens have no R key, so the footer hint doubles as the trigger. */
export function HotReloadTrigger({ press, toast }: { press: string; toast: string }) {
  return (
    <button type="button" className="hot-reload-trigger" onClick={() => window.dispatchEvent(new Event(EVENT))}>
      <span className="hot-reload-trigger-key">{press}</span>
      <span className="hot-reload-trigger-touch">{toast}</span>
    </button>
  )
}
