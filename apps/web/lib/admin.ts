import { currentUser } from "@clerk/nextjs/server"

const adminEmails = new Set(["raillyhugo@gmail.com"])

export async function getAdmin() {
  const user = await currentUser()
  const isAdmin = user?.emailAddresses.some(
    (address) => address.verification?.status === "verified" && adminEmails.has(address.emailAddress.toLowerCase()),
  )
  return isAdmin ? user : null
}
