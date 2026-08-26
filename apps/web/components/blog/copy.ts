/**
 * Blog UI copy, all five locales.
 *
 * Lives beside the components rather than in `messages/*.json` because most of
 * it is read by the blog routes only, and several labels are functions of a
 * number, which the message catalog cannot express. The hero (eyebrow, title,
 * description) and the page metadata stay in `pages.blog` in the catalog, as
 * on every other page.
 *
 * The shape is declared explicitly so each locale is checked against the
 * contract rather than against English's literal strings.
 */
import type { BlogKind } from "@/lib/blog"
import type { Locale } from "@/lib/i18n"

export type BlogCopy = {
  breadcrumbBlog: string
  empty: string
  backToIndex: string
  publishedOn: string
  updatedOn: string
  writtenBy: string
  subscribe: string
  readAsMarkdown: string
  readPost: string
  /** Shown on an index entry that is rendered in another language. */
  availableIn: string
  pageLabel: string
  archiveTitle: (page: number) => string
  archiveDescription: (page: number) => string
  kinds: Record<BlogKind, string>
  /** Index filter row. Client-rendered, so plain strings only. */
  nav: {
    all: string
    filterLabel: string
    searchLabel: string
    searchPlaceholder: string
    searchEmpty: string
  }
  showMore: string
  previous: string
  next: string
  pageOf: (page: number, total: number) => string
  readingTime: (minutes: number) => string
  rail: {
    published: string
    updated: string
    reading: string
    kind: string
    authors: string
    share: string
  }
  /** Post meta rail copy menu. Client-rendered; same constraint as `nav`. */
  copyMenu: {
    label: string
    copied: string
    link: string
    markdown: string
    text: string
  }
  article: {
    sectionAnchor: string
    copyCode: string
    copiedCode: string
  }
  more: {
    eyebrow: string
    title: string
  }
  cta: {
    eyebrow: string
    title: string
    body: string
    primary: string
    secondary: string
  }
  feed: {
    title: string
    subtitle: string
  }
  /** Hero panel: the machine-readable surfaces, named for humans. */
  surfaces: {
    feed: string
    markdownIndex: string
    agents: string
  }
  markdown: {
    published: string
    updated: string
    authors: string
    more: string
    allPosts: string
    sitemapTitle: string
    sitemapIntro: (total: number) => string
  }
  /** Locale names, for the "available in" label. */
  languages: Record<Locale, string>
}

const languages: Record<Locale, Record<Locale, string>> = {
  en: { en: "English", es: "Spanish", pt: "Portuguese", zh: "Chinese", ja: "Japanese" },
  es: { en: "inglés", es: "español", pt: "portugués", zh: "chino", ja: "japonés" },
  pt: { en: "inglês", es: "espanhol", pt: "português", zh: "chinês", ja: "japonês" },
  zh: { en: "英文", es: "西班牙文", pt: "葡萄牙文", zh: "中文", ja: "日文" },
  ja: { en: "英語", es: "スペイン語", pt: "ポルトガル語", zh: "中国語", ja: "日本語" },
}

const en: BlogCopy = {
  breadcrumbBlog: "Blog",
  empty: "Nothing published yet. The first post is on its way.",
  backToIndex: "All posts",
  publishedOn: "Published",
  updatedOn: "Updated",
  writtenBy: "By",
  subscribe: "Subscribe via RSS",
  readAsMarkdown: "Read as markdown",
  readPost: "Read",
  availableIn: "In",
  pageLabel: "Page",
  archiveTitle: (page) => `Blog · page ${page}`,
  archiveDescription: (page) =>
    `Page ${page} of the Crafter Station blog: engineering notes, community stories, and product lessons from LatAm builders.`,
  kinds: {
    engineering: "Engineering",
    community: "Community",
    product: "Product",
    research: "Research",
  },
  nav: {
    all: "All",
    filterLabel: "Filter by topic",
    searchLabel: "Search the blog",
    searchPlaceholder: "Search posts",
    searchEmpty: "No posts match that search.",
  },
  showMore: "Older posts",
  previous: "Newer",
  next: "Older",
  pageOf: (page, total) => `Page ${page} of ${total}`,
  readingTime: (minutes) => `${minutes} min read`,
  rail: {
    published: "Published",
    updated: "Updated",
    reading: "Reading time",
    kind: "Topic",
    authors: "Written by",
    share: "Share",
  },
  copyMenu: {
    label: "Copy",
    copied: "Copied",
    link: "Copy link",
    markdown: "Copy as Markdown link",
    text: "Copy title",
  },
  article: {
    sectionAnchor: "Link to this section",
    copyCode: "Copy code",
    copiedCode: "Copied",
  },
  more: {
    eyebrow: "Keep reading",
    title: "More from the blog",
  },
  cta: {
    eyebrow: "Join the network",
    title: "Built by the people shipping LatAm.",
    body: "Crafter Station is a WhatsApp-first network of engineers, designers, and founders building across the region. The posts start here; the conversation continues in the community.",
    primary: "Join the community",
    secondary: "All posts",
  },
  feed: {
    title: "Crafter Station Blog",
    subtitle:
      "Engineering notes, community stories, and product lessons from Crafter Station and the builders around it.",
  },
  markdown: {
    published: "Published",
    updated: "Updated",
    authors: "Authors",
    more: "More posts",
    allPosts: "View every post on the Crafter Station blog",
    sitemapTitle: "Crafter Station Blog",
    sitemapIntro: (total) =>
      `Markdown index of all ${total} posts on the Crafter Station blog, for agents and models. Append .md to any post URL to read it as markdown.`,
  },
  surfaces: {
    feed: "Atom feed",
    markdownIndex: "Markdown index",
    agents: "For agents",
  },
  languages: languages.en,
}

