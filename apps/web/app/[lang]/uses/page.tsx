import Link from "next/link"
import { notFound } from "next/navigation"
import { getTranslations } from "next-intl/server"

import { ArrowLink } from "@/components/arrow-link"
import { Container, SectionGap } from "@/components/grid-container"
import { StationPageHero } from "@/components/station-page-hero"
import type { AssetKind } from "@/lib/core-inventory-input"
import { isLocale, locales, withLocale } from "@/lib/i18n"
import { pageMetadata } from "@/lib/seo"
import { listPublicAssets, type PublicAsset } from "@/lib/uses"

import "@/app/station-uses.css"

export const dynamicParams = false

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  return pageMetadata({ params, path: "/uses", namespace: "pages.uses" })
}

const sections: AssetKind[] = ["tool", "account", "social"]

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const t = await getTranslations({ locale: lang, namespace: "pages.uses" })
  const assets = await listPublicAssets()
  const perks = assets?.filter((asset) => asset.perk) ?? []

  return (
    <main className="flex-1">
      <StationPageHero eyebrow={t("eyebrow")} title={t("title")} description={t("description")} art="workshop" />

      <Container innerClassName="su-body">
        {assets === null ? <p className="su-empty">{t("unavailable")}</p> : null}
        {assets?.length === 0 ? <p className="su-empty">{t("empty")}</p> : null}
        {sections.map((kind) => {
          const items = assets?.filter((asset) => asset.kind === kind) ?? []
          if (!items.length) return null
          return (
            <section key={kind} className="su-section" aria-labelledby={`uses-${kind}`}>
              <h2 id={`uses-${kind}`} className="station-label">
                {t(`sections.${kind}`)}
              </h2>
              <ul className="su-list">
                {items.map((asset) => (
                  <UseItem key={asset.slug} asset={asset} perkLabel={t("perk")} />
                ))}
              </ul>
            </section>
          )
        })}
      </Container>

      {perks.length ? (
        <>
          <SectionGap />
          <Container innerClassName="station-callout su-perks">
            <div className="grid gap-8 md:grid-cols-[1fr_1.2fr] md:items-start">
              <div>
                <p className="station-label text-accent">{t("perksEyebrow")}</p>
                <h2 className="mt-3">{t("perksTitle")}</h2>
              </div>
              <div>
                <ul className="su-perk-list">
                  {perks.map((asset) => (
                    <li key={asset.slug}>
                      <strong>{asset.name}</strong> <span>{asset.perk}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <Link href={withLocale("/contact", lang)}>
                    <ArrowLink>{t("perksCta")}</ArrowLink>
                  </Link>
                </div>
              </div>
            </div>
          </Container>
        </>
      ) : null}
      <SectionGap />
    </main>
  )
}

function UseItem({ asset, perkLabel }: { asset: PublicAsset; perkLabel: string }) {
  const content = (
    <>
      <span className="su-name">{asset.name}</span>
      {asset.perk ? <span className="su-perk-chip">{perkLabel}</span> : null}
    </>
  )
  return (
    <li>
      {asset.url ? (
        <a className="su-item" href={asset.url} target="_blank" rel="noreferrer">
          {content}
          <span className="su-arrow" aria-hidden="true">
            ↗
          </span>
        </a>
      ) : (
        <span className="su-item">{content}</span>
      )}
    </li>
  )
}
