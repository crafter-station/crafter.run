/** A little kit of things to take home: a pass, a card, and a peeled sticker. */
export function MakeablesArtwork() {
  return (
    <svg className="home-makeables-art" viewBox="0 0 520 440" fill="none" aria-hidden="true" focusable="false">
      <ellipse cx="266" cy="389" rx="187" ry="18" fill="#55476a" opacity=".06" />
      <path d="M108 98c-39 15-56 47-45 83M412 286c40-18 57-46 47-79" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 8" opacity=".3" />
      <g transform="rotate(13 350 220)">
        <rect x="255" y="100" width="187" height="246" rx="12" fill="#c6b8d6" stroke="#695773" strokeWidth="1.5" />
        <rect x="270" y="116" width="157" height="215" rx="3" stroke="#695773" strokeWidth="1.5" opacity=".4" />
        <path d="m300 157 65 31 33-29-8 96-69-3-21-95Z" fill="#eee8f1" stroke="#695773" strokeWidth="1.5" />
        <path d="m300 157 40 50 58-48m-58 48-19 45m19-45 50 48" stroke="#695773" strokeWidth="1.5" />
        <path d="M296 283h104m-104 13h67" stroke="#695773" strokeWidth="2" strokeLinecap="round" opacity=".5" />
      </g>
      <path d="M191 105c-43-37-48-80-17-86 24-4 37 30 46 86" stroke="#8c806a" strokeWidth="13" />
      <path d="M191 105c-43-37-48-80-17-86 24-4 37 30 46 86" stroke="#d9ccab" strokeWidth="9" />
      <g transform="rotate(-9 218 241)">
        <rect x="100" y="95" width="222" height="289" rx="18" fill="#4b403c" opacity=".08" transform="translate(5 7)" />
        <rect x="100" y="95" width="222" height="289" rx="18" fill="#f3df99" stroke="#7b6a42" strokeWidth="1.5" />
        <rect x="181" y="113" width="60" height="10" rx="5" fill="#a9986c" />
        <path d="M119 144h184" stroke="#7b6a42" strokeWidth="1.5" opacity=".35" />
        <image href="/station/crafter-symbol.svg" x="165" y="169" width="95" height="95" opacity=".88" />
        <text x="211" y="311" textAnchor="middle" fill="#514731" fontFamily="var(--font-display)" fontSize="34">Crafter</text>
        <path d="M126 335h169" stroke="#7b6a42" strokeWidth="1.5" strokeDasharray="3 5" opacity=".4" />
        {[136, 145, 154, 169, 179, 188, 200, 214, 223, 232, 247, 257, 268, 284].map((x, i) =>
          <path key={x} d={`M${x} 350v15`} stroke="#7b6a42" strokeWidth={i % 3 ? 2 : 4} />,
        )}
      </g>
      <g transform="rotate(12 371 341)">
        <path d="m375 266 15 14 20-4 7 20 19 9-5 21 10 17-15 15-2 21-21 3-14 15-19-10-21 4-9-20-18-8 3-21-11-17 16-15 1-21 21-4 13-14Z" fill="#f8f6ef" stroke="#7b8674" strokeWidth="1.5" />
        <circle cx="375" cy="336" r="48" fill="#c7d4b8" />
        <path d="m351 336 16 17 30-35" stroke="#53634d" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="m408 372-8-24 25 7" fill="#e4e5d9" stroke="#7b8674" strokeWidth="1.5" strokeLinejoin="round" />
      </g>
      <path d="M419 61v23m-11-12h23M67 301v18m-9-9h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity=".55" />
      <circle cx="373" cy="50" r="4" fill="#a28db3" />
    </svg>
  )
}
