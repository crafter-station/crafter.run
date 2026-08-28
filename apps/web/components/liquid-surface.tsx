"use client"

import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { cn } from "@/lib/utils"

/**
 * A height-field water simulation rendered to a WebGL canvas, refracting
 * whatever a caller paints onto a 2D canvas underneath it.
 *
 * Two ping-ponged float render targets hold the wave state: `x` is pressure,
 * `y` is velocity, and `zw` is the local gradient. The render pass reads that
 * gradient as a surface normal, offsets the painted texture by it, and adds a
 * specular highlight, which is what reads as water rather than as a blur.
 *
 * The painted layer is a callback rather than an image so the same surface can
 * carry the brand mark on the home page and a 404 on the error page.
 *
 * Three rasters are in play and they are deliberately different sizes. The
 * canvas is the element's CSS box, the painted texture is that box in device
 * pixels so type and logos stay crisp, and the wave field is a device
 * independent raster (see `SIM_PIXEL_RATIO`) so the water looks the same on a
 * Retina laptop and a 1x monitor instead of running at four times the cost on
 * one of them.
 */

const simulationVertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

const simulationFragmentShader = `
uniform sampler2D textureA;
uniform vec2 mouse;
uniform vec2 resolution;
uniform float impactStrength;
uniform float impactRadius;
uniform float time;
uniform int frame;
varying vec2 vUv;

const float delta = 1.4;

void main() {
  vec2 uv = vUv;
  if (frame == 0) {
    gl_FragColor = vec4(0.0);
    return;
  }

  vec4 data = texture2D(textureA, uv);
  float pressure = data.x;
  float pVel = data.y;

  vec2 texelSize = 1.0 / resolution;
  float p_right = texture2D(textureA, uv + vec2(texelSize.x, 0.0)).x;
  float p_left = texture2D(textureA, uv + vec2(-texelSize.x, 0.0)).x;
  float p_up = texture2D(textureA, uv + vec2(0.0, texelSize.y)).x;
  float p_down = texture2D(textureA, uv + vec2(0.0, -texelSize.y)).x;

  if (uv.x <= texelSize.x) p_left = p_right;
  if (uv.x >= 1.0 - texelSize.x) p_right = p_left;
  if (uv.y <= texelSize.y) p_down = p_up;
  if (uv.y >= 1.0 - texelSize.y) p_up = p_down;

  pVel += delta * (-2.0 * pressure + p_right + p_left) / 4.0;
  pVel += delta * (-2.0 * pressure + p_up + p_down) / 4.0;

  pressure += delta * pVel;

  pVel -= 0.005 * delta * pressure;

  pVel *= 1.0 - 0.002 * delta;
  pressure *= 0.999;

  vec2 mouseUV = mouse / resolution;
  if (mouse.x > 0.0) {
    // Measured against the short edge, so an impact is a circle on screen
    // rather than an ellipse stretched by whatever shape the surface is.
    vec2 offset = (uv - mouseUV) * resolution / min(resolution.x, resolution.y);
    // smoothstep, not a linear cone: a cone has a cusp at its apex, and the
    // render pass reads the slope there, which is what shreds the painted
    // layer instead of dimpling it.
    pressure += impactStrength * smoothstep(impactRadius, 0.0, length(offset));
  }

  gl_FragColor = vec4(pressure, pVel,
    (p_right - p_left) / 2.0,
    (p_up - p_down) / 2.0);
}
`

const renderVertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

const renderFragmentShader = `
uniform sampler2D textureA;
uniform sampler2D textureB;
// How far the wave field was shrunk to fit its budget. The gradient it stores
// is a difference between neighbouring texels, so a coarser field resolves the
// same ripple over fewer of them and reports a steeper slope; scaling by the
// same ratio keeps refraction the same strength at any field size, which is
// what stops a capped field from tearing the painted layer instead of
// rippling it.
uniform float gradientScale;
varying vec2 vUv;

void main() {
  vec4 data = texture2D(textureA, vUv);
  vec2 slope = data.zw * gradientScale;
  vec2 distortion = 0.3 * slope;
  vec4 color = texture2D(textureB, vUv + distortion);

  vec3 normal = normalize(vec3(-slope.x * 2.0, 0.5, -slope.y * 2.0));
  vec3 lightDir = normalize(vec3(-3.0, 10.0, 3.0));
  float specular = pow(max(0.0, dot(normal, lightDir)), 60.0) * 1.5;

  gl_FragColor = color + vec4(specular);
}
`

