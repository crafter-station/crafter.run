import { notFound } from "next/navigation"
import { getTranslations } from "next-intl/server"
import { ArrowLink } from "@/components/arrow-link"
import { CalEmbed } from "@/components/cal-embed"
import { Container, SectionGap } from "@/components/grid-container"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { isLocale, withLocale } from "@/lib/i18n"
import { pageMetadata } from "@/lib/seo"
import { getServices } from "@/lib/site"

export const dynamicParams = false

export function generateStaticParams() {
  return ["en", "es", "pt", "zh", "ja"].map((lang) => ({ lang }))
}

export function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  return pageMetadata({ params, path: "/team/work-with-us", namespace: "pages.work-with-us" })
}

const calendarCopy = {
  en: {
    eyebrow: "Book an engineering & design call",
    title: "Show us the product challenge your team needs to unblock.",
    description:
      "Bring the product context, technical constraints, and desired outcome. We will explore where Crafter Station's core team can add senior engineering and design leverage.",
  },
  es: {
    eyebrow: "Agenda una llamada de ingeniería y diseño",
    title: "Muéstranos el desafío de producto que tu equipo necesita destrabar.",
    description:
      "Trae el contexto de producto, las restricciones técnicas y el resultado esperado. Veremos dónde el core team de Crafter Station puede aportar ingeniería y diseño senior.",
  },
  pt: {
    eyebrow: "Agende uma chamada de engenharia e design",
    title: "Mostre o desafio de produto que seu time precisa destravar.",
    description:
      "Traga o contexto do produto, as restricoes tecnicas e o resultado esperado. Vamos explorar onde o core team da Crafter Station pode adicionar engenharia e design senior.",
  },
  zh: {
    eyebrow: "预约工程与设计咨询",
    title: "告诉我们你的团队需要突破的产品挑战。",
    description:
      "带上产品背景、技术限制和期望结果。我们会一起判断 Crafter Station 核心团队能在哪些环节提供资深工程与设计能力。",
  },
  ja: {
    eyebrow: "エンジニアリング・デザイン相談を予約",
    title: "チームが前に進めたいプロダクト課題をお聞かせください。",
    description:
      "プロダクトの背景、技術的な制約、目指す成果を共有してください。Crafter Station のコアチームが、シニアなエンジニアリングとデザインで貢献できる領域を一緒に見極めます。",
  },
} as const

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const t = await getTranslations({ locale: lang, namespace: "pages.work-with-us" })
  const common = await getTranslations({ locale: lang, namespace: "common" })
  const calendar = calendarCopy[lang]
  const services = getServices(lang).filter((service) => service.href !== "/events/sponsors")

  return (
    <><SiteHeader locale={lang} /><main className="flex-1"><Container innerClassName="px-6 py-16 md:px-10 md:py-24"><div className="max-w-4xl"><p className="font-mono text-[10px] uppercase tracking-[0.35em] text-accent">{t("eyebrow")}</p><h1 className="mt-5 text-balance text-5xl font-semibold tracking-tighter md:text-7xl">{t("title")}</h1><p className="mt-6 max-w-2xl text-balance text-lg leading-8 text-muted-foreground">{t("description")}</p></div></Container><SectionGap /><Container innerClassName="border-b px-6 py-10 md:px-10"><p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{t("eyebrow")}</p><h2 className="mt-3 text-3xl tracking-tight md:text-4xl">{t("section")}</h2><p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">{t("sectionDescription")}</p></Container><Container><div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4">{services.map((service, i) => <a key={service.title} href={withLocale(service.href, lang)} className={"group min-h-56 p-8 transition-colors hover:bg-accent-surface/10 " + (i > 0 ? "border-t border-line md:border-t-0 md:border-l " : "") + (i >= 2 ? "md:border-t xl:border-t-0 " : "") + (i >= 4 ? "xl:border-t " : "")}><h3 className="text-lg tracking-tight">{service.title}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{service.body}</p><ArrowLink className="mt-8">{common("openCta")}</ArrowLink></a>)}</div></Container><SectionGap /><Container innerClassName="border-y px-6 py-10 md:px-10"><p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">{calendar.eyebrow}</p><h2 className="mt-3 max-w-3xl text-3xl tracking-tight md:text-4xl">{calendar.title}</h2><p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">{calendar.description}</p></Container><CalEmbed calLink="crafter/engineering" namespace="engineering" /></main><SiteFooter locale={lang} /></>
  )
}
