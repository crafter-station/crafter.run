"use client"

import { useEffect } from "react"

/** Fixed chrome (sidebar, social rail, rail CTA) that a coloured band can pass under. */
const CHROME = [
  ".station-sidebar .station-brand",
  ".station-sidebar .station-nav > *",
  ".station-sidebar .station-preferences > *",
  ".station-sidebar .station-side-event",
  ".station-social-rail > *",
  ".station-rail-cta",
].join(",")

/**
 * Marks each fixed chrome item with `data-on-band` while it sits over the
 * page's `[data-chrome-band]` header, so CSS can switch its ink per item as
 * the band scrolls away.
 */
export function BandChrome() {
  useEffect(() => {
    const band = document.querySelector<HTMLElement>("[data-chrome-band]")
    if (!band) return
    const items = Array.from(document.querySelectorAll<HTMLElement>(CHROME))
    let frame = 0

    const update = () => {
      frame = 0
      const { top, bottom } = band.getBoundingClientRect()
      for (const item of items) {
        const rect = item.getBoundingClientRect()
        const middle = rect.top + rect.height / 2
        item.toggleAttribute("data-on-band", middle > top && middle < bottom)
      }
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", schedule)
    return () => {
      window.removeEventListener("scroll", schedule)
      window.removeEventListener("resize", schedule)
      cancelAnimationFrame(frame)
      for (const item of items) item.removeAttribute("data-on-band")
    }
  }, [])

  return null
}
