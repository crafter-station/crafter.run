import { upsertMemberRequestSchema, type PrivateMemberProfile, type UpsertMemberRequest } from "@crafter/contracts"

import { emptyToNullPlace, type Place } from "@/lib/place"

export const LINK_KEYS = ["github", "linkedin", "x", "instagram", "gitlab", "website", "website2"] as const
export type LinkKey = (typeof LINK_KEYS)[number]

export type ProfileDraft = {
  handle: string
  displayName: string
  bio: string
  currentRole: string
  rolesOpenTo: string[]
  isJobSeeking: boolean
  origin: Place | null
  based: Place | null
  /** What the member typed: a username, a path or a full URL. */
  links: Record<LinkKey, string>
}

export const MAX_ROLES = 10

type LinkSpec = { host: string; prefix: string; hosts: string[] }

/** Social links are typed as a username; websites are typed as a URL. */
export const SOCIAL_LINKS: Partial<Record<LinkKey, LinkSpec>> = {
  github: { host: "github.com", prefix: "github.com/", hosts: ["github.com"] },
  gitlab: { host: "gitlab.com", prefix: "gitlab.com/", hosts: ["gitlab.com"] },
  linkedin: { host: "www.linkedin.com", prefix: "linkedin.com/in/", hosts: ["linkedin.com", "www.linkedin.com"] },
  instagram: { host: "www.instagram.com", prefix: "instagram.com/", hosts: ["instagram.com", "www.instagram.com"] },
  x: { host: "x.com", prefix: "x.com/", hosts: ["x.com", "www.x.com", "twitter.com", "www.twitter.com"] },
}

export function emptyLinks(): Record<LinkKey, string> {
  return { github: "", linkedin: "", x: "", instagram: "", gitlab: "", website: "", website2: "" }
}

export function emptyDraft(): ProfileDraft {
  return {
    handle: "",
    displayName: "",
    bio: "",
    currentRole: "",
    rolesOpenTo: [],
    isJobSeeking: false,
    origin: null,
    based: null,
    links: emptyLinks(),
  }
}

/** Turns anything a member might paste into a handle that the API accepts, or an empty string. */
export function slugifyHandle(value: string): string {
  const slug = value
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40)
    .replace(/-+$/g, "")
  return slug.length >= 3 ? slug : ""
}

/** The username part of a social link, from a bare name, an @name or a full URL. */
export function socialUsername(key: LinkKey, raw: string): string {
  const value = raw.trim()
  if (!value) return ""
  const spec = SOCIAL_LINKS[key]
  if (!spec) return value
  const withScheme = /^https?:\/\//i.test(value) ? value : /^[a-z0-9.-]+\.[a-z]{2,}\//i.test(value) ? `https://${value}` : null
  if (withScheme) {
    try {
      const segments = new URL(withScheme).pathname.split("/").filter(Boolean)
      const last = key === "linkedin" && segments[0] === "in" ? segments[1] : segments[0]
      return (last ?? "").replace(/^@/, "")
    } catch {
      return value
    }
  }
  return value.replace(/^@/, "").replace(/\/+$/, "")
}

/** The URL the API stores for one link field, or null when the field is empty. */
export function linkToUrl(key: LinkKey, raw: string): string | null {
  const value = raw.trim()
  if (!value) return null
  const spec = SOCIAL_LINKS[key]
  if (!spec) return /^https?:\/\//i.test(value) ? value : `https://${value}`
  const username = socialUsername(key, value)
  if (!username) return null
  return key === "linkedin" ? `https://${spec.host}/in/${username}` : `https://${spec.host}/${username}`
}

export function draftToRequest(draft: ProfileDraft, avatarUrl: string | null): UpsertMemberRequest {
  const text = (value: string) => value.trim() || null
  return {
    handle: draft.handle.trim().toLowerCase(),
    displayName: draft.displayName.trim(),
    bio: text(draft.bio),
    avatarUrl,
    githubUrl: linkToUrl("github", draft.links.github),
    gitlabUrl: linkToUrl("gitlab", draft.links.gitlab),
    linkedinUrl: linkToUrl("linkedin", draft.links.linkedin),
    instagramUrl: linkToUrl("instagram", draft.links.instagram),
    xUrl: linkToUrl("x", draft.links.x),
    primaryWebsiteUrl: linkToUrl("website", draft.links.website),
    secondaryWebsiteUrl: linkToUrl("website2", draft.links.website2),
    currentRole: text(draft.currentRole),
    rolesOpenTo: draft.rolesOpenTo.map((role) => role.trim()).filter(Boolean).slice(0, MAX_ROLES),
    isJobSeeking: draft.isJobSeeking,
    originLocation: emptyToNullPlace(draft.origin),
    basedLocation: emptyToNullPlace(draft.based),
  }
}

export function draftFromMember(member: PrivateMemberProfile): ProfileDraft {
  const asPlace = (place: PrivateMemberProfile["originLocation"]): Place | null => (place ? { ...place } : null)
  return {
    handle: member.handle,
    displayName: member.displayName,
    bio: member.bio ?? "",
    currentRole: member.currentRole ?? "",
    rolesOpenTo: [...member.rolesOpenTo],
    isJobSeeking: member.isJobSeeking,
    origin: asPlace(member.originLocation),
    based: asPlace(member.basedLocation),
    links: {
      github: socialUsername("github", member.githubUrl ?? ""),
      gitlab: socialUsername("gitlab", member.gitlabUrl ?? ""),
      linkedin: socialUsername("linkedin", member.linkedinUrl ?? ""),
      instagram: socialUsername("instagram", member.instagramUrl ?? ""),
      x: socialUsername("x", member.xUrl ?? ""),
      website: member.primaryWebsiteUrl ?? "",
      website2: member.secondaryWebsiteUrl ?? "",
    },
  }
}

export function samePlace(a: Place | null, b: Place | null) {
  return JSON.stringify(a) === JSON.stringify(b)
}

export function isDraftReady(draft: ProfileDraft) {
  return /^[a-z0-9][a-z0-9-]*[a-z0-9]$/.test(draft.handle.trim().toLowerCase()) && draft.handle.trim().length >= 3 && draft.displayName.trim().length > 0
}

/** Field-level problems the API would reject, keyed by request field. Empty when the draft is valid. */
export function validateDraft(draft: ProfileDraft): Record<string, string> {
  const probe = { ...draft, handle: draft.handle.trim() || "placeholder", displayName: draft.displayName.trim() || "placeholder" }
  const result = upsertMemberRequestSchema.safeParse(draftToRequest(probe, null))
  const issues: Record<string, string> = {}
  if (!result.success) {
    for (const issue of result.error.issues) {
      const key = String(issue.path[0] ?? "profile")
      issues[key] ??= issue.message
    }
  }
  for (const [key, field] of [["github", "githubUrl"], ["gitlab", "gitlabUrl"], ["linkedin", "linkedinUrl"], ["instagram", "instagramUrl"], ["x", "xUrl"]] as const) {
    if (/\s/.test(socialUsername(key, draft.links[key]))) issues[field] ??= "Use a username without spaces"
  }
  if (draft.handle.trim() && !/^[a-z0-9][a-z0-9-]*[a-z0-9]$/.test(draft.handle.trim().toLowerCase())) issues.handle ??= "Invalid handle"
  return issues
}
