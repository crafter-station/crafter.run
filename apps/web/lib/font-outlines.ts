export type FontCut = "display" | "400" | "500" | "600" | "700"
export type OutlineGlyph = { path: string; advance: number; bounds: number[] | null; name: string }
export type OutlineData = {
  unitsPerEm: number; ascent: number; descent: number; xHeight: number; capHeight: number
  glyphs: Record<string, OutlineGlyph>
}

const cache = new Map<FontCut, Promise<OutlineData>>()

/** Real outlines exported from the OTFs by `scripts/sync-font-specimen.py`, fetched once per cut. */
export function loadOutlines(cut: FontCut): Promise<OutlineData> {
  let pending = cache.get(cut)
  if (!pending) {
    pending = fetch(`/font/outlines/${cut}.json`).then(response => {
      if (!response.ok) throw new Error(`outlines ${cut}: ${response.status}`)
      return response.json() as Promise<OutlineData>
    })
    pending.catch(() => cache.delete(cut))
    cache.set(cut, pending)
  }
  return pending
}

export type Skeleton = { nodes: [number, number][]; handles: [number, number, number, number][] }

/** On-curve nodes and Bézier handles of an absolute M/L/H/V/C/Q/Z path. */
export function skeleton(path: string): Skeleton {
  const nodes: [number, number][] = []
  const handles: [number, number, number, number][] = []
  let x = 0, y = 0, startX = 0, startY = 0
  for (const [, command, args] of path.matchAll(/([MLHVCQZ])([^MLHVCQZ]*)/g)) {
    const n = args.trim() ? args.trim().split(/[\s,]+/).map(Number) : []
    if (command === "M") { x = startX = n[0]; y = startY = n[1] }
    else if (command === "L") { x = n[0]; y = n[1] }
    else if (command === "H") x = n[0]
    else if (command === "V") y = n[0]
    else if (command === "C") { handles.push([x, y, n[0], n[1]], [n[4], n[5], n[2], n[3]]); x = n[4]; y = n[5] }
    else if (command === "Q") { handles.push([x, y, n[0], n[1]], [n[2], n[3], n[0], n[1]]); x = n[2]; y = n[3] }
    else { x = startX; y = startY; continue }
    nodes.push([x, y])
  }
  return { nodes, handles }
}
