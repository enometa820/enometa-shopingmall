import Link from 'next/link'
import { getOrder } from '@/actions/orders'
import { getSetting } from '@/actions/settings'
import { formatPrice, formatDate } from '@/lib/utils/format'
import { ORDER_STATUS_LABELS, PAYMENT_METHOD_LABELS } from '@/types/order'
import type { OrderStatus, PaymentMethod, CourierCompany } from '@/types/order'
import TrackingInfo from '@/components/order/TrackingInfo'
import OrderStatusTimeline from '@/components/order/OrderStatusTimeline'

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

  const isBankTransferPending =
    order.payment_method === 'bank_transfer' && order.status === 'pending_payment'

  type BankAccountInfo = { bankName?: string; accountNumber?: string; accountHolder?: string }
  const bankAccount: BankAccountInfo | null = isBankTransferPending
    ? ((await getSetting('bank_account')) as BankAccountInfo | null)
    : null

  return (
    <div className="px-5 md:px-10 py-16 md:py-24 max-w-[600px] mx-auto text-center">
      {/* Check Icon */}
      <div className={`w-16 h-16 mx-auto mb-6 rounded-full border-2 flex items-center justify-center ${
        isBankTransferPending ? 'border-amber-500' : 'border-dark'
      }`}>
        <span className={`text-2xl ${isBankTransferPending ? 'text-amber-500' : 'text-dark'}`}>
          {isBankTransferPending ? '!' : '✓'}
        </span>
      </div>

      <h1 className="text-sm tracking-[2px] uppercase text-dark mb-2">
        {isBankTransferPending ? '주문이 접수되었습니다' : '주문이 완료되었습니다'}
      </h1>
      <p className="text-xs text-sub mb-10">
        주문번호: {order.order_number}
      </p>

      {/* Bank Transfer Info */}
      {isBankTransferPending && bankAccount && (
        <div className="text-left border border-amber-200 bg-amber-50 rounded p-5 mb-8">
          <p className="text-xs font-semibold text-amber-800 mb-3">
            아래 계좌로 입금해 주세요
          </p>
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-amber-700">은행명</span>
              <span className="text-amber-900 font-medium">{bankAccount.bankName}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-amber-700">계좌번호</span>
              <span className="text-amber-900 font-medium">{bankAccount.accountNumber}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-amber-700">예금주</span>
              <span className="text-amber-900 font-medium">{bankAccount.accountHolder}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-amber-700">입금금액</span>
              <span className="text-amber-900 font-medium">{formatPrice(order.total)}</span>
            </div>
          </div>
          <p className="text-[11px] text-amber-600 mt-4">
            입금 확인 후 주문이 처리됩니다. 입금자명을 주문자명과 동일하게 해주세요.
          </p>
        </div>
      )}

      {/* Order Info */}
      <div className="text-left border-t border-border pt-6 space-y-3">
        <InfoRow label="주문일" value={formatDate(order.created_at)} />
        <InfoRow label="상태" value={ORDER_STATUS_LABELS[order.status as OrderStatus]} />
        {order.payment_method && (
          <InfoRow label="결제방법" value={PAYMENT_METHOD_LABELS[order.payment_method as PaymentMethod] || order.payment_method} />
        )}
        <InfoRow label="결제 금액" value={formatPrice(order.total)} />
        <InfoRow label="수령인" value={`${order.shipping_name} (${order.shipping_phone})`} />
        <InfoRow
          label="배송지"
          value={
            order.postal_code
              ? `[${order.postal_code}] ${order.shipping_address}`
              : order.shipping_address
          }
        />
        {order.shipping_detail && (
          <InfoRow label="상세주소" value={order.shipping_detail} />
        )}
        {order.shipping_memo && (
          <InfoRow label="배송메모" value={order.shipping_memo} />
        )}
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

      {/* Tracking Info */}
      <div className="text-left">
        <TrackingInfo
          trackingNumber={order.tracking_number}
          courierCompany={order.courier_company as CourierCompany | null}
        />
      </div>

      {/* Status Timeline */}
      <div className="text-left">
        <OrderStatusTimeline
          orderId={order.id}
          currentStatus={order.status as OrderStatus}
        />
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
