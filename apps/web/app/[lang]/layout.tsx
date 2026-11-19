import React from "react"
import { ClerkProvider } from "@clerk/nextjs"
import { enUS, esES, jaJP, ptBR, zhCN } from "@clerk/localizations"
import { shadcn } from "@clerk/ui/themes"
import type { Viewport } from "next"
import { notFound } from "next/navigation"
import { setRequestLocale } from "next-intl/server"
import { Analytics } from "@vercel/analytics/next"

import { JsonLd } from "@/components/json-ld"
import { SiteShell } from "@/components/site-shell"
import { SiteFooter } from "@/components/site-footer"
import { StationEventTeaser } from "@/components/station-event-teaser"
import { stationFonts } from "@/lib/fonts"
import { ThemeProvider } from "@/components/theme-provider"

import { isLocale, locales } from "@/lib/i18n"
import { organizationSchema, webSiteSchema } from "@/lib/structured-data"

import "../globals.css"

const authLocalizations = { en: enUS, es: esES, pt: ptBR, zh: zhCN, ja: jaJP }

// Noto Sans SC/JP faces weigh ~600 KB of render-blocking CSS, so only CJK locales link them.
const cjkLocales = new Set(["zh", "ja"])

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F7F7F2" },
    { media: "(prefers-color-scheme: dark)", color: "#191B17" },
  ],
}

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ lang: string }>
}>) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()

  setRequestLocale(lang)

  return (
    <html lang={lang} suppressHydrationWarning className={stationFonts}>
      <body
        className={`flex min-h-full flex-col bg-background font-sans text-foreground antialiased`}
      >
        {cjkLocales.has(lang) ? <link rel="stylesheet" href="/fonts/noto/noto.css" precedence="default" /> : null}
        <ClerkProvider
          localization={authLocalizations[lang]}
          appearance={{
            theme: shadcn,
            elements: {
              cardBox: "rounded-md border border-line shadow-none",
              card: "rounded-none bg-card shadow-none",
              headerTitle: "font-heading tracking-tight",
            },
            variables: {
              fontFamily: "var(--font-sans)",
              fontFamilyButtons: "var(--font-sans)",
              borderRadius: "0.375rem",
              colorBackground: "hsl(var(--card))",
              colorDanger: "hsl(var(--destructive))",
              colorForeground: "hsl(var(--card-foreground))",
              colorInput: "hsl(var(--background))",
              colorInputForeground: "hsl(var(--card-foreground))",
              colorModalBackdrop: "rgb(0 0 0 / 50%)",
              colorMuted: "hsl(var(--muted))",
              colorMutedForeground: "hsl(var(--muted-foreground))",
              colorNeutral: "hsl(var(--foreground))",
              colorPrimary: "hsl(var(--primary))",
              colorPrimaryForeground: "hsl(var(--primary-foreground))",
              colorRing: "hsl(var(--ring) / 50%)",
            },
          }}
          signInUrl={`/${lang}/sign-in`}
          signUpUrl={`/${lang}/sign-up`}
          afterSignOutUrl={`/${lang}`}
        >
          <ThemeProvider>
            <JsonLd data={[organizationSchema(lang), webSiteSchema(lang)]} />
            <SiteShell locale={lang} footer={<SiteFooter locale={lang} />}
              event={<StationEventTeaser locale={lang} />}>{children}</SiteShell>
            <Analytics />
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  )
}
