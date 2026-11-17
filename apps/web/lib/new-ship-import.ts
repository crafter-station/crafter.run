import { ImportError, type ImportResult } from "@/lib/new-ship-draft"

/** Reads a GitHub repository on the server, which adds the token that lifts GitHub's rate limit. */
export async function importFromGithub(repo: string): Promise<ImportResult> {
  const response = await fetch("/api/ship-import/github", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ repo }) }).catch(() => null)
  if (!response) throw new ImportError("importFailed")
  const body = (await response.json().catch(() => null)) as { result?: ImportResult; error?: string } | null
  if (response.ok && body?.result) return body.result
  const known = ["invalidUrl", "repoNotFound", "rateLimited", "importFailed"] as const
  throw new ImportError(known.find((key) => key === body?.error) ?? "importFailed")
}
