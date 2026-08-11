import React from "react"
import { ClerkProvider } from "@clerk/nextjs"
import { shadcn } from "@clerk/ui/themes"
import type { Viewport } from "next"
import {
  JetBrains_Mono,
  Noto_Sans_JP,
  Noto_Sans_SC,
  Space_Grotesk,
} from "next/font/google"
import { notFound } from "next/navigation"
import { setRequestLocale } from "next-intl/server"
import { Analytics } from "@vercel/analytics/next"

import { JsonLd } from "@/components/json-ld"
import { ThemeProvider } from "@/components/theme-provider"

import { isLocale, locales } from "@/lib/i18n"
import { baseUrl } from "@/lib/seo"
import { siteConfig, socials } from "@/lib/site"

import "../globals.css"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  weight: ["300", "400", "500", "600", "700"],
})
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["300", "400", "500", "700"],
})
// CJK body fonts: Space Grotesk/JetBrains Mono are Latin-only, so zh/ja
// pages would fall back to whatever the visitor's OS ships. Loaded with
// preload disabled; browsers only fetch the unicode-range slices a page
// actually uses, so Latin pages pay nothing.
const notoSansSC = Noto_Sans_SC({
  subsets: ["latin"],
  variable: "--font-noto-sc",
  weight: ["400", "500", "700"],
  preload: false,
})
const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto-jp",
  weight: ["400", "500", "700"],
  preload: false,
})

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: baseUrl,
    logo: `${baseUrl}/brand/logo-liquid.png`,
    sameAs: socials.map((social) => social.href),
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: baseUrl,
    inLanguage: locales,
  },
]

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0d0d0d" },
  ],
}

export const dynamicParams = false

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
    <html lang={lang} suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} ${notoSansSC.variable} ${notoSansJP.variable} flex min-h-full flex-col bg-background font-sans text-foreground antialiased`}
      >
        <ClerkProvider
          dynamic
          appearance={{
            theme: shadcn,
            variables: {
              colorBackground: "hsl(var(--card))",
              colorDanger: "hsl(var(--destructive))",
              colorForeground: "hsl(var(--card-foreground))",
              colorInput: "hsl(var(--input))",
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
            <JsonLd data={structuredData} />
            {children}
            <Analytics />
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  )
}
