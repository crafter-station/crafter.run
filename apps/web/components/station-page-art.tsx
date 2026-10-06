import { CrafterStationLogo } from "@/components/crafter-station-logo"

export type PageArtwork = "people" | "conversation" | "research" | "workshop" | "ships" | "brand" | "events"

// Original, decorative drawings. Content and controls always live outside the SVG.
export function StationPageArt({ kind }: { kind: PageArtwork }) {
  return (
    <div className={`station-page-art station-page-art-${kind}`} aria-hidden="true">
      <svg className="station-page-scene" viewBox="0 0 400 250" fill="none" focusable="false">
        <ellipse cx="203" cy="220" rx="142" ry="14" fill="currentColor" opacity=".06" />
        <g stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          {kind === "people" && <>
            <ellipse cx="203" cy="141" rx="145" ry="65" strokeDasharray="2 8" opacity=".3" transform="rotate(-16 203 141)" />
            <path d="m102 99 105 64 98-80M105 203l102-40 110 39" opacity=".35" />
            <g transform="rotate(-10 103 104)">
              <rect x="55" y="43" width="94" height="117" rx="15" fill="var(--page-art-paper)" />
              <circle cx="102" cy="81" r="19" fill="var(--page-art-lilac)" />
              <path d="M72 137v-9c0-29 60-29 60 0v9" fill="var(--page-art-lilac)" />
            </g>
            <g transform="rotate(12 300 97)">
              <rect x="256" y="37" width="94" height="117" rx="15" fill="var(--page-art-paper)" />
              <circle cx="303" cy="75" r="19" fill="var(--page-art-green)" />
              <path d="M273 131v-9c0-29 60-29 60 0v9" fill="var(--page-art-green)" />
            </g>
            <g transform="rotate(-4 202 168)">
              <rect x="158" y="112" width="94" height="117" rx="15" fill="var(--page-art-yellow)" />
              <circle cx="205" cy="150" r="19" />
              <path d="M175 206v-9c0-29 60-29 60 0v9" />
            </g>
            <path d="M197 37v22m-11-11h22M347 181h16m-8-8v16" />
          </>}
          {kind === "conversation" && <>
            <g transform="rotate(-9 159 106)">
              <path d="M52 63a19 19 0 0 1 19-19h158a19 19 0 0 1 19 19v86a19 19 0 0 1-19 19h-82l-40 32v-32H71a19 19 0 0 1-19-19Z" fill="var(--page-art-green)" />
              <path d="M82 79h118M82 101h83" opacity=".45" />
              <circle cx="88" cy="134" r="4" fill="currentColor" />
              <circle cx="107" cy="134" r="4" fill="currentColor" />
              <circle cx="126" cy="134" r="4" fill="currentColor" />
            </g>
            <g transform="rotate(8 278 159)">
              <path d="M204 121a16 16 0 0 1 16-16h116a16 16 0 0 1 16 16v63a16 16 0 0 1-16 16h-13v25l-35-25h-68a16 16 0 0 1-16-16Z" fill="var(--page-art-yellow)" />
              <path d="m249 137-17 15 17 15m42-30 17 15-17 15m-15-36-12 42" strokeWidth="3" />
            </g>
            <path d="M307 38v28m-14-14h28m-24-10 20 20m0-20-20 20M36 186l-9 8m23 5-2 12" />
          </>}
          {kind === "research" && <>
            <circle cx="219" cy="113" r="82" fill="var(--page-art-green)" stroke="none" />
            <g transform="rotate(-28 213 111)">
              <ellipse cx="213" cy="111" rx="146" ry="60" />
              <ellipse cx="213" cy="111" rx="106" ry="41" opacity=".5" />
              <circle cx="213" cy="111" r="24" fill="var(--page-art-yellow)" />
              <circle cx="324" cy="73" r="10" fill="var(--page-art-paper)" />
              <circle cx="91" cy="142" r="5" fill="currentColor" />
            </g>
            <g transform="rotate(-8 131 188)">
              <path d="M47 151h75l22 12h70v64h-70l-22-12H47Z" fill="var(--page-art-paper)" />
              <path d="M122 151v64m22-52v64M61 170h44m-44 15h33m57 0h46m-46 14h34" opacity=".5" />
            </g>
            <path d="m290 168 24 28h41M53 51h20m-10-10v20" />
            <circle cx="360" cy="196" r="5" fill="var(--page-art-lilac)" />
          </>}
          {kind === "workshop" && <>
            <g transform="rotate(-6 187 110)">
              <rect x="58" y="35" width="259" height="157" rx="12" fill="var(--page-art-paper)" />
              <path d="M58 65h259" opacity=".3" />
              {[75, 89, 103].map(x => <circle key={x} cx={x} cy="50" r="3" fill="currentColor" />)}
              <path d="m110 102-26 21 26 22m48-43 26 21-26 22m-17-54-16 65" strokeWidth="3" />
              <path d="M212 106h71m-71 18h51m-51 18h62" opacity=".3" />
            </g>
            <g transform="rotate(8 300 185)">
              <rect x="231" y="140" width="116" height="77" rx="10" fill="var(--page-art-lilac)" />
              <path d="M253 162h22v31h-22zm44 0h27v12h-27zM297 184h27" />
            </g>
            <path d="M73 211h105M343 61h18m-9-9v18" />
          </>}
          {kind === "ships" && <>
            <path d="m90 146 105-51 111 45-107 55Z" fill="var(--page-art-yellow)" />
            <path d="M90 146v53l109 41 107-50v-50M199 195v45" fill="var(--page-art-yellow)" />
            <path d="m90 146 109 49 107-55M90 146l-26-34 104-46 27 29M195 95l28-32 111 46-28 31" fill="var(--page-art-paper)" />
            <path d="m140 74 11-34 11 34m-11-34v72m52-52 17-42 17 42m-17-42v66m49 2 11-30 11 30m-11-30v63" />
            <rect x="300" y="179" width="48" height="33" rx="6" fill="var(--page-art-green)" transform="rotate(-12 300 179)" />
            <path d="m311 190 7 6 12-15M50 174h16m-8-8v16M336 50l8 9 8-9" />
          </>}
          {kind === "brand" && <>
            <g transform="rotate(-10 164 126)">
              <rect x="48" y="42" width="205" height="168" rx="10" fill="var(--page-art-yellow)" />
              <path d="M69 64h22m-22 0v22m162-22h-22m22 0v22M69 190h22m-22 0v-22" opacity=".5" />
            </g>
            <g transform="translate(100 80) scale(1.4)">
              <CrafterStationLogo decorative width="72" height="72" className="station-page-symbol" />
            </g>
            <g transform="rotate(12 296 151)">
              <rect x="243" y="77" width="96" height="132" rx="8" fill="var(--page-art-paper)" />
              <circle cx="272" cy="109" r="13" fill="var(--page-art-green)" />
              <circle cx="307" cy="109" r="13" fill="var(--page-art-lilac)" />
              <path d="M259 148h63m-63 17h63m-63 17h39" opacity=".5" />
            </g>
          </>}
          {kind === "events" && <>
            <g transform="rotate(-8 173 124)">
              <rect x="60" y="46" width="224" height="166" rx="14" fill="var(--page-art-paper)" />
              <path d="M60 87h224M105 35v27m136-27v27" />
              {[113, 147, 181].map(y => [95, 136, 177, 218].map(x => <rect key={`${x}-${y}`} x={x} y={y} width="14" height="13" rx="3" fill={x === 177 ? "var(--page-art-lilac)" : "var(--page-art-green)"} stroke="none" />))}
              <circle cx="184" cy="153" r="19" />
            </g>
            <g transform="rotate(10 305 174)">
              <path d="M260 119h83v104h-83Z" fill="var(--page-art-yellow)" />
              <path d="M273 188h57" strokeDasharray="2 5" />
              <path d="m289 145 9 9 16-18" strokeWidth="3" />
              <path d="M278 204h5m5 0h3m5 0h9m5 0h3m5 0h6" strokeWidth="7" />
            </g>
            <path d="M332 51v22m-11-11h22M35 149h10" />
          </>}
        </g>
      </svg>
    </div>
  )
}
