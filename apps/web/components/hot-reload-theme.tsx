import { Anton, JetBrains_Mono } from "next/font/google"
import Link from "next/link"
import type { ReactNode } from "react"

import { HotReloadByline } from "@/components/hot-reload-hero"
import { HotReloadEdges } from "@/components/hot-reload-edges"
import { HotReloadReload, HotReloadTrigger } from "@/components/hot-reload-reload"
import { HotReloadThemeToggle } from "@/components/hot-reload-theme-toggle"
import { hotReloadIdentity } from "@/lib/hot-reload-copy"
import { lineFade } from "@/lib/hot-reload-fade"
import { type Locale, withLocale } from "@/lib/i18n"

const anton = Anton({ variable: "--hr-display", weight: "400", subsets: ["latin"], display: "swap" })
const mono = JetBrains_Mono({ variable: "--hr-mono", subsets: ["latin"], display: "swap" })
const ruleFade = { "--fade-l": lineFade("right"), "--fade-r": lineFade("left") } as React.CSSProperties

/* Hot Reload renders outside the station shell (see site-shell.tsx), so this owns the whole page. */
export function HotReloadTheme({ locale, fit, children }: { locale: Locale; fit?: boolean; children: ReactNode }) {
  const t = hotReloadIdentity[locale]
  return (
    <main data-fit={fit ? "" : undefined} className={`hot-reload-theme theme-scope ${anton.variable} ${mono.variable}`}>
      <HotReloadEdges />
      <div className="hot-reload-column">
        <header style={ruleFade} className="hot-reload-bleed hot-reload-bleed-b hot-reload-top">
          <Link href={withLocale("/", locale)}>{t.presents}</Link>
          <span className="hot-reload-wide">{t.motto}</span>
          <HotReloadThemeToggle label={t.theme} names={{ system: t.system, light: t.light, dark: t.dark }} />
        </header>
        {children}
        <footer style={ruleFade} className="hot-reload-bleed hot-reload-bleed-t hot-reload-foot">
          <Link href={withLocale("/events/hot-reload", locale)}><HotReloadByline partner="Vercel" /></Link>
          <HotReloadTrigger press={t.press} toast={t.toast} />
          <Link href={withLocale("/", locale)}>crafter.run</Link>
        </footer>
      </div>
      <HotReloadReload copy={t} />
      <svg className="hot-reload-grain" aria-hidden="true">
        <filter id="hot-reload-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#hot-reload-grain)" />
      </svg>
    </main>
  )
}
