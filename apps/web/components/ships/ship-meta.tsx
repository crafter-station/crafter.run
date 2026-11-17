import type { ShipLink, ShipSummary } from "@crafter/contracts"
import { ArrowUpRight, Github, Globe, Package, Play, Share2 } from "lucide-react"
import type { ReactNode } from "react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

export type ShipLabels = Record<string, string>

const linkIcons: Record<ShipLink["type"], ReactNode> = {
  repository: <Github aria-hidden="true" />,
  website: <Globe aria-hidden="true" />,
  demo: <Play aria-hidden="true" />,
  package: <Package aria-hidden="true" />,
  social: <Share2 aria-hidden="true" />,
}

/** Round avatar with the first letter as fallback. */
export function MakerAvatar({ owner, className }: { owner: Pick<ShipSummary["owner"], "displayName" | "avatarUrl">; className?: string }) {
  return (
    <Avatar className={cn("ship-avatar", className)}>
      {owner.avatarUrl ? <AvatarImage src={owner.avatarUrl} alt="" /> : null}
      <AvatarFallback>{owner.displayName.slice(0, 1).toUpperCase()}</AvatarFallback>
    </Avatar>
  )
}

/** Icon links to the repository, site and so on. Each opens in a new tab and carries its own name. */
export function ShipLinks({ links, labels }: { links: ShipSummary["links"]; labels: ShipLabels }) {
  if (links.length === 0) return null
  return (
    <ul className="ship-links">
      {links.map((link) => (
        <li key={`${link.type}-${link.url}`}>
          <a href={link.url} target="_blank" rel="noopener noreferrer" aria-label={labels[link.type]} title={labels[link.type]}>
            {linkIcons[link.type]}
            <ArrowUpRight className="ship-links-out" aria-hidden="true" />
          </a>
        </li>
      ))}
    </ul>
  )
}
