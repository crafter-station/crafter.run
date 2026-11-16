"use client"

import { useEffect, useRef } from "react"

/** Muted autoplay loop that stays on its poster frame under reduced motion. */
export function ClipVideo({ src, poster, width, height, label }: { src: string; poster?: string; width: number; height: number; label: string }) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = ref.current
    if (!video) return
    const query = window.matchMedia("(prefers-reduced-motion: reduce)")
    const sync = () => {
      if (query.matches) video.pause()
      else void video.play().catch(() => {})
    }
    sync()
    query.addEventListener("change", sync)
    return () => query.removeEventListener("change", sync)
  }, [])

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      width={width}
      height={height}
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={label}
    />
  )
}
