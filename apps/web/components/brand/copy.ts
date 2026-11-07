/**
 * Logo system copy for /brand, all five locales. The hero, metadata and usage
 * note stay in `pages.brand` in the message catalogs.
 */
import type { Locale } from "@/lib/i18n"

export type BrandCopy = {
  eyebrow: string
  title: string
  intro: string
  tiers: string
  primary: string
  primaryNote: string
  horizontal: string
  horizontalNote: string
  symbol: string
  symbolNote: string
  avatar: string
  avatarNote: string
  scale: string
  scaleNote: string
  favicon: string
  tests: string
  testsNote: string
  oneInk: string
  reversed: string
  squint: string
  onAccent: string
  motion: string
  motionNote: string
  downloads: string
  downloadsNote: string
  wordmark: string
  onLight: string
  onDark: string
  download: string
  allFormats: string
  primarySpec: string
}

export const brandCopy: Record<Locale, BrandCopy> = {
  en: {
    eyebrow: "Crafter / Logo system",
    title: "One mark, every size.",
    intro: "The lockup in the sidebar is the primary logo. Every other version comes from it: the same knot, the same Crafter Sans Bucle, the same ink.",
    tiers: "Tiers",
    primary: "Primary lockup",
    primaryNote: "Sidebar, footer, slides and partner pages.",
    horizontal: "Horizontal lockup",
    horizontalNote: "Narrow headers and one-line bars.",
    symbol: "Symbol",
    symbolNote: "When the name already appears nearby.",
    avatar: "Avatar",
    avatarNote: "Profile pictures and app icons.",
    scale: "Real scale",
    scaleNote: "Rendered at actual pixel size, never scaled up for the page.",
    favicon: "Favicon",
    tests: "Stress tests",
    testsNote: "A logo that only works in full color on a perfect background is not done yet.",
    oneInk: "One ink",
    reversed: "Reversed",
    squint: "Squint, 3 px blur",
    onAccent: "On accent",
    motion: "Motion",
    motionNote: "The mark is one continuous loop, so it draws itself once and settles. The last frame is the static logo, and reduced motion skips straight to it.",
    downloads: "Downloads",
    downloadsNote: "Outlined SVG, plus PNG, WebP and JPG. Light files go on light backgrounds and dark files on dark ones.",
    wordmark: "Wordmark",
    onLight: "On light",
    onDark: "On dark",
    download: "Download logo",
    allFormats: "All formats",
    primarySpec: "Primary lockup / Crafter Sans Bucle 500 / mark 32, gap 10, type 21",
  },
  es: {
    eyebrow: "Crafter / Sistema de logo",
    title: "Una marca, todos los tamaños.",
    intro: "El lockup del sidebar es el logo principal. Todas las demás versiones salen de él: el mismo nudo, la misma Crafter Sans Bucle, la misma tinta.",
    tiers: "Niveles",
    primary: "Lockup principal",
    primaryNote: "Sidebar, footer, slides y páginas de aliados.",
    horizontal: "Lockup horizontal",
    horizontalNote: "Headers angostos y barras de una línea.",
    symbol: "Símbolo",
    symbolNote: "Cuando el nombre ya aparece cerca.",
    avatar: "Avatar",
    avatarNote: "Fotos de perfil e íconos de app.",
    scale: "Escala real",
    scaleNote: "Renderizado al tamaño real en píxeles, nunca agrandado para la página.",
    favicon: "Favicon",
    tests: "Pruebas de estrés",
    testsNote: "Un logo que solo funciona a todo color sobre un fondo perfecto todavía no está terminado.",
    oneInk: "Una tinta",
    reversed: "Invertido",
    squint: "Entrecerrar, blur de 3 px",
    onAccent: "Sobre acento",
    motion: "Movimiento",
    motionNote: "La marca es un solo trazo continuo, así que se dibuja una vez y se asienta. El último frame es el logo estático, y con movimiento reducido se salta directo a él.",
    downloads: "Descargas",
    downloadsNote: "SVG con outlines, más PNG, WebP y JPG. Los archivos light van sobre fondos claros y los dark sobre fondos oscuros.",
    wordmark: "Wordmark",
    onLight: "Sobre claro",
    onDark: "Sobre oscuro",
    download: "Descargar logo",
    allFormats: "Todos los formatos",
    primarySpec: "Lockup principal / Crafter Sans Bucle 500 / mark 32, gap 10, texto 21",
  },
  pt: {
    eyebrow: "Crafter / Sistema de logo",
    title: "Uma marca, todos os tamanhos.",
    intro: "O lockup da barra lateral é o logo principal. Todas as outras versões vêm dele: o mesmo nó, a mesma Crafter Sans Bucle, a mesma tinta.",
    tiers: "Níveis",
    primary: "Lockup principal",
    primaryNote: "Barra lateral, rodapé, slides e páginas de parceiros.",
    horizontal: "Lockup horizontal",
    horizontalNote: "Cabeçalhos estreitos e barras de uma linha.",
    symbol: "Símbolo",
    symbolNote: "Quando o nome já aparece por perto.",
    avatar: "Avatar",
    avatarNote: "Fotos de perfil e ícones de app.",
    scale: "Escala real",
    scaleNote: "Renderizado no tamanho real em pixels, nunca ampliado para a página.",
    favicon: "Favicon",
    tests: "Testes de estresse",
    testsNote: "Um logo que só funciona em cores sobre um fundo perfeito ainda não está pronto.",
    oneInk: "Uma tinta",
    reversed: "Invertido",
    squint: "Apertar os olhos, blur de 3 px",
    onAccent: "Sobre o acento",
    motion: "Movimento",
    motionNote: "A marca é um único laço contínuo, então se desenha uma vez e assenta. O último quadro é o logo estático, e com movimento reduzido ele aparece direto.",
    downloads: "Downloads",
    downloadsNote: "SVG em contornos, além de PNG, WebP e JPG. Arquivos light vão em fundos claros e dark em fundos escuros.",
    wordmark: "Wordmark",
    onLight: "Sobre claro",
    onDark: "Sobre escuro",
    download: "Baixar logo",
    allFormats: "Todos os formatos",
    primarySpec: "Lockup principal / Crafter Sans Bucle 500 / marca 32, espaço 10, texto 21",
  },
  zh: {
    eyebrow: "Crafter / 标志系统",
    title: "一个标志，适配所有尺寸。",
    intro: "侧边栏中的组合标志就是主标志。其他版本都由它衍生：同一个结，同一款 Crafter Sans Bucle，同一种墨色。",
    tiers: "层级",
    primary: "主组合标志",
    primaryNote: "侧边栏、页脚、演示文稿和合作伙伴页面。",
    horizontal: "横向组合标志",
    horizontalNote: "窄页眉和单行横栏。",
    symbol: "图形标志",
    symbolNote: "名称已在附近出现时使用。",
    avatar: "头像",
    avatarNote: "个人头像和应用图标。",
    scale: "实际尺寸",
    scaleNote: "按实际像素尺寸渲染，不为页面放大。",
    favicon: "网站图标",
    tests: "压力测试",
    testsNote: "只能在完美背景上以全彩呈现的标志，还没有完成。",
    oneInk: "单色",
    reversed: "反白",
    squint: "眯眼测试，3 px 模糊",
    onAccent: "强调色背景",
    motion: "动效",
    motionNote: "标志是一条连续的环，所以它会把自己画一遍再停住。最后一帧就是静态标志，开启减少动态效果时直接显示。",
    downloads: "下载",
    downloadsNote: "轮廓化 SVG，以及 PNG、WebP 和 JPG。light 文件用于浅色背景，dark 文件用于深色背景。",
    wordmark: "文字标志",
    onLight: "浅色背景",
    onDark: "深色背景",
    download: "下载标志",
    allFormats: "全部格式",
    primarySpec: "主组合标志 / Crafter Sans Bucle 500 / 标志 32，间距 10，文字 21",
  },
  ja: {
    eyebrow: "Crafter / ロゴシステム",
    title: "ひとつのマーク、すべてのサイズに。",
    intro: "サイドバーのロックアップがメインのロゴです。ほかのすべての版はここから生まれます。同じ結び目、同じ Crafter Sans Bucle、同じインク。",
    tiers: "階層",
    primary: "メインロックアップ",
    primaryNote: "サイドバー、フッター、スライド、パートナーページ。",
    horizontal: "横組みロックアップ",
    horizontalNote: "幅の狭いヘッダーや一行のバー。",
    symbol: "シンボル",
    symbolNote: "名前がすぐ近くにあるとき。",
    avatar: "アバター",
    avatarNote: "プロフィール画像とアプリアイコン。",
    scale: "実寸",
    scaleNote: "実際のピクセルサイズで表示し、ページのために拡大しません。",
    favicon: "ファビコン",
    tests: "ストレステスト",
    testsNote: "完璧な背景のフルカラーでしか成立しないロゴは、まだ完成していません。",
    oneInk: "単色",
    reversed: "反転",
    squint: "目を細める、3 px ぼかし",
    onAccent: "アクセント上",
    motion: "モーション",
    motionNote: "マークはひとつながりのループなので、一度だけ自分を描いて落ち着きます。最後のフレームは静止ロゴで、視差効果を減らす設定ではそのまま表示します。",
    downloads: "ダウンロード",
    downloadsNote: "アウトライン化した SVG と PNG、WebP、JPG。light は明るい背景、dark は暗い背景に使います。",
    wordmark: "ワードマーク",
    onLight: "明るい背景",
    onDark: "暗い背景",
    download: "ロゴをダウンロード",
    allFormats: "すべての形式",
    primarySpec: "メインロックアップ / Crafter Sans Bucle 500 / マーク 32、間隔 10、文字 21",
  },
}
