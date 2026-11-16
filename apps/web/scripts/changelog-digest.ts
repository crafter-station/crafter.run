/**
 * Monthly digest for the newsletter.
 *
 *   bun scripts/changelog-digest.ts --month 2026-11 --locale es          writes HTML to /tmp and prints the path
 *   bun scripts/changelog-digest.ts --month 2026-11 --locale es --draft  also creates a DRAFT broadcast in Resend
 *
 * Needs RESEND_API_KEY, RESEND_NEWSLETTER_SEGMENT_ID and NEWSLETTER_FROM (a sender on a verified domain,
 * for example "Crafter Station <news@crafter.run>") for --draft. This script never sends.
 */
import fs from "node:fs"
import path from "node:path"
import { parseArgs } from "node:util"
import { createDraftBroadcast, fetchMetrics, readEntries, renderDigest } from "../lib/digest"
import { isLocale } from "../lib/i18n"

async function main() {
  const { values } = parseArgs({ options: { month: { type: "string" }, locale: { type: "string", default: "en" }, draft: { type: "boolean", default: false } } })
  const { month, locale } = values

  if (!month || !/^\d{4}-(0[1-9]|1[0-2])$/.test(month)) throw new Error("--month YYYY-MM is required")
  if (!locale || !isLocale(locale)) throw new Error("--locale must be one of en, es, pt, zh, ja")

  const entries = readEntries(path.join(import.meta.dir, "../content/changelog"), month, locale)
  const metrics = await fetchMetrics()
  const digest = renderDigest({ month, locale, entries, metrics })

  const file = `/tmp/crafter-digest-${month}-${locale}.html`
  fs.writeFileSync(file, digest.html)
  console.log(`${entries.length} entries, metrics ${metrics ? "ok" : "unavailable"}`)
  console.log(file)

  if (values.draft) {
    const { RESEND_API_KEY: apiKey, RESEND_NEWSLETTER_SEGMENT_ID: segmentId, NEWSLETTER_FROM: from } = process.env
    if (!apiKey || !segmentId || !from) throw new Error("--draft needs RESEND_API_KEY, RESEND_NEWSLETTER_SEGMENT_ID and NEWSLETTER_FROM")
    const id = await createDraftBroadcast({ name: `Digest ${month} ${locale}`, from, subject: digest.subject, html: digest.html, text: digest.text }, { apiKey, segmentId })
    console.log(`draft broadcast ${id}: review and send it from the Resend dashboard`)
  }
}

main().catch(error => {
  console.error(error instanceof Error ? error.message : error)
  process.exit(1)
})
