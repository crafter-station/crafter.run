// Original editorial drawings. These are illustrations, not project logos or metrics.
export function OpenSourceAssembly() {
  return (
    <svg className="oss-assembly" viewBox="0 0 520 470" fill="none" aria-hidden="true">
      <g className="oss-art-grid" stroke="currentColor" strokeWidth=".7">
        {Array.from({ length: 9 }, (_, i) => <path key={i} d={`M${30 + i * 50} 54V432M22 ${54 + i * 44}H498`} />)}
      </g>
      <ellipse cx="268" cy="354" rx="186" ry="89" stroke="currentColor" strokeDasharray="3 7" opacity=".25" />
      <g stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round">
        <path d="M65 303 253 405 450 293 265 193Z" className="oss-art-base" />
        <path d="M65 303v17l188 103v-18m0 18 197-112v-18" className="oss-art-base" />
        <path d="m112 297 142 78 149-84-141-78Z" opacity=".3" />
        <path d="M146 305v-46m115 84v-68m112 29v-78M263 233v-59" strokeDasharray="3 5" opacity=".5" />
      </g>
      <g className="oss-assembly-module" stroke="#294135" strokeWidth="1.5" strokeLinejoin="round">
        <path d="m104 208 106 59v32l-106-58Z" fill="#779969" />
        <path d="m210 267 107-60v33l-107 59Z" fill="#55794e" />
        <path d="m104 208 106-60 107 59-107 60Z" fill="#d0e3aa" />
        <path d="m135 207 76-42 75 42-76 42Z" strokeDasharray="3 4" />
        <path d="m170 202-16 9 17 9m76-30 17 9-17 9m-32-20-12 39" strokeWidth="3" strokeLinecap="round" />
      </g>
      <g className="oss-assembly-module oss-assembly-module-two" stroke="#423943" strokeWidth="1.5" strokeLinejoin="round">
        <path d="m254 157 79 44v28l-79-44Z" fill="#a99cac" />
        <path d="m333 201 81-46v28l-81 46Z" fill="#796e89" />
        <path d="m254 157 81-46 79 44-81 46Z" fill="#ddd3e8" />
        <path d="m287 157 21-12 22 12-21 12Zm36-20 21-12 22 12-21 12Zm0 40 21-12 22 12-21 12Z" fill="#796e89" />
      </g>
      <g className="oss-assembly-module oss-assembly-module-three" stroke="#644732" strokeWidth="1.5" strokeLinejoin="round">
        <path d="m298 286 69 39v25l-69-39Z" fill="#cf9f70" />
        <path d="m367 325 71-40v25l-71 40Z" fill="#a27653" />
        <path d="m298 286 70-41 70 40-71 40Z" fill="#f0cca0" />
        <path d="m324 281 16 9-15 9m22 3 26-15" strokeWidth="3" strokeLinecap="round" />
      </g>
      <g stroke="currentColor" strokeWidth="1.2" opacity=".65">
        <path d="M210 137V92h-76m202 9V63h71M376 265h80v-36M92 242H48v-40" />
        <circle cx="128" cy="92" r="5" />
        <circle cx="413" cy="63" r="5" />
        <circle cx="456" cy="223" r="5" />
        <path d="M41 196h14m-7-7v14" />
      </g>
      <g fill="currentColor" opacity=".55">
        <circle cx="170" cy="348" r="3" /><circle cx="184" cy="356" r="3" /><circle cx="198" cy="364" r="3" />
      </g>
    </svg>
  )
}

const pets = [
  "0010000100",
  "0111001110",
  "0111111110",
  "0110110110",
  "0111111110",
  "0011001100",
  "0011111100",
  "0110000110",
]

export function OssProjectArt({ name }: { name: string }) {
  if (name === "petdex") return (
    <svg viewBox="0 0 420 215" fill="none" aria-hidden="true">
      <ellipse cx="213" cy="188" rx="100" ry="12" fill="currentColor" opacity=".12" />
      <g transform="translate(127 30) rotate(-7 80 70)" fill="currentColor">
        {pets.flatMap((row, y) => [...row].map((pixel, x) => pixel === "1" ? <rect key={`${x}-${y}`} x={x * 17} y={y * 17} width="17" height="17" /> : null))}
      </g>
      <path d="M68 82V60h22m256 73v23h-23M318 40v22m-11-11h22M76 162v15m-7-7h14" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
  if (name === "agentfiles") return (
    <svg viewBox="0 0 420 215" fill="none" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round">
        <path d="M147 43h121l26 25v128H147Z" fill="#9081a2" transform="rotate(10 210 115)" />
        <path d="M118 24h115l33 32v130H118Z" fill="#eee5f3" transform="rotate(-7 210 110)" />
        <path d="M233 24v32h33M142 87h86m-86 17h65m-65 17h86m-86 17h44" transform="rotate(-7 210 110)" />
        <path d="m273 112 25-13 31 17v37l-30 17-26-15Z" fill="#d8bb8e" />
        <path d="m285 133 10 6-10 6m17 0h12" strokeWidth="2" />
      </g>
    </svg>
  )
  if (name === "tinte") return (
    <svg viewBox="0 0 420 215" fill="none" aria-hidden="true">
      {["#adc8c1", "#d6b5c8", "#e8ca99", "#cddaa6", "#8cabc5"].map((color, i) => (
        <g key={color} transform={`rotate(${(i - 2) * 17} 210 172)`}>
          <rect x="184" y="28" width="55" height="159" rx="5" fill={color} stroke="#354843" strokeWidth="1.3" />
          <path d="M196 48h30m-30 8h18M195 134h33m-33 8h22" stroke="#354843" opacity=".55" />
          <circle cx="211" cy="171" r="3" stroke="#354843" />
        </g>
      ))}
    </svg>
  )
  if (name === "elements") return (
    <svg viewBox="0 0 420 215" fill="none" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1.5">
        <rect x="116" y="56" width="219" height="140" rx="5" fill="#b7b9aa" />
        <rect x="98" y="40" width="219" height="140" rx="5" fill="#353a31" />
        <rect x="80" y="24" width="219" height="140" rx="5" fill="#f3f0dd" />
        <path d="M80 49h219" />
        <rect x="97" y="66" width="61" height="78" rx="2" fill="#d4bb73" />
        <path d="M174 72h106m-106 15h75m-75 15h90" />
        <rect x="174" y="119" width="45" height="25" rx="2" fill="#b7c7b1" />
        <rect x="232" y="119" width="48" height="25" rx="2" fill="#353a31" />
      </g>
      <g fill="currentColor"><circle cx="95" cy="37" r="2" /><circle cx="105" cy="37" r="2" /><circle cx="115" cy="37" r="2" /></g>
    </svg>
  )
  return null
}

export function ContributionPath() {
  return (
    <svg viewBox="0 0 440 140" fill="none" aria-hidden="true">
      <path d="M24 95h103c28 0 28-58 56-58h74c28 0 28 58 56 58h104" stroke="currentColor" strokeWidth="2" />
      <path d="M127 95h184" stroke="currentColor" strokeDasharray="3 6" opacity=".35" />
      {[40, 210, 397].map((x, i) => <g key={x}><circle cx={x} cy={i === 1 ? 37 : 95} r="14" fill="var(--oss-surface)" stroke="currentColor" strokeWidth="2" /><circle cx={x} cy={i === 1 ? 37 : 95} r="4" fill="currentColor" /></g>)}
      <path d="m387 32 8 8 16-18" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}
