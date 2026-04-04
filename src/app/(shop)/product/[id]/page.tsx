import { notFound } from 'next/navigation'
import { getProduct } from '@/actions/products'
import ProductDetail from './ProductDetail'

type Props = {
  params: Promise<{ id: string }>
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params
  const product = await getProduct(id)

  if (!product) {
    notFound()
  }

  return <ProductDetail product={product} />
}
