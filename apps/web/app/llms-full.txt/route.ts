import { getTranslations } from "next-intl/server"

import { getIndexEntries } from "@/lib/changelog"
import { entryMarkdown, type Tr } from "@/lib/changelog-markdown"
import { source } from "@/lib/source"
import { baseUrl } from "@/lib/seo"

export const revalidate = false

export async function GET() {
  const pages = source.getPages()
  const sections = await Promise.all(
    pages.map(async (page) => {
      const text = await page.data.getText("processed")
      return `# ${page.data.title}\nURL: ${baseUrl}${page.url}\n\n${text}`
    }),
  )

  // The changelog in English, newest first, so a model reading one file can
  // answer "what has Crafter Station shipped" without a second request.
  const tr = (await getTranslations({ locale: "en", namespace: "pages.changelog" })) as unknown as Tr
  const changes = getIndexEntries("en").map((entry) => entryMarkdown(entry, "en", tr))

  return new Response([...sections, ...changes].join("\n\n---\n\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  })
}
