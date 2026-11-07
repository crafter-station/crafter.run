"use client"

import { useEffect, useRef, useState } from "react"
import { createHeroFieldRenderer, type HeroFieldPalette } from "./renderer"

function readPalette(): HeroFieldPalette {
  const probe = document.createElement("span")
  document.body.append(probe)
  const rgb = (value: string, alpha: number): [number, number, number, number] => {
    probe.style.color = value
    const [r, g, b] = getComputedStyle(probe).color.match(/[\d.]+/g)!.map(Number)
    return [r / 255, g / 255, b / 255, alpha]
  }
  const dark = document.documentElement.classList.contains("dark")
  const palette = {
    background: rgb("hsl(var(--background))", 1),
    ink: dark ? rgb("#f4d56d", 0.38) : rgb("hsl(var(--accent))", 0.34),
  }
  probe.remove()
  return palette
}

/**
 * The knot as a halftone behind the landing name. Decoration only: without WebGPU the canvas
 * never fades in and the outline knot stays; with reduced motion it draws one still frame.
 */
export function HeroField() {
  const canvas = useRef<HTMLCanvasElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const element = canvas.current
    if (!element || !("gpu" in navigator)) return
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches
    const renderer = createHeroFieldRenderer({ canvas: element, palette: readPalette(), still })
    let cancelled = false
    renderer.ready.then(() => { if (!cancelled) setReady(true) }).catch(() => {})
    const theme = new MutationObserver(() => renderer.setPalette(readPalette()))
    theme.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "data-theme", "style"] })
    return () => { cancelled = true; theme.disconnect(); renderer.dispose() }
  }, [])

  return <canvas ref={canvas} aria-hidden="true" className="hero-field" data-ready={ready || undefined} />
}
