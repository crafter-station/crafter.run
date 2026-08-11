"use client"

import { SignInButton, UserButton, useAuth } from "@clerk/nextjs"
import Link from "next/link"

import { type Locale, withLocale } from "@/lib/i18n"

export function AuthActions({ locale, mobile = false }: { locale: Locale; mobile?: boolean }) {
  const { isLoaded, isSignedIn } = useAuth()
  const className = mobile
    ? "inline-flex items-center justify-center border border-line px-4 py-3 text-sm font-medium"
    : "inline-flex h-16 items-center border-l border-line px-4 font-mono text-[10px] uppercase tracking-[0.16em] transition-colors hover:bg-accent-surface/10"

  if (!isLoaded) return null

  return isSignedIn ? (
    <>
        <Link href={withLocale("/ships/new", locale)} className={className}>
          Ship something
        </Link>
        <div className={mobile ? "flex items-center justify-center py-3" : "flex h-16 items-center border-l border-line px-4"}>
          <UserButton />
        </div>
    </>
  ) : (
    <SignInButton mode="modal">
      <button type="button" className={className}>Sign in</button>
    </SignInButton>
  )
}
