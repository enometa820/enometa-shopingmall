'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { formatPrice, formatDate } from '@/lib/utils/format'
import { ORDER_STATUS_LABELS, COURIER_COMPANIES } from '@/types/order'
import type { OrderStatus, CourierCompany } from '@/types/order'
import { cancelOrder } from '@/actions/order-status'

type OrderCardProps = {
  order: {
    id: string
    order_number: string
    status: string
    total: number
    created_at: string
    tracking_number?: string | null
    courier_company?: string | null
    order_items?: { product_name: string }[]
  }
}

const CANCELLABLE_STATUSES: OrderStatus[] = ['pending_payment', 'paid', 'preparing']

export default function OrderCard({ order }: OrderCardProps) {
  const router = useRouter()
  const [cancelling, setCancelling] = useState(false)

  const isCancellable = CANCELLABLE_STATUSES.includes(order.status as OrderStatus)

  const handleCancel = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!window.confirm('주문을 취소하시겠습니까?\n취소 후에는 되돌릴 수 없습니다.')) {
      return
    }

    setCancelling(true)
    const result = await cancelOrder(order.id)

    if (result.error) {
      alert(result.error)
      setCancelling(false)
      return
    }

    router.refresh()
  }

  return (
    <div className="border border-border hover:border-dark transition-colors duration-300">
      <Link
        href={`/order-complete/${order.id}`}
        className="block p-5"
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
        {order.tracking_number && order.courier_company && (
          <p className="text-xs text-sub mt-1.5">
            {COURIER_COMPANIES[order.courier_company as CourierCompany]?.name || order.courier_company}{' '}
            <span className="text-dark">{order.tracking_number}</span>
          </p>
        )}
      </Link>

      {isCancellable && (
        <div className="px-5 pb-4">
          <button
            onClick={handleCancel}
            disabled={cancelling}
            className="text-xs text-red-500 hover:text-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {cancelling ? '취소 처리 중...' : '주문 취소'}
          </button>
        </div>
      )}
    </div>
  )
}
