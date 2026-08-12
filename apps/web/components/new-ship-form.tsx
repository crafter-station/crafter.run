"use client"

import type { ShipDetail } from "@crafter/contracts"
import { useAuth } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { type FormEvent, useRef, useState } from "react"

import { shipsApi, uploadShipImage } from "@/lib/ships-client"

export function NewShipForm({ locale }: { locale: string }) {
  const { getToken } = useAuth()
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)
  const [prefilling, setPrefilling] = useState(false)

  async function prefill() {
    const form = formRef.current
    if (!form) return
    const source = new FormData(form).get("sourceUrl")
    if (typeof source !== "string" || !source) return
    setError(null)
    setPrefilling(true)
    try {
      const url = new URL(source)
      if (!['http:', 'https:'].includes(url.protocol)) throw new Error("Use an HTTP or HTTPS URL.")
      const field = (name: string) => form.elements.namedItem(name) as HTMLInputElement | HTMLTextAreaElement | null
      const parts = url.pathname.split("/").filter(Boolean)
      if (url.hostname.toLowerCase() === "github.com" && parts.length >= 2) {
        const response = await fetch(`https://api.github.com/repos/${encodeURIComponent(parts[0]!)}/${encodeURIComponent(parts[1]!.replace(/\.git$/i, ""))}`)
        if (!response.ok) throw new Error("That public GitHub repository could not be loaded.")
        const repository = (await response.json()) as { name?: string; description?: string | null; homepage?: string | null; html_url?: string }
        if (field("name")) field("name")!.value = repository.name ?? parts[1]!
        if (field("slug")) field("slug")!.value = (repository.name ?? parts[1]!).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
        if (repository.description && field("tagline")) field("tagline")!.value = repository.description.slice(0, 180)
        if (repository.description && field("description")) field("description")!.value = repository.description
        if (field("repository")) field("repository")!.value = repository.html_url ?? source
        if (repository.homepage && field("website")) field("website")!.value = repository.homepage
      } else {
        const name = url.hostname.replace(/^www\./, "").split(".")[0] ?? ""
        if (field("name")) field("name")!.value = name.charAt(0).toUpperCase() + name.slice(1)
        if (field("slug")) field("slug")!.value = name.toLowerCase().replace(/[^a-z0-9]+/g, "-")
        if (field("website")) field("website")!.value = source
      }
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not prefill from that URL.")
    } finally {
      setPrefilling(false)
    }
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    setPending(true)
    setError(null)
    try {
      const token = await getToken()
      if (!token) throw new Error("Your session expired. Sign in again.")
      const image = formData.get("image")
      const imageUrl = image instanceof File && image.size > 0 ? await uploadShipImage(image, token) : null
      const links = [
        ["repository", formData.get("repository")],
        ["website", formData.get("website")],
      ].flatMap(([type, url]) => (typeof url === "string" && url ? [{ type, url }] : []))
      const sourceUrl = formData.get("sourceUrl")
      const { ship } = await shipsApi<{ ship: ShipDetail }>("/v1/ship-drafts", token, {
        method: "POST",
        headers: { "Idempotency-Key": crypto.randomUUID() },
        body: JSON.stringify({
          slug: formData.get("slug"),
          name: formData.get("name"),
          tagline: formData.get("tagline"),
          description: formData.get("description"),
          imageUrl,
          socialPostUrl: formData.get("socialPostUrl") || null,
          links,
          provenance: [
            "web form",
            ...(typeof sourceUrl === "string" && sourceUrl ? [`metadata URL: ${sourceUrl}`] : []),
          ],
        }),
      })
      router.push(`/${locale}/ships/drafts/${ship.id}`)
    } catch (cause) {
      const message = cause instanceof Error ? cause.message : "Could not create draft."
      setError(message)
      if (message.includes("profile")) router.push(`/${locale}/onboarding`)
    } finally {
      setPending(false)
    }
  }

  return (
    <form ref={formRef} onSubmit={submit} className="mt-10 grid gap-6">
      <div className="grid gap-3 border border-line bg-secondary/20 p-5 md:grid-cols-[1fr_auto] md:items-end">
        <Field label="Start with a repository or website URL" name="sourceUrl" type="url" placeholder="https://github.com/org/repo" />
        <button type="button" onClick={prefill} disabled={prefilling} className="border border-line px-5 py-3 text-sm font-medium disabled:opacity-50">
          {prefilling ? "Loading..." : "Prefill safely"}
        </button>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Field label="Name" name="name" required maxLength={100} />
        <Field label="Slug" name="slug" required minLength={3} maxLength={80} placeholder="my-ship" />
      </div>
      <Field label="Tagline" name="tagline" required minLength={4} maxLength={180} />
      <Field label="Picture (optional; we will capture your website or repository if omitted)" name="image" type="file" accept="image/jpeg,image/png,image/webp,image/gif" />
      <Field label="Social post URL (LinkedIn, Instagram, X, YouTube, Substack, etc.)" name="socialPostUrl" type="url" placeholder="https://linkedin.com/posts/..." />
      <label className="grid gap-2 text-sm">
        <span className="label">Description</span>
        <textarea name="description" required minLength={20} maxLength={5000} rows={8} className="input" />
      </label>
      <div className="grid gap-6 md:grid-cols-2">
        <Field label="Repository URL" name="repository" type="url" placeholder="https://github.com/..." />
        <Field label="Website URL" name="website" type="url" placeholder="https://..." />
      </div>
      <div className="border border-line bg-secondary/20 p-4 text-sm leading-6 text-muted-foreground">
        This creates a private draft. Nothing is published until you review it and explicitly confirm.
      </div>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <button disabled={pending} className="w-fit bg-foreground px-6 py-3 text-sm font-medium text-background disabled:opacity-50">
        {pending ? "Creating draft..." : "Review draft"}
      </button>
    </form>
  )
}

function Field(props: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  const { label, ...input } = props
  return (
    <label className="grid gap-2 text-sm">
      <span className="label">{label}</span>
      <input {...input} className="input" />
    </label>
  )
}
