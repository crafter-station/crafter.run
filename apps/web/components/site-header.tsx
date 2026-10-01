"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import * as Dialog from "@radix-ui/react-dialog"
import { usePathname } from "next/navigation"
import { Menu, X, ArrowUpRight } from "lucide-react"
import { AuthActions } from "@/components/auth-actions"
import { LanguageSwitcher } from "@/components/language-switcher"
import { SiteWordmark } from "@/components/site-wordmark"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { type Locale, withLocale } from "@/lib/i18n"
import { navCopy } from "@/lib/navigation-copy"
import { navSections } from "@/lib/site"
import { stationCopy } from "@/lib/station-copy"

export function SiteHeader({ locale, compact = false }: { locale: Locale; compact?: boolean }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const t = navCopy[locale]
  const s = stationCopy[locale]
  const primary = [
    { href: "/", label: s.home }, { href: "/oss", label: t.oss },
    { href: "/ships", label: t.ships }, { href: "/events", label: t.events },
    { href: "/blog", label: t.blog }, { href: "/team", label: t.team },
    { href: "/docs", label: s.docs },
  ]
  const active = (href: string) => href === "/" ? pathname === withLocale("/", locale)
    : pathname === withLocale(href, locale) || pathname?.startsWith(`${withLocale(href, locale)}/`)

  useEffect(() => { setOpen(false) }, [pathname])

  const navigation = () => (
    <>
      <nav aria-label={s.more} className="station-nav">
        {primary.map((item) => (
          <Link key={item.href} href={withLocale(item.href, locale)} aria-current={active(item.href) ? "page" : undefined}
            onClick={() => setOpen(false)}>{item.label}</Link>
        ))}
        <details className="station-explore">
          <summary>{s.more}<span aria-hidden="true">+</span></summary>
          <div className="station-explore-links">
            {navSections.map((section) => (
              <div key={section.key}>
                <p>{t[section.key]}</p>
                {section.items.map((item) => (
                  <Link key={item.href} href={withLocale(item.href, locale)}
                    aria-current={active(item.href) ? "page" : undefined}
                    onClick={() => setOpen(false)}>{t[item.key]}</Link>
                ))}
              </div>
            ))}
            <Link href={withLocale("/brand", locale)} onClick={() => setOpen(false)}>Design system</Link>
          </div>
        </details>
      </nav>
      <div className="station-side-bottom">
        <a className="station-github" href="https://github.com/crafter-station" target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight size={13} aria-hidden="true" /></a>
        <div className="station-family-dots" aria-hidden="true"><i /><i /><i /><i /></div>
        <p className="station-label">{s.family}</p>
        <div className="station-preferences">
          <LanguageSwitcher currentLocale={locale} label={t.language} />
          <ThemeSwitcher locale={locale} label={t.theme} />
        </div>
        <div className="station-auth" onClickCapture={() => setOpen(false)}><AuthActions locale={locale} /></div>
      </div>
    </>
  )
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
    <header className={compact ? "station-header station-header-compact" : "station-header"}>
      <div className="station-sidebar">
        <Link className="station-brand" href={withLocale("/", locale)}><SiteWordmark stacked /></Link>
        {navigation()}
      </div>
      <div className="station-mobile-top">
        <Link href={withLocale("/", locale)}><SiteWordmark /></Link>
        <div className="flex items-center gap-4">
          <ThemeSwitcher locale={locale} label={t.theme} className="station-mobile-theme" />
          <Dialog.Trigger asChild><button className="station-menu-button" type="button" aria-label={t.openMenu}
            aria-expanded={open} aria-controls="station-menu"><Menu size={22} /></button></Dialog.Trigger>
        </div>
      </div>
      <Dialog.Portal>
        <Dialog.Overlay className="station-drawer-overlay" />
        <Dialog.Content id="station-menu" className="station-drawer">
          <Dialog.Title className="sr-only">{s.more}</Dialog.Title>
          <Dialog.Description className="sr-only">{s.note}</Dialog.Description>
          <div className="station-drawer-inner">
            <div className="station-drawer-top"><SiteWordmark /><Dialog.Close asChild><button className="station-menu-button" type="button" aria-label={s.close}><X size={22} /></button></Dialog.Close></div>
            {navigation()}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </header>
    </Dialog.Root>
  )
}
