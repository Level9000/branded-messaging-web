// src/services/privacyPolicy.ts
import { supabase } from '../supabase/client'

export type PrivacyPolicy = {
  content: string
  created_at: string
  // Add other columns if you have them, e.g. id, version, etc.
}

export async function fetchLatestPrivacyPolicy(): Promise<PrivacyPolicy | null> {
  console.log('[PrivacyPolicy] Fetching latest privacy policy...')
  const { data, error } = await supabase
    .from('privacy_policy')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  if (error) {
    console.error('[PrivacyPolicy] Failed to fetch privacy policy:', error)
    return null
  }

  console.log('[PrivacyPolicy] Received data:', data)
  return data as PrivacyPolicy
}
