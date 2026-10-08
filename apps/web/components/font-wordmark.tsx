"use client"

import { useEffect, useId, useMemo, useRef, useState, type PointerEvent } from "react"
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
  const [touched, setTouched] = useState(false)

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

  function move(event: PointerEvent<SVGSVGElement>) {
    const element = svg.current
    const matrix = element?.getScreenCTM()
    if (!element || !matrix) return
    const point = new DOMPoint(event.clientX, event.clientY).matrixTransform(matrix.inverse())
    setLens({ x: point.x, y: point.y })
    setTouched(true)
  }

  return <h1 className="font-wordmark" aria-label={label}>
    <svg ref={svg} viewBox={viewBox} onPointerMove={move} onPointerDown={move} aria-hidden="true" data-touched={touched || undefined}>
      <defs>
        <mask id={`${id}-hole`} maskUnits="userSpaceOnUse" x={-pad} y={-layout.top - 90} width={layout.width + pad * 2} height={layout.top + 210}>
          <rect x={-pad} y={-layout.top - 90} width={layout.width + pad * 2} height={layout.top + 210} fill="white" />
          <circle cx={at.x} cy={at.y} r={LENS} fill="black" />
        </mask>
        <clipPath id={`${id}-lens`}><circle cx={at.x} cy={at.y} r={LENS} /></clipPath>
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
      <circle className="font-wordmark-ring" cx={at.x} cy={at.y} r={LENS} />
    </svg>
  </h1>
}
