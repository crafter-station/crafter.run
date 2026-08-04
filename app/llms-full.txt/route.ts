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

  return new Response(sections.join("\n\n---\n\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  })
}
