"use client"

import { useRef, useState } from "react"

const base = `## Stack
- Bun, never npm
- Biome for lint and format
- Next.js, React 19, Server Components first

## Rules
- Conventional commits
- No \`any\` without a reason
- Run \`bun test\` before you say done
`
const tools = [
  { id: "claude", name: "Claude Code", file: "CLAUDE.md", seed: `# CLAUDE.md\n\n${base}` },
  { id: "codex", name: "Codex", file: "AGENTS.md", seed: `# AGENTS.md\n\n${base}` },
  { id: "cursor", name: "Cursor", file: ".cursor/rules/main.mdc", seed: `---\nalwaysApply: true\n---\n\n${base}` },
] as const

/** An agent file with one live buffer per tool; the counters recompute on every keystroke. */
export function AgentfilesDemo({ copy }: { copy: { chars: string; lines: string; words: string; tokens: string; editing: string; tools: string } }) {
  const [active, setActive] = useState(0)
  const [buffers, setBuffers] = useState<string[]>(() => tools.map(tool => tool.seed))
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const text = buffers[active]
  const lines = text === "" ? 0 : text.split("\n").length
  const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length

  function focusTab(to: number) {
    const next = (to + tools.length) % tools.length
    setActive(next)
    tabs.current[next]?.focus()
  }

  return (
    <div className="wb-agentfiles">
      <div className="wb-tabs" role="tablist" aria-label={copy.tools}
        onKeyDown={event => {
          if (event.key === "ArrowRight") { event.preventDefault(); focusTab(active + 1) }
          if (event.key === "ArrowLeft") { event.preventDefault(); focusTab(active - 1) }
        }}>
        {tools.map((tool, i) => (
          <button key={tool.id} type="button" role="tab" id={`wb-af-tab-${tool.id}`} aria-selected={i === active} aria-controls="wb-af-panel"
            tabIndex={i === active ? 0 : -1} ref={node => { tabs.current[i] = node }} onClick={() => setActive(i)}>
            {tool.name}
          </button>
        ))}
      </div>
      <div className="wb-editor" role="tabpanel" id="wb-af-panel" aria-labelledby={`wb-af-tab-${tools[active].id}`}>
        <p className="wb-editor-file">{tools[active].file}</p>
        <div className="wb-editor-body">
          <ol aria-hidden="true">{Array.from({ length: Math.max(lines, 1) }, (_, i) => <li key={i}>{i + 1}</li>)}</ol>
          <textarea value={text} spellCheck={false} rows={Math.max(lines, 1)} aria-label={copy.editing}
            onChange={event => setBuffers(current => current.map((value, i) => (i === active ? event.target.value : value)))} />
        </div>
      </div>
      <p className="wb-stats" aria-live="off">
        <span><b>{text.length}</b> {copy.chars}</span>
        <span><b>{lines}</b> {copy.lines}</span>
        <span><b>{words}</b> {copy.words}</span>
        <span>{copy.tokens} <b>{Math.ceil(text.length / 4)}</b></span>
      </p>
    </div>
  )
}
