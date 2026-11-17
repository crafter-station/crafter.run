"use client"

import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"

import { syncReleasesAction, type SyncReleasesState } from "@/app/[lang]/ships/[slug]/actions"
import { useIsShipOwner } from "@/components/ship-edit-link"

export function ShipSyncReleases({ ownerHandle, slug }: { ownerHandle: string; slug: string }) {
  const isOwner = useIsShipOwner(ownerHandle)
  const router = useRouter()
  const [pending, start] = useTransition()
  const [state, setState] = useState<SyncReleasesState>(null)
  if (!isOwner) return null

  return (
    <div className="mt-3 text-sm">
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
        className="font-medium text-accent underline underline-offset-4 disabled:opacity-50"
      >
        {pending ? "Syncing..." : "Sync releases"}
      </button>
      {state ? <p role="status" className="mt-1 text-xs text-muted-foreground">{state.message}</p> : null}
    </div>
  )
}
