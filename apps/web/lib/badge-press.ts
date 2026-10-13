// Soft letterpress pass over a rendered badge face: stochastic ink/sun dither in the midtones,
// solid ink with pores, speckled paper and grain. Port of the `press.cjs` that produced the approved ed. 01 art.
type Rect = readonly [x: number, y: number, w: number, h: number]

const INK = [28, 27, 23]
const SUN = [249, 226, 142]

const inside = (x: number, y: number, [a, b, w, h]: Rect) => x >= a && x < a + w && y >= b && y < b + h

export function pressBadge(source: HTMLCanvasElement, { photo, protect = [] }: { photo?: Rect; protect?: readonly Rect[] }) {
  const { width, height } = source
  const raw = source.getContext("2d")!.getImageData(0, 0, width, height)
  const data = raw.data
  let seed = 7
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647
  for (let p = 0, i = 0; i < data.length; i += 4, p++) {
    const x = p % width
    const y = (p / width) | 0
    if (protect.some((rect) => inside(x, y, rect))) continue
    const r = data[i], g = data[i + 1], b = data[i + 2]
    const l = (0.299 * r + 0.587 * g + 0.114 * b) / 255
    let c: number[]
    if (l < 0.12) c = rnd() < 0.035 ? [r + 150, g + 145, b + 130] : INK
    else if (l > 0.86) c = photo && inside(x, y, photo) && r - b < 30 ? SUN : rnd() < 0.005 ? INK : [r, g, b]
    else c = l < 0.2 + rnd() * 0.62 ? INK : SUN
    const n = (rnd() - 0.5) * 6
    data[i] = c[0] + n
    data[i + 1] = c[1] + n
    data[i + 2] = c[2] + n
    data[i + 3] = 255
  }
  const flat = document.createElement("canvas")
  flat.width = width
  flat.height = height
  flat.getContext("2d")!.putImageData(raw, 0, 0)
  const out = document.createElement("canvas")
  out.width = width
  out.height = height
  const ctx = out.getContext("2d")!
  ctx.filter = "blur(0.35px)"
  ctx.drawImage(flat, 0, 0)
  return out
}
