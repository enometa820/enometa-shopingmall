'use server'

import { createClient } from '@/lib/supabase/server'

export async function createInquiry(formData: FormData) {
  const supabase = await createClient()

  const { error } = await supabase.from('inquiries').insert({
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    category: formData.get('category') as string,
    content: formData.get('content') as string,
  })

  if (error) return { error: error.message }
  return { success: true }
}
