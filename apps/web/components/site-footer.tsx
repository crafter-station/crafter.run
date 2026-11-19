import { getTranslations } from "next-intl/server"
import { LocalizedLink } from "@/components/localized-link"
import { SiteWordmark } from "@/components/site-wordmark"
import type { Locale } from "@/lib/i18n"
import { navCopy } from "@/lib/navigation-copy"
import { navSections, siteConfig } from "@/lib/site"
import { stationCopy } from "@/lib/station-copy"

type FooterLink = { label: string; href: string; external?: boolean }

export async function SiteFooter({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "footer" })
  const nav = navCopy[locale]
  const s = stationCopy[locale]
  // Station mirrors the sidebar; the rest is everything that used to hide behind "More".
  const columns: { title: string; links: FooterLink[] }[] = [
    {
      title: s.home,
      links: [
        { label: nav.universe, href: "/universe" },
        { label: nav.ships, href: "/ships" },
        { label: nav.oss, href: "/oss" },
        { label: nav.events, href: "/events" },
        { label: nav.blog, href: "/blog" },
        { label: nav.changelog, href: "/changelog" },
      ],
    },
    ...navSections.map((section) => ({
      title: nav[section.key],
      links: section.items.filter((item) => item.href !== "/ships").map((item) => ({ label: nav[item.key], href: item.href })),
    })),
    {
      title: t("build"),
      links: [
        { label: s.docs, href: "/docs" },
        { label: s.visualSystem, href: "/brand" },
        { label: nav.communityCta, href: "https://crafters.chat", external: true },
        { label: "llms.txt", href: "/llms.txt", external: true },
      ],
    },
  ]

  return (
    <footer className="station-footer">
      <div className="station-footer-inner">
        <div className="station-footer-columns">
          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <p className="station-footer-title">{column.title}</p>
              <ul>
                {column.links.map((link) => (
                  <li key={link.href}>
                    {link.external
                      ? <a href={link.href} {...(link.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{link.label}</a>
                      : <LocalizedLink href={link.href} locale={locale}>{link.label}</LocalizedLink>}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="station-footer-signature">
          <LocalizedLink href="/" locale={locale}><SiteWordmark /></LocalizedLink>
          <p>{t("copyright", { year: new Date().getFullYear(), tagline: siteConfig.tagline[locale] })}</p>
        </div>
      </div>
    </footer>
  )
}
