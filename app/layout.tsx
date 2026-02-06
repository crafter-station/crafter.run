import React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Playfair_Display } from "next/font/google"

import "./globals.css"

const _inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const _playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600"],
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
        className={`${_inter.variable} ${_playfair.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
