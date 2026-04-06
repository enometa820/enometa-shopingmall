import { createClient } from '@/lib/supabase/server'
import { ORDER_STATUS_LABELS } from '@/types/order'
import type { OrderStatus, OrderStatusHistory } from '@/types/order'
import { formatDate } from '@/lib/utils/format'

type OrderStatusTimelineProps = {
  orderId: string
  currentStatus: OrderStatus
}

export default async function OrderStatusTimeline({ orderId, currentStatus }: OrderStatusTimelineProps) {
  const supabase = await createClient()
  const { data: history } = await supabase
    .from('order_status_history')
    .select('*')
    .eq('order_id', orderId)
    .order('changed_at', { ascending: false })

  if (!history || history.length === 0) return null

  return (
    <div className="border border-border p-4 mt-4">
      <p className="text-[10px] uppercase tracking-[1.5px] text-sub mb-4">주문 상태 이력</p>

      <div className="space-y-0">
        {(history as OrderStatusHistory[]).map((entry, index) => {
          const isLatest = index === 0

          return (
            <div key={entry.id} className="flex gap-3">
              {/* Timeline line + dot */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-2 h-2 rounded-full shrink-0 mt-1 ${
                    isLatest ? 'bg-dark' : 'bg-border'
                  }`}
                />
                {index < history.length - 1 && (
                  <div className="w-px flex-1 bg-border" />
                )}
              </div>

              {/* Content */}
              <div className="pb-4 min-w-0">
                <div className="flex items-center gap-2">
                  <span className={`text-xs ${isLatest ? 'text-dark font-medium' : 'text-sub'}`}>
                    {ORDER_STATUS_LABELS[entry.from_status as OrderStatus]}
                    {' → '}
                    {ORDER_STATUS_LABELS[entry.to_status as OrderStatus]}
                  </span>
                </div>
                <p className="text-[10px] text-muted mt-0.5">
                  {formatDate(entry.changed_at)}
                </p>
                {entry.note && (
                  <p className="text-[10px] text-sub mt-0.5">{entry.note}</p>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
