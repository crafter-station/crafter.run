"use client"

import { useMemo, useState } from "react"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { submitEventOrder } from "@/app/[lang]/events/hot-reload/[edition]/menu/actions"
import { drinks, eventMenu, foods, type MenuItem } from "@/lib/event-menu"
import { cn } from "@/lib/utils"

type Confirmation = { drink: string; food: string; total: number }

function groupByCategory(items: MenuItem[]) {
  const groups = new Map<string, MenuItem[]>()
  for (const item of items) groups.set(item.category, [...(groups.get(item.category) ?? []), item])
  return [...groups]
}

function MenuSection({
  step,
  title,
  name,
  items,
  selectedId,
  otherPrice,
  onSelect,
}: {
  step: number
  title: string
  name: string
  items: MenuItem[]
  selectedId: string | null
  otherPrice: number
  onSelect: (id: string | null) => void
}) {
  const groups = useMemo(() => groupByCategory(items), [items])
  const [category, setCategory] = useState(groups[0][0])
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
            Quitar selección
          </button>
        ) : null}
      </legend>
      <div className="mt-3 flex flex-wrap gap-1" role="tablist" aria-label={`Categorías de ${title.toLowerCase()}`}>
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
          const over = otherPrice + item.price - eventMenu.maxTotal
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
                    {disabled ? `Te pasas del tope por S/${over}` : item.description}
                  </span>
                </span>
                <span className="shrink-0 font-mono text-sm tabular-nums">S/{item.price}</span>
              </label>
            </li>
          )
        })}
      </ul>
    </fieldset>
  )
}

export type ExistingOrder = { name: string; drinkId: string; foodId: string }

export function EventMenuForm({
  email,
  defaultName,
  existing,
}: {
  email: string
  defaultName: string
  existing: ExistingOrder | null
}) {
  const [drinkId, setDrinkId] = useState<string | null>(existing?.drinkId ?? null)
  const [foodId, setFoodId] = useState<string | null>(existing?.foodId ?? null)
  const [name, setName] = useState(existing?.name ?? defaultName)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [confirmation, setConfirmation] = useState<Confirmation | null>(null)

  const drink = drinks.find((item) => item.id === drinkId)
  const food = foods.find((item) => item.id === foodId)
  const total = (drink?.price ?? 0) + (food?.price ?? 0)
  const over = total - eventMenu.maxTotal
  const ready = Boolean(drink && food && over <= 0 && name.trim().length >= 2)

  async function submit(event: React.FormEvent) {
    event.preventDefault()
    if (!ready || pending) return
    setPending(true)
    setError(null)
    try {
      const result = await submitEventOrder({ name, drinkId, foodId })
      if (!result.ok) throw new Error(result.error)
      setConfirmation(result)
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "No pudimos guardar tu pedido. Intenta otra vez.")
    } finally {
      setPending(false)
    }
  }

  if (confirmation) {
    return (
      <div className="max-w-xl border border-line p-6" role="status">
        <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-accent">Pedido guardado</p>
        <p className="mt-3 text-xl font-semibold tracking-tight">
          {confirmation.drink} + {confirmation.food}
        </p>
        <p className="mt-1 font-mono text-sm text-muted-foreground">S/{confirmation.total}</p>
        <p className="mt-4 text-sm text-muted-foreground">Te lo tenemos listo en el Hot Reload. Nos vemos ahí.</p>
        <Button type="button" variant="outline" className="mt-6" onClick={() => setConfirmation(null)}>
          Cambiar pedido
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="pb-8">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-8">
        <MenuSection
          step={1}
          title="Bebida"
          name="drink"
          items={drinks}
          selectedId={drinkId}
          otherPrice={food?.price ?? 0}
          onSelect={setDrinkId}
        />
        <MenuSection
          step={2}
          title="Comida"
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
          Tus datos
        </legend>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <div className="grid gap-1.5">
            <Label htmlFor="order-name">Nombre</Label>
            <Input id="order-name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="order-email">Correo de Luma</Label>
            <Input id="order-email" type="email" value={email} readOnly disabled />
          </div>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          {existing ? "Ya tienes un pedido. Si lo cambias, se reemplaza." : "Tu cupo está confirmado en Luma con este correo."}
        </p>
      </fieldset>

      <div className="sticky bottom-0 z-30 mt-10 border-t border-line bg-background/80 backdrop-blur-md">
        <div className="grid gap-3 py-4 sm:flex sm:items-center sm:gap-8">
          <div className="min-w-0 flex-1" aria-live="polite">
            <div className="flex items-baseline justify-between gap-3">
              <span className="station-label text-muted-foreground">Total</span>
              <span className="font-display tabular-nums">
                <span className={cn("text-3xl", over > 0 && "text-destructive")}>S/{total}</span>
                <span className="ml-1.5 font-sans text-sm text-muted-foreground">de S/{eventMenu.maxTotal}</span>
              </span>
            </div>
            <div className="mt-2 h-0.5 w-full bg-line" aria-hidden>
              <div
                className={cn("h-full transition-[width] duration-300", over > 0 ? "bg-destructive" : "bg-[#f8e9a4]")}
                style={{ width: `${Math.min(100, (total / eventMenu.maxTotal) * 100)}%` }}
              />
            </div>
            <div className="mt-2 flex justify-between gap-3 text-sm text-muted-foreground">
              <span className="truncate">
                {drink ? `${drink.name} S/${drink.price}` : "Sin bebida"} · {food ? `${food.name} S/${food.price}` : "Sin comida"}
              </span>
              <span className={cn("shrink-0", over > 0 && "text-destructive")}>
                {over > 0 ? `Te pasas por S/${over}` : `Te quedan S/${eventMenu.maxTotal - total}`}
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
            Enviar pedido
          </button>
        </div>
      </div>
    </form>
  )
}
