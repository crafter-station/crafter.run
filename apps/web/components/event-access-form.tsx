"use client"

import { useEffect, useRef, useState } from "react"
import { submitEventAccess } from "@/app/[lang]/events/[event]/access/actions"
import { accessInputSchema, type AccessDetails, type AccessField, type AccessResult } from "@/lib/event-access-service"
import { eventAccessCopy } from "@/lib/event-access-copy"
import type { Locale } from "@/lib/i18n"

export function EventAccessForm({ locale, slug, email, defaultName, existing, closesAt }: {
  locale: Locale; slug: string; email: string; defaultName: string
  existing: AccessDetails | null; closesAt: string
}) {
  const t = eventAccessCopy[locale]
  const [vehicle, setVehicle] = useState(Boolean(existing?.vehiclePlate))
  const [noEquipment, setNoEquipment] = useState(existing?.equipment.length === 0)
  const [busy, setBusy] = useState(false)
  const [saved, setSaved] = useState(Boolean(existing))
  const [dirty, setDirty] = useState(false)
  const [result, setResult] = useState<AccessResult | null>(null)
  const [closed, setClosed] = useState(Date.now() >= Date.parse(closesAt))
  const feedback = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const id = setInterval(() => setClosed(Date.now() >= Date.parse(closesAt)), 1000)
    return () => clearInterval(id)
  }, [closesAt])
  const fields = result && !result.ok ? result.fields ?? [] : []
  const fieldProps = (field: AccessField) => ({
    "aria-invalid": fields.includes(field),
    "aria-describedby": fields.includes(field) ? `${field}-error` : undefined,
  })
  const error = (field: AccessField) => fields.includes(field) ? <span className="entry-field-error" id={`${field}-error`}>{t.fieldError}</span> : null

  async function submit(form: HTMLFormElement) {
    if (busy || closed) return
    const data = new FormData(form)
    const input = {
      fullName: String(data.get("fullName") ?? ""), documentType: String(data.get("documentType") ?? ""),
      documentNumber: String(data.get("documentNumber") ?? ""), hasVehicle: vehicle,
      vehiclePlate: String(data.get("vehiclePlate") ?? ""), noEquipment,
      equipmentText: String(data.get("equipmentText") ?? ""), consent: data.get("consent") === "on",
    }
    const parsed = accessInputSchema.safeParse(input)
    if (!parsed.success) {
      const nextFields = [...new Set(parsed.error.issues.map(issue => issue.path[0] as AccessField))]
      setResult({ ok: false, error: "invalid", fields: nextFields })
      form.querySelector<HTMLElement>(`[name="${nextFields[0]}"]`)?.focus()
      return
    }
    setBusy(true)
    setResult(null)
    try {
      const response = await submitEventAccess(slug, input)
      setResult(response)
      if (response.ok) { setSaved(true); setDirty(false) }
    } catch {
      setResult({ ok: false, error: "unavailable" })
    } finally {
      setBusy(false)
      requestAnimationFrame(() => feedback.current?.focus())
    }
  }

  return <form className="entry-form" noValidate onChange={() => { setDirty(true); setResult(null) }} onSubmit={event => { event.preventDefault(); void submit(event.currentTarget) }}>
    <div className="entry-form-heading">
      <span className="entry-badge">{t.approved}</span>
      <h2>{t.formTitle}</h2>
      <p className="entry-email">{email}</p>
    </div>
    <fieldset disabled={busy || closed}>
      <div className="entry-field">
        <label htmlFor="fullName">{t.fullName}</label>
        <input id="fullName" name="fullName" autoComplete="name" maxLength={120} defaultValue={existing?.fullName ?? defaultName} required {...fieldProps("fullName")} />
        {error("fullName")}
      </div>
      <div className="entry-field-pair">
        <div className="entry-field">
          <label htmlFor="documentType">{t.documentType}</label>
          <select id="documentType" name="documentType" defaultValue={existing?.documentType ?? "dni"} {...fieldProps("documentType")}>
            <option value="dni">{t.dni}</option><option value="foreign">{t.foreign}</option><option value="passport">{t.passport}</option>
          </select>{error("documentType")}
        </div>
        <div className="entry-field">
          <label htmlFor="documentNumber">{t.documentNumber}</label>
          <input id="documentNumber" name="documentNumber" autoComplete="off" spellCheck={false} maxLength={20} defaultValue={existing?.documentNumber ?? ""} required {...fieldProps("documentNumber")} />
          {error("documentNumber")}
        </div>
      </div>
      <p className="entry-hint">{t.documentHint}</p>
      <div className="entry-field-group">
        <label className="entry-checkbox"><input type="checkbox" checked={vehicle} onChange={e => setVehicle(e.target.checked)} />{t.hasVehicle}</label>
        {vehicle ? <div className="entry-field">
          <label htmlFor="vehiclePlate">{t.plate}</label>
          <input id="vehiclePlate" name="vehiclePlate" autoComplete="off" maxLength={12} defaultValue={existing?.vehiclePlate ?? ""} required {...fieldProps("vehiclePlate")} />
          {error("vehiclePlate")}
        </div> : null}
      </div>
      <div className="entry-field-group">
        <div className="entry-field">
          <label htmlFor="equipmentText">{t.equipment}</label>
          <p id="equipment-hint" className="entry-hint">{t.equipmentHint}</p>
          <textarea id="equipmentText" name="equipmentText" rows={4} maxLength={1200} autoComplete="off" disabled={noEquipment} defaultValue={existing?.equipment.join("\n") ?? ""} required={!noEquipment} {...fieldProps("equipmentText")} aria-describedby={`equipment-hint${fields.includes("equipmentText") ? " equipmentText-error" : ""}`} />
          {error("equipmentText")}
        </div>
        <label className="entry-checkbox"><input type="checkbox" checked={noEquipment} onChange={e => setNoEquipment(e.target.checked)} />{t.noEquipment}</label>
      </div>
      <div className="entry-privacy">
        <h3>{t.privacyTitle}</h3><p>{t.privacy}</p>
        <label className="entry-checkbox"><input type="checkbox" name="consent" required {...fieldProps("consent")} />{t.consent}</label>
        {error("consent")}
      </div>
      <button className="station-button" type="submit">{busy ? t.saving : saved ? t.update : t.save}</button>
    </fieldset>
    <div ref={feedback} tabIndex={-1} aria-live="polite" className="entry-feedback">
      {closed ? <p>{t.closedBody}</p> : result && !result.ok ? <p role="alert">{t.errors[result.error]}</p> : saved && !dirty ? <><h3>{t.saved}</h3><p>{t.savedBody}</p></> : null}
    </div>
  </form>
}
