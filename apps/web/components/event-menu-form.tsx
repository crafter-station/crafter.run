"use client"

import { useEffect, useMemo, useState } from "react"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { submitEventOrder } from "@/app/[lang]/events/hot-reload/[edition]/menu/actions"
import type { LocalizedEventMenu, MenuItem } from "@/lib/event-menu"
import { eventMoney, hotReloadCopy, hotReloadText } from "@/lib/hot-reload-copy"
import type { Locale } from "@/lib/i18n"
import type { OrderError } from "@/lib/event-order-service"
import { cn } from "@/lib/utils"

const errorKeys: Record<OrderError, keyof typeof hotReloadCopy.en> = { closed: "errorClosed", unavailable: "errorUnavailable", auth: "errorAuth", approval: "errorApproval", name: "errorName", items: "errorItems", budget: "errorBudget" }

function groupByCategory(items: MenuItem[]) {
  const groups = new Map<string, MenuItem[]>()
  for (const item of items) groups.set(item.category, [...(groups.get(item.category) ?? []), item])
  return [...groups]
}

function MenuSection({
  locale,
  currency,
  maxTotal,
  step,
  title,
  name,
  items,
  selectedId,
  otherPrice,
  onSelect,
}: {
  locale: Locale
  currency: string
  maxTotal: number
  step: number
  title: string
  name: string
  items: MenuItem[]
  selectedId: string | null
  otherPrice: number
  onSelect: (id: string | null) => void
}) {
  const t = hotReloadCopy[locale]
  const money = (value: number) => eventMoney(value, locale, currency)
  const groups = useMemo(() => groupByCategory(items), [items])
  const [category, setCategory] = useState(groups[0]?.[0] ?? "")
  const visible = groups.find(([key]) => key === category)?.[1] ?? []

  return (
    <fieldset className="min-w-0">
      <legend className="flex w-full items-baseline justify-between gap-4">
        <span className="text-lg font-semibold tracking-tight">
          <span className="mr-2 font-mono text-xs text-muted-foreground">0{step}</span>
          {title}
        </span>
        {selectedId ? (
          <button
            type="button"
            onClick={() => onSelect(null)}
            className="text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            {t.clear}
          </button>
        ) : null}
      </legend>
      <div className="mt-3 flex flex-wrap gap-1" role="tablist" aria-label={hotReloadText(t.categories, { name: title })}>
        {groups.map(([key, list]) => (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={key === category}
            onClick={() => setCategory(key)}
            className={cn(
              "h-8 border px-3 text-xs font-medium transition-colors",
              key === category
                ? "border-foreground bg-foreground text-background"
                : "border-line text-muted-foreground hover:text-foreground",
            )}
          >
            {key} <span className="ml-1 opacity-60">{list.length}</span>
          </button>
        ))}
      </div>
      <ul className="mt-3 divide-y divide-line border border-line">
        {visible.map((item) => {
          const over = otherPrice + item.price - maxTotal
          const checked = item.id === selectedId
          const disabled = over > 0 && !checked
          return (
            <li key={item.id}>
              <label
                className={cn(
                  "flex cursor-pointer items-center gap-3 px-3 py-3 transition-colors has-[:focus-visible]:bg-muted sm:px-4",
                  checked && "bg-muted",
                  disabled && "cursor-not-allowed opacity-40",
                )}
              >
                <input
                  type="radio"
                  name={name}
                  value={item.id}
                  checked={checked}
                  disabled={disabled}
                  onChange={() => onSelect(item.id)}
                  className="sr-only"
                />
                <span
                  aria-hidden
                  className={cn(
                    "flex size-4 shrink-0 items-center justify-center rounded-full border",
                    checked ? "border-foreground" : "border-muted-foreground/50",
                  )}
                >
                  {checked ? <span className="size-2 rounded-full bg-foreground" /> : null}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-medium">{item.name}</span>
                  <span className="block text-xs leading-5 text-muted-foreground">
                    {disabled ? hotReloadText(t.overBy, { amount: money(over) }) : item.description}
                  </span>
                </span>
                <span className="shrink-0 font-mono text-sm tabular-nums">{money(item.price)}</span>
              </label>
            </li>
          )
        })}
      </ul>
    </fieldset>
  )
}

export type ExistingOrder = { name: string; drinkId: string; foodId: string; total: number }

