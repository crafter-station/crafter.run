import { ArrowDown, Download } from "lucide-react"

import { brandCopy } from "@/components/brand/copy"
import { BRAND_MARK_PATH } from "@/lib/brand"
import type { Locale } from "@/lib/i18n"

function Mark({ className, size }: { className?: string; size?: number }) {
  return (
    <svg viewBox="0 0 257 257" width={size} height={size} className={className} aria-hidden="true">
      <path d={BRAND_MARK_PATH} fill="currentColor" />
    </svg>
  )
}

/** The sidebar lockup, sized by one unit so it scales without drifting. */
function Lockup({ layout = "stacked", unit = 1 }: { layout?: "stacked" | "row"; unit?: number }) {
  return (
    <span className="brand-lockup" data-layout={layout} style={{ "--u": `${unit}px` } as React.CSSProperties}>
      <Mark />
      <span className="brand-lockup-text">crafter{layout === "stacked" ? <br /> : " "}station</span>
    </span>
  )
}

const assets = [
  { file: "logo-stacked", key: "primary" },
  { file: "logo-wordmark", key: "horizontal" },
  { file: "icon", key: "symbol" },
  { file: "wordmark", key: "wordmark" },
] as const

const formats = ["svg", "png", "webp", "jpg"] as const

export function LogoSystem({ locale }: { locale: Locale }) {
  const t = brandCopy[locale]

  return (
    <section className="station-section brand-system" id="logo">
      <div className="station-section-heading">
        <div>
          <p className="station-eyebrow">{t.eyebrow}</p>
          <h2>{t.title}</h2>
        </div>
      </div>
      <p className="max-w-2xl leading-7 text-muted-foreground">{t.intro}</p>

      <h3 className="brand-step">01 / {t.tiers}</h3>
      <div className="brand-tiers">
        <figure className="brand-card">
          <div className="brand-stage">
            <Lockup layout="row" unit={1.4} />
          </div>
          <figcaption>
            <strong>{t.horizontal}</strong>
            <span>{t.horizontalNote}</span>
          </figcaption>
        </figure>
        <figure className="brand-card">
          <div className="brand-stage">
            <Mark size={96} />
          </div>
          <figcaption>
            <strong>{t.symbol}</strong>
            <span>{t.symbolNote}</span>
          </figcaption>
        </figure>
        <figure className="brand-card">
          <div className="brand-stage brand-avatars">
            <span className="brand-avatar" data-tone="ink">
              <Mark />
            </span>
            <span className="brand-avatar" data-tone="accent">
              <Mark />
            </span>
          </div>
          <figcaption>
            <strong>{t.avatar}</strong>
            <span>{t.avatarNote}</span>
          </figcaption>
        </figure>
      </div>

      <h3 className="brand-step">02 / {t.scale}</h3>
      <div className="brand-card brand-scale">
        <figure className="brand-scale-hero">
          <div><Mark size={200} /></div>
          <figcaption>200 px</figcaption>
        </figure>
        <div className="brand-scale-side">
          <div className="brand-scale-row">
            {([64, 32, 24, 16] as const).map((size) => (
              <figure key={size}>
                <div><Mark size={size} /></div>
                <figcaption>{size} px</figcaption>
              </figure>
            ))}
          </div>
          <div className="brand-scale-row" data-row="lockups">
            <figure>
              <div><Lockup /></div>
              <figcaption>1×</figcaption>
            </figure>
            <figure>
              <div><Lockup layout="row" unit={0.72} /></div>
              <figcaption>18 px</figcaption>
            </figure>
            <figure>
              <div>
                <span className="brand-favicon-tab">
                  <img src="/icon.svg" width={16} height={16} alt="" />
                  Crafter Station
                </span>
              </div>
              <figcaption>{t.favicon}</figcaption>
            </figure>
          </div>
        </div>
      </div>
      <p className="brand-note">{t.scaleNote}</p>

      <h3 className="brand-step">03 / {t.tests}</h3>
      <div className="brand-tests">
        <figure className="brand-card" data-test="one-ink">
          <div className="brand-stage">
            <Lockup unit={1.8} />
          </div>
          <figcaption>
            <strong>{t.oneInk}</strong>
          </figcaption>
        </figure>
        <figure className="brand-card" data-test="reversed">
          <div className="brand-stage">
            <Lockup unit={1.8} />
          </div>
          <figcaption>
            <strong>{t.reversed}</strong>
          </figcaption>
        </figure>
        <figure className="brand-card" data-test="squint">
          <div className="brand-stage">
            <Lockup unit={1.8} />
          </div>
          <figcaption>
            <strong>{t.squint}</strong>
          </figcaption>
        </figure>
        <figure className="brand-card" data-test="accent">
          <div className="brand-stage">
            <Lockup unit={1.8} />
          </div>
          <figcaption>
            <strong>{t.onAccent}</strong>
          </figcaption>
        </figure>
      </div>
      <p className="brand-note">{t.testsNote}</p>

      <h3 className="brand-step">04 / {t.motion}</h3>
      <div className="brand-card brand-motion">
        <div className="brand-stage">
          <span className="brand-lockup" data-layout="stacked" style={{ "--u": "3.2px" } as React.CSSProperties}>
            <svg viewBox="-4 -4 265 265" aria-hidden="true" className="brand-draw">
              <path d={BRAND_MARK_PATH} pathLength={1} />
            </svg>
            <span className="brand-lockup-text brand-draw-text">
              crafter
              <br />
              station
            </span>
          </span>
        </div>
        <p className="brand-note">{t.motionNote}</p>
      </div>

      <h3 className="brand-step" id="assets">
        05 / {t.downloads}
      </h3>
      <p className="max-w-2xl leading-7 text-muted-foreground">{t.downloadsNote}</p>
      <div className="brand-downloads">
        {assets.map((asset) => (
          <article key={asset.file} className="brand-card brand-download">
            <h4>{t[asset.key]}</h4>
            <div className="brand-download-pair">
              {(["light", "dark"] as const).map((variant) => {
                const base = `/brand/crafter-station-${asset.file}-${variant}`
                return (
                  <div key={variant} className="brand-download-variant" data-variant={variant}>
                    <div className="brand-download-preview">
                      <img
                        src={`${base}.svg`}
                        alt={`Crafter Station ${t[asset.key]}, ${variant === "light" ? t.onLight : t.onDark}`}
                        data-asset={asset.file}
                      />
                    </div>
                    <p className="station-label">{variant === "light" ? t.onLight : t.onDark}</p>
                    <div className="brand-formats">
                      {formats.map((format) => (
                        <a key={format} href={`${base}.${format}`} download>
                          {format}
                          <Download aria-hidden="true" />
                        </a>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export function BrandHero({
  locale,
  eyebrow,
  title,
  description,
}: {
  locale: Locale
  eyebrow: string
  title: string
  description: string
}) {
  const t = brandCopy[locale]
  return (
    <section className="brand-hero">
      <div className="brand-hero-head">
        <div>
          <p className="station-label station-inner-eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
        </div>
        <div className="brand-hero-side">
          <p className="brand-hero-description">{description}</p>
          <div className="brand-hero-actions">
            <a className="brand-hero-cta" data-theme-file="light" href="/brand/crafter-station-logo-stacked-light.svg" download>
              {t.download}
              <span>SVG</span>
              <Download aria-hidden="true" />
            </a>
            <a className="brand-hero-cta" data-theme-file="dark" href="/brand/crafter-station-logo-stacked-dark.svg" download>
              {t.download}
              <span>SVG</span>
              <Download aria-hidden="true" />
            </a>
            <a className="brand-hero-link" href="#assets">
              {t.allFormats}
              <ArrowDown aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
      <div className="brand-hero-stage">
        <Lockup unit={6} />
        <p className="brand-hero-spec">{t.primarySpec}</p>
      </div>
    </section>
  )
}
