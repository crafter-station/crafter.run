"use client"

import { useActionState } from "react"

import { submitBounty, type SubmitBountyState } from "@/app/[lang]/bounties/[id]/actions"
import { cn } from "@/lib/utils"

type Existing = { postUrl: string; whatsappPhone: string; contactConsent: boolean } | null

export function BountySubmissionForm({ slug, existing }: { slug: string; existing: Existing }) {
  const [state, action, pending] = useActionState<SubmitBountyState, FormData>(submitBounty.bind(null, slug), { status: "idle" })
  const saved = state.status === "saved"

  return (
    <form action={action} className="grid gap-6">
      {existing && !saved ? <p className="text-sm text-muted-foreground">Ya mandaste tu post. Puedes actualizarlo hasta el cierre.</p> : null}
      <Field label="Link de tu post" name="postUrl" type="url" required placeholder="https://x.com/tu-usuario/status/..." defaultValue={existing?.postUrl} />
      <Field
        label="Tu número de WhatsApp"
        name="whatsappPhone"
        type="tel"
        required
        placeholder="+51 987 654 321"
        defaultValue={existing?.whatsappPhone}
        hint="El mismo con el que estás en el grupo de Crafter Station. Lo usamos para validar que eres de la comunidad."
      />
      <label className="flex items-start gap-3 border border-line px-4 py-3 text-sm">
        <input type="checkbox" name="attendsInPerson" required defaultChecked={Boolean(existing)} className="mt-0.5 size-4 accent-current" />
        Puedo ir presencial el sábado 17 de octubre a UTEC.
      </label>
      <label className="flex items-start gap-3 border border-line px-4 py-3 text-sm">
        <input type="checkbox" name="contactConsent" defaultChecked={existing?.contactConsent} className="mt-0.5 size-4 accent-current" />
        Acepto que Crafter Station me contacte por email o WhatsApp sobre eventos y bounties. Opcional.
      </label>
      {state.status === "error" ? <p className="text-sm text-red-600">{state.message}</p> : null}
      {saved ? <p className="text-sm text-green-700">Listo, recibimos tu post. Anunciamos ganadores el lunes 5.</p> : null}
      <button disabled={pending} className="w-fit bg-foreground px-6 py-3 text-sm font-medium text-background disabled:opacity-50">
        {pending ? "Enviando..." : existing || saved ? "Actualizar envío" : "Mandar mi post"}
      </button>
    </form>
  )
}

function Field(props: React.InputHTMLAttributes<HTMLInputElement> & { label: string; hint?: string }) {
  const { label, hint, className, ...input } = props
  return (
    <label className="grid min-w-0 gap-2 text-sm">
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{label}</span>
      <input {...input} className={cn("w-full min-w-0 border border-line bg-background px-4 py-3 outline-none focus:border-accent", className)} />
      {hint ? <span className="text-xs text-muted-foreground">{hint}</span> : null}
    </label>
  )
}
