"use client"

import { type CSSProperties, lazy, Suspense, useEffect, useMemo, useRef, useState } from "react"

import { type BadgeVariant, badgeVariants } from "@/lib/hot-reload-badge"

const renderer = () => import("@/vendor/makeables-renderer/index.js")
const PrismBadge = lazy(() => renderer().then((module) => ({ default: module.PrismBadge })))

type Design = { front: { background: string }; back: { background: string } } & Record<string, unknown>
export type BadgePrints = { front: string; back: string }
type Labels = Record<"front" | "back" | "view3d" | "viewFlat" | "flip", string>

/** The 3D badge shows the pressed prints as-is: each face becomes one full-bleed image layer of the design. */
function BadgeModel({ design, prints, variant, name, flip, onReady, onFallback }: {
  design: Design; prints: BadgePrints; variant: BadgeVariant; name: string; flip: string; onReady: () => void; onFallback: () => void
}) {
  const [appearance, setAppearance] = useState<Record<string, unknown> | null>(null)
  const document = useMemo(() => {
    const face = (side: "front" | "back") => ({
      background: design[side].background,
      layers: [{ kind: "image", id: `print-${side}`, asset: `print-${side}`, x: 0, y: 0, w: 1024, h: 1536, opacity: 1, fit: "cover", radius: 0 }],
    })
    return { ...design, material: badgeVariants[variant], assets: {}, front: face("front"), back: face("back") }
  }, [design, variant])
  useEffect(() => {
    renderer().then((module) => setAppearance(module.designAppearance(document)))
  }, [document])
  if (!appearance) return null
  return (
    <div className="hot-reload-badge-model" title={flip}>
      <PrismBadge
        data={{ name, role: "", number: 0, eventName: "Hot Reload", document, portraitUrl: "", imageUrls: { "print-front": prints.front, "print-back": prints.back } }}
        appearance={appearance}
        assetsBaseUrl="/events/hot-reload/badge/prism"
        onStatus={(status) => (status === "fallback" ? onFallback() : status === "ready" && onReady())}
      />
    </div>
  )
}

/** Placeholder card while the 3D scene and the print load, so the stage never reads as empty. */
function BadgeLoading({ label }: { label: string }) {
  return (
    <div className="hot-reload-badge-loading" role="status">
      <span className="hot-reload-badge-loading-strap" />
      <span className="hot-reload-badge-loading-card"><span /></span>
      <span className="hot-reload-caps">{label}</span>
    </div>
  )
}

/** The Makeables symbol: five rounded arms with two pill eyes, from makeables `components/brand/mark.tsx`. */
function MakeablesMark() {
  return (
    <svg viewBox="-4 -4 108 112" aria-hidden="true">
      <mask id="hr-makeables-mark" maskUnits="userSpaceOnUse" x="-10" y="-10" width="120" height="130">
        <g fill="#fff">
          {[0, 72, 144, 216, 288].map((angle) => (
            <rect key={angle} x="37.5" y="6" width="25" height="46" rx="12.5" transform={`rotate(${angle} 50 52)`} />
          ))}
          <circle cx="50" cy="52" r="15" />
        </g>
        <g fill="#000">
          {[43.3, 56.7].map((x) => <rect key={x} x={x - 3.6} y="41.5" width="7.2" height="13" rx="3.6" />)}
        </g>
      </mask>
      <rect x="-10" y="-10" width="120" height="130" fill="currentColor" mask="url(#hr-makeables-mark)" />
    </svg>
  )
}

/** A faint diagonal billboard behind the badge: who made it. */
export function MakeablesWall() {
  const row = Array.from({ length: 6 }, (_, i) => (
    <span key={i}>
      <MakeablesMark />
      makeables.dev
    </span>
  ))
  return (
    <div className="hot-reload-badge-wall" aria-hidden="true">
      <div>{Array.from({ length: 9 }, (_, i) => <p key={i}>{row}</p>)}</div>
    </div>
  )
}

/**
 * Without a working 3D renderer: the same prints as a hung card built in CSS. Ribbon in the lanyard's
 * colors, a soft shadow, light sheen, a tilt that follows the pointer, and a click to flip.
 */
