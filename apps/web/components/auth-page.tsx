import Link from "next/link"
import type { ReactNode } from "react"

import { Container } from "@/components/grid-container"
import { authCopy } from "@/lib/auth-copy"
import { type Locale, withLocale } from "@/lib/i18n"

/** One narrow column: a short title, the Clerk form without its own chrome, and a link to the other mode. */
export function AuthPage({ mode, locale, children }: { mode: "sign-in" | "sign-up"; locale: Locale; children: ReactNode }) {
  const t = authCopy[locale]
  const signIn = mode === "sign-in"

  return (
    <main className="flex-1">
      <Container innerClassName="station-signin-page">
        <section className="station-signin" aria-labelledby="auth-title">
          <h1 id="auth-title">{signIn ? t.signInTitle : t.signUpTitle}</h1>
          <p className="station-signin-lede">{signIn ? t.signInLede : t.signUpLede}</p>
          <div className="station-signin-form">{children}</div>
          <p className="station-signin-switch">
            {signIn ? t.noAccount : t.haveAccount}{" "}
            <Link href={withLocale(signIn ? "/sign-up" : "/sign-in", locale)}>{signIn ? t.join : t.signIn}</Link>
          </p>
        </section>
      </Container>
    </main>
  )
}
