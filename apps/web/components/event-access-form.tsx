"use client"

import { Camera, Globe, IdCard, Laptop, type LucideIcon, Package, Plug, Plus, Smartphone, Tablet, X, BookUser } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { submitEventAccess } from "@/app/[lang]/events/[event]/access/actions"
import { accessInputSchema, type AccessDetails, type AccessField, type AccessResult } from "@/lib/event-access-service"
import { eventAccessCopy } from "@/lib/event-access-copy"
import type { Locale } from "@/lib/i18n"

const itemIcons: LucideIcon[] = [Laptop, Plug, Tablet, Smartphone, Camera, Package]
const documentIcons: Record<AccessDetails["documentType"], LucideIcon> = { dni: IdCard, foreign: Globe, passport: BookUser }
type Item = { id: number; type: number; brand: string; model: string }
let nextItemId = 0
const newItem = (type = 0): Item => ({ id: nextItemId++, type, brand: "", model: "" })

/* Stored lines read "<type> — <brand> <model>"; unknown types fall back to the last option. */
function parseItems(lines: string[], types: string[]): Item[] {
  return lines.map(line => {
    const [label, rest = ""] = line.includes(" — ") ? line.split(" — ", 2) : ["", line]
    const type = types.indexOf(label)
    const [brand = "", ...model] = rest.trim().split(/\s+/)
    return { ...newItem(type === -1 ? types.length - 1 : type), brand, model: model.join(" ") }
  })
}
const serializeItems = (items: Item[], types: string[]) =>
  items.filter(item => item.brand.trim()).map(item => `${types[item.type]} — ${[item.brand.trim(), item.model.trim()].filter(Boolean).join(" ")}`).join("\n")

