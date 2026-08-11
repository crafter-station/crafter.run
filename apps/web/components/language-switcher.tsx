"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Check, ChevronDown, Globe2 } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { type Locale, switchLocaleHref } from "@/lib/i18n"
import { languageLinks } from "@/lib/site"
import { cn } from "@/lib/utils"

type LanguageSwitcherProps = {
  currentLocale: Locale
  className?: string
  label?: string
}

export function LanguageSwitcher({ currentLocale, className, label = "Language" }: LanguageSwitcherProps) {
  const pathname = usePathname() ?? "/"

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
          <Globe2 className="size-4" aria-hidden="true" />
          <span>{currentLocale.toUpperCase()}</span>
          <ChevronDown className="size-3" aria-hidden="true" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-36">
        <DropdownMenuGroup>
          {languageLinks.map((item) => {
            const locale = item.label.toLowerCase() as Locale
            return (
              <DropdownMenuItem key={item.label} asChild>
                <Link href={switchLocaleHref(pathname, locale)} aria-current={locale === currentLocale ? "page" : undefined}>
                  <span>{item.label}</span>
                  {locale === currentLocale ? <Check className="ml-auto" aria-hidden="true" /> : null}
                </Link>
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
