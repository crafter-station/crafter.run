export const locales = ["en", "es", "pt", "zh", "ja"] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = "en"

/**
 * Carries the locale a request was made under from `proxy.ts` to code that
 * renders outside `[lang]` and therefore has no params to read, namely
 * `app/global-not-found.tsx`.
 */
export const LOCALE_HEADER = "x-crafter-locale"

/** Picks the best supported locale out of an `Accept-Language` header. */
export function localeFromAcceptLanguage(header: string | null): Locale | null {
  if (!header) return null

  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";")
      const quality = params.find((param) => param.trim().startsWith("q="))
      return { tag: tag.trim().toLowerCase(), quality: quality ? Number(quality.split("=")[1]) || 0 : 1 }
    })
    .sort((a, b) => b.quality - a.quality)

  for (const { tag } of ranked) {
    const base = tag.split("-")[0]
    if (isLocale(base)) return base
  }

  return null
}

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
