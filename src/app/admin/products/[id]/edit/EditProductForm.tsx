'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { adminUpdateProduct } from '@/actions/admin'
import type { Product } from '@/types/product'

const CATEGORIES = ['top', 'outer', 'bottom', 'shoes', 'acc']

export default function EditProductForm({ product }: { product: Product }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const formData = new FormData(e.currentTarget)
    const result = await adminUpdateProduct(product.id, formData)

    if (result.error) {
      setError(result.error)
      setLoading(false)
      return
    }

    router.push('/admin/products')
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-[600px] space-y-4">
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

      <Field label="사이즈 (쉼표 ��분)" name="sizes" defaultValue={product.sizes?.join(', ')} required />
      <Field label="컬러 (JSON)" name="colors" defaultValue={JSON.stringify(product.colors)} required />
      <Field label="재고 (JSON)" name="stock" defaultValue={JSON.stringify(product.stock)} required />
      <Field label="이미�� URL (쉼표 구��)" name="images" defaultValue={product.images?.join(', ')} textarea />
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
          {loading ? '저장 중...' : '수정 완��'}
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
