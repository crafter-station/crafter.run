"use client"

import { useEffect, useState } from "react"

const EVENT = "hot-reload:game"
// Static web build of the dotframe game (crafter-games/espresso), copied in with `dotframe build web`.
const SRC = "/events/hot-reload/espresso/index.html"

/* G opens Espresso perfecto over the page; Escape or the close button folds it away. */
export function HotReloadGame({ title, close }: { title: string; close: string }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement
      if (target.closest("input, textarea, select, [contenteditable]")) return
      if (e.key === "Escape") setOpen(false)
      if (e.key.toLowerCase() !== "g" || e.altKey || e.shiftKey || e.metaKey || e.ctrlKey) return
      e.preventDefault()
      setOpen(true)
    }
    const onOpen = () => setOpen(true)
    window.addEventListener("keydown", onKey)
    window.addEventListener(EVENT, onOpen)
    return () => {
      window.removeEventListener("keydown", onKey)
      window.removeEventListener(EVENT, onOpen)
    }
  }, [])

  useEffect(() => {
    if (!open) return
    const overflow = document.documentElement.style.overflow
    document.documentElement.style.overflow = "hidden"
    return () => {
      document.documentElement.style.overflow = overflow
    }
  }, [open])

  if (!open) return null

  return (
    <div className="hot-reload-game" role="dialog" aria-modal="true" aria-label={title}>
      <iframe src={SRC} title={title} allow="autoplay" onLoad={(e) => e.currentTarget.focus()} />
      <button type="button" className="hot-reload-game-close" onClick={() => setOpen(false)}>
        {close} ✕
      </button>
    </div>
  )
}

export function HotReloadGameTrigger({ press, touch }: { press: string; touch: string }) {
  return (
    <button type="button" className="hot-reload-trigger" onClick={() => window.dispatchEvent(new Event(EVENT))}>
      <span className="hot-reload-trigger-key">{press}</span>
      <span className="hot-reload-trigger-touch">{touch}</span>
    </button>
  )
}
