"use client"

import { Check, Loader2, X } from "lucide-react"
import { useId } from "react"

import type { HandleStatus } from "@/components/onboarding/use-handle-status"
import type { OnboardingCopy } from "@/lib/onboarding-copy"
import { Field } from "@/components/onboarding/fields"

export function HandleField({
  value,
  onChange,
  status,
  copy,
  autoFocus,
}: {
  value: string
  onChange: (value: string) => void
  status: HandleStatus
  copy: OnboardingCopy["who"]
  autoFocus?: boolean
}) {
  const id = useId()
  const hint =
    status === "taken" ? (
      <p className="ob-hint" data-tone="bad"><X aria-hidden="true" />{copy.handleTaken}</p>
    ) : status === "invalid" && value ? (
      <p className="ob-hint" data-tone="bad"><X aria-hidden="true" />{copy.handleInvalid}</p>
    ) : status === "available" && value ? (
      <p className="ob-hint" data-tone="ok"><Check aria-hidden="true" />{copy.handleFree}</p>
    ) : status === "checking" ? (
      <p className="ob-hint"><Loader2 aria-hidden="true" className="animate-spin" />{copy.handleHint}</p>
    ) : (
      <p className="ob-hint">{copy.handleHint}</p>
    )
  return (
    <Field label={copy.handle} htmlFor={id} hint={hint}>
      <div className="ob-affix" aria-invalid={status === "taken" || (status === "invalid" && !!value) || undefined}>
        <span>@</span>
        <input
          id={id}
          value={value}
          autoFocus={autoFocus}
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          autoComplete="off"
          maxLength={40}
          placeholder="your-handle"
          onChange={(event) => onChange(event.target.value.toLowerCase().replace(/\s+/g, "-"))}
        />
      </div>
    </Field>
  )
}
