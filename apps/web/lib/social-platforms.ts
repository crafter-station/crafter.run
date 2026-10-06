import { siBluesky, siFacebook, siGithub, siInstagram, siThreads, siTiktok, siX, siYoutube } from "simple-icons"

export type SocialPlatform = {
  name: string
  hex: string
  /** simple-icons path on a 24x24 viewBox; LinkedIn has none, so it renders as a monogram. */
  path?: string
  monogram?: string
}

const platforms: Array<{ hosts: string[]; platform: SocialPlatform }> = [
  { hosts: ["x.com", "twitter.com"], platform: { name: "X", hex: siX.hex, path: siX.path } },
  { hosts: ["linkedin.com", "lnkd.in"], platform: { name: "LinkedIn", hex: "0A66C2", monogram: "in" } },
  { hosts: ["instagram.com"], platform: { name: "Instagram", hex: siInstagram.hex, path: siInstagram.path } },
  { hosts: ["tiktok.com"], platform: { name: "TikTok", hex: siTiktok.hex, path: siTiktok.path } },
  { hosts: ["youtube.com", "youtu.be"], platform: { name: "YouTube", hex: siYoutube.hex, path: siYoutube.path } },
  { hosts: ["threads.net", "threads.com"], platform: { name: "Threads", hex: siThreads.hex, path: siThreads.path } },
  { hosts: ["bsky.app"], platform: { name: "Bluesky", hex: siBluesky.hex, path: siBluesky.path } },
  { hosts: ["facebook.com", "fb.watch"], platform: { name: "Facebook", hex: siFacebook.hex, path: siFacebook.path } },
  { hosts: ["github.com"], platform: { name: "GitHub", hex: siGithub.hex, path: siGithub.path } },
]

export function detectSocialPlatform(url: string): SocialPlatform | null {
  let host: string
  try {
    host = new URL(url.trim()).hostname.toLowerCase().replace(/^(www|m|mobile|vm)\./, "")
  } catch {
    return null
  }
  return platforms.find(({ hosts }) => hosts.some((h) => host === h || host.endsWith(`.${h}`)))?.platform ?? null
}
