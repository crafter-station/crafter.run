import Image from "next/image"
import { Download } from "lucide-react"
import { getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"

import { Container, SectionGap } from "@/components/grid-container"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { isLocale, locales } from "@/lib/i18n"
import { pageMetadata } from "@/lib/seo"

export const dynamicParams = false

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  return pageMetadata({ params, path: "/brand", namespace: "pages.brand" })
}

const formats = ["svg", "png", "webp", "jpg"] as const

function AssetCard({
  name,
  variant,
  previewLabel,
  dark,
  wide = false,
}: {
  name: "icon" | "logo-wordmark" | "wordmark"
  variant: "light" | "dark"
  previewLabel: string
  dark: boolean
  wide?: boolean
}) {
  const basename = `crafter-station-${name}-${variant}`
  const assetLabel = name === "icon" ? "logo" : name === "logo-wordmark" ? "logo and wordmark" : "wordmark"

  return (
    <article className="overflow-hidden border border-line bg-background">
      <div
        className={`relative flex h-72 items-center justify-center p-10 md:h-80 md:p-14 ${
          dark ? "bg-[#0d0d0d]" : "bg-[#f4f2ee]"
        }`}
      >
        <Image
          src={`/brand/${basename}.svg`}
          alt={`${previewLabel} Crafter Station ${assetLabel}`}
          width={wide ? 800 : 280}
          height={wide ? 200 : 280}
          loading="eager"
          className={wide ? "h-auto w-full max-w-[520px]" : "h-36 w-36 md:h-44 md:w-44"}
        />
      </div>
      <div className="border-t border-line p-5 md:p-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
          {previewLabel}
        </p>
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {formats.map((format) => (
            <a
              key={format}
              href={`/brand/${basename}.${format}`}
              download
              className="group inline-flex h-10 items-center justify-between border border-line px-3 font-mono text-[10px] uppercase tracking-[0.15em] transition-colors hover:border-foreground/40 hover:bg-foreground hover:text-background"
            >
              {format}
              <Download className="h-3.5 w-3.5 opacity-50 transition-opacity group-hover:opacity-100" />
            </a>
          ))}
        </div>
      </div>
    </article>
  )
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const t = await getTranslations({ locale: lang, namespace: "pages.brand" })

  return (
    <>
      <SiteHeader locale={lang} />
      <main className="flex-1">
        <Container innerClassName="px-6 py-16 md:px-10 md:py-24">
          <div className="max-w-4xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-accent">
              {t("eyebrow")}
            </p>
            <h1 className="mt-5 text-balance text-5xl font-semibold tracking-tighter md:text-7xl">
              {t("title")}
            </h1>
            <p className="mt-6 max-w-2xl text-balance text-lg leading-8 text-muted-foreground">
              {t("description")}
            </p>
          </div>
        </Container>

        <SectionGap />

        <Container innerClassName="px-6 py-14 md:px-10 md:py-20">
          <div className="mb-8 max-w-2xl md:mb-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              01 / {t("assets")}
            </p>
            <h2 className="mt-3 text-3xl tracking-tight md:text-4xl">{t("iconTitle")}</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {t("iconDescription")}
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <AssetCard name="icon" variant="light" previewLabel={t("lightMode")} dark={false} />
            <AssetCard name="icon" variant="dark" previewLabel={t("darkMode")} dark />
          </div>
        </Container>

        <SectionGap />

        <Container innerClassName="px-6 py-14 md:px-10 md:py-20">
          <div className="mb-8 max-w-2xl md:mb-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              02 / {t("assets")}
            </p>
            <h2 className="mt-3 text-3xl tracking-tight md:text-4xl">{t("standaloneTitle")}</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {t("standaloneDescription")}
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <AssetCard name="wordmark" variant="light" previewLabel={t("lightMode")} dark={false} wide />
            <AssetCard name="wordmark" variant="dark" previewLabel={t("darkMode")} dark wide />
          </div>
        </Container>

        <SectionGap />

        <Container innerClassName="px-6 py-14 md:px-10 md:py-20">
          <div className="mb-8 max-w-2xl md:mb-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              03 / {t("assets")}
            </p>
            <h2 className="mt-3 text-3xl tracking-tight md:text-4xl">{t("wordmarkTitle")}</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {t("wordmarkDescription")}
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <AssetCard name="logo-wordmark" variant="light" previewLabel={t("lightMode")} dark={false} wide />
            <AssetCard name="logo-wordmark" variant="dark" previewLabel={t("darkMode")} dark wide />
          </div>
        </Container>

        <SectionGap />

        <Container innerClassName="grid gap-8 px-6 py-14 md:grid-cols-[1fr_2fr] md:px-10 md:py-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            {t("usageTitle")}
          </p>
          <p className="max-w-2xl text-lg leading-8 text-foreground/80">{t("usageDescription")}</p>
        </Container>
      </main>
      <SiteFooter locale={lang} />
    </>
  )
}
