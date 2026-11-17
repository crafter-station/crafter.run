import { parsePlaceText } from "@/lib/place"
import { emptyDraft, slugifyHandle, type ProfileDraft } from "@/lib/profile-draft"

type GithubUser = {
  login?: string
  name?: string | null
  bio?: string | null
  blog?: string | null
  location?: string | null
  twitter_username?: string | null
}

/** Reads a public GitHub profile. Any failure returns null so onboarding never waits on it. */
export async function fetchGithubUser(login: string): Promise<GithubUser | null> {
  try {
    const token = process.env.GITHUB_TOKEN
    const response = await fetch(`https://api.github.com/users/${encodeURIComponent(login)}`, {
      headers: { Accept: "application/vnd.github+json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
      signal: AbortSignal.timeout(2500),
      cache: "no-store",
    })
    if (!response.ok) return null
    return (await response.json()) as GithubUser
  } catch {
    return null
  }
}

export function draftFromGithub(login: string, user: GithubUser | null): Partial<ProfileDraft> {
  const draft: Partial<ProfileDraft> = { handle: slugifyHandle(login), links: { ...emptyDraft().links, github: login } }
  if (!user) return draft
  if (user.name) draft.displayName = user.name.slice(0, 80)
  if (user.bio) draft.bio = user.bio.replace(/\s+/g, " ").trim().slice(0, 280)
  const place = parsePlaceText(user.location)
  if (place) draft.based = place
  draft.links = {
    ...draft.links!,
    website: user.blog?.trim() ?? "",
    x: user.twitter_username ?? "",
  }
  return draft
}

export type OnboardingPrefill = {
  draft: ProfileDraft
  source: "github" | "account" | "none"
  avatarUrl: string | null
}

type ClerkLike = {
  fullName: string | null
  username: string | null
  imageUrl: string
  externalAccounts: { provider: string; username: string | null }[]
}

export async function buildOnboardingPrefill(user: ClerkLike | null): Promise<OnboardingPrefill> {
  const base = emptyDraft()
  if (!user) return { draft: base, source: "none", avatarUrl: null }
  base.displayName = user.fullName ?? ""
  base.handle = slugifyHandle(user.username ?? user.fullName ?? "")
  const github = user.externalAccounts.find((account) => account.provider.endsWith("github") && account.username)
  if (!github?.username) return { draft: base, source: "account", avatarUrl: user.imageUrl }
  const fromGithub = draftFromGithub(github.username, await fetchGithubUser(github.username))
  return {
    draft: {
      ...base,
      ...Object.fromEntries(Object.entries(fromGithub).filter(([, value]) => value !== "" && value !== undefined)),
      displayName: fromGithub.displayName || base.displayName,
      links: { ...base.links, ...fromGithub.links },
    },
    source: "github",
    avatarUrl: user.imageUrl,
  }
}
