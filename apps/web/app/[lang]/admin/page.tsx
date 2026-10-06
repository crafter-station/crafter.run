import Link from "next/link"
import { notFound } from "next/navigation"

import { getAdmin } from "@/lib/admin"
import { hotReloadEditions } from "@/lib/hot-reload"
import { isLocale, withLocale } from "@/lib/i18n"

export const metadata = { title: "Admin", robots: { index: false } }

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLocale(lang) || !(await getAdmin())) notFound()

  return (
    <main className="flex-1 py-12">
      <p className="station-label text-muted-foreground">Admin</p>
      <h1 className="mt-3 text-[clamp(36px,4vw,56px)]">Pedidos de eventos</h1>
      <div className="hot-reload-list mt-8">
        {hotReloadEditions
          .filter((edition) => edition.menu)
          .map((edition) => (
            <Link key={edition.number} href={withLocale(`/admin/hot-reload/${edition.number}`, lang)}>
              <span className="station-label">#{String(edition.number).padStart(2, "0")}</span>
              <span className="min-w-0">
                <h3 className="text-xl">Hot Reload · {edition.venue}</h3>
                <span className="text-muted-foreground">{edition.date}</span>
              </span>
              <span className="station-label text-muted-foreground">Ver pedidos →</span>
            </Link>
          ))}
      </div>
    </main>
  )
}
