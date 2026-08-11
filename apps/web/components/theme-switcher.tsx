"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { ChevronDown } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

const modes = [
  { value: "light", label: "Light", shortLabel: "LGT" },
  { value: "dark", label: "Dark", shortLabel: "DRK" },
  { value: "system", label: "System", shortLabel: "SYS" },
] as const

type ThemeSwitcherProps = {
  className?: string
  label?: string
}

export function ThemeSwitcher({ className, label = "Theme" }: ThemeSwitcherProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const activeLabel = mounted ? modes.find((mode) => mode.value === theme)?.shortLabel ?? "SYS" : "SYS"

  // The server has no way to know the stored theme, so the labels only get
  // their active state after mount. Rendering them inert until then keeps the
  // markup identical on both sides instead of flashing the wrong one.
  useEffect(() => setMounted(true), [])

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
          <span>{activeLabel}</span>
          <ChevronDown className="size-3" aria-hidden="true" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-36">
        <DropdownMenuGroup>
          <DropdownMenuRadioGroup value={mounted ? theme : ""} onValueChange={setTheme}>
            {modes.map((mode) => {
              return (
                <DropdownMenuRadioItem key={mode.value} value={mode.value}>
                  {mode.label}
                </DropdownMenuRadioItem>
              )
            })}
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
