// Halftone gradient: a 45° dot screen whose dots shrink away from the viewport edge.
const W = 300
const H = 720
const PITCH = 9
const MAX_R = 3.6

function tile(side: "left" | "right") {
  const dots: string[] = []
  for (let j = 0; j * (PITCH / 2) <= H; j++) {
    const y = j * (PITCH / 2)
    for (let i = 0; i * PITCH < W + PITCH; i++) {
      const x = i * PITCH + (j % 2) * (PITCH / 2)
      const fromEdge = side === "left" ? x : W - x
      const fade = Math.max(0, 1 - fromEdge / W) ** 2.6
      const wave = 0.8 + 0.2 * Math.sin((y / H) * Math.PI * 2)
      const r = MAX_R * fade * wave
      if (r < 0.35) continue
      dots.push(`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(2)}"/>`)
    }
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">${dots.join("")}</svg>`
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`
}

export function HotReloadEdges() {
  return (
    <>
      {(["left", "right"] as const).map((side) => (
        <div
          key={side}
          aria-hidden="true"
          className="hot-reload-edge"
          style={{ [side]: 0, maskImage: tile(side), maskRepeat: "repeat-y", WebkitMaskImage: tile(side), WebkitMaskRepeat: "repeat-y" }}
        />
      ))}
    </>
  )
}
