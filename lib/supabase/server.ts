import { createClient } from "@supabase/supabase-js"

import { getSupabaseConfig, getSupabaseServerKey } from "@/lib/supabase/next-projects"

export function createServerSupabaseClient() {
  const { url } = getSupabaseConfig()
  const key = getSupabaseServerKey()

  if (!url || !key) {
    return null
  }

  return createClient(url, key, {
    auth: {
      persistSession: false,
    },
  })
}
