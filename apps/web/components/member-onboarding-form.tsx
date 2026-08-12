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
  member = null,
  mode = "onboarding",
}: {
  locale: string
  displayName: string
  avatarUrl: string | null
  member?: MemberProfile | null
  mode?: "onboarding" | "settings"
}) {
  const { getToken } = useAuth()
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [saved, setSaved] = useState(false)
  const [pending, setPending] = useState(false)

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    setPending(true)
    setError(null)
    setSaved(false)
    try {
      const token = await getToken()
      if (!token) throw new Error("Your session expired. Sign in again.")
      await shipsApi<{ member: MemberProfile }>("/v1/me", token, {
        method: "PUT",
        body: JSON.stringify({
          handle: formData.get("handle"),
          displayName: formData.get("displayName"),
          bio: formData.get("bio") || null,
          avatarUrl: member?.avatarUrl ?? avatarUrl,
          githubUrl: formData.get("githubUrl") || null,
          linkedinUrl: formData.get("linkedinUrl") || null,
          instagramUrl: formData.get("instagramUrl") || null,
          xUrl: formData.get("xUrl") || null,
          primaryWebsiteUrl: formData.get("primaryWebsiteUrl") || null,
          secondaryWebsiteUrl: formData.get("secondaryWebsiteUrl") || null,
          currentRole: formData.get("currentRole") || null,
          rolesOpenTo: String(formData.get("rolesOpenTo") ?? "")
            .split("\n")
            .map((role) => role.trim())
            .filter(Boolean),
          isJobSeeking: formData.get("isJobSeeking") === "on",
        }),
      })
      if (mode === "onboarding") {
        router.push(`/${locale}/ships/new`)
        router.refresh()
      } else {
        setSaved(true)
      }
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not save your profile.")
    } finally {
      setPending(false)
    }
  }

  return (
    <form onSubmit={submit} className="mt-10 grid gap-6">
      <Field label="Handle" name="handle" placeholder="your-handle" defaultValue={member?.handle} required minLength={3} maxLength={40} />
      <Field label="Display name" name="displayName" defaultValue={member?.displayName ?? displayName} required maxLength={80} />
      <label className="grid gap-2 text-sm">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Short bio</span>
        <textarea name="bio" rows={4} maxLength={280} defaultValue={member?.bio ?? ""} className="border border-line bg-background px-4 py-3 outline-none focus:border-accent" />
      </label>
      <div className="grid gap-6 border-t border-line pt-6 sm:grid-cols-2">
        <Field label="Current role" name="currentRole" defaultValue={member?.currentRole ?? ""} maxLength={120} placeholder="Product designer at Acme" />
        <label className="flex items-center gap-3 self-end border border-line px-4 py-3 text-sm">
          <input type="checkbox" name="isJobSeeking" defaultChecked={member?.isJobSeeking ?? false} className="size-4 accent-current" />
          I am looking for a new job
        </label>
      </div>
      <label className="grid gap-2 text-sm">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Roles open to</span>
        <textarea name="rolesOpenTo" rows={4} defaultValue={member?.rolesOpenTo.join("\n") ?? ""} placeholder={"Frontend engineer\nProduct designer"} className="border border-line bg-background px-4 py-3 outline-none focus:border-accent" />
        <span className="text-xs text-muted-foreground">One role per line, up to 10.</span>
      </label>
      <div className="grid gap-6 border-t border-line pt-6 sm:grid-cols-2">
        <Field type="url" label="GitHub" name="githubUrl" defaultValue={member?.githubUrl ?? ""} placeholder="https://github.com/you" />
        <Field type="url" label="LinkedIn" name="linkedinUrl" defaultValue={member?.linkedinUrl ?? ""} placeholder="https://linkedin.com/in/you" />
        <Field type="url" label="Instagram" name="instagramUrl" defaultValue={member?.instagramUrl ?? ""} placeholder="https://instagram.com/you" />
        <Field type="url" label="X" name="xUrl" defaultValue={member?.xUrl ?? ""} placeholder="https://x.com/you" />
        <Field type="url" label="Main website" name="primaryWebsiteUrl" defaultValue={member?.primaryWebsiteUrl ?? ""} placeholder="https://you.com" />
        <Field type="url" label="Secondary website" name="secondaryWebsiteUrl" defaultValue={member?.secondaryWebsiteUrl ?? ""} placeholder="https://portfolio.you.com" />
      </div>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      {saved ? <p className="text-sm text-green-700">Your profile has been updated.</p> : null}
      <button disabled={pending} className="w-fit bg-foreground px-6 py-3 text-sm font-medium text-background disabled:opacity-50">
        {pending ? "Saving..." : mode === "settings" ? "Save profile" : "Create Crafter profile"}
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
