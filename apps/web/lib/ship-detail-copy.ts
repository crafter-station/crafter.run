import type { Locale } from "@/lib/i18n"

export type ShipDetailCopy = {
  crumb: string
  published: string
  visit: string
  repository: string
  demo: string
  package: string
  post: string
  share: string
  about: string
  updates: string
  updatesLead: string
  noUpdates: string
  updateSocial: string
  maker: string
  profile: string
  moreFrom: string
  ownerTools: string
  ownerNote: string
  edit: string
  sync: string
  syncing: string
  composer: {
    open: string
    title: string
    description: string
    image: string
    socialPost: string
    publish: string
    publishing: string
    expired: string
    failed: string
  }
}

export const shipDetailCopy: Record<Locale, ShipDetailCopy> = {
  en: {
    crumb: "Ships",
    published: "Published {date}",
    visit: "Visit site",
    repository: "Repository",
    demo: "Demo",
    package: "Package",
    post: "Post",
    share: "Share on WhatsApp",
    about: "About this Ship",
    updates: "Updates",
    updatesLead: "Every release and change, newest first.",
    noUpdates: "No updates yet. New releases and changes will show up here.",
    updateSocial: "View post",
    maker: "Maker",
    profile: "View profile",
    moreFrom: "More from {name}",
    ownerTools: "Owner tools",
    ownerNote: "Only you see this.",
    edit: "Edit Ship",
    sync: "Sync releases",
    syncing: "Syncing...",
    composer: {
      open: "Post an update",
      title: "Title",
      description: "What changed? Markdown works.",
      image: "Picture (optional)",
      socialPost: "Social post URL (optional)",
      publish: "Publish update",
      publishing: "Publishing...",
      expired: "Your session expired.",
      failed: "Could not publish the update.",
    },
  },
  es: {
    crumb: "Ships",
    published: "Publicado el {date}",
    visit: "Visitar sitio",
    repository: "Repositorio",
    demo: "Demo",
    package: "Paquete",
    post: "Publicación",
    share: "Compartir en WhatsApp",
    about: "Sobre este Ship",
    updates: "Actualizaciones",
    updatesLead: "Cada versión y cambio, del más reciente al más antiguo.",
    noUpdates: "Aún no hay actualizaciones. Las nuevas versiones y cambios aparecerán aquí.",
    updateSocial: "Ver publicación",
    maker: "Creador",
    profile: "Ver perfil",
    moreFrom: "Más de {name}",
    ownerTools: "Herramientas del creador",
    ownerNote: "Solo tú ves esto.",
    edit: "Editar Ship",
    sync: "Sincronizar versiones",
    syncing: "Sincronizando...",
    composer: {
      open: "Publicar una actualización",
      title: "Título",
      description: "¿Qué cambió? Puedes usar Markdown.",
      image: "Imagen (opcional)",
      socialPost: "URL de la publicación social (opcional)",
      publish: "Publicar actualización",
      publishing: "Publicando...",
      expired: "Tu sesión expiró.",
      failed: "No se pudo publicar la actualización.",
    },
  },
  pt: {
    crumb: "Ships",
    published: "Publicado em {date}",
    visit: "Visitar site",
    repository: "Repositório",
    demo: "Demo",
    package: "Pacote",
    post: "Publicação",
    share: "Compartilhar no WhatsApp",
    about: "Sobre este Ship",
    updates: "Atualizações",
    updatesLead: "Cada versão e mudança, da mais recente para a mais antiga.",
    noUpdates: "Ainda não há atualizações. Novas versões e mudanças aparecerão aqui.",
    updateSocial: "Ver publicação",
    maker: "Criador",
    profile: "Ver perfil",
    moreFrom: "Mais de {name}",
    ownerTools: "Ferramentas do criador",
    ownerNote: "Só você vê isto.",
    edit: "Editar Ship",
    sync: "Sincronizar versões",
    syncing: "Sincronizando...",
    composer: {
      open: "Publicar uma atualização",
      title: "Título",
      description: "O que mudou? Você pode usar Markdown.",
      image: "Imagem (opcional)",
      socialPost: "URL da publicação social (opcional)",
      publish: "Publicar atualização",
      publishing: "Publicando...",
      expired: "Sua sessão expirou.",
      failed: "Não foi possível publicar a atualização.",
    },
  },
  zh: {
    crumb: "Ships",
    published: "发布于 {date}",
    visit: "访问网站",
    repository: "代码仓库",
    demo: "演示",
    package: "软件包",
    post: "帖子",
    share: "分享到 WhatsApp",
    about: "关于这个 Ship",
    updates: "更新",
    updatesLead: "每次发布和改动，最新的在前。",
    noUpdates: "暂无更新。新的版本和改动会显示在这里。",
    updateSocial: "查看帖子",
    maker: "创作者",
    profile: "查看主页",
    moreFrom: "{name} 的更多作品",
    ownerTools: "创作者工具",
    ownerNote: "只有你能看到。",
    edit: "编辑 Ship",
    sync: "同步发布版本",
    syncing: "同步中...",
    composer: {
      open: "发布更新",
      title: "标题",
      description: "有什么变化？支持 Markdown。",
      image: "图片（可选）",
      socialPost: "社交媒体帖子链接（可选）",
      publish: "发布更新",
      publishing: "发布中...",
      expired: "你的登录已过期。",
      failed: "无法发布更新。",
    },
  },
  ja: {
    crumb: "Ships",
    published: "{date} に公開",
    visit: "サイトを見る",
    repository: "リポジトリ",
    demo: "デモ",
    package: "パッケージ",
    post: "投稿",
    share: "WhatsApp で共有",
    about: "この Ship について",
    updates: "アップデート",
    updatesLead: "リリースと変更を新しい順に表示します。",
    noUpdates: "アップデートはまだありません。新しいリリースや変更はここに表示されます。",
    updateSocial: "投稿を見る",
    maker: "制作者",
    profile: "プロフィールを見る",
    moreFrom: "{name} の他の Ship",
    ownerTools: "制作者ツール",
    ownerNote: "あなただけに表示されます。",
    edit: "Ship を編集",
    sync: "リリースを同期",
    syncing: "同期中...",
    composer: {
      open: "アップデートを投稿",
      title: "タイトル",
      description: "何が変わりましたか？Markdown が使えます。",
      image: "画像（任意）",
      socialPost: "SNS投稿URL（任意）",
      publish: "アップデートを公開",
      publishing: "公開中...",
      expired: "セッションの有効期限が切れました。",
      failed: "アップデートを公開できませんでした。",
    },
  },
}
