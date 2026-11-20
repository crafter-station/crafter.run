import type { Product } from "@/lib/products"

// Original, decorative drawings in each product's own palette. Content lives outside the SVG.
export function ProductArt({ slug }: { slug: Product["slug"] }) {
  if (slug === "ojito") return (
    <svg viewBox="0 0 420 260" fill="none" aria-hidden="true" focusable="false">
      <ellipse cx="210" cy="236" rx="150" ry="11" fill="#161412" opacity=".1" />
      <g stroke="#161412" strokeWidth="1.6" strokeLinejoin="round">
        <g transform="rotate(-6 150 120)">
          <rect x="62" y="44" width="196" height="136" rx="14" fill="#fff" />
          <path d="M62 66h196" />
          <circle cx="78" cy="55" r="3.5" fill="#ff5f57" />
          <circle cx="90" cy="55" r="3.5" fill="#febc2e" />
          <circle cx="102" cy="55" r="3.5" fill="#28c840" />
          <path d="M82 90h120M82 106h98M82 122h112M82 138h70" opacity=".35" />
        </g>
        <g transform="rotate(5 300 150)">
          <rect x="218" y="104" width="158" height="96" rx="14" fill="#f3efe7" />
          <rect x="230" y="116" width="134" height="44" rx="7" fill="#fff" />
          <path d="M240 130h70M240 143h52" opacity=".35" />
          <circle cx="238" cy="178" r="7" fill="#28c840" stroke="none" />
          <path d="m234.5 178 2.5 2.5 4.5-5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M252 178h56" strokeWidth="2.4" strokeLinecap="round" />
        </g>
        <g transform="translate(248 26)">
          <circle cx="22" cy="22" r="21" fill="#161412" />
          <circle cx="27" cy="25" r="7" fill="#f3efe7" stroke="none" />
          <circle cx="76" cy="22" r="21" fill="#161412" />
          <circle cx="81" cy="25" r="7" fill="#f3efe7" stroke="none" />
          <rect x="108" y="-4" width="12" height="34" rx="6" fill="#ff5a1f" stroke="none" />
          <circle cx="114" cy="40" r="6" fill="#ff5a1f" stroke="none" />
        </g>
      </g>
      <g fill="#161412">
        <rect x="102" y="200" width="44" height="34" rx="9" />
        <rect x="154" y="200" width="44" height="34" rx="9" />
      </g>
      <text x="124" y="223" textAnchor="middle" fill="#f3efe7" fontSize="17" fontFamily="system-ui">⌘</text>
      <text x="176" y="223" textAnchor="middle" fill="#f3efe7" fontSize="17" fontFamily="system-ui">⌘</text>
    </svg>
  )
  if (slug === "muelle") return (
    <svg viewBox="0 0 420 260" fill="none" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="muelle-glow" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#f97c03" />
          <stop offset="1" stopColor="#f9cd5a" />
        </linearGradient>
      </defs>
      <ellipse cx="210" cy="236" rx="150" ry="11" fill="#161412" opacity=".1" />
      <g stroke="#161412" strokeWidth="1.6" strokeLinejoin="round">
        <g transform="rotate(-4 170 100)">
          <rect x="70" y="30" width="200" height="128" rx="14" fill="#fff" />
          <path d="M70 52h200" />
          <circle cx="86" cy="41" r="3.5" fill="#ff5f57" />
          <circle cx="98" cy="41" r="3.5" fill="#febc2e" />
          <circle cx="110" cy="41" r="3.5" fill="#28c840" />
          <path d="M90 76h110M90 92h84M90 108h100M90 124h60" opacity=".35" />
        </g>
        <rect x="236" y="54" width="118" height="26" rx="13" fill="#161412" />
        <rect x="248" y="63" width="52" height="8" rx="4" fill="url(#muelle-glow)" stroke="none" />
        <path d="M312 67h28" stroke="#f3efe7" strokeWidth="2.2" strokeLinecap="round" opacity=".7" />
        <rect x="58" y="168" width="304" height="58" rx="22" fill="#fbfaf6" fillOpacity=".9" />
      </g>
      <g stroke="#161412" strokeWidth="1.4">
        <rect x="78" y="186" width="30" height="30" rx="9" fill="#f3efe7" />
        <rect x="116" y="180" width="36" height="36" rx="10" fill="#fff" />
        <rect x="160" y="158" width="58" height="58" rx="16" fill="url(#muelle-glow)" />
        <rect x="226" y="180" width="36" height="36" rx="10" fill="#fff" />
        <rect x="270" y="186" width="30" height="30" rx="9" fill="#f3efe7" />
        <rect x="314" y="186" width="30" height="30" rx="9" fill="#161412" />
      </g>
      <path d="M180 183c6-8 12-8 18 0M175 195c10 9 18 9 28 0" stroke="#161412" strokeWidth="2" strokeLinecap="round" />
      <circle cx="189" cy="223" r="2.4" fill="#161412" />
      <circle cx="134" cy="223" r="2" fill="#161412" opacity=".55" />
      <path d="M200 136l10 14 4-6 8 2" stroke="#161412" strokeWidth="1.6" strokeLinejoin="round" fill="#fff" />
    </svg>
  )
  return (
    <svg viewBox="0 0 420 260" fill="none" aria-hidden="true" focusable="false">
      <ellipse cx="210" cy="236" rx="150" ry="11" fill="#141413" opacity=".25" />
      <g transform="rotate(-5 128 168)">
        <rect x="70" y="126" width="116" height="86" rx="16" fill="#1e1e1d" stroke="#525252" strokeWidth="1.6" />
        <rect x="70" y="126" width="116" height="78" rx="16" fill="#2e2e2d" />
        <text x="96" y="160" fill="#fafafa" fontSize="20" fontFamily="system-ui" fontWeight="600">fn</text>
        <circle cx="154" cy="182" r="7" fill="#dabe4d" />
      </g>
      <g stroke="#dabe4d" strokeWidth="6" strokeLinecap="round">
        {[18, 38, 62, 30, 74, 46, 88, 54, 70, 34, 52, 24, 40, 16].map((h, i) => (
          <path key={i} d={`M${206 + i * 13} ${112 - h / 2}v${h}`} opacity={i % 3 === 2 ? 0.55 : 1} />
        ))}
      </g>
      <g transform="rotate(4 300 196)">
        <rect x="222" y="168" width="170" height="52" rx="12" fill="#fafafa" stroke="#525252" strokeWidth="1.4" />
        <path d="M238 188h96M238 202h60" stroke="#141413" strokeWidth="2.4" strokeLinecap="round" opacity=".75" />
        <path d="M342 184v22" stroke="#dabe4d" strokeWidth="2.6" strokeLinecap="round" />
      </g>
      <path d="M58 70v-16m-8 8h16M372 52v14m-7-7h14" stroke="#a3a3a3" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function ProductsHeroArt() {
  return (
    <div className="station-page-art products-hero-art" aria-hidden="true">
      <svg viewBox="0 0 400 250" fill="none" focusable="false">
        <ellipse cx="203" cy="222" rx="142" ry="13" fill="currentColor" opacity=".06" />
        <g stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
          <rect x="70" y="40" width="262" height="158" rx="16" fill="var(--page-art-paper)" />
          <path d="M70 62h262" />
          <path d="M175 204h52l8 18h-68Z" fill="var(--page-art-paper)" />
          <g transform="rotate(-8 140 120)">
            <rect x="96" y="82" width="92" height="92" rx="22" fill="#f3efe7" />
            <circle cx="128" cy="124" r="13" fill="#161412" />
            <circle cx="131" cy="126" r="4.5" fill="#f3efe7" stroke="none" />
            <circle cx="158" cy="124" r="13" fill="#161412" />
            <circle cx="161" cy="126" r="4.5" fill="#f3efe7" stroke="none" />
          </g>
          <g transform="rotate(7 262 124)">
            <rect x="216" y="78" width="92" height="92" rx="22" fill="#141413" />
            <g stroke="#dabe4d" strokeWidth="5" strokeLinecap="round">
              <path d="M240 112v24M251 104v40M262 116v16M273 100v48M284 110v28" />
            </g>
          </g>
        </g>
        <path d="M346 46v18m-9-9h18M48 168h16m-8-8v16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    </div>
  )
}
