import { ImageResponse } from "next/og"
import { SocialCard } from "@/components/social-card"
import { OG_SIZE } from "@/lib/og"
import { socialAssets, socialFonts } from "@/lib/og-assets"
import { resolveSocialCard } from "@/lib/og-data"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET(request: Request) {
  const data = await resolveSocialCard(new URL(request.url).searchParams)
  const [assets, fonts] = await Promise.all([socialAssets(data), socialFonts(data)])
  const maxAge = data.maxAge ?? 300
  return new ImageResponse(<SocialCard data={data} assets={assets} />, {
    ...OG_SIZE, fonts,
    headers: {
      // Profiles and bounty status change: don't freeze these for a year.
      "Cache-Control": data.unavailable
        ? "public, max-age=0, s-maxage=60"
        : `public, max-age=${Math.min(300, maxAge)}, s-maxage=${maxAge}`,
    },
  })
}
