"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useReverification, useUser } from "@clerk/nextjs"
import type { EmailAddressResource } from "@clerk/nextjs/types"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { hotReloadCopy, hotReloadText } from "@/lib/hot-reload-copy"
import type { Locale } from "@/lib/i18n"

/* Adds the Luma email to the Clerk account as a verified secondary address
   (https://clerk.com/docs/guides/development/custom-flows/account-updates/add-email).
   Event pages check Luma against every verified address, so a refresh is
   all it takes once the code is accepted. */
export function LinkLumaEmail({ locale }: { locale: Locale }) {
  const t = hotReloadCopy[locale]
  const router = useRouter()
  const { user } = useUser()
  const [email, setEmail] = useState("")
  const [code, setCode] = useState("")
  const [address, setAddress] = useState<EmailAddressResource | null>(null)
  const [verifiedEmail, setVerifiedEmail] = useState<string | null>(null)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const createEmailAddress = useReverification((value: string) => user?.createEmailAddress({ email: value }))

  function refreshWithEmail(value: string) {
    setVerifiedEmail(value)
    setAddress(null)
    setCode("")
    router.refresh()
  }

  function reset() {
    setVerifiedEmail(null)
    setAddress(null)
    setEmail("")
    setCode("")
    setError(null)
  }

  async function sendCode(event: React.FormEvent) {
    event.preventDefault()
    if (!user || pending) return
    setPending(true)
    setError(null)
    try {
      const normalized = email.trim().toLowerCase()
      const existing = user.emailAddresses.find((item) => item.emailAddress.toLowerCase() === normalized)
      const created = existing ?? (await createEmailAddress(normalized))
      await user.reload()
      const target = user.emailAddresses.find((item) => item.id === created?.id)
      if (!target) throw new Error()
      if (target.verification.status === "verified") {
        refreshWithEmail(target.emailAddress)
        return
      }
      await target.prepareVerification({ strategy: "email_code" })
      setAddress(target)
    } catch {
      setError(t.linkError)
    } finally {
      setPending(false)
    }
  }

  async function verify(event: React.FormEvent) {
    event.preventDefault()
    if (!address || pending) return
    setPending(true)
    setError(null)
    try {
      const result = await address.attemptVerification({ code: code.trim() })
      if (result.verification.status !== "verified") throw new Error()
      await user?.reload()
      refreshWithEmail(result.emailAddress)
    } catch {
      setError(t.verifyError)
    } finally {
      setPending(false)
    }
  }

  const step = address ? 2 : 1

  if (verifiedEmail) return (
    <div className="mt-6 border-t border-line pt-5">
      <h3 className="text-base font-medium text-foreground">{t.linkedTitle}</h3>
      <p className="mt-1 break-words text-sm text-muted-foreground" role="status">
        {hotReloadText(t.linkedBody, { email: verifiedEmail })}
      </p>
      <button type="button" onClick={reset} className="mt-3 text-sm underline underline-offset-4">
        {t.anotherEmail}
      </button>
    </div>
  )

  return (
    <div className="mt-6 border-t border-line pt-5">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="text-base font-medium text-foreground">{t.linkTitle}</h3>
        <span className="font-mono text-xs text-muted-foreground">{step}/2</span>
      </div>
      <p className="mt-1 break-words text-sm text-muted-foreground">
        {address
          ? hotReloadText(t.codeSent, { email: address.emailAddress })
          : t.linkBody}
      </p>
      <form onSubmit={address ? verify : sendCode} className="mt-4">
        <Label htmlFor={address ? "luma-code" : "luma-email"} className="text-xs text-muted-foreground">
          {address ? t.code : t.email}
        </Label>
        <div className="mt-1.5 flex flex-col gap-2 sm:flex-row">
          {address ? (
            <Input
              id="luma-code"
              inputMode="numeric"
              autoComplete="one-time-code"
              placeholder="123456"
              value={code}
              disabled={pending}
              onChange={(e) => setCode(e.target.value)}
              className="h-10 flex-1 font-mono tracking-[0.3em]"
            />
          ) : (
            <Input
              id="luma-email"
              type="email"
              autoComplete="email"
              placeholder={t.emailPlaceholder}
              value={email}
              disabled={pending}
              onChange={(e) => setEmail(e.target.value)}
              className="h-10 flex-1"
            />
          )}
          <Button
            type="submit"
            disabled={pending || (address ? code.trim().length < 6 : !email.includes("@"))}
            className="h-10 shrink-0 sm:min-w-36"
          >
            {pending ? <Loader2 className="animate-spin" /> : null}
            {address ? t.verify : t.sendCode}
          </Button>
        </div>
        {address ? (
          <button
            type="button"
            disabled={pending}
            onClick={reset}
            className="mt-2 text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            {t.anotherEmail}
          </button>
        ) : null}
        {error ? (
          <p className="mt-2 text-sm text-destructive" role="alert">
            {error}
          </p>
        ) : null}
      </form>
    </div>
  )
}
