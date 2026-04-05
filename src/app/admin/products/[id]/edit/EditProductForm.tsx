'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { adminUpdateProduct } from '@/actions/admin'
import type { Product } from '@/types/product'

const CATEGORIES = ['top', 'outer', 'bottom', 'shoes', 'acc']
const DEFAULT_SIZES = ['S', 'M', 'L', 'XL']

type ColorEntry = { name: string; hex: string }
type StockEntry = { size: string; quantity: number }

export default function EditProductForm({ product }: { product: Product }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [colors, setColors] = useState<ColorEntry[]>(
    product.colors?.length ? product.colors : [{ name: '', hex: '#000000' }]
  )
  const [sizes, setSizes] = useState<string[]>(product.sizes || ['S', 'M', 'L'])
  const [stock, setStock] = useState<StockEntry[]>(
    Object.entries((product.stock as Record<string, number>) || {}).map(([size, quantity]) => ({ size, quantity }))
  )
  const [images, setImages] = useState<string[]>(
    product.images?.length ? product.images : ['']
  )

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const formData = new FormData(e.currentTarget)
    formData.set('sizes', sizes.join(', '))
    formData.set('colors', JSON.stringify(colors.filter((c) => c.name)))
    formData.set('stock', JSON.stringify(
      Object.fromEntries(stock.map((s) => [s.size, s.quantity]))
    ))
    formData.set('images', images.filter(Boolean).join(', '))

    const result = await adminUpdateProduct(product.id, formData)

    if (result.error) {
      setError(result.error)
      setLoading(false)
      return
    }

    router.push('/admin/products')
  }

  const syncStockWithSizes = (newSizes: string[]) => {
    setSizes(newSizes)
    setStock(newSizes.map((s) => ({
      size: s,
      quantity: stock.find((st) => st.size === s)?.quantity ?? 5,
    })))
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-[600px] space-y-6">
      <Field label="상품명" name="name" defaultValue={product.name} required />
      <Field label="표시명" name="name_display" defaultValue={product.name_display} required />
      <Field label="가격 (원)" name="price" type="number" defaultValue={String(product.price)} required />
      <Field label="설명" name="description" defaultValue={product.description || ''} textarea />

      <div>
        <label className="text-[10px] uppercase tracking-[1.5px] text-sub block mb-2">카테고리</label>
        <select
          name="category"
          defaultValue={product.category}
          required
          className="w-full text-xs py-2.5 px-3 border border-border outline-none focus:border-dark bg-white"
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c.toUpperCase()}</option>
          ))}
        </select>
      </div>

      {/* 사이즈 — 토글 버튼 */}
      <div>
        <label className="text-[10px] uppercase tracking-[1.5px] text-sub block mb-2">사이즈</label>
        <div className="flex gap-2 flex-wrap">
          {DEFAULT_SIZES.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => {
                const next = sizes.includes(s) ? sizes.filter((x) => x !== s) : [...sizes, s]
                syncStockWithSizes(next)
              }}
              className={`px-3 py-1.5 text-xs border transition-colors ${
                sizes.includes(s) ? 'border-dark bg-dark text-white' : 'border-border text-sub hover:border-dark'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* 컬러 — 동적 추가/삭제 */}
      <div>
        <label className="text-[10px] uppercase tracking-[1.5px] text-sub block mb-2">컬러</label>
        <div className="space-y-2">
          {colors.map((color, i) => (
            <div key={i} className="flex items-center gap-2">
              <input
                type="color"
                value={color.hex}
                onChange={(e) => {
                  const next = [...colors]
                  next[i] = { ...next[i], hex: e.target.value }
                  setColors(next)
                }}
                className="w-8 h-8 border border-border cursor-pointer"
              />
              <input
                type="text"
                value={color.name}
                onChange={(e) => {
                  const next = [...colors]
                  next[i] = { ...next[i], name: e.target.value }
                  setColors(next)
                }}
                placeholder="Ivory"
                className="flex-1 text-xs py-2 px-3 border border-border outline-none focus:border-dark"
              />
              {colors.length > 1 && (
                <button type="button" onClick={() => setColors(colors.filter((_, j) => j !== i))} className="text-sub hover:text-body text-sm">✕</button>
              )}
            </div>
          ))}
        </div>
        <button type="button" onClick={() => setColors([...colors, { name: '', hex: '#000000' }])} className="text-[10px] text-sub mt-2 hover:text-body">+ 컬러 추가</button>
      </div>

      {/* 재고 — 사이즈별 수량 */}
      <div>
        <label className="text-[10px] uppercase tracking-[1.5px] text-sub block mb-2">재고</label>
        <div className="grid grid-cols-2 gap-2">
          {stock.map((s, i) => (
            <div key={s.size} className="flex items-center gap-2">
              <span className="text-xs text-sub w-8">{s.size}</span>
              <input
                type="number"
                min="0"
                value={s.quantity}
                onChange={(e) => {
                  const next = [...stock]
                  next[i] = { ...next[i], quantity: parseInt(e.target.value) || 0 }
                  setStock(next)
                }}
                className="flex-1 text-xs py-2 px-3 border border-border outline-none focus:border-dark"
              />
            </div>
          ))}
        </div>
      </div>

      {/* 이미지 URL — 동적 추가 */}
      <div>
        <label className="text-[10px] uppercase tracking-[1.5px] text-sub block mb-2">이미지 URL</label>
        <div className="space-y-2">
          {images.map((url, i) => (
            <div key={i} className="flex items-center gap-2">
              <input
                type="text"
                value={url}
                onChange={(e) => {
                  const next = [...images]
                  next[i] = e.target.value
                  setImages(next)
                }}
                placeholder="https://... 또는 /images/products/01_main.png"
                className="flex-1 text-xs py-2 px-3 border border-border outline-none focus:border-dark"
              />
              {images.length > 1 && (
                <button type="button" onClick={() => setImages(images.filter((_, j) => j !== i))} className="text-sub hover:text-body text-sm">✕</button>
              )}
            </div>
          ))}
        </div>
        <button type="button" onClick={() => setImages([...images, ''])} className="text-[10px] text-sub mt-2 hover:text-body">+ 이미지 추가</button>
      </div>

      <Field label="호버 이미지 URL" name="hover_image" defaultValue={product.hover_image || ''} />

      <div className="flex items-center gap-2">
        <input type="checkbox" name="is_featured" value="true" id="featured" defaultChecked={product.is_featured} />
        <label htmlFor="featured" className="text-xs text-body">고퀄 상세페이지 (Featured)</label>
      </div>

      {error && <p className="text-xs text-red-500">{error}</p>}

      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2.5 bg-dark text-white text-xs uppercase tracking-[1.25px] hover:bg-accent transition-colors disabled:opacity-50"
        >
          {loading ? '저장 중...' : '수정 완료'}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2.5 border border-border text-xs uppercase tracking-[1.25px] hover:border-dark transition-colors"
        >
          취소
        </button>
      </div>
    </form>
  )
}

function Field({
  label, name, defaultValue, required, type = 'text', textarea
}: {
  label: string; name: string; defaultValue?: string; required?: boolean; type?: string; textarea?: boolean
}) {
  const cls = "w-full text-xs py-2.5 px-3 border border-border outline-none focus:border-dark transition-colors placeholder:text-muted"
  return (
    <div>
      <label className="text-[10px] uppercase tracking-[1.5px] text-sub block mb-2">{label}</label>
      {textarea ? (
        <textarea name={name} defaultValue={defaultValue} required={required} rows={3} className={cls + ' resize-none'} />
      ) : (
        <input type={type} name={name} defaultValue={defaultValue} required={required} className={cls} />
      )}
    </div>
  )
}
