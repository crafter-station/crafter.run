/** Original, lightweight editorial covers. No external images or animation. */
export function journalCover(slug: string) {
  if (slug.includes("magic")) return "magic"
  if (slug.includes("free-tier")) return "meter"
  if (slug.includes("whatsapp")) return "conversation"
  if (slug.includes("coding-agent")) return "toolbox"
  if (slug.includes("agents-can-read")) return "pages"
  return "signal"
}

export function JournalArtwork({ slug }: { slug: string }) {
  const cover = journalCover(slug)
  return <svg viewBox="0 0 420 290" fill="none" className={`journal-art journal-art-${cover}`} aria-hidden="true">
    <g stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="215" cy="240" rx="125" ry="14" fill="currentColor" opacity=".07" stroke="none" />
      {cover === "magic" && <>
        <path d="m77 119 84-44 174 77-82 46Z" fill="var(--cover-paper)" />
        <path d="m77 119 176 79v44L77 163Zm176 79 82-46v44l-82 46Z" fill="var(--cover-accent)" />
        <path d="m99 139 126 57m46 10 41-22M253 219v-21" />
        <path d="m137 109 67-36 69 31-66 35Z" fill="var(--cover-accent)" />
        <path d="M137 109v41l70 32 66-36v-42m-66 35v43" />
        <path d="m181 101-11 6 12 5m52-11 12 5-12 6m-20-18-13 25" strokeWidth="3" />
        <path d="m221 28 7 20 20 7-20 7-7 20-7-20-20-7 20-7Z" fill="var(--cover-paper)" />
        <path d="m301 70 4 12 12 4-12 4-4 12-4-12-12-4 12-4ZM95 51v16m-8-8h16" />
        <path d="m286 119 40-43M102 101l-8-17m80-17-6-16" strokeDasharray="3 6" />
      </>}
      {cover === "meter" && <>
        <path d="m91 211 191-82 62 39-190 84Z" fill="var(--cover-accent)" />
        <path d="M125 198V77l16-10 15 9 16-10 15 9 16-10 15 9 16-10v121l-16 10-15-9-16 10-15-9-16 10-15-9Z" fill="var(--cover-paper)" />
        <path d="m144 103 70-9m-70 29 70-9m-70 29 39-5m-39 29 70-9" />
        <path d="m257 167 20-9v-35l-20 9Zm35-15 20-9V93l-20 9Zm35-15 20-9V58l-20 9Z" fill="var(--cover-accent)" />
        <path d="m251 101 83-65m-23 4 23-4-4 23" strokeWidth="2.4" />
        <circle cx="105" cy="52" r="12" /><path d="M105 46v12m-4-3h8" />
      </>}
      {cover === "conversation" && <>
        <path d="M48 64h163v92H95l-29 24v-24H48Z" fill="var(--cover-paper)" transform="rotate(-8 130 110)" />
        <path d="M199 125h164v91h-23v25l-34-25H199Z" fill="var(--cover-accent)" transform="rotate(6 280 180)" />
        <path d="m87 99 89-12m-87 32 62-9m145 54 52 5m-54 17 77 8" strokeWidth="3" />
        <path d="M91 198c-6 40 59 53 89 15m-17 2 17-2-4 17M319 92c-3-38-49-53-79-22m2-17-2 17 18-2" strokeDasharray="4 5" />
        <circle cx="202" cy="54" r="7" fill="currentColor" />
      </>}
      {cover === "toolbox" && <>
        <path d="m88 130 139-47 106 59-139 48Z" fill="var(--cover-paper)" />
        <path d="M88 130v65l106 59v-64Zm106 60 139-48v65l-139 47Z" fill="var(--cover-accent)" />
        <path d="m210 207 43-15v17l-43 15ZM113 168l55 30" />
        <path d="m121 131 10-76 38 5-10 87Z" fill="var(--cover-accent)" />
        <path d="m140 54 10-23 10 25m-28 14 34 5" />
        <path d="m213 153 25-61-7-23 19-24 7 25 14 6 18-18-2 30-22 10-24 65Z" fill="var(--cover-paper)" />
        <path d="m279 116 32-39m-15 2 15-2 1 17M91 80H72m9-9v18" />
      </>}
      {cover === "pages" && <>
        {[2, 1, 0].map(i => <g key={i} transform={`translate(${i * 17} ${i * 15})`}>
          <path d="M100 54h154l30 31v125H100Z" fill={i ? "var(--cover-accent)" : "var(--cover-paper)"} />
          {i === 0 && <><path d="M254 54v32h30M121 83h39m-39 74h78m-78 18h102m-102 18h55" />
            <path d="m151 105-14 13 14 13m75-26 14 13-14 13m-29-30-13 37" strokeWidth="3" /></>}
        </g>)}
        <circle cx="325" cy="70" r="25" fill="var(--cover-accent)" />
        <path d="M316 70h18m-9-9v18M77 227h-16m8-8v16" />
      </>}
      {cover === "signal" && <>
        <ellipse cx="208" cy="209" rx="97" ry="21" fill="var(--cover-accent)" />
        <path d="M269 126c62-7 53 62-3 57" strokeWidth="8" />
        <path d="M134 121h138v50c0 57-138 57-138 0Z" fill="var(--cover-paper)" />
        <ellipse cx="203" cy="121" rx="69" ry="18" fill="var(--cover-accent)" />
        <path d="M179 89c-26-24 17-29 0-57m47 57c-25-25 18-28 0-57" />
        <path d="m184 154-11 9 11 9m39-18 11 9-11 9m-17-23-9 30" strokeWidth="3" />
        <path d="M305 73h18m-9-9v18M95 117H81m7-7v14" />
      </>}
      <path d="M49 236h16m-8-8v16M352 41h12m-6-6v12" opacity=".45" />
    </g>
  </svg>
}
