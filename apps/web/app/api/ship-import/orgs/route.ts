import { auth, currentUser } from "@clerk/nextjs/server"

import { listGithubOrgs } from "@/lib/github-repos"

/** The signed-in member's public GitHub organizations, read from their linked GitHub account. */
export async function GET() {
  const identity = await auth()
  if (!identity.isAuthenticated) return Response.json({ error: "Authentication required." }, { status: 401 })
  const user = await currentUser()
  const login = user?.externalAccounts.find((account) => account.provider.endsWith("github") && account.username)?.username
  const orgs = login ? await listGithubOrgs(login) : []
  return Response.json({ orgs }, { headers: { "Cache-Control": "private, max-age=300" } })
}
