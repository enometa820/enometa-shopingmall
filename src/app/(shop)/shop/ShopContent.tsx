'use client'

import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import CategoryFilter from '@/components/shop/CategoryFilter'
import GridToggle from '@/components/shop/GridToggle'
import ProductGrid from '@/components/shop/ProductGrid'
import type { Product, ProductCategory } from '@/types/product'

type Props = {
  initialProducts: Product[]
}

export default function ShopContent({ initialProducts }: Props) {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get('category') as ProductCategory | null

  const [category, setCategory] = useState<ProductCategory | 'all'>(categoryParam || 'all')
  const [gridCols, setGridCols] = useState<2 | 3 | 4>(3)

  // localStorage에서 그리드 설정 복원
  useEffect(() => {
    const saved = localStorage.getItem('enometa-grid')
    if (saved && [2, 3, 4].includes(Number(saved))) {
      setGridCols(Number(saved) as 2 | 3 | 4)
    }
  }, [])

  // URL 파라미터 변경 시 카테고리 동기화
  useEffect(() => {
    if (categoryParam) {
      setCategory(categoryParam)
    }
  }, [categoryParam])

  const handleGridChange = (mode: 2 | 3 | 4) => {
    setGridCols(mode)
    localStorage.setItem('enometa-grid', String(mode))
  }

  const filtered = useMemo(() => {
    if (category === 'all') return initialProducts
    return initialProducts.filter((p) => p.category === category)
  }, [initialProducts, category])

  return (
    <>
      {/* Desktop — Filter + Grid Toggle */}
      <div className="hidden md:flex items-center justify-between mb-14">
        <div className="flex items-center gap-8">
          <CategoryFilter active={category} onChange={setCategory} />
          <Link
            href="/lookbook"
            className="text-xs tracking-[1.25px] uppercase text-sub hover:text-body pb-1 transition-all duration-300"
          >
            LOOKBOOK
          </Link>
        </div>
        <GridToggle active={gridCols} onChange={handleGridChange} />
      </div>

      {/* Product Grid */}
      <ProductGrid products={filtered} gridCols={gridCols} />

      {/* Count */}
      <div className="mt-12 text-center">
        <span className="text-[10px] text-muted tracking-wide uppercase">
          {filtered.length} products
        </span>
      </div>
    </>
  )
}
