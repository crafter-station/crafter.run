import type { Locale } from "@/lib/i18n"

// Copy for the account entry in the navigation and for the sign-in and sign-up pages.
export const authCopy: Record<Locale, {
  account: string
  signInTitle: string
  signInLede: string
  signUpTitle: string
  signUpLede: string
  noAccount: string
  join: string
  haveAccount: string
  signIn: string
  metaSignIn: string
  metaSignUp: string
  metaDescription: string
}> = {
  en: {
    account: "Account",
    signInTitle: "Sign in to Crafter Station",
    signInLede: "Your profile, your Ships and your events.",
    signUpTitle: "Join Crafter Station",
    signUpLede: "Publish what you build and keep a profile with it.",
    noAccount: "No account yet?",
    join: "Join",
    haveAccount: "Already have an account?",
    signIn: "Sign in",
    metaSignIn: "Sign in",
    metaSignUp: "Join",
    metaDescription: "Sign in to Crafter Station to publish Ships, keep your profile and join events.",
  },
  es: {
    account: "Cuenta",
    signInTitle: "Entra a Crafter Station",
    signInLede: "Tu perfil, tus Ships y tus eventos.",
    signUpTitle: "Únete a Crafter Station",
    signUpLede: "Publica lo que construyes y tenlo en tu perfil.",
    noAccount: "¿Aún no tienes cuenta?",
    join: "Únete",
    haveAccount: "¿Ya tienes cuenta?",
    signIn: "Entra",
    metaSignIn: "Entrar",
    metaSignUp: "Únete",
    metaDescription: "Entra a Crafter Station para publicar Ships, mantener tu perfil y unirte a eventos.",
  },
  pt: {
    account: "Conta",
    signInTitle: "Entre na Crafter Station",
    signInLede: "Seu perfil, seus Ships e seus eventos.",
    signUpTitle: "Junte-se à Crafter Station",
    signUpLede: "Publique o que você constrói e tenha isso no seu perfil.",
    noAccount: "Ainda não tem conta?",
    join: "Junte-se",
    haveAccount: "Já tem conta?",
    signIn: "Entre",
    metaSignIn: "Entrar",
    metaSignUp: "Junte-se",
    metaDescription: "Entre na Crafter Station para publicar Ships, manter seu perfil e participar de eventos.",
  },
  zh: {
    account: "账户",
    signInTitle: "登录 Crafter Station",
    signInLede: "你的主页、你的作品和你的活动。",
    signUpTitle: "加入 Crafter Station",
    signUpLede: "发布你构建的作品，并展示在你的主页上。",
    noAccount: "还没有账户？",
    join: "加入",
    haveAccount: "已有账户？",
    signIn: "登录",
    metaSignIn: "登录",
    metaSignUp: "加入",
    metaDescription: "登录 Crafter Station，发布作品、维护主页并参加活动。",
  },
  ja: {
    account: "アカウント",
    signInTitle: "Crafter Station にログイン",
    signInLede: "あなたのプロフィール、Ship、イベント。",
    signUpTitle: "Crafter Station に参加",
    signUpLede: "作ったものを公開して、プロフィールに残そう。",
    noAccount: "アカウントをお持ちでないですか？",
    join: "参加する",
    haveAccount: "アカウントをお持ちですか？",
    signIn: "ログイン",
    metaSignIn: "ログイン",
    metaSignUp: "参加",
    metaDescription: "Crafter Station にログインして、Ship を公開し、プロフィールを管理し、イベントに参加しましょう。",
  },
}
