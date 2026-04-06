'use client'

import type { PaymentMethod } from '@/types/order'
import { PAYMENT_METHOD_LABELS } from '@/types/order'

type Props = {
  value: PaymentMethod
  onChange: (method: PaymentMethod) => void
}

const METHODS: PaymentMethod[] = ['toss', 'bank_transfer']

export default function PaymentMethodSelect({ value, onChange }: Props) {
  return (
    <div className="pt-6">
      <p className="text-xs uppercase tracking-[1.25px] text-sub mb-3">결제 방법</p>
      <div className="flex gap-3">
        {METHODS.map((method) => (
          <label
            key={method}
            className={`flex-1 flex items-center justify-center gap-2 py-3 border text-xs cursor-pointer transition-colors duration-200 ${
              value === method
                ? 'border-dark text-dark'
                : 'border-border text-sub hover:border-body'
            }`}
          >
            <input
              type="radio"
              name="paymentMethod"
              value={method}
              checked={value === method}
              onChange={() => onChange(method)}
              className="sr-only"
            />
            <span
              className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center ${
                value === method ? 'border-dark' : 'border-border'
              }`}
            >
              {value === method && (
                <span className="w-1.5 h-1.5 rounded-full bg-dark" />
              )}
            </span>
            {PAYMENT_METHOD_LABELS[method]}
          </label>
        ))}
      </div>
    </div>
  )
}
