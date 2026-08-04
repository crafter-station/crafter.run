import { source } from "@/lib/source"
import { baseUrl } from "@/lib/seo"

export const revalidate = false

export function GET() {
  const lines = [
    "# Crafter Station Docs",
    "",
    "> Documentation for Crafter Station open source developer tools: CLIs and libraries installable from npm, designed for humans and AI coding agents.",
    "",
    "## Docs",
    "",
    ...source
      .getPages()
      .map(
        (page) =>
          `- [${page.data.title}](${baseUrl}${page.url}): ${page.data.description ?? ""}`,
      ),
  ]

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  })
}
