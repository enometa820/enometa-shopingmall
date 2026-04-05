import { getProduct } from '@/actions/products'
import { notFound } from 'next/navigation'
import EditProductForm from './EditProductForm'

export default async function AdminEditProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const product = await getProduct(id)

  if (!product) {
    notFound()
  }

  return (
    <div>
      <h1 className="text-sm tracking-[2px] uppercase text-dark mb-8">상품 수정</h1>
      <EditProductForm product={product} />
    </div>
  )
}
