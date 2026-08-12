"use client"

import type { PrivateMemberProfile } from "@crafter/contracts"
import { useAuth } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { type FormEvent, useState } from "react"

import { publicApiUrl, shipsApi } from "@/lib/ships-client"
import { cn } from "@/lib/utils"

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
  member?: PrivateMemberProfile | null
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
      const salaryMin = String(formData.get("salaryMin") ?? "").trim()
      const salaryMax = String(formData.get("salaryMax") ?? "").trim()
      const salaryCurrency = String(formData.get("salaryCurrency") ?? "").trim()
      if ([salaryMin, salaryMax, salaryCurrency].some(Boolean) && ![salaryMin, salaryMax, salaryCurrency].every(Boolean)) {
        throw new Error("Enter the salary minimum, maximum, and currency together.")
      }
      await shipsApi<{ member: PrivateMemberProfile }>("/v1/me", token, {
        method: "PUT",
        body: JSON.stringify({
          handle: formData.get("handle"),
          displayName: formData.get("displayName"),
          bio: formData.get("bio") || null,
          avatarUrl: member?.avatarUrl ?? avatarUrl,
          githubUrl: formData.get("githubUrl") || null,
          gitlabUrl: formData.get("gitlabUrl") || null,
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
          ...(mode === "settings" ? {
            salaryRange: salaryMin || salaryMax || salaryCurrency
              ? { min: Number(salaryMin), max: Number(salaryMax), currency: salaryCurrency }
              : null,
            workArrangements: formData.getAll("workArrangements"),
            onsiteCity: formData.get("onsiteCity") || null,
            resumeUrl: formData.get("resumeUrl") || null,
          } : {}),
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
    <form onSubmit={submit} className="mt-10 grid min-w-0 gap-6">
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
      {mode === "settings" ? (
        <section className="grid min-w-0 gap-6 border border-line bg-secondary/30 p-5 sm:p-6">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">Private career preferences</p>
            <h2 className="mt-2 text-xl tracking-tight">Help the right partners find you.</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">This information is hidden from your public profile and shared only with trusted partners looking for great engineers like you.</p>
          </div>
          <div className="grid min-w-0 grid-cols-1 gap-6 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(7.5rem,10rem)]">
            <Field type="number" label="Salary minimum" name="salaryMin" min={0} max={10000000} defaultValue={member?.salaryRange?.min ?? ""} placeholder="80000" />
            <Field type="number" label="Salary maximum" name="salaryMax" min={0} max={10000000} defaultValue={member?.salaryRange?.max ?? ""} placeholder="120000" />
            <Field label="Currency" name="salaryCurrency" minLength={3} maxLength={3} size={3} autoComplete="off" defaultValue={member?.salaryRange?.currency ?? ""} placeholder="USD" />
          </div>
          <fieldset className="grid gap-3">
            <legend className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Open to</legend>
            <div className="flex flex-wrap gap-3">
              {["remote", "onsite", "hybrid"].map((arrangement) => (
                <label key={arrangement} className="flex items-center gap-2 border border-line bg-background px-4 py-3 text-sm capitalize">
                  <input type="checkbox" name="workArrangements" value={arrangement} defaultChecked={member?.workArrangements.includes(arrangement as "remote" | "onsite" | "hybrid")} className="size-4 accent-current" />
                  {arrangement}
                </label>
              ))}
            </div>
          </fieldset>
          <div className="grid min-w-0 gap-6 sm:grid-cols-2">
            <Field label="Onsite city" name="onsiteCity" maxLength={120} defaultValue={member?.onsiteCity ?? ""} placeholder="Lima, Peru" />
            <Field type="url" label="Updated resume link" name="resumeUrl" defaultValue={member?.resumeUrl ?? ""} placeholder="https://drive.google.com/..." />
          </div>
        </section>
      ) : null}
      <label className="grid gap-2 text-sm">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Roles open to</span>
        <textarea name="rolesOpenTo" rows={4} defaultValue={member?.rolesOpenTo.join("\n") ?? ""} placeholder={"Frontend engineer\nProduct designer"} className="border border-line bg-background px-4 py-3 outline-none focus:border-accent" />
        <span className="text-xs text-muted-foreground">One role per line, up to 10.</span>
      </label>
      <div className="grid gap-6 border-t border-line pt-6 sm:grid-cols-2">
        <Field type="url" label="GitHub" name="githubUrl" defaultValue={member?.githubUrl ?? ""} placeholder="https://github.com/you" />
        <Field type="url" label="GitLab" name="gitlabUrl" defaultValue={member?.gitlabUrl ?? ""} placeholder="https://gitlab.com/you" />
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
  const { label, className, ...input } = props
  return (
    <label className="grid min-w-0 gap-2 text-sm">
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{label}</span>
      <input {...input} className={cn("w-full min-w-0 border border-line bg-background px-4 py-3 outline-none focus:border-accent", className)} />
    </label>
  )
}
