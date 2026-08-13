export const ORGANIZATION_OWNERS = ["crafter-station", "crafter-research"] as const

export type TimelineOrgFilter =
  | "all"
  | (typeof ORGANIZATION_OWNERS)[number]
  | "team"

export function matchesTimelineOrg(owner: string, org: TimelineOrgFilter) {
  if (org === "all") return true
  if (org === "team") {
    return !ORGANIZATION_OWNERS.includes(
      owner as (typeof ORGANIZATION_OWNERS)[number],
    )
  }
  return owner === org
}
