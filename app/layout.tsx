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
  title: "Syntex - Design Studio",
  description:
    "We craft digital experiences that push the boundaries of what's possible on the web.",
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
