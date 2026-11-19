/**
 * One small ink scene per service, drawn by hand on a soft-yellow organic plate.
 * The plate shapes match the People and Contact portrait plates; the ink stays dark in both themes.
 */
const plates = [
  "M.09,.19 C.18,.01 .48,-.03 .65,.04 C.88,.01 1,.23 .97,.44 C1,.66 .91,.89 .73,.96 C.50,1.04 .17,.99 .06,.83 C-.05,.65 .01,.36 .09,.19Z",
  "M.50,0 C.67,0 .69,.10 .79,.11 C.94,.10 1,.26 .96,.38 C1,.49 1,.59 .95,.68 C.99,.86 .84,1 .69,.96 C.55,1.02 .41,1.02 .30,.96 C.13,1 .01,.86 .06,.69 C-.02,.54 0,.43 .05,.34 C0,.20 .15,.07 .28,.10 C.34,.04 .39,0 .50,0Z",
  "M.03,.36 C.03,.12 .24,-.03 .48,.02 C.70,-.03 .96,.13 .97,.36 L1,.83 C.90,.95 .70,1 .52,.96 C.31,1.02 .08,.97 0,.86Z",
  "M.16,.07 L.78,0 Q.94,0 .98,.18 L.94,.40 L1,.69 Q1,.89 .81,.93 L.57,1 L.31,.94 Q.07,1 .04,.78 L0,.50 L.06,.26 Q.03,.11 .16,.07Z",
] as const

const scenes = [
  // Hackathon: a laptop and a ticking clock.
  <>
    <path d="M36 44 Q36 40 40 40 L86 39 Q90 39 90 43 L91 76 Q91 79 87 79 L39 80 Q36 80 36 76Z" />
    <path d="M27 85 L102 84 Q104 90 98 90 L33 91 Q27 91 27 85Z" />
    <path d="M44 52 q4 -3 8 0 t8 0 t8 0 M44 62 h16 M44 70 h28" />
    <path d="M122 38 a17 17 0 1 0 .1 0Z" />
    <path d="M122 56 V46 M122 56 l8 4 M110 39 q-5 -7 2 -9 M134 39 q5 -7 -2 -9 M114 74 l-3 6 M130 74 l3 6" />
    <path d="M62 20 v10 M57 25 h10 M142 84 v6 M139 87 h6" />
  </>,
  // DevRel and launches: a megaphone and its sound.
  <>
    <path d="M44 52 L90 30 Q97 27 97 35 L97 77 Q97 85 90 82 L44 66 Q38 64 38 59 Q38 54 44 52Z" />
    <path d="M54 68 L60 90 Q61 93 65 92 L71 91 Q74 90 73 86 L69 74" />
    <path d="M108 45 q8 11 0 22 M117 37 q14 21 0 38 M127 28 q19 31 0 56" />
    <path d="M62 24 l3 5 M76 17 v6 M104 22 l-4 5 M46 38 q-4 -3 -2 -8" />
    <circle cx="36" cy="80" r="2" /><circle cx="130" cy="94" r="2" />
  </>,
  // Workshops: a whiteboard with a plan on it.
  <>
    <path d="M30 28 Q30 25 34 25 L127 24 Q130 24 130 28 L131 74 Q131 78 127 78 L33 79 Q30 79 30 75Z" />
    <path d="M52 79 L44 100 M108 79 L116 100 M80 79 V98" />
    <path d="M40 38 q-1 -5 4 -5 h14 q5 0 5 5 v8 q0 5 -5 5 h-14 q-5 0 -4 -5Z" />
    <path d="M66 42 q6 -3 12 0 m-4 -4 l4 4 l-4 4" />
    <path d="M86 42 a9 9 0 1 0 .1 0Z" />
    <path d="M42 62 q10 -8 18 0 t18 0 t18 0 M100 56 l6 8 l12 -14" />
  </>,
  // Open source: a branching tree of commits.
  <>
    <path d="M80 98 V42" />
    <path d="M80 80 Q80 68 100 64 V46" />
    <path d="M80 62 Q80 52 58 48 V36" />
    <circle cx="80" cy="102" r="5" /><circle cx="80" cy="38" r="5" />
    <circle cx="100" cy="42" r="5" /><circle cx="58" cy="32" r="5" />
    <circle cx="80" cy="80" r="3" /><circle cx="80" cy="62" r="3" />
    <path d="M110 80 q8 -5 14 2 q-8 5 -14 -2Z M124 82 l8 4 M36 70 q-8 -5 -14 2 q8 5 14 -2Z M22 72 l-6 4" />
    <path d="M122 30 v8 M118 34 h8" />
  </>,
] as const

export function ServiceArt({ kind }: { kind: 0 | 1 | 2 | 3 }) {
  return (
    <svg className="home-service-art" viewBox="0 0 160 120" aria-hidden="true" focusable="false">
      <path className="home-service-plate" d={plates[kind]} transform="scale(160 120)" />
      <g className="home-service-ink">{scenes[kind]}</g>
    </svg>
  )
}
