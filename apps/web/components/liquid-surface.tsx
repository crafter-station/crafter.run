"use client"

import { useEffect, useRef } from "react"
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
    float dist = distance(uv, mouseUV);
    if (dist <= 0.02) {
      pressure += 2.0 * (1.0 - dist / 0.02);
    }
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
varying vec2 vUv;

void main() {
  vec4 data = texture2D(textureA, vUv);
  vec2 distortion = 0.3 * data.zw;
  vec4 color = texture2D(textureB, vUv + distortion);

  vec3 normal = normalize(vec3(-data.z * 2.0, 0.5, -data.w * 2.0));
  vec3 lightDir = normalize(vec3(-3.0, 10.0, 3.0));
  float specular = pow(max(0.0, dot(normal, lightDir)), 60.0) * 1.5;

  gl_FragColor = color + vec4(specular);
}
`

/** Frames a drop keeps injecting pressure. Two is a splash, not a stream. */
const DROP_FRAMES = 2
/** Roughly one to two seconds at 60fps: alive, but not a loading spinner. */
const DROP_MIN_GAP = 70
const DROP_GAP_JITTER = 60

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
  colors: LiquidThemeColors
  /** Images requested through the `images` prop, once decoded. */
  images: Record<string, HTMLImageElement>
}

export type LiquidPaint = (context: LiquidPaintContext) => void

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

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduceMotion) return

    let dpr = Math.min(window.devicePixelRatio || 1, 2)
    let cssWidth = container.clientWidth || 1
    let cssHeight = container.clientHeight || 1
    let width = Math.max(1, Math.floor(cssWidth * dpr))
    let height = Math.max(1, Math.floor(cssHeight * dpr))

    const scene = new THREE.Scene()
    const simScene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true,
    })
    renderer.setPixelRatio(dpr)
    renderer.setSize(cssWidth, cssHeight, false)
    renderer.domElement.style.display = "block"
    renderer.domElement.style.width = "100%"
    renderer.domElement.style.height = "100%"
    container.appendChild(renderer.domElement)

    const supportsFloat = renderer.extensions.get("OES_texture_float") != null
    const rtType =
      renderer.capabilities.isWebGL2 || supportsFloat
        ? THREE.FloatType
        : THREE.HalfFloatType
    const rtOptions = {
      format: THREE.RGBAFormat,
      type: rtType,
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      stencilBuffer: false,
      depthBuffer: false,
    }
    let rtA = new THREE.WebGLRenderTarget(width, height, rtOptions)
    let rtB = new THREE.WebGLRenderTarget(width, height, rtOptions)

    const mouse = new THREE.Vector2()

    const simMaterial = new THREE.ShaderMaterial({
      uniforms: {
        textureA: { value: null },
        mouse: { value: mouse },
        resolution: { value: new THREE.Vector2(width, height) },
        time: { value: 0 },
        frame: { value: 0 },
      },
      vertexShader: simulationVertexShader,
      fragmentShader: simulationFragmentShader,
    })

    const renderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        textureA: { value: null },
        textureB: { value: null },
      },
      vertexShader: renderVertexShader,
      fragmentShader: renderFragmentShader,
      transparent: true,
    })

    const plane = new THREE.PlaneGeometry(2, 2)
    const simQuad = new THREE.Mesh(plane, simMaterial)
    const renderQuad = new THREE.Mesh(plane, renderMaterial)
    simScene.add(simQuad)
    scene.add(renderQuad)

    const offscreen = document.createElement("canvas")
    offscreen.width = width
    offscreen.height = height
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

    const repaint = () => {
      ctx.clearRect(0, 0, width, height)
      paintRef.current({ ctx, width, height, dpr, colors: themeColors, images: loadedImages })

      // Whatever the painter left transparent becomes the page background,
      // so a painter only has to draw its subject.
      ctx.save()
      ctx.globalCompositeOperation = "destination-over"
      ctx.fillStyle = themeColors.background
      ctx.fillRect(0, 0, width, height)
      ctx.restore()

      paintedTexture.needsUpdate = true
    }

    let frame = 0
    let animationId: number | null = null

    // Real pointer movement always wins over the idle drops.
    let pointerActive = false
    let dropState = createIdleDropState()

    const animate = () => {
      if (idleDrops && !pointerActive) {
        const step = stepIdleDrops(frame, dropState, Math.random)
        if (step.drop) {
          mouse.set(width * (0.2 + Math.random() * 0.6), height * (0.2 + Math.random() * 0.6))
        } else if (step.clear && mouse.x > 0) {
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

      animationId = requestAnimationFrame(animate)
    }

    const onPointerMove = (e: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect()
      pointerActive = true
      mouse.x = (e.clientX - rect.left) * dpr
      mouse.y = (rect.height - (e.clientY - rect.top)) * dpr
    }
    const onPointerLeave = () => {
      pointerActive = false
      dropState = createIdleDropState()
      mouse.set(0, 0)
    }

    renderer.domElement.addEventListener("pointermove", onPointerMove)
    renderer.domElement.addEventListener("pointerleave", onPointerLeave)

    let resizeRaf: number | null = null
    const applyResize = () => {
      resizeRaf = null
      const nextCssWidth = container.clientWidth || 1
      const nextCssHeight = container.clientHeight || 1
      const nextDpr = Math.min(window.devicePixelRatio || 1, 2)
      const nextWidth = Math.max(1, Math.floor(nextCssWidth * nextDpr))
      const nextHeight = Math.max(1, Math.floor(nextCssHeight * nextDpr))

      if (nextWidth === width && nextHeight === height && nextDpr === dpr) return

      cssWidth = nextCssWidth
      cssHeight = nextCssHeight
      dpr = nextDpr
      width = nextWidth
      height = nextHeight

      renderer.setPixelRatio(dpr)
      renderer.setSize(cssWidth, cssHeight, false)
      rtA.setSize(width, height)
      rtB.setSize(width, height)
      simMaterial.uniforms.resolution.value.set(width, height)

      offscreen.width = width
      offscreen.height = height

      // Restart the simulation so the wave field doesn't read stale buffers
      // sampled at the previous resolution (causes hot-pixel artifacts).
      frame = 0
      simMaterial.uniforms.frame.value = 0
      dropState = createIdleDropState()

      repaint()
      // CanvasTexture caches its image; reassign so three.js re-uploads at
      // the new dimensions on the next animate() tick.
      paintedTexture.image = offscreen
      paintedTexture.needsUpdate = true
    }
    const ro = new ResizeObserver(() => {
      if (resizeRaf !== null) cancelAnimationFrame(resizeRaf)
      resizeRaf = requestAnimationFrame(applyResize)
    })
    ro.observe(container)

    const themeObserver = new MutationObserver(() => {
      themeColors = readThemeColors()
      repaint()
    })
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "style"],
    })

    let disposed = false

    repaint()
    animate()

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
      img.onload = () => {
        if (disposed) return
        loadedImages[name] = img
        repaint()
      }
      img.src = src
    }

    return () => {
      disposed = true
      if (animationId !== null) cancelAnimationFrame(animationId)
      if (resizeRaf !== null) cancelAnimationFrame(resizeRaf)
      ro.disconnect()
      themeObserver.disconnect()
      renderer.domElement.removeEventListener("pointermove", onPointerMove)
      renderer.domElement.removeEventListener("pointerleave", onPointerLeave)
      try {
        renderer.domElement.parentNode?.removeChild(renderer.domElement)
      } catch {}
      rtA.dispose()
      rtB.dispose()
      paintedTexture.dispose()
      simMaterial.dispose()
      renderMaterial.dispose()
      plane.dispose()
      renderer.dispose()
    }
  }, [imageSources, idleDrops])

  return <div ref={containerRef} aria-hidden className={cn("absolute inset-0", className)} />
}
