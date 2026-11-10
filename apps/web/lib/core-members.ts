import type { User } from "@clerk/nextjs/server"

import { type TeamMember, teamMembers } from "./team"

type Account = Pick<User, "externalAccounts" | "emailAddresses">

const coreMembers = teamMembers.filter((member) => !member.alumni)

const githubHandle = (url: string) => url.replace(/\/+$/, "").split("/").pop()?.toLowerCase() ?? ""

/** The Core member this account belongs to, matched by a linked GitHub account or a verified email. */
export function findCoreMember(user: Account): TeamMember | null {
  const handles = new Set(
    user.externalAccounts
      .filter((account) => account.provider.endsWith("github") && account.username)
      .map((account) => account.username!.toLowerCase()),
  )
  const emails = new Set(
    user.emailAddresses
      .filter((address) => address.verification?.status === "verified")
      .map((address) => address.emailAddress.toLowerCase()),
  )
  return (
    coreMembers.find(
      (member) =>
        (member.github && handles.has(githubHandle(member.github))) ||
        (member.email && emails.has(member.email.toLowerCase())),
    ) ?? null
  )
}
