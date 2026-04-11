'use client'

import { useState } from 'react'
import Link from 'next/link'

const SCENARIOS = [
  {
    step: 1,
    label: '대시보드 확인',
    description: '오늘 매출, 주문 수, 입금대기 건수를 확인하세요.',
    href: '/admin/dashboard',
  },
  {
    step: 2,
    label: '상품 등록',
    description: '새 상품을 등록해보세요. 이미지, 컬러, 사이즈, 재고까지.',
    href: '/admin/products/new',
  },
  {
    step: 3,
    label: '주문 관리',
    description: '주문 상태를 변경하고 운송장 번호를 입력해보세요.',
    href: '/admin/orders',
  },
  {
    step: 4,
    label: '문의 답변',
    description: '고객 문의에 답변을 작성해보세요.',
    href: '/admin/inquiries',
  },
]

export default function DemoGuide() {
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null

  return (
    <div className="border border-dashed border-[#ccc] bg-[#fafafa] p-5 mb-8">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-xs tracking-[1.5px] uppercase text-dark font-medium">
            체험 가이드
          </p>
          <p className="text-[11px] text-sub mt-1">
            데모 관리자 계정으로 접속했습니다. 아래 시나리오를 따라가 보세요.
          </p>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="text-muted hover:text-body text-xs transition-colors"
        >
          ✕
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {SCENARIOS.map((s) => (
          <Link
            key={s.step}
            href={s.href}
            className="group flex items-start gap-3 p-3 border border-border hover:border-dark transition-colors duration-200"
          >
            <span className="text-[10px] font-medium text-muted tracking-wide shrink-0 mt-0.5">
              {String(s.step).padStart(2, '0')}
            </span>
            <div>
              <p className="text-xs text-dark font-medium group-hover:underline">
                {s.label}
              </p>
              <p className="text-[10px] text-sub mt-0.5 leading-relaxed">
                {s.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
