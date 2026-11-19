"use client"

import { type ReactNode, useCallback, useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import {
  BookOpen, Boxes, Briefcase, CalendarDays, Code2, FileText, FlaskConical, Handshake, Home, Mail, Palette, Rocket, ScrollText, Search, Sparkles, Trophy, Users, UsersRound,
} from "lucide-react"
import {
  Command, CommandEmpty, CommandGroup, CommandGroupLabel, CommandInput, CommandItem, CommandItemIcon, CommandItemText, CommandList,
} from "@ui-sdk/react/command"
import { Dialog, DialogBackdrop, DialogContent, DialogDescription, DialogTitle } from "@ui-sdk/react/dialog"

import { commandPaletteCopy, type PaletteIndex } from "@/lib/command-palette-copy"
import { type Locale, withLocale } from "@/lib/i18n"
import { navCopy } from "@/lib/navigation-copy"
import { stationCopy } from "@/lib/station-copy"
import { workbenchCopy } from "@/lib/workbench-copy"

export const OPEN_PALETTE_EVENT = "crafter:open-palette"

type Target = { href: string; external: boolean }

const isApple = () => typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent)

/** The key hint shown beside the sidebar search: ⌘K on Apple platforms, Ctrl K elsewhere (resolved after mount). */
export function PaletteHint() {
  const [apple, setApple] = useState(true)
  useEffect(() => setApple(isApple()), [])
  return <kbd className="wb-kbd" aria-hidden="true">{apple ? "⌘K" : "Ctrl K"}</kbd>
}

/**
 * Global command palette: Cmd/Ctrl+K opens it from any page. Pages are static; Ships, crafters,
 * docs and events load once from /api/command-index on first open. Built on the ui-sdk Command
 * inside a Dialog, so arrows, Enter, Escape and focus return come from the primitive.
 */
