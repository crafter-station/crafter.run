"use client"

import { useEffect, useState } from "react"

import { type BadgePrints, HotReloadBadgeStage } from "@/components/hot-reload-badge-stage"
import type { BadgeVariant } from "@/lib/hot-reload-badge"

/** A published badge: the stored prints on the attendee's lanyard. */
export function HotReloadBadgeView({ design: url, ...props }: {
  design: string; prints: BadgePrints; variant: BadgeVariant; name: string
  labels: Record<"front" | "back" | "view3d" | "viewFlat" | "flip", string>
}) {
  const [design, setDesign] = useState(null)
  useEffect(() => {
    fetch(url).then((response) => response.json()).then(setDesign, () => {})
  }, [url])
  return <HotReloadBadgeStage design={design} {...props} />
}
