'use client'

import { useState } from 'react'
import { COURIER_COMPANIES } from '@/types/order'
import type { CourierCompany } from '@/types/order'

type TrackingModalProps = {
  orderId: string
  onSubmit: (orderId: string, trackingNumber: string, courierCompany: CourierCompany) => Promise<void>
  onClose: () => void
}

const courierKeys = Object.keys(COURIER_COMPANIES) as CourierCompany[]

export default function TrackingModal({ orderId, onSubmit, onClose }: TrackingModalProps) {
  const [courierCompany, setCourierCompany] = useState<CourierCompany>('cj')
  const [trackingNumber, setTrackingNumber] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!trackingNumber.trim()) return

    setLoading(true)
    try {
      await onSubmit(orderId, trackingNumber.trim(), courierCompany)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white border border-border p-6 w-full max-w-[400px] mx-4">
        <h2 className="text-xs tracking-[1.5px] uppercase text-dark mb-6">송장 정보 입력</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Courier Company */}
          <div>
            <label className="block text-[10px] uppercase tracking-wide text-sub mb-1.5">
              택배사
            </label>
            <select
              value={courierCompany}
              onChange={(e) => setCourierCompany(e.target.value as CourierCompany)}
              className="w-full text-xs py-2 px-3 border border-border bg-white outline-none focus:border-dark"
            >
              {courierKeys.map((key) => (
                <option key={key} value={key}>
                  {COURIER_COMPANIES[key].name}
                </option>
              ))}
            </select>
          </div>

          {/* Tracking Number */}
          <div>
            <label className="block text-[10px] uppercase tracking-wide text-sub mb-1.5">
              송장번호
            </label>
            <input
              type="text"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              placeholder="송장번호를 입력해주세요"
              required
              className="w-full text-xs py-2 px-3 border border-border outline-none focus:border-dark placeholder:text-muted"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 border border-border text-xs text-body hover:border-dark transition-colors duration-300"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={loading || !trackingNumber.trim()}
              className="flex-1 py-2.5 bg-dark text-white text-xs uppercase tracking-[1px] hover:bg-accent transition-colors duration-300 disabled:opacity-40"
            >
              {loading ? '처리중...' : '배송 시작'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
