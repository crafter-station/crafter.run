import { notFound } from "next/navigation";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { ArrowLink } from "@/components/arrow-link";
import { Badge } from "@/components/ui/badge";
import { Container, SectionGap } from "@/components/grid-container";
import { LocalizedLink } from "@/components/localized-link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { JsonLd } from "@/components/json-ld";
import { isLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { getClosedProducts } from "@/lib/site";
import { breadcrumbList, productListSchema } from "@/lib/structured-data";

export const dynamicParams = false;

export function generateStaticParams() {
  return ["en", "es", "pt", "zh", "ja"].map((lang) => ({ lang }));
}

export function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  return pageMetadata({ params, path: "/products", namespace: "pages.products" });
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = await getTranslations({
    locale: lang,
    namespace: "pages.products",
  });
  const common = await getTranslations({ locale: lang, namespace: "common" });
  const nav = await getTranslations({ locale: lang, namespace: "nav" });
  const products = getClosedProducts(lang);

  return (
    <>
      <JsonLd
        data={[
          productListSchema({ products, locale: lang, name: nav("products"), path: "/products" }),
          breadcrumbList(lang, [
            { name: "Crafter Station", path: "/" },
            { name: nav("products"), path: "/products" },
          ]),
        ]}
      />
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
        <Container innerClassName="border-b px-6 py-10 md:px-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            {t("eyebrow")}
          </p>
          <h2 className="mt-3 text-3xl tracking-tight md:text-4xl">
            {t("section")}
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {t("sectionDescription")}
          </p>
        </Container>
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            {products.map((product, i) => (
              <Link
                key={product.slug}
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
                className={
                  "group min-h-72 p-8 transition-colors hover:bg-accent-surface/10 " +
                  (i > 0
                    ? "border-t border-line md:border-t-0 md:border-l "
                    : "") +
                  (i >= 2 ? "md:border-t xl:border-t-0 " : "") +
                  (i >= 3 ? "xl:border-l " : "")
                }
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                  {product.slug}
                </p>
                <h3 className="mt-3 text-2xl tracking-tight">
                  {product.title}
                </h3>
                <p className="mt-3 text-sm font-medium text-foreground">
                  {product.tagline}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {product.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {"metrics" in product
                    ? product.metrics.map((metric) => (
                        <Badge key={metric} variant="secondary">
                          {metric}
                        </Badge>
                      ))
                    : null}
                  {product.technologies.map((tech) => (
                    <Badge key={tech} variant="outline">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <ArrowLink className="mt-8">{common("openCta")}</ArrowLink>
              </Link>
            ))}
          </div>
        </Container>
        <SectionGap />
        <Container>
          <section className="grid grid-cols-1 border-y border-line md:grid-cols-[1.2fr_1fr]">
            <div className="border-b border-line p-8 md:border-b-0 md:border-r md:p-10">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                {t("ossEyebrow")}
              </p>
              <h2 className="mt-4 text-3xl tracking-tight md:text-4xl">
                {t("ossTitle")}
              </h2>
              <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                {t("ossDescription")}
              </p>
            </div>
            <div className="flex items-center p-8 md:p-10">
              <LocalizedLink href="/oss" locale={lang} className="group">
                <ArrowLink>{t("ossCta")}</ArrowLink>
              </LocalizedLink>
            </div>
          </section>
        </Container>
      </main>
      <SiteFooter locale={lang} />
    </>
  );
}
