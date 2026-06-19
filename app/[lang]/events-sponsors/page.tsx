import { notFound, redirect } from "next/navigation"
import { isLocale } from "@/lib/i18n"

export const dynamicParams = false

export function generateStaticParams() {
  return ["en", "es", "pt"].map((lang) => ({ lang }))
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()

  redirect(`/${lang}/events/sponsors`)
}
