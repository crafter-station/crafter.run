import { createClient } from "@supabase/supabase-js"

import { getSupabaseConfig } from "@/lib/supabase/next-projects"

export function createBrowserSupabaseClient() {
  const { url, anonKey } = getSupabaseConfig()

  if (!url || !anonKey) {
    return null
  }

  return createClient(url, anonKey)
}
