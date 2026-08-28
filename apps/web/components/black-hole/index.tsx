"use client"

import { useEffect, useRef, useState } from "react"

import { createRenderer } from "./renderer"
import { cn } from "@/lib/utils"

/**
 * Host for the vendored black-hole renderer. Everything below it is WebGPU, so
 * this is also the boundary where a browser that cannot run it says so: `init`
 * rejects, `onUnavailable` fires, and the caller falls back to something that
 * works. That rejection has to be caught here rather than left to float, or a
 * visitor without WebGPU gets an unhandled promise rejection for their trouble.
 *
 * The canvas fades in on first frame. The pipeline bakes its ray traversal
 * before it can draw anything, and a black rectangle appearing first and
 * filling in afterwards reads worse than a short wait.
 */
export function BlackHole({
  className,
  onUnavailable,
}: {
  className?: string
  onUnavailable?: () => void
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [ready, setReady] = useState(false)

  // Read through a ref so a caller's inline callback cannot tear the renderer
  // down and rebuild it on every render.
  const onUnavailableRef = useRef(onUnavailable)
  onUnavailableRef.current = onUnavailable

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    let cancelled = false
    const renderer = createRenderer({ canvas })
    renderer.ready
      .then(() => {
        if (!cancelled) setReady(true)
      })
      .catch(() => {
        if (!cancelled) onUnavailableRef.current?.()
      })

    return () => {
      cancelled = true
      renderer.dispose()
    }
  }, [])

  return (
    <div aria-hidden className={cn("absolute inset-0 overflow-hidden bg-black", className)}>
      <canvas
        ref={canvasRef}
        className={cn(
          "block h-full w-full transition-opacity duration-700",
          ready ? "opacity-100" : "opacity-0",
        )}
      />
    </div>
  )
}
