// supabase/admin.ts
import { createClient } from '@supabase/supabase-js'

let _admin: ReturnType<typeof createClient> | null = null

export function getSupabaseAdmin() {
  if (!_admin) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!url || !key) {
      throw new Error('Missing Supabase admin credentials (URL or service role key)')
    }
    _admin = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false }
    })
  }
  return _admin
}
