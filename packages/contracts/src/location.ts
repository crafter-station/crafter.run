import { z } from "zod"

import { ISO_COUNTRIES, PROFILE_CITIES, type IsoCountryCode, type ProfileCity } from "./location-data"

export { ISO_COUNTRIES, PROFILE_CITIES, type IsoCountryCode, type ProfileCity }

const ISO_COUNTRY_CODES = new Set<string>(ISO_COUNTRIES.map(([code]) => code))
const COUNTRY_NAME_BY_CODE = new Map<string, string>(ISO_COUNTRIES.map(([code, name]) => [code, name]))
const COUNTRY_CODE_BY_FOLDED_NAME = new Map<string, IsoCountryCode>()

for (const [code, name] of ISO_COUNTRIES) {
  const folded = foldText(name)
  const existing = COUNTRY_CODE_BY_FOLDED_NAME.get(folded)
  if (existing && existing !== code) COUNTRY_CODE_BY_FOLDED_NAME.delete(folded)
  else COUNTRY_CODE_BY_FOLDED_NAME.set(folded, code)
}

export function foldText(value: string) {
  return value
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .trim()
}

export function isIsoCountryCode(value: string | null | undefined): value is IsoCountryCode {
  return Boolean(value && ISO_COUNTRY_CODES.has(value.toUpperCase()))
}

export function countryNameFromCode(countryCode: string | null | undefined) {
  if (!countryCode) return null
  return COUNTRY_NAME_BY_CODE.get(countryCode.toUpperCase()) ?? null
}

export function countryCodeFromName(country: string | null | undefined) {
  if (!country) return null
  return COUNTRY_CODE_BY_FOLDED_NAME.get(foldText(country)) ?? null
}

export function countryCodeToFlagEmoji(countryCode: string | null | undefined) {
  if (!isIsoCountryCode(countryCode)) return null
  const code = countryCode.toUpperCase()
  return String.fromCodePoint(...[...code].map((char) => 0x1f1e6 + char.charCodeAt(0) - 65))
}

export function formatLocationLabel(location: Pick<ProfileLocationInput, "city" | "region" | "country" | "countryCode"> | null | undefined) {
  if (!location) return null
  const city = location.city?.trim() || null
  const region = location.region?.trim() || null
  const country = location.country?.trim() || countryNameFromCode(location.countryCode)
  if (city && country) return `${city}, ${country}`
  if (city) return city
  if (region && country) return `${region}, ${country}`
  if (country) return country
  if (region) return region
  return null
}

export type ProfileLocationLine = {
  flag: string | null
  text: string
}

export function profileLocationLines(
  origin: Pick<ProfileLocationInput, "city" | "region" | "country" | "countryCode"> | null | undefined,
  based: Pick<ProfileLocationInput, "city" | "region" | "country" | "countryCode"> | null | undefined,
  labels: { from: string; based: string },
): ProfileLocationLine[] {
  const lines: ProfileLocationLine[] = []
  const originLabel = formatLocationLabel(origin)
  if (originLabel) {
    lines.push({
      flag: countryCodeToFlagEmoji(origin?.countryCode),
      text: `${labels.from} ${originLabel}`,
    })
  }
  const basedLabel = formatLocationLabel(based)
  if (basedLabel) {
    lines.push({
      flag: countryCodeToFlagEmoji(based?.countryCode),
      text: `${labels.based} ${basedLabel}`,
    })
  }
  return lines
}

export function formatProfileLocationLine(
  origin: Pick<ProfileLocationInput, "city" | "region" | "country" | "countryCode"> | null | undefined,
  based: Pick<ProfileLocationInput, "city" | "region" | "country" | "countryCode"> | null | undefined,
  labels: { from: string; based: string } = { from: "From", based: "Based in" },
) {
  const lines = profileLocationLines(origin, based, labels)
  if (lines.length === 0) return null
  return lines
    .map((line) => (line.flag ? `${line.flag} ${line.text}` : line.text))
    .join(" · ")
}

