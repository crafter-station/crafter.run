"use client"

import { useRouter } from "next/navigation"
import { cloneElement, type ReactElement, useId, useMemo, useState, useTransition } from "react"

import { type InventoryResult, saveAsset, verifyAsset } from "@/app/[lang]/core/inventory/actions"
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet"
import type { TeamAsset } from "@/lib/core-inventory"
import { inventoryCopy } from "@/lib/core-inventory-copy"
import { type AssetKind, assetKinds, assetStatuses, assetVisibilities, slugify } from "@/lib/core-inventory-input"
import type { Locale } from "@/lib/i18n"

export type InventoryMember = { username: string; name: string; short: string }

const glyph = { alive: "●", unknown: "?", dead: "✕" } as const

const blank: TeamAsset = {
  slug: "",
  kind: "tool",
  name: "",
  url: null,
  status: "unknown",
  visibility: "core",
  owner: null,
  access: [],
  perk: null,
  notes: null,
  secretRef: null,
  verifiedAt: null,
  verifiedBy: null,
  updatedAt: "",
}

export function InventoryTable({ assets, members, locale }: { assets: TeamAsset[]; members: InventoryMember[]; locale: Locale }) {
  const t = inventoryCopy[locale]
  const [kind, setKind] = useState<AssetKind | "all">("all")
  const [editing, setEditing] = useState<TeamAsset | null>(null)
  const [isNew, setIsNew] = useState(false)
  const shown = useMemo(() => (kind === "all" ? assets : assets.filter((asset) => asset.kind === kind)), [assets, kind])
  const nameOf = (username: string | null) => members.find((member) => member.username === username)?.name ?? username
  const date = (iso: string) => new Intl.DateTimeFormat(locale, { day: "numeric", month: "short", year: "numeric", timeZone: "America/Lima" }).format(new Date(iso))

  return (
    <>
      <div className="ci-toolbar">
        <div className="ci-filters" role="tablist">
          {(["all", ...assetKinds] as const).map((value) => (
            <button key={value} type="button" role="tab" aria-selected={kind === value} className="ci-filter" onClick={() => setKind(value)}>
              {value === "all" ? t.all : t.kindFilters[value]}
            </button>
          ))}
        </div>
        <button
          type="button"
          className="station-button station-button-yellow"
          onClick={() => {
            setIsNew(true)
            setEditing({ ...blank, kind: kind === "all" ? "tool" : kind })
          }}
        >
          + {t.add}
        </button>
      </div>

      {shown.length === 0 ? (
        <p className="cm-empty">{t.empty}</p>
      ) : (
        <div className="ci-scroll">
          <table className="ci-table">
            <thead>
              <tr>
                <th scope="col">{t.columns.name}</th>
                <th scope="col">{t.columns.kind}</th>
                <th scope="col">{t.columns.owner}</th>
                <th scope="col">{t.columns.verified}</th>
                <th scope="col">{t.columns.visibility}</th>
              </tr>
            </thead>
            <tbody>
              {shown.map((asset) => (
                <tr key={asset.slug} data-status={asset.status}>
                  <td>
                    <button
                      type="button"
                      className="ci-name"
                      onClick={() => {
                        setIsNew(false)
                        setEditing(asset)
                      }}
                    >
                      <span className="ci-glyph" role="img" title={t.statuses[asset.status]} aria-label={t.statuses[asset.status]}>
                        {glyph[asset.status]}
                      </span>
                      {asset.name}
                      {asset.secretRef ? <span className="ci-ref">{t.secretSaved}</span> : null}
                    </button>
                  </td>
                  <td className="ci-mono">{t.kinds[asset.kind]}</td>
                  <td>{asset.owner ? nameOf(asset.owner) : <span className="ci-muted">{t.noOwner}</span>}</td>
                  <td className="ci-mono">{asset.verifiedAt ? date(asset.verifiedAt) : <span className="ci-debt">{t.never}</span>}</td>
                  <td className="ci-mono">{t.visibilities[asset.visibility]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Sheet open={editing !== null} onOpenChange={(open) => !open && setEditing(null)}>
        <SheetContent className="ci-sheet w-full overflow-y-auto sm:max-w-lg">
          {editing ? (
            <AssetForm
              key={`${isNew}-${editing.slug}`}
              asset={editing}
              isNew={isNew}
              members={members}
              locale={locale}
              verifiedLine={editing.verifiedAt ? t.verifiedBy(nameOf(editing.verifiedBy) ?? "", date(editing.verifiedAt)) : `${t.columns.verified}: ${t.never}`}
              onDone={() => setEditing(null)}
            />
          ) : null}
        </SheetContent>
      </Sheet>
    </>
  )
}

function AssetForm({ asset, isNew, members, locale, verifiedLine, onDone }: { asset: TeamAsset; isNew: boolean; members: InventoryMember[]; locale: Locale; verifiedLine: string; onDone: () => void }) {
  const t = inventoryCopy[locale]
  const router = useRouter()
  const [draft, setDraft] = useState(asset)
  const [slugTouched, setSlugTouched] = useState(!isNew)
  const [result, setResult] = useState<InventoryResult | null>(null)
  const [pending, startTransition] = useTransition()
  const set = <K extends keyof TeamAsset>(key: K, value: TeamAsset[K]) => setDraft((current) => ({ ...current, [key]: value }))
  const fieldError = (field: string) => {
    const code = result && !result.ok ? result.fields?.[field] : undefined
    return code ? (t.fieldErrors[code] ?? t.errors.invalid) : undefined
  }

  const finish = (next: InventoryResult) => {
    setResult(next)
    if (next.ok) {
      router.refresh()
      onDone()
    }
  }

  return (
    <form
      className="ci-form"
      onSubmit={(event) => {
        event.preventDefault()
        const { verifiedAt, verifiedBy, updatedAt, ...input } = draft
        startTransition(async () => finish(await saveAsset(input, isNew ? undefined : asset.slug)))
      }}
    >
      <SheetTitle className="ci-form-title">{isNew ? t.newTitle : asset.name}</SheetTitle>
      <SheetDescription className="ci-muted">{isNew ? t.description : verifiedLine}</SheetDescription>

      <Field label={t.fields.name} error={fieldError("name")}>
        <input
          required
          value={draft.name}
          onChange={(event) => {
            set("name", event.target.value)
            if (!slugTouched) set("slug", slugify(event.target.value))
          }}
        />
      </Field>
      <Field label={t.fields.slug} error={fieldError("slug") ?? (result && !result.ok && result.error === "taken" ? t.errors.taken : undefined)}>
        <input
          required
          className="ci-mono"
          value={draft.slug}
          onChange={(event) => {
            setSlugTouched(true)
            set("slug", event.target.value)
          }}
        />
      </Field>
      <Field label={t.fields.url} error={fieldError("url")}>
        <input type="url" value={draft.url ?? ""} onChange={(event) => set("url", event.target.value)} />
      </Field>

      <Choice label={t.fields.kind} value={draft.kind} options={assetKinds} labels={t.kinds} onChange={(value) => set("kind", value)} />
      <Choice label={t.fields.status} value={draft.status} options={assetStatuses} labels={t.statuses} onChange={(value) => set("status", value)} />
      <Choice label={t.fields.visibility} value={draft.visibility} options={assetVisibilities} labels={t.visibilities} onChange={(value) => set("visibility", value)} />

      <Field label={t.fields.owner} error={fieldError("owner")}>
        <select value={draft.owner ?? ""} onChange={(event) => set("owner", event.target.value || null)}>
          <option value="">{t.noOwner}</option>
          {members.map((member) => (
            <option key={member.username} value={member.username}>
              {member.name}
            </option>
          ))}
        </select>
      </Field>

      <fieldset className="ci-field">
        <legend className="station-label">{t.fields.access}</legend>
        <div className="ci-chips">
          {members.map((member) => {
            const on = draft.access.includes(member.username)
            return (
              <label key={member.username} className="ci-chip" data-on={on || undefined}>
                <input
                  type="checkbox"
                  checked={on}
                  onChange={() => set("access", on ? draft.access.filter((name) => name !== member.username) : [...draft.access, member.username])}
                />
                {member.short}
              </label>
            )
          })}
        </div>
      </fieldset>

      <Field label={t.fields.secretRef} hint={t.fields.secretRefHint} error={fieldError("secretRef")}>
        <input className="ci-mono" autoComplete="off" value={draft.secretRef ?? ""} onChange={(event) => set("secretRef", event.target.value)} />
      </Field>
      <Field label={t.fields.perk} hint={t.fields.perkHint} error={fieldError("perk")}>
        <input value={draft.perk ?? ""} onChange={(event) => set("perk", event.target.value)} />
      </Field>
      <Field label={t.fields.notes} error={fieldError("notes")}>
        <textarea rows={3} value={draft.notes ?? ""} onChange={(event) => set("notes", event.target.value)} />
      </Field>

      {result && !result.ok && result.error !== "taken" ? <p className="ci-error" role="alert">{t.errors[result.error]}</p> : null}

      <div className="ci-actions">
        <button type="submit" className="station-button station-button-yellow" disabled={pending}>
          {pending ? t.saving : t.save}
        </button>
        {isNew ? null : (
          <button
            type="button"
            className="ci-verify"
            title={t.verifyHint}
            disabled={pending}
            onClick={() => startTransition(async () => finish(await verifyAsset(asset.slug)))}
          >
            ✓ {t.verify}
          </button>
        )}
      </div>
    </form>
  )
}

function Field({ label, hint, error, children }: { label: string; hint?: string; error?: string; children: ReactElement<{ id?: string }> }) {
  const id = useId()
  return (
    <div className="ci-field" data-invalid={error ? true : undefined}>
      <label className="station-label" htmlFor={id}>
        {label}
      </label>
      {cloneElement(children, { id })}
      {error ? <span className="ci-error">{error}</span> : hint ? <span className="ci-hint">{hint}</span> : null}
    </div>
  )
}

function Choice<T extends string>({ label, value, options, labels, onChange }: { label: string; value: T; options: readonly T[]; labels: Record<T, string>; onChange: (value: T) => void }) {
  return (
    <fieldset className="ci-field">
      <legend className="station-label">{label}</legend>
      <div className="ci-segment">
        {options.map((option) => (
          <label key={option} data-on={value === option || undefined}>
            <input type="radio" name={label} checked={value === option} onChange={() => onChange(option)} />
            {labels[option]}
          </label>
        ))}
      </div>
    </fieldset>
  )
}
