import type { Metadata } from "next"
import type { ReactNode } from "react"
import { RootProvider } from "fumadocs-ui/provider/next"
import { DocsLayout } from "fumadocs-ui/layouts/docs"
import { defineI18nUI } from "fumadocs-ui/i18n"

import { source } from "@/lib/source"
import { docsI18n } from "@/lib/docs-i18n"
import { baseOptions } from "@/lib/layout.shared"

const { provider } = defineI18nUI(docsI18n, {
  en: { displayName: "English" },
  es: {
    displayName: "Español",
    "On this page(table of contents)": "En esta página",
    "No Headings(table of contents)": "Sin encabezados",
    "No results found(search dialog)": "Sin resultados",
    "Previous Page(pagination)": "Anterior",
    "Next Page(pagination)": "Siguiente",
    "Last updated on(page footer)": "Última actualización",
    "Copy Markdown(page actions)": "Copiar Markdown",
    "Edit on GitHub(edit page)": "Editar en GitHub",
    "Choose a language(language switcher)": "Elegir idioma",
    "Page Not Found(404 page)": "Página no encontrada",
    "Back to Home(404 page)": "Volver al inicio",
  },
  pt: {
    displayName: "Português",
    "On this page(table of contents)": "Nesta página",
    "No Headings(table of contents)": "Sem títulos",
    "No results found(search dialog)": "Sem resultados",
    "Previous Page(pagination)": "Anterior",
    "Next Page(pagination)": "Próxima",
    "Last updated on(page footer)": "Última atualização",
    "Copy Markdown(page actions)": "Copiar Markdown",
    "Edit on GitHub(edit page)": "Editar no GitHub",
    "Choose a language(language switcher)": "Escolher idioma",
    "Page Not Found(404 page)": "Página não encontrada",
    "Back to Home(404 page)": "Voltar ao início",
  },
  zh: {
    displayName: "简体中文",
    "On this page(table of contents)": "本页目录",
    "No Headings(table of contents)": "无标题",
    "No results found(search dialog)": "未找到结果",
    "Previous Page(pagination)": "上一页",
    "Next Page(pagination)": "下一页",
    "Last updated on(page footer)": "最后更新于",
    "Copy Markdown(page actions)": "复制 Markdown",
    "Edit on GitHub(edit page)": "在 GitHub 上编辑",
    "Choose a language(language switcher)": "选择语言",
    "Page Not Found(404 page)": "页面未找到",
    "Back to Home(404 page)": "返回首页",
  },
  ja: {
    displayName: "日本語",
    "On this page(table of contents)": "このページの内容",
    "No Headings(table of contents)": "見出しがありません",
    "No results found(search dialog)": "結果が見つかりません",
    "Previous Page(pagination)": "前のページ",
    "Next Page(pagination)": "次のページ",
    "Last updated on(page footer)": "最終更新日",
    "Copy Markdown(page actions)": "Markdown をコピー",
    "Edit on GitHub(edit page)": "GitHub で編集",
    "Choose a language(language switcher)": "言語を選択",
    "Page Not Found(404 page)": "ページが見つかりません",
    "Back to Home(404 page)": "ホームに戻る",
  },
})

export const metadata: Metadata = {
  title: {
    template: "%s | Crafter Station Docs",
    default: "Crafter Station Docs",
  },
}

export default async function Layout({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params

  return (
    <RootProvider i18n={provider(lang)} theme={{ enabled: false }}>
      <DocsLayout tree={source.getPageTree(lang)} {...baseOptions(lang)}>
        {children}
      </DocsLayout>
    </RootProvider>
  )
}
