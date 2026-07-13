export type GearItem = string | { name: string; detail?: string }
export type GearGroup = { category: string; items: GearItem[] }

export function GearList({
  groups,
  variant = "auto",
}: {
  groups: GearGroup[]
  variant?: "auto" | "chips" | "list"
}) {
  return (
    <div className="space-y-8">
      {groups.map((group) => {
        const items = group.items.map((item) =>
          typeof item === "string" ? { name: item, detail: undefined } : item,
        )
        const hasDetail =
          variant === "list" ||
          (variant === "auto" && items.some((item) => item.detail))
        return (
          <div key={group.category}>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60">
              {group.category}
            </p>
            {hasDetail ? (
              <div className="mt-3 divide-y divide-line border-t border-line">
                {items.map((item) => (
                  <div key={item.name} className="flex items-baseline justify-between gap-6 py-2.5">
                    <span className="text-sm text-foreground">{item.name}</span>
                    {item.detail ? (
                      <span className="shrink-0 text-right font-mono text-xs text-muted-foreground">{item.detail}</span>
                    ) : null}
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-3 flex flex-wrap gap-2">
                {items.map((item) => (
                  <span key={item.name} className="border border-line px-3 py-1.5 text-xs text-muted-foreground">
                    {item.name}
                  </span>
                ))}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
