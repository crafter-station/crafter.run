"use client"

import type { FormEvent } from "react"
import { useState } from "react"
import type { ShipUpdate } from "@crafter/contracts"
import { useAuth } from "@clerk/nextjs"
import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"

import { revalidateShipPagesAction } from "@/app/[lang]/ships/[slug]/actions"
import { useIsShipOwner } from "@/components/use-is-ship-owner"
import type { ShipDetailCopy } from "@/lib/ship-detail-copy"
import { shipsApi, uploadShipImage } from "@/lib/ships-client"

/** The owner's form for posting an update. The timeline itself is server-rendered, so a new update triggers a refresh. */
export function ShipUpdateComposer({ ownerHandle, slug, copy }: {
  ownerHandle: string
  slug: string
  copy: ShipDetailCopy["composer"]
}) {
  const isOwner = useIsShipOwner(ownerHandle)
  const { getToken } = useAuth()
  const router = useRouter()
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  if (!isOwner) return null

  async function publish(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setPending(true)
    setError(null)
    const form = event.currentTarget
    const data = new FormData(form)
    try {
      const token = await getToken()
      if (!token) throw new Error(copy.expired)
      const image = data.get("image")
      const imageUrl = image instanceof File && image.size > 0 ? await uploadShipImage(image, token) : null
      await shipsApi<{ update: ShipUpdate }>(`/v1/ships/${encodeURIComponent(slug)}/updates`, token, {
        method: "POST",
        headers: { "Idempotency-Key": crypto.randomUUID() },
        body: JSON.stringify({ title: data.get("title"), description: data.get("description"), imageUrl, socialPostUrl: data.get("socialPostUrl") || null }),
      })
      form.reset()
      await revalidateShipPagesAction(slug, ownerHandle)
      router.refresh()
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : copy.failed)
    } finally {
      setPending(false)
    }
  }

  return (
    <details className="ship-composer">
      <summary>
        <Plus aria-hidden="true" />
        {copy.open}
      </summary>
      <form onSubmit={publish}>
        <input name="title" required maxLength={100} placeholder={copy.title} aria-label={copy.title} className="input" />
        <textarea name="description" required minLength={4} maxLength={5000} rows={6} placeholder={copy.description} aria-label={copy.description} className="input" />
        <label>
          <span className="label">{copy.image}</span>
          <input name="image" type="file" accept="image/jpeg,image/png,image/webp,image/gif" className="input" />
        </label>
        <label>
          <span className="label">{copy.socialPost}</span>
          <input name="socialPostUrl" type="url" placeholder="https://x.com/.../status/..." className="input" />
        </label>
        {error ? <p role="alert" className="ship-composer-error">{error}</p> : null}
        <button disabled={pending} className="ships-button">{pending ? copy.publishing : copy.publish}</button>
      </form>
    </details>
  )
}
