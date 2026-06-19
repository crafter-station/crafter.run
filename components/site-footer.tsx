import Link from "next/link"
import { getTranslations } from "next-intl/server"
import { LocalizedLink } from "@/components/localized-link"
import { SiteWordmark } from "@/components/site-wordmark"
import { type Locale } from "@/lib/i18n"
import { getProducts, socials } from "@/lib/site"

const companyLinks = [
  { key: "events", href: "/events" },
  { key: "sponsorEvents", href: "/events/sponsors" },
  { key: "projects", href: "/projects" },
  { key: "team", href: "/team" },
  { key: "workWithUs", href: "/team/work-with-us" },
  { key: "contact", href: "/contact" },
]

const buildLinks = [
  { key: "projects", href: "/projects" },
  { key: "research", href: "/research" },
  { key: "next", href: "/projects/next" },
  { key: "brand", href: "/brand" },
]

const communityLinks = [
  { key: "joinCommunity", href: "https://crafters.chat" },
  { key: "lumaEvents", href: "https://luma.com/hack0" },
  { key: "hack0", href: "https://hack0.dev" },
  { key: "shippingBible", href: "https://theshippingbible.com/" },
]

export async function SiteFooter({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "footer" })
  const products = getProducts(locale)

  return (
    <footer className="border-t border-line bg-background">
      <div className="grid gap-12 px-8 py-16 md:grid-cols-3 xl:grid-cols-5">
        <div>
          <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            {t("company")}
          </p>
          <ul className="space-y-3 text-sm">
            {companyLinks.map((l) => (
              <li key={l.key}>
                <LocalizedLink
                  href={l.href}
                  locale={locale}
                  className="text-foreground transition-colors hover:text-muted-foreground"
                >
                  {t(`companyLinks.${l.key}`)}
                </LocalizedLink>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            {t("build")}
          </p>
          <ul className="space-y-3 text-sm">
            {buildLinks.map((l) => (
              <li key={l.key}>
                <LocalizedLink
                  href={l.href}
                  locale={locale}
                  className="text-foreground transition-colors hover:text-muted-foreground"
                >
                  {t(`buildLinks.${l.key}`)}
                </LocalizedLink>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            {t("productLab")}
          </p>
          <ul className="space-y-3 text-sm">
            {products.slice(0, 6).map((p) => (
              <li key={p.slug}>
                <Link
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground transition-colors hover:text-muted-foreground"
                >
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            {t("community")}
          </p>
          <ul className="space-y-3 text-sm">
            {communityLinks.map((l) => (
              <li key={l.key}>
                <Link
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground transition-colors hover:text-muted-foreground"
                >
                  {t(`communityLinks.${l.key}`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            {t("social")}
          </p>
          <ul className="space-y-3 text-sm">
            {socials.map((s) => (
              <li key={s.label}>
                <Link
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground transition-colors hover:text-muted-foreground"
                >
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="flex flex-col items-start justify-between gap-3 px-8 py-6 md:flex-row md:items-center">
          <SiteWordmark />
          <p className="font-mono text-[10px] tracking-wider text-muted-foreground">
            {t("copyright", { year: new Date().getFullYear() })}
          </p>
        </div>
      </div>
    </footer>
  )
}
