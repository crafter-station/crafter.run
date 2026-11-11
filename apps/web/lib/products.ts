import type { Locale } from "@/lib/i18n"

type Text = Record<Locale, string>

export type Product = {
  slug: "ojito" | "maca"
  name: string
  url: string
  platform: string
  status: Text
  tagline: Text
  description: Text
  features: Record<Locale, string[]>
  cta: Text
}

/** Products built and shipped by Crafter Station. Copy follows each product's own landing. */
export const products: Product[] = [
  {
    slug: "ojito",
    name: "Ojito",
    url: "https://ojito.dev",
    platform: "macOS",
    status: { en: "Private beta", es: "Beta privada", pt: "Beta privado", zh: "内测中", ja: "プライベートベータ" },
    tagline: {
      en: "Everything you saw, one ⌘⌘ away.",
      es: "Todo lo que viste, a un ⌘⌘.",
      pt: "Tudo o que você viu, a um ⌘⌘.",
      zh: "看过的一切，只需 ⌘⌘。",
      ja: "見たものすべてを ⌘⌘ ひとつで。",
    },
    description: {
      en: "A menu bar app that saves what is on your screen with its full content, and lets your coding agent read it.",
      es: "Una app de menu bar que guarda lo que tienes en pantalla con todo su contenido, y deja que tu agente de código lo lea.",
      pt: "Um app de barra de menus que salva o que está na sua tela com todo o conteúdo e deixa seu agente de código lê-lo.",
      zh: "一款菜单栏应用，保存屏幕上的内容及其完整信息，并让你的编程代理读取。",
      ja: "画面に表示されているものを内容ごと保存し、コーディングエージェントが読めるようにするメニューバーアプリ。",
    },
    features: {
      en: ["⌘⌘ saves the whole thing, not a screenshot", "⌥⌥ finds it by what it said", "One MCP for any coding agent"],
      es: ["⌘⌘ guarda todo el contenido, no solo un screenshot", "⌥⌥ lo encuentra por lo que decía", "Un MCP para cualquier agente de código"],
      pt: ["⌘⌘ salva o conteúdo inteiro, não só um screenshot", "⌥⌥ encontra pelo que dizia", "Um MCP para qualquer agente de código"],
      zh: ["⌘⌘ 保存完整内容，而不只是截图", "⌥⌥ 按内容找到它", "一个 MCP，适配任何编程代理"],
      ja: ["⌘⌘ でスクリーンショットではなく内容ごと保存", "⌥⌥ で書かれていた言葉から探せる", "どのコーディングエージェントにも使える MCP"],
    },
    cta: { en: "Join the beta", es: "Únete a la beta", pt: "Entre no beta", zh: "加入内测", ja: "ベータに参加" },
  },
  {
    slug: "maca",
    name: "Maca",
    url: "https://maca.sh",
    platform: "macOS",
    status: { en: "Free to start", es: "Gratis para empezar", pt: "Grátis para começar", zh: "免费开始", ja: "無料で始められます" },
    tagline: {
      en: "Hold Fn, speak, and your words are typed anywhere.",
      es: "Mantén Fn, habla, y tus palabras se escriben donde estés.",
      pt: "Segure Fn, fale, e suas palavras são digitadas em qualquer lugar.",
      zh: "按住 Fn 说话，文字即刻输入到任何地方。",
      ja: "Fn を押して話すだけで、どこにでも文字が入力されます。",
    },
    description: {
      en: "Voice to text for your Mac. It listens, cleans up your words and pastes polished text where your cursor is.",
      es: "Voz a texto para tu Mac. Escucha, limpia tus palabras y pega el texto pulido donde está tu cursor.",
      pt: "Voz para texto no seu Mac. Ele escuta, limpa suas palavras e cola o texto revisado onde está o cursor.",
      zh: "Mac 上的语音转文字。它会聆听、整理你的话，并把润色后的文字粘贴到光标所在处。",
      ja: "Mac のための音声入力。聞き取って言葉を整え、カーソルの位置に仕上がったテキストを貼り付けます。",
    },
    features: {
      en: ["One hotkey: hold to speak, release to paste", "Works in every app on your Mac", "Cleans up filler and delivers what you meant"],
      es: ["Un solo atajo: mantén para hablar, suelta para pegar", "Funciona en todas las apps de tu Mac", "Limpia las muletillas y entrega lo que querías decir"],
      pt: ["Um atalho: segure para falar, solte para colar", "Funciona em todos os apps do seu Mac", "Limpa as hesitações e entrega o que você quis dizer"],
      zh: ["一个快捷键：按住说话，松开粘贴", "适用于 Mac 上的所有应用", "去除口头禅，表达你的本意"],
      ja: ["ひとつのキー：押して話し、離して貼り付け", "Mac のすべてのアプリで使えます", "言いよどみを整えて、伝えたい内容に"],
    },
    cta: { en: "Try Maca", es: "Probar Maca", pt: "Experimentar Maca", zh: "试用 Maca", ja: "Maca を試す" },
  },
]

export const productsCopy: Record<Locale, { name: string; eyebrow: string; title: string; description: string; madeBy: string }> = {
  en: { name: "Products", eyebrow: "Products", title: "Tools we build and use every day.", description: "Apps made at Crafter Station for people who work with their computer and their agents.", madeBy: "Made by Crafter Station" },
  es: { name: "Productos", eyebrow: "Productos", title: "Herramientas que construimos y usamos a diario.", description: "Apps hechas en Crafter Station para quienes trabajan con su computadora y sus agentes.", madeBy: "Hecho por Crafter Station" },
  pt: { name: "Produtos", eyebrow: "Produtos", title: "Ferramentas que construímos e usamos todos os dias.", description: "Apps feitos na Crafter Station para quem trabalha com o computador e com seus agentes.", madeBy: "Feito pela Crafter Station" },
  zh: { name: "产品", eyebrow: "产品", title: "我们打造并每天使用的工具。", description: "Crafter Station 为与电脑和代理协作的人打造的应用。", madeBy: "由 Crafter Station 打造" },
  ja: { name: "プロダクト", eyebrow: "プロダクト", title: "私たちが作り、毎日使っているツール。", description: "コンピューターとエージェントで働く人のために Crafter Station が作ったアプリ。", madeBy: "Crafter Station 製" },
}
