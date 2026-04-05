'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCartStore } from '@/store/cart-store'
import { formatPrice } from '@/lib/utils/format'
import type { Product, ProductColor } from '@/types/product'

type Props = {
  product: Product
}

export default function ProductDetail({ product }: Props) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0])
  const [addedFeedback, setAddedFeedback] = useState(false)
  const [zoomImage, setZoomImage] = useState<string | null>(null)
  const addItem = useCartStore((s) => s.addItem)

  const stock = product.stock as Record<string, number>
  const isSizeInStock = (size: string) => (stock[size] ?? 0) > 0
  const canAdd = selectedSize !== null && isSizeInStock(selectedSize)

  const handleAddToCart = useCallback(() => {
    if (!canAdd || !selectedSize || addedFeedback) return

    addItem({
      product_id: product.id,
      product_name: product.name_display,
      product_image: product.images[0] || '',
      size: selectedSize,
      color: selectedColor.name,
      quantity: 1,
      price: product.price,
    })

    setAddedFeedback(true)
    setTimeout(() => setAddedFeedback(false), 1500)
  }, [canAdd, selectedSize, selectedColor, product, addItem, addedFeedback])

  return (
    <>
      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-var(--header-height))]">
        {/* Left — Image Gallery */}
        <div className="lg:w-[60%]">
          {/* Mobile — Horizontal Scroll */}
          <div className="lg:hidden flex overflow-x-auto snap-x snap-mandatory">
            {product.images.map((img, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-full snap-center cursor-zoom-in"
                onClick={() => setZoomImage(img)}
              >
                <img
                  src={img}
                  alt={`${product.name_display} ${i + 1}`}
                  className="w-full object-cover"
                />
              </div>
            ))}
          </div>
          {/* Mobile — Indicator Dots */}
          <div className="lg:hidden flex justify-center gap-1.5 py-3">
            {product.images.map((_, i) => (
              <span key={i} className="w-1.5 h-1.5 rounded-full bg-border" />
            ))}
          </div>

          {/* Desktop — Vertical Scroll */}
          <div className="hidden lg:block space-y-3">
            {product.images.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="cursor-zoom-in"
                onClick={() => setZoomImage(img)}
              >
                <img
                  src={img}
                  alt={`${product.name_display} ${i + 1}`}
                  className="w-full object-cover"
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right — Product Info (sticky on desktop) */}
        <div className="lg:w-[40%] lg:sticky lg:top-[var(--header-height)] lg:h-[calc(100vh-var(--header-height))] lg:overflow-y-auto">
          <div className="px-6 lg:px-10 py-8 lg:py-12">
            {/* Name + Price */}
            <h1 className="text-sm tracking-[1.5px] uppercase font-normal text-dark">
              {product.name}
            </h1>
            {selectedColor && (
              <p className="text-xs text-sub mt-1 tracking-wide">
                [{selectedColor.name.toUpperCase()}]
              </p>
            )}
            <p className="text-sm mt-4">{formatPrice(product.price)}</p>

            {/* Description */}
            {product.description && (
              <p className="text-xs text-sub leading-relaxed mt-6">
                {product.description}
              </p>
            )}

            {/* Divider */}
            <div className="my-8 border-t border-border" />

            {/* Color Selector */}
            <div className="mb-6">
              <p className="text-[10px] uppercase tracking-[1.5px] text-sub mb-3">COLOR</p>
              <div className="flex gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    className={`w-7 h-7 rounded-full border-2 transition-all duration-300 ${
                      selectedColor.name === color.name
                        ? 'border-dark scale-110'
                        : 'border-border hover:border-sub'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="mb-8">
              <p className="text-[10px] uppercase tracking-[1.5px] text-sub mb-3">SIZE</p>
              <div className="flex gap-2 flex-wrap">
                {product.sizes.map((size) => {
                  const inStock = isSizeInStock(size)
                  const isSelected = selectedSize === size
                  return (
                    <button
                      key={size}
                      onClick={() => inStock && setSelectedSize(size)}
                      disabled={!inStock}
                      className={`min-w-[48px] py-2 px-3 text-xs tracking-wide border transition-all duration-300 ${
                        isSelected
                          ? 'border-dark bg-dark text-white'
                          : inStock
                            ? 'border-border text-body hover:border-dark'
                            : 'border-border text-muted line-through cursor-not-allowed'
                      }`}
                    >
                      {size}
                    </button>
                  )
                })}
              </div>
              {!selectedSize && (
                <p className="text-[10px] text-sub mt-2">사이즈를 선택해주세요</p>
              )}
            </div>
          </div>
        </div>

        {/* Sticky Bar — Bottom Fixed */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border z-30 px-6 py-4">
          <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-4">
            <div className="hidden md:block">
              <p className="text-xs uppercase tracking-wide">{product.name_display}</p>
              <p className="text-xs text-sub mt-0.5">{formatPrice(product.price)}</p>
            </div>
            <button
              onClick={handleAddToCart}
              disabled={!canAdd}
              className={`flex-1 md:flex-none md:min-w-[280px] py-3.5 text-xs uppercase tracking-[1.5px] text-center transition-all duration-300 ${
                canAdd
                  ? addedFeedback
                    ? 'bg-dark text-white'
                    : 'bg-dark text-white hover:bg-accent'
                  : 'bg-border text-muted cursor-not-allowed'
              }`}
            >
              {addedFeedback ? '장바구니에 담았습니다 ✓' : canAdd ? '장바구니 담기' : '사이즈를 선택해주세요'}
            </button>
          </div>
        </div>
      </div>

      {/* Zoom Modal */}
      <AnimatePresence>
        {zoomImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-white flex items-center justify-center cursor-zoom-out"
            onClick={() => setZoomImage(null)}
          >
            <img
              src={zoomImage}
              alt={product.name_display}
              className="max-w-full max-h-full object-contain"
            />
            <button
              onClick={() => setZoomImage(null)}
              className="absolute top-6 right-6 text-body hover:opacity-60 transition-opacity text-lg"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
