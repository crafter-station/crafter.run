"use client"

import type { ShipDetail } from "@crafter/contracts"
import { useAuth } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { type FormEvent, useRef, useState } from "react"

import { shipsApi, uploadShipImage } from "@/lib/ships-client"

export function ShipDraftEditor({ initialShip, locale, published = false }: { initialShip: ShipDetail; locale: string; published?: boolean }) {
  const { getToken } = useAuth()
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)
  const [ship, setShip] = useState(initialShip)
  const [error, setError] = useState<string | null>(null)
  const [notice, setNotice] = useState<string | null>(null)
  const [pending, setPending] = useState<"save" | "publish" | null>(null)
  const [dirty, setDirty] = useState(false)

  async function saveShip(formData: FormData, token: string) {
    const image = formData.get("image")
    const imageUrl = image instanceof File && image.size > 0 ? await uploadShipImage(image, token) : ship.imageUrl
    const links = [
      ["repository", formData.get("repository")],
      ["website", formData.get("website")],
    ].flatMap(([type, url]) => (typeof url === "string" && url ? [{ type, url }] : []))
    links.push(
      ...ship.links
        .filter((link) => link.type !== "repository" && link.type !== "website")
        .map(({ type, url }) => ({ type, url })),
    )
    return shipsApi<{ ship: ShipDetail }>(published ? `/v1/ships/${encodeURIComponent(ship.slug)}` : `/v1/ship-drafts/${ship.id}`, token, {
      method: "PATCH",
      body: JSON.stringify({
        slug: formData.get("slug"),
        name: formData.get("name"),
        tagline: formData.get("tagline"),
        description: formData.get("description"),
        imageUrl,
        socialPostUrl: formData.get("socialPostUrl") || null,
        links,
        ...(published ? { expectedUpdatedAt: ship.updatedAt } : {}),
      }),
    })
  }

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setPending("save")
    setError(null)
    setNotice(null)
    try {
      const token = await getToken()
      if (!token) throw new Error("Your session expired.")
      const response = await saveShip(new FormData(event.currentTarget), token)
      setShip(response.ship)
      setDirty(false)
      setNotice(published ? "Published Ship updated." : "Draft saved. Review the updated preview before publishing.")
      if (published && response.ship.slug !== initialShip.slug) router.replace(`/${locale}/ships/${response.ship.slug}/edit`)
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not save draft.")
    } finally {
      setPending(null)
    }
  }

  async function publish() {
    if (!formRef.current) return
    if (dirty) {
      setPending("save")
      setError(null)
      setNotice(null)
      try {
        const token = await getToken()
        if (!token) throw new Error("Your session expired.")
        const saved = await saveShip(new FormData(formRef.current), token)
        setShip(saved.ship)
        setDirty(false)
        setNotice("Changes saved. Review the updated preview, then publish.")
      } catch (cause) {
        setError(cause instanceof Error ? cause.message : "Could not save draft.")
      } finally {
        setPending(null)
      }
      return
    }
    if (!window.confirm("Publish this exact reviewed revision to the public directory?")) return
    setPending("publish")
    setError(null)
    try {
      const token = await getToken()
      if (!token) throw new Error("Your session expired.")
      const response = await shipsApi<{ ship: ShipDetail }>(`/v1/ship-drafts/${ship.id}/publish`, token, {
        method: "POST",
        headers: { "Idempotency-Key": crypto.randomUUID() },
        body: JSON.stringify({ confirm: true, expectedUpdatedAt: ship.updatedAt }),
      })
      router.push(`/${locale}/ships/${response.ship.slug}`)
      router.refresh()
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not publish Ship.")
      setPending(null)
    }
  }

  const repository = ship.links.find((link) => link.type === "repository")?.url ?? ""
  const website = ship.links.find((link) => link.type === "website")?.url ?? ""

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem]">
      <form ref={formRef} onSubmit={save} onChange={() => { setDirty(true); setNotice(null) }} className="grid gap-6">
        <div className="grid gap-6 md:grid-cols-2">
          <Field label="Name" name="name" defaultValue={ship.name} required />
          <Field label="Slug" name="slug" defaultValue={ship.slug} required />
        </div>
        <Field label="Tagline" name="tagline" defaultValue={ship.tagline} required />
        <Field label="Picture (optional; replaces the current image)" name="image" type="file" accept="image/jpeg,image/png,image/webp,image/gif" />
        <Field label="Social post URL (LinkedIn, Instagram, X, YouTube, Substack, etc.)" name="socialPostUrl" type="url" defaultValue={ship.socialPostUrl ?? ""} />
        <label className="grid gap-2 text-sm">
          <span className="label">Description</span>
          <textarea name="description" defaultValue={ship.description} required rows={10} className="input" />
        </label>
        <div className="grid gap-6 md:grid-cols-2">
          <Field label="Repository URL" name="repository" type="url" defaultValue={repository} />
          <Field label="Website URL" name="website" type="url" defaultValue={website} />
        </div>
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        {notice ? <p className="text-sm text-muted-foreground">{notice}</p> : null}
        <button disabled={pending !== null} className="w-fit border border-line px-6 py-3 text-sm font-medium disabled:opacity-50">
          {pending === "save" ? "Saving..." : published ? "Update Ship" : "Save draft"}
        </button>
      </form>
      <aside className="h-fit border border-line p-6 lg:sticky lg:top-28">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent">{published ? "Public Ship" : "Private draft"}</p>
        {ship.imageUrl ? <img src={ship.imageUrl} alt="" className="mt-5 aspect-video w-full border border-line object-cover" /> : null}
        <h2 className="mt-5 text-2xl tracking-tight">{ship.name}</h2>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">{ship.tagline}</p>
        {ship.socialPostUrl ? <a href={ship.socialPostUrl} target="_blank" rel="noreferrer" className="mt-4 block text-sm font-medium text-accent underline underline-offset-4">View social post</a> : null}
        {published ? <p className="mt-6 text-sm leading-6 text-muted-foreground">Saved changes appear on the public Ship immediately.</p> : <>
          <hr className="my-6 border-line" />
          <p className="text-sm leading-6 text-muted-foreground">Publishing makes this page public immediately. This action requires your confirmation.</p>
          <button type="button" onClick={publish} disabled={pending !== null} className="mt-6 w-full bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground disabled:opacity-50">
            {pending === "publish" ? "Publishing..." : pending === "save" ? "Saving..." : dirty ? "Save changes to review" : "Publish Ship"}
          </button>
        </>}
      </aside>
    </div>
  )
}

function Field(props: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  const { label, ...input } = props
  return <label className="grid gap-2 text-sm"><span className="label">{label}</span><input {...input} className="input" /></label>
}
