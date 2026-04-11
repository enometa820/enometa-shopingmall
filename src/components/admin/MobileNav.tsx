'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_ITEMS = [
  { label: '📊 대시보드', href: '/admin/dashboard' },
  { label: '📦 상품 관리', href: '/admin/products' },
  { label: '🛒 주문 관리', href: '/admin/orders' },
  { label: '💬 문의 관리', href: '/admin/inquiries' },
  { label: '⚙️ 설정', href: '/admin/settings' },
]

export default function MobileNav({ email }: { email: string }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className="md:hidden">
      {/* Top bar */}
      <div className="h-[var(--header-height)] flex items-center justify-between px-5 border-b border-border bg-white">
        <Link href="/admin/dashboard" className="text-xs tracking-[2px] uppercase text-dark">
          ENOMETA ADMIN
        </Link>
        <button
          onClick={() => setOpen(!open)}
          className="w-10 h-10 flex items-center justify-center text-dark"
          aria-label={open ? '메뉴 닫기' : '메뉴 열기'}
        >
          {open ? (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M4 4l10 10M14 4L4 14" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M2 4h14M2 9h14M2 14h14" />
            </svg>
          )}
        </button>
      </div>

      {/* Dropdown menu */}
      {open && (
        <nav className="border-b border-border bg-white">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`block px-5 py-3 text-xs transition-colors duration-200 ${
                pathname === item.href
                  ? 'bg-beige text-dark font-medium'
                  : 'text-body hover:bg-beige'
              }`}
            >
              {item.label}
            </Link>
          ))}
          <div className="px-5 py-3 border-t border-border">
            <p className="text-[10px] text-muted">{email}</p>
            <Link href="/shop" className="text-[10px] text-sub hover:text-body mt-1 block">
              ← 쇼핑몰로 돌아가기
            </Link>
          </div>
        </nav>
      )}
    </div>
  )
}
