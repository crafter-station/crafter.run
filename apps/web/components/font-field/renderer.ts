// Browser lifecycle for the /font paper field. vgpu stays dynamically imported.
import type { Effect, Gpu, Surface } from "vgpu"
import source from "./field.wgsl"

type Rgba = [number, number, number, number]
export type FieldPalette = { background: Rgba; ink: Rgba; accent: Rgba }

export function createFieldRenderer({ canvas, palette, still }: { canvas: HTMLCanvasElement; palette: FieldPalette; still: boolean }) {
  let disposed = false
  let gpu: Gpu | undefined
  let surface: Surface | undefined
  let field: Effect | undefined
  let loop: { stop(): void } | undefined
  let visible = !document.hidden
  // The light rests near the top left until the pointer moves, then drifts after it.
  const pointer = { x: 0.25, y: 0.12, tx: 0.25, ty: 0.12, strength: 1, target: 1 }
  let lastWrite: number | undefined
  const started = performance.now()

  const onPointerMove = (event: PointerEvent) => {
    if (event.pointerType !== "mouse") return
    pointer.tx = event.clientX / Math.max(window.innerWidth, 1)
    pointer.ty = event.clientY / Math.max(window.innerHeight, 1)
    pointer.target = 1
  }
  const onPointerOut = (event: PointerEvent) => { if (event.relatedTarget === null) pointer.target = 0.6 }
  const onVisibility = () => { visible = !document.hidden; reconcile() }

  function write(time: number) {
    if (!field || !surface) return
    const [width, height] = surface.size
    // Time-based easing: the light trails the pointer by about a second at any refresh rate.
    const dt = lastWrite === undefined ? 1 : Math.min(0.1, time - lastWrite)
    lastWrite = time
    const follow = 1 - Math.exp(-dt * 2.5)
    pointer.x += (pointer.tx - pointer.x) * follow
    pointer.y += (pointer.ty - pointer.y) * follow
    pointer.strength += (pointer.target - pointer.strength) * follow
    field.set({ params: {
      ...palette,
      pointer: [pointer.x * width, pointer.y * height, pointer.strength, width / Math.max(canvas.clientWidth, 1)],
      frame: [width, height, time, 0],
    } })
  }

  async function reconcile() {
    if (!gpu || !surface || !field || disposed) return
    const run = visible && !still
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
    write(12)
    frame(gpu, f => f.pass(surface!, field!))
  }

  const ready = (async () => {
    const vgpu = await import("vgpu")
    const next = await vgpu.init()
    if (disposed) { next.dispose(); return }
    gpu = next
    // Soft lines do not need retina density; one device pixel keeps the shader cheap at 60fps.
    surface = vgpu.surface(gpu, canvas, { dpr: 1 })
    field = vgpu.effect(gpu, source)
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
    setPalette(next: FieldPalette) { palette = next; if (still) void drawStill() },
    dispose() {
      if (disposed) return
      disposed = true
      loop?.stop()
      window.removeEventListener("pointermove", onPointerMove)
      window.removeEventListener("pointerout", onPointerOut)
      document.removeEventListener("visibilitychange", onVisibility)
      gpu?.dispose()
    },
  }
}