const es: BlogCopy = {
  breadcrumbBlog: "Blog",
  empty: "Todavía no hay nada publicado. El primer post viene en camino.",
  backToIndex: "Todos los posts",
  publishedOn: "Publicado",
  updatedOn: "Actualizado",
  writtenBy: "Por",
  subscribe: "Suscribirse por RSS",
  readAsMarkdown: "Leer en markdown",
  readPost: "Leer",
  availableIn: "En",
  pageLabel: "Página",
  archiveTitle: (page) => `Blog · página ${page}`,
  archiveDescription: (page) =>
    `Página ${page} del blog de Crafter Station: notas de ingeniería, historias de la comunidad y lecciones de producto de builders de LatAm.`,
  kinds: {
    engineering: "Ingeniería",
    community: "Comunidad",
    product: "Producto",
    research: "Research",
  },
  nav: {
    all: "Todo",
    filterLabel: "Filtrar por tema",
    searchLabel: "Buscar en el blog",
    searchPlaceholder: "Buscar posts",
    searchEmpty: "Ningún post coincide con la búsqueda.",
  },
  showMore: "Posts anteriores",
  previous: "Más recientes",
  next: "Más antiguos",
  pageOf: (page, total) => `Página ${page} de ${total}`,
  readingTime: (minutes) => `${minutes} min de lectura`,
  rail: {
    published: "Publicado",
    updated: "Actualizado",
    reading: "Tiempo de lectura",
    kind: "Tema",
    authors: "Escrito por",
    share: "Compartir",
  },
  copyMenu: {
    label: "Copiar",
    copied: "Copiado",
    link: "Copiar enlace",
    markdown: "Copiar como enlace Markdown",
    text: "Copiar el título",
  },
  article: {
    sectionAnchor: "Enlace a esta sección",
    copyCode: "Copiar código",
    copiedCode: "Copiado",
  },
  more: {
    eyebrow: "Sigue leyendo",
    title: "Más del blog",
  },
  cta: {
    eyebrow: "Únete a la red",
    title: "Construido por la gente que está shippeando LatAm.",
    body: "Crafter Station es una red WhatsApp-first de ingenieros, diseñadores y founders construyendo en toda la región. Los posts empiezan aquí; la conversación sigue en la comunidad.",
    primary: "Únete a la comunidad",
    secondary: "Todos los posts",
  },
  feed: {
    title: "Blog de Crafter Station",
    subtitle:
      "Notas de ingeniería, historias de la comunidad y lecciones de producto de Crafter Station y los builders que la rodean.",
  },
  markdown: {
    published: "Publicado",
    updated: "Actualizado",
    authors: "Autores",
    more: "Más posts",
    allPosts: "Ver todos los posts del blog de Crafter Station",
    sitemapTitle: "Blog de Crafter Station",
    sitemapIntro: (total) =>
      `Índice en markdown de los ${total} posts del blog de Crafter Station, pensado para agentes y modelos. Agrega .md a la URL de cualquier post para leerlo en markdown.`,
  },
  surfaces: {
    feed: "Feed Atom",
    markdownIndex: "Índice en markdown",
    agents: "Para agentes",
  },
  languages: languages.es,
}

