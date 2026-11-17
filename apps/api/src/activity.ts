export const defaultShipsPageSize = 100
export const maxShipsPageSize = 100

export type UpdateRow = { shipId: string; title: string; publishedAt: Date | string }

export type ShipActivity = {
  lastActivityAt: string
  latestUpdate: { title: string; publishedAt: string } | null
  updateCount: number
}

const iso = (value: Date | string) => new Date(value).toISOString()

/** Per-ship update count, newest update and last activity (greatest of publication and newest update). */
export function summarizeActivity(
  ships: { id: string; publishedAt: Date | string }[],
  updates: UpdateRow[],
): Map<string, ShipActivity> {
  const byShip = new Map<string, UpdateRow[]>()
  for (const update of updates) {
    const list = byShip.get(update.shipId) ?? []
    list.push(update)
    byShip.set(update.shipId, list)
  }
  const result = new Map<string, ShipActivity>()
  for (const ship of ships) {
    const list = byShip.get(ship.id) ?? []
    let latest: UpdateRow | null = null
    for (const update of list) {
      if (!latest || new Date(update.publishedAt).getTime() > new Date(latest.publishedAt).getTime()) latest = update
    }
    const published = iso(ship.publishedAt)
    const latestAt = latest ? iso(latest.publishedAt) : null
    result.set(ship.id, {
      lastActivityAt: latestAt && latestAt > published ? latestAt : published,
      latestUpdate: latest && latestAt ? { title: latest.title, publishedAt: latestAt } : null,
      updateCount: list.length,
    })
  }
  return result
}

/** Clamp client-supplied paging to the supported range. */
export function pageWindow(input: { limit?: number; offset?: number }) {
  const limit = Math.min(Math.max(input.limit ?? defaultShipsPageSize, 1), maxShipsPageSize)
  const offset = Math.max(input.offset ?? 0, 0)
  return { limit, offset }
}

export function nextOffset(offset: number, limit: number, total: number): number | null {
  return offset + limit < total ? offset + limit : null
}
