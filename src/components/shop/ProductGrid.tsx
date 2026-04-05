'use client'

import { cn } from '@/lib/utils/cn'
import ProductCard from './ProductCard'
import type { Product } from '@/types/product'

type Props = {
  products: Product[]
  gridCols: 2 | 3 | 4
}

export default function ProductGrid({ products, gridCols }: Props) {
  const gridClass = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-4',
  }

  if (products.length === 0) {
    return (
      <div className="py-20 text-center text-xs text-sub">
        상품이 없습니다.
      </div>
    )
  }

  return (
    <div className={cn('grid gap-x-5 gap-y-10', gridClass[gridCols])}>
      {products.map((product, i) => (
        <ProductCard key={product.id} product={product} priority={i < 4} />
      ))}
    </div>
  )
}
