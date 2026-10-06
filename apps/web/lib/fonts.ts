import localFont from "next/font/local"
import "./noto-fonts.css"

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
export const stationFonts = [crafterText.variable, crafter.variable, "station-noto-fallbacks"].join(" ")
