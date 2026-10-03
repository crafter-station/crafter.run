"use server"

import { auth, currentUser } from "@clerk/nextjs/server"
import { bountySubmissions } from "@crafter/db/schema"
import { sql } from "drizzle-orm"
import { headers } from "next/headers"
import { z } from "zod"

import { getBounty, isBountyOpen, normalizeWhatsappContact } from "@/lib/bounties"
import { getDb } from "@/lib/db"
import { consumeRateLimit } from "@/lib/rate-limit"

export type SubmitBountyState = { status: "idle" | "saved" | "error"; message?: string }

const formSchema = z.object({
  postUrl: z.string().trim().max(2048).url().startsWith("https://"),
  whatsappContact: z.string().trim().min(3).max(40),
  attendsInPerson: z.literal("on"),
  contactConsent: z.literal("on").optional(),
})

export async function submitBounty(slug: string, _state: SubmitBountyState, formData: FormData): Promise<SubmitBountyState> {
  const bounty = getBounty(slug)
  if (!bounty) return { status: "error", message: "Este bounty no existe." }
  if (!isBountyOpen(bounty)) return { status: "error", message: "Este bounty ya cerró." }

  const { userId } = await auth()
  if (!userId) return { status: "error", message: "Inicia sesión para participar." }

  const parsed = formSchema.safeParse(Object.fromEntries(formData))
  if (!parsed.success) {
    return { status: "error", message: "Revisa el link de tu post (https://...) y confirma que puedes ir presencial." }
  }
  const postUrl = new URL(parsed.data.postUrl)
  if (postUrl.username || postUrl.password || !postUrl.hostname.includes(".")) {
    return { status: "error", message: "Revisa el link de tu post (https://...)." }
  }
  const whatsappContact = normalizeWhatsappContact(parsed.data.whatsappContact)
  if (!whatsappContact) return { status: "error", message: "Pon tu número con código de país (+51...) o tu username de WhatsApp." }

  const user = await currentUser()
  const email = user?.primaryEmailAddress?.emailAddress
  if (!email) return { status: "error", message: "Tu cuenta no tiene un email. Agrégalo en tu perfil." }

  const db = getDb()
  if (!db) return { status: "error", message: "No pudimos guardar tu envío. Intenta de nuevo en un rato." }

  const forwardedFor = (await headers()).get("x-forwarded-for")
  const ip = forwardedFor?.split(",")[0]?.trim()
  try {
    const [byUser, byIp] = await Promise.all([
      consumeRateLimit(db, `bounty-submit:user:${userId}`, 10, 60 * 60),
      ip ? consumeRateLimit(db, `bounty-submit:ip:${ip}`, 40, 60 * 60) : true,
    ])
    if (!byUser || !byIp) {
      return { status: "error", message: "Demasiados envíos seguidos. Espera un rato e intenta de nuevo." }
    }

    const values = {
      bountySlug: bounty.slug,
      clerkUserId: userId,
      name: (user?.fullName ?? user?.username ?? email).slice(0, 80),
      email,
      whatsappContact,
      postUrl: parsed.data.postUrl,
      attendsInPerson: true,
      contactConsent: parsed.data.contactConsent === "on",
    }
    await db
      .insert(bountySubmissions)
      .values(values)
      .onConflictDoUpdate({
        target: [bountySubmissions.bountySlug, bountySubmissions.clerkUserId],
        set: { ...values, updatedAt: sql`now()` },
      })
  } catch {
    return { status: "error", message: "No pudimos guardar tu envío. Intenta de nuevo en un rato." }
  }

  return { status: "saved" }
}
