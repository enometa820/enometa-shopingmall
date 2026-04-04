'use client'

import { useRouter } from 'next/navigation'
import { adminUpdateOrderStatus } from '@/actions/admin'
import { ORDER_STATUS_LABELS } from '@/types/order'
import type { OrderStatus } from '@/types/order'

const STATUSES: OrderStatus[] = ['paid', 'preparing', 'shipping', 'delivered']

export default function OrderStatusSelect({
  orderId,
  currentStatus,
}: {
  orderId: string
  currentStatus: string
}) {
  const router = useRouter()

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    await adminUpdateOrderStatus(orderId, e.target.value)
    router.refresh()
  }

  return (
    <select
      value={currentStatus}
      onChange={handleChange}
      className="text-xs py-1 px-2 border border-border bg-white outline-none focus:border-dark"
    >
      {STATUSES.map((s) => (
        <option key={s} value={s}>
          {ORDER_STATUS_LABELS[s]}
        </option>
      ))}
    </select>
  )
}
