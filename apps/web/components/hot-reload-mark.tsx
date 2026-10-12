"use client"

import { useEffect, useRef } from "react"

// Crema position inside wordmark.png (1024px source)
const CX = 524
const CY = 356
const R = 122
const SIZE = 1024

export function HotReloadMark() {
  const crema = useRef<HTMLDivElement>(null)
  const boost = useRef(0)

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let base = 0
    let last = performance.now()
    let frame = 0
    const tick = (now: number) => {
      const dt = now - last
      last = now
      if (!reduce) base += dt * 0.006
      boost.current *= 0.94
      const angle = base + window.scrollY * 0.4 + (360 - boost.current)
      if (crema.current) crema.current.style.transform = `rotate(${angle}deg)`
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [])

  const spin = () => {
    boost.current += 360
  }

  return (
    <div className="hot-reload-mark" onMouseEnter={spin} onClick={spin}>
      {/* biome-ignore lint/performance/noImgElement: images are unoptimized site-wide */}
      <img src="/events/hot-reload/wordmark.webp" alt="Hot Reload" width={SIZE} height={SIZE} fetchPriority="high" />
      <div
        ref={crema}
        aria-hidden="true"
        className="hot-reload-crema"
        style={{
          left: `${((CX - R) / SIZE) * 100}%`,
          top: `${((CY - R) / SIZE) * 100}%`,
          width: `${((2 * R) / SIZE) * 100}%`,
          height: `${((2 * R) / SIZE) * 100}%`,
          backgroundImage: "url(/events/hot-reload/wordmark.webp)",
          backgroundSize: `${(SIZE / (2 * R)) * 100}%`,
          backgroundPosition: `${((CX - R) / (SIZE - 2 * R)) * 100}% ${((CY - R) / (SIZE - 2 * R)) * 100}%`,
        }}
      />
      <Steam />
    </div>
  )
}

const WISPS = [
  { d: "M40 150 C 28 120, 52 100, 40 72 S 28 30, 42 4", delay: "0s" },
  { d: "M60 150 C 72 122, 46 98, 60 70 S 74 28, 58 0", delay: "-1.6s" },
  { d: "M80 150 C 70 124, 92 102, 80 76 S 68 34, 82 8", delay: "-3.2s" },
]

function Steam() {
  return (
    <svg aria-hidden="true" viewBox="0 0 120 160" className="hot-reload-steam">
      <defs>
        <linearGradient id="steam-fade" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="var(--hr-ink)" stopOpacity="0" />
          <stop offset="0.35" stopColor="var(--hr-ink)" stopOpacity="0.55" />
          <stop offset="1" stopColor="var(--hr-ink)" stopOpacity="0" />
        </linearGradient>
        <filter id="steam-air" x="-50%" y="-20%" width="200%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.02 0.06" numOctaves="2" seed="3">
            <animate attributeName="baseFrequency" dur="9s" values="0.02 0.06;0.03 0.09;0.02 0.06" repeatCount="indefinite" />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" scale="12" />
          <feGaussianBlur stdDeviation="1.8" />
        </filter>
      </defs>
      <g filter="url(#steam-air)">
        {WISPS.map((w) => (
          <path key={w.d} d={w.d} fill="none" stroke="url(#steam-fade)" strokeWidth="7" strokeLinecap="round" style={{ animationDelay: w.delay }} />
        ))}
      </g>
    </svg>
  )
}
