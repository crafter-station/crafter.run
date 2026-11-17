import { auth } from "@clerk/nextjs/server"

import { githubFetch, repoInputToUrl } from "@/lib/github-repos"
import { ImportError, importShipFromLink } from "@/lib/new-ship-draft"
import { fetchPageMeta } from "@/lib/ship-og"

/** Reads a public GitHub repository for the new Ship form, with the server token when one is set. Signed-in members only. */
export async function POST(request: Request) {
  const identity = await auth()
  if (!identity.isAuthenticated) return Response.json({ error: "Authentication required." }, { status: 401 })
  const body = (await request.json().catch(() => null)) as { repo?: unknown } | null
  const url = typeof body?.repo === "string" && body.repo.length <= 300 ? repoInputToUrl(body.repo) : null
  if (!url) return Response.json({ error: "invalidUrl" }, { status: 400 })
  try {
    const result = await importShipFromLink(url, { fetchImpl: githubFetch(process.env.GITHUB_TOKEN), pageMeta: fetchPageMeta })
    return Response.json({ result }, { headers: { "Cache-Control": "no-store" } })
  } catch (cause) {
    const key = cause instanceof ImportError ? cause.key : "importFailed"
    return Response.json({ error: key }, { status: key === "repoNotFound" ? 404 : key === "rateLimited" ? 429 : key === "invalidUrl" ? 400 : 502, headers: { "Cache-Control": "no-store" } })
  }
}
