import Link from "next/link"
import { getTranslations } from "next-intl/server"

import { Container } from "@/components/grid-container"
import {
  NotFoundBackdrop,
  NotFoundBackdropProvider,
  NotFoundFigure,
  NotFoundHint,
  NotFoundScrims,
} from "@/components/not-found-backdrop"
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
 * What sits behind the copy depends on what the browser can run, and
 * `not-found-backdrop.tsx` is what decides: a black hole on WebGPU, the home
 * page's water on WebGL, and neither under reduced motion. All three keep the
 * figure right of center on wide viewports and above the fold on narrow ones,
 * which is the same split the copy column follows here.
 */
export async function NotFoundView({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "pages.notFound" })

  return (
    <NotFoundBackdropProvider>
      <Container innerClassName="overflow-hidden bg-background">
        <div className="relative min-h-[720px] lg:h-[680px] lg:min-h-0">
          <NotFoundFigure caption={t("caption")} />
          <NotFoundBackdrop caption={t("caption")} />

          <NotFoundScrims />

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

              <NotFoundHint water={t("hint")} blackHole={t("hintBlackHole")} />
            </div>
          </div>
        </div>
      </Container>
    </NotFoundBackdropProvider>
  )
}
