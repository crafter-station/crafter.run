/** Browser build of `renderDesignFace` from makeables `packages/renderer` (origin/main e2dbf8d). */
export function renderDesignFace(
  data: {
    document: unknown
    imageUrls?: Record<string, string>
    name: string
    role: string
    organization?: string
    number: number
    eventName: string
    portraitUrl: string
    publicUrl?: string
  },
  side: "front" | "back",
  signal?: AbortSignal,
): Promise<HTMLCanvasElement>

export function designImageUrls(design: unknown, artworkUrl?: string): Record<string, string>