export function searchProfileCities(query: string, limit = 8): ProfileCity[] {
  const normalized = foldText(query)
  if (!normalized) return []

  return PROFILE_CITIES
    .map((city) => {
      const cityName = foldText(city.city)
      const country = foldText(countryNameFromCode(city.countryCode) ?? "")
      const region = foldText(city.region ?? "")
      const haystack = `${cityName} ${region} ${country}`
      const score = cityName === normalized
        ? 4
        : cityName.startsWith(normalized)
          ? 3
          : haystack.startsWith(normalized)
            ? 2
            : haystack.includes(normalized)
              ? 1
              : 0
      return score > 0 ? { city, score } : null
    })
    .filter((entry): entry is { city: ProfileCity; score: number } => entry !== null)
    .sort((left, right) => right.score - left.score || left.city.city.localeCompare(right.city.city) || left.city.countryCode.localeCompare(right.city.countryCode))
    .slice(0, limit)
    .map((entry) => entry.city)
}

export function formatCitySuggestion(city: ProfileCity) {
  const country = countryNameFromCode(city.countryCode) ?? city.countryCode
  return city.region ? `${city.city}, ${city.region}, ${country}` : `${city.city}, ${country}`
}

const emptyToNull = (value: unknown) => (typeof value === "string" && value.trim() === "" ? null : value)

const optionalLocationText = (max: number) =>
  z.preprocess(
    emptyToNull,
    z.string().trim().min(1).max(max).nullable().optional(),
  )

const optionalCountryCode = z.preprocess(
  emptyToNull,
  z
    .string()
    .trim()
    .toUpperCase()
    .regex(/^[A-Z]{2}$/, "Use a two-letter country code")
    .nullable()
    .optional(),
)

const upsertLocationFieldsSchema = z.object({
  city: optionalLocationText(80),
  region: optionalLocationText(120),
  country: optionalLocationText(80),
  countryCode: optionalCountryCode,
})

function normalizeUpsertLocation(input: {
  city?: string | null
  region?: string | null
  country?: string | null
  countryCode?: string | null
}): ProfileLocationInput | null {
  const city = input.city ?? null
  const region = input.region ?? null
  let countryCode = input.countryCode ?? null
  let country = input.country ?? null

  if (countryCode && isIsoCountryCode(countryCode) && !country) {
    country = countryNameFromCode(countryCode)
  } else if (!countryCode && country) {
    countryCode = countryCodeFromName(country)
  }

  if (!city && !region && !country && !countryCode) return null

  return {
    city,
    region,
    country,
    countryCode: countryCode && isIsoCountryCode(countryCode) ? countryCode : null,
  }
}

export const upsertProfileLocationSchema = upsertLocationFieldsSchema
  .superRefine((location, context) => {
    if (location.countryCode && !isIsoCountryCode(location.countryCode)) {
      context.addIssue({
        code: "custom",
        path: ["countryCode"],
        message: "Use a valid ISO 3166-1 alpha-2 country code",
      })
    }
  })
  .transform((location) => normalizeUpsertLocation(location))
  .nullable()

export const profileLocationSchema = z.object({
  city: z.string().max(80).nullable(),
  region: z.string().max(120).nullable(),
  country: z.string().max(80).nullable(),
  countryCode: z.string().regex(/^[A-Z]{2}$/).nullable(),
  latitude: z.number().min(-90).max(90).nullable(),
  longitude: z.number().min(-180).max(180).nullable(),
  placeId: z.string().max(200).nullable(),
  provider: z.string().max(40).nullable(),
  confidence: z.number().min(0).max(1).nullable(),
})

export type ProfileLocation = z.infer<typeof profileLocationSchema>
export type ProfileLocationInput = {
  city: string | null
  region: string | null
  country: string | null
  countryCode: string | null
}

export function emptyProfileLocation(): ProfileLocation {
  return {
    city: null,
    region: null,
    country: null,
    countryCode: null,
    latitude: null,
    longitude: null,
    placeId: null,
    provider: null,
    confidence: null,
  }
}

export function toProfileLocation(
  input: ProfileLocationInput & Partial<Pick<ProfileLocation, "latitude" | "longitude" | "placeId" | "provider" | "confidence">>,
): ProfileLocation | null {
  if (
    !input.city
    && !input.region
    && !input.country
    && !input.countryCode
    && input.latitude == null
    && input.longitude == null
    && !input.placeId
    && !input.provider
    && input.confidence == null
  ) {
    return null
  }

  return {
    city: input.city,
    region: input.region,
    country: input.country,
    countryCode: input.countryCode && isIsoCountryCode(input.countryCode) ? input.countryCode : null,
    latitude: input.latitude ?? null,
    longitude: input.longitude ?? null,
    placeId: input.placeId ?? null,
    provider: input.provider ?? null,
    confidence: input.confidence ?? null,
  }
}
