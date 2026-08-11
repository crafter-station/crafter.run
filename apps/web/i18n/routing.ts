import { defineRouting } from "next-intl/routing"

export const routing = defineRouting({
  locales: ["en", "es", "pt", "zh", "ja"],
  defaultLocale: "en",
  localePrefix: "always",
})
