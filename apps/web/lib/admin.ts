import { currentUser, type User } from "@clerk/nextjs/server"

export const isAdminUser = (user: User) => user.publicMetadata?.role === "admin"

/** Admins have `{ "role": "admin" }` in their Clerk public metadata. */
export async function getAdmin() {
  const user = await currentUser()
  return user && isAdminUser(user) ? user : null
}
