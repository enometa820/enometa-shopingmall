'use server'

import { createClient } from '@/lib/supabase/server'

export async function getSetting(key: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('site_settings')
    .select('value')
    .eq('key', key)
    .single()

  if (error) return null
  return data.value as Record<string, unknown>
}
