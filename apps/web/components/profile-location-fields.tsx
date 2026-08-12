"use client"

import {
  ISO_COUNTRIES,
  countryNameFromCode,
  formatCitySuggestion,
  searchProfileCities,
  type ProfileLocation,
} from "@crafter/contracts"
import { useMemo, useState } from "react"

import { cn } from "@/lib/utils"

export function ProfileLocationFields({
  kind,
  title,
  description,
  cityLabel,
  countryLabel,
  regionLabel,
  cityPlaceholder,
  fallbackHint,
  defaultValue,
}: {
  kind: "origin" | "based"
  title: string
  description: string
  cityLabel: string
  countryLabel: string
  regionLabel: string
  cityPlaceholder: string
  fallbackHint: string
  defaultValue: ProfileLocation | null | undefined
}) {
  const [city, setCity] = useState(defaultValue?.city ?? "")
  const [region, setRegion] = useState(defaultValue?.region ?? "")
  const [country, setCountry] = useState(defaultValue?.country ?? "")
  const [countryCode, setCountryCode] = useState(defaultValue?.countryCode ?? "")
  const [open, setOpen] = useState(false)

  const suggestions = useMemo(() => searchProfileCities(city, 8), [city])

  function selectSuggestion(suggestion: (typeof suggestions)[number]) {
    const nextCountry = countryNameFromCode(suggestion.countryCode) ?? ""
    setCity(suggestion.city)
    setRegion(suggestion.region ?? "")
    setCountry(nextCountry)
    setCountryCode(suggestion.countryCode)
    setOpen(false)
  }

  function updateCountry(nextCode: string) {
    setCountryCode(nextCode)
    setCountry(nextCode ? countryNameFromCode(nextCode) ?? "" : "")
  }

  return (
    <fieldset className="grid min-w-0 gap-4">
      <legend className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{title}</legend>
      <p className="-mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
      <input type="hidden" name={`${kind}City`} value={city} />
      <input type="hidden" name={`${kind}Region`} value={region} />
      <input type="hidden" name={`${kind}Country`} value={country} />
      <input type="hidden" name={`${kind}CountryCode`} value={countryCode} />
      <div className="grid min-w-0 gap-6 sm:grid-cols-2">
        <label className="relative grid min-w-0 gap-2 text-sm">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{cityLabel}</span>
          <input
            value={city}
            autoComplete="off"
            maxLength={80}
            placeholder={cityPlaceholder}
            onFocus={() => setOpen(true)}
            onBlur={() => window.setTimeout(() => setOpen(false), 120)}
            onChange={(event) => {
              setCity(event.target.value)
              setOpen(true)
            }}
            className="w-full min-w-0 border border-line bg-background px-4 py-3 outline-none focus:border-accent"
          />
          {open && suggestions.length > 0 ? (
            <ul className="absolute top-full z-20 mt-1 max-h-64 w-full overflow-auto border border-line bg-background">
              {suggestions.map((suggestion) => (
                <li key={`${suggestion.city}-${suggestion.countryCode}-${suggestion.region ?? ""}`}>
                  <button
                    type="button"
                    className="w-full px-4 py-3 text-left text-sm hover:bg-accent-surface/10"
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => selectSuggestion(suggestion)}
                  >
                    {formatCitySuggestion(suggestion)}
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </label>
        <label className="grid min-w-0 gap-2 text-sm">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{countryLabel}</span>
          <select
            value={countryCode}
            onChange={(event) => updateCountry(event.target.value)}
            className={cn(
              "w-full min-w-0 border border-line bg-background px-4 py-3 outline-none focus:border-accent",
              countryCode ? "text-foreground" : "text-muted-foreground",
            )}
          >
            <option value="">Select a country</option>
            {ISO_COUNTRIES.map(([code, name]) => (
              <option key={code} value={code}>
                {name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <label className="grid min-w-0 gap-2 text-sm">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{regionLabel}</span>
        <input
          value={region}
          maxLength={120}
          placeholder="Optional"
          onChange={(event) => setRegion(event.target.value)}
          className="w-full min-w-0 border border-line bg-background px-4 py-3 outline-none focus:border-accent"
        />
      </label>
      <p className="text-xs text-muted-foreground">{fallbackHint}</p>
    </fieldset>
  )
}
