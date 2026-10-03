import { auth } from "@clerk/nextjs/server"
import { bountySubmissions } from "@crafter/db/schema"
import { and, eq } from "drizzle-orm"
import Link from "next/link"
import { notFound, redirect } from "next/navigation"

import { BountySubmissionForm } from "@/components/bounty-submission-form"
import { Container } from "@/components/grid-container"
import { SiteHeader } from "@/components/site-header"
import { bountyQuestionsForumUrl, getBounty, isBountyOpen } from "@/lib/bounties"
import { getDb } from "@/lib/db"
import { isLocale } from "@/lib/i18n"
import { socials } from "@/lib/site"

export const dynamic = "force-dynamic"

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const bounty = getBounty((await params).id)
  return bounty ? { title: `Bounty #${bounty.slug}: ${bounty.title}`, description: bounty.prize } : {}
}

export default async function BountyPage({ params }: { params: Promise<{ lang: string; id: string }> }) {
  const { lang, id } = await params
  if (!isLocale(lang)) redirect("/en")
  const bounty = getBounty(id)
  if (!bounty) notFound()

  const path = `/${lang}/bounties/${bounty.slug}`
  const { userId } = await auth()
  const db = userId ? getDb() : null
  const [existing] = db
    ? await db
        .select({ postUrl: bountySubmissions.postUrl, whatsappContact: bountySubmissions.whatsappContact, contactConsent: bountySubmissions.contactConsent })
        .from(bountySubmissions)
        .where(and(eq(bountySubmissions.bountySlug, bounty.slug), eq(bountySubmissions.clerkUserId, userId!)))
        .limit(1)
    : []
  const open = isBountyOpen(bounty)
  const discordInviteUrl = socials.find((social) => social.label === "Discord")!.href

  return (
    <>
      <SiteHeader locale={lang} />
      <main className="flex-1">
        <Container innerClassName="mx-auto max-w-2xl px-6 py-16 md:py-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">Bounty #{bounty.slug}</p>
          <h1 className="mt-5 text-4xl font-semibold tracking-tighter md:text-5xl">{bounty.title}</h1>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">{bounty.prize}</p>
          <p className="mt-4 leading-7 text-muted-foreground">{bounty.summary}</p>

          <section className="mt-10 border-t border-line pt-8">
            <h2 className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">El reto</h2>
            <ol className="mt-4 grid list-decimal gap-2 pl-5 leading-7">
              {bounty.steps.map((step) => <li key={step}>{step}</li>)}
            </ol>
            <ul className="mt-6 grid list-disc gap-2 pl-5 leading-7 text-muted-foreground">
              {bounty.rewards.map((reward) => <li key={reward}>{reward}</li>)}
            </ul>
            <a href={bounty.eventUrl} target="_blank" rel="noreferrer" className="mt-6 inline-block text-sm underline underline-offset-4">
              Ver el evento
            </a>
          </section>

          <section className="mt-10 border-t border-line pt-8">
            {!open ? (
              <p className="text-muted-foreground">Este bounty ya cerró. Gracias a todos los que participaron.</p>
            ) : userId ? (
              <BountySubmissionForm slug={bounty.slug} existing={existing ?? null} />
            ) : (
              <div className="grid gap-4">
                <p className="text-muted-foreground">Inicia sesión con tu cuenta de Crafter para mandar tu post.</p>
                <Link href={`/${lang}/sign-in?redirect_url=${path}`} className="w-fit bg-foreground px-6 py-3 text-sm font-medium text-background">
                  Iniciar sesión para participar
                </Link>
              </div>
            )}
          </section>

          <section className="mt-10 border-t border-line pt-8 text-sm leading-6 text-muted-foreground">
            <h2 className="font-mono text-[10px] uppercase tracking-[0.2em]">¿Dudas?</h2>
            <p className="mt-3">
              Escríbelas en el{" "}
              <a href={bountyQuestionsForumUrl} target="_blank" rel="noreferrer" className="text-foreground underline underline-offset-4">foro de preguntas del Discord</a>
              . ¿Todavía no estás en el Discord?{" "}
              <a href={discordInviteUrl} target="_blank" rel="noreferrer" className="text-foreground underline underline-offset-4">Únete aquí</a>.
            </p>
          </section>
        </Container>
      </main>
    </>
  )
}
