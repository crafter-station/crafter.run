import { CrafterStationLogo } from "@/components/crafter-station-logo"
import type { NetworkArea } from "@/lib/network"

// Original editorial scenes: the same four ideas as the atlas, with room to explore.
export function UniverseArtwork({ area }: { area: NetworkArea }) {
  return <div className={`universe-illustration illustration-${area}`} aria-hidden="true">
    <svg viewBox="0 0 480 300" fill="none" className="universe-scene">
      <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        {area === "research" && <>
          <circle cx="258" cy="145" r="115" fill="currentColor" fillOpacity=".045" stroke="none" />
          <path d="M59 231 397 68M65 84l344 138" strokeDasharray="2 9" opacity=".25" />
          <g transform="rotate(-24 248 145)">
            <ellipse cx="248" cy="145" rx="156" ry="76" opacity=".3" />
            <ellipse cx="248" cy="145" rx="121" ry="57" />
            <ellipse cx="248" cy="145" rx="79" ry="36" />
            <circle cx="248" cy="145" r="28" fill="var(--network-surface)" />
            <circle cx="248" cy="145" r="14" fill="currentColor" />
            <circle cx="339" cy="108" r="10" fill="var(--network-surface)" />
            <circle cx="107" cy="179" r="6" fill="currentColor" />
          </g>
          <path d="m257 172 43 47h67" opacity=".55" />
          <circle cx="374" cy="219" r="6" />
          <g transform="rotate(-9 111 214)">
            <rect x="62" y="179" width="99" height="67" rx="5" fill="var(--network-surface)" />
            <path d="M76 228v-33m0 33h70" opacity=".4" />
            <path d="m81 218 14-6 13 4 16-22 13 9" />
            <circle cx="137" cy="203" r="3" fill="currentColor" />
          </g>
          <path d="M91 69h18m-9-9v18M367 50h12m-6-6v12" />
          <circle cx="401" cy="170" r="3" fill="currentColor" />
          <path d="M214 254h55" opacity=".25" />
        </>}
        {area === "lab" && <>
          <path d="m44 228 180-99 209 84-181 104Z" fill="currentColor" fillOpacity=".045" stroke="none" />
          <g opacity=".2">
            <path d="m57 227 182 74M87 210l182 74M118 194l182 74M149 178l182 74M180 161l182 74M211 145l182 74" />
            <path d="m83 244 170-92M121 259l170-92M159 274l170-92M197 289l170-92M235 304l170-92" />
          </g>
          <g>
            <path d="m135 190 108-57 111 48-109 60Z" fill="var(--network-surface)" />
            <path d="M135 190v16l110 49 109-60v-14M245 241v14" />
            <path d="m135 146 108-57 111 48-109 60Z" fill="var(--network-surface)" />
            <path d="M135 146v15l110 50 109-60v-14M245 197v14" />
            <path d="m135 101 108-57 111 48-109 60Z" fill="var(--network-surface)" />
            <path d="M135 101v15l110 50 109-60V92M245 152v14" />
            <path d="m215 84-28 15 29 12m57-43 28 13-27 15m-28-17-11 40" strokeWidth="3" />
          </g>
          <g transform="rotate(8 373 199)">
            <rect x="338" y="176" width="78" height="51" rx="5" fill="var(--network-surface)" />
            <path d="m351 190 9 8-9 8m21 0h20" strokeWidth="2" />
          </g>
          <path d="M61 130h46v34h26" strokeDasharray="3 6" opacity=".6" />
          <circle cx="61" cy="130" r="5" fill="var(--network-surface)" />
          <path d="M372 55h20m-10-10v20M91 67h12m-6-6v12" />
          <circle cx="313" cy="250" r="4" fill="currentColor" />
        </>}
        {area === "games" && <>
          <circle cx="245" cy="133" r="104" fill="currentColor" fillOpacity=".045" stroke="none" />
          <g opacity=".2">
            <path d="m20 274 223-61 217 61-217 60Z" />
            <path d="m64 286 223-61M108 298l223-61M153 310l222-61M197 322l221-60" />
            <path d="m65 262 223 60M109 250l223 60M154 237l222 61M198 225l222 61" />
          </g>
          <ellipse cx="239" cy="239" rx="83" ry="17" fill="currentColor" fillOpacity=".07" stroke="none" />
          <g transform="rotate(-9 241 137)">
            <path d="m153 91 89-42 88 41-89 46Z" fill="currentColor" fillOpacity=".12" />
            <path d="m153 91 89-42 88 41-89 46Zm0 0v94l88 48 89-46V90M241 136v97" fill="var(--network-surface)" fillOpacity=".45" />
            <path d="m178 137 44 23m-22-37v49" strokeWidth="9" strokeLinecap="square" />
            <ellipse cx="270" cy="166" rx="7" ry="10" fill="currentColor" />
            <ellipse cx="302" cy="149" rx="7" ry="10" fill="currentColor" />
          </g>
          <path d="m91 109 8-15 8 15-8 15Z" fill="var(--network-surface)" />
          <path d="m362 174 10-18 10 18-10 18Z" />
          <path d="M348 61h26m-13-13v26m-9-22 18 18m0-18-18 18M88 209h16m-8-8v16" />
          <circle cx="133" cy="48" r="4" fill="currentColor" />
          <circle cx="394" cy="121" r="3" fill="currentColor" />
        </>}
        {area === "station" && <>
          <ellipse cx="242" cy="158" rx="146" ry="87" strokeDasharray="2 8" opacity=".3" />
          <path d="m128 90 114 68 117-62M116 210l126-52 112 66M242 44v114" opacity=".35" />
          <ellipse cx="242" cy="168" rx="75" ry="46" fill="currentColor" fillOpacity=".07" stroke="none" />
          <ellipse cx="242" cy="156" rx="75" ry="46" fill="var(--network-surface)" />
          <g transform="rotate(-10 123 90)">
            <path d="M80 64a7 7 0 0 1 7-7h74a7 7 0 0 1 7 7v44a7 7 0 0 1-7 7h-45l-19 15v-15H87a7 7 0 0 1-7-7Z" fill="var(--network-surface)" />
            <circle cx="106" cy="86" r="3" fill="currentColor" />
            <circle cx="124" cy="86" r="3" fill="currentColor" />
            <circle cx="142" cy="86" r="3" fill="currentColor" />
          </g>
          <g transform="rotate(10 357 87)">
            <rect x="324" y="55" width="67" height="61" rx="5" fill="var(--network-surface)" />
            <path d="M324 72h67m-52-23v13m36-13v13" />
            <path d="m343 93 9 8 18-20" strokeWidth="2.5" />
          </g>
          <g transform="rotate(-5 122 213)">
            <circle cx="122" cy="213" r="29" fill="var(--network-surface)" />
            <circle cx="122" cy="205" r="7" />
            <path d="M108 228v-5a14 14 0 0 1 28 0v5" />
          </g>
          <g transform="rotate(9 357 222)">
            <rect x="324" y="197" width="67" height="50" rx="5" fill="var(--network-surface)" />
            <path d="m340 222 11 10 22-25" strokeWidth="2.5" />
          </g>
          <circle cx="242" cy="44" r="9" fill="var(--network-surface)" />
          <path d="M59 161h18m-9-9v18M406 162h12m-6-6v12" />
          <circle cx="253" cy="254" r="4" fill="currentColor" />
        </>}
      </g>
    </svg>
    {area === "station" && <CrafterStationLogo decorative className="universe-scene-mark" />}
  </div>
}
