"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Sun, Moon, Monitor, ChevronDown } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { type Locale } from "@/lib/i18n"
import { stationCopy } from "@/lib/station-copy"
import { cn } from "@/lib/utils"

const modes = [
  { value: "light", icon: Sun },
  { value: "dark", icon: Moon },
  { value: "system", icon: Monitor },
] as const

type ThemeSwitcherProps = {
  className?: string
  label?: string
  locale?: Locale
  compact?: boolean
}

export function ThemeSwitcher({ className, label = "Theme", locale = "en", compact = false }: ThemeSwitcherProps) {
  const t = stationCopy[locale]
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const mode = mounted ? modes.find((mode) => mode.value === theme)?.value ?? "system" : "system"

  // The server has no way to know the stored theme, so the labels only get
  // their active state after mount. Rendering them inert until then keeps the
  // markup identical on both sides instead of flashing the wrong one.
  useEffect(() => setMounted(true), [])

  const Icon = mounted && theme === "light" ? Sun : mounted && theme === "dark" ? Moon : Monitor

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={label}
        className={cn(
          "inline-flex items-center justify-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground",
          compact && "station-control",
          className,
        )}
      >
        <Icon className="size-4" strokeWidth={1.6} aria-hidden="true" />
        <span className={compact ? "station-control-label" : "font-label text-xs"}>{t[mode]}</span>
        <ChevronDown className="station-control-chevron size-3" aria-hidden="true" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align={compact ? "start" : "end"} side="bottom" sideOffset={6} collisionPadding={12} className="station-preference-menu">
        <DropdownMenuGroup>
          <DropdownMenuRadioGroup value={mounted ? theme : ""} onValueChange={setTheme}>
            <DropdownMenuLabel>{label}</DropdownMenuLabel>
            {modes.map((mode) => {
              const ModeIcon = mode.icon
              return (
                <DropdownMenuRadioItem key={mode.value} value={mode.value}>
                  <ModeIcon size={17} strokeWidth={1.6} aria-hidden="true" />
                  <span>{t[mode.value]}</span>
                </DropdownMenuRadioItem>
              )
            })}
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

/** One-click theme choice for the sidebar: three square segments instead of a menu. */
export function ThemeSegmented({ label = "Theme", locale = "en" }: { label?: string; locale?: Locale }) {
  const t = stationCopy[locale]
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <div className="station-theme-segments" role="radiogroup" aria-label={label}>
      {modes.map((mode) => {
        const ModeIcon = mode.icon
        const checked = mounted && (theme ?? "system") === mode.value
        return (
          <button key={mode.value} type="button" role="radio" aria-checked={checked} aria-label={t[mode.value]} title={t[mode.value]}
            data-checked={checked || undefined} onClick={() => setTheme(mode.value)}>
            <ModeIcon size={15} strokeWidth={1.7} aria-hidden="true" />
          </button>
        )
      })}
    </div>
  )
}

const cycle = { light: "dark", dark: "system", system: "light" } as const

/** One square that cycles light → dark → system on each click; the icon shows the current mode. */
export function ThemeToggle({ label = "Theme", locale = "en" }: { label?: string; locale?: Locale }) {
  const t = stationCopy[locale]
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const current = (mounted ? theme : "system") as keyof typeof cycle
  const mode = current in cycle ? current : "system"
  const next = cycle[mode]
  const Icon = modes.find((item) => item.value === mode)?.icon ?? Monitor

  return (
    <button type="button" className="station-theme-toggle" onClick={() => setTheme(next)}
      aria-label={`${label}: ${t[mode]}. ${t[next]}`} title={`${label}: ${t[mode]}`}>
      <Icon size={16} strokeWidth={1.7} aria-hidden="true" />
    </button>
  )
}
