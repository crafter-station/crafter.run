import { notFound } from "next/navigation"
import { ArrowUpRight } from "lucide-react"
import { Container } from "@/components/grid-container"
import { JsonLd } from "@/components/json-ld"
import { ProductArt, ProductsHeroArt } from "@/components/product-art"
import { isLocale, locales } from "@/lib/i18n"
import { products, productsCopy } from "@/lib/products"
import { buildMetadata } from "@/lib/seo"
import { breadcrumbList } from "@/lib/structured-data"

export const dynamicParams = false
export function generateStaticParams() { return locales.map(lang => ({ lang })) }
export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLocale(lang)) return {}
  const t = productsCopy[lang]
  return buildMetadata({ locale: lang, path: "/products", title: t.name, description: t.description })
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const t = productsCopy[lang]

  return <>
    <JsonLd data={breadcrumbList(lang, [{ name: "Crafter Station", path: "/" }, { name: t.name, path: "/products" }])} />
    <main className="flex-1">
      <Container innerClassName="station-page-intro station-inner-hero">
        <p className="station-label station-inner-eyebrow">{t.eyebrow}</p>
        <h1>{t.title}</h1>
        <div className="station-inner-hero-layout">
          <div className="station-inner-hero-copy"><p>{t.description}</p></div>
          <ProductsHeroArt />
        </div>
      </Container>
      <Container innerClassName="products-list">
        {products.map(product => (
          <article key={product.slug} className={`product-card product-card-${product.slug}`} aria-labelledby={`product-${product.slug}`}>
            <a className="product-card-link" href={product.url} target="_blank" rel="noopener noreferrer">
              <div className="product-card-art"><ProductArt slug={product.slug} /></div>
              <div className="product-card-body">
                <div className="product-card-meta station-label"><span>{product.platform}</span><span className="product-status">{product.status[lang]}</span></div>
                <h2 id={`product-${product.slug}`}>{product.name}</h2>
                <p className="product-tagline">{product.tagline[lang]}</p>
                <p className="product-description">{product.description[lang]}</p>
                <ul className="product-features">{product.features[lang].map(feature => <li key={feature}>{feature}</li>)}</ul>
                <span className="product-cta">{product.cta[lang]} · {new URL(product.url).host}<ArrowUpRight size={16} aria-hidden="true" /></span>
              </div>
            </a>
          </article>
        ))}
        <p className="products-made-by station-label">{t.madeBy}</p>
      </Container>
    </main>
  </>
}
