"use client"

import { HotReloadMark } from "@/components/hot-reload-mark"

/** The Hot Reload espresso mark in a compact tile; hover or click spins the crema. */
export function BadgeDemo({ edition }: { edition: string }) {
  return (
    <div className="wb-badge">
      <div className="wb-badge-mark"><HotReloadMark /></div>
      <p className="wb-badge-meta"><span>{edition}</span><span>Lima</span></p>
    </div>
  )
}
