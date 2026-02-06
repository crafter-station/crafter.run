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
  title: "crafter.run - Visual References by Crafter Station",
  description:
    "Explore the visual portfolio of projects and references produced by Crafter Station. Search, browse, and discover our open source craft.",
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
      <body
        className={`${_spaceGrotesk.variable} ${_jetbrainsMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