const pt: BlogCopy = {
  breadcrumbBlog: "Blog",
  empty: "Nada publicado ainda. O primeiro post está a caminho.",
  backToIndex: "Todos os posts",
  publishedOn: "Publicado",
  updatedOn: "Atualizado",
  writtenBy: "Por",
  subscribe: "Assinar via RSS",
  readAsMarkdown: "Ler em markdown",
  readPost: "Ler",
  availableIn: "Em",
  pageLabel: "Página",
  archiveTitle: (page) => `Blog · página ${page}`,
  archiveDescription: (page) =>
    `Página ${page} do blog da Crafter Station: notas de engenharia, histórias da comunidade e lições de produto de builders do LatAm.`,
  kinds: {
    engineering: "Engenharia",
    community: "Comunidade",
    product: "Produto",
    research: "Research",
  },
  nav: {
    all: "Tudo",
    filterLabel: "Filtrar por tema",
    searchLabel: "Buscar no blog",
    searchPlaceholder: "Buscar posts",
    searchEmpty: "Nenhum post corresponde à busca.",
  },
  showMore: "Posts anteriores",
  previous: "Mais recentes",
  next: "Mais antigos",
  pageOf: (page, total) => `Página ${page} de ${total}`,
  readingTime: (minutes) => `${minutes} min de leitura`,
  rail: {
    published: "Publicado",
    updated: "Atualizado",
    reading: "Tempo de leitura",
    kind: "Tema",
    authors: "Escrito por",
    share: "Compartilhar",
  },
  copyMenu: {
    label: "Copiar",
    copied: "Copiado",
    link: "Copiar link",
    markdown: "Copiar como link Markdown",
    text: "Copiar o título",
  },
  article: {
    sectionAnchor: "Link para esta seção",
    copyCode: "Copiar código",
    copiedCode: "Copiado",
  },
  more: {
    eyebrow: "Continue lendo",
    title: "Mais do blog",
  },
  cta: {
    eyebrow: "Entre na rede",
    title: "Construído pelas pessoas que estão shippando o LatAm.",
    body: "A Crafter Station é uma rede WhatsApp-first de engenheiros, designers e founders construindo em toda a região. Os posts começam aqui; a conversa continua na comunidade.",
    primary: "Entre na comunidade",
    secondary: "Todos os posts",
  },
  feed: {
    title: "Blog da Crafter Station",
    subtitle:
      "Notas de engenharia, histórias da comunidade e lições de produto da Crafter Station e dos builders ao redor.",
  },
  markdown: {
    published: "Publicado",
    updated: "Atualizado",
    authors: "Autores",
    more: "Mais posts",
    allPosts: "Ver todos os posts do blog da Crafter Station",
    sitemapTitle: "Blog da Crafter Station",
    sitemapIntro: (total) =>
      `Índice em markdown dos ${total} posts do blog da Crafter Station, pensado para agentes e modelos. Adicione .md à URL de qualquer post para lê-lo em markdown.`,
  },
  surfaces: {
    feed: "Feed Atom",
    markdownIndex: "Índice em markdown",
    agents: "Para agentes",
  },
  languages: languages.pt,
}

const zh: BlogCopy = {
  breadcrumbBlog: "博客",
  empty: "还没有发布任何内容。第一篇文章即将上线。",
  backToIndex: "全部文章",
  publishedOn: "发布于",
  updatedOn: "更新于",
  writtenBy: "作者",
  subscribe: "通过 RSS 订阅",
  readAsMarkdown: "以 markdown 阅读",
  readPost: "阅读",
  availableIn: "语言",
  pageLabel: "页",
  archiveTitle: (page) => `博客 · 第 ${page} 页`,
  archiveDescription: (page) =>
    `Crafter Station 博客第 ${page} 页：来自拉美 builder 的工程笔记、社区故事和产品经验。`,
  kinds: {
    engineering: "工程",
    community: "社区",
    product: "产品",
    research: "研究",
  },
  nav: {
    all: "全部",
    filterLabel: "按主题筛选",
    searchLabel: "搜索博客",
    searchPlaceholder: "搜索文章",
    searchEmpty: "没有匹配的文章。",
  },
  showMore: "更早的文章",
  previous: "更新",
  next: "更早",
  pageOf: (page, total) => `第 ${page} 页，共 ${total} 页`,
  readingTime: (minutes) => `阅读约 ${minutes} 分钟`,
  rail: {
    published: "发布",
    updated: "更新",
    reading: "阅读时间",
    kind: "主题",
    authors: "作者",
    share: "分享",
  },
  copyMenu: {
    label: "复制",
    copied: "已复制",
    link: "复制链接",
    markdown: "复制为 Markdown 链接",
    text: "复制标题",
  },
  article: {
    sectionAnchor: "本节链接",
    copyCode: "复制代码",
    copiedCode: "已复制",
  },
  more: {
    eyebrow: "继续阅读",
    title: "更多文章",
  },
  cta: {
    eyebrow: "加入网络",
    title: "由正在 ship 拉美的人构建。",
    body: "Crafter Station 是一个以 WhatsApp 为主的网络，汇聚在整个地区构建的工程师、设计师和创始人。文章从这里开始，对话在社区里继续。",
    primary: "加入社区",
    secondary: "全部文章",
  },
  feed: {
    title: "Crafter Station 博客",
    subtitle: "来自 Crafter Station 及周围 builder 的工程笔记、社区故事和产品经验。",
  },
  markdown: {
    published: "发布",
    updated: "更新",
    authors: "作者",
    more: "更多文章",
    allPosts: "查看 Crafter Station 博客的全部文章",
    sitemapTitle: "Crafter Station 博客",
    sitemapIntro: (total) =>
      `Crafter Station 博客全部 ${total} 篇文章的 markdown 索引，面向智能体和模型。在任意文章 URL 后加 .md 即可以 markdown 阅读。`,
  },
  surfaces: {
    feed: "Atom 订阅",
    markdownIndex: "Markdown 索引",
    agents: "面向智能体",
  },
  languages: languages.zh,
}

