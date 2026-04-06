'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useCartStore } from '@/store/cart-store'
import { createOrder } from '@/actions/orders'
import { formatPrice } from '@/lib/utils/format'
import AddressSearch from '@/components/checkout/AddressSearch'
import PaymentMethodSelect from '@/components/checkout/PaymentMethodSelect'
import type { PaymentMethod } from '@/types/order'
import Script from 'next/script'

declare global {
  interface Window {
    PaymentWidget: any
  }
}

export default function CheckoutPage() {
  const router = useRouter()
  const items = useCartStore((s) => s.items)
  const getTotal = useCartStore((s) => s.getTotal)
  const clearCart = useCartStore((s) => s.clearCart)

  const [form, setForm] = useState({
    name: '',
    phone: '',
    postalCode: '',
    address: '',
    detail: '',
    memo: '',
  })
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('toss')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [widgetReady, setWidgetReady] = useState(false)
  const paymentWidgetRef = useRef<any>(null)

  const total = getTotal()
  const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY

  // 토스페이먼츠 위젯 렌더링
  useEffect(() => {
    if (!widgetReady || !clientKey || total <= 0) return

    const PaymentWidget = window.PaymentWidget
    if (!PaymentWidget) return

    const widget = PaymentWidget(clientKey, PaymentWidget.ANONYMOUS)
    paymentWidgetRef.current = widget

    widget.renderPaymentMethods('#payment-method', { value: total })
    widget.renderAgreement('#agreement')
  }, [widgetReady, clientKey, total])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (items.length === 0) return
    setError('')
    setLoading(true)

    // 계좌이체 결제
    if (paymentMethod === 'bank_transfer') {
      const result = await createOrder({
        items,
        total,
        shippingName: form.name,
        shippingPhone: form.phone,
        postalCode: form.postalCode,
        shippingAddress: form.address,
        shippingDetail: form.detail,
        shippingMemo: form.memo,
        paymentMethod: 'bank_transfer',
      })

      if (result.error) {
        setError(result.error)
        setLoading(false)
        return
      }

      clearCart()
      router.push(`/order-complete/${result.orderId}`)
      return
    }

    const orderId = `ENO_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`

    // 토스페이먼츠가 설정되어 있으면 결제 위젯 사용
    if (paymentWidgetRef.current && clientKey) {
      try {
        await paymentWidgetRef.current.requestPayment({
          orderId,
          orderName: items.length === 1
            ? items[0].product_name
            : `${items[0].product_name} 외 ${items.length - 1}건`,
          customerName: form.name,
          customerMobilePhone: form.phone.replace(/-/g, ''),
          successUrl: `${window.location.origin}/checkout/success?shippingName=${encodeURIComponent(form.name)}&shippingPhone=${encodeURIComponent(form.phone)}&shippingPostalCode=${encodeURIComponent(form.postalCode)}&shippingAddress=${encodeURIComponent(form.address)}&shippingDetail=${encodeURIComponent(form.detail)}&shippingMemo=${encodeURIComponent(form.memo)}`,
          failUrl: `${window.location.origin}/checkout/fail`,
        })
      } catch (err: any) {
        if (err.code === 'USER_CANCEL') {
          setLoading(false)
          return
        }
        setError(err.message || '결제 중 오류가 발생했습니다.')
        setLoading(false)
      }
      return
    }

    // 토스페이먼츠 미설정 시 데모 결제
    const result = await createOrder({
      items,
      total,
      shippingName: form.name,
      shippingPhone: form.phone,
      postalCode: form.postalCode,
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
    <>
      {clientKey && (
        <Script
          src="https://js.tosspayments.com/v1/payment-widget"
          onLoad={() => setWidgetReady(true)}
        />
      )}

      <div className="px-5 md:px-10 py-12 md:py-16 max-w-[1200px] mx-auto">
        <h1 className="text-sm tracking-[2px] uppercase text-dark mb-10">CHECKOUT</h1>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* Left — Shipping Form + Payment */}
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
            <AddressSearch
              onChange={({ postalCode, address }) =>
                setForm((prev) => ({ ...prev, postalCode, address }))
              }
              defaultPostalCode={form.postalCode}
              defaultAddress={form.address}
            />
            <input
              name="detail"
              value={form.detail}
              onChange={handleChange}
              placeholder="상세 주소 (동/호수)"
              className="w-full text-xs py-3 border-b border-border outline-none focus:border-dark transition-colors placeholder:text-muted"
            />
            <input
              name="memo"
              value={form.memo}
              onChange={handleChange}
              placeholder="배송 메모 (선택)"
              className="w-full text-xs py-3 border-b border-border outline-none focus:border-dark transition-colors placeholder:text-muted"
            />

            {/* 결제 방법 선택 */}
            <PaymentMethodSelect value={paymentMethod} onChange={setPaymentMethod} />

            {/* 토스페이먼츠 위젯 */}
            {clientKey && paymentMethod === 'toss' && (
              <div className="pt-4 space-y-4">
                <p className="text-xs uppercase tracking-[1.25px] text-sub">결제 수단</p>
                <div id="payment-method" />
                <div id="agreement" />
              </div>
            )}

            {error && <p className="text-xs text-red-500">{error}</p>}

            <div className="pt-6">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-dark text-white text-xs uppercase tracking-[1.5px] hover:bg-accent transition-colors duration-300 disabled:opacity-50"
              >
                {loading
                  ? '처리 중...'
                  : paymentMethod === 'bank_transfer'
                    ? `${formatPrice(total)} 주문하기`
                    : `${formatPrice(total)} 주문하기${clientKey ? '' : ' (데모)'}`
                }
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
    </>
  )
}
