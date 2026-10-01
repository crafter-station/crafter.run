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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { type Locale } from "@/lib/i18n"
import { stationCopy } from "@/lib/station-copy"
import { cn } from "@/lib/utils"

const modes = [
  { value: "light", label: "Light", shortLabel: "LGT" },
  { value: "dark", label: "Dark", shortLabel: "DRK" },
  { value: "system", label: "System", shortLabel: "SYS" },
] as const

type ThemeSwitcherProps = {
  className?: string
  label?: string
  locale?: Locale
}

export function ThemeSwitcher({ className, label = "Theme", locale = "en" }: ThemeSwitcherProps) {
  const t = stationCopy[locale]
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const activeLabel = mounted ? modes.find((mode) => mode.value === theme)?.shortLabel ?? "SYS" : "SYS"

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
            className,
          )}
        >
          <Icon className="size-4" aria-hidden="true" /><span className="font-mono text-[10px]">{activeLabel}</span>
          <ChevronDown className="size-3" aria-hidden="true" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-36">
        <DropdownMenuGroup>
          <DropdownMenuRadioGroup value={mounted ? theme : ""} onValueChange={setTheme}>
            {modes.map((mode) => {
              return (
                <DropdownMenuRadioItem key={mode.value} value={mode.value}>
                  {t[mode.value]}
                </DropdownMenuRadioItem>
              )
            })}
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
