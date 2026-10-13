import type { Locale } from "@/lib/i18n"

const en = {
  badge: "Your badge", title: "Your Hot Reload badge",
  intro: "Your collectible for edition {number}. Adjust your name and photo, then publish it to share.",
  signInBody: "Sign in with the email you registered with on Luma to get your badge.",
  name: "Name on the badge", photo: "Change photo", photoHint: "The photo only changes on the badge, never on your account.",
  front: "Front", back: "Back", printing: "Printing your badge…", error: "We couldn't print the badge. Reload the page and try again.",
  role: "Builder",
}

type Copy = { [K in keyof typeof en]: string }

export const hotReloadBadgeCopy: Record<Locale, Copy> = {
  en,
  es: {
    badge: "Tu badge", title: "Tu badge de Hot Reload",
    intro: "Tu coleccionable de la edición {number}. Ajusta tu nombre y tu foto, y luego publícalo para compartirlo.",
    signInBody: "Inicia sesión con el correo que usaste en Luma para obtener tu badge.",
    name: "Nombre en el badge", photo: "Cambiar foto", photoHint: "La foto solo cambia en el badge, nunca en tu cuenta.",
    front: "Frente", back: "Reverso", printing: "Imprimiendo tu badge…", error: "No pudimos imprimir el badge. Recarga la página e inténtalo de nuevo.",
    role: "Builder",
  },
  pt: {
    badge: "Seu badge", title: "Seu badge do Hot Reload",
    intro: "Seu colecionável da edição {number}. Ajuste seu nome e sua foto e depois publique para compartilhar.",
    signInBody: "Entre com o e-mail que você usou no Luma para receber seu badge.",
    name: "Nome no badge", photo: "Trocar foto", photoHint: "A foto muda só no badge, nunca na sua conta.",
    front: "Frente", back: "Verso", printing: "Imprimindo seu badge…", error: "Não conseguimos imprimir o badge. Recarregue a página e tente de novo.",
    role: "Builder",
  },
  zh: {
    badge: "你的徽章", title: "你的 Hot Reload 徽章",
    intro: "第 {number} 期的专属收藏。调整姓名和照片，然后发布并分享。",
    signInBody: "请使用你在 Luma 报名时的邮箱登录，领取你的徽章。",
    name: "徽章上的名字", photo: "更换照片", photoHint: "照片只会改变徽章，不会改变你的账号头像。",
    front: "正面", back: "背面", printing: "正在印制你的徽章…", error: "徽章印制失败。请刷新页面后重试。",
    role: "Builder",
  },
  ja: {
    badge: "あなたのバッジ", title: "Hot Reload のバッジ",
    intro: "第 {number} 回のコレクション。名前と写真を調整して、公開してシェアしよう。",
    signInBody: "Luma に登録したメールでサインインすると、バッジを受け取れます。",
    name: "バッジに表示する名前", photo: "写真を変える", photoHint: "写真はバッジだけに反映され、アカウントは変わりません。",
    front: "表", back: "裏", printing: "バッジを印刷中…", error: "バッジを印刷できませんでした。ページを再読み込みしてもう一度お試しください。",
    role: "Builder",
  },
}
