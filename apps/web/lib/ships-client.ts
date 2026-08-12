import type { ApiErrorResponse } from "@crafter/contracts"

export const publicApiUrl =
  process.env.NEXT_PUBLIC_API_URL ??
  (process.env.NODE_ENV === "production" ? "https://api.crafter.run" : "http://localhost:3001")

export async function shipsApi<T>(
  path: string,
  token: string,
  init: RequestInit = {},
): Promise<T> {
  const isFormData = init.body instanceof FormData
  const response = await fetch(new URL(path, publicApiUrl), {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
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

export async function uploadShipImage(file: File, token: string): Promise<string> {
  const body = new FormData()
  body.set("image", file)
  const response = await shipsApi<{ url: string }>("/v1/uploads/images", token, { method: "POST", body })
  return response.url
}