export function CommandPalette({ locale }: { locale: Locale }) {
  const router = useRouter()
  const t = commandPaletteCopy[locale]
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState<PaletteIndex | null>(null)

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && !event.altKey && !event.shiftKey && event.key.toLowerCase() === "k") {
        event.preventDefault()
        setOpen(value => !value)
      }
    }
    const onOpen = () => setOpen(true)
    window.addEventListener("keydown", onKey)
    window.addEventListener(OPEN_PALETTE_EVENT, onOpen)
    return () => { window.removeEventListener("keydown", onKey); window.removeEventListener(OPEN_PALETTE_EVENT, onOpen) }
  }, [])

  useEffect(() => {
    if (!open || index) return
    const controller = new AbortController()
    fetch(`/api/command-index?lang=${locale}`, { signal: controller.signal })
      .then(response => (response.ok ? response.json() : null))
      .then((data: PaletteIndex | null) => { if (data) setIndex(data) })
      .catch(() => {})
    return () => controller.abort()
  }, [open, index, locale])

  const nav = navCopy[locale]
  const station = stationCopy[locale]
  const pages = useMemo(() => [
    { href: "/", label: station.home, icon: Home, words: ["home", "start"] },
    { href: "/universe", label: nav.universe, icon: Sparkles, words: [] },
    { href: "/ships", label: nav.ships, icon: Rocket, words: ["ship", "showcase"] },
    { href: "/crafters", label: nav.crafters, icon: Users, words: ["members", "people"] },
    { href: "/oss", label: nav.oss, icon: Code2, words: ["open source", "github", "repos"] },
    { href: "/events", label: nav.events, icon: CalendarDays, words: ["calendar", "hack0"] },
    { href: "/bounties", label: nav.bounties, icon: Trophy, words: [] },
    { href: "/products", label: nav.products, icon: Boxes, words: [] },
    { href: "/blog", label: nav.blog, icon: BookOpen, words: ["journal", "posts"] },
    { href: "/changelog", label: nav.changelog, icon: ScrollText, words: ["releases"] },
    { href: "/docs", label: station.docs, icon: FileText, words: ["documentation"] },
    { href: "/services", label: nav.brandPartnerships, icon: Handshake, words: ["services", "sponsors", "partnerships"] },
    { href: "/jobs", label: nav.jobs, icon: Briefcase, words: ["hire", "roles"] },
    { href: "/team", label: nav.team, icon: UsersRound, words: ["core", "crew"] },
    { href: "/brand", label: station.visualSystem, icon: Palette, words: ["brand", "design system"] },
    { href: "/workbench", label: workbenchCopy[locale].navLabel, icon: FlaskConical, words: ["demos", "playground"] },
    { href: "/contact", label: nav.contact, icon: Mail, words: [] },
  ], [locale, nav, station])

  const targets = useMemo(() => {
    const map = new Map<string, Target>()
    for (const page of pages) map.set(`page:${page.href}`, { href: withLocale(page.href, locale), external: false })
    for (const ship of index?.ships ?? []) map.set(`ship:${ship.slug}`, { href: withLocale(`/ships/${ship.slug}`, locale), external: false })
    for (const crafter of index?.crafters ?? []) map.set(`crafter:${crafter.handle}`, { href: withLocale(`/crafters/${crafter.handle}`, locale), external: false })
    for (const doc of index?.docs ?? []) map.set(`doc:${doc.path}`, { href: doc.path, external: false })
    for (const [i, event] of (index?.events ?? []).entries()) map.set(`event:${i}`, { href: event.href, external: true })
    return map
  }, [pages, index, locale])

  const run = useCallback((value: string) => {
    const target = targets.get(value)
    setOpen(false)
    if (!target) return
    if (target.external) window.open(target.href, "_blank", "noopener,noreferrer")
    else router.push(target.href)
  }, [targets, router])

  const date = (value: string) => new Intl.DateTimeFormat(locale, { day: "numeric", month: "short", timeZone: "UTC" }).format(new Date(value))

  const group = (label: string, children: ReactNode) => (
    <CommandGroup className="cmdk-group">
      <CommandGroupLabel className="cmdk-label">{label}</CommandGroupLabel>
      {children}
    </CommandGroup>
  )

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogBackdrop className="cmdk-backdrop" />
      <DialogContent className="cmdk home-frame">
        <DialogTitle className="sr-only">{t.title}</DialogTitle>
        <DialogDescription className="sr-only">{t.description}</DialogDescription>
        <Command onAction={run} className="cmdk-command">
          <div className="cmdk-input-row">
            <Search aria-hidden="true" size={18} />
            <CommandInput aria-label={t.title} placeholder={t.placeholder} className="cmdk-input" />
            <kbd className="wb-kbd" aria-hidden="true">esc</kbd>
          </div>
          <CommandEmpty className="cmdk-empty">{index ? t.empty : t.loading}</CommandEmpty>
          <CommandList className="cmdk-list">
            {group(t.pages, pages.map(page => (
              <CommandItem key={page.href} value={`page:${page.href}`} label={page.label} keywords={page.words} className="cmdk-item">
                <CommandItemIcon><page.icon size={16} aria-hidden="true" /></CommandItemIcon>
                <CommandItemText className="cmdk-text" />
                <span className="cmdk-meta">{page.href}</span>
              </CommandItem>
            )))}
            {index?.events.length ? group(t.events, index.events.map((event, i) => (
              <CommandItem key={`event:${i}`} value={`event:${i}`} label={event.title} className="cmdk-item">
                <CommandItemIcon><CalendarDays size={16} aria-hidden="true" /></CommandItemIcon>
                <CommandItemText className="cmdk-text" />
                <span className="cmdk-meta">{date(event.date)}</span>
              </CommandItem>
            ))) : null}
            {index?.ships.length ? group(t.ships, index.ships.map(ship => (
              <CommandItem key={`ship:${ship.slug}`} value={`ship:${ship.slug}`} label={ship.name} keywords={[ship.maker]} className="cmdk-item">
                <CommandItemIcon><Rocket size={16} aria-hidden="true" /></CommandItemIcon>
                <CommandItemText className="cmdk-text" />
                <span className="cmdk-meta">{ship.maker}</span>
              </CommandItem>
            ))) : null}
            {index?.crafters.length ? group(t.crafters, index.crafters.map(crafter => (
              <CommandItem key={`crafter:${crafter.handle}`} value={`crafter:${crafter.handle}`} label={crafter.name} keywords={[crafter.handle]} className="cmdk-item">
                <CommandItemIcon><Users size={16} aria-hidden="true" /></CommandItemIcon>
                <CommandItemText className="cmdk-text" />
                <span className="cmdk-meta">@{crafter.handle}</span>
              </CommandItem>
            ))) : null}
            {index?.docs.length ? group(t.docs, index.docs.map(doc => (
              <CommandItem key={`doc:${doc.path}`} value={`doc:${doc.path}`} label={doc.title} className="cmdk-item">
                <CommandItemIcon><FileText size={16} aria-hidden="true" /></CommandItemIcon>
                <CommandItemText className="cmdk-text" />
                <span className="cmdk-meta">{doc.path}</span>
              </CommandItem>
            ))) : null}
          </CommandList>
        </Command>
        <p className="cmdk-foot" aria-hidden="true">
          <span><kbd className="wb-kbd">↑↓</kbd> {t.navigate}</span>
          <span><kbd className="wb-kbd">↵</kbd> {t.open}</span>
          <span><kbd className="wb-kbd">esc</kbd> {t.close}</span>
          {index ? null : <span>{t.loading}</span>}
        </p>
      </DialogContent>
    </Dialog>
  )
}
