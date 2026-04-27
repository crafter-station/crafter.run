import React from "react"
import type { Metadata, Viewport } from "next"
import { Space_Grotesk, JetBrains_Mono } from "next/font/google"

import "./globals.css"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
})
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["300", "400", "500", "700"],
})

export const metadata: Metadata = {
  metadataBase: new URL("https://crafter.run"),
  title: "crafter.run · World-class software, shipped fast",
  description:
    "Crafter Station is a fast-paced delivery studio building world-class products and a strong open-source track record.",
  openGraph: {
    title: "crafter.run · World-class software, shipped fast",
    description:
      "Crafter Station is a fast-paced delivery studio building world-class products and a strong open-source track record.",
    url: "https://crafter.run",
    siteName: "crafter.run",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "crafter.run · by Crafter Station",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "crafter.run · World-class software, shipped fast",
    description:
      "Crafter Station is a fast-paced delivery studio building world-class products and a strong open-source track record.",
    images: ["/og-twitter.png"],
  },
}

export const viewport: Viewport = {
  themeColor: "#0d0d0d",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} flex min-h-full flex-col bg-background font-sans text-foreground antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
