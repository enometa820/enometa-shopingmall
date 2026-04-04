import Link from 'next/link'
import { getOrders } from '@/actions/orders'
import { formatPrice, formatDate } from '@/lib/utils/format'
import { ORDER_STATUS_LABELS } from '@/types/order'
import type { OrderStatus } from '@/types/order'
import { createClient } from '@/lib/supabase/server'
import LogoutButton from './LogoutButton'

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
            <Link
              key={order.id}
              href={`/order-complete/${order.id}`}
              className="block border border-border p-5 hover:border-dark transition-colors duration-300"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs tracking-wide">{order.order_number}</span>
                <span className="text-[10px] px-2 py-0.5 bg-beige text-body">
                  {ORDER_STATUS_LABELS[order.status as OrderStatus]}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-sub">
                <span>{formatDate(order.created_at)}</span>
                <span>{formatPrice(order.total)}</span>
              </div>
              {order.order_items && order.order_items.length > 0 && (
                <p className="text-xs text-sub mt-2">
                  {order.order_items[0].product_name}
                  {order.order_items.length > 1 && ` 외 ${order.order_items.length - 1}건`}
                </p>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
