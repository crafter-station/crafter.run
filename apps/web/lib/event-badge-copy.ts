import { hotReloadBadgeCopy } from "@/lib/hot-reload-badge-copy"
import type { Locale } from "@/lib/i18n"

type Override = Pick<typeof hotReloadBadgeCopy.en, "title" | "intro" | "titleName" | "stampLocked" | "errorEarly" | "shareTitle" | "shareDescription" | "shareText" | "shareTextLinkedIn">

/** Event badges share Hot Reload's badge copy; only the event-specific lines change. `{event}` is the badge name. */
const overrides: Record<Locale, Override> = {
  en: {
    title: "Your {event} badge", titleName: "{event}",
    intro: "Your collectible from {event}. Adjust your name and photo, then stamp it to share.",
    stampLocked: "Stamping opens {date}", errorEarly: "You can stamp your badge once the event starts.",
    shareTitle: "{name}'s {event} badge", shareDescription: "Badge Nº {number} · {event}.",
    shareText: "I was at {event} with the Codex community and @crafterstation. Here's my badge Nº {number}.",
    shareTextLinkedIn: "I was at {event} with the Codex community and Crafter Station (https://www.linkedin.com/company/crafter-station). Here's my badge Nº {number}.",
  },
  es: {
    title: "Tu badge de {event}", titleName: "{event}",
    intro: "Tu coleccionable de {event}. Ajusta tu nombre y tu foto, y luego estámpalo para compartirlo.",
    stampLocked: "El sello se habilita el {date}", errorEarly: "Podrás estampar tu badge cuando empiece el evento.",
    shareTitle: "Badge de {event} de {name}", shareDescription: "Badge Nº {number} · {event}.",
    shareText: "Estuve en {event} con la comunidad de Codex y @crafterstation. Este es mi badge Nº {number}.",
    shareTextLinkedIn: "Estuve en {event} con la comunidad de Codex y Crafter Station (https://www.linkedin.com/company/crafter-station). Este es mi badge Nº {number}.",
  },
  pt: {
    title: "Seu badge do {event}", titleName: "{event}",
    intro: "Seu colecionável do {event}. Ajuste seu nome e sua foto e depois carimbe para compartilhar.",
    stampLocked: "O carimbo abre em {date}", errorEarly: "Você poderá carimbar seu badge quando o evento começar.",
    shareTitle: "Badge do {event} de {name}", shareDescription: "Badge Nº {number} · {event}.",
    shareText: "Estive no {event} com a comunidade do Codex e @crafterstation. Este é meu badge Nº {number}.",
    shareTextLinkedIn: "Estive no {event} com a comunidade do Codex e a Crafter Station (https://www.linkedin.com/company/crafter-station). Este é meu badge Nº {number}.",
  },
  zh: {
    title: "你的 {event} 徽章", titleName: "{event}",
    intro: "你的 {event} 收藏徽章。调整姓名和照片，然后盖章分享。",
    stampLocked: "盖章将于 {date} 开放", errorEarly: "活动开始后即可为徽章盖章。",
    shareTitle: "{name} 的 {event} 徽章", shareDescription: "徽章 Nº {number} · {event}。",
    shareText: "我和 Codex 社区以及 @crafterstation 一起参加了 {event}。这是我的徽章 Nº {number}。",
    shareTextLinkedIn: "我和 Codex 社区以及 Crafter Station (https://www.linkedin.com/company/crafter-station) 一起参加了 {event}。这是我的徽章 Nº {number}。",
  },
  ja: {
    title: "{event} のバッジ", titleName: "{event}",
    intro: "{event} のコレクタブルバッジです。名前と写真を調整して、スタンプを押してシェアしましょう。",
    stampLocked: "スタンプは {date} に解放されます", errorEarly: "イベント開始後にバッジへスタンプを押せます。",
    shareTitle: "{name} の {event} バッジ", shareDescription: "バッジ Nº {number} · {event}。",
    shareText: "Codex コミュニティと @crafterstation と一緒に {event} に参加しました。私のバッジ Nº {number} です。",
    shareTextLinkedIn: "Codex コミュニティと Crafter Station (https://www.linkedin.com/company/crafter-station) と一緒に {event} に参加しました。私のバッジ Nº {number} です。",
  },
}

export function eventBadgeCopy(locale: Locale, event: string) {
  const fill = (text: string) => text.replaceAll("{event}", event)
  const override = Object.fromEntries(Object.entries(overrides[locale]).map(([key, value]) => [key, fill(value)])) as Override
  return { ...hotReloadBadgeCopy[locale], ...override }
}
