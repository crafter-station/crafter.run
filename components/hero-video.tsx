"use client"

import { useRef, useEffect } from "react"

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {})
    }
  }, [])

  return (
    <div className="absolute inset-0 z-0">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        poster="/effecto-poster.jpg"
        className="h-full w-full object-cover"
        aria-hidden="true"
      >
        <source src="/effecto.webm" type="video/webm" />
      </video>
    </div>
  )
}
