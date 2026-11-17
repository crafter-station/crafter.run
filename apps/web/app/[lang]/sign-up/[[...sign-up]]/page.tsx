import { SignUp } from "@clerk/nextjs"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { AuthPage } from "@/components/auth-page"
import { authAppearance } from "@/lib/auth-appearance"
import { authCopy } from "@/lib/auth-copy"
import { isLocale } from "@/lib/i18n"
import { buildMetadata } from "@/lib/seo"

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  if (!isLocale(lang)) return {}
  const t = authCopy[lang]
  return { ...buildMetadata({ locale: lang, path: "/sign-up", title: t.metaSignUp, description: t.metaDescription }), robots: { index: false, follow: false } }
}

export default async function SignUpPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  return (
    <AuthPage mode="sign-up" locale={lang}>
      <SignUp appearance={authAppearance} />
    </AuthPage>
  )
}
