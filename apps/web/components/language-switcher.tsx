"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { type Locale, switchLocaleHref } from "@/lib/i18n"
import { languageLinks } from "@/lib/site"

type LanguageSwitcherProps = {
  currentLocale: Locale
  className?: string
}

export function LanguageSwitcher({ currentLocale, className }: LanguageSwitcherProps) {
  const pathname = usePathname() ?? "/"

  return languageLinks.map((item) => {
    const locale = item.label.toLowerCase() as Locale

    return (
      <Link
        key={item.label}
        href={switchLocaleHref(pathname, locale)}
        aria-current={locale === currentLocale ? "page" : undefined}
        className={className}
      >
        {item.label}
      </Link>
    )
  })
}