/**
 * Straight copy, used to carry the wave field into a freshly sized target.
 * It has to be a pass-through: these texels are physics, not colour.
 */
const copyFragmentShader = `
uniform sampler2D source;
varying vec2 vUv;

void main() {
  gl_FragColor = texture2D(source, vUv);
}
`

/*
 * How hard the surface is hit, and how wide, as a fraction of its short edge.
 * A dragged pointer is a continuous trail, so it stays tight and firm; an idle
 * drop lands once and should read as rain, which means broad and soft.
 */
const POINTER_IMPACT = { strength: 0.9, radius: 0.03 }
const DROP_IMPACT = { strength: 1.3, radius: 0.05 }
const TAP_IMPACT = { strength: 1.8, radius: 0.04 }

/**
 * A pointer only disturbs the water while it is moving. Holding still over the
 * surface would otherwise pump pressure into one texel every frame for as long
 * as the cursor sat there, which does not settle into a ripple, it detonates.
 */
const POINTER_HOLD_FRAMES = 2
/** Long enough that a pause reads as a pause, short enough that rain returns. */
const POINTER_IDLE_FRAMES = 90

/** Frames a drop keeps injecting pressure. Two is a splash, not a stream. */
const DROP_FRAMES = 2
/** Roughly one to two seconds at 60fps: alive, but not a loading spinner. */
const DROP_MIN_GAP = 70
const DROP_GAP_JITTER = 60

/**
 * The wave field is sized in CSS pixels times this, never in device pixels, so
 * a ripple is the same size on every display. Two keeps the detail a Retina
 * screen was already getting.
 */
const SIM_PIXEL_RATIO = 2
/**
 * Ceiling on the wave field's long edge. Above it the extra texels buy nothing
 * a viewer can see and cost a full float ping-pong every frame; phones get the
 * tighter budget because they have the least to spend.
 */
const SIM_MAX_EDGE = 1536
const SIM_MAX_EDGE_COARSE = 1024

/**
 * One simulation step per 1/60s. Without it the water runs at double speed on
 * a 120Hz display, because every rule in the shader is written per frame.
 */
const SIM_STEP_SECONDS = 1 / 60
/** A backgrounded tab must not fast-forward the pond when it comes back. */
const MAX_FRAME_SECONDS = 0.1

/**
 * Two float targets and a device-pixel canvas are expensive to reallocate, and
 * a window drag fires resize on every frame. Rebuild at most this often; the
 * canvas element itself is stretched in between, which nobody notices for a
 * tenth of a second.
 */
const RESIZE_SETTLE_MS = 120

/** Keeps the simulation off the CPU while the surface is far off screen. */
const OFFSCREEN_MARGIN = "256px 0px"

export type IdleDropState = { nextDropFrame: number; dropUntilFrame: number }

export function createIdleDropState(): IdleDropState {
  // The field is flat for the first frames anyway, so the opening drop waits
  // long enough for the painted layer to be on screen behind it.
  return { nextDropFrame: 40, dropUntilFrame: 0 }
}

/**
 * Decides what an idle frame does to the injection point. The simulation only
 * adds pressure where `mouse` points, so a drop is that point held for a
 * couple of frames and then cleared. Pure, and mutating `state` in place, so
 * the animation loop stays allocation-free and this stays testable.
 */
export function stepIdleDrops(
  frame: number,
  state: IdleDropState,
  random: () => number,
): { drop: boolean; clear: boolean } {
  if (frame >= state.nextDropFrame) {
    state.dropUntilFrame = frame + DROP_FRAMES
    state.nextDropFrame = frame + DROP_MIN_GAP + Math.floor(random() * DROP_GAP_JITTER)
    return { drop: true, clear: false }
  }

  return { drop: false, clear: frame >= state.dropUntilFrame }
}

