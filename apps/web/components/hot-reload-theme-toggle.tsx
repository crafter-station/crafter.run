"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

const MODES = ["system", "light", "dark"] as const

export function HotReloadThemeToggle({ label, names }: { label: string; names: Record<(typeof MODES)[number], string> }) {
  const { theme, setTheme } = useTheme()
  const [ready, setReady] = useState(false)
  useEffect(() => setReady(true), [])
  const current = ready ? theme ?? "system" : "system"
  return (
    <div role="radiogroup" aria-label={label} className="hot-reload-toggle">
      {MODES.map((mode) => (
        <button key={mode} type="button" role="radio" aria-checked={current === mode} onClick={() => setTheme(mode)}>
          {names[mode]}
        </button>
      ))}
    </div>
  )
}
