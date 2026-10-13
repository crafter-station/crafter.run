import { redirect } from "next/navigation"

export default async function Page({ params }: { params: Promise<{ lang: string; edition: string }> }) {
  const { lang, edition } = await params
  redirect(`/${lang}/admin/events/hot-reload-${edition}`)
}
