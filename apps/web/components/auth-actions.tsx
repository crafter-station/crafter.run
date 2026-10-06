"use client"

import { SignInButton, UserButton, useAuth } from "@clerk/nextjs"
import Link from "next/link"
import { stationCopy } from "@/lib/station-copy"

import { type Locale, withLocale } from "@/lib/i18n"

export function AuthActions({ locale }: { locale: Locale }) {
  const { isLoaded, isSignedIn } = useAuth()
  const t = stationCopy[locale]
  const className = "station-auth-link"

  if (!isLoaded) return null

  return isSignedIn ? (
    <>
        <Link href={withLocale("/settings/profile", locale)} className={className}>
          {t.profile}
        </Link>
        <Link href={withLocale("/ships/new", locale)} className={className}>
          {t.newShip}
        </Link>
        <div className="flex items-center py-2">
          <UserButton />
        </div>
    </>
  ) : (
    <SignInButton mode="modal">
      <button type="button" className={className}>{t.signIn}</button>
    </SignInButton>
  )
}
