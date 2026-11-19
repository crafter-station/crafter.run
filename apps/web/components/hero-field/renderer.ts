// Browser lifecycle for the hero halftone (Crafter knot or hack0 mark). vgpu stays dynamically imported.
import type { Effect, Gpu, Surface } from "vgpu"
import { BRAND_MARK_PATH } from "@/lib/brand"
import source from "./field.wgsl"

type Rgba = [number, number, number, number]
export type HeroFieldPalette = { background: Rgba; ink: Rgba }

const GRID = 192

/** A shape the halftone can take: how to draw it in a `box`-unit square, and where it sits on the canvas. */
export type HeroFieldShape = {
  box: number
  draw(ctx: CanvasRenderingContext2D): void
  /** Shape centre x, centre y, size and rotation, in canvas px. */
  place(width: number, height: number, narrow: boolean): [number, number, number, number]
}
export type HeroFieldShapeName = "knot" | "hack0"

const SHAPES: Record<HeroFieldShapeName, HeroFieldShape> = {
  // The knot sits behind the right half of the name; on phones it rises to the top right.
  knot: {
    box: 257,
    draw: ctx => ctx.fill(new Path2D(BRAND_MARK_PATH)),
    place: (width, height, narrow) => narrow
      ? [width * 1.02, height * 0.15, width * 1.05, -0.18]
      : [width * 0.8, height * 0.38, Math.min(height * 0.95, width * 0.56), -0.18],
  },
  // The hack0 mark (components/hack0-mark.tsx): a stadium outline broken by a slash.
  hack0: {
    box: 64,
    draw: ctx => {
      ctx.lineWidth = 8
      ctx.beginPath()
      ctx.roundRect(17, 6, 30, 52, 15)
      ctx.stroke()
      ctx.globalCompositeOperation = "destination-out"
      ctx.lineWidth = 15
      ctx.beginPath(); ctx.moveTo(10, 60); ctx.lineTo(54, 4); ctx.stroke()
      ctx.globalCompositeOperation = "source-over"
      ctx.lineWidth = 8
      ctx.lineCap = "square"
      ctx.beginPath(); ctx.moveTo(10, 60); ctx.lineTo(54, 4); ctx.stroke()
    },
    place: (width, height, narrow) => narrow
      ? [width * 0.74, height * 0.42, Math.min(height * 0.9, width * 0.95), 0]
      : [width * 0.8, height * 0.3, Math.min(height * 0.9, width * 0.38), 0],
  },
}

/** Signed distance to the shape on a GRID×GRID lattice, in shape units (negative inside). */
function shapeField(shape: HeroFieldShape): Float32Array {
  const canvas = document.createElement("canvas")
  canvas.width = canvas.height = GRID
  const ctx = canvas.getContext("2d")!
  const pad = GRID * 0.08
  const scale = (GRID - pad * 2) / shape.box
  ctx.translate(pad, pad)
  ctx.scale(scale, scale)
  shape.draw(ctx)
  const alpha = ctx.getImageData(0, 0, GRID, GRID).data
  const inside = new Uint8Array(GRID * GRID)
  for (let i = 0; i < inside.length; i++) inside[i] = alpha[i * 4 + 3] > 127 ? 1 : 0

  // Two-pass chamfer (1, √2) distance to the nearest cell of the opposite kind.
  const distanceTo = (target: number) => {
    const d = new Float32Array(GRID * GRID).fill(1e6)
    for (let i = 0; i < d.length; i++) if (inside[i] === target) d[i] = 0
    const at = (x: number, y: number) => d[y * GRID + x]
    for (let y = 0; y < GRID; y++) for (let x = 0; x < GRID; x++) {
      let v = d[y * GRID + x]
      if (x > 0) v = Math.min(v, at(x - 1, y) + 1)
      if (y > 0) v = Math.min(v, at(x, y - 1) + 1)
      if (x > 0 && y > 0) v = Math.min(v, at(x - 1, y - 1) + Math.SQRT2)
      if (x < GRID - 1 && y > 0) v = Math.min(v, at(x + 1, y - 1) + Math.SQRT2)
      d[y * GRID + x] = v
    }
    for (let y = GRID - 1; y >= 0; y--) for (let x = GRID - 1; x >= 0; x--) {
      let v = d[y * GRID + x]
      if (x < GRID - 1) v = Math.min(v, at(x + 1, y) + 1)
      if (y < GRID - 1) v = Math.min(v, at(x, y + 1) + 1)
      if (x < GRID - 1 && y < GRID - 1) v = Math.min(v, at(x + 1, y + 1) + Math.SQRT2)
      if (x > 0 && y < GRID - 1) v = Math.min(v, at(x - 1, y + 1) + Math.SQRT2)
      d[y * GRID + x] = v
    }
    return d
  }
  const toInside = distanceTo(1)
  const toOutside = distanceTo(0)
  const field = new Float32Array(GRID * GRID)
  for (let i = 0; i < field.length; i++) field[i] = (inside[i] ? -toOutside[i] : toInside[i]) / GRID
  return field
}

