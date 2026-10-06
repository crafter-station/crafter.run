"use client"

import { type ReactNode, useId, useRef, useState } from "react"

export type MemberTab = { id: string; label: string; content: ReactNode }

export function MemberTabs({ tabs }: { tabs: MemberTab[] }) {
  const [active, setActive] = useState(tabs[0]?.id)
  const id = useId()
  const buttons = useRef<(HTMLButtonElement | null)[]>([])

  if (!tabs.length) return null
  const activeTab = tabs.find((tab) => tab.id === active) ?? tabs[0]

  return (
    <div className="station-member-tabs">
      <div role="tablist" className="flex flex-wrap gap-2">
        {tabs.map((tab, index) => {
          const isActive = tab.id === activeTab.id
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              id={`${id}-${tab.id}`}
              aria-controls={`${id}-panel`}
              aria-selected={isActive}
              tabIndex={isActive ? 0 : -1}
              ref={(node) => { buttons.current[index] = node }}
              onClick={() => setActive(tab.id)}
              onKeyDown={(event) => {
                const next = event.key === "ArrowRight" ? (index + 1) % tabs.length
                  : event.key === "ArrowLeft" ? (index - 1 + tabs.length) % tabs.length
                    : event.key === "Home" ? 0 : event.key === "End" ? tabs.length - 1 : null
                if (next === null) return
                event.preventDefault()
                setActive(tabs[next].id)
                buttons.current[next]?.focus()
              }}
              className={`border px-3 py-1.5 font-label text-base transition-colors ${
                isActive
                  ? "border-foreground bg-foreground text-background"
                  : "border-line text-muted-foreground hover:border-foreground/40 hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          )
        })}
      </div>
      <div role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-${activeTab.id}`} tabIndex={0} className="mt-8" style={{ overflowAnchor: "none" }}>
        {activeTab.content}
      </div>
    </div>
  )
}
