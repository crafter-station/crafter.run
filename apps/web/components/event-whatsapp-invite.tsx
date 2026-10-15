"use client"

import { DevdayWhatsApp } from "@/components/devday-whatsapp"
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import { eventAccessCopy } from "@/lib/event-access-copy"
import type { Locale } from "@/lib/i18n"

/** WhatsApp group invite shown after entry details are saved. */
export function EventWhatsAppInvite({
  locale,
  whatsappUrl,
  open,
  onOpenChange,
}: {
  locale: Locale
  whatsappUrl: string
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const t = eventAccessCopy[locale]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="event-badge-theme theme-scope dd-invite rounded-2xl sm:rounded-2xl max-h-[90dvh] overflow-y-auto">
        <DevdayWhatsApp />
        <DialogTitle className="dd-invite-title">{t.whatsappTitle}</DialogTitle>
        <DialogDescription className="dd-invite-body">{t.whatsappBody}</DialogDescription>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="station-button dd-invite-cta"
          onClick={() => onOpenChange(false)}
        >
          {t.whatsappJoin}
        </a>
        <button type="button" className="dd-invite-later" onClick={() => onOpenChange(false)}>
          {t.whatsappLater}
        </button>
      </DialogContent>
    </Dialog>
  )
}
