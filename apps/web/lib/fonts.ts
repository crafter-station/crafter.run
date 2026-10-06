import localFont from "next/font/local"
import { Noto_Sans_JP, Noto_Sans_SC } from "next/font/google"

const crafterText = localFont({
  src: [
    { path: "../app/fonts/CrafterSansTextPreview-Regular.woff2", weight: "400" },
    { path: "../app/fonts/CrafterSansTextPreview-Medium.woff2", weight: "500" },
    { path: "../app/fonts/CrafterSansTextPreview-SemiBold.woff2", weight: "600" },
    { path: "../app/fonts/CrafterSansTextPreview-Bold.woff2", weight: "700" },
  ], variable: "--font-crafter-text", display: "swap",
})
const crafter = localFont({
  src: "../app/fonts/CrafterSansPreview-Medium.woff2",
  variable: "--font-crafter", weight: "500", style: "normal", display: "swap",
})
// Only fetch the unicode slices needed by the current page.
const sc = Noto_Sans_SC({ subsets: ["latin"], variable: "--font-noto-sc", weight: ["400", "500", "700"], preload: false })
const jp = Noto_Sans_JP({ subsets: ["latin"], variable: "--font-noto-jp", weight: ["400", "500", "700"], preload: false })
export const stationFonts = [crafterText, crafter, sc, jp].map((font) => font.variable).join(" ")
