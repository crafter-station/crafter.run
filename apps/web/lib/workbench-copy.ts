import type { Locale } from "@/lib/i18n"

export const workbenchTileIds = ["tinte", "petdex", "agentfiles", "ship", "badge", "ticket", "knot", "countdown"] as const
export type WorkbenchTileId = (typeof workbenchTileIds)[number]

type Caption = { title: string; text: string }

export type WorkbenchCopy = {
  navLabel: string
  label: string
  title: string
  lede: string
  hint: string
  tiles: Record<WorkbenchTileId, Caption>
  ui: {
    theme: string
    pet: string
    pets: string
    moods: [idle: string, happy: string, sleepy: string]
    chars: string
    lines: string
    words: string
    tokens: string
    editing: string
    tools: string
    upvote: string
    unvote: string
    localOnly: string
    sampleShip: string
    sampleTagline: string
    by: string
    spins: string
    pointer: string
    noField: string
    days: string
    hours: string
    minutes: string
    seconds: string
    live: string
    yourTime: string
    limaTime: string
    nextEvent: string
    none: string
  }
}

export const workbenchCopy: Record<Locale, WorkbenchCopy> = {
  en: {
    navLabel: "Workbench",
    label: "Workbench",
    title: "Live parts from the station.",
    lede: "Demos built from our open source and this site. Poke each one: the caption says what it does, the chips say what powers it.",
    hint: "Press",
    tiles: {
      tinte: { title: "Swap the theme.", text: "One source of truth, four palettes, every token follows." },
      petdex: { title: "Pet the pet.", text: "It watches your cursor and purrs when you click." },
      agentfiles: { title: "Edit the agent file.", text: "Counts move as you type, one buffer per tool." },
      ship: { title: "Upvote a Ship.", text: "Real community work. The vote stays on your device." },
      badge: { title: "Spin the crema.", text: "Hover or click and the espresso turns." },
      ticket: { title: "Hold the next ticket.", text: "The next hack0 event, straight from the calendar feed." },
      knot: { title: "Push the halftone.", text: "The Crafter knot as a field that bends around your pointer." },
      countdown: { title: "Count down to the next event.", text: "Ticks every second, in your own timezone." },
    },
    ui: {
      theme: "Theme", pet: "Pet the pet", pets: "pets", moods: ["watching", "purr", "zzz"],
      chars: "chars", lines: "lines", words: "words", tokens: "tokens ≈", editing: "Edit the file", tools: "Tool",
      upvote: "Upvote this Ship", unvote: "Remove your upvote", localOnly: "local only", sampleShip: "Your Ship here",
      sampleTagline: "Publish what you build and it shows up on this wall.", by: "by",
      spins: "spins", pointer: "pointer", noField: "WebGPU is off: showing the outline.",
      days: "d", hours: "h", minutes: "m", seconds: "s", live: "Happening now", yourTime: "your time", limaTime: "Lima time",
      nextEvent: "Next event", none: "No upcoming event",
    },
  },
  es: {
    navLabel: "Workbench",
    label: "Workbench",
    title: "Piezas vivas de la estación.",
    lede: "Demos hechas con nuestro código abierto y este sitio. Toca cada una: el texto dice qué hace y los chips qué la mueve.",
    hint: "Presiona",
    tiles: {
      tinte: { title: "Cambia el tema.", text: "Una sola fuente de verdad, cuatro paletas, todos los tokens la siguen." },
      petdex: { title: "Acaricia la mascota.", text: "Mira tu cursor y ronronea cuando haces clic." },
      agentfiles: { title: "Edita el archivo del agente.", text: "Los conteos se mueven mientras escribes, un buffer por herramienta." },
      ship: { title: "Vota un Ship.", text: "Trabajo real de la comunidad. El voto se queda en tu dispositivo." },
      badge: { title: "Gira la crema.", text: "Pasa el cursor o haz clic y el espresso gira." },
      ticket: { title: "Sostén el próximo ticket.", text: "El próximo evento de hack0, directo del calendario." },
      knot: { title: "Empuja el halftone.", text: "El nudo de Crafter como un campo que se curva alrededor de tu puntero." },
      countdown: { title: "Cuenta atrás al próximo evento.", text: "Avanza cada segundo, en tu propia zona horaria." },
    },
    ui: {
      theme: "Tema", pet: "Acaricia la mascota", pets: "caricias", moods: ["mirando", "purr", "zzz"],
      chars: "caracteres", lines: "líneas", words: "palabras", tokens: "tokens ≈", editing: "Edita el archivo", tools: "Herramienta",
      upvote: "Votar este Ship", unvote: "Quitar tu voto", localOnly: "solo local", sampleShip: "Tu Ship aquí",
      sampleTagline: "Publica lo que construyes y aparece en este muro.", by: "por",
      spins: "giros", pointer: "puntero", noField: "WebGPU está apagado: se muestra el contorno.",
      days: "d", hours: "h", minutes: "m", seconds: "s", live: "Está pasando", yourTime: "tu hora", limaTime: "hora de Lima",
      nextEvent: "Próximo evento", none: "Sin eventos próximos",
    },
  },
  pt: {
    navLabel: "Workbench",
    label: "Workbench",
    title: "Peças vivas da estação.",
    lede: "Demos feitas com nosso código aberto e este site. Toque em cada uma: a legenda diz o que faz e os chips o que a move.",
    hint: "Pressione",
    tiles: {
      tinte: { title: "Troque o tema.", text: "Uma única fonte de verdade, quatro paletas, todos os tokens acompanham." },
      petdex: { title: "Faça carinho no pet.", text: "Ele segue seu cursor e ronrona quando você clica." },
      agentfiles: { title: "Edite o arquivo do agente.", text: "As contagens mudam enquanto você digita, um buffer por ferramenta." },
      ship: { title: "Vote em um Ship.", text: "Trabalho real da comunidade. O voto fica no seu dispositivo." },
      badge: { title: "Gire a crema.", text: "Passe o cursor ou clique e o espresso gira." },
      ticket: { title: "Segure o próximo ingresso.", text: "O próximo evento do hack0, direto do calendário." },
      knot: { title: "Empurre o halftone.", text: "O nó da Crafter como um campo que se curva ao redor do seu ponteiro." },
      countdown: { title: "Conte até o próximo evento.", text: "Avança a cada segundo, no seu próprio fuso horário." },
    },
    ui: {
      theme: "Tema", pet: "Faça carinho no pet", pets: "carinhos", moods: ["olhando", "purr", "zzz"],
      chars: "caracteres", lines: "linhas", words: "palavras", tokens: "tokens ≈", editing: "Edite o arquivo", tools: "Ferramenta",
      upvote: "Votar neste Ship", unvote: "Remover seu voto", localOnly: "apenas local", sampleShip: "Seu Ship aqui",
      sampleTagline: "Publique o que você constrói e ele aparece neste mural.", by: "por",
      spins: "giros", pointer: "ponteiro", noField: "WebGPU desligado: mostrando o contorno.",
      days: "d", hours: "h", minutes: "m", seconds: "s", live: "Acontecendo agora", yourTime: "seu horário", limaTime: "horário de Lima",
      nextEvent: "Próximo evento", none: "Sem eventos próximos",
    },
  },
  zh: {
    navLabel: "Workbench",
    label: "Workbench",
    title: "来自空间站的实时组件。",
    lede: "用我们的开源项目和本站搭出的演示。随手试试：说明告诉你它做什么，标签告诉你它由什么驱动。",
    hint: "按",
    tiles: {
      tinte: { title: "切换主题。", text: "单一数据源，四套配色，所有 token 同步变化。" },
      petdex: { title: "摸摸宠物。", text: "它会看着你的光标，点击时发出呼噜声。" },
      agentfiles: { title: "编辑 agent 文件。", text: "输入时计数实时变化，每个工具一份缓冲。" },
      ship: { title: "给 Ship 投票。", text: "真实的社区作品。投票只保存在你的设备上。" },
      badge: { title: "转动咖啡油脂。", text: "悬停或点击，浓缩咖啡就转起来。" },
      ticket: { title: "拿起下一张票。", text: "hack0 的下一场活动，直接来自日历源。" },
      knot: { title: "推动半色调。", text: "Crafter 的结，是一片会绕着指针弯曲的场。" },
      countdown: { title: "倒数下一场活动。", text: "每秒更新，使用你自己的时区。" },
    },
    ui: {
      theme: "主题", pet: "摸摸宠物", pets: "次", moods: ["在看", "呼噜", "zzz"],
      chars: "字符", lines: "行", words: "词", tokens: "tokens ≈", editing: "编辑文件", tools: "工具",
      upvote: "为这个 Ship 投票", unvote: "取消投票", localOnly: "仅本地", sampleShip: "你的 Ship 在这里",
      sampleTagline: "发布你做的东西，它就会出现在这面墙上。", by: "作者",
      spins: "圈", pointer: "指针", noField: "WebGPU 未开启：显示轮廓。",
      days: "天", hours: "时", minutes: "分", seconds: "秒", live: "正在进行", yourTime: "你的时间", limaTime: "利马时间",
      nextEvent: "下一场活动", none: "暂无即将举行的活动",
    },
  },
  ja: {
    navLabel: "Workbench",
    label: "Workbench",
    title: "ステーションの動く部品。",
    lede: "私たちのオープンソースとこのサイトで作ったデモです。触ってみてください。キャプションが動作を、チップが仕組みを説明します。",
    hint: "押す:",
    tiles: {
      tinte: { title: "テーマを切り替える。", text: "ひとつの正本、4つのパレット、すべてのトークンが追従します。" },
      petdex: { title: "ペットをなでる。", text: "カーソルを目で追い、クリックするとゴロゴロ鳴きます。" },
      agentfiles: { title: "エージェントファイルを編集する。", text: "入力に合わせてカウントが動き、ツールごとにバッファを持ちます。" },
      ship: { title: "Ship に投票する。", text: "コミュニティの本物の作品。投票は端末内にだけ残ります。" },
      badge: { title: "クレマを回す。", text: "ホバーかクリックでエスプレッソが回ります。" },
      ticket: { title: "次のチケットを持つ。", text: "hack0 の次のイベントを、カレンダーから直接。" },
      knot: { title: "ハーフトーンを押す。", text: "Crafter の結び目が、ポインタに沿ってたわむフィールドになります。" },
      countdown: { title: "次のイベントまでカウントダウン。", text: "1秒ごとに更新、あなたのタイムゾーンで。" },
    },
    ui: {
      theme: "テーマ", pet: "ペットをなでる", pets: "回", moods: ["見てる", "ゴロゴロ", "zzz"],
      chars: "文字", lines: "行", words: "語", tokens: "トークン ≈", editing: "ファイルを編集", tools: "ツール",
      upvote: "この Ship に投票", unvote: "投票を取り消す", localOnly: "ローカルのみ", sampleShip: "あなたの Ship をここに",
      sampleTagline: "作ったものを公開すると、この壁に並びます。", by: "作成",
      spins: "回転", pointer: "ポインタ", noField: "WebGPU がオフです。輪郭を表示しています。",
      days: "日", hours: "時間", minutes: "分", seconds: "秒", live: "開催中", yourTime: "あなたの時間", limaTime: "リマ時間",
      nextEvent: "次のイベント", none: "予定されたイベントなし",
    },
  },
}
