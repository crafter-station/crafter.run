import Link from "next/link"
import { getTranslations } from "next-intl/server"

import { Container } from "@/components/grid-container"
import { NotFoundSurface } from "@/components/not-found-surface"
import { PixelArrow } from "@/components/pixel-arrow"
import { type Locale, withLocale } from "@/lib/i18n"

const SUGGESTIONS = [
  { key: "docs", href: "/docs" },
  { key: "oss", href: "/oss" },
  { key: "ships", href: "/ships" },
  { key: "events", href: "/events" },
  { key: "team", href: "/team" },
] as const

/**
 * Shared by both 404 entry points: `app/[lang]/not-found.tsx` for a
 * `notFound()` thrown inside a localized route, and `app/global-not-found.tsx`
 * for a URL that matched no route at all.
 *
 * The figure lives in the water, not in the DOM. The painter keeps it right of
 * center on wide viewports and above the fold on narrow ones, which is the
 * same split the copy column follows here.
 */
export async function NotFoundView({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "pages.notFound" })

  return (
    <Container innerClassName="overflow-hidden bg-background">
      <div className="relative min-h-[720px] lg:h-[680px] lg:min-h-0">
        {/* The same figure, set in the DOM and laid out to match. The water
            paints an opaque background, so wherever it runs it simply covers
            this; wherever it does not (reduced motion, no JavaScript, no
            WebGL) the page still has its 404. */}
        <div
          aria-hidden
          className="absolute inset-0 z-0 flex select-none flex-col items-center justify-start pt-[9%] lg:items-end lg:justify-center lg:pt-0 lg:pr-[8%]"
        >
          <span className="font-bold leading-none tracking-tight text-[22vw] text-foreground lg:text-[13rem]">
            404
          </span>
          <span className="mt-6 font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
            {t("caption")}
          </span>
        </div>

        <NotFoundSurface caption={t("caption")} className="z-1" />

        {/* Settles the ripple specular behind the copy without touching the
            figure: a vertical fade while the two are stacked, and a narrow
            left band once they sit side by side. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 z-2 h-1/2 bg-linear-to-t from-background via-background/85 to-transparent lg:hidden"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-2 hidden w-[40%] bg-linear-to-r from-background via-background/85 to-transparent lg:block"
        />

        <div className="pointer-events-none absolute inset-0 z-10">
          <div className="mx-auto flex h-full w-full max-w-[1380px] flex-col px-4 py-10 sm:px-6 sm:py-12 md:px-10 md:py-14">
            <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
              {t("eyebrow")}
            </p>

            {/* Stacked, the copy sits under the figure; side by side, it
                centers against it. */}
            {/* A fixed column would reach under the figure at the lg
                breakpoint; a percentage keeps the gutter between the two
                proportional at every width. */}
            <div className="flex max-w-xl flex-1 flex-col justify-end py-10 lg:max-w-[40%] lg:justify-center">
              <h1 className="text-balance font-bold uppercase leading-[0.95] tracking-tight text-4xl text-foreground sm:text-5xl lg:text-6xl">
                {t("title")}
              </h1>
              <p className="mt-5 text-balance leading-relaxed text-foreground/80 md:text-lg">
                {t("description")}
              </p>

              <div className="pointer-events-auto mt-8 inline-grid w-full grid-cols-1 gap-3 sm:w-fit sm:grid-flow-col sm:auto-cols-max">
                <Link
                  href={withLocale("/", locale)}
                  className="group flex items-center justify-between gap-3 border border-background bg-foreground px-6 py-3 font-medium text-background transition-colors hover:bg-foreground/90"
                >
                  {t("homeCta")}
                  <PixelArrow />
                </Link>
                <Link
                  href={withLocale("/oss", locale)}
                  className="group flex items-center justify-between gap-3 border border-foreground/20 bg-background/20 px-6 py-3 text-foreground/85 backdrop-blur-[2px] transition-colors hover:border-foreground/50 hover:bg-background/40"
                >
                  {t("ossCta")}
                  <PixelArrow />
                </Link>
              </div>

              <div className="pointer-events-auto mt-9 flex flex-wrap items-center gap-x-5 gap-y-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                  {t("suggestionsLabel")}
                </span>
                {SUGGESTIONS.map((suggestion) => (
                  <Link
                    key={suggestion.key}
                    href={withLocale(suggestion.href, locale)}
                    className="border-b border-foreground/20 pb-0.5 text-sm text-foreground/80 transition-colors hover:border-foreground hover:text-foreground"
                  >
                    {t(`links.${suggestion.key}`)}
                  </Link>
                ))}
              </div>
            </div>

            {/* Only meaningful when there is water to disturb. */}
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground motion-reduce:hidden">
              {t("hint")}
            </p>
          </div>
        </div>
      </div>
    </Container>
  )
}
