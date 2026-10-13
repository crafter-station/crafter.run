"use client"

import { lazy, Suspense, useEffect, useMemo, useRef, useState } from "react"

import { type BadgeVariant, badgeVariants } from "@/lib/hot-reload-badge"

const renderer = () => import("@/vendor/makeables-renderer/index.js")
const PrismBadge = lazy(() => renderer().then((module) => ({ default: module.PrismBadge })))

type Design = { front: { background: string }; back: { background: string } } & Record<string, unknown>
export type BadgePrints = { front: string; back: string }
type Labels = Record<"front" | "back" | "view3d" | "viewFlat" | "flip", string>

/** The 3D badge shows the pressed prints as-is: each face becomes one full-bleed image layer of the design. */
function BadgeModel({ design, prints, variant, name, flip, onReady }: {
  design: Design; prints: BadgePrints; variant: BadgeVariant; name: string; flip: string; onReady: () => void
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
        onStatus={(status) => status !== "loading" && onReady()}
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
  const shown = stamping ? "3d" : view
  const loaded = scenes.some((scene) => scene.ready)
  return (
    <div className="hot-reload-badge-stage">
      <div className="hot-reload-badge-scene">
        {shown === "3d" && !loaded ? <BadgeLoading label={labels.printing} /> : null}
        {shown === "3d" && design && prints ? (
          <div className="hot-reload-badge-swing" data-hit={hit ? "" : undefined}>
            {scenes.map((scene) => (
              <div key={scene.id} className="hot-reload-badge-layer" data-ready={scene.ready ? "" : undefined}>
                <Suspense fallback={null}>
                  <BadgeModel design={design} prints={prints} variant={scene.variant} name={name} flip={labels.flip} onReady={() => ready(scene.id)} />
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
