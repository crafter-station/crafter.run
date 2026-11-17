"use client"

import { type ComponentPropsWithoutRef, useEffect, useRef } from "react"

/** Looping muted clip. With prefers-reduced-motion it never autoplays and shows controls instead. */
export function ShipVideo(props: ComponentPropsWithoutRef<"video">) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = ref.current
    if (!video) return
    const query = window.matchMedia("(prefers-reduced-motion: reduce)")
    const apply = () => {
      if (query.matches) {
        video.autoplay = false
        video.pause()
        video.controls = true
      } else {
        video.controls = false
        void video.play().catch(() => {})
      }
    }
    apply()
    query.addEventListener("change", apply)
    return () => query.removeEventListener("change", apply)
  }, [])

  // biome-ignore lint/a11y/useMediaCaption: decorative clips have no audio track
  return <video ref={ref} {...props} />
}
