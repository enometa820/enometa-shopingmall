import Link from 'next/link'
import { getOrders } from '@/actions/orders'
import { createClient } from '@/lib/supabase/server'
import LogoutButton from './LogoutButton'
import OrderCard from './OrderCard'

export default async function MyPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const orders = await getOrders()

  return (
    <div className="px-5 md:px-10 py-12 md:py-16 max-w-[900px] mx-auto">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-sm tracking-[2px] uppercase text-dark">MY PAGE</h1>
        <div className="flex items-center gap-4">
          <span className="text-xs text-sub">{user?.email}</span>
          <LogoutButton />
        </div>
      </div>

      {/* Orders */}
      <p className="text-xs uppercase tracking-[1.25px] text-sub mb-4">주문 내역</p>

      {orders.length === 0 ? (
        <div className="py-16 text-center text-xs text-sub">
          <p>주문 내역이 없습니다.</p>
          <Link href="/shop" className="text-body underline underline-offset-4 mt-2 inline-block">
            쇼핑하러 가기
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order: any) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  )
}
