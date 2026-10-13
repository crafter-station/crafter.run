"use client"

import { type ReactNode, useEffect, useState } from "react"

import { type BadgePrints, type BadgeView, HotReloadBadgeStage, HotReloadBadgeViews } from "@/components/hot-reload-badge-stage"
import type { BadgeVariant } from "@/lib/hot-reload-badge"

/** A published badge: the stored prints on the attendee's lanyard, with the page heading and sharing in the rail. */
export function HotReloadBadgeView({ design: url, prints, variant, name, labels, children }: {
  design: string; prints: BadgePrints; variant: BadgeVariant; name: string
  labels: Record<"front" | "back" | "view3d" | "viewFlat" | "flip" | "printing", string>
  children: ReactNode
}) {
  const [design, setDesign] = useState(null)
  const [view, setView] = useState<BadgeView>("3d")
  useEffect(() => {
    fetch(url).then((response) => response.json()).then(setDesign, () => {})
  }, [url])
  return (
    <div className="hot-reload-badge-editor">
      <HotReloadBadgeStage design={design} prints={prints} variant={variant} name={name} labels={labels} view={view} />
      <div className="hot-reload-badge-controls">
        <HotReloadBadgeViews view={view} onChange={setView} labels={labels} />
        {children}
      </div>
    </div>
  )
}
