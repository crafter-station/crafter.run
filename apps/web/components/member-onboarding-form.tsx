"use client"

import type { MemberProfile } from "@crafter/contracts"
import { useAuth } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { type FormEvent, useState } from "react"

import { publicApiUrl, shipsApi } from "@/lib/ships-client"

export function MemberOnboardingForm({
  locale,
  displayName,
  avatarUrl,
}: {
  locale: string
  displayName: string
  avatarUrl: string | null
}) {
  const { getToken } = useAuth()
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    setPending(true)
    setError(null)
    try {
      const token = await getToken()
      if (!token) throw new Error("Your session expired. Sign in again.")
      await shipsApi<{ member: MemberProfile }>("/v1/me", token, {
        method: "PUT",
        body: JSON.stringify({
          handle: formData.get("handle"),
          displayName: formData.get("displayName"),
          bio: formData.get("bio") || null,
          avatarUrl,
        }),
      })
      router.push(`/${locale}/ships/new`)
      router.refresh()
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not save your profile.")
    } finally {
      setPending(false)
    }
  }

  return (
    <form onSubmit={submit} className="mt-10 grid gap-6">
      <Field label="Handle" name="handle" placeholder="your-handle" required minLength={3} maxLength={40} />
      <Field label="Display name" name="displayName" defaultValue={displayName} required maxLength={80} />
      <label className="grid gap-2 text-sm">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Short bio</span>
        <textarea name="bio" rows={4} maxLength={280} className="border border-line bg-background px-4 py-3 outline-none focus:border-accent" />
      </label>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <button disabled={pending} className="w-fit bg-foreground px-6 py-3 text-sm font-medium text-background disabled:opacity-50">
        {pending ? "Saving..." : "Create Crafter profile"}
      </button>
      <p className="font-mono text-[10px] text-muted-foreground">API: {publicApiUrl}</p>
    </form>
  )
}

function Field(props: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  const { label, ...input } = props
  return (
    <label className="grid gap-2 text-sm">
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{label}</span>
      <input {...input} className="border border-line bg-background px-4 py-3 outline-none focus:border-accent" />
    </label>
  )
}
