import { redirect } from "next/navigation"

export default async function Page({ params }: { params: Promise<{ lang: string; event: string }> }) {
  const { lang, event } = await params
  redirect(`/${lang}/admin/events/${event}`)
}
