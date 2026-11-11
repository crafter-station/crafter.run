import { notFound } from "next/navigation"

import { CoreLocked } from "@/components/core/core-parts"
import { InventoryTable } from "@/components/core/inventory-table"
import { Container } from "@/components/grid-container"
import { getCoreViewer } from "@/lib/core"
import { coreCopy } from "@/lib/core-copy"
import { listTeamAssets } from "@/lib/core-inventory"
import { inventoryCopy } from "@/lib/core-inventory-copy"
import { isLocale } from "@/lib/i18n"
import { teamMembers } from "@/lib/team"

import "@/app/station-core.css"

export const metadata = { robots: { index: false, follow: false } }

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const viewer = await getCoreViewer()
  if (viewer.state === "signed-out") return <CoreLocked locale={lang} path={`/${lang}/core/inventory`} />
  if (viewer.state === "outsider") notFound()

  const t = inventoryCopy[lang]
  const assets = await listTeamAssets()
  const active = teamMembers.filter((member) => !member.alumni)
  const first = (name: string) => name.split(" ")[0]
  const members = active.map(({ username, name }) => {
    const shared = active.filter((other) => first(other.name) === first(name)).length > 1
    return { username, name, short: shared ? `${first(name)} ${name.split(" ")[1]?.[0] ?? ""}.` : first(name) }
  })
  const unverified = assets?.filter((asset) => !asset.verifiedAt).length ?? 0

  return (
    <main className="cm-page flex-1">
      <Container innerClassName="cm-index-hero">
        <p className="station-label cm-eyebrow">
          {coreCopy[lang].core} <span aria-hidden="true">/</span> {t.inventory}
        </p>
        <h1>{t.title}</h1>
        <div className="cm-index-meta">
          <p>{t.description}</p>
          {assets?.length ? (
            <span className="cm-index-side">
              <span className="station-label">{t.count(assets.length)}</span>
              {unverified ? <span className="station-label ci-debt">{t.debt(unverified)}</span> : null}
            </span>
          ) : null}
        </div>
      </Container>
      <Container innerClassName="ci-list">
        {assets === null ? <p className="cm-empty">{t.unavailable}</p> : <InventoryTable assets={assets} members={members} locale={lang} />}
      </Container>
    </main>
  )
}
