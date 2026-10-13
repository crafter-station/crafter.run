"use client"

import * as SelectPrimitive from "@radix-ui/react-select"
import { BookUser, Check, ChevronDown, Globe, IdCard, Info, Laptop, type LucideIcon, Plus, X } from "lucide-react"
import { type SimpleIcon, siAcer, siApple, siAsus, siDell, siHp, siHuawei, siLenovo, siLg, siMsi, siSamsung, siToshiba } from "simple-icons"
import { useEffect, useId, useRef, useState } from "react"
import { submitEventAccess } from "@/app/[lang]/events/[event]/access/actions"
import { accessInputSchema, type AccessDetails, type AccessField, type AccessResult } from "@/lib/event-access-service"
import { eventAccessCopy } from "@/lib/event-access-copy"
import { laptopModels } from "@/lib/laptop-models"
import type { Locale } from "@/lib/i18n"

const laptopBrands: [string, SimpleIcon | null][] = [["Apple", siApple], ["Lenovo", siLenovo], ["HP", siHp], ["Dell", siDell], ["Asus", siAsus], ["Acer", siAcer],
  ["MSI", siMsi], ["Samsung", siSamsung], ["Huawei", siHuawei], ["Microsoft", null], ["LG", siLg], ["Toshiba", siToshiba]]

function BrandMark({ icon }: { icon: SimpleIcon | null }) {
  return icon ? <svg viewBox="0 0 24 24" width={16} height={16} fill="currentColor" aria-hidden><path d={icon.path} /></svg>
    : <Laptop aria-hidden size={16} strokeWidth={1.75} />
}

function ModelCombobox({ brand, value, onChange, placeholder, noMatch }: {
  brand: string; value: string; onChange: (value: string) => void; placeholder: string; noMatch: string
}) {
  const id = useId()
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(-1)
  const query = value.trim().toLowerCase().split(/\s+/).filter(Boolean)
  const options = (laptopModels[brand] ?? []).filter(model => model !== value && query.every(word => model.toLowerCase().includes(word))).slice(0, 8)
  const show = open && Boolean(laptopModels[brand]) && (options.length > 0 || query.length > 0)
  const pick = (model: string) => { onChange(model); setOpen(false); setActive(-1) }
  return <div className="entry-model">
    <input id={id} value={value} maxLength={60} autoComplete="off" placeholder={placeholder} role="combobox" aria-expanded={show} aria-controls={`${id}-list`}
      aria-autocomplete="list" aria-activedescendant={show && active >= 0 ? `${id}-option-${active}` : undefined}
      onChange={event => { onChange(event.target.value); setOpen(true); setActive(-1) }}
      onFocus={() => setOpen(true)} onBlur={() => setOpen(false)}
      onKeyDown={event => {
        if (event.key === "ArrowDown" || event.key === "ArrowUp") {
          event.preventDefault(); setOpen(true)
          if (options.length) setActive(current => (current + (event.key === "ArrowDown" ? 1 : -1) + options.length) % options.length)
        } else if (event.key === "Enter" && show && active >= 0) { event.preventDefault(); pick(options[active]) }
        else if (event.key === "Escape") setOpen(false)
      }} />
    {show ? <ul id={`${id}-list`} role="listbox" className="entry-brand-menu entry-model-menu">
      {options.length ? options.map((model, index) => <li key={model} id={`${id}-option-${index}`} role="option" aria-selected={index === active}
        className="entry-brand-option" data-highlighted={index === active ? "" : undefined}
        onMouseDown={event => { event.preventDefault(); pick(model) }} onMouseEnter={() => setActive(index)}>{model}</li>)
        : <li className="entry-model-empty">{noMatch}</li>}
    </ul> : null}
  </div>
}

function BrandSelect({ value, onChange, placeholder, other, invalid, field }: {
  value: string; onChange: (value: string) => void; placeholder: string; other: string; invalid: boolean; field?: string
}) {
  const options = [...laptopBrands, ...(value && value !== other && !laptopBrands.some(([brand]) => brand === value) ? [[value, null] as [string, null]] : []), [other, null] as [string, null]]
  return <SelectPrimitive.Root value={value} onValueChange={brand => brand && onChange(brand)}>
    <SelectPrimitive.Trigger className="entry-brand-trigger" aria-invalid={invalid} data-field={field}>
      <SelectPrimitive.Value placeholder={placeholder} />
      <SelectPrimitive.Icon asChild><ChevronDown aria-hidden size={16} /></SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content className="entry-brand-menu" position="popper" sideOffset={6}>
        <SelectPrimitive.Viewport>
          {options.map(([brand, icon]) => <SelectPrimitive.Item key={brand} value={brand} className="entry-brand-option">
            <SelectPrimitive.ItemText><span className="entry-brand-label"><BrandMark icon={icon} />{brand}</span></SelectPrimitive.ItemText>
            <SelectPrimitive.ItemIndicator className="entry-brand-check"><Check aria-hidden size={16} /></SelectPrimitive.ItemIndicator>
          </SelectPrimitive.Item>)}
        </SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  </SelectPrimitive.Root>
}
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
  useEffect(() => {
    if (!existing && /Mac/.test(navigator.userAgent) && !/iPhone|iPad/.test(navigator.userAgent))
      setItems(current => current.length === 1 && !current[0].brand ? [{ ...current[0], brand: "Apple" }] : current)
  }, [existing])
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
          <span className="entry-label-row">
            <span className="entry-label" id="equipment-label">{t.equipment}</span>
            <span className="entry-info">
              <button type="button" className="entry-info-trigger" aria-label={t.equipmentInfoLabel} aria-describedby="equipment-info"><Info aria-hidden size={16} /></button>
              <span role="tooltip" id="equipment-info" className="entry-info-bubble">{t.equipmentInfo}</span>
            </span>
          </span>
          <p id="equipment-hint" className="entry-hint">{t.equipmentHint}</p>
          {noEquipment ? null : <ul className="entry-items" aria-labelledby="equipment-label" aria-describedby="equipment-hint">
            {items.map((item, index) => {
              const invalid = fields.includes("equipmentText") && !item.brand.trim()
              return <li key={item.id} className="entry-item">
                <div className="entry-item-field"><span>{t.brand}</span>
                  <BrandSelect value={item.brand} onChange={brand => updateItem(item.id, { brand })} placeholder={t.brandPlaceholder} other={t.brandOther}
                    invalid={invalid} field={index === 0 ? "equipmentText" : undefined} />
                </div>
                <label className="entry-item-field"><span>{t.model}</span>
                  <ModelCombobox brand={item.brand} value={item.model} onChange={model => updateItem(item.id, { model })} placeholder={t.modelPlaceholder} noMatch={t.modelNoMatch} />
                </label>
                <button type="button" className="entry-item-remove" aria-label={`${t.removeItem} ${index + 1}`} disabled={items.length === 1}
                  onClick={() => setItems(current => current.filter(entry => entry.id !== item.id))}><X aria-hidden size={18} /></button>
                {item.brand && item.brand !== t.brandOther ? <p className="entry-item-help">{item.brand === "Apple" ? t.modelHelpMac : t.modelHelpWindows}</p> : null}
              </li>
            })}
          </ul>}
          {noEquipment || items.length >= 10 ? null : <button type="button" className="entry-add-item" onClick={() => setItems(current => [...current, newItem()])}>
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
