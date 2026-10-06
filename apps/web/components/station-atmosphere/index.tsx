"use client"

import { useEffect, useRef, useState } from "react"

// The static drawing is also the mobile, reduced-motion and no-WebGPU version.
// It is present in the server HTML; the shader is an optional enhancement.
const contours = Array.from({ length: 14 }, (_, index) => {
  const radius = 190 + index * 28
  return Array.from({ length: 121 }, (_, step) => {
    const angle = step / 120 * Math.PI * 2
    const divisor = 1 + Math.sin(angle) ** 2
    const x = 800 + radius * 1.8 * Math.cos(angle) / divisor
    const y = 360 + radius * 1.3 * Math.sin(angle) * Math.cos(angle) / divisor
    return `${step ? "L" : "M"}${x.toFixed(2)},${y.toFixed(2)}`
  }).join(" ") + "Z"
})

export function StationAtmosphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [renderer, setRenderer] = useState<"static" | "gpu">("static")

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const motion = matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)")
    const connection = (navigator as Navigator & {
      connection?: EventTarget & { saveData?: boolean }
    }).connection
    let generation = 0
    let stop: (() => void) | undefined

    const reconcile = () => {
      const current = ++generation
      stop?.()
      stop = undefined
      setRenderer("static")
      if (!motion.matches || connection?.saveData || !("gpu" in navigator)) return

      void import("./renderer").then(({ createAtmosphere }) => {
        if (generation !== current) return
        const atmosphere = createAtmosphere(canvas, {
          ready: () => generation === current && setRenderer("gpu"),
          unavailable: () => generation === current && setRenderer("static"),
        })
        stop = atmosphere.dispose
      }).catch(() => {
        // The static artwork stays visible even if the optional chunk cannot load.
      })
    }

    reconcile()
    motion.addEventListener("change", reconcile)
    connection?.addEventListener("change", reconcile)
    return () => {
      generation++
      stop?.()
      motion.removeEventListener("change", reconcile)
      connection?.removeEventListener("change", reconcile)
    }
  }, [])

  return (
    <div className="station-atmosphere" aria-hidden="true" data-renderer={renderer}>
      <div className="station-atmosphere-light" />
      <svg className="station-atmosphere-contours" viewBox="0 0 1600 900" fill="none" preserveAspectRatio="xMidYMid slice">
        <g stroke="currentColor" strokeWidth=".8">
          {contours.map((path, index) => <path key={index} d={path} />)}
        </g>
      </svg>
      <canvas ref={canvasRef} className="station-atmosphere-canvas" />
    </div>
  )
}
