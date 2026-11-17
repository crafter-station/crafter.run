import type { ApiErrorResponse } from "@crafter/contracts"

export const publicApiUrl =
  process.env.NEXT_PUBLIC_API_URL ??
  (process.env.NODE_ENV === "production" ? "https://api.crafter.run" : "http://localhost:3001")

/** A failed Ships API call. `message` is the API's text; `status` and `code` let callers branch on it. */
export class ShipsApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly code: string | null,
  ) {
    super(message)
    this.name = "ShipsApiError"
  }
}

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
    throw new ShipsApiError(error?.error?.message ?? `Ships API returned ${response.status}.`, response.status, error?.error?.code ?? null)
  }
  return body as T
}

/** Vercel rejects request bodies over 4.5 MB before the API runs, without CORS headers. */
export const MAX_UPLOAD_BYTES = 4 * 1024 * 1024
const MAX_SIDE = 2000

function canvasBlob(canvas: HTMLCanvasElement, quality: number) {
  return new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/webp", quality))
}

/** Shrinks a picked image so it always fits the upload limit: at most 2000 px on its long side, as WebP.
 * Small images, and GIFs that already fit, go up untouched so animation is kept. */
export async function prepareShipImage(file: File): Promise<File> {
  const small = file.size <= 1.5 * 1024 * 1024
  if ((small && file.type !== "image/gif") || (file.type === "image/gif" && file.size <= MAX_UPLOAD_BYTES)) return file
  try {
    const bitmap = await createImageBitmap(file)
    const scale = Math.min(1, MAX_SIDE / Math.max(bitmap.width, bitmap.height))
    const canvas = document.createElement("canvas")
    canvas.width = Math.round(bitmap.width * scale)
    canvas.height = Math.round(bitmap.height * scale)
    canvas.getContext("2d")?.drawImage(bitmap, 0, 0, canvas.width, canvas.height)
    bitmap.close()
    for (const quality of [0.86, 0.74, 0.6]) {
      const blob = await canvasBlob(canvas, quality)
      if (blob && blob.size <= MAX_UPLOAD_BYTES) {
        return new File([blob], file.name.replace(/\.[^.]+$/, "") + ".webp", { type: "image/webp" })
      }
    }
  } catch {
    // The browser could not decode it; send the original and let the API answer.
  }
  return file
}

export async function uploadShipImage(file: File, token: string): Promise<string> {
  const image = await prepareShipImage(file)
  if (image.size > MAX_UPLOAD_BYTES) throw new Error("This image is too large. Use one under 4 MB.")
  const body = new FormData()
  body.set("image", image)
  const response = await shipsApi<{ url: string }>("/v1/uploads/images", token, { method: "POST", body })
  return response.url
}
