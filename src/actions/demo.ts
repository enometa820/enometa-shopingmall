'use server'
import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'

const DEMO_EMAIL = 'demo-admin@enometa.dev'
const DEMO_PASSWORD = 'demo-admin-2024!'

export async function demoAdminLogin() {
  const admin = createAdminClient()

  // 데모 유저 존재 확인 → 없으면 생성
  const { data: existingUsers } = await admin.auth.admin.listUsers()
  const demoUser = existingUsers?.users?.find(u => u.email === DEMO_EMAIL)

  if (!demoUser) {
    await admin.auth.admin.createUser({
      email: DEMO_EMAIL,
      password: DEMO_PASSWORD,
      email_confirm: true,
      user_metadata: { role: 'admin', full_name: 'Demo Admin' },
    })
  }

  // 클라이언트 세션으로 로그인
  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({
    email: DEMO_EMAIL,
    password: DEMO_PASSWORD,
  })

  if (error) {
    return { error: error.message }
  }

  return { success: true }
}
