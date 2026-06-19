import Link from "next/link"
import { ArrowLink } from "@/components/arrow-link"
import { Badge } from "@/components/ui/badge"
import { Container } from "@/components/grid-container"
import type { Locale } from "@/lib/i18n"
import { getProducts } from "@/lib/site"
import { cn } from "@/lib/utils"

const featuredProductSlugs = ["hack0", "petdex", "legalize-pe", "maca"] as const

export function FeaturedProducts({ locale }: { locale: Locale }) {
  const products = getProducts(locale).filter((product) =>
    featuredProductSlugs.includes(
      product.slug as (typeof featuredProductSlugs)[number],
    ),
  )

  return (
    <div id="work">
      <Container innerClassName="border-b py-6">
        <h2 className="text-center font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          Featured projects
        </h2>
      </Container>
      <hr className="border-line" />
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2">
          {products.map((p, i) => (
            <article
              key={p.slug}
              className={cn(
                "relative min-h-80 border-line p-8 md:p-10",
                i > 0 ? "border-t md:border-t-0" : "",
                i % 2 ? "md:border-l" : "",
                i >= 2 ? "md:border-t" : "",
              )}
            >
              <div
                className={cn(
                  "absolute inset-x-0 top-0 h-1 bg-gradient-to-r",
                  p.accent,
                )}
              />
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                {p.slug}
              </p>
              <h3 className="mt-4 text-3xl tracking-tight md:text-4xl">
                {p.title}
              </h3>
              <p className="mt-4 text-sm font-medium text-foreground">
                {p.tagline}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {"metrics" in p
                  ? p.metrics.map((metric) => (
                      <Badge key={metric} variant="secondary">
                        {metric}
                      </Badge>
                    ))
                  : null}
                {p.technologies.map((t) => (
                  <Badge key={t} variant="outline">
                    {t}
                  </Badge>
                ))}
              </div>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground">
                {p.description}
              </p>
              <Link
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-8 inline-block"
              >
                <ArrowLink>Visit {p.title}</ArrowLink>
              </Link>
            </article>
          ))}
        </div>
      </Container>
    </div>
  )
}
