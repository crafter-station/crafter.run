import type { Locale } from "@/lib/i18n"

const en = {
  title: "Codex credits", intro: "Check in here. Credits are handed out after the demo to people in the room.",
  signInTitle: "Sign in to check in.", signInBody: "Use the email you registered with on Luma. If you came without registering, any email works.", signIn: "Sign in",
  notListedTitle: "We couldn’t find you on Luma.", notListedBody: "If you registered with another email, verify it below. If you didn’t register, join the waitlist: leftover credits are drawn among people in the room.",
  name: "Full name", join: "Join the waitlist", joining: "Joining…",
  checkedLuma: "You’re checked in. Your Luma spot is confirmed.", checkedWaitlist: "You’re on the waitlist.",
  waitBody: "When the code appears on screen, enter it here. Keep this page open.",
  codeLabel: "Code on screen", confirm: "I’m here", confirming: "Checking…",
  presentBody: "Presence confirmed. Credits are handed out when the window closes.",
  yourCode: "Your credit code", open: "Open and redeem", copy: "Copy", copied: "Copied",
  report: "My code doesn’t work", reported: "We let the organizers know. Ask a facilitator.",
  missedBody: "You didn’t confirm your presence in time. Ask a facilitator if you were in the room.",
  noCreditBody: "There were no credits left for the waitlist this time. Thanks for coming.",
  badge: "Get your badge", badgeLocked: "Your badge unlocks once you claim your Codex credit code from this event.",
  unavailable: "We can’t check right now. Try again in a moment.", retry: "Try again",
  errors: { auth: "Sign in again.", unavailable: "Something failed. Try again.", closed: "The window is not open.", code: "That code doesn’t match the screen.", locked: "Too many attempts. Wait a minute.", entry: "Check in first.", name: "Write your full name." },
}
type Copy = typeof en

const es: Copy = {
  title: "Créditos de Codex", intro: "Haz check-in aquí. Los créditos se reparten después de la demo entre los que están en la sala.",
  signInTitle: "Inicia sesión para hacer check-in.", signInBody: "Usa el correo con el que te inscribiste en Luma. Si viniste sin inscribirte, sirve cualquier correo.", signIn: "Iniciar sesión",
  notListedTitle: "No te encontramos en Luma.", notListedBody: "Si te inscribiste con otro correo, verifícalo abajo. Si no te inscribiste, únete a la waitlist: los créditos que sobren se sortean entre los que están en la sala.",
  name: "Nombre completo", join: "Unirme a la waitlist", joining: "Uniéndote…",
  checkedLuma: "Check-in listo. Tu cupo de Luma está confirmado.", checkedWaitlist: "Estás en la waitlist.",
  waitBody: "Cuando aparezca el código en pantalla, escríbelo aquí. Deja esta página abierta.",
  codeLabel: "Código de la pantalla", confirm: "Estoy aquí", confirming: "Verificando…",
  presentBody: "Presencia confirmada. Los créditos se reparten cuando se cierre la ventana.",
  yourCode: "Tu código de créditos", open: "Abrir y canjear", copy: "Copiar", copied: "Copiado",
  report: "Mi código no funciona", reported: "Les avisamos a los organizadores. Busca a un facilitador.",
  missedBody: "No confirmaste tu presencia a tiempo. Si estabas en la sala, habla con un facilitador.",
  noCreditBody: "Esta vez no quedaron créditos para la waitlist. Gracias por venir.",
  badge: "Saca tu badge", badgeLocked: "Tu badge se desbloquea cuando reclames tu código de créditos de Codex de este evento.",
  unavailable: "No podemos verificar ahora. Intenta en un momento.", retry: "Reintentar",
  errors: { auth: "Vuelve a iniciar sesión.", unavailable: "Algo falló. Intenta de nuevo.", closed: "La ventana no está abierta.", code: "Ese código no coincide con la pantalla.", locked: "Demasiados intentos. Espera un minuto.", entry: "Primero haz check-in.", name: "Escribe tu nombre completo." },
}

export const eventCreditsCopy: Record<Locale, Copy> = { en, es, pt: en, zh: en, ja: en }
