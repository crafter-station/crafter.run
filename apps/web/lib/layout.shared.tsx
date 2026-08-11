import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared"

export function baseOptions(lang: string): BaseLayoutProps {
  return {
    nav: {
      title: "Crafter Station Docs",
      url: `/${lang}/docs`,
    },
    githubUrl: "https://github.com/crafter-station",
  }
}
