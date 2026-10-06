import { getAdmin } from "@/lib/admin"
import { findAccessEvent } from "@/lib/access-events"
import { eventAccessCopy } from "@/lib/event-access-copy"
import { accessCsvCell } from "@/lib/event-access-service"
import { listAccessForAdmin } from "@/lib/event-access-store"
import { isLocale } from "@/lib/i18n"

export const dynamic = "force-dynamic"
export const maxDuration = 60
const privateHeaders = { "Cache-Control": "private, no-store", "X-Robots-Tag": "noindex, nofollow", "X-Content-Type-Options": "nosniff" }

export async function GET(_request: Request, { params }: { params: Promise<{ lang: string; event: string }> }) {
  const { lang, event: slug } = await params
  const event = findAccessEvent(slug)
  if (!isLocale(lang) || !event || !(await getAdmin())) return new Response("Not found", { status: 404, headers: privateHeaders })
  const t = eventAccessCopy[lang]
  const rows = await listAccessForAdmin(event)
  // A partial verification failure must not silently produce an incomplete list.
  if (!rows || rows.some(row => row.approval === "unavailable")) return new Response(t.adminUnavailable, { status: 503, headers: privateHeaders })
  const lines = [
    [t.fullName, t.email, t.documentType, t.documentNumber, t.plate, t.equipment, t.updated],
    ...rows.filter(row => row.approval === "approved").map(row => [
      row.fullName, row.email, t[row.documentType as "dni" | "foreign" | "passport"],
      row.documentNumber, row.vehiclePlate ?? "", row.equipment.join("\n"), row.updatedAt,
    ]),
  ]
  const csv = `\uFEFF${lines.map(line => line.map(accessCsvCell).join(",")).join("\r\n")}`
  return new Response(csv, { headers: {
    ...privateHeaders, "Content-Type": "text/csv; charset=utf-8",
    "Content-Disposition": `attachment; filename="${event.slug}-entry.csv"`,
  } })
}
