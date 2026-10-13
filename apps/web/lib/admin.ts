import { currentUser } from "@clerk/nextjs/server"

// Bootstrap owner; everyone else gets `{ "role": "admin" }` in Clerk public metadata.
const adminEmails = new Set(["raillyhugo@gmail.com"])

export async function getAdmin() {
  const user = await currentUser()
  if (!user) return null
  if (user.publicMetadata?.role === "admin") return user
  const isOwner = user.emailAddresses.some(
    (address) => address.verification?.status === "verified" && adminEmails.has(address.emailAddress.toLowerCase()),
  )
  return isOwner ? user : null
}
