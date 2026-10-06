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
      <DropdownMenuTrigger asChild>
        <button
          type="button"
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
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={compact ? "start" : "end"} side="bottom" sideOffset={6} collisionPadding={12} className="station-preference-menu">
        <DropdownMenuLabel>{label}</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuRadioGroup value={mounted ? theme : ""} onValueChange={setTheme}>
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
