import { adminGetOrders } from '@/actions/admin'
import { formatPrice, formatDate } from '@/lib/utils/format'
import OrderStatusSelect from './OrderStatusSelect'

export default async function AdminOrdersPage() {
  const orders = await adminGetOrders()

  return (
    <div>
      <h1 className="text-sm tracking-[2px] uppercase text-dark mb-8">주문 관리</h1>

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
                <th className="text-[10px] uppercase tracking-wide text-sub font-normal text-left px-4 py-3">상태</th>
                <th className="text-[10px] uppercase tracking-wide text-sub font-normal text-left px-4 py-3">일시</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order: any) => (
                <tr key={order.id} className="border-b border-border last:border-0 hover:bg-beige/30 transition-colors">
                  <td className="text-xs px-4 py-3">{order.order_number}</td>
                  <td className="text-xs px-4 py-3 text-sub">{order.shipping_name}</td>
                  <td className="text-xs px-4 py-3 text-sub">
                    {order.order_items?.[0]?.product_name || '-'}
                    {order.order_items?.length > 1 && ` 외 ${order.order_items.length - 1}건`}
                  </td>
                  <td className="text-xs px-4 py-3">{formatPrice(order.total)}</td>
                  <td className="text-xs px-4 py-3">
                    <OrderStatusSelect orderId={order.id} currentStatus={order.status} />
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
