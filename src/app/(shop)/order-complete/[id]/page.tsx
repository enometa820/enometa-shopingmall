import Link from 'next/link'
import { getOrder } from '@/actions/orders'
import { formatPrice, formatDate } from '@/lib/utils/format'
import { ORDER_STATUS_LABELS } from '@/types/order'
import type { OrderStatus } from '@/types/order'

type Props = {
  params: Promise<{ id: string }>
}

export default async function OrderCompletePage({ params }: Props) {
  const { id } = await params
  const order = await getOrder(id)

  if (!order) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-xs text-sub">
        주문을 찾을 수 없습니다.
      </div>
    )
  }

  return (
    <div className="px-5 md:px-10 py-16 md:py-24 max-w-[600px] mx-auto text-center">
      {/* Check Icon */}
      <div className="w-16 h-16 mx-auto mb-6 rounded-full border-2 border-dark flex items-center justify-center">
        <span className="text-dark text-2xl">✓</span>
      </div>

      <h1 className="text-sm tracking-[2px] uppercase text-dark mb-2">
        주문이 완료되었습니다
      </h1>
      <p className="text-xs text-sub mb-10">
        주문번호: {order.order_number}
      </p>

      {/* Order Info */}
      <div className="text-left border-t border-border pt-6 space-y-3">
        <InfoRow label="주문일" value={formatDate(order.created_at)} />
        <InfoRow label="상태" value={ORDER_STATUS_LABELS[order.status as OrderStatus]} />
        <InfoRow label="결제 금액" value={formatPrice(order.total)} />
        <InfoRow label="배송지" value={`${order.shipping_name} / ${order.shipping_address}`} />
      </div>

      {/* Items */}
      <div className="text-left border-t border-border mt-6 pt-6">
        <p className="text-[10px] uppercase tracking-[1.5px] text-sub mb-3">주문 상품</p>
        <ul className="space-y-2">
          {order.order_items?.map((item: any) => (
            <li key={item.id} className="flex justify-between text-xs">
              <span>
                {item.product_name} ({item.color}/{item.size}) × {item.quantity}
              </span>
              <span>{formatPrice(item.price * item.quantity)}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Actions */}
      <div className="mt-10 flex flex-col gap-3">
        <Link
          href="/mypage"
          className="block py-3 bg-dark text-white text-xs uppercase tracking-[1.5px] hover:bg-accent transition-colors duration-300"
        >
          주문 내역 보기
        </Link>
        <Link
          href="/shop"
          className="block py-3 border border-border text-xs uppercase tracking-[1.5px] text-body hover:border-dark transition-colors duration-300"
        >
          쇼핑 계속하기
        </Link>
      </div>
    </div>
  )
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-xs">
      <span className="text-sub">{label}</span>
      <span>{value}</span>
    </div>
  )
}
