"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"
import { cn } from "@/lib/utils"

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

export function LiquidHero({
  imagePath = "/brand/cs_liquid_2.png",
  className,
  fillFactor = 0.5,
}: {
  imagePath?: string
  className?: string
  fillFactor?: number
}) {
  const containerRef = useRef<HTMLDivElement>(null)

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

    const textTexture = new THREE.CanvasTexture(offscreen)
    textTexture.minFilter = THREE.LinearFilter
    textTexture.magFilter = THREE.LinearFilter
    textTexture.format = THREE.RGBAFormat

    let logoImg: HTMLImageElement | null = null

    const readThemeColors = () => {
      const styles = getComputedStyle(document.documentElement)
      const bg = styles.getPropertyValue("--background").trim() || "0 0% 100%"
      const fg = styles.getPropertyValue("--foreground").trim() || "0 0% 0%"
      return { bg: `hsl(${bg})`, fg: `hsl(${fg})` }
    }

    let themeColors = readThemeColors()

    const paintCanvas = (w: number, h: number) => {
      ctx.clearRect(0, 0, w, h)
      if (!logoImg || !logoImg.complete || logoImg.naturalWidth === 0) {
        ctx.fillStyle = themeColors.bg
        ctx.fillRect(0, 0, w, h)
        textTexture.needsUpdate = true
        return
      }
      const canvasAspect = w / h
      const imageAspect = logoImg.width / logoImg.height || 1
      let logoW: number
      let logoH: number
      if (imageAspect > canvasAspect) {
        logoW = w * fillFactor
        logoH = logoW / imageAspect
      } else {
        logoH = h * fillFactor
        logoW = logoH * imageAspect
      }
      const logoX = (w - logoW) / 2
      const logoY = (h - logoH) / 2

      // Draw the image as-is.
      ctx.drawImage(logoImg, logoX, logoY, logoW, logoH)

      // Fill the theme background behind anything still transparent.
      ctx.save()
      ctx.globalCompositeOperation = "destination-over"
      ctx.fillStyle = themeColors.bg
      ctx.fillRect(0, 0, w, h)
      ctx.restore()

      textTexture.needsUpdate = true
    }

    let frame = 0
    let animationId: number | null = null

    const animate = () => {
      simMaterial.uniforms.frame.value = frame++
      simMaterial.uniforms.time.value = performance.now() / 1000

      simMaterial.uniforms.textureA.value = rtA.texture
      renderer.setRenderTarget(rtB)
      renderer.render(simScene, camera)

      renderMaterial.uniforms.textureA.value = rtB.texture
      renderMaterial.uniforms.textureB.value = textTexture
      renderer.setRenderTarget(null)
      renderer.render(scene, camera)

      const tmp = rtA
      rtA = rtB
      rtB = tmp

      animationId = requestAnimationFrame(animate)
    }

    const onMouseMove = (e: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect()
      mouse.x = (e.clientX - rect.left) * dpr
      mouse.y = (rect.height - (e.clientY - rect.top)) * dpr
    }
    const onMouseLeave = () => {
      mouse.set(0, 0)
    }

    renderer.domElement.addEventListener("pointermove", onMouseMove)
    renderer.domElement.addEventListener("pointerleave", onMouseLeave)

    let resizeRaf: number | null = null
    const applyResize = () => {
      resizeRaf = null
      const nextCssWidth = container.clientWidth || 1
      const nextCssHeight = container.clientHeight || 1
      const nextDpr = Math.min(window.devicePixelRatio || 1, 2)
      const nextWidth = Math.max(1, Math.floor(nextCssWidth * nextDpr))
      const nextHeight = Math.max(1, Math.floor(nextCssHeight * nextDpr))

      if (
        nextWidth === width &&
        nextHeight === height &&
        nextDpr === dpr
      ) {
        return
      }

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

      paintCanvas(width, height)
      // CanvasTexture caches its image; reassign so three.js re-uploads at
      // the new dimensions on the next animate() tick.
      textTexture.image = offscreen
      textTexture.needsUpdate = true
    }
    const ro = new ResizeObserver(() => {
      if (resizeRaf !== null) cancelAnimationFrame(resizeRaf)
      resizeRaf = requestAnimationFrame(applyResize)
    })
    ro.observe(container)

    const themeObserver = new MutationObserver(() => {
      themeColors = readThemeColors()
      paintCanvas(width, height)
    })
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "style"],
    })

    paintCanvas(width, height)

    const img = new window.Image()
    img.decoding = "async"
    img.onload = () => {
      logoImg = img
      paintCanvas(width, height)
      animate()
    }
    img.onerror = () => {
      animate()
    }
    img.src = imagePath

    return () => {
      if (animationId !== null) cancelAnimationFrame(animationId)
      if (resizeRaf !== null) cancelAnimationFrame(resizeRaf)
      ro.disconnect()
      themeObserver.disconnect()
      renderer.domElement.removeEventListener("pointermove", onMouseMove)
      renderer.domElement.removeEventListener("pointerleave", onMouseLeave)
      try {
        renderer.domElement.parentNode?.removeChild(renderer.domElement)
      } catch {}
      rtA.dispose()
      rtB.dispose()
      textTexture.dispose()
      simMaterial.dispose()
      renderMaterial.dispose()
      plane.dispose()
      renderer.dispose()
    }
  }, [imagePath, fillFactor])

  return (
    <div
      ref={containerRef}
      aria-hidden
      className={cn("absolute inset-0", className)}
    />
  )
}
