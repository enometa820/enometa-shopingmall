'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCartStore } from '@/store/cart-store'
import { createOrder } from '@/actions/orders'
import { formatPrice } from '@/lib/utils/format'

export default function CheckoutPage() {
  const router = useRouter()
  const items = useCartStore((s) => s.items)
  const getTotal = useCartStore((s) => s.getTotal)
  const clearCart = useCartStore((s) => s.clearCart)

  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
    detail: '',
    memo: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const total = getTotal()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (items.length === 0) return
    setError('')
    setLoading(true)

    // TODO: 토스페이먼츠 결제 연동 시 여기서 결제 처리 후 paymentKey 전달
    // 지금은 결제 없이 바로 주문 생성 (데모)

    const result = await createOrder({
      items,
      total,
      shippingName: form.name,
      shippingPhone: form.phone,
      shippingAddress: form.address,
      shippingDetail: form.detail,
      shippingMemo: form.memo,
      paymentKey: `demo_${Date.now()}`,
    })

    if (result.error) {
      setError(result.error)
      setLoading(false)
      return
    }

    clearCart()
    router.push(`/order-complete/${result.orderId}`)
  }

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-xs text-sub">
        <p>장바구니가 비어있습니다.</p>
        <button
          onClick={() => router.push('/shop')}
          className="mt-4 text-body underline underline-offset-4"
        >
          쇼핑하러 가기
        </button>
      </div>
    )
  }

  return (
    <div className="px-5 md:px-10 py-12 md:py-16 max-w-[1200px] mx-auto">
      <h1 className="text-sm tracking-[2px] uppercase text-dark mb-10">CHECKOUT</h1>

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
        {/* Left — Shipping Form */}
        <form onSubmit={handleSubmit} className="flex-1 space-y-4">
          <p className="text-xs uppercase tracking-[1.25px] text-sub mb-4">배송 정보</p>

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="이름"
            required
            className="w-full text-xs py-3 border-b border-border outline-none focus:border-dark transition-colors placeholder:text-muted"
          />
          <input
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder="전화번호"
            required
            className="w-full text-xs py-3 border-b border-border outline-none focus:border-dark transition-colors placeholder:text-muted"
          />
          <input
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="주소"
            required
            className="w-full text-xs py-3 border-b border-border outline-none focus:border-dark transition-colors placeholder:text-muted"
          />
          <input
            name="detail"
            value={form.detail}
            onChange={handleChange}
            placeholder="상세 주소"
            className="w-full text-xs py-3 border-b border-border outline-none focus:border-dark transition-colors placeholder:text-muted"
          />
          <input
            name="memo"
            value={form.memo}
            onChange={handleChange}
            placeholder="배송 메모 (선택)"
            className="w-full text-xs py-3 border-b border-border outline-none focus:border-dark transition-colors placeholder:text-muted"
          />

          {error && <p className="text-xs text-red-500">{error}</p>}

          <div className="pt-6">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-dark text-white text-xs uppercase tracking-[1.5px] hover:bg-accent transition-colors duration-300 disabled:opacity-50"
            >
              {loading ? '처리 중...' : `${formatPrice(total)} 주문하기 (데모)`}
            </button>
          </div>
        </form>

        {/* Right — Order Summary */}
        <div className="lg:w-[360px]">
          <p className="text-xs uppercase tracking-[1.25px] text-sub mb-4">주문 요약</p>

          <ul className="space-y-4 border-b border-border pb-6">
            {items.map((item) => (
              <li
                key={`${item.product_id}-${item.size}-${item.color}`}
                className="flex justify-between text-xs"
              >
                <div>
                  <p className="uppercase tracking-wide">{item.product_name}</p>
                  <p className="text-sub mt-0.5">
                    {item.color} / {item.size} × {item.quantity}
                  </p>
                </div>
                <p>{formatPrice(item.price * item.quantity)}</p>
              </li>
            ))}
          </ul>

          <div className="flex justify-between text-xs mt-4 pt-4">
            <span className="uppercase tracking-wide">합계</span>
            <span className="font-normal text-dark">{formatPrice(total)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