function BadgeCard({ prints, variant, flip }: { prints: BadgePrints; variant: BadgeVariant; flip: string }) {
  const [back, setBack] = useState(false)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const material = badgeVariants[variant]
  return (
    <div className="hot-reload-badge-card-scene">
      <span className="hot-reload-badge-card-strap" style={{ background: material.strap, color: material.lanyard.ink }}>
        {"text" in material.lanyard ? <span>{material.lanyard.text}</span> : null}
      </span>
      <span className="hot-reload-badge-card-clasp" />
      <button
        type="button"
        className="hot-reload-badge-card"
        title={flip}
        aria-label={flip}
        data-back={back ? "" : undefined}
        style={{ "--tilt-x": `${tilt.y * -8}deg`, "--tilt-y": `${tilt.x * 10}deg` } as CSSProperties}
        onClick={() => setBack((side) => !side)}
        onPointerMove={(event) => {
          const box = event.currentTarget.getBoundingClientRect()
          setTilt({ x: (event.clientX - box.left) / box.width - 0.5, y: (event.clientY - box.top) / box.height - 0.5 })
        }}
        onPointerLeave={() => setTilt({ x: 0, y: 0 })}
      >
        {(["front", "back"] as const).map((side) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={side} className={`hot-reload-badge-card-${side}`} src={prints[side]} width={1024} height={1536} alt="" />
        ))}
        <span className="hot-reload-badge-card-sheen" />
      </button>
    </div>
  )
}

export type BadgeView = "3d" | "flat"

export function HotReloadBadgeViews({ view, onChange, disabled, labels }: {
  view: BadgeView; onChange: (view: BadgeView) => void; disabled?: boolean; labels: Record<"view3d" | "viewFlat", string>
}) {
  return (
    <div className="hot-reload-badge-views hot-reload-caps" role="tablist">
      {(["3d", "flat"] as const).map((option) => (
        <button key={option} type="button" role="tab" aria-selected={view === option} disabled={disabled} onClick={() => onChange(option)}>
          {option === "3d" ? labels.view3d : labels.viewFlat}
        </button>
      ))}
    </div>
  )
}

/** Rubber stamp that drops on the card; `onImpact` fires when it hits, so the print can switch to the stamped one. */
function Stamper({ onImpact, onDone }: { onImpact: () => void; onDone: () => void }) {
  const callbacks = useRef({ onImpact, onDone })
  callbacks.current = { onImpact, onDone }
  useEffect(() => {
    // Timings match the `hot-reload-stamp` keyframes: the rubber touches the card at 620 ms.
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const impact = setTimeout(() => callbacks.current.onImpact(), still ? 0 : 620)
    const done = setTimeout(() => callbacks.current.onDone(), still ? 0 : 1500)
    return () => {
      clearTimeout(impact)
      clearTimeout(done)
    }
  }, [])
  return (
    // Seen from the camera: the stamp travels toward the card along the view axis, rubber face flat on the print.
    <div className="hot-reload-stamper" aria-hidden="true">
      <span className="hot-reload-stamper-shadow" />
      <svg viewBox="0 0 200 200">
        <defs>
          <radialGradient id="hr-stamp-base" cx="0.4" cy="0.35" r="0.7">
            <stop offset="0" stopColor="#b5875a" />
            <stop offset="0.7" stopColor="#7a5332" />
            <stop offset="1" stopColor="#4d3420" />
          </radialGradient>
          <radialGradient id="hr-stamp-knob" cx="0.38" cy="0.32" r="0.75">
            <stop offset="0" stopColor="#d1a577" />
            <stop offset="0.6" stopColor="#8e623a" />
            <stop offset="1" stopColor="#57391f" />
          </radialGradient>
          <linearGradient id="hr-stamp-collar" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#e6e2d8" />
            <stop offset="0.5" stopColor="#8f8b82" />
            <stop offset="1" stopColor="#d4d0c6" />
          </linearGradient>
        </defs>
        <circle cx="100" cy="100" r="96" fill="#1c1b17" />
        <circle cx="100" cy="100" r="90" fill="url(#hr-stamp-base)" />
        <circle cx="100" cy="100" r="54" fill="url(#hr-stamp-collar)" />
        <circle cx="100" cy="100" r="46" fill="url(#hr-stamp-knob)" />
        <ellipse cx="86" cy="84" rx="16" ry="11" fill="#fff" opacity="0.28" />
      </svg>
    </div>
  )
}

