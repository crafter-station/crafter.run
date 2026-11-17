import type { Locale } from "@/lib/i18n"

// Copy for the account entry in the navigation and for the sign-in and sign-up pages.
export const authCopy: Record<Locale, {
  account: string
  join: string
  signInTitle: string
  signUpTitle: string
  intro: string
  perks: readonly { title: string; body: string }[]
  shipsLabel: string
  metaSignIn: string
  metaSignUp: string
  metaDescription: string
}> = {
  en: {
    account: "Account",
    join: "Join",
    signInTitle: "Welcome back to the Station.",
    signUpTitle: "Make a place on the Station.",
    intro: "One account for everything Crafter Station runs.",
    perks: [
      { title: "Your profile", body: "A public page at /crafters/your-handle." },
      { title: "Ships", body: "Publish what you build and post updates as it grows." },
      { title: "Upvotes", body: "Back the projects you want to see keep going." },
      { title: "Events", body: "Access for the gatherings you are approved for." },
    ],
    shipsLabel: "Recently shipped",
    metaSignIn: "Sign in",
    metaSignUp: "Create your account",
    metaDescription: "Sign in to Crafter Station to publish Ships, keep your profile and join events.",
  },
  es: {
    account: "Cuenta",
    join: "Unirme",
    signInTitle: "Bienvenido de vuelta a la Station.",
    signUpTitle: "Haz tu lugar en la Station.",
    intro: "Una cuenta para todo lo que corre en Crafter Station.",
    perks: [
      { title: "Tu perfil", body: "Una página pública en /crafters/tu-handle." },
      { title: "Ships", body: "Publica lo que construyes y comparte novedades mientras crece." },
      { title: "Votos", body: "Apoya los proyectos que quieres ver seguir adelante." },
      { title: "Eventos", body: "Acceso a los encuentros para los que estás aprobado." },
    ],
    shipsLabel: "Lanzado recientemente",
    metaSignIn: "Iniciar sesión",
    metaSignUp: "Crea tu cuenta",
    metaDescription: "Inicia sesión en Crafter Station para publicar Ships, mantener tu perfil y unirte a eventos.",
  },
  pt: {
    account: "Conta",
    join: "Entrar para a Station",
    signInTitle: "Bem-vindo de volta à Station.",
    signUpTitle: "Faça o seu lugar na Station.",
    intro: "Uma conta para tudo o que roda na Crafter Station.",
    perks: [
      { title: "Seu perfil", body: "Uma página pública em /crafters/seu-handle." },
      { title: "Ships", body: "Publique o que você constrói e compartilhe novidades enquanto cresce." },
      { title: "Votos", body: "Apoie os projetos que você quer ver continuar." },
      { title: "Eventos", body: "Acesso aos encontros para os quais você foi aprovado." },
    ],
    shipsLabel: "Lançado recentemente",
    metaSignIn: "Entrar",
    metaSignUp: "Crie sua conta",
    metaDescription: "Entre na Crafter Station para publicar Ships, manter seu perfil e participar de eventos.",
  },
  zh: {
    account: "账户",
    join: "加入",
    signInTitle: "欢迎回到 Station。",
    signUpTitle: "在 Station 占一席之地。",
    intro: "一个账户，通用于 Crafter Station 的一切。",
    perks: [
      { title: "你的主页", body: "公开页面：/crafters/你的用户名。" },
      { title: "Ships", body: "发布你的作品，并在成长中持续更新。" },
      { title: "点赞", body: "支持你希望继续下去的项目。" },
      { title: "活动", body: "进入你已获批的聚会。" },
    ],
    shipsLabel: "最近发布",
    metaSignIn: "登录",
    metaSignUp: "创建账户",
    metaDescription: "登录 Crafter Station，发布 Ships、维护个人主页并参加活动。",
  },
  ja: {
    account: "アカウント",
    join: "参加",
    signInTitle: "Station へおかえりなさい。",
    signUpTitle: "Station に居場所をつくろう。",
    intro: "Crafter Station のすべてに使えるアカウント。",
    perks: [
      { title: "プロフィール", body: "/crafters/あなたのハンドル で公開されます。" },
      { title: "Ships", body: "作ったものを公開し、成長に合わせて更新を投稿できます。" },
      { title: "アップボート", body: "続いてほしいプロジェクトを応援できます。" },
      { title: "イベント", body: "承認されたイベントに参加できます。" },
    ],
    shipsLabel: "最近の Ship",
    metaSignIn: "ログイン",
    metaSignUp: "アカウントを作成",
    metaDescription: "Crafter Station にログインして、Ship の公開、プロフィール管理、イベント参加ができます。",
  },
}
