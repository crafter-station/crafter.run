"use client"

import { Link2 } from "lucide-react"
import confetti from "canvas-confetti"
import { useActionState, useEffect, useState } from "react"

import { submitBounty, type SubmitBountyState } from "@/app/[lang]/bounties/[id]/actions"
import { detectSocialPlatform } from "@/lib/social-platforms"
import { cn } from "@/lib/utils"

type Existing = { postUrl: string; whatsappContact: string; contactConsent: boolean } | null

export function BountySubmissionForm({ slug, existing }: { slug: string; existing: Existing }) {
  const [state, action, pending] = useActionState<SubmitBountyState, FormData>(submitBounty.bind(null, slug), { status: "idle" })
  const saved = state.status === "saved"
  const [resetKey, setResetKey] = useState(0)

  // After a save the form remounts empty, so the next submission starts clean.
  const prefill = resetKey ? null : existing

  useEffect(() => {
    if (state.status !== "saved") return
    setResetKey((key) => key + 1)
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      confetti({ particleCount: 140, spread: 80, origin: { y: 0.7 } })
    }
  }, [state])

  return (
    <form key={resetKey} action={action} className="grid gap-6">
      {existing && !saved ? <p className="text-sm text-muted-foreground">Ya mandaste tu post. Puedes actualizarlo hasta el cierre.</p> : null}
      <PostUrlField defaultValue={prefill?.postUrl} />
      <Field
        label="Tu WhatsApp: número o username"
        name="whatsappContact"
        required
        maxLength={40}
        placeholder="+51 987 654 321 o @tu_username"
        defaultValue={prefill?.whatsappContact}
        hint="El mismo con el que estás en el grupo de Crafter Station. Lo usamos para validar que eres de la comunidad."
      />
      <label className="flex items-start gap-3 border border-line px-4 py-3 text-sm">
        <input type="checkbox" name="attendsInPerson" required defaultChecked={Boolean(prefill)} className="mt-0.5 size-4 accent-current" />
        Puedo ir presencial el sábado 17 de octubre a UTEC.
      </label>
      <label className="flex items-start gap-3 border border-line px-4 py-3 text-sm">
        <input type="checkbox" name="contactConsent" defaultChecked={prefill?.contactConsent} className="mt-0.5 size-4 accent-current" />
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

function PostUrlField({ defaultValue }: { defaultValue?: string }) {
  const [url, setUrl] = useState(defaultValue ?? "")
  const platform = detectSocialPlatform(url)
  // Black brand marks (X, TikTok, Threads) follow the theme so they never disappear on a dark page.
  const monochrome = platform?.hex === "000000"
  const isUrl = /^https?:\/\/\S+\.\S+/.test(url.trim())

  return (
    <label className="grid min-w-0 gap-2 text-sm">
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Link de tu post</span>
      <div className="flex min-w-0 items-stretch gap-2">
        <span
          aria-label={platform?.name ?? "Plataforma"}
          title={platform?.name}
          className={cn(
            "grid size-12 shrink-0 place-items-center border transition-colors",
            !platform && "border-dashed border-line text-muted-foreground",
            platform && (monochrome ? "border-transparent bg-foreground text-background" : "border-transparent text-white"),
          )}
          style={platform && !monochrome ? { backgroundColor: `#${platform.hex}` } : undefined}
        >
          {platform?.path ? (
            <svg viewBox="0 0 24 24" aria-hidden className="size-5 fill-current"><path d={platform.path} /></svg>
          ) : platform?.monogram ? (
            <span className="text-base font-bold leading-none">{platform.monogram}</span>
          ) : isUrl ? (
            <Link2 aria-hidden className="size-5 text-foreground" />
          ) : (
            <Link2 aria-hidden className="size-5 opacity-40" />
          )}
        </span>
        <input
          name="postUrl"
          type="url"
          required
          maxLength={2048}
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          placeholder="Pega aquí el link de tu post"
          className="w-full min-w-0 border border-line bg-background px-4 py-3 outline-none focus:border-accent"
        />
      </div>
      <span className="text-xs text-muted-foreground">
        {platform ? `Post de ${platform.name}.` : "Sirve cualquier red: X, LinkedIn, Instagram, TikTok, YouTube, Threads..."}
      </span>
    </label>
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
