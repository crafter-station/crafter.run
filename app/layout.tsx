import React from "react"
import type { Metadata, Viewport } from "next"
import { Space_Grotesk, JetBrains_Mono } from "next/font/google"

import "./globals.css"

const _spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
})
const _jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["300", "400", "500"],
})

export const metadata: Metadata = {
  metadataBase: new URL("https://crafter.run"),
  title: "crafter.run - Visual References by Crafter Station",
  description:
    "Explore the visual portfolio of projects and references produced by Crafter Station. Search, browse, and discover our open source craft.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "16x16 32x32 48x48" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "crafter.run",
    description:
      "Visual references & open source projects by Crafter Station.",
    url: "https://crafter.run",
    siteName: "crafter.run",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "crafter.run - Visual references by Crafter Station" }],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "crafter.run",
    description:
      "Visual references & open source projects by Crafter Station.",
    images: ["/og-twitter.png"],
  },
}

export const viewport: Viewport = {
  themeColor: "#050505",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href="/effecto-poster.jpg"
          as="image"
          type="image/jpeg"
        />
        <link
          rel="preload"
          href="/effecto.webm"
          as="video"
          type="video/webm"
        />
      </head>
      <body
        className={`${_spaceGrotesk.variable} ${_jetbrainsMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
