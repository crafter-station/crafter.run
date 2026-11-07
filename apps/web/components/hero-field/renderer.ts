// Browser lifecycle for the landing hero's knot halftone. vgpu stays dynamically imported.
import type { Effect, Gpu, Surface } from "vgpu"
import { BRAND_MARK_PATH } from "@/lib/brand"
import source from "./field.wgsl"

type Rgba = [number, number, number, number]
export type HeroFieldPalette = { background: Rgba; ink: Rgba }

const GRID = 192

/** Signed distance to the knot on a GRID×GRID lattice, in knot units (negative inside). */
function knotField(): Float32Array {
  const canvas = document.createElement("canvas")
  canvas.width = canvas.height = GRID
  const ctx = canvas.getContext("2d")!
  const pad = GRID * 0.08
  const scale = (GRID - pad * 2) / 257
  ctx.translate(pad, pad)
  ctx.scale(scale, scale)
  ctx.fill(new Path2D(BRAND_MARK_PATH))
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

export function createHeroFieldRenderer({ canvas, palette, still }: { canvas: HTMLCanvasElement; palette: HeroFieldPalette; still: boolean }) {
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
    // The knot sits behind the right half of the name; on phones it rises to the top right.
    const knot = narrow
      ? [width * 1.02, height * 0.15, width * 1.05, -0.18]
      : [width * 0.8, height * 0.38, Math.min(height * 0.95, width * 0.56), -0.18]
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
    const data = knotField()
    const buffer = vgpu.storage(gpu, data.byteLength, "read")
    buffer.write(data)
    field = vgpu.effect(gpu, source, { label: "hero-knot" })
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
