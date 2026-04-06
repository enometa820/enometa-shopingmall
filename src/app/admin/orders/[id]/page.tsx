import { notFound } from 'next/navigation'
import Link from 'next/link'
import { adminGetOrder, adminGetOrderStatusHistory } from '@/actions/admin'
import { formatPrice, formatDate } from '@/lib/utils/format'
import { ORDER_STATUS_LABELS, PAYMENT_METHOD_LABELS, COURIER_COMPANIES } from '@/types/order'
import type { OrderStatus, PaymentMethod, CourierCompany } from '@/types/order'
import OrderStatusSelect from '../OrderStatusSelect'
import ConfirmPaymentButton from '../ConfirmPaymentButton'

export default async function AdminOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const [order, history] = await Promise.all([
    adminGetOrder(id),
    adminGetOrderStatusHistory(id),
  ])

  if (!order) notFound()

  const courier = order.courier_company
    ? COURIER_COMPANIES[order.courier_company as CourierCompany]
    : null

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin/orders"
          className="text-xs text-sub hover:text-dark transition-colors"
        >
          ← 주문 목록
        </Link>
        <h1 className="text-sm tracking-[2px] uppercase text-dark">
          {order.order_number}
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Order info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Status + Actions */}
          <Section title="주문 상태">
            <div className="flex items-center gap-3">
              {order.status === 'cancelled' || order.status === 'refund_requested' ? (
                <span className="text-xs text-red-500 font-medium">
                  {ORDER_STATUS_LABELS[order.status as OrderStatus]}
                </span>
              ) : (
                <OrderStatusSelect orderId={order.id} currentStatus={order.status} />
              )}
              {order.status === 'pending_payment' && (
                <ConfirmPaymentButton orderId={order.id} />
              )}
            </div>
          </Section>

          {/* Customer & Shipping */}
          <Section title="배송 정보">
            <InfoGrid>
              <InfoRow label="수령인" value={order.shipping_name} />
              <InfoRow label="연락처" value={order.shipping_phone} />
              <InfoRow label="우편번호" value={order.postal_code || '-'} />
              <InfoRow label="주소" value={order.shipping_address} />
              <InfoRow label="상세주소" value={order.shipping_detail || '-'} />
              <InfoRow label="배송메모" value={order.shipping_memo || '-'} />
            </InfoGrid>
          </Section>

          {/* Order Items */}
          <Section title="주문 상품">
            <div className="space-y-3">
              {order.order_items?.map((item: any) => (
                <div key={item.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div>
                    <p className="text-xs text-dark">{item.product_name}</p>
                    <p className="text-[10px] text-sub mt-0.5">
                      {item.color} / {item.size} × {item.quantity}
                    </p>
                  </div>
                  <p className="text-xs text-dark">{formatPrice(item.price * item.quantity)}</p>
                </div>
              ))}
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs font-medium text-dark">합계</span>
                <span className="text-xs font-medium text-dark">{formatPrice(order.total)}</span>
              </div>
            </div>
          </Section>

          {/* Payment */}
          <Section title="결제 정보">
            <InfoGrid>
              <InfoRow
                label="결제수단"
                value={PAYMENT_METHOD_LABELS[order.payment_method as PaymentMethod] || order.payment_method}
              />
              <InfoRow label="결제금액" value={formatPrice(order.total)} />
              {order.payment_key && (
                <InfoRow label="결제키" value={order.payment_key} />
              )}
            </InfoGrid>
          </Section>

          {/* Shipping Tracking */}
          {order.tracking_number && (
            <Section title="배송 추적">
              <InfoGrid>
                <InfoRow label="택배사" value={courier?.name || order.courier_company} />
                <InfoRow label="송장번호" value={order.tracking_number} />
              </InfoGrid>
              {courier?.trackingUrl && (
                <a
                  href={courier.trackingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-3 text-[10px] px-3 py-1.5 border border-dark text-dark hover:bg-dark hover:text-white transition-colors duration-300"
                >
                  배송추적 열기
                </a>
              )}
            </Section>
          )}
        </div>

        {/* Right: Timeline */}
        <div>
          <Section title="상태 이력">
            {history.length === 0 ? (
              <p className="text-xs text-muted">이력이 없습니다.</p>
            ) : (
              <div className="space-y-0">
                {history.map((entry: any, index: number) => {
                  const isLatest = index === 0
                  return (
                    <div key={entry.id} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className={`w-2 h-2 rounded-full shrink-0 mt-1 ${isLatest ? 'bg-dark' : 'bg-border'}`} />
                        {index < history.length - 1 && <div className="w-px flex-1 bg-border" />}
                      </div>
                      <div className="pb-4 min-w-0">
                        <p className={`text-xs ${isLatest ? 'text-dark font-medium' : 'text-sub'}`}>
                          {ORDER_STATUS_LABELS[entry.from_status as OrderStatus]}
                          {' → '}
                          {ORDER_STATUS_LABELS[entry.to_status as OrderStatus]}
                        </p>
                        <p className="text-[10px] text-muted mt-0.5">
                          {formatDate(entry.changed_at)}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </Section>

          <div className="mt-6">
            <Section title="주문 정보">
              <InfoGrid>
                <InfoRow label="주문일시" value={formatDate(order.created_at)} />
                <InfoRow label="주문번호" value={order.order_number} />
              </InfoGrid>
            </Section>
          </div>
        </div>
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border border-border p-5">
      <p className="text-[10px] uppercase tracking-[1.5px] text-sub mb-4">{title}</p>
      {children}
    </div>
  )
}

function InfoGrid({ children }: { children: React.ReactNode }) {
  return <div className="space-y-2">{children}</div>
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start gap-4">
      <span className="text-[10px] text-sub w-16 shrink-0 pt-px">{label}</span>
      <span className="text-xs text-dark">{value}</span>
    </div>
  )
}
