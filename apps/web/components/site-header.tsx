"use client"

import { useEffect, useState, type ReactNode } from "react"
import Link from "next/link"
import * as Dialog from "@radix-ui/react-dialog"
import { usePathname } from "next/navigation"
import { Menu, X, ChevronDown } from "lucide-react"
import { LanguageSwitcher } from "@/components/language-switcher"
import { SiteWordmark } from "@/components/site-wordmark"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { StationSocials } from "@/components/station-socials"
import { type Locale, withLocale } from "@/lib/i18n"
import { navCopy } from "@/lib/navigation-copy"
import { navSections } from "@/lib/site"
import { stationCopy } from "@/lib/station-copy"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuGroup, DropdownMenuLabel, DropdownMenuItem } from "@/components/ui/dropdown-menu"

const primaryPaths: readonly string[] = ["/", "/universe", "/oss", "/events", "/blog"]

function MoreNavigation({ locale, onNavigate }: { locale: Locale; onNavigate: () => void }) {
  const pathname = usePathname()
  const [expanded, setExpanded] = useState(false)
  const t = navCopy[locale]
  const s = stationCopy[locale]
  const close = () => { setExpanded(false); onNavigate() }

  useEffect(() => { setExpanded(false) }, [pathname])

  return (
    <DropdownMenu open={expanded} onOpenChange={setExpanded}>
      <DropdownMenuTrigger asChild>
        <button type="button" className="station-more-trigger" aria-label={`${s.moreMenu}: ${s.more}`}>
          <span className="station-nav-name">{s.moreMenu}</span><ChevronDown size={14} aria-hidden="true" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="station-more-menu" side="bottom" align="start" sideOffset={6} collisionPadding={12}>
          {navSections.map(section => (
            <DropdownMenuGroup key={section.key}>
              <DropdownMenuLabel>{t[section.key]}</DropdownMenuLabel>
              {section.items.filter(item => !primaryPaths.includes(item.href)).map(item => (
                <DropdownMenuItem asChild key={item.href}><Link href={withLocale(item.href, locale)}
                  aria-current={pathname === withLocale(item.href, locale) ? "page" : undefined}
                  onClick={close}>{t[item.key]}</Link></DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          ))}
          <DropdownMenuGroup className="station-more-resources">
            <DropdownMenuItem asChild><Link href={withLocale("/docs", locale)} onClick={close}>{s.docs}</Link></DropdownMenuItem>
            <DropdownMenuItem asChild><Link href={withLocale("/community", locale)} onClick={close}>{t.communityCta}</Link></DropdownMenuItem>
            <DropdownMenuItem asChild><Link href={withLocale("/brand", locale)} onClick={close}>{s.visualSystem}</Link></DropdownMenuItem>
          </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function SiteHeader({ locale, compact = false, event }: { locale: Locale; compact?: boolean; event: ReactNode }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const t = navCopy[locale]
  const s = stationCopy[locale]
  const primary = [
    { href: "/", label: s.home }, { href: "/universe", label: t.universe },
    { href: "/oss", label: t.oss }, { href: "/events", label: t.events },
    { href: "/blog", label: t.blog },
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
        <MoreNavigation locale={locale} onNavigate={() => setOpen(false)} />
      </nav>
      <div className="station-side-bottom">
        <div className="station-preferences">
          <LanguageSwitcher currentLocale={locale} label={t.language} compact />
          <ThemeSwitcher locale={locale} label={t.theme} compact />
        </div>
      </div>
      <div className="station-side-event" onClickCapture={() => setOpen(false)}>{event}</div>
      {inDrawer && <StationSocials label={s.social} />}
    </>
  )
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
    <header className={compact ? "station-header station-header-compact" : "station-header"}>
      <div className="station-sidebar">
        <Link className="station-brand" href={withLocale("/", locale)}><SiteWordmark stacked /></Link>
        {navigation()}
      </div>
      {!compact && <StationSocials label={s.social} className="station-social-rail" />}
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
            {navigation(true)}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </header>
    </Dialog.Root>
  )
}
