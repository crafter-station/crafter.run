// Editorial art is decoration; names, descriptions and links stay in the DOM.
const illustrations: Record<string, string> = {
  petdex: "petdex", elements: "elements", trx: "trx", kliq: "kliq",
  playhud: "playhud", "event-sdk": "event-sdk",
}

export function ProjectArt({ name, label }: { name: string; label?: string }) {
  const artwork = illustrations[name.toLowerCase()]
  const seed = [...name].reduce((sum, char) => sum + char.charCodeAt(0), 0)
  const variant = seed % 3
  return (
    <div className="station-project-art" aria-hidden="true">
      {artwork ? <img src={`/station/${artwork}.svg`} alt="" loading="lazy" width="640" height="380" /> : (
        <svg viewBox="0 0 640 380" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="640" height="380" fill={variant === 0 ? "#EEEFE7" : variant === 1 ? "#F8E9A4" : "#E8E8D8"} />
          {Array.from({ length: 12 }, (_, i) => <path key={i} d={`M${i * 60} 0V380M0 ${i * 60}H640`} stroke="#20221D" opacity=".045" />)}
          {variant === 0 ? Array.from({ length: 6 }, (_, i) => (
            <g key={i} transform={`translate(${205 + i * 12} ${90 + i * 13})`}>
              <rect width="165" height="130" rx="4" fill={i === 5 ? "#FFC107" : "#20221D"} stroke="#F8E9A4" />
              {i === 5 && <path d="m45 44-22 22 22 22m75-44 22 22-22 22M91 36 75 96" stroke="#20221D" strokeWidth="5" />}
            </g>
          )) : variant === 1 ? (
            <g transform="translate(320 200) rotate(-20)">
              {[110, 85, 60, 35].map((r, i) => <rect key={r} x={-r} y={-r} width={r * 2} height={r * 2} rx="8" fill={i % 2 ? "#FFC107" : "#20221D"} />)}
              <circle r="11" fill="#F8E9A4" />
            </g>
          ) : (
            <g stroke="#20221D" strokeWidth="2">
              <path d="M170 246 320 70 470 246Z" fill="#F8E9A4" />
              <path d="M170 246 320 316 470 246 320 164Z" fill="#FFC107" />
              <path d="M320 70v246M170 246l150-82 150 82" />
            </g>
          )}
        </svg>
      )}
      {label && <span className="station-project-art-tag">{label}</span>}
    </div>
  )
}
