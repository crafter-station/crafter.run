import type { Locale } from "@/lib/i18n"

export type PaletteCopy = {
  trigger: string
  title: string
  description: string
  placeholder: string
  empty: string
  loading: string
  pages: string
  ships: string
  crafters: string
  docs: string
  events: string
  navigate: string
  open: string
  close: string
}

export const commandPaletteCopy: Record<Locale, PaletteCopy> = {
  en: {
    trigger: "Search", title: "Command palette", description: "Jump to a page, Ship, crafter, doc or event.",
    placeholder: "Search pages, Ships, crafters, docs, events…", empty: "Nothing matches that.", loading: "Loading…",
    pages: "Pages", ships: "Ships", crafters: "Crafters", docs: "Docs", events: "Events", navigate: "move", open: "open", close: "close",
  },
  es: {
    trigger: "Buscar", title: "Paleta de comandos", description: "Salta a una página, Ship, crafter, doc o evento.",
    placeholder: "Busca páginas, Ships, crafters, docs, eventos…", empty: "Nada coincide.", loading: "Cargando…",
    pages: "Páginas", ships: "Ships", crafters: "Crafters", docs: "Docs", events: "Eventos", navigate: "mover", open: "abrir", close: "cerrar",
  },
  pt: {
    trigger: "Buscar", title: "Paleta de comandos", description: "Vá para uma página, Ship, crafter, doc ou evento.",
    placeholder: "Busque páginas, Ships, crafters, docs, eventos…", empty: "Nada corresponde.", loading: "Carregando…",
    pages: "Páginas", ships: "Ships", crafters: "Crafters", docs: "Docs", events: "Eventos", navigate: "mover", open: "abrir", close: "fechar",
  },
  zh: {
    trigger: "搜索", title: "命令面板", description: "跳转到页面、Ship、crafter、文档或活动。",
    placeholder: "搜索页面、Ships、crafters、文档、活动…", empty: "没有匹配项。", loading: "加载中…",
    pages: "页面", ships: "Ships", crafters: "Crafters", docs: "文档", events: "活动", navigate: "移动", open: "打开", close: "关闭",
  },
  ja: {
    trigger: "検索", title: "コマンドパレット", description: "ページ、Ship、crafter、ドキュメント、イベントへ移動します。",
    placeholder: "ページ、Ships、crafters、ドキュメント、イベントを検索…", empty: "一致するものがありません。", loading: "読み込み中…",
    pages: "ページ", ships: "Ships", crafters: "Crafters", docs: "ドキュメント", events: "イベント", navigate: "移動", open: "開く", close: "閉じる",
  },
}

/** What `/api/command-index` returns: only what the palette needs to list and open an entry. */
export type PaletteIndex = {
  ships: { slug: string; name: string; maker: string }[]
  crafters: { handle: string; name: string }[]
  docs: { path: string; title: string }[]
  events: { title: string; href: string; date: string }[]
}
