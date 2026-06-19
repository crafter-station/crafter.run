export const locales = ["en", "es", "pt"] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = "en"

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale)
}

export function stripLocale(pathname: string) {
  const segments = pathname.split("/").filter(Boolean)
  if (segments[0] && isLocale(segments[0])) segments.shift()
  return `/${segments.join("/")}`.replace(/\/$/, "") || "/"
}

export function withLocale(href: string, locale: Locale) {
  if (href.startsWith("http") || href.startsWith("#")) return href
  const normalized = href.startsWith("/") ? href : `/${href}`
  const path = stripLocale(normalized)
  return path === "/" ? `/${locale}` : `/${locale}${path}`
}

export function switchLocaleHref(pathname: string, locale: Locale) {
  const path = stripLocale(pathname)
  return path === "/" ? `/${locale}` : `/${locale}${path}`
}
