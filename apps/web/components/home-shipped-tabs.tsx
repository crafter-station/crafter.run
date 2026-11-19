"use client"

import { type ReactNode, useState } from "react"

import { HomeHead } from "@/components/home-head"

/** One "Shipped" section: the header's action slot holds the Community / Station tabs. */
export function HomeShippedTabs({ index, label, title, lede, tabs }: {
  index: number; label: string; title: string; lede: string
  tabs: { id: string; label: string; panel: ReactNode }[]
}) {
  const [active, setActive] = useState(tabs[0]?.id)
  return (
    <section className="home-shipped home-shipped-bento" aria-labelledby="home-shipped-title">
      <HomeHead id="home-shipped-title" index={index} label={label} title={title} lede={lede}>
        <div className="home-tabs" role="tablist" aria-label={label}>
          {tabs.map((tab) => (
            <button key={tab.id} type="button" role="tab" id={`shipped-tab-${tab.id}`} aria-controls={`shipped-panel-${tab.id}`}
              aria-selected={active === tab.id} onClick={() => setActive(tab.id)}>{tab.label}</button>
          ))}
        </div>
      </HomeHead>
      {tabs.map((tab) => (
        <div key={tab.id} role="tabpanel" id={`shipped-panel-${tab.id}`} aria-labelledby={`shipped-tab-${tab.id}`} hidden={active !== tab.id}>
          {tab.panel}
        </div>
      ))}
    </section>
  )
}
