import type { Locale } from "@/lib/i18n"

type JobsCopy = {
  label: string
  claim: string
  lede: string
  post: string
  bounty: string
  openLabel: string
  openTitle: string
  openLede: string
  openCount: (count: number) => string
  emptyTitle: string
  emptyBody: string
  moreRoles: (count: number) => string
  noShips: string
  latestShips: string
  profile: string
  settingsCta: string
  postLabel: string
  postTitle: string
  postLede: string
  freeNote: string
  fields: { company: string; title: string; location: string; locationHint: string; link: string; email: string; notes: string; notesHint: string; optional: string }
  submit: string
  sending: string
  sent: string
  errors: { invalid: string; limited: string; unavailable: string }
  soon: string
  featuredTitle: string
  featuredBody: string
  bountyTitle: string
  bountyBody: string
  bountyCta: string
  buildersLabel: string
  buildersTitle: string
  buildersBody: string
  buildersCta: string
}

export const jobsCopy: Record<Locale, JobsCopy> = {
  en: {
    label: "Jobs",
    claim: "Hire LATAM builders who already ship.",
    lede: "Crafter Station is a community of 1,000+ engineers, designers and founders across LATAM. Post a role, or browse the builders who are open to work, with the things they have shipped.",
    post: "Post a role",
    bounty: "Hire through a bounty",
    openLabel: "Open to work",
    openTitle: "Builders open to work",
    openLede: "Crafters who turned on open to work in their profile. Every tile links to their public profile and Ships.",
    openCount: (count) => `${count} open to work`,
    emptyTitle: "Nobody is open to work right now.",
    emptyBody: "Builders turn this on in their profile settings. When they do, they show up here with their Ships.",
    moreRoles: (count) => `+${count} more`,
    noShips: "No Ships yet",
    latestShips: "Latest Ships",
    profile: "View profile",
    settingsCta: "Turn on open to work",
    postLabel: "Post a role",
    postTitle: "Tell us who you are hiring.",
    postLede: "Your first role is free. We read every submission by hand and reply by email before anything is published.",
    freeNote: "First role free. Reviewed by hand.",
    fields: { company: "Company", title: "Role title", location: "Location or remote", locationHint: "For example: Remote, LATAM", link: "Link to the job", email: "Contact email", notes: "Notes", notesHint: "Seniority, stack, salary range, anything useful.", optional: "optional" },
    submit: "Send role",
    sending: "Sending",
    sent: "Received. We will review it and reply by email.",
    errors: { invalid: "Check the fields: the job link must start with https:// and the email must be valid.", limited: "Too many submissions from this connection. Try again in a while.", unavailable: "We could not send your role. Try again, or email railly@crafterstation.com." },
    soon: "Coming soon",
    featuredTitle: "Featured roles",
    featuredBody: "Pinned on this page and shared with the community. We are shaping it with the first companies that post.",
    bountyTitle: "Hiring bounty",
    bountyBody: "Skip the resume pile. Publish a challenge on your API, see what builders ship, and hire the best entry.",
    bountyCta: "See how bounties work",
    buildersLabel: "For builders",
    buildersTitle: "Looking for work?",
    buildersBody: "Turn on open to work in your profile and add the roles you want. Companies browsing this page see your Ships first.",
    buildersCta: "Open my profile settings",
  },
  es: {
    label: "Empleos",
    claim: "Contrata builders de LATAM que ya publican.",
    lede: "Crafter Station es una comunidad de más de 1,000 ingenieros, diseñadores y founders de LATAM. Publica un rol, o mira a los builders que están abiertos a trabajar, con lo que ya han publicado.",
    post: "Publicar un rol",
    bounty: "Contratar con un bounty",
    openLabel: "Abiertos a trabajar",
    openTitle: "Builders abiertos a trabajar",
    openLede: "Crafters que activaron abierto a trabajar en su perfil. Cada ficha lleva a su perfil público y a sus Ships.",
    openCount: (count) => `${count} abiertos a trabajar`,
    emptyTitle: "Por ahora nadie está abierto a trabajar.",
    emptyBody: "Los builders lo activan en los ajustes de su perfil. Cuando lo hagan, aparecen aquí con sus Ships.",
    moreRoles: (count) => `+${count} más`,
    noShips: "Aún sin Ships",
    latestShips: "Últimos Ships",
    profile: "Ver perfil",
    settingsCta: "Activar abierto a trabajar",
    postLabel: "Publicar un rol",
    postTitle: "Cuéntanos a quién buscas.",
    postLede: "Tu primer rol es gratis. Leemos cada envío a mano y respondemos por correo antes de publicar nada.",
    freeNote: "Primer rol gratis. Revisado a mano.",
    fields: { company: "Empresa", title: "Título del rol", location: "Ubicación o remoto", locationHint: "Por ejemplo: Remoto, LATAM", link: "Link a la oferta", email: "Correo de contacto", notes: "Notas", notesHint: "Seniority, stack, rango salarial, lo que ayude.", optional: "opcional" },
    submit: "Enviar rol",
    sending: "Enviando",
    sent: "Recibido. Lo revisamos y te respondemos por correo.",
    errors: { invalid: "Revisa los campos: el link debe empezar con https:// y el correo debe ser válido.", limited: "Demasiados envíos desde esta conexión. Intenta de nuevo en un rato.", unavailable: "No pudimos enviar tu rol. Intenta de nuevo o escribe a railly@crafterstation.com." },
    soon: "Próximamente",
    featuredTitle: "Roles destacados",
    featuredBody: "Fijados en esta página y compartidos con la comunidad. Lo estamos definiendo con las primeras empresas que publiquen.",
    bountyTitle: "Bounty de contratación",
    bountyBody: "Evita la pila de CVs. Publica un reto sobre tu API, mira qué construyen los builders y contrata la mejor entrega.",
    bountyCta: "Cómo funcionan los bounties",
    buildersLabel: "Para builders",
    buildersTitle: "¿Buscas trabajo?",
    buildersBody: "Activa abierto a trabajar en tu perfil y agrega los roles que quieres. Las empresas que visitan esta página ven primero tus Ships.",
    buildersCta: "Abrir ajustes de mi perfil",
  },
  pt: {
    label: "Vagas",
    claim: "Contrate builders da LATAM que já entregam.",
    lede: "A Crafter Station é uma comunidade com mais de 1.000 engenheiros, designers e founders da LATAM. Publique uma vaga, ou veja os builders abertos a trabalhar, com o que eles já entregaram.",
    post: "Publicar uma vaga",
    bounty: "Contratar com um bounty",
    openLabel: "Abertos a trabalhar",
    openTitle: "Builders abertos a trabalhar",
    openLede: "Crafters que ativaram aberto a trabalhar no perfil. Cada card leva ao perfil público e aos Ships.",
    openCount: (count) => `${count} abertos a trabalhar`,
    emptyTitle: "Ninguém está aberto a trabalhar agora.",
    emptyBody: "Os builders ativam isso nas configurações do perfil. Quando ativarem, aparecem aqui com seus Ships.",
    moreRoles: (count) => `+${count} mais`,
    noShips: "Ainda sem Ships",
    latestShips: "Últimos Ships",
    profile: "Ver perfil",
    settingsCta: "Ativar aberto a trabalhar",
    postLabel: "Publicar uma vaga",
    postTitle: "Conte quem você quer contratar.",
    postLede: "Sua primeira vaga é grátis. Lemos cada envio à mão e respondemos por e-mail antes de publicar qualquer coisa.",
    freeNote: "Primeira vaga grátis. Revisada à mão.",
    fields: { company: "Empresa", title: "Título da vaga", location: "Local ou remoto", locationHint: "Por exemplo: Remoto, LATAM", link: "Link da vaga", email: "E-mail de contato", notes: "Notas", notesHint: "Senioridade, stack, faixa salarial, o que ajudar.", optional: "opcional" },
    submit: "Enviar vaga",
    sending: "Enviando",
    sent: "Recebido. Vamos revisar e responder por e-mail.",
    errors: { invalid: "Revise os campos: o link deve começar com https:// e o e-mail deve ser válido.", limited: "Envios demais desta conexão. Tente de novo daqui a pouco.", unavailable: "Não conseguimos enviar sua vaga. Tente de novo ou escreva para railly@crafterstation.com." },
    soon: "Em breve",
    featuredTitle: "Vagas em destaque",
    featuredBody: "Fixadas nesta página e compartilhadas com a comunidade. Estamos definindo isso com as primeiras empresas que publicarem.",
    bountyTitle: "Bounty de contratação",
    bountyBody: "Fuja da pilha de currículos. Publique um desafio na sua API, veja o que os builders entregam e contrate a melhor entrega.",
    bountyCta: "Como funcionam os bounties",
    buildersLabel: "Para builders",
    buildersTitle: "Procurando trabalho?",
    buildersBody: "Ative aberto a trabalhar no seu perfil e adicione os papéis que quer. Empresas que visitam esta página veem seus Ships primeiro.",
    buildersCta: "Abrir configurações do perfil",
  },
  zh: {
    label: "招聘",
    claim: "招募已经在交付的拉美开发者。",
    lede: "Crafter Station 是一个由 1000 多位拉美工程师、设计师和创始人组成的社区。发布职位，或浏览正在求职的开发者及其已交付的作品。",
    post: "发布职位",
    bounty: "通过赏金招聘",
    openLabel: "求职中",
    openTitle: "正在求职的开发者",
    openLede: "在个人资料中开启“求职中”的 Crafter。每个卡片都链接到公开资料和 Ships。",
    openCount: (count) => `${count} 位求职中`,
    emptyTitle: "目前没有人在求职。",
    emptyBody: "开发者在个人资料设置里开启后，会连同 Ships 一起出现在这里。",
    moreRoles: (count) => `另外 ${count} 个`,
    noShips: "暂无 Ships",
    latestShips: "最新 Ships",
    profile: "查看资料",
    settingsCta: "开启求职状态",
    postLabel: "发布职位",
    postTitle: "告诉我们你在招谁。",
    postLede: "第一个职位免费。我们会逐条人工审核，并在发布前通过邮件回复。",
    freeNote: "首个职位免费，人工审核。",
    fields: { company: "公司", title: "职位名称", location: "地点或远程", locationHint: "例如：远程，拉美", link: "职位链接", email: "联系邮箱", notes: "备注", notesHint: "资历、技术栈、薪资范围等任何有用信息。", optional: "选填" },
    submit: "提交职位",
    sending: "提交中",
    sent: "已收到。我们会审核并通过邮件回复。",
    errors: { invalid: "请检查字段：职位链接须以 https:// 开头，邮箱须有效。", limited: "此连接提交过多。请稍后再试。", unavailable: "无法发送你的职位。请重试，或发邮件至 railly@crafterstation.com。" },
    soon: "即将推出",
    featuredTitle: "精选职位",
    featuredBody: "固定在本页并分享给社区。我们正与首批发布职位的公司一起打磨。",
    bountyTitle: "招聘赏金",
    bountyBody: "不必翻简历。围绕你的 API 发布挑战，看开发者做出什么，再聘用最好的作品。",
    bountyCta: "了解赏金如何运作",
    buildersLabel: "给开发者",
    buildersTitle: "在找工作？",
    buildersBody: "在个人资料中开启“求职中”并添加你想要的职位。浏览本页的公司会先看到你的 Ships。",
    buildersCta: "打开资料设置",
  },
  ja: {
    label: "求人",
    claim: "すでに作って届けているラテンアメリカのビルダーを採用。",
    lede: "Crafter Station は、ラテンアメリカの1,000人以上のエンジニア、デザイナー、ファウンダーのコミュニティです。求人を掲載するか、仕事を探しているビルダーとその実績を見られます。",
    post: "求人を掲載",
    bounty: "バウンティで採用",
    openLabel: "求職中",
    openTitle: "求職中のビルダー",
    openLede: "プロフィールで求職中をオンにした Crafter です。各カードから公開プロフィールと Ships に移動できます。",
    openCount: (count) => `${count}人が求職中`,
    emptyTitle: "現在、求職中の人はいません。",
    emptyBody: "ビルダーがプロフィール設定でオンにすると、Ships とともにここに表示されます。",
    moreRoles: (count) => `ほか${count}件`,
    noShips: "Ships はまだありません",
    latestShips: "最新の Ships",
    profile: "プロフィールを見る",
    settingsCta: "求職中をオンにする",
    postLabel: "求人を掲載",
    postTitle: "どんな人を探しているか教えてください。",
    postLede: "最初の求人は無料です。投稿は一件ずつ手作業で確認し、公開前にメールで返信します。",
    freeNote: "最初の求人は無料。手作業で確認。",
    fields: { company: "会社名", title: "職種名", location: "勤務地またはリモート", locationHint: "例：リモート、LATAM", link: "求人ページのリンク", email: "連絡先メール", notes: "メモ", notesHint: "経験年数、スタック、給与レンジなど。", optional: "任意" },
    submit: "求人を送信",
    sending: "送信中",
    sent: "受け付けました。確認のうえメールで返信します。",
    errors: { invalid: "入力を確認してください。リンクは https:// で始まり、メールは有効である必要があります。", limited: "この接続からの送信が多すぎます。しばらくしてからお試しください。", unavailable: "求人を送信できませんでした。再試行するか railly@crafterstation.com へメールしてください。" },
    soon: "近日公開",
    featuredTitle: "注目の求人",
    featuredBody: "このページに固定し、コミュニティにも共有します。最初に掲載する企業と一緒に形にしていきます。",
    bountyTitle: "採用バウンティ",
    bountyBody: "履歴書の山を避けましょう。API を使ったチャレンジを公開し、ビルダーの成果を見て、最良の提出者を採用します。",
    bountyCta: "バウンティの仕組みを見る",
    buildersLabel: "ビルダー向け",
    buildersTitle: "仕事を探していますか？",
    buildersBody: "プロフィールで求職中をオンにし、希望の職種を追加してください。このページを見る企業にまず Ships が表示されます。",
    buildersCta: "プロフィール設定を開く",
  },
}
