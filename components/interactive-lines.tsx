"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

const FADE_THRESHOLD = 90

export function InteractiveLines({
  count = 86,
  orientation = "vertical",
  interactive = true,
  className,
}: {
  count?: number
  orientation?: "vertical" | "horizontal"
  interactive?: boolean
  className?: string
}) {
  const isVertical = orientation === "vertical"
  const containerRef = useRef<HTMLDivElement>(null)
  const linesRef = useRef<Array<HTMLDivElement | null>>([])

  useEffect(() => {
    if (!interactive) return
    const container = containerRef.current
    if (!container) return

    let rafId: number | null = null
    let lastEvent: PointerEvent | null = null

    const apply = () => {
      rafId = null
      const e = lastEvent
      if (!e) return
      const rect = container.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const inside = x >= 0 && x <= rect.width && y >= 0 && y <= rect.height

      const lines = linesRef.current
      const dim = isVertical ? rect.width : rect.height
      const cursor = isVertical ? x : y

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i]
        if (!line) continue
        if (!inside) {
          line.style.opacity = "1"
          continue
        }
        const linePos = (i / (lines.length - 1)) * dim
        const distance = Math.abs(cursor - linePos)
        const opacity =
          distance >= FADE_THRESHOLD ? 1 : Math.max(0, distance / FADE_THRESHOLD)
        line.style.opacity = String(opacity)
      }
    }

    const onMove = (e: PointerEvent) => {
      lastEvent = e
      if (rafId === null) rafId = requestAnimationFrame(apply)
    }

    const reset = () => {
      for (const line of linesRef.current) {
        if (line) line.style.opacity = "1"
      }
    }

    window.addEventListener("pointermove", onMove)
    document.addEventListener("mouseleave", reset)
    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId)
      window.removeEventListener("pointermove", onMove)
      document.removeEventListener("mouseleave", reset)
    }
  }, [count, isVertical, interactive])

  return (
    <div
      ref={containerRef}
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 z-[1]", className)}
    >
      {Array.from({ length: count }).map((_, i) => {
        const isFirst = i === 0
        const isLast = i === count - 1
        const frac = i / (count - 1)
        const offset = `calc(${frac} * (100% - 1px))`
        return (
          <div
            key={i}
            ref={(el) => {
              linesRef.current[i] = el
            }}
            className={cn(
              "absolute bg-zinc-200 dark:bg-zinc-800",
              isVertical ? "top-0 bottom-0 w-px" : "start-0 end-0 h-px",
            )}
            style={{
              opacity: 1,
              transition: "opacity 0.5s ease-in-out",
              willChange: "transform",
              ...(isVertical
                ? isFirst
                  ? { left: 0 }
                  : isLast
                    ? { right: 0 }
                    : { left: offset }
                : isFirst
                  ? { top: 0 }
                  : isLast
                    ? { bottom: 0 }
                    : { top: offset }),
            }}
          />
        )
      })}
    </div>
  )
}