export type LiquidThemeColors = {
  background: string
  foreground: string
  muted: string
  accent: string
}

export type LiquidPaintContext = {
  ctx: CanvasRenderingContext2D
  /** Device pixels, not CSS pixels: scale type and spacing by `dpr`. */
  width: number
  height: number
  dpr: number
  /**
   * Viewport width in CSS pixels, which is what a media query measures. A
   * painter that picks a layout has to branch on this and not on its own box,
   * or a bordered or inset container puts it one breakpoint behind the CSS it
   * is supposed to be mirroring.
   */
  viewportWidth: number
  colors: LiquidThemeColors
  /** Images requested through the `images` prop, once decoded. */
  images: Record<string, HTMLImageElement>
}

/**
 * Where the painter put its subject, in fractions of the surface with `y`
 * running down the way CSS does. Idle drops land inside it, so the ripples
 * read as rain on the mark instead of on empty water.
 */
export type LiquidFocus = { x: number; y: number; radius: number }

export type LiquidPaint = (context: LiquidPaintContext) => LiquidFocus | void

export function LiquidSurface({
  paint,
  images,
  className,
  idleDrops = false,
}: {
  paint: LiquidPaint
  /** Image URLs keyed by the name the painter looks them up under. */
  images?: Record<string, string>
  className?: string
  /**
   * Drop ripples on their own while the pointer is still. Without this the
   * surface is flat until someone moves a cursor over it, which reads as a
   * broken image on touch devices.
   */
  idleDrops?: boolean
}) {
  const containerRef = useRef<HTMLDivElement>(null)

  // The painter closes over render props and would otherwise tear down the
  // whole simulation on every parent render. The effect reads the latest one
  // through a ref instead.
  const paintRef = useRef(paint)
  paintRef.current = paint

  const imageSources = JSON.stringify(images ?? {})

  // A lost GPU context cannot be revived in place, and every buffer below it
  // is gone with it. Rebuilding the whole effect is the only honest recovery,
  // and it is rare enough that a restart costs nothing.
  const [generation, setGeneration] = useState(0)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduceMotion) return

    // Fine pointers drive the water directly. Coarse ones cannot hover, so a
    // finger would only ever drag the page; they get taps and idle drops.
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches
    const simMaxEdge = coarsePointer ? SIM_MAX_EDGE_COARSE : SIM_MAX_EDGE

    type SurfaceSize = {
      cssWidth: number
      cssHeight: number
      dpr: number
      paintWidth: number
      paintHeight: number
      simWidth: number
      simHeight: number
      simFit: number
    }

    const measure = (): SurfaceSize => {
      const rect = container.getBoundingClientRect()
      const cssWidth = Math.max(1, rect.width)
      const cssHeight = Math.max(1, rect.height)
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const simFit = Math.min(
        1,
        simMaxEdge / (SIM_PIXEL_RATIO * Math.max(cssWidth, cssHeight)),
      )
      return {
        cssWidth,
        cssHeight,
        dpr,
        paintWidth: Math.max(1, Math.round(cssWidth * dpr)),
        paintHeight: Math.max(1, Math.round(cssHeight * dpr)),
        simWidth: Math.max(1, Math.round(cssWidth * SIM_PIXEL_RATIO * simFit)),
        simHeight: Math.max(1, Math.round(cssHeight * SIM_PIXEL_RATIO * simFit)),
        simFit,
      }
    }

    let size = measure()

    const scene = new THREE.Scene()
    const simScene = new THREE.Scene()
    const copyScene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      // One full-screen quad has no geometry edges to smooth, and nothing ever
      // reads the buffer back, so both of these would be pure cost.
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: "high-performance",
    })
    renderer.setPixelRatio(size.dpr)
    renderer.setSize(size.cssWidth, size.cssHeight, false)
    renderer.domElement.style.display = "block"
    renderer.domElement.style.width = "100%"
    renderer.domElement.style.height = "100%"
    container.appendChild(renderer.domElement)

    /* Float targets are not universally renderable or filterable. WebGL2 needs
       EXT_color_buffer_float to render to RGBA32F and OES_texture_float_linear
       to sample it with a linear filter, and Safari has historically shipped
       one without the other, which silently yields a black or hot-pixel field.
       RGBA16F is filterable in core WebGL2, so it is the honest fallback. */
    const floatIsRenderable = renderer.extensions.has("EXT_color_buffer_float")
    const floatIsFilterable = renderer.extensions.has("OES_texture_float_linear")
    const rtType =
      floatIsRenderable && floatIsFilterable ? THREE.FloatType : THREE.HalfFloatType
    const rtOptions = {
      format: THREE.RGBAFormat,
      type: rtType,
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      stencilBuffer: false,
      depthBuffer: false,
    }
    let rtA = new THREE.WebGLRenderTarget(size.simWidth, size.simHeight, rtOptions)
    let rtB = new THREE.WebGLRenderTarget(size.simWidth, size.simHeight, rtOptions)

    const mouse = new THREE.Vector2()

    const simMaterial = new THREE.ShaderMaterial({
      uniforms: {
        textureA: { value: null },
        mouse: { value: mouse },
        resolution: { value: new THREE.Vector2(size.simWidth, size.simHeight) },
        impactStrength: { value: POINTER_IMPACT.strength },
        impactRadius: { value: POINTER_IMPACT.radius },
        time: { value: 0 },
        frame: { value: 0 },
      },
      vertexShader: simulationVertexShader,
      fragmentShader: simulationFragmentShader,
      depthTest: false,
      depthWrite: false,
    })

    const renderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        textureA: { value: null },
        textureB: { value: null },
        gradientScale: { value: size.simFit },
      },
      vertexShader: renderVertexShader,
      fragmentShader: renderFragmentShader,
      transparent: true,
      depthTest: false,
      depthWrite: false,
    })

    const copyMaterial = new THREE.ShaderMaterial({
      uniforms: { source: { value: null } },
      vertexShader: simulationVertexShader,
      fragmentShader: copyFragmentShader,
      depthTest: false,
      depthWrite: false,
    })

    const plane = new THREE.PlaneGeometry(2, 2)
    simScene.add(new THREE.Mesh(plane, simMaterial))
    scene.add(new THREE.Mesh(plane, renderMaterial))
    copyScene.add(new THREE.Mesh(plane, copyMaterial))

    const offscreen = document.createElement("canvas")
    offscreen.width = size.paintWidth
    offscreen.height = size.paintHeight
    const ctx = offscreen.getContext("2d", { alpha: true })!

    const paintedTexture = new THREE.CanvasTexture(offscreen)
    paintedTexture.minFilter = THREE.LinearFilter
    paintedTexture.magFilter = THREE.LinearFilter
    paintedTexture.format = THREE.RGBAFormat

    const loadedImages: Record<string, HTMLImageElement> = {}

    const readThemeColors = (): LiquidThemeColors => {
      const styles = getComputedStyle(document.documentElement)
      const read = (token: string, fallback: string) =>
        `hsl(${styles.getPropertyValue(token).trim() || fallback})`
      return {
        background: read("--background", "0 0% 100%"),
        foreground: read("--foreground", "0 0% 0%"),
        muted: read("--muted-foreground", "0 0% 42%"),
        accent: read("--accent", "0 0% 8%"),
      }
    }

    let themeColors = readThemeColors()
    let focus: LiquidFocus | null = null

    const repaint = () => {
      ctx.clearRect(0, 0, size.paintWidth, size.paintHeight)
      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = "high"
      focus =
        paintRef.current({
          ctx,
          width: size.paintWidth,
          height: size.paintHeight,
          dpr: size.dpr,
          viewportWidth: window.innerWidth,
          colors: themeColors,
          images: loadedImages,
        }) ?? null

      // Whatever the painter left transparent becomes the page background,
      // so a painter only has to draw its subject.
      ctx.save()
      ctx.globalCompositeOperation = "destination-over"
      ctx.fillStyle = themeColors.background
      ctx.fillRect(0, 0, size.paintWidth, size.paintHeight)
      ctx.restore()

      paintedTexture.needsUpdate = true
    }

    let frame = 0
    let disposed = false
    let contextLost = false

    // Real pointer movement always wins over the idle drops.
    let pointerActive = false
    let pointerMovedAtFrame = 0
    let dropState = createIdleDropState()

    /** Injection point in wave-field texels, with `y` running up as UV does. */
    const injectAt = (
      fractionX: number,
      fractionY: number,
      impact: { strength: number; radius: number },
    ) => {
      mouse.set(fractionX * size.simWidth, (1 - fractionY) * size.simHeight)
      simMaterial.uniforms.impactStrength.value = impact.strength
      simMaterial.uniforms.impactRadius.value = impact.radius
    }

    const nextDropPoint = () => {
      if (!focus) {
        return { x: 0.2 + Math.random() * 0.6, y: 0.2 + Math.random() * 0.6 }
      }
      // Uniform over the disc rather than over the radius, or every drop
      // clusters in the middle of the mark.
      const angle = Math.random() * Math.PI * 2
      const distance = Math.sqrt(Math.random()) * focus.radius
      return {
        x: Math.min(0.96, Math.max(0.04, focus.x + Math.cos(angle) * distance)),
        y: Math.min(0.96, Math.max(0.04, focus.y + Math.sin(angle) * distance)),
      }
    }

    const step = () => {
      if (pointerActive) {
        const still = frame - pointerMovedAtFrame
        if (still >= POINTER_IDLE_FRAMES) {
          releasePointer()
        } else if (still >= POINTER_HOLD_FRAMES && mouse.x > 0) {
          mouse.set(0, 0)
        }
      }

      if (!pointerActive) {
        const drops = stepIdleDrops(frame, dropState, Math.random)
        if (drops.drop) {
          if (idleDrops) {
            const point = nextDropPoint()
            injectAt(point.x, point.y, DROP_IMPACT)
          }
        } else if (drops.clear && mouse.x > 0) {
          mouse.set(0, 0)
        }
      }

      simMaterial.uniforms.frame.value = frame++
      simMaterial.uniforms.time.value = performance.now() / 1000

      simMaterial.uniforms.textureA.value = rtA.texture
      renderer.setRenderTarget(rtB)
      renderer.render(simScene, camera)

      renderMaterial.uniforms.textureA.value = rtB.texture
      renderMaterial.uniforms.textureB.value = paintedTexture
      renderer.setRenderTarget(null)
      renderer.render(scene, camera)

      const tmp = rtA
      rtA = rtB
      rtB = tmp
    }

    let animationId: number | null = null
    let running = false
    let lastTime = 0
    let accumulator = 0

    const animate = (now: number) => {
      animationId = requestAnimationFrame(animate)
      accumulator += Math.min((now - lastTime) / 1000, MAX_FRAME_SECONDS)
      lastTime = now
      if (accumulator < SIM_STEP_SECONDS) return
      // Never run more than one step per frame: catching up on a stall would
      // spend the frame budget replaying ripples nobody saw.
      accumulator = Math.min(accumulator - SIM_STEP_SECONDS, SIM_STEP_SECONDS)
      step()
    }

    // A surface scrolled past, or a tab in the background, has no business
    // holding a GPU at 60fps.
    let documentVisible = !document.hidden
    let onScreen = true

    const syncRunning = () => {
      const shouldRun = documentVisible && onScreen && !contextLost && !disposed
      if (shouldRun === running) return
      running = shouldRun
      if (shouldRun) {
        lastTime = performance.now()
        accumulator = 0
        animationId = requestAnimationFrame(animate)
      } else if (animationId !== null) {
        cancelAnimationFrame(animationId)
        animationId = null
      }
    }

    const onVisibilityChange = () => {
      documentVisible = !document.hidden
      if (!documentVisible) releasePointer()
      syncRunning()
    }

    function releasePointer() {
      if (!pointerActive) return
      pointerActive = false
      dropState = createIdleDropState()
      mouse.set(0, 0)
    }

    /* A high polling rate mouse reports far more often than the page paints,
       and every report would otherwise read layout back out of the document.
       The box only moves when the page scrolls or reflows, so it is cached
       until one of those says otherwise. */
    let cachedRect: DOMRect | null = null
    const invalidateRect = () => {
      cachedRect = null
    }
    const surfaceRect = () => {
      cachedRect ??= container.getBoundingClientRect()
      return cachedRect
    }

    /* The pointer is tracked on the window, not on the canvas. Everything a
       caller lays over the water, headline, buttons, scrims, sits between the
       cursor and the canvas, so a canvas-only listener would drop the ripple
       the moment it mattered most. */
    const onPointerMove = (event: PointerEvent) => {
      if (coarsePointer || !event.isPrimary) return
      const rect = surfaceRect()
      if (rect.width <= 0 || rect.height <= 0) return
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
        releasePointer()
        return
      }
      pointerActive = true
      pointerMovedAtFrame = frame
      injectAt(x / rect.width, y / rect.height, POINTER_IMPACT)
    }

    // A tap is a splash. The listener is passive and never calls
    // preventDefault, so the same finger still scrolls the page.
    const onPointerDown = (event: PointerEvent) => {
      if (!coarsePointer || !event.isPrimary) return
      const rect = surfaceRect()
      if (rect.width <= 0 || rect.height <= 0) return
      const x = (event.clientX - rect.left) / rect.width
      const y = (event.clientY - rect.top) / rect.height
      if (x < 0 || y < 0 || x > 1 || y > 1) return
      injectAt(x, y, TAP_IMPACT)
      dropState.dropUntilFrame = frame + DROP_FRAMES
    }

    const onBlur = () => releasePointer()

    window.addEventListener("pointermove", onPointerMove, { passive: true })
    window.addEventListener("scroll", invalidateRect, { passive: true, capture: true })
    window.addEventListener("blur", onBlur)
    document.addEventListener("visibilitychange", onVisibilityChange)
    renderer.domElement.addEventListener("pointerdown", onPointerDown, { passive: true })

    const onContextLost = (event: Event) => {
      // Without preventDefault the browser never sends a restore event and the
      // surface stays a dead rectangle for the life of the page.
      event.preventDefault()
      contextLost = true
      syncRunning()
    }
    const onContextRestored = () => {
      if (disposed) return
      setGeneration((value) => value + 1)
    }
    renderer.domElement.addEventListener("webglcontextlost", onContextLost)
    renderer.domElement.addEventListener("webglcontextrestored", onContextRestored)

    let settleTimer: ReturnType<typeof setTimeout> | null = null
    let lastResizeAt = 0

    const applyResize = () => {
      lastResizeAt = performance.now()
      invalidateRect()
      const next = measure()
      const paintChanged =
        next.paintWidth !== size.paintWidth || next.paintHeight !== size.paintHeight
      const simChanged =
        next.simWidth !== size.simWidth || next.simHeight !== size.simHeight
      if (!paintChanged && !simChanged && next.dpr === size.dpr) return

      size = next
      renderer.setPixelRatio(next.dpr)
      renderer.setSize(next.cssWidth, next.cssHeight, false)

      if (simChanged) {
        /* Resizing a render target in place throws the wave field away, and a
           surface that wipes itself every time a window edge moves reads as a
           bug. Carry it into the new raster instead, which looks like the
           camera pulling back rather than the water being reset. */
        const nextA = new THREE.WebGLRenderTarget(next.simWidth, next.simHeight, rtOptions)
        const nextB = new THREE.WebGLRenderTarget(next.simWidth, next.simHeight, rtOptions)
        copyMaterial.uniforms.source.value = rtA.texture
        renderer.setRenderTarget(nextA)
        renderer.render(copyScene, camera)
        renderer.setRenderTarget(null)
        rtA.dispose()
        rtB.dispose()
        rtA = nextA
        rtB = nextB
        simMaterial.uniforms.resolution.value.set(next.simWidth, next.simHeight)
        renderMaterial.uniforms.gradientScale.value = next.simFit
      }

      if (paintChanged) {
        offscreen.width = next.paintWidth
        offscreen.height = next.paintHeight
        // A CanvasTexture caches the upload it made at the old dimensions;
        // dropping the GPU copy is what forces three.js to re-read the canvas.
        paintedTexture.dispose()
      }

      repaint()
    }

    /* Leading edge, then a cooldown. A one-off resize, an orientation change,
       devtools opening, lands instantly; a window being dragged rebuilds a few
       times a second instead of sixty. */
    const requestResize = () => {
      if (settleTimer !== null) return
      const wait = RESIZE_SETTLE_MS - (performance.now() - lastResizeAt)
      if (wait <= 0) {
        applyResize()
        return
      }
      settleTimer = setTimeout(() => {
        settleTimer = null
        if (!disposed) applyResize()
      }, wait)
    }

    const resizeObserver = new ResizeObserver(() => {
      invalidateRect()
      requestResize()
    })
    resizeObserver.observe(container)

    const intersectionObserver =
      typeof IntersectionObserver === "undefined"
        ? null
        : new IntersectionObserver(
            (entries) => {
              const entry = entries[entries.length - 1]
              if (!entry) return
              onScreen = entry.isIntersecting
              if (!onScreen) releasePointer()
              syncRunning()
            },
            { rootMargin: OFFSCREEN_MARGIN, threshold: 0 },
          )
    intersectionObserver?.observe(container)

    const themeObserver = new MutationObserver(() => {
      themeColors = readThemeColors()
      repaint()
    })
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "style"],
    })

    repaint()
    syncRunning()

    // Web fonts land after first paint, so canvas text would otherwise bake in
    // a fallback face for the life of the page.
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        if (!disposed) repaint()
      })
    }

    const sources: Record<string, string> = JSON.parse(imageSources)
    for (const [name, src] of Object.entries(sources)) {
      const img = new window.Image()
      img.decoding = "async"
      // The surface is the largest thing above the fold wherever it is used,
      // so its art should not queue behind the rest of the page.
      img.setAttribute("fetchpriority", "high")
      img.src = src
      img
        .decode()
        .then(() => {
          if (disposed) return
          loadedImages[name] = img
          repaint()
        })
        .catch(() => {
          // A missing image is a painter's problem, not a reason to tear the
          // water down; every painter already guards on the image being there.
        })
    }

    return () => {
      disposed = true
      if (animationId !== null) cancelAnimationFrame(animationId)
      if (settleTimer !== null) clearTimeout(settleTimer)
      resizeObserver.disconnect()
      intersectionObserver?.disconnect()
      themeObserver.disconnect()
      window.removeEventListener("pointermove", onPointerMove)
      window.removeEventListener("scroll", invalidateRect, { capture: true })
      window.removeEventListener("blur", onBlur)
      document.removeEventListener("visibilitychange", onVisibilityChange)
      renderer.domElement.removeEventListener("pointerdown", onPointerDown)
      // Removed before the context is dropped on purpose: forcing the loss
      // below would otherwise fire our own handler and remount forever.
      renderer.domElement.removeEventListener("webglcontextlost", onContextLost)
      renderer.domElement.removeEventListener("webglcontextrestored", onContextRestored)
      try {
        renderer.domElement.parentNode?.removeChild(renderer.domElement)
      } catch {}
      rtA.dispose()
      rtB.dispose()
      paintedTexture.dispose()
      simMaterial.dispose()
      renderMaterial.dispose()
      copyMaterial.dispose()
      plane.dispose()
      renderer.dispose()
      // Browsers cap how many live WebGL contexts a page may hold, and a
      // disposed renderer keeps its own until the GC gets around to it.
      if (!contextLost) renderer.forceContextLoss()
    }
  }, [imageSources, idleDrops, generation])

  return (
    <div
      ref={containerRef}
      aria-hidden
      className={cn("absolute inset-0 overflow-hidden", className)}
    />
  )
}
