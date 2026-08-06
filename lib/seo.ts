import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"

import { defaultLocale, isLocale, locales, type Locale } from "@/lib/i18n"
import { siteConfig } from "@/lib/site"

export const baseUrl = siteConfig.url

export const indexablePaths = [
  "/",
  "/claude-code",
  "/events",
  "/events/sponsors",
  "/n8n",
  "/opencode",
  "/timeline",
  "/projects",
  "/projects/next",
  "/oss",
  "/impact/petdex",
  "/research",
  "/team",
  "/team/work-with-us",
  "/workshops/questions",
  "/blog",
  "/brand",
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

export function languageAlternates(path: string) {
  return {
    ...Object.fromEntries(
      locales.map((locale) => [locale, localizedUrl(path, locale)]),
    ),
    "x-default": localizedUrl(path, defaultLocale),
  }
}

export function ogImageUrl(title: string, locale: Locale, eyebrow?: string) {
  const params = new URLSearchParams({ title, lang: locale })
  if (eyebrow) params.set("eyebrow", eyebrow)
  return `/og?${params.toString()}`
}

export function buildMetadata({
  locale,
  path,
  title,
  description,
}: {
  locale: Locale
  path: string
  title: string
  description: string
}): Metadata {
  const url = localizedUrl(path, locale)
  const fullTitle =
    title === siteConfig.name ? `${siteConfig.name} · ${siteConfig.tagline[locale]}` : `${title} | ${siteConfig.name}`
  const ogTitle = title === siteConfig.name ? siteConfig.tagline[locale] : title
  const ogImage = ogImageUrl(ogTitle, locale)

  return {
    metadataBase: new URL(baseUrl),
    title: fullTitle,
    description,
    alternates: {
      canonical: url,
      languages: languageAlternates(path),
    },
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
          alt: `${siteConfig.name} · ${siteConfig.tagline[locale]}`,
        },
      ],
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
  return buildMetadata({
    locale: lang,
    path,
    title: t("title"),
    description: t("description"),
  })
}
