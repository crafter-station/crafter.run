import { createHash } from "node:crypto"

/**
 * Addresses that never join a mailing list. `MAIL_SUPPRESS` holds comma-separated SHA-256 hashes of
 * lowercased emails, or of "@domain" for a whole domain, so the list itself never lives in the repo.
 */
const sha256 = (value: string) => createHash("sha256").update(value).digest("hex")

export function isSuppressed(email: string, list: string | undefined): boolean {
  if (!list) return false
  const hashes = new Set(list.split(",").map(hash => hash.trim().toLowerCase()).filter(Boolean))
  if (hashes.size === 0) return false
  const normalized = email.trim().toLowerCase()
  const domain = normalized.slice(normalized.lastIndexOf("@"))
  return hashes.has(sha256(normalized)) || hashes.has(sha256(domain))
}
