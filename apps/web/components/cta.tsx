"use client"

import { useState } from "react"
import { AlertCircle, Loader2 } from "lucide-react"
import { Container } from "@/components/grid-container"

export type CtaCopy = {
  eyebrow: string
  title: string
  description: string
  emailLabel: string
  emailPlaceholder: string
  submit: string
  sending: string
  successTitle: string
  successDescription: string
  invalidEmail: string
  genericError: string
  networkError: string
}

export function ContactForm({ copy }: { copy: CtaCopy }) {
  const [email, setEmail] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError(copy.invalidEmail)
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email }),
      })
      if (res.ok) {
        setSuccess(true)
        setEmail("")
      } else {
        setError(copy.genericError)
      }
    } catch {
      setError(copy.networkError)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="cta-form-container">
      {success ? (
        <div className="cta-success mx-auto max-w-md border border-line p-6 text-left" role="status">
          <h3 className="font-label text-sm uppercase tracking-[0.2em] text-accent">
            {copy.successTitle}
          </h3>
          <p className="mt-2 text-foreground">
            {copy.successDescription}
          </p>
        </div>
      ) : (
        <form
          onSubmit={onSubmit}
          className="cta-form mx-auto flex max-w-md flex-col items-stretch justify-center gap-2 sm:flex-row"
        >
          <label htmlFor="cta-email" className="sr-only">
            {copy.emailLabel}
          </label>
          <input
            id="cta-email"
            type="email"
            required
            placeholder={copy.emailPlaceholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-12 min-h-12 min-w-0 flex-1 border border-line bg-background px-4 font-label text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-foreground/40 focus:outline-hidden"
          />
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-sm border border-primary bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                {copy.sending}
              </>
            ) : (
              copy.submit
            )}
          </button>
        </form>
      )}

      {error ? (
        <div className="cta-error mt-4 inline-flex items-center justify-center gap-2 border border-destructive/40 bg-destructive/10 px-4 py-2 text-sm text-destructive" role="alert">
          <AlertCircle className="size-4 shrink-0" />
          {error}
        </div>
      ) : null}
    </div>
  )
}

export function CTA({ copy }: { copy: CtaCopy }) {
  return (
    <div id="contact">
      <Container>
        <div className="px-6 py-16 md:px-10 md:py-20 lg:px-12">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-4 font-label text-xs uppercase tracking-[0.3em] text-muted-foreground">
              {copy.eyebrow}
            </p>
            <h2 className="pb-4 text-3xl tracking-tight md:text-4xl">
              {copy.title}
            </h2>
            <p className="mb-8 text-balance text-muted-foreground">
              {copy.description}
            </p>
            <ContactForm copy={copy} />
          </div>
        </div>
      </Container>
    </div>
  )
}
