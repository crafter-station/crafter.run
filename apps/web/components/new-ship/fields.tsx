"use client"

import { X } from "lucide-react"
import { type ReactNode, useId } from "react"

import { Field } from "@/components/onboarding/fields"
import { SHIP_LIMITS } from "@/lib/new-ship-draft"

export function Problem({ text }: { text: string }) {
  return <p className="ob-hint" data-tone="bad" role="alert"><X aria-hidden="true" />{text}</p>
}

export function SlugField({ label, value, onChange, invalid, hint }: { label: string; value: string; onChange: (value: string) => void; invalid: boolean; hint: ReactNode }) {
  const id = useId()
  return (
    <Field label={label} htmlFor={id} hint={hint}>
      <div className="ob-affix" aria-invalid={invalid || undefined}>
        <span>/ships/</span>
        <input id={id} value={value} maxLength={SHIP_LIMITS.slug} autoCapitalize="none" autoCorrect="off" spellCheck={false} autoComplete="off" onChange={(event) => onChange(event.target.value)} />
      </div>
    </Field>
  )
}
