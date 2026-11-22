/**
 * Welcome mail for people who joined crafter.run through an invitation.
 *
 * Invitations carry `public_metadata.source = "crafter-invite"`, which Clerk copies to the user on sign-up.
 * The Clerk `user.created` webhook calls `sendInviteWelcome`, which sends the gift codes through Resend
 * (https://resend.com/docs/api-reference/emails/send-email) and adds the person to the newsletter segment.
 */

import { isSuppressed } from "@/lib/mail-suppress"

const RESEND_API = "https://api.resend.com"

export const INVITE_SOURCE = "crafter-invite"
export const WELCOME_FROM = "Railly de Crafter Station <hola@updates.crafter.run>"
export const WELCOME_REPLY_TO = "railly@crafterstation.com"
export const WELCOME_SUBJECT = "Ya estás en crafter.run: aquí van tus regalos"
export const ojitoUrl = (code: string) => `https://ojito.dev/es?code=${encodeURIComponent(code)}&ref=crafter#beta`

type ClerkEmail = { id: string; email_address: string }
export type ClerkUserCreated = {
  id: string
  first_name?: string | null
  primary_email_address_id?: string | null
  email_addresses?: ClerkEmail[]
  public_metadata?: Record<string, unknown> | null
}

export type WelcomeConfig = { apiKey?: string; segmentId?: string; ojitoCode?: string; tasteCode?: string; suppress?: string }
export type WelcomeCodes = { ojitoCode: string; tasteCode: string }
export type WelcomeResult = { status: "sent" } | { status: "skipped" } | { status: "unavailable" } | { status: "failed" }

export function primaryEmail(user: ClerkUserCreated): string | undefined {
  const emails = user.email_addresses ?? []
  return (emails.find(e => e.id === user.primary_email_address_id) ?? emails[0])?.email_address
}

export function isInvited(user: ClerkUserCreated): boolean {
  return user.public_metadata?.source === INVITE_SOURCE
}

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[ch] ?? ch)

export function welcomeHtml(firstName: string | null | undefined, codes: WelcomeCodes): string {
  const hello = firstName?.trim() ? `Hola ${escapeHtml(firstName.trim())},` : "Hola,"
  const font = "-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif"
  return `<!doctype html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="color-scheme" content="light"><title>${WELCOME_SUBJECT}</title></head>
<body style="margin:0;padding:0;background:#f3efe4;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">Tu código de Ojito y tu 50% en Taste hacking.</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f3efe4;"><tr><td align="center" style="padding:40px 16px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#fbf9f3;border:1px solid #e2dccb;">
<tr><td style="padding:36px 36px 8px;font-family:${font};color:#23211c;">
<img src="https://crafter.run/icon-192.png" width="40" height="40" alt="Crafter Station" style="display:block;border:0;">
<p style="margin:28px 0 0;font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#8a8475;">Bienvenida</p>
<h1 style="margin:10px 0 0;font-size:30px;line-height:1.15;letter-spacing:-.02em;font-weight:600;">Ya estás en crafter.run</h1>
<p style="margin:22px 0 0;font-size:17px;line-height:1.6;">${hello}</p>
<p style="margin:14px 0 0;font-size:17px;line-height:1.6;">Gracias por aceptar la invitación. Como te prometimos, aquí van tus dos regalos.</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:26px 0 0;background:#23211c;"><tr><td style="padding:24px 24px 22px;color:#fbf9f3;font-family:${font};">
<p style="margin:0;font-size:12px;letter-spacing:.1em;text-transform:uppercase;color:#e8c96a;">Tus regalos</p>
<p style="margin:12px 0 0;font-size:19px;line-height:1.35;font-weight:600;">Ojito con 50% de descuento de por vida</p>
<p style="margin:6px 0 0;font-size:15px;line-height:1.55;color:#d9d4c6;">Tu código de beta: <strong style="color:#fbf9f3;font-family:ui-monospace,Menlo,monospace;">${escapeHtml(codes.ojitoCode)}</strong>. Entras a la beta privada en Mac y, cuando salga a la venta, pagas la mitad para siempre.</p>
<p style="margin:16px 0 0;font-size:19px;line-height:1.35;font-weight:600;">50% en Taste hacking</p>
<p style="margin:6px 0 0;font-size:15px;line-height:1.55;color:#d9d4c6;">Código <strong style="color:#fbf9f3;font-family:ui-monospace,Menlo,monospace;">${escapeHtml(codes.tasteCode)}</strong> para la edición 02 de nuestro curso en vivo de design engineering con agentes de IA.</p>
</td></tr></table>
<table role="presentation" cellpadding="0" cellspacing="0" style="margin:28px 0 0;"><tr><td style="background:#23211c;">
<a href="${escapeHtml(ojitoUrl(codes.ojitoCode))}" style="display:inline-block;padding:14px 26px;font-size:16px;font-weight:600;color:#fbf9f3;text-decoration:none;">Activar Ojito</a>
</td></tr></table>
<p style="margin:14px 0 0;font-size:14px;line-height:1.6;color:#6b665a;">Y anótate a Taste hacking en <a href="https://tastehacking.dev" style="color:#6b665a;">tastehacking.dev</a> para usar tu código cuando abra.</p>
<p style="margin:28px 0 0;font-size:17px;line-height:1.6;">Para empezar, <a href="https://crafter.run/es/ships/new" style="color:#23211c;">publica tu primer Ship</a> o mira lo que ya <a href="https://crafter.run/es/ships" style="color:#23211c;">shippea la comunidad</a>.</p>
<p style="margin:28px 0 0;font-size:17px;line-height:1.6;">Nos vemos adentro,<br>Railly, de Crafter Station</p>
</td></tr>
<tr><td style="padding:28px 36px 32px;font-family:${font};font-size:13px;line-height:1.6;color:#8a8475;border-top:1px solid #e2dccb;">
Crafter Station · <a href="https://crafter.run/es" style="color:#8a8475;">crafter.run</a><br>
Te llega este correo porque creaste tu cuenta en crafter.run.
</td></tr></table>
</td></tr></table>
</body></html>`
}

