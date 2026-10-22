"use client"

import { useEffect, useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { claimCredits, confirmCredits, joinWaitlist, reportCredits } from "@/app/[lang]/events/[event]/credits/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { CreditError, RoundState } from "@/lib/event-credits"
import { eventCreditsCopy } from "@/lib/event-credits-copy"
import type { Locale } from "@/lib/i18n"

const POLL_MS = 5000

export function WaitlistForm({ locale, slug, defaultName }: { locale: Locale; slug: string; defaultName: string }) {
  const t = eventCreditsCopy[locale]
  const router = useRouter()
  const [name, setName] = useState(defaultName)
  const [error, setError] = useState<CreditError | null>(null)
  const [pending, start] = useTransition()
  return <form className="mt-8 grid gap-3" onSubmit={event => {
    event.preventDefault()
    start(async () => {
      const result = await joinWaitlist(slug, name)
      if (result.ok) router.refresh()
      else setError(result.error)
    })
  }}>
    <Label htmlFor="credits-name">{t.name}</Label>
    <Input id="credits-name" value={name} onChange={event => setName(event.target.value)} autoComplete="name" required minLength={2} maxLength={120} />
    {error ? <p role="alert" className="text-sm text-destructive">{t.errors[error]}</p> : null}
    <Button type="submit" disabled={pending}>{pending ? t.joining : t.join}</Button>
  </form>
}

type PanelProps = { locale: Locale; slug: string; kind: "luma" | "waitlist"; state: RoundState; present: boolean; code: string | null; reported: boolean; taken: boolean }

export function CreditsPanel({ locale, slug, kind, state, present, code, reported, taken }: PanelProps) {
  const t = eventCreditsCopy[locale]
  const router = useRouter()
  const [input, setInput] = useState("")
  const [error, setError] = useState<CreditError | null>(null)
  const [copied, setCopied] = useState(false)
  const [flagged, setFlagged] = useState(reported)
  const [claimed, setClaimed] = useState(taken)
  const [pending, start] = useTransition()

  // The round is driven from the admin, so the page follows it until a code arrives.
  useEffect(() => {
    if (code || state === "closed") return
    const id = setInterval(() => router.refresh(), POLL_MS)
    return () => clearInterval(id)
  }, [code, state, present, router])

  const heading = kind === "luma" ? t.checkedLuma : t.checkedWaitlist
  if (code) {
    return <div className="entry-notice">
      <h2>{t.yourCode}</h2>
      <p className="mt-6 break-all font-mono text-[clamp(16px,3vw,26px)] text-foreground">{code}</p>
      <div className="mt-6 flex flex-wrap gap-3">
        {/^https:\/\//.test(code) ? <Button asChild><a href={code} target="_blank" rel="noopener noreferrer" onClick={() => { void claimCredits(slug).then(() => setClaimed(true)) }}>{t.open}</a></Button> : null}
        <Button variant={/^https:\/\//.test(code) ? "outline" : "default"} onClick={async () => { await navigator.clipboard.writeText(code); setCopied(true); void claimCredits(slug).then(() => setClaimed(true)) }}>{copied ? t.copied : t.copy}</Button>
        <Button variant="outline" disabled={flagged || pending} onClick={() => start(async () => { if ((await reportCredits(slug)).ok) setFlagged(true) })}>{t.report}</Button>
      </div>
      {flagged ? <p role="status">{t.reported}</p> : null}
      {claimed ? <Button asChild variant="outline" className="mt-6"><a href={`/${locale}/events/${slug}/badge`}>{t.badge}</a></Button> : null}
    </div>
  }
  if (state === "closed") {
    return <div className="entry-notice"><h2>{heading}</h2><p>{present ? t.noCreditBody : t.missedBody}</p></div>
  }
  if (present) return <div className="entry-notice"><h2>{heading}</h2><p>{t.presentBody}</p></div>
  return <div className="entry-notice">
    <h2>{heading}</h2>
    <p>{t.waitBody}</p>
    {state === "open" ? <form className="mt-8 grid gap-3" onSubmit={event => {
      event.preventDefault()
      setError(null)
      start(async () => {
        const result = await confirmCredits(slug, input)
        if (result.ok) router.refresh()
        else setError(result.error)
      })
    }}>
      <Label htmlFor="credits-code">{t.codeLabel}</Label>
      <Input id="credits-code" value={input} onChange={event => setInput(event.target.value.replace(/\D/g, "").slice(0, 4))}
        inputMode="numeric" autoComplete="one-time-code" pattern="\d{4}" required className="font-mono text-2xl tracking-[0.4em]" />
      {error ? <p role="alert" className="text-sm text-destructive">{t.errors[error]}</p> : null}
      <Button type="submit" disabled={pending || input.length !== 4}>{pending ? t.confirming : t.confirm}</Button>
    </form> : null}
  </div>
}
