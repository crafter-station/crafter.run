import sitemap from "@/app/sitemap"
import { baseUrl } from "@/lib/seo"

// IndexNow submitter, hit daily by the Vercel cron. Bing's index feeds
// ChatGPT and Copilot retrieval. Submits only recently-modified URLs:
// resubmitting the whole sitemap daily reads as noise. The key is public by
// design (engines verify it against the file in public/, which must stay in
// sync).

const INDEXNOW_KEY = "7833d2034cc268e757689658ae4d73f2"
const KEY_LOCATION = `${baseUrl}/${INDEXNOW_KEY}.txt`

const WINDOW_DAYS = 3

export const dynamic = "force-dynamic"

export async function GET(request: Request): Promise<Response> {
  // Enforce the Vercel cron secret when configured, so outsiders can't spam
  // submissions.
  const secret = process.env.CRON_SECRET
  if (secret && request.headers.get("authorization") !== `Bearer ${secret}`) {
    return new Response("Unauthorized", { status: 401 })
  }

  const cutoff = Date.now() - WINDOW_DAYS * 24 * 60 * 60 * 1000
  const recent = sitemap()
    .filter((entry) => {
      const lastmod = entry.lastModified
        ? new Date(entry.lastModified).getTime()
        : 0
      return lastmod >= cutoff
    })
    .map((entry) => entry.url)

  if (recent.length === 0) {
    return Response.json({ submitted: 0, reason: "no recent changes" })
  }

  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: new URL(baseUrl).host,
      key: INDEXNOW_KEY,
      keyLocation: KEY_LOCATION,
      urlList: recent,
    }),
  })

  // 200 = submitted, 202 = key validation pending; both are success.
  if (res.status !== 200 && res.status !== 202) {
    console.error("[indexnow] submission failed:", res.status, await res.text())
    return Response.json({ submitted: 0, status: res.status }, { status: 502 })
  }

  return Response.json({ submitted: recent.length, status: res.status })
}
