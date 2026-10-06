"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Check, ChevronDown, Globe2 } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { type Locale, switchLocaleHref } from "@/lib/i18n"
import { languageLinks } from "@/lib/site"
import { cn } from "@/lib/utils"

type LanguageSwitcherProps = {
  currentLocale: Locale
  className?: string
  label?: string
  compact?: boolean
}

const languageNames: Record<Locale, string> = {
  en: "English", es: "Español", pt: "Português", zh: "简体中文", ja: "日本語",
}

export function LanguageSwitcher({ currentLocale, className, label = "Language", compact = false }: LanguageSwitcherProps) {
  const pathname = usePathname() ?? "/"

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
          <Globe2 className="size-4" strokeWidth={1.6} aria-hidden="true" />
          <span className={compact ? "station-control-label" : undefined}>{compact ? languageNames[currentLocale] : currentLocale.toUpperCase()}</span>
          <ChevronDown className="station-control-chevron size-3" aria-hidden="true" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" side="bottom" sideOffset={6} collisionPadding={12} className="station-preference-menu">
        <DropdownMenuLabel>{label}</DropdownMenuLabel>
        <DropdownMenuGroup>
          {languageLinks.map((item) => {
            const locale = item.label.toLowerCase() as Locale
            return (
              <DropdownMenuItem key={item.label} asChild>
                <Link href={switchLocaleHref(pathname, locale)} lang={locale} aria-current={locale === currentLocale ? "page" : undefined}>
                  <span className="station-menu-code">{item.label}</span>
                  <span>{languageNames[locale]}</span>
                  {locale === currentLocale ? <Check className="station-menu-check" aria-hidden="true" /> : null}
                </Link>
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
