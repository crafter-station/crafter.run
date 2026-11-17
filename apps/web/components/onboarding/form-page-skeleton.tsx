/** Placeholder that holds the shape of a form page while the server decides what to render. */
export function FormPageSkeleton({ withHeader = false }: { withHeader?: boolean }) {
  return (
    <div className="ob ob-skeleton" aria-busy="true" role="status">
      {withHeader ? (
        <div style={{ display: "grid", gap: 16 }}>
          <div className="ob-bone" style={{ height: 14, width: 140 }} />
          <div className="ob-bone" style={{ height: 52, width: "70%" }} />
        </div>
      ) : null}
      <div className="ob-card">
        <div className="ob-grid" style={{ gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 8 }}>
          {[0, 1, 2, 3].map((index) => (
            <div className="ob-bone" style={{ height: 32 }} key={index} />
          ))}
        </div>
        <div className="ob-bone" style={{ height: 36, width: "55%" }} />
        <div className="ob-bone" style={{ height: 52 }} />
        <div className="ob-bone" style={{ height: 52 }} />
        <div className="ob-bone" style={{ height: 48, width: 160, justifySelf: "end" }} />
      </div>
    </div>
  )
}
