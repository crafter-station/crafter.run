"use client"

import { useEffect, useId, useMemo, useRef, useState } from "react"
import { loadOutlines, skeleton, type FontCut, type OutlineData } from "@/lib/font-outlines"

const TRACKING = -24
const LENS = 230
const GUTTER = 300

type Guide = { y: number; label: string }

/**
 * The wordmark drawn from the font's own outlines. A lens follows the pointer
 * and exposes the drawing underneath: contours, on-curve nodes and handles.
 */
export function FontWordmark({ cut, word, label, guides: guideLabels }: {
  cut: FontCut; word: string; label: string
  guides: { ascender: string; capHeight: string; xHeight: string; baseline: string }
}) {
  const id = useId().replace(/:/g, "")
  const svg = useRef<SVGSVGElement>(null)
  const [data, setData] = useState<OutlineData | null>(null)
  const [lens, setLens] = useState<{ x: number; y: number } | null>(null)
  const [radius, setRadius] = useState(LENS)
  const target = useRef(LENS)

  // The lens follows the pointer anywhere in the first screen. Leaving it (scrolling past,
  // or the pointer leaving the window) shrinks the lens away instead of leaving it pinned.
  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches
    const DURATION = 420
    let frame = 0
    let current = target.current
    // Time-based so the shrink takes the same time on 60 and 120 Hz displays.
    const aim = (value: number) => {
      if (target.current === value) return
      target.current = value
      cancelAnimationFrame(frame)
      if (reduced) { current = value; setRadius(value); return }
      const from = current, start = performance.now()
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / DURATION)
        current = from + (value - from) * (1 - (1 - t) ** 3)
        setRadius(current)
        if (t < 1) frame = requestAnimationFrame(step)
      }
      frame = requestAnimationFrame(step)
    }
    const onMove = (event: globalThis.PointerEvent) => {
      const matrix = svg.current?.getScreenCTM()
      if (!matrix) return
      if (event.clientY + window.scrollY > window.innerHeight) return aim(0)
      const point = new DOMPoint(event.clientX, event.clientY).matrixTransform(matrix.inverse())
      setLens({ x: point.x, y: point.y })
      aim(LENS)
    }
    const onOut = (event: globalThis.PointerEvent) => { if (event.relatedTarget === null) aim(0) }
    const onScroll = () => { if (window.scrollY > window.innerHeight * 0.6) aim(0) }
    window.addEventListener("pointermove", onMove, { passive: true })
    window.addEventListener("pointerdown", onMove, { passive: true })
    document.addEventListener("pointerout", onOut)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerdown", onMove)
      document.removeEventListener("pointerout", onOut)
      window.removeEventListener("scroll", onScroll)
    }
  }, [])

  useEffect(() => {
    let live = true
    loadOutlines(cut).then(result => { if (live) setData(result) }).catch(() => {})
    return () => { live = false }
  }, [cut])

  const layout = useMemo(() => {
    if (!data) return null
    let x = 0
    const glyphs = [...word].map((char, index) => {
      const glyph = data.glyphs[char]
      const placed = { char, index, x, path: glyph?.path ?? "", bounds: glyph?.bounds, shape: skeleton(glyph?.path ?? "") }
      x += (glyph?.advance ?? 500) + TRACKING
      return placed
    })
    const width = x - TRACKING + GUTTER
    const top = Math.max(...glyphs.map(g => g.bounds?.[3] ?? 0))
    const guides: Guide[] = [
      ...(top - data.capHeight > 40 ? [{ y: top, label: `${guideLabels.ascender} ${top}` }] : []),
      { y: data.capHeight, label: `${guideLabels.capHeight} ${data.capHeight}` },
      { y: data.xHeight, label: `${guideLabels.xHeight} ${data.xHeight}` },
      { y: 0, label: `${guideLabels.baseline} 0` },
    ]
    return { glyphs, width, top, guides }
  }, [data, word, guideLabels])

  if (!layout || !data) return <h1 className="font-wordmark-fallback" style={{ fontFamily: cut === "display" ? "var(--font-display)" : "var(--font-sans)", fontWeight: cut === "display" ? 500 : Number(cut) }}>{word}</h1>

  const pad = 40
  const viewBox = `${-pad} ${-layout.top - 90} ${layout.width + pad * 2} ${layout.top + 90 + 120}`
  // Park the lens on the second-to-last letter until someone moves it, so the effect is discoverable.
  const parked = layout.glyphs[Math.max(0, layout.glyphs.length - 3)]
  const at = lens ?? { x: parked.x + 200, y: -data.xHeight / 2 - 60 }

  return <h1 className="font-wordmark" aria-label={label}>
    <svg ref={svg} viewBox={viewBox} aria-hidden="true">
      <defs>
        <mask id={`${id}-hole`} maskUnits="userSpaceOnUse" x={-pad} y={-layout.top - 90} width={layout.width + pad * 2} height={layout.top + 210}>
          <rect x={-pad} y={-layout.top - 90} width={layout.width + pad * 2} height={layout.top + 210} fill="white" />
          {radius > 0.5 && <circle cx={at.x} cy={at.y} r={radius} fill="black" />}
        </mask>
        <clipPath id={`${id}-lens`}><circle cx={at.x} cy={at.y} r={Math.max(radius, 0.01)} /></clipPath>
      </defs>
      <g className="font-wordmark-guides">
        {layout.guides.map(g => <g key={g.label}>
          <path d={`M${-pad} ${-g.y} H${layout.width + pad}`} />
          <text x={layout.width + pad - 8} y={-g.y - 14} textAnchor="end">{g.label}</text>
        </g>)}
      </g>
      <g mask={`url(#${id}-hole)`} className="font-wordmark-ink">
        {layout.glyphs.map(g => <path key={g.index} d={g.path} transform={`translate(${g.x} 0) scale(1 -1)`} data-accent={g.char === "." || undefined} />)}
      </g>
      <g clipPath={`url(#${id}-lens)`} className="font-wordmark-xray">
        <rect x={-pad} y={-layout.top - 90} width={layout.width + pad * 2} height={layout.top + 210} className="font-wordmark-xray-bg" />
        {layout.guides.map(g => <path key={g.label} className="font-wordmark-xray-guide" d={`M${-pad} ${-g.y} H${layout.width + pad}`} />)}
        {layout.glyphs.map(g => <g key={g.index} transform={`translate(${g.x} 0) scale(1 -1)`}>
          <path d={g.path} className="font-wordmark-contour" />
          {g.shape.handles.map(([x1, y1, x2, y2], i) => <path key={i} className="font-wordmark-handle" d={`M${x1} ${y1} L${x2} ${y2}`} />)}
          {g.shape.handles.map(([, , x, y], i) => <circle key={i} className="font-wordmark-control" cx={x} cy={y} r="7" />)}
          {g.shape.nodes.map(([x, y], i) => <rect key={i} className="font-wordmark-node" x={x - 8} y={y - 8} width="16" height="16" />)}
        </g>)}
      </g>
      {radius > 0.5 && <circle className="font-wordmark-ring" cx={at.x} cy={at.y} r={radius} />}
    </svg>
  </h1>
}
