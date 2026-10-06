import { effect, frameLoop, init, surface, type FrameLoopHandle, type Gpu } from "vgpu"
import shader from "./field.wgsl"

const PIXEL_BUDGET = 650_000
const FPS = 24

export function createAtmosphere(
  canvas: HTMLCanvasElement,
  callbacks: { ready(): void; unavailable(): void },
) {
  let disposed = false
  let gpu: Gpu | undefined
  let loop: FrameLoopHandle | undefined
  let resize: ResizeObserver | undefined
  let theme: MutationObserver | undefined
  let intersection: IntersectionObserver | undefined
  let removeErrorListener: (() => void) | undefined
  let visible = false
  let time = 0
  let lastFrame = 0
  let presented = false
  let reconcile = () => {}

  const onVisibility = () => reconcile()

  function dispose() {
    if (disposed) return
    disposed = true
    loop?.stop()
    resize?.disconnect()
    theme?.disconnect()
    intersection?.disconnect()
    removeErrorListener?.()
    document.removeEventListener("visibilitychange", onVisibility)
    canvas.dataset.running = "false"
    gpu?.dispose()
  }

  function unavailable() {
    if (disposed) return
    dispose()
    callbacks.unavailable()
  }

  async function start() {
    const context = await init({ powerPreference: "low-power", label: "Crafter atmosphere" })
    if (disposed) {
      context.dispose()
      return
    }
    gpu = context
    removeErrorListener = context.onError(() => queueMicrotask(unavailable))
    void context.gpu.lost.then(unavailable)

    const output = surface(context, canvas, {
      autoResize: false,
      dpr: 1,
      alphaMode: "premultiplied",
      clearColor: [0, 0, 0, 0],
      label: "Crafter transparent atmosphere",
    })
    const field = effect(context, shader, {
      label: "Crafter single-pass contours",
      set: { params: { time: 0, aspect: 1 }, ink: [1, 1, 1, 0.085] },
    })

    const measure = () => {
      const { width, height } = canvas.getBoundingClientRect()
      if (!width || !height) return
      // Resolution follows a pixel budget, not the screen's retina DPR.
      const scale = Math.min(1, Math.sqrt(PIXEL_BUDGET / (width * height)))
      output.resize([Math.max(1, Math.floor(width * scale)), Math.max(1, Math.floor(height * scale))])
      field.set({ params: { aspect: width / height } })
    }
    const palette = () => {
      const rgb = getComputedStyle(canvas).color.match(/[\d.]+/g)?.slice(0, 3).map(Number)
      if (rgb?.length === 3) field.set({ ink: [...rgb.map(value => value / 255), 0.085] })
    }
    measure()
    palette()
    await field.compile({ colors: [output.format] })
    if (disposed) return

    reconcile = () => {
      const running = visible && !document.hidden && !disposed
      if (running === Boolean(loop)) return
      if (!running) {
        loop?.stop()
        loop = undefined
        canvas.dataset.running = "false"
        return
      }
      lastFrame = performance.now()
      canvas.dataset.running = "true"
      loop = frameLoop(context, frame => {
        try {
          const now = performance.now()
          time += Math.min((now - lastFrame) / 1000, 0.1)
          lastFrame = now
          field.set({ params: { time } })
          frame.pass(output, field)
          if (!presented) {
            presented = true
            // frameLoop submits after this callback; read its completion then.
            queueMicrotask(() => {
              void frame.done.then(() => !disposed && callbacks.ready())
            })
          }
        } catch {
          queueMicrotask(unavailable)
        }
      }, { fps: FPS })
    }

    resize = new ResizeObserver(measure)
    resize.observe(canvas)
    theme = new MutationObserver(palette)
    theme.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })
    intersection = new IntersectionObserver(entries => {
      visible = entries.some(entry => entry.isIntersecting)
      reconcile()
    }, { threshold: 0 })
    intersection.observe(canvas)
    document.addEventListener("visibilitychange", onVisibility)
  }

  void start().catch(unavailable)
  return { dispose }
}
