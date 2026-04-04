'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/shop')
    router.refresh()
  }

  return (
    <button
      onClick={handleLogout}
      className="text-xs text-sub hover:text-body transition-colors uppercase tracking-wide"
    >
      LOG OUT
    </button>
  )
}
