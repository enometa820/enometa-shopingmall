'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { adminUpdateOrderStatus, adminUpdateShipping } from '@/actions/admin'
import { ORDER_STATUS_LABELS } from '@/types/order'
import type { OrderStatus, CourierCompany } from '@/types/order'
import TrackingModal from '@/components/admin/TrackingModal'

const STATUSES: OrderStatus[] = ['paid', 'preparing', 'shipping', 'delivered']

export default function OrderStatusSelect({
  orderId,
  currentStatus,
}: {
  orderId: string
  currentStatus: string
}) {
  const router = useRouter()
  const [showTrackingModal, setShowTrackingModal] = useState(false)

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value

    if (newStatus === 'shipping') {
      setShowTrackingModal(true)
      // Reset select to current value (modal handles the actual change)
      e.target.value = currentStatus
      return
    }

    await adminUpdateOrderStatus(orderId, newStatus)
    router.refresh()
  }

  const handleShippingSubmit = async (
    orderId: string,
    trackingNumber: string,
    courierCompany: CourierCompany,
  ) => {
    await adminUpdateShipping(orderId, trackingNumber, courierCompany)
    setShowTrackingModal(false)
    router.refresh()
  }

  return (
    <>
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

      {showTrackingModal && (
        <TrackingModal
          orderId={orderId}
          onSubmit={handleShippingSubmit}
          onClose={() => setShowTrackingModal(false)}
        />
      )}
    </>
  )
}
