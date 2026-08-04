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
