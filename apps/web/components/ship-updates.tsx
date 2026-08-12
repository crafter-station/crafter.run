"use client"

import type { FormEvent } from "react"
import { useEffect, useState } from "react"
import type { MemberProfile, ShipUpdate } from "@crafter/contracts"
import { useAuth } from "@clerk/nextjs"

import { shipsApi, uploadShipImage } from "@/lib/ships-client"

const copy = {
  en: { heading: "Updates", empty: "No updates yet.", post: "Post an update", title: "Title", description: "What changed?", image: "Picture (optional)", socialPost: "Social post URL (optional)", viewPost: "View social post", publish: "Publish update", publishing: "Publishing..." },
  es: { heading: "Actualizaciones", empty: "Aun no hay actualizaciones.", post: "Publicar una actualizacion", title: "Titulo", description: "Que cambio?", image: "Imagen (opcional)", socialPost: "URL de la publicacion social (opcional)", viewPost: "Ver publicacion social", publish: "Publicar actualizacion", publishing: "Publicando..." },
  pt: { heading: "Atualizacoes", empty: "Ainda nao ha atualizacoes.", post: "Publicar uma atualizacao", title: "Titulo", description: "O que mudou?", image: "Imagem (opcional)", socialPost: "URL da publicacao social (opcional)", viewPost: "Ver publicacao social", publish: "Publicar atualizacao", publishing: "Publicando..." },
  zh: { heading: "更新", empty: "暂无更新。", post: "发布更新", title: "标题", description: "有什么变化？", image: "图片（可选）", socialPost: "社交媒体帖子链接（可选）", viewPost: "查看社交媒体帖子", publish: "发布更新", publishing: "发布中..." },
  ja: { heading: "アップデート", empty: "アップデートはまだありません。", post: "アップデートを投稿", title: "タイトル", description: "変更内容", image: "画像（任意）", socialPost: "SNS投稿URL（任意）", viewPost: "SNS投稿を見る", publish: "アップデートを公開", publishing: "公開中..." },
} as const

type Locale = keyof typeof copy

export function ShipUpdates({
  initialUpdates,
  locale,
  ownerHandle,
  slug,
}: {
  initialUpdates: ShipUpdate[]
  locale: Locale
  ownerHandle: string
  slug: string
}) {
  const { getToken, isSignedIn } = useAuth()
  const [updates, setUpdates] = useState(initialUpdates)
  const [isOwner, setIsOwner] = useState(false)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const t = copy[locale]

  useEffect(() => {
    if (!isSignedIn) {
      setIsOwner(false)
      return
    }
    let cancelled = false
    void getToken()
      .then((token) => token ? shipsApi<{ member: MemberProfile | null }>("/v1/me", token) : null)
      .then((response) => {
        if (!cancelled) setIsOwner(response?.member?.handle === ownerHandle)
      })
      .catch(() => {
        if (!cancelled) setIsOwner(false)
      })
    return () => { cancelled = true }
  }, [getToken, isSignedIn, ownerHandle])

  async function publish(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setPending(true)
    setError(null)
    const form = event.currentTarget
    const data = new FormData(form)
    try {
      const token = await getToken()
      if (!token) throw new Error("Your session expired.")
      const image = data.get("image")
      const imageUrl = image instanceof File && image.size > 0 ? await uploadShipImage(image, token) : null
      const response = await shipsApi<{ update: ShipUpdate }>(`/v1/ships/${encodeURIComponent(slug)}/updates`, token, {
        method: "POST",
        headers: { "Idempotency-Key": crypto.randomUUID() },
        body: JSON.stringify({ title: data.get("title"), description: data.get("description"), imageUrl, socialPostUrl: data.get("socialPostUrl") || null }),
      })
      setUpdates((current) => [response.update, ...current])
      form.reset()
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not publish update.")
    } finally {
      setPending(false)
    }
  }

  return (
    <section className="mt-20 border-t border-line pt-10">
      <div className="flex items-end justify-between gap-6">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">Changelog</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">{t.heading}</h2>
        </div>
        <p className="font-mono text-xs text-muted-foreground">{updates.length.toString().padStart(2, "0")}</p>
      </div>

      {isOwner ? (
        <form onSubmit={publish} className="mt-8 grid gap-4 border border-line p-5">
          <p className="text-sm font-medium">{t.post}</p>
          <input name="title" required maxLength={100} placeholder={t.title} className="input" />
          <textarea name="description" required minLength={4} maxLength={5000} rows={5} placeholder={t.description} className="input" />
          <label className="grid gap-2 text-sm"><span className="label">{t.image}</span><input name="image" type="file" accept="image/jpeg,image/png,image/webp,image/gif" className="input" /></label>
          <label className="grid gap-2 text-sm"><span className="label">{t.socialPost}</span><input name="socialPostUrl" type="url" placeholder="https://x.com/.../status/..." className="input" /></label>
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
          <button disabled={pending} className="w-fit bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground disabled:opacity-50">
            {pending ? t.publishing : t.publish}
          </button>
        </form>
      ) : null}

      <div className="mt-8">
        {updates.length === 0 ? <p className="text-sm text-muted-foreground">{t.empty}</p> : updates.map((update) => (
          <article key={update.id} className="grid gap-4 border-t border-line py-8 first:border-t-0 md:grid-cols-[9rem_minmax(0,1fr)]">
            <time dateTime={update.publishedAt} className="font-mono text-xs text-muted-foreground">
              {new Intl.DateTimeFormat(locale, { dateStyle: "medium" }).format(new Date(update.publishedAt))}
            </time>
            <div>
              <h3 className="text-xl font-medium tracking-tight">{update.title}</h3>
              {update.imageUrl ? <img src={update.imageUrl} alt="" className="mt-4 aspect-video w-full max-w-2xl border border-line object-cover" /> : null}
              <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-muted-foreground">{update.description}</p>
              {update.socialPostUrl ? <a href={update.socialPostUrl} target="_blank" rel="noreferrer" className="mt-4 inline-block text-sm font-medium text-accent underline underline-offset-4">{t.viewPost}</a> : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
