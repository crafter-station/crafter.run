// Halftone fade masks: ink stays solid at the column edge and dissolves into shrinking dots outward.
// `side` is where the solid end sits.

const url = (svg: string) => `url("data:image/svg+xml,${encodeURIComponent(svg)}")`

// 1D screen for thin rules: dashes that thin out and space apart.
export function lineFade(side: "left" | "right", width = 520, pitch = 5) {
  const rects: string[] = []
  for (let x = 0; x < width; x += pitch) {
    const fromSolid = side === "left" ? x : width - x - pitch
    const k = Math.max(0, 1 - fromSolid / width) ** 1.6
    const w = pitch * Math.min(1, k * 1.15)
    if (w < 0.4) continue
    rects.push(`<rect x="${(x + (pitch - w) / 2).toFixed(2)}" y="0" width="${w.toFixed(2)}" height="1"/>`)
  }
  return url(`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="1" viewBox="0 0 ${width} 1" preserveAspectRatio="none">${rects.join("")}</svg>`)
}

// 2D screen at 45° for bands like the ticker.
export function bandFade(side: "left" | "right", width = 360, height = 72, pitch = 6, maxR = 3.8) {
  const dots: string[] = []
  for (let j = 0; j * (pitch / 2) <= height; j++) {
    const y = j * (pitch / 2)
    for (let i = -1; i * pitch < width + pitch; i++) {
      const x = i * pitch + (j % 2) * (pitch / 2)
      const fromSolid = side === "left" ? x : width - x
      const r = maxR * Math.max(0, 1 - fromSolid / width) ** 1.5
      if (r < 0.3) continue
      dots.push(`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(2)}"/>`)
    }
  }
  return url(`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">${dots.join("")}</svg>`)
}
