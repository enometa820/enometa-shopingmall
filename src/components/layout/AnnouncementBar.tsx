'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(() => {
    if (typeof window === 'undefined') return true
    return sessionStorage.getItem('hide-announcement') !== '1'
  })

  if (!visible) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-40 bg-beige">
      <div className="flex items-center justify-center h-8 px-5 relative">
        <p className="text-[10px] tracking-[1.5px] uppercase text-body">
          신규가입 시 10% 할인쿠폰 즉시 지급{' '}
          <Link href="/auth/signup" className="underline underline-offset-2 ml-1 hover:text-dark transition-colors">
            회원가입
          </Link>
        </p>
        <button
          onClick={() => { setVisible(false); sessionStorage.setItem('hide-announcement', '1') }}
          className="absolute right-3 text-sub hover:text-body text-xs transition-colors"
        >
          ✕
        </button>
      </div>
    </div>
  )
}
