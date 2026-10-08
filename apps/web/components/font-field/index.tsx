"use client"

import { useEffect, useRef, useState } from "react"
import { createFieldRenderer, type FieldPalette } from "./renderer"

// Reads the live theme tokens, so the field follows light, dark and any .theme-scope swap.
function readPalette(): FieldPalette {
  const probe = document.createElement("span")
  document.body.append(probe)
  const rgb = (token: string, alpha: number): [number, number, number, number] => {
    probe.style.color = `hsl(var(${token}))`
    const [r, g, b] = getComputedStyle(probe).color.match(/[\d.]+/g)!.map(Number)
    return [r / 255, g / 255, b / 255, alpha]
  }
  const dark = document.documentElement.classList.contains("dark")
  const palette = {
    background: rgb("--background", 1),
    // ink.a is grain strength; accent.a is how far the light pulls toward its colour.
    ink: rgb("--foreground", dark ? 0.022 : 0.026),
    accent: rgb(dark ? "--accent" : "--station-soft", dark ? 0.13 : 0.55),
  }
  probe.remove()
  return palette
}

/**
 * Paper and light behind the Crafter Sans specimen. It is decoration only: without WebGPU the
 * canvas never fades in and the page keeps its CSS background; with reduced motion it draws
 * one still frame.
 */
export function FontField() {
  const canvas = useRef<HTMLCanvasElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const element = canvas.current
    if (!element || !("gpu" in navigator)) return
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches
    const renderer = createFieldRenderer({ canvas: element, palette: readPalette(), still })
    let cancelled = false
    renderer.ready.then(() => { if (!cancelled) setReady(true) }).catch(() => {})
    const theme = new MutationObserver(() => renderer.setPalette(readPalette()))
    theme.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "data-theme", "style"] })
    return () => { cancelled = true; theme.disconnect(); renderer.dispose() }
  }, [])

  return <canvas ref={canvas} aria-hidden="true" className="font-field" data-ready={ready || undefined} />
}
