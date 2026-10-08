import { notFound } from "next/navigation"
import { FontSpecimen } from "@/components/font-specimen"
import { fontCopy } from "@/lib/font-copy"
import { isLocale, locales } from "@/lib/i18n"
import { buildMetadata } from "@/lib/seo"

export const dynamicParams = false
export function generateStaticParams() { return locales.map(lang => ({ lang })) }
export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLocale(lang)) return {}
  return buildMetadata({ locale: lang, path: "/font", title: "Crafter Sans", description: fontCopy[lang].intro })
}
export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  return <FontSpecimen locale={lang} />
}
