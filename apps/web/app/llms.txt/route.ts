import { getIndexPosts } from "@/lib/blog"
import { blogPostPath, blogSitemapMdPath } from "@/lib/blog-paths"
import { source } from "@/lib/source"
import { baseUrl } from "@/lib/seo"

export const revalidate = false

export function GET() {
  const posts = getIndexPosts("en")

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
    "",
    "## Blog",
    "",
    `Engineering notes and community stories. Every post is readable as markdown at its URL plus \`.md\`; the full index is at ${baseUrl}${blogSitemapMdPath("en")}.`,
    "",
    ...posts.map(
      (post) =>
        `- [${post.title}](${baseUrl}${blogPostPath(post.locale, post.slug)}.md): ${post.summary}`,
    ),
  ]

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  })
}
