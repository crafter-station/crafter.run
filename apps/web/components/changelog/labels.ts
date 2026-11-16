import type { getTranslations } from "next-intl/server"
import { CHANGELOG_AREAS, CHANGELOG_KINDS, type ChangelogArea, type ChangelogKind } from "@/lib/changelog"
import type { Locale } from "@/lib/i18n"

type Translator = Awaited<ReturnType<typeof getTranslations>>

/** The `pages.changelog` strings the pages and cards read, resolved once per request. */
export type ChangelogLabels = {
  areas: Record<ChangelogArea, string>
  kinds: Record<ChangelogKind, string>
  languages: Record<"en" | "es", string>
  availableIn: (language: string) => string
  readEntry: string
  crafters: string
  ships: string
  repos: string
  links: string
  sources: string
  newer: string
  older: string
  allChanges: string
  readAsMarkdown: string
  subscribe: string
  rss: string
  markdownIndex: string
  agents: string
  filterLabel: string
  all: string
  reset: string
  empty: string
  results: (count: number) => string
  ctaEyebrow: string
  ctaTitle: string
  ctaBody: string
}

export function changelogLabels(t: Translator, _locale: Locale): ChangelogLabels {
  const raw = t as unknown as (key: string, values?: Record<string, string | number>) => string
  return {
    areas: Object.fromEntries(CHANGELOG_AREAS.map((area) => [area, raw(`areas.${area}`)])) as ChangelogLabels["areas"],
    kinds: Object.fromEntries(CHANGELOG_KINDS.map((kind) => [kind, raw(`kinds.${kind}`)])) as ChangelogLabels["kinds"],
    languages: { en: raw("languages.en"), es: raw("languages.es") },
    availableIn: (language) => raw("availableIn", { language }),
    readEntry: raw("readEntry"),
    crafters: raw("crafters"),
    ships: raw("ships"),
    repos: raw("repos"),
    links: raw("links"),
    sources: raw("sources"),
    newer: raw("newer"),
    older: raw("older"),
    allChanges: raw("allChanges"),
    readAsMarkdown: raw("readAsMarkdown"),
    subscribe: raw("subscribe"),
    rss: raw("rss"),
    markdownIndex: raw("markdownIndex"),
    agents: raw("agents"),
    filterLabel: raw("filterLabel"),
    all: raw("all"),
    reset: raw("reset"),
    empty: raw("empty"),
    results: (count) => raw("results", { count }),
    ctaEyebrow: raw("ctaEyebrow"),
    ctaTitle: raw("ctaTitle"),
    ctaBody: raw("ctaBody"),
  }
}
