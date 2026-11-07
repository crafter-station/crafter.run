"use client"

import { useEffect, useRef } from "react"
import { agendaCityArt, type AgendaCityKey } from "@/lib/agenda-cities"

export type HorizonCity = { key: AgendaCityKey; code: string; name: string; count: number }

const tones: Record<string, number> = { "#": 1, "+": 0.45, "~": 0.22 }


function Skyline({ city }: { city: AgendaCityKey }) {
  const rects: Array<{ x: number; y: number; w: number; o: number }> = []
  agendaCityArt[city].forEach((row, y) => {
    let x = 0
    while (x < row.length) {
      const char = row[x]
      let w = 1
      while (row[x + w] === char) w++
      if (tones[char]) rects.push({ x, y, w, o: tones[char] })
      x += w
    }
  })
  return <svg viewBox="0 0 28 12" preserveAspectRatio="xMidYMax slice" shapeRendering="crispEdges" aria-hidden="true">
    {rects.map(r => <rect key={`${r.x}-${r.y}`} x={r.x} y={r.y} width={r.w} height="1" fill="currentColor" opacity={r.o} />)}
  </svg>
}

/** Every city the community has met in, as one skyline. Segment width follows the
 * square root of past events, so Lima leads without erasing Medellín. */
export function AgendaHorizon({ cities, lit, label }: { cities: HorizonCity[]; lit: AgendaCityKey | null; label: string }) {
  const track = useRef<HTMLDivElement>(null)
  // On narrow screens the skyline scrolls; start it on the lit city.
  useEffect(() => {
    const el = track.current
    const city = el?.querySelector<HTMLElement>("[data-lit]")
    if (!el || !city || el.scrollWidth <= el.clientWidth) return
    el.scrollLeft = city.offsetLeft + city.offsetWidth / 2 - el.clientWidth / 2
  }, [lit])
  return <div className="ev-horizon" role="img" aria-label={label}>
    <div className="ev-horizon-track" ref={track}><div className="ev-horizon-row">
      {cities.map((city, index) => (
        <div key={city.key} className="ev-city" data-lit={city.key === lit || undefined}
          style={{ flexGrow: Math.max(1.4, Math.sqrt(city.count)), "--i": index } as React.CSSProperties}>
          <span className="ev-city-code">{city.code}{city.count > 0 && <sup>{city.count}</sup>}</span>
          <span className="ev-beacon" aria-hidden="true" />
          <Skyline city={city.key} />
        </div>
      ))}
    </div></div>
  </div>
}
