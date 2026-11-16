"use client"

import { type FormEvent, useId, useState } from "react"
import type { Locale } from "@/lib/i18n"

type Copy = {
  emailLabel: string
  emailPlaceholder: string
  submit: string
  submitting: string
  subscribed: string
  alreadySubscribed: string
  invalid: string
  unavailable: string
  fine: string
}

type State = "idle" | "submitting" | "subscribed" | "already_subscribed" | "invalid" | "unavailable"

export function NewsletterForm({ locale, copy }: { locale: Locale; copy: Copy }) {
  const id = useId()
  const [state, setState] = useState<State>("idle")

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    setState("submitting")
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.get("email"), company: data.get("company"), locale, source: "newsletter-page" }),
      })
      const result = (await response.json().catch(() => null)) as { status?: State } | null
      if (response.ok && (result?.status === "subscribed" || result?.status === "already_subscribed")) setState(result.status)
      else if (response.status === 400) setState("invalid")
      else setState("unavailable")
    } catch {
      setState("unavailable")
    }
  }

  const message = { subscribed: copy.subscribed, already_subscribed: copy.alreadySubscribed, invalid: copy.invalid, unavailable: copy.unavailable }[
    state as "subscribed" | "already_subscribed" | "invalid" | "unavailable"
  ]
  const done = state === "subscribed" || state === "already_subscribed"

  return (
    <form className="newsletter-form" onSubmit={onSubmit} noValidate>
      <label htmlFor={`${id}-email`}>{copy.emailLabel}</label>
      <div className="newsletter-row">
        <input id={`${id}-email`} name="email" type="email" inputMode="email" autoComplete="email" required placeholder={copy.emailPlaceholder}
          aria-invalid={state === "invalid"} aria-describedby={`${id}-status`} disabled={done} />
        <button className="station-button" type="submit" disabled={state === "submitting" || done}>
          {state === "submitting" ? copy.submitting : copy.submit}
        </button>
      </div>
      <div className="newsletter-trap" aria-hidden="true">
        <label htmlFor={`${id}-company`}>Company</label>
        <input id={`${id}-company`} name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <p id={`${id}-status`} role="status" data-state={state} className="newsletter-status">{message ?? copy.fine}</p>
    </form>
  )
}
