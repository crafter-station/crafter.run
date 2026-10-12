import Link from "next/link"
import { notFound } from "next/navigation"

import { HotReloadBrindis } from "@/components/hot-reload-brindis"
import { HotReloadMark } from "@/components/hot-reload-mark"
import { HotReloadTheme } from "@/components/hot-reload-theme"
import { hotReloadDate, hotReloadTime, hotReloadStatus, hotReloadEditions } from "@/lib/hot-reload"
import { hotReloadCopy, hotReloadIdentity, hotReloadText } from "@/lib/hot-reload-copy"
import { bandFade, lineFade } from "@/lib/hot-reload-fade"
import { hotReloadMetadata } from "@/lib/hot-reload-seo"
import { isLocale, withLocale } from "@/lib/i18n"

export const dynamic = "force-dynamic"

const cities = ["Lima", "Bogotá", "Madrid", "Buenos Aires", "São Paulo"]
const ruleFade = { "--fade-l": lineFade("right"), "--fade-r": lineFade("left") } as React.CSSProperties
const tickerFade = { "--band-l": bandFade("right"), "--band-r": bandFade("left") } as React.CSSProperties
// Teasers for editions that are not announced yet: the city dissolves into the same halftone as the rules.
const lockedCities = ["Buenos Aires", "São Paulo"]
const lockFade = { maskImage: bandFade("left", 360, 72, 6, 3.8), WebkitMaskImage: bandFade("left", 360, 72, 6, 3.8), maskSize: "100% 100%", WebkitMaskSize: "100% 100%" } as React.CSSProperties

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  return isLocale(lang) ? hotReloadMetadata(lang) : {}
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const t = hotReloadCopy[lang]
  const id = hotReloadIdentity[lang]
  const next = hotReloadEditions.find((edition) => ["upcoming", "live", "unannounced"].includes(hotReloadStatus(edition))) ?? hotReloadEditions.at(-1)
  const number = (edition: { number: number }) => String(edition.number).padStart(2, "0")

  return (
    <HotReloadTheme locale={lang}>
      <section className="hot-reload-landing">
        <h1 className="sr-only">Hot Reload</h1>
        <HotReloadMark />
        {next ? (
          <div style={ruleFade} className="hot-reload-bleed hot-reload-bleed-y hot-reload-next">
            <p className="hot-reload-display">{hotReloadDate(next, lang) ?? t.unannounced}</p>
            <p className="hot-reload-caps">{[next.city, hotReloadTime(next, lang)].filter(Boolean).join(" · ")}</p>
            <Link href={withLocale(`/events/hot-reload/${next.number}`, lang)} className="hot-reload-display hot-reload-cta">
              {hotReloadText(t.edition, { number: number(next) })} ↻
            </Link>
          </div>
        ) : null}
      </section>

      <section className="hot-reload-about">
        <div>
          <h2 className="hot-reload-display">{id.headline}</h2>
          <p>{id.about}</p>
          <p className="hot-reload-caps">{id.formerly}</p>
        </div>
        <HotReloadBrindis label={id.mark} />
      </section>

      <section style={tickerFade} className="hot-reload-ticker" aria-hidden="true">
        <div className="hot-reload-display">
          {[...cities, ...cities, ...cities, ...cities].map((city, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: the list repeats on purpose
            <span key={index}>
              {city} <span className="hot-reload-spin">↻</span>
            </span>
          ))}
        </div>
      </section>

      <section className="hot-reload-editions">
        <h2 className="hot-reload-display">{t.editions}</h2>
        {!hotReloadEditions.length ? <p>{t.emptyEditions}</p> : null}
        <ul>
          {hotReloadEditions.map((edition) => {
            const status = hotReloadStatus(edition)
            return (
              <li key={edition.number}>
                <Link href={withLocale(`/events/hot-reload/${edition.number}`, lang)}>
                  <span>Nº {number(edition)}</span>
                  <span className="hot-reload-city">
                    {/* biome-ignore lint/performance/noImgElement: images are unoptimized site-wide */}
                    {edition.poster ? <img src={edition.poster} alt="" width={40} height={40} /> : <span className="hot-reload-thumb" />}
                    <span className="hot-reload-display">{edition.city}</span>
                  </span>
                  <span className="hot-reload-caps hot-reload-wide">{hotReloadDate(edition, lang) ?? t.unannounced}</span>
                  <span className="hot-reload-caps hot-reload-status" data-next={status === "upcoming" || status === "live" ? "" : undefined}>{t[status]}</span>
                </Link>
              </li>
            )
          })}
          {lockedCities.slice(0, 2).map((city, index) => (
            <li key={city} className="hot-reload-locked" aria-hidden="true">
              <span>Nº {String(hotReloadEditions.length + index + 1).padStart(2, "0")}</span>
              <span className="hot-reload-city">
                <span className="hot-reload-thumb" />
                <span className="hot-reload-display" style={lockFade}>{city}</span>
              </span>
              <span className="hot-reload-caps hot-reload-wide">·· ··· 2027</span>
              <span className="hot-reload-caps hot-reload-status">{id.soon}</span>
            </li>
          ))}
        </ul>
      </section>
    </HotReloadTheme>
  )
}
