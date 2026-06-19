import { notFound } from "next/navigation"
import Link from "next/link"
import { getTranslations } from "next-intl/server"
import { ArrowLink } from "@/components/arrow-link"
import { Container, SectionGap } from "@/components/grid-container"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { isLocale } from "@/lib/i18n"
import { pageMetadata } from "@/lib/seo"
import { getResearchLinks } from "@/lib/site"

export const dynamicParams = false

export function generateStaticParams() {
  return ["en", "es", "pt"].map((lang) => ({ lang }))
}

export function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  return pageMetadata({ params, path: "/blog", namespace: "pages.blog" })
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const t = await getTranslations({ locale: lang, namespace: "pages.blog" })
  const common = await getTranslations({ locale: lang, namespace: "common" })
  const links = getResearchLinks(lang)

  return (
    <><SiteHeader locale={lang} /><main className="flex-1"><Container innerClassName="px-6 py-16 md:px-10 md:py-24"><div className="max-w-4xl"><p className="font-mono text-[10px] uppercase tracking-[0.35em] text-accent">{t("eyebrow")}</p><h1 className="mt-5 text-balance text-5xl font-semibold tracking-[-0.05em] md:text-7xl">{t("title")}</h1><p className="mt-6 max-w-2xl text-balance text-lg leading-8 text-muted-foreground">{t("description")}</p></div></Container><SectionGap /><Container innerClassName="border-b px-6 py-10 md:px-10"><p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{t("eyebrow")}</p><h2 className="mt-3 text-3xl tracking-tight md:text-4xl">{t("section")}</h2><p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">{t("sectionDescription")}</p></Container><Container><div className="grid grid-cols-1 md:grid-cols-2">{links.map((link, i) => <Link key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className={"group min-h-56 p-8 transition-colors hover:bg-accent/10 " + (i > 0 ? "border-t border-line md:border-t-0 md:border-l " : "")}><h3 className="text-lg tracking-tight">{link.title}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{link.body}</p><ArrowLink className="mt-8">{common("openCta")}</ArrowLink></Link>)}</div></Container></main><SiteFooter locale={lang} /></>
  )
}
