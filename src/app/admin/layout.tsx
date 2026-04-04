import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

const NAV_ITEMS = [
  { label: '📊 대시보드', href: '/admin/dashboard' },
  { label: '📦 상품 관리', href: '/admin/products' },
  { label: '🛒 주문 관리', href: '/admin/orders' },
  { label: '💬 문의 관리', href: '/admin/inquiries' },
]

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user || user.user_metadata?.role !== 'admin') {
    redirect('/auth/login?redirect=/admin/dashboard')
  }

  return (
    <div className="min-h-screen flex bg-white">
      {/* Sidebar */}
      <aside className="w-[220px] border-r border-border flex-shrink-0 hidden md:flex flex-col">
        <div className="h-[var(--header-height)] flex items-center px-5 border-b border-border">
          <Link href="/admin/dashboard" className="text-xs tracking-[2px] uppercase text-dark">
            ENOMETA ADMIN
          </Link>
        </div>
        <nav className="flex-1 py-4">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-5 py-2.5 text-xs text-body hover:bg-beige transition-colors duration-200"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="px-5 py-4 border-t border-border">
          <p className="text-[10px] text-muted">{user.email}</p>
          <Link href="/shop" className="text-[10px] text-sub hover:text-body mt-1 block">
            ← 쇼핑몰로 돌아가기
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-6 md:p-8 max-w-[1200px]">
          {children}
        </div>
      </main>
    </div>
  )
}