export function EventMenuForm({
  locale, edition, menu, closesAt, readOnly = false,
  email,
  defaultName,
  existing,
}: {
  locale: Locale
  edition: string
  menu: LocalizedEventMenu
  closesAt: number | null
  readOnly?: boolean
  email: string
  defaultName: string
  existing: ExistingOrder | null
}) {
  const t = hotReloadCopy[locale]
  const money = (value: number) => eventMoney(value, locale, menu.currency)
  const { drinks, foods, maxTotal } = menu
  const [closed, setClosed] = useState(readOnly || closesAt === null)
  const [saved, setSaved] = useState<ExistingOrder | null>(existing)
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>
    const check = () => {
      const remaining = (closesAt ?? 0) - Date.now()
      if (readOnly || remaining <= 0) setClosed(true)
      else timer = setTimeout(check, Math.min(remaining, 60_000))
    }
    check()
    return () => clearTimeout(timer)
  }, [closesAt, readOnly])
  const [drinkId, setDrinkId] = useState<string | null>(existing?.drinkId ?? null)
  const [foodId, setFoodId] = useState<string | null>(existing?.foodId ?? null)
  const [name, setName] = useState(existing?.name ?? defaultName)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [confirmation, setConfirmation] = useState(false)

  const drink = drinks.find((item) => item.id === drinkId)
  const food = foods.find((item) => item.id === foodId)
  const total = (drink?.price ?? 0) + (food?.price ?? 0)
  const over = total - maxTotal
  const ready = Boolean(!closed && drink && food && over <= 0 && name.trim().length >= 2 && name.trim().length <= 80)

  async function submit(event: React.FormEvent) {
    event.preventDefault()
    if (!ready || pending) return
    setPending(true)
    setError(null)
    try {
      const result = await submitEventOrder(edition, { name, drinkId, foodId })
      if (!result.ok) {
        if (result.error === "closed") setClosed(true)
        setError(hotReloadText(t[errorKeys[result.error]], { amount: money(maxTotal) }))
        return
      }
      setSaved({ name: name.trim(), drinkId: result.drinkId, foodId: result.foodId, total: result.total })
      setConfirmation(true)
    } catch {
      setError(t.errorUnavailable)
    } finally {
      setPending(false)
    }
  }

  if (confirmation || closed) {
    const savedDrink = drinks.find(item => item.id === saved?.drinkId)
    const savedFood = foods.find(item => item.id === saved?.foodId)
    return (
      <div className="max-w-xl border border-line p-6" role="status">
        <p className="station-label text-muted-foreground">{closed ? t.ordersClosed : t.saved}</p>
        {saved ? <>
          <p className="mt-3 text-xl font-semibold tracking-tight">{savedDrink?.name ?? saved.drinkId} + {savedFood?.name ?? saved.foodId}</p>
          <p className="mt-1 font-mono text-muted-foreground">{money(saved.total)}</p>
        </> : <p className="mt-3">{t.noOrder}</p>}
        <p className="mt-4 text-muted-foreground">{closed ? t.closedBody : t.savedBody}</p>
        {!closed ? <Button type="button" variant="outline" className="mt-6" onClick={() => setConfirmation(false)}>{t.change}</Button> : null}
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="pb-8">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-8">
        <MenuSection
          locale={locale} currency={menu.currency} maxTotal={maxTotal}
          step={1}
          title={t.drink}
          name="drink"
          items={drinks}
          selectedId={drinkId}
          otherPrice={food?.price ?? 0}
          onSelect={setDrinkId}
        />
        <MenuSection
          locale={locale} currency={menu.currency} maxTotal={maxTotal}
          step={2}
          title={t.food}
          name="food"
          items={foods}
          selectedId={foodId}
          otherPrice={drink?.price ?? 0}
          onSelect={setFoodId}
        />
      </div>

      <fieldset className="mt-10 max-w-xl">
        <legend className="text-lg font-semibold tracking-tight">
          <span className="mr-2 font-mono text-xs text-muted-foreground">03</span>
          {t.details}
        </legend>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <div className="grid gap-1.5">
            <Label htmlFor="order-name">{t.name}</Label>
            <Input id="order-name" autoComplete="name" minLength={2} maxLength={80} required value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="order-email">{t.email}</Label>
            <Input id="order-email" type="email" value={email} readOnly disabled />
          </div>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          {saved ? t.existing : t.confirmedEmail}
        </p>
      </fieldset>

      <div className="sticky bottom-0 z-30 mt-10 border-t border-line bg-background/80 backdrop-blur-md">
        <div className="grid gap-3 py-4 sm:flex sm:items-center sm:gap-8">
          <div className="min-w-0 flex-1" aria-live="polite">
            <div className="flex items-baseline justify-between gap-3">
              <span className="station-label text-muted-foreground">{t.total}</span>
              <span className="font-display tabular-nums">
                <span className={cn("text-3xl", over > 0 && "text-destructive")}>{money(total)}</span>
                <span className="ml-1.5 font-sans text-sm text-muted-foreground">{hotReloadText(t.outOf, { amount: money(maxTotal) })}</span>
              </span>
            </div>
            <div className="mt-2 h-0.5 w-full bg-line" aria-hidden>
              <div
                className={cn("h-full transition-[width] duration-300", over > 0 ? "bg-destructive" : "bg-[#f8e9a4]")}
                style={{ width: `${Math.min(100, (total / maxTotal) * 100)}%` }}
              />
            </div>
            <div className="mt-2 flex justify-between gap-3 text-sm text-muted-foreground">
              <span className="truncate">
                {drink ? `${drink.name} ${money(drink.price)}` : t.noDrink} · {food ? `${food.name} ${money(food.price)}` : t.noFood}
              </span>
              <span className={cn("shrink-0", over > 0 && "text-destructive")}>
                {hotReloadText(over > 0 ? t.overBy : t.remaining, { amount: money(over > 0 ? over : maxTotal - total) })}
              </span>
            </div>
            {error ? (
              <p className="mt-1 text-sm text-destructive" role="alert">
                {error}
              </p>
            ) : null}
          </div>
          <button type="submit" disabled={!ready || pending} className="station-button w-full disabled:pointer-events-none disabled:opacity-40 sm:w-auto sm:min-w-44">
            {pending ? <Loader2 className="size-4 animate-spin" /> : null}
            {t.submit}
          </button>
        </div>
      </div>
    </form>
  )
}
