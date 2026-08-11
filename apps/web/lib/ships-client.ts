import type { ApiErrorResponse } from "@crafter/contracts"

export const publicApiUrl =
  process.env.NEXT_PUBLIC_API_URL ??
  (process.env.NODE_ENV === "production" ? "https://api.crafter.run" : "http://localhost:3001")

export async function shipsApi<T>(
  path: string,
  token: string,
  init: RequestInit = {},
): Promise<T> {
  const response = await fetch(new URL(path, publicApiUrl), {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...init.headers,
    },
  })
  const body = await response.json().catch(() => null)
  if (!response.ok) {
    const error = body as ApiErrorResponse | null
    throw new Error(error?.error.message ?? `Ships API returned ${response.status}.`)
  }
  return body as T
}
