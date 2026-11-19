"use client"

import { useActionState } from "react"

import { postRole, type PostRoleState } from "@/app/[lang]/jobs/actions"

export type PostRoleCopy = {
  fields: { company: string; title: string; location: string; locationHint: string; link: string; email: string; notes: string; notesHint: string; optional: string }
  submit: string
  sending: string
  sent: string
  errors: { invalid: string; limited: string; unavailable: string }
}

function Field({ name, label, hint, optional, ...props }: { name: string; label: string; hint?: string; optional?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="jobs-field" htmlFor={`role-${name}`}>
      <span className="home-label-sm">{label}{optional ? <em> · {optional}</em> : null}</span>
      <input id={`role-${name}`} name={name} {...props} />
      {hint ? <small>{hint}</small> : null}
    </label>
  )
}

export function PostRoleForm({ copy }: { copy: PostRoleCopy }) {
  const [state, action, pending] = useActionState<PostRoleState, FormData>(postRole, { status: "idle" })
  const f = copy.fields

  if (state.status === "sent") {
    return <p className="jobs-sent" role="status">{copy.sent}</p>
  }

  const error = state.status === "invalid" ? copy.errors.invalid
    : state.status === "limited" ? copy.errors.limited
      : state.status === "unavailable" ? copy.errors.unavailable : null

  return (
    <form action={action} className="jobs-form">
      <div className="jobs-form-grid">
        <Field name="company" label={f.company} required minLength={2} maxLength={120} autoComplete="organization" />
        <Field name="title" label={f.title} required minLength={2} maxLength={120} />
        <Field name="location" label={f.location} hint={f.locationHint} required minLength={2} maxLength={120} />
        <Field name="link" label={f.link} type="url" required maxLength={2048} placeholder="https://" pattern="https://.*" inputMode="url" />
        <Field name="email" label={f.email} type="email" required maxLength={320} autoComplete="email" />
      </div>
      <label className="jobs-field" htmlFor="role-notes">
        <span className="home-label-sm">{f.notes}<em> · {f.optional}</em></span>
        <textarea id="role-notes" name="notes" rows={4} maxLength={2000} />
        <small>{f.notesHint}</small>
      </label>
      <div className="jobs-trap" aria-hidden="true">
        <label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>
      {error ? <p className="jobs-error" role="alert">{error}</p> : null}
      <button type="submit" className="hero-cta jobs-submit" disabled={pending}>{pending ? copy.sending : copy.submit}</button>
    </form>
  )
}
