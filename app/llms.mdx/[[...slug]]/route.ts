import { notFound } from "next/navigation"

import { source } from "@/lib/source"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug?: string[] }> },
) {
  const { slug } = await params
  const lang = new URL(request.url).searchParams.get("lang") ?? undefined
  const normalized = slug?.[0] === "index" ? slug.slice(1) : slug
  const page = source.getPage(normalized, lang)
  if (!page) notFound()

  const text = await page.data.getText("processed")

  return new Response(text, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  })
}
