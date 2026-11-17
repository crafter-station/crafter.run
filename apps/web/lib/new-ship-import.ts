import { repoInputToUrl, repoKey } from "@/lib/github-repos"
import { ImportError, importShipFromLink, normalizeUrl, type ImportResult } from "@/lib/new-ship-draft"

/** Reads a GitHub repository on the server, which adds the token that lifts GitHub's rate limit. */
export async function importFromGithub(repo: string): Promise<ImportResult> {
  const response = await fetch("/api/ship-import/github", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ repo }) }).catch(() => null)
  if (!response) throw new ImportError("importFailed")
  const body = (await response.json().catch(() => null)) as { result?: ImportResult; error?: string } | null
  if (response.ok && body?.result) return body.result
  const known = ["invalidUrl", "repoNotFound", "rateLimited", "importFailed"] as const
  throw new ImportError(known.find((key) => key === body?.error) ?? "importFailed")
}

async function pageMeta(url: string) {
  const response = await fetch("/api/ship-import", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ url }) })
  if (!response.ok) return null
  const body = (await response.json()) as { meta: { title: string | null; description: string | null; image: string | null; siteName: string | null } | null; unreachable?: boolean }
  if (body.unreachable) throw new ImportError("siteUnreachable")
  return body.meta
}

/** Reads a GitHub repository (URL or owner/name) through the server, or any other website from its page metadata. */
export async function importAnyLink(input: string): Promise<ImportResult> {
  const repo = repoInputToUrl(input)
  return repo ? importFromGithub(repo) : importShipFromLink(input, { pageMeta })
}

/** The canonical URL for a link a member typed, or null when it is not something we can import.
 * Accepts a GitHub repository (URL or owner/name) or an http(s) website with a real domain.
 * A bare GitHub profile or organization page is rejected: it is not a project. */
export function parseLink(value: string): string | null {
  const text = value.trim()
  if (!text || /\s/.test(text)) return null
  const repo = repoInputToUrl(text)
  if (repo) return repo
  let url: URL
  try {
    url = new URL(normalizeUrl(text))
  } catch {
    return null
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") return null
  if (url.username || url.password) return null
  if (!/^(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}$/i.test(url.hostname)) return null
  if (/^(www\.)?github\.com$/i.test(url.hostname)) return null
  return url.href
}

/** Identity used to drop the same project pasted twice: owner/name for repositories, the URL without a trailing slash otherwise. */
export const linkKey = (link: string) => repoKey(link) ?? link.toLowerCase().replace(/\/+$/, "")

/** Splits pasted or typed text on spaces, commas and line breaks. Valid links are canonical and unique; the rest come back untouched. */
export function tokenizeLinks(text: string, existing: readonly string[] = []): { valid: string[]; invalid: string[] } {
  const seen = new Set(existing.map(linkKey))
  const valid: string[] = []
  const invalid: string[] = []
  for (const part of text.split(/[\s,]+/)) {
    if (!part) continue
    const link = parseLink(part)
    if (!link) {
      invalid.push(part)
      continue
    }
    const key = linkKey(link)
    if (seen.has(key)) continue
    seen.add(key)
    valid.push(link)
  }
  return { valid, invalid }
}
