import { defineI18n } from "fumadocs-core/i18n"

export const docsI18n = defineI18n({
  languages: ["en", "es", "pt", "zh", "ja"],
  defaultLanguage: "en",
  parser: "dot",
})
