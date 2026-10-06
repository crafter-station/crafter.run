import Image from "next/image"

/** The original campaign image stays intact; the ink treatment is CSS-only. */
export function BountyPoster({ src, priority = false }: { src: string; priority?: boolean }) {
  return <div className="bounty-poster">
    <Image src={src} alt="" width={1200} height={630} priority={priority} sizes="(max-width: 700px) 100vw, 700px" />
  </div>
}

/** An original little desk scene: a ticket, a pencil, and a reward waiting to happen. */
export function BountyArtwork() {
  return <svg className="bounty-artwork" viewBox="0 0 440 330" fill="none" aria-hidden="true">
    <ellipse cx="222" cy="283" rx="155" ry="17" fill="currentColor" opacity=".045" />
    <path d="M37 177c-16-56 34-113 89-128M365 84c41 15 58 41 44 76M93 291c-26-7-43-21-51-42" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 7" opacity=".25" />
    <g transform="rotate(-13 208 164)">
      <path d="M83 68h252v42c-22 0-22 30 0 30v112H83V140c22 0 22-30 0-30V68Z" fill="#e6d8be" stroke="#665340" strokeWidth="1.5" />
      <path d="M100 55h252v42c-22 0-22 30 0 30v112H100V127c22 0 22-30 0-30V55Z" fill="#f3e9d3" stroke="#665340" strokeWidth="1.5" />
    </g>
    <g transform="rotate(6 220 172)">
      <path d="M88 85h267v51c-22 0-22 31 0 31v98H88v-98c22 0 22-31 0-31V85Z" fill="#f1c46c" stroke="#76532c" strokeWidth="2" />
      <path d="M285 99v152" stroke="#76532c" strokeWidth="1.5" strokeDasharray="4 6" opacity=".5" />
      <path d="M109 105h155v137H109z" stroke="#76532c" strokeWidth="1.2" opacity=".4" />
      <path d="m186 122 10 19 21-8-5 23 23 7-20 13 10 20-23-1-4 24-16-17-19 14 2-24-24-4 17-16-14-18 24 1Z" fill="#a85f3d" />
      <path d="m173 171 9 9 20-22" stroke="#f8edce" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M143 226h87" stroke="#76532c" strokeWidth="1.5" strokeLinecap="round" />
      <g stroke="#76532c" opacity=".65">
        {[304, 308, 315, 321, 324, 331, 338].map((x, i) => <path key={x} d={`M${x} 112v100`} strokeWidth={i % 2 ? 1 : 3} />)}
      </g>
      <circle cx="319" cy="236" r="9" stroke="#76532c" strokeWidth="1.5" />
    </g>
    <g transform="rotate(27 83 210)">
      <path d="M73 142h18v119l-9 24-9-24V142Z" fill="#e5b184" stroke="#76532c" strokeWidth="1.5" />
      <path d="M73 142h18v20H73z" fill="#b77860" stroke="#76532c" strokeWidth="1.5" />
      <path d="M79 164v92m6-92v92m-7 19 4 10 4-10" stroke="#76532c" strokeWidth="1.5" />
    </g>
    <path d="m351 31 4 14 15 3-15 4-4 14-4-14-14-4 14-3Z" fill="#b46f47" />
    <path d="m42 102 3 9 10 3-10 3-3 9-3-9-10-3 10-3Z" fill="#b46f47" opacity=".65" />
    <circle cx="393" cy="232" r="5" stroke="#b46f47" strokeWidth="1.5" />
    <path d="m376 270 8 8m0-8-8 8" stroke="#b46f47" strokeWidth="2" strokeLinecap="round" />
  </svg>
}
