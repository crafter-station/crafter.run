import {
  countryCodeFromName,
  countryNameFromCode,
  foldText,
  searchProfileCities,
  type ProfileLocationInput,
} from "@crafter/contracts"

export type Place = ProfileLocationInput

export function placeFromCity(city: { city: string; region: string | null; countryCode: string }): Place {
  return {
    city: city.city,
    region: city.region,
    country: countryNameFromCode(city.countryCode),
    countryCode: city.countryCode,
  }
}

export function placeFromCountry(countryCode: string): Place {
  return { city: null, region: null, country: countryNameFromCode(countryCode), countryCode }
}

/** Reads free text such as "Lima, Peru" into a place, matching known cities when it can. */
export function parsePlaceText(text: string | null | undefined): Place | null {
  const parts = (text ?? "").split(",").map((part) => part.trim()).filter(Boolean)
  const city = parts[0]
  if (!city) return null
  const countryCode = parts.length > 1 ? countryCodeFromName(parts[parts.length - 1]) : countryCodeFromName(city)
  if (parts.length === 1 && countryCode) return placeFromCountry(countryCode)
  const known = searchProfileCities(city, 12).find(
    (candidate) => foldText(candidate.city) === foldText(city) && (!countryCode || candidate.countryCode === countryCode),
  )
  if (known) return placeFromCity(known)
  return {
    city: city.slice(0, 80),
    region: null,
    country: countryCode ? countryNameFromCode(countryCode) : null,
    countryCode: countryCode ?? null,
  }
}

export function placeLabel(place: Place | null | undefined): string {
  if (!place) return ""
  return [place.city, place.country].filter(Boolean).join(", ")
}

export function emptyToNullPlace(place: Place | null | undefined): Place | null {
  if (!place) return null
  return place.city || place.region || place.country || place.countryCode ? place : null
}
