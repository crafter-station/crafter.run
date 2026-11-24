/**
 * "Your Ship is live" mail, sent when an admin approves a member's Ship in /admin/ships.
 * Same Resend sender and visual template as the invite welcome (lib/welcome-mail.ts).
 */

import { isSuppressed } from "@/lib/mail-suppress"
import { WELCOME_FROM, WELCOME_REPLY_TO } from "@/lib/welcome-mail"

const RESEND_API = "https://api.resend.com"

export type ShipLiveMail = {
  shipId: string
  slug: string
  name: string
  tagline: string
  imageUrl: string | null
  firstName: string | null
  email: string
}

export type ShipLiveResult = { status: "sent" } | { status: "skipped" } | { status: "unavailable" } | { status: "failed" }

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[ch] ?? ch)

export const shipLiveUrl = (slug: string) => `https://crafter.run/es/ships/${encodeURIComponent(slug)}`
export const shipLiveSubject = (name: string) => `Tu Ship ya está en crafter.run: ${name}`

export function shipLiveHtml(mail: Omit<ShipLiveMail, "email" | "shipId">): string {
  const hello = mail.firstName?.trim() ? `Hola ${escapeHtml(mail.firstName.trim())},` : "Hola,"
  const font = "-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif"
  const url = escapeHtml(shipLiveUrl(mail.slug))
  const name = escapeHtml(mail.name)
  const image = mail.imageUrl?.startsWith("https://")
    ? `<a href="${url}" style="display:block;margin:26px 0 0;"><img src="${escapeHtml(mail.imageUrl)}" width="488" alt="${name}" style="display:block;width:100%;max-width:488px;height:auto;border:1px solid #e2dccb;"></a>`
    : ""
  return `<!doctype html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="color-scheme" content="light"><title>${escapeHtml(shipLiveSubject(mail.name))}</title></head>
<body style="margin:0;padding:0;background:#f3efe4;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${name} ya está publicado en crafter.run.</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f3efe4;"><tr><td align="center" style="padding:40px 16px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#fbf9f3;border:1px solid #e2dccb;">
<tr><td style="padding:36px 36px 8px;font-family:${font};color:#23211c;">
<img src="https://crafter.run/icon-192.png" width="40" height="40" alt="Crafter Station" style="display:block;border:0;">
<p style="margin:28px 0 0;font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#8a8475;">Ship publicado</p>
<h1 style="margin:10px 0 0;font-size:30px;line-height:1.15;letter-spacing:-.02em;font-weight:600;">${name} ya está en crafter.run</h1>
<p style="margin:22px 0 0;font-size:17px;line-height:1.6;">${hello}</p>
<p style="margin:14px 0 0;font-size:17px;line-height:1.6;">Revisamos tu Ship y ya está publicado. Desde ahora aparece en la comunidad y tus próximos Ships se publican directo, sin revisión.</p>
${image}
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:26px 0 0;background:#23211c;"><tr><td style="padding:22px 24px 20px;color:#fbf9f3;font-family:${font};">
<p style="margin:0;font-size:12px;letter-spacing:.1em;text-transform:uppercase;color:#e8c96a;">Tu Ship</p>
<p style="margin:10px 0 0;font-size:19px;line-height:1.35;font-weight:600;">${name}</p>
<p style="margin:6px 0 0;font-size:15px;line-height:1.55;color:#d9d4c6;">${escapeHtml(mail.tagline)}</p>
</td></tr></table>
<table role="presentation" cellpadding="0" cellspacing="0" style="margin:28px 0 0;"><tr><td style="background:#23211c;">
<a href="${url}" style="display:inline-block;padding:14px 26px;font-size:16px;font-weight:600;color:#fbf9f3;text-decoration:none;">Ver tu Ship</a>
</td></tr></table>
<p style="margin:14px 0 0;font-size:14px;line-height:1.6;color:#6b665a;">Desde la página de tu Ship puedes publicarlo en LinkedIn con un clic.</p>
<p style="margin:28px 0 0;font-size:17px;line-height:1.6;">Gracias por shippear con nosotros,<br>Railly, de Crafter Station</p>
</td></tr>
<tr><td style="padding:28px 36px 32px;font-family:${font};font-size:13px;line-height:1.6;color:#8a8475;border-top:1px solid #e2dccb;">
Crafter Station · <a href="https://crafter.run/es" style="color:#8a8475;">crafter.run</a><br>
Te llega este correo porque publicaste un Ship en crafter.run.
</td></tr></table>
</td></tr></table>
</body></html>`
}

export function shipLiveText(mail: Omit<ShipLiveMail, "email" | "shipId">): string {
  const hello = mail.firstName?.trim() ? `Hola ${mail.firstName.trim()},` : "Hola,"
  return [
    hello,
    "",
    `Revisamos tu Ship y ya está publicado: ${mail.name}. Desde ahora aparece en la comunidad y tus próximos Ships se publican directo, sin revisión.`,
    "",
    `Míralo aquí: ${shipLiveUrl(mail.slug)}`,
    "Desde la página de tu Ship puedes publicarlo en LinkedIn con un clic.",
    "",
    "Gracias por shippear con nosotros,",
    "Railly, de Crafter Station",
  ].join("\n")
}

export async function sendShipLive(mail: ShipLiveMail, config: { apiKey?: string; suppress?: string }): Promise<ShipLiveResult> {
  if (!mail.email || isSuppressed(mail.email, config.suppress)) return { status: "skipped" }
  if (!config.apiKey) return { status: "unavailable" }
  const response = await fetch(`${RESEND_API}/emails`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json",
      // One mail per Ship, even if the approve button is pressed twice.
      "Idempotency-Key": `crafter-ship-live/${mail.shipId}`,
    },
    body: JSON.stringify({
      from: WELCOME_FROM,
      to: [mail.email],
      reply_to: WELCOME_REPLY_TO,
      subject: shipLiveSubject(mail.name),
      html: shipLiveHtml(mail),
      text: shipLiveText(mail),
    }),
  })
  return response.ok ? { status: "sent" } : { status: "failed" }
}
