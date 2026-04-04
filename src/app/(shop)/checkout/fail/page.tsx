'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

function FailContent() {
  const searchParams = useSearchParams()
  const code = searchParams.get('code')
  const message = searchParams.get('message')

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-xs px-5">
      <p className="text-sm tracking-[2px] uppercase mb-6">결제 실패</p>
      <p className="text-sub mb-2">{message || '결제 처리 중 문제가 발생했습니다.'}</p>
      {code && <p className="text-muted mb-6">오류 코드: {code}</p>}
      <Link
        href="/checkout"
        className="py-3 px-8 bg-dark text-white text-xs uppercase tracking-[1.5px] hover:bg-accent transition-colors duration-300"
      >
        다시 시도하기
      </Link>
    </div>
  )
}

export default function PaymentFailPage() {
  return (
    <Suspense fallback={<div className="min-h-[60vh] flex items-center justify-center text-xs text-sub">로딩 중...</div>}>
      <FailContent />
    </Suspense>
  )
}
