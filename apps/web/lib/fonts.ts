import localFont from "next/font/local"
import { Noto_Sans_JP, Noto_Sans_SC } from "next/font/google"

const geist = localFont({
  src: [
    { path: "../app/fonts/Geist-Regular.ttf", weight: "400" },
    { path: "../app/fonts/Geist-SemiBold.ttf", weight: "600" },
    { path: "../app/fonts/Geist-Bold.ttf", weight: "700" },
  ], variable: "--font-geist", display: "swap",
})
const mono = localFont({ src: "../app/fonts/GeistMono-Regular.ttf", variable: "--font-geist-mono", display: "swap" })
const crafter = localFont({
  src: "../app/fonts/CrafterSansPreview-Medium.woff2",
  variable: "--font-crafter", weight: "500", style: "normal", display: "swap",
})
// Only fetch the unicode slices needed by the current page.
const sc = Noto_Sans_SC({ subsets: ["latin"], variable: "--font-noto-sc", weight: ["400", "500", "700"], preload: false })
const jp = Noto_Sans_JP({ subsets: ["latin"], variable: "--font-noto-jp", weight: ["400", "500", "700"], preload: false })
export const stationFonts = [geist, mono, crafter, sc, jp].map((font) => font.variable).join(" ")
