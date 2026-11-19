"use client"

import { useEffect, useState, type ReactNode } from "react"
import Link from "next/link"
import { Drawer, DrawerBackdrop, DrawerClose, DrawerContent, DrawerDescription, DrawerTitle, DrawerTrigger } from "@ui-sdk/react/drawer"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { AuthActions } from "@/components/auth-actions"
import { SiteWordmark } from "@/components/site-wordmark"
import { ThemeSwitcher, ThemeToggle } from "@/components/theme-switcher"
import { StationSocials } from "@/components/station-socials"
import { type Locale, withLocale } from "@/lib/i18n"
import { navCopy } from "@/lib/navigation-copy"
import { stationCopy } from "@/lib/station-copy"


export function SiteHeader({ locale, compact = false, event }: { locale: Locale; compact?: boolean; event: ReactNode }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const t = navCopy[locale]
  const s = stationCopy[locale]
  const primary = [
    { href: "/universe", label: t.universe },
    { href: "/ships", label: t.ships }, { href: "/oss", label: t.oss }, { href: "/events", label: t.events },
    { href: "/blog", label: t.blog }, { href: "/changelog", label: t.changelog }, { href: "/services", label: t.brandPartnerships },
  ]
  const active = (href: string) => href === "/" ? pathname === withLocale("/", locale)
    : pathname === withLocale(href, locale) || pathname?.startsWith(`${withLocale(href, locale)}/`)

  useEffect(() => { setOpen(false) }, [pathname])

  const navigation = (inDrawer = false) => (
    <>
      <nav aria-label={s.more} className="station-nav">
        {primary.map((item) => (
          <Link key={item.href} href={withLocale(item.href, locale)} aria-current={active(item.href) ? "page" : undefined}
            onClick={() => setOpen(false)}>
            <span className="station-nav-name">{item.label}</span>
          </Link>
        ))}
      </nav>
      <div className="station-side-bottom">
        <div className="station-preferences station-preferences-row">
          <AuthActions locale={locale} />
          <ThemeToggle locale={locale} label={t.theme} />
        </div>
      </div>
      <div className="station-side-event" onClickCapture={() => setOpen(false)}>{event}</div>
      {inDrawer && <StationSocials label={s.social} />}
    </>
  )
  return (
    <Drawer side="right" open={open} onOpenChange={setOpen}>
    <header className={compact ? "station-header station-header-compact" : "station-header"}>
      <div className="station-sidebar">
        <Link className="station-brand" href={withLocale("/", locale)}><SiteWordmark stacked /></Link>
        {navigation()}
      </div>
      {!compact && <StationSocials label={s.social} className="station-social-rail" />}
      {!compact && <a className="station-rail-cta" href="https://crafters.chat" target="_blank" rel="noopener noreferrer">{t.communityCta}</a>}
      <div className="station-mobile-top">
        <Link href={withLocale("/", locale)}><SiteWordmark /></Link>
        <div className="flex items-center gap-4">
          <AuthActions locale={locale} variant="top" />
          <ThemeSwitcher locale={locale} label={t.theme} className="station-mobile-theme" />
          <DrawerTrigger className="station-menu-button" aria-label={t.openMenu}><Menu size={22} /></DrawerTrigger>
        </div>
      </div>
      <DrawerBackdrop className="station-drawer-overlay" />
      <DrawerContent id="station-menu" className="station-drawer">
        <DrawerTitle className="sr-only">{s.more}</DrawerTitle>
        <DrawerDescription className="sr-only">{s.note}</DrawerDescription>
        <div className="station-drawer-inner">
          <div className="station-drawer-top"><SiteWordmark /><DrawerClose className="station-menu-button" aria-label={s.close}><X size={22} /></DrawerClose></div>
          {navigation(true)}
        </div>
      </DrawerContent>
    </header>
    </Drawer>
  )
}
