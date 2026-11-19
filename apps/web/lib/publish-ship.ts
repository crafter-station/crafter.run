import type { ShipDetail } from "@crafter/contracts"

import { shipToRequest, type ShipFields } from "@/lib/new-ship-draft"
import { revalidateShipPagesAction } from "@/app/[lang]/ships/[slug]/actions"
import { shipsApi } from "@/lib/ships-client"

type TokenSource = () => Promise<string | null>

export type PublishShipInput = {
  getToken: TokenSource
  /** Shown when no token is available. */
  sessionExpired: string
  fields: ShipFields
  provenance: string[]
  /** An already uploaded cover. Leave undefined to use the typed cover URL. */
  imageUrl?: string | null
  /** The draft saved by an earlier attempt, reused instead of creating a second one. */
  existing?: DraftRef | null
  /** `existing` already holds these fields: publish it without saving again. */
  reuseDraft?: boolean
}

/** What a later attempt needs from a saved draft. */
export type DraftRef = Pick<ShipDetail, "id" | "updatedAt">

async function freshToken({ getToken, sessionExpired }: Pick<PublishShipInput, "getToken" | "sessionExpired">) {
  const token = await getToken()
  if (!token) throw new Error(sessionExpired)
  return token
}

/** Creates the draft, or updates the one a previous attempt made. Each call carries its own Idempotency-Key and token. */
export async function saveShipDraft(input: PublishShipInput): Promise<ShipDetail> {
  const token = await freshToken(input)
  const body = JSON.stringify(shipToRequest(input.fields, input.provenance, input.imageUrl))
  const { existing } = input
  const { ship } = existing
    ? await shipsApi<{ ship: ShipDetail }>(`/v1/ship-drafts/${existing.id}`, token, { method: "PATCH", body })
    : await shipsApi<{ ship: ShipDetail }>("/v1/ship-drafts", token, { method: "POST", headers: { "Idempotency-Key": crypto.randomUUID() }, body })
  return ship
}

/** Publishes a saved draft. The API answers `published`, or `pending` when the Ship goes to review. */
export async function publishShipDraft(input: Pick<PublishShipInput, "getToken" | "sessionExpired">, ship: DraftRef): Promise<ShipDetail> {
  const token = await freshToken(input)
  const published = await shipsApi<{ ship: ShipDetail }>(`/v1/ship-drafts/${ship.id}/publish`, token, {
    method: "POST",
    headers: { "Idempotency-Key": crypto.randomUUID() },
    body: JSON.stringify({ confirm: true, expectedUpdatedAt: ship.updatedAt }),
  })
  await revalidateShipPagesAction(published.ship.slug, published.ship.owner.handle)
  return published.ship
}

/** Saves the draft then publishes it. `onDraft` runs between the two so a caller keeps the draft if publishing fails. */
export async function publishShip(input: PublishShipInput, onDraft?: (draft: DraftRef) => void): Promise<ShipDetail> {
  const draft = input.existing && input.reuseDraft ? input.existing : await saveShipDraft(input)
  onDraft?.(draft)
  return publishShipDraft(input, draft)
}
