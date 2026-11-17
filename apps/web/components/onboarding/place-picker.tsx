"use client"

import { countryCodeToFlagEmoji, foldText, searchProfileCities } from "@crafter/contracts"
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@ui-sdk/react/combobox"
import { MapPin, Search, X } from "lucide-react"
import { useMemo, useState } from "react"

import { localizedCountryName, orderedCountries } from "@/lib/countries"
import type { OnboardingCopy } from "@/lib/onboarding-copy"
import { fill } from "@/lib/onboarding-copy"
import { placeFromCity, placeFromCountry, placeLabel, type Place } from "@/lib/place"

const POPULAR: [string, string][] = [
  ["Lima", "PE"], ["Buenos Aires", "AR"], ["Mexico City", "MX"], ["Bogotá", "CO"], ["Santiago", "CL"], ["Madrid", "ES"],
]

type Option = { value: string; label: string; flag: string; detail?: string; place: Place | null; custom?: string }

function cityOption(city: { city: string; region: string | null; countryCode: string }, locale: string): Option {
  const place = placeFromCity(city)
  return {
    value: `city:${city.city}|${city.countryCode}`,
    label: city.city,
    flag: countryCodeToFlagEmoji(city.countryCode) ?? "",
    detail: localizedCountryName(city.countryCode, locale),
    place,
  }
}

function useOptions(query: string, locale: string, copy: OnboardingCopy["where"]) {
  return useMemo(() => {
    const q = query.trim()
    if (!q) {
      const popular = POPULAR.flatMap(([name, code]) => {
        const hit = searchProfileCities(name, 6).find((city) => city.city === name && city.countryCode === code)
        return hit ? [cityOption(hit, locale)] : []
      })
      return { groups: [{ label: copy.popular, options: popular }] }
    }
    const folded = foldText(q)
    const cities = searchProfileCities(q, 6).map((city) => cityOption(city, locale))
    const countries = orderedCountries(locale)
      .filter((country) => foldText(country.name).includes(folded) || foldText(localizedCountryName(country.code, "en")).includes(folded))
      .slice(0, 4)
      .map<Option>((country) => ({
        value: `country:${country.code}`,
        label: country.name,
        flag: countryCodeToFlagEmoji(country.code) ?? "",
        place: placeFromCountry(country.code),
      }))
    const exact = cities.some((city) => foldText(city.label) === folded)
    const custom: Option[] = exact ? [] : [{ value: `custom:${q}`, label: fill(copy.useTyped, { q }), flag: "", place: null, custom: q }]
    return {
      groups: [
        { label: copy.cities, options: cities },
        { label: copy.countries, options: countries },
        { label: "", options: custom },
      ].filter((group) => group.options.length > 0),
    }
  }, [query, locale, copy])
}

export function PlacePicker({
  value,
  onChange,
  locale,
  copy,
  label,
  autoFocus,
}: {
  value: Place | null
  onChange: (place: Place | null) => void
  locale: string
  copy: OnboardingCopy["where"]
  label: string
  autoFocus?: boolean
}) {
  const [query, setQuery] = useState("")
  const [typedCity, setTypedCity] = useState<string | null>(null)
  const { groups } = useOptions(query, locale, copy)
  const all = groups.flatMap((group) => group.options)

  function choose(valueKey: string | null) {
    const option = all.find((item) => item.value === valueKey)
    if (!option) return
    setQuery("")
    if (option.custom) {
      setTypedCity(option.custom)
      return
    }
    setTypedCity(null)
    onChange(option.place)
  }

  if (typedCity !== null) {
    return (
      <div className="ob-place">
        <div className="ob-place-chip">
          <span aria-hidden="true">{"\u{1F4CD}"}</span>
          <span>{typedCity}</span>
          <button type="button" aria-label={copy.clear} onClick={() => setTypedCity(null)}>
            <X aria-hidden="true" />
          </button>
        </div>
        <CountryPicker
          locale={locale}
          copy={copy}
          label={copy.pickCountry}
          autoFocus
          onPick={(code) => {
            onChange({ city: typedCity, region: null, country: placeFromCountry(code).country, countryCode: code })
            setTypedCity(null)
          }}
        />
      </div>
    )
  }

  if (value && (value.city || value.country)) {
    return (
      <div className="ob-place-chip">
        <span aria-hidden="true">{countryCodeToFlagEmoji(value.countryCode) ?? "\u{1F4CD}"}</span>
        <span>{placeLabel({ ...value, country: value.countryCode ? localizedCountryName(value.countryCode, locale) : value.country })}</span>
        <button type="button" aria-label={`${copy.clear}: ${label}`} onClick={() => onChange(null)}>
          <X aria-hidden="true" />
        </button>
      </div>
    )
  }

  return (
    <Combobox
      filter={false}
      autoHighlight
      value={null}
      onValueChange={(next) => choose(next as string | null)}
      query={query}
      onQueryChange={(next, details) => {
        if (details.reason === "input-change" || next === "") setQuery(next)
      }}
    >
      <div className="ob-place">
        <div className="ob-place-input">
          <Search aria-hidden="true" />
          <ComboboxInput aria-label={label} placeholder={copy.search} autoFocus={autoFocus} autoComplete="off" />
        </div>
      </div>
      <ComboboxContent className="ob-place-list">
        <ComboboxEmpty>{copy.noMatch}</ComboboxEmpty>
        <ComboboxList>
          {groups.map((group) => (
            <div key={group.label || "custom"} role="group" aria-label={group.label || undefined}>
              {group.label ? <div className="ob-place-group">{group.label}</div> : null}
              {group.options.map((option) => (
                <ComboboxItem key={option.value} value={option.value} label={option.label} className="ob-place-item">
                  <span className="ob-place-flag" aria-hidden="true">{option.flag || <MapPin size={17} />}</span>
                  {option.label}
                  {option.detail ? <small>{option.detail}</small> : null}
                </ComboboxItem>
              ))}
            </div>
          ))}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}

function CountryPicker({
  locale,
  copy,
  label,
  autoFocus,
  onPick,
}: {
  locale: string
  copy: OnboardingCopy["where"]
  label: string
  autoFocus?: boolean
  onPick: (code: string) => void
}) {
  const [query, setQuery] = useState("")
  const countries = useMemo(() => {
    const folded = foldText(query)
    const list = orderedCountries(locale)
    return (folded ? list.filter((country) => foldText(country.name).includes(folded)) : list).slice(0, 40)
  }, [locale, query])
  return (
    <Combobox
      filter={false}
      autoHighlight
      value={null}
      onValueChange={(next) => next && onPick(String(next).replace("country:", ""))}
      query={query}
      onQueryChange={(next, details) => {
        if (details.reason === "input-change" || next === "") setQuery(next)
      }}
    >
      <div className="ob-place-input">
        <MapPin aria-hidden="true" />
        <ComboboxInput aria-label={label} placeholder={label} autoFocus={autoFocus} autoComplete="off" />
      </div>
      <ComboboxContent className="ob-place-list">
        <ComboboxEmpty>{copy.noMatch}</ComboboxEmpty>
        <ComboboxList>
          {countries.map((country) => (
            <ComboboxItem key={country.code} value={`country:${country.code}`} label={country.name} className="ob-place-item">
              <span className="ob-place-flag" aria-hidden="true">{countryCodeToFlagEmoji(country.code)}</span>
              {country.name}
            </ComboboxItem>
          ))}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}
