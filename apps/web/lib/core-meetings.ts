import "server-only"
import { coreMeetings } from "@crafter/db/schema"
import { desc, eq } from "drizzle-orm"

import { getDb } from "@/lib/db"

export type CoreMeetingSummary = {
  slug: string
  title: string
  heldAt: string
  durationMinutes: number | null
  summary: string
  attendees: string[]
}

export type CoreMeeting = CoreMeetingSummary & { body: string; transcript: string | null }

const summaryColumns = {
  slug: coreMeetings.slug,
  title: coreMeetings.title,
  heldAt: coreMeetings.heldAt,
  durationMinutes: coreMeetings.durationMinutes,
  summary: coreMeetings.summary,
  attendees: coreMeetings.attendees,
}

/** Call only after `getCoreViewer()` returned a Core viewer. `null` means storage is unavailable. */
export async function listCoreMeetings(): Promise<CoreMeetingSummary[] | null> {
  const db = getDb()
  if (!db) return null
  return db.select(summaryColumns).from(coreMeetings).orderBy(desc(coreMeetings.heldAt))
}

/** Call only after `getCoreViewer()` returned a Core viewer. */
export async function getCoreMeeting(slug: string): Promise<CoreMeeting | null> {
  const db = getDb()
  if (!db) return null
  const [row] = await db
    .select({ ...summaryColumns, body: coreMeetings.body, transcript: coreMeetings.transcript })
    .from(coreMeetings)
    .where(eq(coreMeetings.slug, slug))
    .limit(1)
  return row ?? null
}
