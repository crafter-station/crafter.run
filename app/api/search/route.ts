import { createFromSource } from "fumadocs-core/search/server"

import { source } from "@/lib/source"

// The default `multilingual` tokenizer covers every locale, CJK included;
// per-locale localeMap/tokenizer config is deprecated in fumadocs-core.
export const { GET } = createFromSource(source)
