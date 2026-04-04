'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { adminCreateProduct } from '@/actions/admin'

const CATEGORIES = ['top', 'outer', 'bottom', 'shoes', 'acc']

export default function AdminNewProductPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const formData = new FormData(e.currentTarget)
    const result = await adminCreateProduct(formData)

    if (result.error) {
      setError(result.error)
      setLoading(false)
      return
    }

    router.push('/admin/products')
  }

  return (
    <div>
      <h1 className="text-sm tracking-[2px] uppercase text-dark mb-8">상품 등록</h1>

      <form onSubmit={handleSubmit} className="max-w-[600px] space-y-4">
        <Field label="상품명" name="name" placeholder="WRINKLE KNIT TOP" required />
        <Field label="표시명" name="name_display" placeholder="WRINKLE KNIT TOP [IVORY]" required />
        <Field label="가격 (원)" name="price" type="number" placeholder="159000" required />
        <Field label="설명" name="description" placeholder="상품 설명..." textarea />

        <div>
          <label className="text-[10px] uppercase tracking-[1.5px] text-sub block mb-2">카테고리</label>
          <select
            name="category"
            required
            className="w-full text-xs py-2.5 px-3 border border-border outline-none focus:border-dark bg-white"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c.toUpperCase()}</option>
            ))}
          </select>
        </div>

        <Field label="사이즈 (쉼표 구분)" name="sizes" placeholder="S, M, L, XL" required />
        <Field label="컬러 (JSON)" name="colors" placeholder='[{"name":"Ivory","hex":"#F5F0EB"}]' required />
        <Field label="재고 (JSON)" name="stock" placeholder='{"S":5,"M":3,"L":2}' required />
        <Field label="이미지 URL (쉼표 구분)" name="images" placeholder="https://..." textarea />
        <Field label="호버 이미지 URL" name="hover_image" placeholder="https://..." />

        <div className="flex items-center gap-2">
          <input type="checkbox" name="is_featured" value="true" id="featured" />
          <label htmlFor="featured" className="text-xs text-body">고퀄 상세페이지 (Featured)</label>
        </div>

        {error && <p className="text-xs text-red-500">{error}</p>}

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 bg-dark text-white text-xs uppercase tracking-[1.25px] hover:bg-accent transition-colors disabled:opacity-50"
          >
            {loading ? '저장 중...' : '저장'}
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
    </div>
  )
}

function Field({
  label, name, placeholder, required, type = 'text', textarea
}: {
  label: string; name: string; placeholder?: string; required?: boolean; type?: string; textarea?: boolean
}) {
  const cls = "w-full text-xs py-2.5 px-3 border border-border outline-none focus:border-dark transition-colors placeholder:text-muted"
  return (
    <div>
      <label className="text-[10px] uppercase tracking-[1.5px] text-sub block mb-2">{label}</label>
      {textarea ? (
        <textarea name={name} placeholder={placeholder} required={required} rows={3} className={cls + ' resize-none'} />
      ) : (
        <input type={type} name={name} placeholder={placeholder} required={required} className={cls} />
      )}
    </div>
  )
}