export function HotReloadBadgeStage({ design, prints, variant, name, labels, view, stamping, onImpact, onStamped }: {
  design: Design | null; prints: BadgePrints | null; variant: BadgeVariant; name: string
  labels: Record<"front" | "back" | "flip" | "printing", string>
  view: BadgeView; stamping?: boolean; onImpact?: () => void; onStamped?: () => void
}) {
  const [hit, setHit] = useState(false)
  // One scene per lanyard: a new lanyard loads under the current one and fades in once it renders.
  const [scenes, setScenes] = useState<{ id: number; variant: BadgeVariant; ready: boolean }[]>([{ id: 0, variant, ready: false }])
  useEffect(() => {
    setScenes((current) => {
      const last = current.at(-1)
      return last?.variant === variant ? current : [...current, { id: (last?.id ?? 0) + 1, variant, ready: false }]
    })
  }, [variant])
  const ready = (id: number) =>
    setScenes((current) => current.map((scene) => (scene.id === id && !scene.ready ? { ...scene, ready: true } : scene)))
  // Drop the scenes under the newest rendered one once its fade-in (0.4s) has finished.
  useEffect(() => {
    const newest = scenes.findLastIndex((scene) => scene.ready)
    if (newest <= 0) return
    const timer = setTimeout(() => setScenes((current) => current.slice(current.findLastIndex((scene) => scene.ready))), 450)
    return () => clearTimeout(timer)
  }, [scenes])
  // `?badge=card` previews the CSS card on a device that does render 3D.
  const [fallback, setFallback] = useState(false)
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("badge") === "card") setFallback(true)
  }, [])
  // The canvas spans the whole viewport width, centred on the stage so the card stays centred:
  // a swung or dragged card is never cut at a canvas edge.
  const scene = useRef<HTMLDivElement>(null)
  const [bounds, setBounds] = useState<CSSProperties>({})
  useEffect(() => {
    const element = scene.current
    if (!element) return
    const measure = () => {
      const box = element.getBoundingClientRect()
      const center = box.left + box.width / 2
      const width = 2 * Math.max(center, window.innerWidth - center)
      setBounds({ left: center - width / 2 - box.left, width })
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(element)
    window.addEventListener("resize", measure)
    return () => {
      observer.disconnect()
      window.removeEventListener("resize", measure)
    }
  }, [])
  const shown = stamping ? "3d" : view
  const loaded = scenes.some((scene) => scene.ready)
  const newest = scenes.findLastIndex((scene) => scene.ready)
  return (
    <div className="hot-reload-badge-stage">
      <div ref={scene} className="hot-reload-badge-scene">
        {shown === "3d" && !loaded && !fallback ? <BadgeLoading label={labels.printing} /> : null}
        {shown === "3d" && fallback && prints ? (
          <div className="hot-reload-badge-swing" style={bounds} data-hit={hit ? "" : undefined}>
            <BadgeCard prints={prints} variant={variant} flip={labels.flip} />
            {stamping ? (
              <Stamper
                onImpact={() => {
                  setHit(true)
                  setTimeout(() => setHit(false), 900)
                  onImpact?.()
                }}
                onDone={() => onStamped?.()}
              />
            ) : null}
          </div>
        ) : null}
        {shown === "3d" && !fallback && design && prints ? (
          <div className="hot-reload-badge-swing" style={bounds} data-hit={hit ? "" : undefined}>
            {scenes.map((scene, index) => (
              <div key={scene.id} className="hot-reload-badge-layer" data-ready={scene.ready ? "" : undefined} data-leaving={index < newest ? "" : undefined}>
                <Suspense fallback={null}>
                  <BadgeModel design={design} prints={prints} variant={scene.variant} name={name} flip={labels.flip} onReady={() => ready(scene.id)} onFallback={() => setFallback(true)} />
                </Suspense>
              </div>
            ))}
            {stamping ? (
              <Stamper
                onImpact={() => {
                  setHit(true)
                  setTimeout(() => setHit(false), 900)
                  onImpact?.()
                }}
                onDone={() => onStamped?.()}
              />
            ) : null}
          </div>
        ) : null}
        {shown === "flat" && prints ? (
          <div className="hot-reload-badge-faces">
            {(["front", "back"] as const).map((side) => (
              <figure key={side}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="hot-reload-badge-slot hot-reload-badge-face" src={prints[side]} width={1024} height={1536} alt={labels[side]} />
                <figcaption className="hot-reload-caps">{labels[side]}</figcaption>
              </figure>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  )
}