export function welcomeText(firstName: string | null | undefined, codes: WelcomeCodes): string {
  const hello = firstName?.trim() ? `Hola ${firstName.trim()},` : "Hola,"
  return [
    hello,
    "",
    "Gracias por aceptar la invitación. Como te prometimos, aquí van tus dos regalos.",
    "",
    `- Ojito con 50% de descuento de por vida. Tu código de beta: ${codes.ojitoCode}. Actívalo en ${ojitoUrl(codes.ojitoCode)}`,
    `- 50% en Taste hacking (edición 02). Código: ${codes.tasteCode}. Anótate en https://tastehacking.dev`,
    "",
    "Para empezar, publica tu primer Ship: https://crafter.run/es/ships/new",
    "",
    "Nos vemos adentro,",
    "Railly, de Crafter Station",
  ].join("\n")
}

function resend(apiKey: string, path: string, init: RequestInit & { headers?: Record<string, string> } = {}) {
  return fetch(`${RESEND_API}${path}`, {
    ...init,
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json", ...init.headers },
  })
}

export async function sendInviteWelcome(user: ClerkUserCreated, config: WelcomeConfig): Promise<WelcomeResult> {
  const email = primaryEmail(user)
  if (!isInvited(user) || !email || isSuppressed(email, config.suppress)) return { status: "skipped" }
  if (!config.apiKey || !config.ojitoCode || !config.tasteCode) return { status: "unavailable" }
  const codes = { ojitoCode: config.ojitoCode, tasteCode: config.tasteCode }

  const sent = await resend(config.apiKey, "/emails", {
    method: "POST",
    headers: { "Idempotency-Key": `crafter-welcome/${user.id}` },
    body: JSON.stringify({
      from: WELCOME_FROM,
      to: [email],
      reply_to: WELCOME_REPLY_TO,
      subject: WELCOME_SUBJECT,
      html: welcomeHtml(user.first_name, codes),
      text: welcomeText(user.first_name, codes),
    }),
  })
  if (!sent.ok) return { status: "failed" }

  if (config.segmentId) {
    const created = await resend(config.apiKey, "/contacts", {
      method: "POST",
      body: JSON.stringify({ email, first_name: user.first_name ?? undefined, unsubscribed: false, segments: [{ id: config.segmentId }] }),
    })
    if (!created.ok) {
      const added = await resend(config.apiKey, `/contacts/${encodeURIComponent(email)}/segments/${config.segmentId}`, { method: "POST" })
      if (!added.ok) console.error("Welcome contact could not be added to the newsletter segment.", added.status)
    }
  }
  return { status: "sent" }
}
