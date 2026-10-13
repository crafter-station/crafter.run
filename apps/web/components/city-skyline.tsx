import { agendaCityArt, type AgendaCityKey } from "@/lib/agenda-cities"

const tones: Record<string, number> = { "#": 1, "+": 0.45, "~": 0.22 }

// Each row collapses into runs of the same tone, so a skyline is a few dozen rects.
export function CitySkyline({ city, className }: { city: AgendaCityKey; className?: string }) {
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
  return <svg className={className} viewBox="0 0 28 12" shapeRendering="crispEdges" aria-hidden="true">
    {rects.map(r => <rect key={`${r.x}-${r.y}`} x={r.x} y={r.y} width={r.w} height="1" fill="currentColor" opacity={r.o} />)}
  </svg>
}
