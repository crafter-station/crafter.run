/**
 * Markdown for Core meeting notes, compiled on the server.
 *
 * Notes are written in Obsidian, so this understands its callouts (`> [!todo] Title`) and turns a
 * simple mermaid flowchart into a stack of tiers. Sources compile as plain Markdown (`format: "md"`):
 * meeting text is data, and MDX would let it run JSX.
 */
import type { ComponentPropsWithoutRef } from "react"
import { compileMDX } from "next-mdx-remote/rsc"
import remarkGfm from "remark-gfm"

export type MeetingSection = { id: string; num: string | null; title: string }

type Node = {
  type: string
  value?: string
  lang?: string
  depth?: number
  children?: Node[]
  data?: Record<string, unknown>
}

const textOf = (node: Node): string => node.value ?? (node.children ?? []).map(textOf).join("")

const hast = (tagName: string, className: string, children: unknown[]) => ({
  type: "element",
  tagName,
  properties: { className: [className] },
  children,
})
const hastText = (value: string) => ({ type: "text", value })

/** `a["Title<br/>line<br/>line"] --- b[...]` becomes one tier per node, in order. */
function tiersFromMermaid(source: string) {
  const labels = [...source.matchAll(/\w+\["([^"]+)"\]/g)].map((match) => match[1].split(/<br\s*\/?>/i))
  if (!labels.length) return null
  return labels.map(([title, ...lines], index) =>
    hast("div", "cm-tier", [
      hast("span", "cm-tier-index", [hastText(String(index + 1).padStart(2, "0"))]),
      hast("div", "cm-tier-copy", [
        hast("strong", "cm-tier-title", [hastText(title)]),
        ...lines.map((line) => hast("span", "cm-tier-line", [hastText(line)])),
      ]),
    ]),
  )
}

function remarkMeeting(sections: MeetingSection[]) {
  return () => (tree: Node) => {
    const walk = (node: Node) => {
      const children = node.children ?? []
      for (const child of children) {
        if (child.type === "heading" && child.depth === 2) {
          const raw = textOf(child)
          const match = raw.match(/^(\d+)\.\s+(.*)$/)
          const section = { id: `seccion-${sections.length + 1}`, num: match?.[1] ?? null, title: match?.[2] ?? raw }
          sections.push(section)
          child.children = [{ type: "text", value: section.title }]
          child.data = { hProperties: { id: section.id, "data-num": section.num?.padStart(2, "0") } }
          continue
        }

        if (child.type === "code" && child.lang === "mermaid") {
          const tiers = tiersFromMermaid(child.value ?? "")
          if (tiers) {
            child.type = "paragraph"
            child.data = { hName: "div", hProperties: { className: ["cm-tiers"] }, hChildren: tiers }
            child.children = []
          }
          continue
        }

        if (child.type === "blockquote") {
          const first = child.children?.[0]
          const lead = first?.type === "paragraph" ? first.children?.[0] : undefined
          const match = lead?.type === "text" ? lead.value?.match(/^\[!(\w+)\][ \t]*([^\n]*)\n?/) : null
          if (first && lead && match) {
            lead.value = lead.value!.slice(match[0].length)
            if (!lead.value && first.children!.length === 1) child.children!.shift()
            else if (!lead.value) first.children!.shift()
            const kind = match[1].toLowerCase()
            child.children!.unshift({
              type: "paragraph",
              data: { hProperties: { className: ["cm-callout-title"] } },
              children: [{ type: "text", value: match[2] || kind }],
            })
            child.data = { hName: "aside", hProperties: { className: ["cm-callout"], "data-callout": kind } }
          } else {
            child.data = { hProperties: { className: ["cm-quote"] } }
          }
        }
        walk(child)
      }
    }
    walk(tree)
  }
}

const components = {
  table: (props: ComponentPropsWithoutRef<"table">) => (
    <div className="cm-table">
      <table {...props} />
    </div>
  ),
  a: ({ href = "", ...props }: ComponentPropsWithoutRef<"a">) => (
    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" {...props} />
  ),
}

export async function compileMeeting(source: string) {
  const sections: MeetingSection[] = []
  const { content } = await compileMDX({
    source,
    components,
    options: {
      blockJS: true,
      blockDangerousJS: true,
      mdxOptions: { format: "md", remarkPlugins: [remarkGfm, remarkMeeting(sections)] },
    },
  })
  return { content, sections }
}

/** `**bold**` only: summaries are one paragraph of plain text. */
export function InlineStrong({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*\*[^*]+\*\*)/g).map((part, index) =>
        part.startsWith("**") && part.endsWith("**") ? <strong key={index}>{part.slice(2, -2)}</strong> : part,
      )}
    </>
  )
}