export function createHeroFieldRenderer({ canvas, palette, still, shape: shapeName = "knot", centered = false }: { canvas: HTMLCanvasElement; palette: HeroFieldPalette; still: boolean; shape?: HeroFieldShapeName; centered?: boolean }) {
  const shape = SHAPES[shapeName]
  let disposed = false
  let gpu: Gpu | undefined
  let surface: Surface | undefined
  let field: Effect | undefined
  let loop: { stop(): void } | undefined
  let visible = !document.hidden
  let onScreen = true
  const pointer = { x: -999, y: -999, tx: -999, ty: -999, strength: 0, target: 0 }
  let lastWrite: number | undefined
  const started = performance.now()

  const onPointerMove = (event: PointerEvent) => {
    if (event.pointerType !== "mouse") return
    const rect = canvas.getBoundingClientRect()
    pointer.tx = event.clientX - rect.left
    pointer.ty = event.clientY - rect.top
    if (pointer.x < -900) { pointer.x = pointer.tx; pointer.y = pointer.ty }
    pointer.target = 1
  }
  const onPointerOut = (event: PointerEvent) => { if (event.relatedTarget === null) pointer.target = 0 }
  const onVisibility = () => { visible = !document.hidden; void reconcile() }
  const observer = new IntersectionObserver(([entry]) => { onScreen = entry.isIntersecting; void reconcile() })
  observer.observe(canvas)

  function write(time: number) {
    if (!field || !surface) return
    const [width, height] = surface.size
    const dt = lastWrite === undefined ? 1 : Math.min(0.1, time - lastWrite)
    lastWrite = time
    const follow = 1 - Math.exp(-dt * 6)
    pointer.x += (pointer.tx - pointer.x) * follow
    pointer.y += (pointer.ty - pointer.y) * follow
    pointer.strength += (pointer.target - pointer.strength) * (1 - Math.exp(-dt * 3))
    const narrow = width < 760
    const knot = centered ? [width / 2, height / 2, Math.min(width, height) * 0.86, -0.18] as [number, number, number, number] : shape.place(width, height, narrow)
    field.set({ params: {
      ...palette,
      knot,
      pointer: [pointer.x, pointer.y, pointer.strength, narrow ? 7 : 9],
      frame: [width, height, time, GRID],
    } })
  }

  async function reconcile() {
    if (!gpu || !surface || !field || disposed) return
    const run = visible && onScreen && !still
    if (run === Boolean(loop)) return
    if (!run) { loop?.stop(); loop = undefined; return }
    const { frameLoop } = await import("vgpu")
    if (disposed || loop) return
    loop = frameLoop(gpu, frame => {
      write((performance.now() - started) / 1000)
      frame.pass(surface!, field!)
    })
  }

  async function drawStill() {
    if (!gpu || !surface || !field) return
    const { frame } = await import("vgpu")
    write(4)
    frame(gpu, f => f.pass(surface!, field!))
  }

  const ready = (async () => {
    const vgpu = await import("vgpu")
    const next = await vgpu.init()
    if (disposed) { next.dispose(); return }
    gpu = next
    surface = vgpu.surface(gpu, canvas, { dpr: 1 })
    const data = shapeField(shape)
    const buffer = vgpu.storage(gpu, data.byteLength, "read")
    buffer.write(data)
    field = vgpu.effect(gpu, source, { label: `hero-${shapeName}` })
    field.set({ sdf: buffer })
    write(0)
    if (disposed) return
    window.addEventListener("pointermove", onPointerMove, { passive: true })
    window.addEventListener("pointerout", onPointerOut, { passive: true })
    document.addEventListener("visibilitychange", onVisibility)
    if (still) {
      surface.onResize(() => void drawStill())
      await drawStill()
    }
    await reconcile()
  })()

  return {
    ready,
    setPalette(next: HeroFieldPalette) { palette = next; if (still) void drawStill() },
    dispose() {
      if (disposed) return
      disposed = true
      loop?.stop()
      observer.disconnect()
      window.removeEventListener("pointermove", onPointerMove)
      window.removeEventListener("pointerout", onPointerOut)
      document.removeEventListener("visibilitychange", onVisibility)
      gpu?.dispose()
    },
  }
}
