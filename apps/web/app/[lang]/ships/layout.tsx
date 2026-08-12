import type { ReactNode } from "react"

import { ShipVotesProvider } from "@/components/ship-upvote"

export default function ShipsLayout({ children }: { children: ReactNode }) {
  return <ShipVotesProvider>{children}</ShipVotesProvider>
}
