import { redirect } from "next/navigation"

import { isLocale } from "@/lib/i18n"

export default async function SettingsIndex({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  redirect(isLocale(lang) ? `/${lang}/settings/profile` : "/en/settings/profile")
}
