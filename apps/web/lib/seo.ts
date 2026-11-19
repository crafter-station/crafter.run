import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"

import { defaultLocale, isLocale, locales, type Locale } from "@/lib/i18n"
import { siteConfig } from "@/lib/site"
import { socialImageUrl } from "@/lib/og"
import { accessEvents } from "@/lib/access-events"

export const baseUrl = siteConfig.url

const SERP_DESCRIPTION_MAX = 160

/** Fits a description into the ~160 characters a search result shows, ending
 *  on a sentence when one fits, else on a word. Social cards keep the full text. */
export function serpDescription(text: string): string {
  if (text.length <= SERP_DESCRIPTION_MAX) return text
  const head = text.slice(0, SERP_DESCRIPTION_MAX)
  const sentence = Math.max(...[". ", "。", "! ", "? "].map((stop) => head.lastIndexOf(stop)))
  if (sentence >= 80) return head.slice(0, sentence + 1).trim()
  const word = head.slice(0, SERP_DESCRIPTION_MAX - 1).lastIndexOf(" ")
  return `${head.slice(0, word > 80 ? word : SERP_DESCRIPTION_MAX - 1).trim()}…`
}

export const indexablePaths = [
  "/",
  "/crafters",
  "/events",
  "/events/hot-reload",
  ...accessEvents.map(event => `/events/${event.slug}`),
  "/events/sponsors",
  "/hackathons",
  "/timeline",
  "/oss",
  "/oss/metrics",
  "/universe",
  "/products",
  "/impact/petdex",
  "/ships",
  "/bounties",
  "/team",
  "/team/crew",
  "/uses",
  "/workshops/questions",
  "/blog",
  "/changelog",
  "/newsletter",
  "/brand",
  "/font",
  "/contact",
] as const

const ogLocales: Record<Locale, string> = {
  en: "en_US",
  es: "es_419",
  pt: "pt_BR",
  zh: "zh_CN",
  ja: "ja_JP",
}

function pathForLocale(path: string, locale: Locale) {
  const normalized = path === "/" ? "" : path
  return `/${locale}${normalized}`
}

export function absoluteUrl(path: string) {
  return new URL(path, baseUrl).toString()
}

export function localizedUrl(path: string, locale: Locale) {
  return absoluteUrl(pathForLocale(path, locale))
}

/** Locales that serve community content in its own language; the others are noindex duplicates. */
export const communityLocales: readonly Locale[] = ["en", "es"]

export function languageAlternates(path: string, only: readonly Locale[] = locales) {
  return {
    ...Object.fromEntries(
      only.map((locale) => [locale, localizedUrl(path, locale)]),
    ),
    "x-default": localizedUrl(path, defaultLocale),
  }
}

export function ogImageUrl(title: string, locale: Locale, eyebrow?: string, options: { path?: string; description?: string } = {}) {
  return socialImageUrl(title, locale, { ...options, eyebrow })
}

export function buildMetadata({
  locale,
  path,
  title,
  description,
  image,
  video,
  indexLocales,
}: {
  locale: Locale
  path: string
  title: string
  description: string
  image?: { url: string; alt: string }
  /** An MP4 at 1200x630 whose first frame is `image`. Discord plays it inline; every other app shows the image. */
  video?: string
  /** Locales that are indexed and listed in hreflang; any other locale gets noindex,follow. */
  indexLocales?: readonly Locale[]
}): Metadata {
  const url = localizedUrl(path, locale)
  const fullTitle =
    title === siteConfig.name ? `${siteConfig.name} · ${siteConfig.tagline[locale]}` : `${title} | ${siteConfig.name}`
  const ogTitle = title === siteConfig.name ? siteConfig.tagline[locale] : title
  const ogImage = image?.url ?? ogImageUrl(ogTitle, locale, undefined, { path, description })

  return {
    metadataBase: new URL(baseUrl),
    title: fullTitle,
    description: serpDescription(description),
    alternates: {
      canonical: url,
      languages: languageAlternates(path, indexLocales),
    },
    ...(indexLocales && !indexLocales.includes(locale) ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: image?.alt ?? fullTitle,
        },
      ],
      ...(video ? { videos: [{ url: absoluteUrl(video), secureUrl: absoluteUrl(video), type: "video/mp4", width: 1200, height: 630 }] } : {}),
      type: "website",
      locale: ogLocales[locale],
      alternateLocale: locales
        .filter((alternate) => alternate !== locale)
        .map((alternate) => ogLocales[alternate]),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
    },
  }
}

/** Link preview film per page: a 10 s loop and its first frame as the poster.
 * Regenerate with `apps/web/scripts/og-video/render.sh` when the Ship count moves. */
const FILMS: Record<string, Partial<Record<Locale, { video: string; poster: string; alt: string }>>> = {
  "pages.ships": {
    es: { video: "/og/ships-es.mp4", poster: "/og/ships-es.jpg", alt: "Craft. Ship. Repeat. Proyectos de builders de LATAM publicados en crafter.run" },
    en: { video: "/og/ships-en.mp4", poster: "/og/ships-en.jpg", alt: "Craft. Ship. Repeat. Projects by LATAM builders published on crafter.run" },
  },
}

export async function pageMetadata({
  params,
  path,
  namespace,
}: {
  params: Promise<{ lang: string }>
  path: string
  namespace: string
}) {
  const { lang } = await params
  if (!isLocale(lang)) return {}

  if (namespace === "home") {
    return buildMetadata({
      locale: lang,
      path,
      title: siteConfig.name,
      description: siteConfig.description[lang],
    })
  }

  const t = await getTranslations({ locale: lang, namespace })
  const film = FILMS[namespace]?.[lang]
  return buildMetadata({
    locale: lang,
    path,
    title: t("title"),
    description: t("description"),
    ...(film ? { image: { url: absoluteUrl(film.poster), alt: film.alt }, video: film.video } : {}),
  })
}
