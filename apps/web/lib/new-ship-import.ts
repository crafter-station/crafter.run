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
  const body = (await response.json()) as { meta: { title: string | null; description: string | null; image: string | null; siteName: string | null } | null }
  return body.meta
}

/** Reads a GitHub repository (URL or owner/name) through the server, or any other website from its page metadata. */
export async function importAnyLink(input: string): Promise<ImportResult> {
  const repo = repoInputToUrl(input)
  return repo ? importFromGithub(repo) : importShipFromLink(input, { pageMeta })
}

/** Splits pasted text into distinct links: one per line, or separated by spaces or commas. Repositories collapse to their URL. */
export function splitLinks(text: string): string[] {
  const links: string[] = []
  const seen = new Set<string>()
  for (const part of text.split(/[\s,]+/)) {
    const value = part.trim()
    if (!value) continue
    const link = repoInputToUrl(value) ?? normalizeUrl(value)
    const key = repoKey(link) ?? link.toLowerCase().replace(/\/+$/, "")
    if (seen.has(key)) continue
    seen.add(key)
    links.push(link)
  }
  return links
}
