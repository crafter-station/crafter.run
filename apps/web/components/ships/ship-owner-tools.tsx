"use client"

import { Pencil, RefreshCw } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"

import { syncReleasesAction, type SyncReleasesState } from "@/app/[lang]/ships/[slug]/actions"
import { useIsShipOwner } from "@/components/use-is-ship-owner"
import type { ShipDetailCopy } from "@/lib/ship-detail-copy"

/** Edit and sync, visible only to the Ship's owner and kept small, away from the public content. */
export function ShipOwnerTools({ locale, ownerHandle, slug, copy }: {
  locale: string
  ownerHandle: string
  slug: string
  copy: Pick<ShipDetailCopy, "ownerTools" | "ownerNote" | "edit" | "sync" | "syncing">
}) {
  const isOwner = useIsShipOwner(ownerHandle)
  const router = useRouter()
  const [pending, start] = useTransition()
  const [state, setState] = useState<SyncReleasesState>(null)
  if (!isOwner) return null

  return (
    <section className="ship-owner" aria-label={copy.ownerTools}>
      <h2>{copy.ownerTools}</h2>
      <p>{copy.ownerNote}</p>
      <div>
        <Link href={`/${locale}/ships/${slug}/edit`}>
          <Pencil aria-hidden="true" />
          {copy.edit}
        </Link>
        <button
          type="button"
          disabled={pending}
          onClick={() =>
            start(async () => {
              const result = await syncReleasesAction(slug)
              setState(result)
              if (result?.ok) router.refresh()
            })
          }
        >
          <RefreshCw aria-hidden="true" />
          {pending ? copy.syncing : copy.sync}
        </button>
      </div>
      {state ? <p role="status" className="ship-owner-status">{state.message}</p> : null}
    </section>
  )
}
