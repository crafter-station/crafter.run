"use client"

import { type ReactNode, useState } from "react"

export type MemberTab = { id: string; label: string; content: ReactNode }

export function MemberTabs({ tabs }: { tabs: MemberTab[] }) {
  const [active, setActive] = useState(tabs[0]?.id)

  if (!tabs.length) return null
  const activeTab = tabs.find((tab) => tab.id === active) ?? tabs[0]

  return (
    <div>
      <div role="tablist" className="flex flex-wrap gap-2">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab.id
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(tab.id)}
              className={`border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors ${
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
      <div role="tabpanel" className="mt-8" style={{ overflowAnchor: "none" }}>
        {activeTab.content}
      </div>
    </div>
  )
}
