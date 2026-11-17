/** Placeholder that holds the shape of a form page while the server decides what to render. */
export function FormPageSkeleton({ withHeader = false, variant = "wizard" }: { withHeader?: boolean; variant?: "wizard" | "ship" }) {
  return (
    <div className="ob ob-skeleton" aria-busy="true" role="status">
      {withHeader ? (
        <div style={{ display: "grid", gap: 16 }}>
          <div className="ob-bone" style={{ height: 14, width: 140 }} />
          <div className="ob-bone" style={{ height: 52, width: "70%" }} />
        </div>
      ) : null}
      <div className="ob-card">
        <div className="ob-grid" style={{ gridTemplateColumns: `repeat(${variant === "ship" ? 3 : 4}, minmax(0, 1fr))`, gap: 8 }}>
          {Array.from({ length: variant === "ship" ? 3 : 4 }, (_, index) => (
            <div className="ob-bone" style={{ height: 32 }} key={index} />
          ))}
        </div>
        <div className="ob-bone" style={{ height: 36, width: "55%" }} />
        {variant === "ship" ? <div className="ob-bone" style={{ height: 20, width: "80%" }} /> : null}
        <div className="ob-bone" style={{ height: 52 }} />
        {variant === "ship" ? null : <div className="ob-bone" style={{ height: 52 }} />}
        <div className="ob-bone" style={{ height: 48, width: 160, justifySelf: "end" }} />
      </div>
    </div>
  )
}
