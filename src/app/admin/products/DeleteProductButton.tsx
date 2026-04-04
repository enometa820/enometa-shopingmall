'use client'

import { useRouter } from 'next/navigation'
import { adminDeleteProduct } from '@/actions/admin'

export default function DeleteProductButton({ id, name }: { id: string; name: string }) {
  const router = useRouter()

  const handleDelete = async () => {
    if (!confirm(`"${name}" 상품을 삭제하시겠습니까?`)) return
    await adminDeleteProduct(id)
    router.refresh()
  }

  return (
    <button
      onClick={handleDelete}
      className="text-red-400 hover:text-red-600 transition-colors"
    >
      삭제
    </button>
  )
}
