"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"

const modes = [
  { value: "light", label: "LGT" },
  { value: "dark", label: "DRK" },
  { value: "system", label: "SYS" },
] as const

type ThemeSwitcherProps = {
  className?: string
  label?: string
}

export function ThemeSwitcher({ className, label = "Theme" }: ThemeSwitcherProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // The server has no way to know the stored theme, so the labels only get
  // their active state after mount. Rendering them inert until then keeps the
  // markup identical on both sides instead of flashing the wrong one.
  useEffect(() => setMounted(true), [])

  return (
    <div className={className} role="group" aria-label={label}>
      {modes.map((mode) => (
        <button
          key={mode.value}
          type="button"
          onClick={() => setTheme(mode.value)}
          aria-pressed={mounted ? theme === mode.value : undefined}
          className={
            "px-2 transition-colors hover:text-foreground " +
            (mounted && theme === mode.value ? "text-foreground" : "text-muted-foreground")
          }
        >
          {mode.label}
        </button>
      ))}
    </div>
  )
}
