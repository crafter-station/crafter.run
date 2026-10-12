"use client"

import { useEffect, useRef } from "react"

// Final resting spots (fraction of the circle) so both cups meet and overlap at the center.
const RIGHT = { left: "36.6%", top: "22.7%" }
const LEFT = { left: "-35.6%", top: "18.7%" }
const TRAVEL = 38

// Ease with a small overshoot: the cups bump past each other, then settle. That's the clink.
const clink = (t: number) => {
  if (t < 0.85) {
    const u = t / 0.85
    return 1.06 * u * u * (3 - 2 * u)
  }
  const u = (t - 0.85) / 0.15
  return 1.06 - 0.06 * u * u * (3 - 2 * u)
}

export function HotReloadBrindis({ label }: { label: string }) {
  const el = useRef<HTMLDivElement>(null)
  const right = useRef<HTMLDivElement>(null)
  const left = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let frame = 0
    const update = () => {
      frame = 0
      const node = el.current
      if (!node || !right.current || !left.current) return
      const rect = node.getBoundingClientRect()
      // 0 when the circle peeks in from the bottom, 1 when its center reaches 45% of the viewport.
      const raw = (innerHeight - rect.top) / (innerHeight * 0.55 + rect.height / 2)
      const p = reduce ? 1 : clink(Math.min(1, Math.max(0, raw)))
      const off = (1 - p) * TRAVEL
      right.current.style.transform = `translateX(${off}%)`
      left.current.style.transform = `translateX(${-off}%)`
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    addEventListener("scroll", onScroll, { passive: true })
    addEventListener("resize", onScroll)
    return () => {
      removeEventListener("scroll", onScroll)
      removeEventListener("resize", onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div ref={el} role="img" aria-label={label} className="hot-reload-brindis" style={{ isolation: "isolate" }}>
      <div className="hot-reload-brindis-tilt">
        <div className="hot-reload-brindis-stage">
          <div ref={left} className="hot-reload-hand" style={LEFT}>
            {/* biome-ignore lint/performance/noImgElement: images are unoptimized site-wide */}
            <img src="/events/hot-reload/hand-2.webp" alt="" width={1200} height={800} />
          </div>
          <div ref={right} className="hot-reload-hand" style={RIGHT}>
            {/* biome-ignore lint/performance/noImgElement: images are unoptimized site-wide */}
            <img src="/events/hot-reload/hand-1.webp" alt="" width={1200} height={800} />
          </div>
        </div>
      </div>
    </div>
  )
}
