import { currentUser } from "@clerk/nextjs/server"

/** Admins have `{ "role": "admin" }` in their Clerk public metadata. */
export async function getAdmin() {
  const user = await currentUser()
  return user?.publicMetadata?.role === "admin" ? user : null
}
