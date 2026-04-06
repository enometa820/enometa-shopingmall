'use client'

import { Suspense, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCartStore } from '@/store/cart-store'
import { createOrder } from '@/actions/orders'

function SuccessContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const clearCart = useCartStore((s) => s.clearCart)
  const items = useCartStore((s) => s.items)
  const getTotal = useCartStore((s) => s.getTotal)
  const [error, setError] = useState('')

  useEffect(() => {
    const paymentKey = searchParams.get('paymentKey')
    const orderId = searchParams.get('orderId')
    const amount = searchParams.get('amount')

    if (!paymentKey || !orderId || !amount) {
      setError('결제 정보가 올바르지 않습니다.')
      return
    }

    const confirmPayment = async () => {
      const confirmRes = await fetch('/api/payments/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentKey,
          orderId,
          amount: Number(amount),
        }),
      })

      if (!confirmRes.ok) {
        const data = await confirmRes.json()
        setError(data.error || '결제 확인에 실패했습니다.')
        return
      }

      const result = await createOrder({
        items,
        total: getTotal(),
        shippingName: searchParams.get('shippingName') ?? '',
        shippingPhone: searchParams.get('shippingPhone') ?? '',
        postalCode: searchParams.get('shippingPostalCode') ?? '',
        shippingAddress: searchParams.get('shippingAddress') ?? '',
        shippingDetail: searchParams.get('shippingDetail') ?? '',
        shippingMemo: searchParams.get('shippingMemo') ?? '',
        paymentKey,
      })

      if (result.error) {
        setError(result.error)
        return
      }

      clearCart()
      router.replace(`/order-complete/${result.orderId}`)
    }

    confirmPayment()
  }, [])

  if (error) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-xs">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={() => router.push('/checkout')}
          className="text-body underline underline-offset-4"
        >
          다시 시도하기
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center text-xs text-sub">
      결제 확인 중...
    </div>
  )
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-[60vh] flex items-center justify-center text-xs text-sub">로딩 중...</div>}>
      <SuccessContent />
    </Suspense>
  )
}
