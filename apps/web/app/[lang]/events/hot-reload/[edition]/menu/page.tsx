import Link from "next/link"
import { notFound } from "next/navigation"
import { and, eq } from "drizzle-orm"
import { eventOrders } from "@crafter/db/schema"

import { EventMenuForm, type ExistingOrder } from "@/components/event-menu-form"
import { HotReloadHero, VenueLink } from "@/components/hot-reload-hero"
import { HotReloadTheme } from "@/components/hot-reload-theme"
import { LinkLumaEmail } from "@/components/link-luma-email"
import { getDb } from "@/lib/db"
import { getEventGuest } from "@/lib/event-guest"
import { eventMenu } from "@/lib/event-menu"
import { findEdition } from "@/lib/hot-reload"
import { isLocale } from "@/lib/i18n"

export const metadata = {
  title: "Hot Reload: elige tu pedido",
  description: `Elige una bebida y una comida de ${eventMenu.venue} para el Hot Reload.`,
  robots: { index: false },
}

async function getExistingOrder(clerkUserId: string): Promise<ExistingOrder | null> {
  const db = getDb()
  if (!db) return null
  const [order] = await db
    .select({ name: eventOrders.name, drinkId: eventOrders.drinkId, foodId: eventOrders.foodId })
    .from(eventOrders)
    .where(and(eq(eventOrders.eventSlug, eventMenu.slug), eq(eventOrders.clerkUserId, clerkUserId)))
    .limit(1)
  return order ?? null
}

function Notice({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="max-w-xl border border-line p-6">
      <h2 className="text-2xl">{title}</h2>
      <div className="mt-3 leading-relaxed text-muted-foreground">{children}</div>
    </div>
  )
}

export default async function Page({ params }: { params: Promise<{ lang: string; edition: string }> }) {
  const { lang, edition: number } = await params
  const edition = findEdition(number)
  if (!isLocale(lang) || !edition?.menu || !edition.lumaEventId) notFound()

  const path = `/${lang}/events/hot-reload/${edition.number}/menu`
  const { user, emails, check } = await getEventGuest(edition.lumaEventId)

  let content: React.ReactNode
  if (!user) {
    content = (
      <Notice title="Inicia sesión para pedir">
        <p>Entra con el mismo correo con el que pediste tu cupo en Luma. Así confirmamos que estás en la lista.</p>
        <Link className="station-button mt-5" href={`/${lang}/sign-in?redirect_url=${encodeURIComponent(path)}`}>
          Iniciar sesión
        </Link>
      </Notice>
    )
  } else if (check?.status === "approved") {
    const defaultName = check.name ?? [user.firstName, user.lastName].filter(Boolean).join(" ")
    content = <EventMenuForm email={check.email} defaultName={defaultName} existing={await getExistingOrder(user.id)} />
  } else if (check?.status === "not-approved") {
    content = (
      <Notice title="Tu cupo todavía no está confirmado">
        <p>
          Encontramos tu registro con {check.email}, pero aún no está aprobado. Cuando te confirmen en Luma, vuelve aquí
          para elegir tu pedido.
        </p>
      </Notice>
    )
  } else if (check?.status === "not-found") {
    content = (
      <Notice title="No encontramos tu correo en Luma">
        <p>
          Revisamos {emails?.join(", ")} y no está en la lista de este evento.{" "}
          {edition.lumaUrl ? (
            <a className="underline underline-offset-4" href={edition.lumaUrl} target="_blank" rel="noopener noreferrer">
              Solicita tu cupo en Luma
            </a>
          ) : null}
          .
        </p>
        <LinkLumaEmail />
      </Notice>
    )
  } else {
    content = (
      <Notice title="No pudimos revisar la lista">
        <p>Luma no respondió. Intenta de nuevo en unos minutos.</p>
      </Notice>
    )
  }

  return (
    <HotReloadTheme>
      <HotReloadHero
        locale={lang}
        crumbs={[
          { label: "Agenda", href: "/events" },
          { label: "Hot Reload", href: "/events/hot-reload" },
          { label: `#${edition.number}`, href: `/events/hot-reload/${edition.number}` },
          { label: "Pedido" },
        ]}
        title="Elige tu pedido"
        description={
          <>
            Una bebida y una comida de <VenueLink edition={edition} />, hasta S/{eventMenu.maxTotal} por persona. Invita
            Crafter Station. Puedes cambiarlo cuando quieras hasta el día del evento.
          </>
        }
        edition={edition}
      />
      <section className="pb-14">{content}</section>
    </HotReloadTheme>
  )
}
