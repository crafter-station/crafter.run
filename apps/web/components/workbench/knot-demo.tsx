"use client"

import { useEffect, useRef, useState } from "react"
import { HeroField } from "@/components/hero-field"
import { BRAND_MARK_PATH } from "@/lib/brand"

/** The homepage halftone field in a tile. It bends around the mouse; without WebGPU the outline knot stays. */
export function KnotDemo({ pointerLabel, fallback }: { pointerLabel: string; fallback: string }) {
  const stage = useRef<HTMLDivElement>(null)
  const [point, setPoint] = useState<[number, number] | null>(null)
  const [gpu, setGpu] = useState(true)
  useEffect(() => setGpu("gpu" in navigator), [])

  return (
    <div className="wb-knot" ref={stage}
      onPointerMove={event => {
        const box = event.currentTarget.getBoundingClientRect()
        setPoint([Math.round(event.clientX - box.left), Math.round(event.clientY - box.top)])
      }}
      onPointerLeave={() => setPoint(null)}>
      <HeroField centered />
      <svg className="hero-knot wb-knot-outline" viewBox="-8 -8 273 273" aria-hidden="true"><path d={BRAND_MARK_PATH} pathLength={1} /></svg>
      <p className="wb-knot-meta">
        {gpu
          ? <span>{pointerLabel} <b>{point ? `${String(point[0]).padStart(3, "0")}, ${String(point[1]).padStart(3, "0")}` : "---, ---"}</b></span>
          : <span>{fallback}</span>}
      </p>
    </div>
  )
}
