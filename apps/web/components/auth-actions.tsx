"use client"

import { UserButton, useAuth } from "@clerk/nextjs"
import { UserRound } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { authCopy } from "@/lib/auth-copy"
import { type Locale, withLocale } from "@/lib/i18n"
import { stationCopy } from "@/lib/station-copy"

const avatar = { elements: { userButtonAvatarBox: "size-7" } }

// The account entry. `side` lives in the sidebar and the mobile drawer, `top` is the compact
// control in the mobile bar. Both reserve their final size while Clerk loads so nothing jumps.
export function AuthActions({ locale, variant = "side" }: { locale: Locale; variant?: "side" | "top" }) {
  const { isLoaded, isSignedIn } = useAuth()
  const pathname = usePathname() ?? ""
  const t = stationCopy[locale]
  const a = authCopy[locale]
  const onAuthPage = /\/sign-(in|up)(\/|$)/.test(pathname)
  const query = onAuthPage ? "" : `?redirect_url=${encodeURIComponent(pathname)}`
  const signIn = `${withLocale("/sign-in", locale)}${query}`
  const signUp = `${withLocale("/sign-up", locale)}${query}`

  if (variant === "top") {
    return (
      <div className="station-auth-top" aria-busy={!isLoaded}>
        {!isLoaded ? null : isSignedIn
          ? <UserButton appearance={avatar} />
          : <Link href={signIn} className="station-auth-icon" aria-label={t.signIn}><UserRound size={20} aria-hidden="true" /></Link>}
      </div>
    )
  }

  return (
    <div className="station-auth" role="group" aria-label={a.account} aria-busy={!isLoaded}>
      {!isLoaded ? null : isSignedIn ? (
        <>
          <div className="station-auth-row">
            <UserButton appearance={avatar} />
            <Link href={withLocale("/settings/profile", locale)} className="station-auth-link">{t.profile}</Link>
          </div>
          <Link href={withLocale("/ships/new", locale)} className="station-auth-link">{t.newShip}</Link>
        </>
      ) : (
        <>
          <Link href={signIn} className="station-auth-link">{t.signIn}</Link>
          <Link href={signUp} className="station-auth-link station-auth-join">{a.join}</Link>
        </>
      )}
    </div>
  )
}
