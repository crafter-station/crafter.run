"use client"

import { useActionState } from "react"
import { useFormStatus } from "react-dom"

import type { ApproveState } from "./actions"

const mailNote: Record<string, string> = {
  sent: "Published. The owner got the “Your Ship is live” email.",
  skipped: "Published. No email sent (no address or suppressed).",
  unavailable: "Published. Email not sent: RESEND_API_KEY is missing.",
  failed: "Published, but the email failed. Check the logs.",
}

function Spinner() {
  return <span aria-hidden="true" className="inline-block size-3.5 animate-spin rounded-full border-2 border-current border-r-transparent motion-reduce:animate-none" />
}

export function ApproveForm({ action }: { action: (state: ApproveState) => Promise<ApproveState> }) {
  const [state, submit, pending] = useActionState(action, { status: "idle" })
  return (
    <form action={submit} className="grid gap-2">
      <button
        disabled={pending || state.status === "approved"}
        className="inline-flex items-center gap-2 bg-accent px-5 py-2 text-sm font-semibold text-accent-foreground disabled:opacity-70"
      >
        {pending ? <Spinner /> : null}
        {pending ? "Approving and sending email…" : state.status === "approved" ? "Published" : "Approve and publish"}
      </button>
      <p className="min-h-5 text-xs text-muted-foreground" role="status" aria-live="polite">
        {state.status === "approved" ? mailNote[state.mail] : state.status === "gone" ? "Already handled." : ""}
      </p>
    </form>
  )
}

export function PendingButton({ children, pendingLabel, className }: { children: React.ReactNode; pendingLabel: string; className: string }) {
  const { pending } = useFormStatus()
  return (
    <button disabled={pending} className={`inline-flex items-center gap-2 disabled:opacity-70 ${className}`}>
      {pending ? <Spinner /> : null}
      {pending ? pendingLabel : children}
    </button>
  )
}
