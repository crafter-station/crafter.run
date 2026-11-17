"use client"

import { Switch, SwitchThumb } from "@ui-sdk/react/switch"
import { Briefcase, Plus, X } from "lucide-react"
import { type KeyboardEvent, type ReactNode, useId, useState } from "react"


import type { OnboardingCopy } from "@/lib/onboarding-copy"
import { MAX_ROLES, SOCIAL_LINKS, socialUsername, type LinkKey } from "@/lib/profile-draft"

export function Field({ label, hint, children, htmlFor }: { label: string; hint?: ReactNode; children: ReactNode; htmlFor?: string }) {
  return (
    <div className="ob-field">
      <label className="ob-label" htmlFor={htmlFor}>{label}</label>
      {children}
      {hint}
    </div>
  )
}

export function TextField({
  label,
  value,
  onChange,
  hint,
  ...input
}: { label: string; value: string; onChange: (value: string) => void; hint?: ReactNode } & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value">) {
  const id = useId()
  return (
    <Field label={label} htmlFor={id} hint={hint}>
      <input id={id} className="ob-input" value={value} onChange={(event) => onChange(event.target.value)} {...input} />
    </Field>
  )
}

export function TextAreaField({
  label,
  value,
  onChange,
  ...input
}: { label: string; value: string; onChange: (value: string) => void } & Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange" | "value">) {
  const id = useId()
  return (
    <Field label={label} htmlFor={id} hint={input.maxLength ? <p className="ob-hint" style={{ justifyContent: "flex-end" }}>{value.length}/{input.maxLength}</p> : undefined}>
      <textarea id={id} className="ob-textarea" value={value} onChange={(event) => onChange(event.target.value)} {...input} />
    </Field>
  )
}

export function LinkField({
  kind,
  label,
  value,
  onChange,
  copy,
  icon,
  invalid,
}: {
  kind: LinkKey
  label: string
  value: string
  onChange: (value: string) => void
  copy: OnboardingCopy["links"]
  icon?: ReactNode
  invalid?: boolean
}) {
  const id = useId()
  const spec = SOCIAL_LINKS[kind]
  return (
    <Field label={label} htmlFor={id}>
      <div className="ob-affix" aria-invalid={invalid || undefined}>
        {spec ? <span>{spec.prefix}</span> : icon}
        <input
          id={id}
          value={value}
          inputMode={spec ? "text" : "url"}
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          autoComplete="off"
          placeholder={spec ? copy.userPlaceholder : copy.websitePlaceholder}
          onChange={(event) => onChange(event.target.value)}
          onBlur={() => spec && onChange(socialUsername(kind, value))}
        />
      </div>
    </Field>
  )
}

export function RolesField({
  roles,
  onChange,
  copy,
}: {
  roles: string[]
  onChange: (roles: string[]) => void
  copy: OnboardingCopy["work"]
}) {
  const [draft, setDraft] = useState("")
  const id = useId()
  const add = (role: string) => {
    const value = role.trim().slice(0, 80)
    if (!value || roles.length >= MAX_ROLES || roles.some((existing) => existing.toLowerCase() === value.toLowerCase())) return
    onChange([...roles, value])
  }
  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter" && draft.trim()) {
      // Enter adds a role here; on an empty field it advances the form.
      event.preventDefault()
      event.stopPropagation()
      add(draft)
      setDraft("")
    } else if (event.key === "Backspace" && !draft && roles.length > 0) {
      onChange(roles.slice(0, -1))
    }
  }
  const suggestions = copy.suggestions.filter((suggestion) => !roles.some((role) => role.toLowerCase() === suggestion.toLowerCase()))
  return (
    <Field label={copy.openTo} htmlFor={id} hint={<p className="ob-hint">{copy.openToHint}</p>}>
      {roles.length > 0 ? (
        <div className="ob-chips">
          {roles.map((role) => (
            <span className="ob-chip" key={role}>
              {role}
              <button type="button" aria-label={`${copy.remove} ${role}`} onClick={() => onChange(roles.filter((value) => value !== role))}>
                <X aria-hidden="true" />
              </button>
            </span>
          ))}
        </div>
      ) : null}
      <div className="ob-affix">
        <Briefcase aria-hidden="true" />
        <input
          id={id}
          value={draft}
          maxLength={80}
          disabled={roles.length >= MAX_ROLES}
          placeholder={copy.openToPlaceholder}
          enterKeyHint="enter"
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={onKeyDown}
          onBlur={() => {
            add(draft)
            setDraft("")
          }}
        />
      </div>
      {suggestions.length > 0 && roles.length < MAX_ROLES ? (
        <div className="ob-chips">
          {suggestions.map((suggestion) => (
            <button type="button" className="ob-suggest" key={suggestion} onClick={() => add(suggestion)}>
              <Plus aria-hidden="true" />
              {suggestion}
            </button>
          ))}
        </div>
      ) : null}
    </Field>
  )
}

export function SwitchCard({
  checked,
  onChange,
  title,
  hint,
  icon,
}: {
  checked: boolean
  onChange: (checked: boolean) => void
  title: string
  hint: string
  icon: ReactNode
}) {
  return (
    <label className="ob-toggle">
      {icon}
      <span>
        {title}
        <small>{hint}</small>
      </span>
      <Switch className="ob-switch" checked={checked} onCheckedChange={(next) => onChange(next)}>
        <SwitchThumb className="ob-switch-thumb" />
      </Switch>
    </label>
  )
}

