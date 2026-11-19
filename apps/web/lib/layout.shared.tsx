import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared"

export function baseOptions(lang: string): BaseLayoutProps {
  return {
    nav: {
      title: "Docs",
      url: `/${lang}/docs`,
    },
  }
}
