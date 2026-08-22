import { createFromSource } from "fumadocs-core/search/server"

import { source } from "@/lib/source"

/**
 * One search index shared by the `/api/search` route handler and the MCP
 * server. Route files may only export route handlers, so the index lives here
 * and both callers reach for the same instance instead of building two.
 *
 * The default `multilingual` tokenizer covers every locale, CJK included;
 * per-locale localeMap/tokenizer config is deprecated in fumadocs-core.
 */
export const searchApi = createFromSource(source)
