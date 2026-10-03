"use server"

import { auth, currentUser } from "@clerk/nextjs/server"
import { bountySubmissions } from "@crafter/db/schema"
import { sql } from "drizzle-orm"
import { z } from "zod"

import { getBounty, isBountyOpen, normalizePhone } from "@/lib/bounties"
import { getDb } from "@/lib/db"

export type SubmitBountyState = { status: "idle" | "saved" | "error"; message?: string }

const formSchema = z.object({
  postUrl: z.string().trim().url().startsWith("https://"),
  whatsappPhone: z.string().trim().min(9).max(20),
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
  const whatsappPhone = normalizePhone(parsed.data.whatsappPhone)
  if (!whatsappPhone) return { status: "error", message: "Usa el número con el que estás en el grupo, con código de país (+51...)." }

  const user = await currentUser()
  const email = user?.primaryEmailAddress?.emailAddress
  if (!email) return { status: "error", message: "Tu cuenta no tiene un email. Agrégalo en tu perfil." }

  const db = getDb()
  if (!db) return { status: "error", message: "No pudimos guardar tu envío. Intenta de nuevo en un rato." }

  const values = {
    bountySlug: bounty.slug,
    clerkUserId: userId,
    name: user?.fullName ?? user?.username ?? email,
    email,
    whatsappPhone,
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

  return { status: "saved" }
}