const ja: BlogCopy = {
  breadcrumbBlog: "ブログ",
  empty: "まだ公開された記事はありません。最初の記事は準備中です。",
  backToIndex: "すべての記事",
  publishedOn: "公開日",
  updatedOn: "更新日",
  writtenBy: "著者",
  subscribe: "RSS で購読",
  readAsMarkdown: "markdown で読む",
  readPost: "読む",
  availableIn: "言語",
  pageLabel: "ページ",
  archiveTitle: (page) => `ブログ · ${page} ページ目`,
  archiveDescription: (page) =>
    `Crafter Station ブログの ${page} ページ目。ラテンアメリカのビルダーによるエンジニアリングノート、コミュニティの物語、プロダクトの学び。`,
  kinds: {
    engineering: "エンジニアリング",
    community: "コミュニティ",
    product: "プロダクト",
    research: "リサーチ",
  },
  nav: {
    all: "すべて",
    filterLabel: "テーマで絞り込む",
    searchLabel: "ブログを検索",
    searchPlaceholder: "記事を検索",
    searchEmpty: "一致する記事がありません。",
  },
  showMore: "以前の記事",
  previous: "新しい",
  next: "古い",
  pageOf: (page, total) => `${total} ページ中 ${page} ページ目`,
  readingTime: (minutes) => `読了 ${minutes} 分`,
  rail: {
    published: "公開",
    updated: "更新",
    reading: "読了時間",
    kind: "テーマ",
    authors: "著者",
    share: "共有",
  },
  copyMenu: {
    label: "コピー",
    copied: "コピーしました",
    link: "リンクをコピー",
    markdown: "Markdown リンクとしてコピー",
    text: "タイトルをコピー",
  },
  article: {
    sectionAnchor: "このセクションへのリンク",
    copyCode: "コードをコピー",
    copiedCode: "コピーしました",
  },
  more: {
    eyebrow: "続けて読む",
    title: "ブログの他の記事",
  },
  cta: {
    eyebrow: "ネットワークに参加",
    title: "ラテンアメリカをシップしている人たちが作っています。",
    body: "Crafter Station は、地域全体で開発するエンジニア、デザイナー、ファウンダーが集まる WhatsApp ファーストのネットワークです。記事はここから始まり、会話はコミュニティで続きます。",
    primary: "コミュニティに参加",
    secondary: "すべての記事",
  },
  feed: {
    title: "Crafter Station ブログ",
    subtitle:
      "Crafter Station とその周りのビルダーによるエンジニアリングノート、コミュニティの物語、プロダクトの学び。",
  },
  markdown: {
    published: "公開",
    updated: "更新",
    authors: "著者",
    more: "他の記事",
    allPosts: "Crafter Station ブログのすべての記事を見る",
    sitemapTitle: "Crafter Station ブログ",
    sitemapIntro: (total) =>
      `Crafter Station ブログの全 ${total} 記事の markdown インデックス。エージェントとモデル向け。記事の URL に .md を付けると markdown で読めます。`,
  },
  surfaces: {
    feed: "Atom フィード",
    markdownIndex: "Markdown インデックス",
    agents: "エージェント向け",
  },
  languages: languages.ja,
}

export const blogCopy: Record<Locale, BlogCopy> = { en, es, pt, zh, ja }
