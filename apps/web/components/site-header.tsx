"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import * as Dialog from "@radix-ui/react-dialog"
import { usePathname } from "next/navigation"
import { Menu, X, Github, Plus } from "lucide-react"
import { AuthActions } from "@/components/auth-actions"
import { LanguageSwitcher } from "@/components/language-switcher"
import { SiteWordmark } from "@/components/site-wordmark"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { type Locale, withLocale } from "@/lib/i18n"
import { navCopy } from "@/lib/navigation-copy"
import { navSections } from "@/lib/site"
import { stationCopy } from "@/lib/station-copy"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuGroup, DropdownMenuLabel, DropdownMenuItem } from "@/components/ui/dropdown-menu"

export function SiteHeader({ locale, compact = false }: { locale: Locale; compact?: boolean }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const t = navCopy[locale]
  const s = stationCopy[locale]
  const primary = [
    { href: "/", label: s.home }, { href: "/products", label: t.products },
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
            onClick={() => setOpen(false)}>{item.label}</Link>
        ))}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button type="button" className="station-more-trigger" aria-label={`${s.moreMenu}: ${s.more}`}>
              {s.moreMenu}<Plus size={14} aria-hidden="true" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side={inDrawer ? "bottom" : "right"} align="start" sideOffset={inDrawer ? 8 : 20} collisionPadding={16} className="station-more-menu">
            {navSections.map((section) => (
              <DropdownMenuGroup key={section.key}>
                <DropdownMenuLabel>{t[section.key]}</DropdownMenuLabel>
                {section.items.filter(item => !primary.some(link => link.href === item.href)).map((item) => (
                  <DropdownMenuItem asChild key={item.href}><Link href={withLocale(item.href, locale)}
                    aria-current={active(item.href) ? "page" : undefined}
                    onClick={() => setOpen(false)}>{t[item.key]}</Link></DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            ))}
            <DropdownMenuGroup className="station-more-resources">
              <DropdownMenuItem asChild><Link href={withLocale("/docs", locale)} onClick={() => setOpen(false)}>{s.docs}</Link></DropdownMenuItem>
              <DropdownMenuItem asChild><Link href={withLocale("/community", locale)} onClick={() => setOpen(false)}>{t.communityCta}</Link></DropdownMenuItem>
              <DropdownMenuItem asChild><Link href={withLocale("/brand", locale)} onClick={() => setOpen(false)}>{s.visualSystem}</Link></DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
      <div className="station-side-bottom">
        <div className="station-preferences">
          <a className="station-github" href="https://github.com/crafter-station" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github size={17} aria-hidden="true" /></a>
          <LanguageSwitcher currentLocale={locale} label={t.language} compact />
          <ThemeSwitcher locale={locale} label={t.theme} compact />
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
            {navigation(true)}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </header>
    </Dialog.Root>
  )
}