export function EventAccessForm({ locale, slug, email, defaultName, existing, closesAt }: {
  locale: Locale; slug: string; email: string; defaultName: string
  existing: AccessDetails | null; closesAt: string
}) {
  const t = eventAccessCopy[locale]
  const [vehicle, setVehicle] = useState(Boolean(existing?.vehiclePlate))
  const [noEquipment, setNoEquipment] = useState(existing?.equipment.length === 0)
  const [documentType, setDocumentType] = useState<AccessDetails["documentType"]>(existing?.documentType ?? "dni")
  const [items, setItems] = useState<Item[]>(() => existing?.equipment.length ? parseItems(existing.equipment, t.itemTypes) : [newItem()])
  const updateItem = (id: number, patch: Partial<Item>) => setItems(current => current.map(item => item.id === id ? { ...item, ...patch } : item))
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
      equipmentText: serializeItems(items, t.itemTypes), consent: data.get("consent") === "on",
    }
    const parsed = accessInputSchema.safeParse(input)
    if (!parsed.success) {
      const nextFields = [...new Set(parsed.error.issues.map(issue => issue.path[0] as AccessField))]
      setResult({ ok: false, error: "invalid", fields: nextFields })
      form.querySelector<HTMLElement>(`[data-field="${nextFields[0]}"]`)?.focus()
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
        <input id="fullName" name="fullName" data-field="fullName" autoComplete="name" placeholder={t.namePlaceholder} maxLength={120} defaultValue={existing?.fullName ?? defaultName} required {...fieldProps("fullName")} />
        {error("fullName")}
      </div>
      <fieldset className="entry-field entry-choice" {...fieldProps("documentType")}>
        <legend>{t.documentType}</legend>
        <div className="entry-segments">
          {(["dni", "foreign", "passport"] as const).map(type => {
            const Icon = documentIcons[type]
            return <label key={type} className="entry-segment">
              <input type="radio" name="documentType" value={type} checked={documentType === type} onChange={() => setDocumentType(type)} />
              <Icon aria-hidden size={18} strokeWidth={1.75} /><span>{t[type]}</span>
            </label>
          })}
        </div>
      </fieldset>
      <div className="entry-field entry-field-spaced">
        <label htmlFor="documentNumber">{t.documentNumber}</label>
        <input id="documentNumber" name="documentNumber" data-field="documentNumber" autoComplete="off" spellCheck={false}
          inputMode={documentType === "dni" ? "numeric" : "text"} maxLength={documentType === "dni" ? 8 : 20}
          placeholder={documentType === "dni" ? "12345678" : documentType === "foreign" ? "001234567" : "AB1234567"}
          onInput={event => {
            const input = event.currentTarget
            input.value = documentType === "dni" ? input.value.replace(/\D/g, "") : input.value.toUpperCase().replace(/[^A-Z0-9-]/g, "")
          }}
          defaultValue={existing?.documentNumber ?? ""} required {...fieldProps("documentNumber")} aria-describedby={`document-format${fields.includes("documentNumber") ? " documentNumber-error" : ""}`} />
        <p id="document-format" className="entry-hint">{documentType === "dni" ? t.dniFormat : t.documentFormat}</p>
        {error("documentNumber")}
      </div>
      <div className="entry-field-group">
        <label className="entry-checkbox"><input type="checkbox" checked={vehicle} onChange={e => setVehicle(e.target.checked)} />{t.hasVehicle}</label>
        {vehicle ? <div className="entry-field">
          <label htmlFor="vehiclePlate">{t.plate}</label>
          <input id="vehiclePlate" name="vehiclePlate" data-field="vehiclePlate" autoComplete="off" maxLength={12} placeholder={t.platePlaceholder}
            onInput={event => { event.currentTarget.value = event.currentTarget.value.toUpperCase() }} defaultValue={existing?.vehiclePlate ?? ""} required {...fieldProps("vehiclePlate")} />
          {error("vehiclePlate")}
        </div> : null}
      </div>
      <div className="entry-field-group">
        <div className="entry-field">
          <span className="entry-label" id="equipment-label">{t.equipment}</span>
          <p id="equipment-hint" className="entry-hint">{t.equipmentHint}</p>
          {noEquipment ? null : <ul className="entry-items" aria-labelledby="equipment-label" aria-describedby="equipment-hint">
            {items.map((item, index) => {
              const Icon = itemIcons[item.type]
              const invalid = fields.includes("equipmentText") && !item.brand.trim()
              return <li key={item.id} className="entry-item">
                <span className="entry-item-icon" aria-hidden><Icon size={20} strokeWidth={1.75} /></span>
                <select aria-label={`${t.equipment} ${index + 1}`} value={item.type} onChange={event => updateItem(item.id, { type: Number(event.target.value) })}>
                  {t.itemTypes.map((label, type) => <option key={label} value={type}>{label}</option>)}
                </select>
                <input aria-label={t.brand} placeholder={t.brandPlaceholder} value={item.brand} maxLength={50} autoComplete="off" aria-invalid={invalid}
                  data-field={index === 0 ? "equipmentText" : undefined} onChange={event => updateItem(item.id, { brand: event.target.value })} />
                <input aria-label={t.model} placeholder={t.modelPlaceholder} value={item.model} maxLength={60} autoComplete="off"
                  onChange={event => updateItem(item.id, { model: event.target.value })} />
                <button type="button" className="entry-item-remove" aria-label={`${t.removeItem} ${index + 1}`} disabled={items.length === 1}
                  onClick={() => setItems(current => current.filter(entry => entry.id !== item.id))}><X aria-hidden size={18} /></button>
              </li>
            })}
          </ul>}
          {noEquipment || items.length >= 10 ? null : <button type="button" className="entry-add-item" onClick={() => setItems(current => [...current, newItem(1)])}>
            <Plus aria-hidden size={18} />{t.addItem}
          </button>}
          {error("equipmentText")}
        </div>
        <label className="entry-checkbox"><input type="checkbox" checked={noEquipment} onChange={e => setNoEquipment(e.target.checked)} />{t.noEquipment}</label>
      </div>
      <div className="entry-privacy">
        <h3>{t.privacyTitle}</h3><p>{t.privacy}</p>
        <label className="entry-checkbox"><input type="checkbox" name="consent" data-field="consent" required {...fieldProps("consent")} />{t.consent}</label>
        {error("consent")}
      </div>
      <button className="station-button" type="submit">{busy ? t.saving : saved ? t.update : t.save}</button>
    </fieldset>
    <div ref={feedback} tabIndex={-1} aria-live="polite" className="entry-feedback">
      {closed ? <p>{t.closedBody}</p> : result && !result.ok ? <p role="alert">{t.errors[result.error]}</p> : saved && !dirty ? <><h3>{t.saved}</h3><p>{t.savedBody}</p></> : null}
    </div>
  </form>
}
