import { auth } from "@clerk/nextjs/server"

import { listOwnerRepos } from "@/lib/github-repos"

/** Public repositories of a GitHub user or organization for the new Ship form. Signed-in members only. */
export async function GET(request: Request) {
  const identity = await auth()
  if (!identity.isAuthenticated) return Response.json({ error: "Authentication required." }, { status: 401 })
  const params = new URL(request.url).searchParams
  const owner = params.get("owner") ?? ""
  const result = await listOwnerRepos(owner, params.get("kind") === "org" ? "org" : "user")
  const headers = { "Cache-Control": "private, max-age=60" }
  if (result.status === "ok") return Response.json({ repos: result.repos }, { headers })
  return Response.json({ error: result.status }, { status: result.status === "notFound" ? 404 : 502, headers })
}
