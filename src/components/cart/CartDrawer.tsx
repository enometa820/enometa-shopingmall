'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCartStore } from '@/store/cart-store'
import { formatPrice } from '@/lib/utils/format'
import Link from 'next/link'

type Props = {
  isOpen: boolean
  onClose: () => void
}

export default function CartDrawer({ isOpen, onClose }: Props) {
  const items = useCartStore((s) => s.items)
  const removeItem = useCartStore((s) => s.removeItem)
  const updateQuantity = useCartStore((s) => s.updateQuantity)
  const getTotal = useCartStore((s) => s.getTotal)

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEsc)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 bg-black/30 z-[80]"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed top-0 right-0 bottom-0 w-[400px] max-w-full bg-white z-[90] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 h-[var(--header-height)] border-b border-border">
              <span className="text-xs tracking-[1.25px] uppercase font-normal">
                CART ({items.length})
              </span>
              <button
                onClick={onClose}
                className="text-body hover:opacity-60 transition-opacity duration-300 text-lg"
              >
                ✕
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-sub text-xs">
                  <p className="mb-4">장바구니가 비어있습니다</p>
                  <button
                    onClick={onClose}
                    className="text-body underline underline-offset-4 hover:opacity-60 transition-opacity"
                  >
                    쇼핑 계속하기
                  </button>
                </div>
              ) : (
                <ul className="space-y-6">
                  {items.map((item) => (
                    <li
                      key={`${item.product_id}-${item.size}-${item.color}`}
                      className="flex gap-4"
                    >
                      {/* Thumbnail */}
                      <div className="w-20 h-24 bg-gray-100 flex-shrink-0 overflow-hidden">
                        {item.product_image && (
                          <img
                            src={item.product_image}
                            alt={item.product_name}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <p className="text-xs font-normal uppercase tracking-wide">
                            {item.product_name}
                          </p>
                          <p className="text-xs text-sub mt-1">
                            {item.color} / {item.size}
                          </p>
                          <p className="text-xs mt-1">{formatPrice(item.price)}</p>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.product_id,
                                  item.size,
                                  item.color,
                                  item.quantity - 1
                                )
                              }
                              className="text-sub hover:text-body text-xs"
                            >
                              −
                            </button>
                            <span className="text-xs w-4 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.product_id,
                                  item.size,
                                  item.color,
                                  item.quantity + 1
                                )
                              }
                              className="text-sub hover:text-body text-xs"
                            >
                              +
                            </button>
                          </div>
                          <button
                            onClick={() =>
                              removeItem(item.product_id, item.size, item.color)
                            }
                            className="text-sub hover:text-body text-xs"
                          >
                            삭제
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-border px-6 py-4 space-y-3">
                <div className="flex justify-between text-xs">
                  <span className="uppercase tracking-wide">합계</span>
                  <span className="font-normal">{formatPrice(getTotal())}</span>
                </div>
                <Link
                  href="/checkout"
                  onClick={onClose}
                  className="block w-full text-center py-3.5 bg-dark text-white text-sm uppercase tracking-[1.25px] hover:bg-accent transition-colors duration-300 font-normal"
                >
                  결제하기
                </Link>
                <button
                  onClick={onClose}
                  className="block w-full text-center py-2 text-xs text-sub hover:text-body uppercase tracking-wide transition-colors duration-300"
                >
                  쇼핑 계속하기
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
