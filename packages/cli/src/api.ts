import { apiErrorResponseSchema } from "@crafter/contracts"
import { accessToken } from "./auth"
import { config } from "./config"

export async function api<T>(path: string, init: RequestInit = {}): Promise<T> {
  let token = await accessToken()
  let response = await request(path, init, token)
  if (response.status === 401 && !process.env.CRAFTER_ACCESS_TOKEN) {
    token = await accessToken(true)
    response = await request(path, init, token)
  }
  const body: unknown = await response.json().catch(() => null)
  if (!response.ok) {
    const parsed = apiErrorResponseSchema.safeParse(body)
    throw new Error(parsed.success ? parsed.data.error.message : `Crafter API returned ${response.status}`)
  }
  return body as T
}

function request(path: string, init: RequestInit, token: string): Promise<Response> {
  const headers = new Headers(init.headers)
  headers.set("authorization", `Bearer ${token}`)
  headers.set("accept", "application/json")
  if (init.body) headers.set("content-type", "application/json")
  return fetch(new URL(path, config.apiUrl), { ...init, headers })
}
