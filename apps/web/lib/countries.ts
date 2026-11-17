import { ISO_COUNTRIES } from "@crafter/contracts"

/** Latin America and Spain come first; everything else follows alphabetically. */
export const PRIORITY_COUNTRY_CODES = [
  "PE", "AR", "MX", "CO", "CL", "ES", "UY", "EC", "BO", "VE", "PY", "CR", "PA", "GT", "DO", "SV", "HN", "NI", "CU", "PR", "BR",
] as const

const PRIORITY = new Set<string>(PRIORITY_COUNTRY_CODES)

export type CountryOption = { code: string; name: string; priority: boolean }

/** The country's name in the visitor's language, falling back to the English name. */
export function localizedCountryName(code: string, locale: string): string {
  const english = ISO_COUNTRIES.find(([value]) => value === code)?.[1] ?? code
  try {
    return new Intl.DisplayNames([locale], { type: "region" }).of(code) ?? english
  } catch {
    return english
  }
}

export function orderedCountries(locale: string): CountryOption[] {
  const all = ISO_COUNTRIES.map(([code]) => ({ code, name: localizedCountryName(code, locale), priority: PRIORITY.has(code) }))
  const priority = PRIORITY_COUNTRY_CODES.flatMap((code) => all.filter((country) => country.code === code))
  const rest = all.filter((country) => !country.priority).sort((a, b) => a.name.localeCompare(b.name, locale))
  return [...priority, ...rest]
}
