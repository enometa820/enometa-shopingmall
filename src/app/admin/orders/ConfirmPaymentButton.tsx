'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { adminUpdateOrderStatus } from '@/actions/admin'

export default function ConfirmPaymentButton({ orderId }: { orderId: string }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleConfirm = async () => {
    if (!confirm('입금을 확인하시겠습니까?')) return

    setLoading(true)
    try {
      const result = await adminUpdateOrderStatus(orderId, 'paid')
      if (result.error) {
        alert(result.error)
      }
      router.refresh()
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleConfirm}
      disabled={loading}
      className="text-[10px] px-2 py-1 border border-green-300 bg-green-50 text-green-700 hover:bg-green-100 transition-colors disabled:opacity-50 whitespace-nowrap"
    >
      {loading ? '처리중...' : '결제 확인'}
    </button>
  )
}
