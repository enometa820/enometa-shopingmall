import Link from 'next/link'
import { adminGetOrders, adminGetOrderCounts } from '@/actions/admin'
import { formatPrice, formatDate } from '@/lib/utils/format'
import { ORDER_STATUS_LABELS, PAYMENT_METHOD_LABELS } from '@/types/order'
import type { OrderStatus, PaymentMethod } from '@/types/order'
import OrderStatusSelect from './OrderStatusSelect'
import ConfirmPaymentButton from './ConfirmPaymentButton'

const FILTER_STATUSES: Array<{ key: string; label: string }> = [
  { key: 'all', label: '전체' },
  { key: 'pending_payment', label: '입금대기' },
  { key: 'paid', label: '결제완료' },
  { key: 'preparing', label: '배송준비' },
  { key: 'shipping', label: '배송중' },
  { key: 'delivered', label: '배송완료' },
  { key: 'cancelled', label: '취소' },
]

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>
}) {
  const params = await searchParams
  const currentFilter = params.status || 'all'

  const [orders, counts] = await Promise.all([
    adminGetOrders(currentFilter),
    adminGetOrderCounts(),
  ])

  return (
    <div>
      <h1 className="text-sm tracking-[2px] uppercase text-dark mb-8">주문 관리</h1>

      {/* Status Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {FILTER_STATUSES.map(({ key, label }) => {
          const count = counts[key] || 0
          const isActive = currentFilter === key
          return (
            <a
              key={key}
              href={key === 'all' ? '/admin/orders' : `/admin/orders?status=${key}`}
              className={`text-xs px-3 py-1.5 border transition-colors ${
                isActive
                  ? 'border-dark bg-dark text-white'
                  : 'border-border text-sub hover:border-dark hover:text-dark'
              }`}
            >
              {label}
              <span className={`ml-1.5 ${isActive ? 'text-white/70' : 'text-muted'}`}>
                {count}
              </span>
            </a>
          )
        })}
      </div>

      {orders.length === 0 ? (
        <p className="text-xs text-muted py-8">주문이 없습니다.</p>
      ) : (
        <div className="border border-border">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-beige/50">
                <th className="text-[10px] uppercase tracking-wide text-sub font-normal text-left px-4 py-3">주문번호</th>
                <th className="text-[10px] uppercase tracking-wide text-sub font-normal text-left px-4 py-3">고객</th>
                <th className="text-[10px] uppercase tracking-wide text-sub font-normal text-left px-4 py-3">상품</th>
                <th className="text-[10px] uppercase tracking-wide text-sub font-normal text-left px-4 py-3">금액</th>
                <th className="text-[10px] uppercase tracking-wide text-sub font-normal text-left px-4 py-3">결제</th>
                <th className="text-[10px] uppercase tracking-wide text-sub font-normal text-left px-4 py-3">상태</th>
                <th className="text-[10px] uppercase tracking-wide text-sub font-normal text-left px-4 py-3">일시</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order: any) => (
                <tr key={order.id} className="border-b border-border last:border-0 hover:bg-beige/30 transition-colors">
                  <td className="text-xs px-4 py-3">
                    <Link href={`/admin/orders/${order.id}`} className="hover:underline hover:text-dark transition-colors">
                      {order.order_number}
                    </Link>
                  </td>
                  <td className="text-xs px-4 py-3 text-sub">{order.shipping_name}</td>
                  <td className="text-xs px-4 py-3 text-sub">
                    {order.order_items?.[0]?.product_name || '-'}
                    {order.order_items?.length > 1 && ` 외 ${order.order_items.length - 1}건`}
                  </td>
                  <td className="text-xs px-4 py-3">{formatPrice(order.total)}</td>
                  <td className="text-xs px-4 py-3">
                    <PaymentBadge method={order.payment_method} />
                  </td>
                  <td className="text-xs px-4 py-3">
                    <div className="flex items-center gap-2">
                      {order.status === 'cancelled' || order.status === 'refund_requested' ? (
                        <span className="text-xs text-red-500">
                          {ORDER_STATUS_LABELS[order.status as OrderStatus]}
                        </span>
                      ) : (
                        <OrderStatusSelect orderId={order.id} currentStatus={order.status} />
                      )}
                      {order.status === 'pending_payment' && (
                        <ConfirmPaymentButton orderId={order.id} />
                      )}
                    </div>
                  </td>
                  <td className="text-xs px-4 py-3 text-sub">{formatDate(order.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

function PaymentBadge({ method }: { method: PaymentMethod | null }) {
  if (!method) return <span className="text-muted">-</span>

  const label = PAYMENT_METHOD_LABELS[method] || method
  const colorClass = method === 'toss'
    ? 'bg-blue-50 text-blue-600 border-blue-200'
    : 'bg-orange-50 text-orange-600 border-orange-200'

  return (
    <span className={`inline-block text-[10px] px-2 py-0.5 border ${colorClass}`}>
      {label}
    </span>
  )
}
