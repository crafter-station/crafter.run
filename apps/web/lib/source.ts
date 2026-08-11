import { defineDocs } from "fumadocs-mdx/macro"
import { loader } from "fumadocs-core/source"

import { docsI18n } from "@/lib/docs-i18n"

const docs = defineDocs({
  dir: "content/docs",
  docs: {
    postprocess: { includeProcessedMarkdown: true },
  },
})

export const source = loader({
  baseUrl: "/docs",
  i18n: docsI18n,
  source: docs.toFumadocsSource(),
})
