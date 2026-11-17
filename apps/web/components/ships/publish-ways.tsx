"use client"

import { Tabs, TabsList, TabsPanel, TabsTab } from "@ui-sdk/react/tabs"
import { ArrowRight, Bot, Link2, Tag } from "lucide-react"
import Link from "next/link"

import { AgentPromptBlock, shipAgentPrompt } from "@/components/copy-agent-prompt"

export type WaysLabels = {
  label: string
  link: { tab: string; title: string; body: string; action: string }
  agent: { tab: string; title: string; body: string; copy: string; copied: string }
  topic: { tab: string; title: string; body: string; action: string }
}

/** The three ways to publish, as ui-sdk Tabs: one panel at a time, arrow keys between tabs. */
export function PublishWays({ locale, labels }: { locale: string; labels: WaysLabels }) {
  return (
    <Tabs defaultValue="link" className="ships-ways">
      <TabsList aria-label={labels.label} className="ships-ways-list">
        <TabsTab value="link"><Link2 aria-hidden="true" />{labels.link.tab}</TabsTab>
        <TabsTab value="agent"><Bot aria-hidden="true" />{labels.agent.tab}</TabsTab>
        <TabsTab value="topic"><Tag aria-hidden="true" />{labels.topic.tab}</TabsTab>
      </TabsList>
      <TabsPanel value="link" className="ships-ways-panel">
        <h3>{labels.link.title}</h3>
        <p>{labels.link.body}</p>
        <code className="ships-ways-code">https://github.com/you/your-project</code>
        <Link href={`/${locale}/ships/new`} className="ships-button">{labels.link.action}<ArrowRight aria-hidden="true" /></Link>
      </TabsPanel>
      <TabsPanel value="agent" className="ships-ways-panel">
        <h3>{labels.agent.title}</h3>
        <p>{labels.agent.body}</p>
        <AgentPromptBlock
          prompt={shipAgentPrompt}
          copyLabel={labels.agent.copy}
          copiedLabel={labels.agent.copied}
          preClassName="ships-ways-code ships-ways-prompt"
          buttonClassName="ships-button ships-button-quiet"
        />
      </TabsPanel>
      <TabsPanel value="topic" className="ships-ways-panel">
        <h3>{labels.topic.title}</h3>
        <p>{labels.topic.body}</p>
        <code className="ships-ways-code">topic: crafter-ship</code>
        <a href="https://github.com/topics/crafter-ship" target="_blank" rel="noopener noreferrer" className="ships-button">{labels.topic.action}<ArrowRight aria-hidden="true" /></a>
      </TabsPanel>
    </Tabs>
  )
}
