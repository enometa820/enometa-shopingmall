'use client'

import { cn } from '@/lib/utils/cn'
import type { ProductCategory } from '@/types/product'

const CATEGORIES: { label: string; value: ProductCategory | 'all' }[] = [
  { label: 'ALL', value: 'all' },
  { label: 'TOP', value: 'top' },
  { label: 'OUTER', value: 'outer' },
  { label: 'BOTTOM', value: 'bottom' },
  { label: 'SHOES', value: 'shoes' },
  { label: 'ACC', value: 'acc' },
]

type Props = {
  active: ProductCategory | 'all'
  onChange: (category: ProductCategory | 'all') => void
}

export default function CategoryFilter({ active, onChange }: Props) {
  return (
    <div className="flex gap-6 md:gap-8 flex-wrap">
      {CATEGORIES.map((cat) => (
        <button
          key={cat.value}
          onClick={() => onChange(cat.value)}
          className={cn(
            'text-xs tracking-[1.25px] uppercase pb-1 transition-all duration-300',
            active === cat.value
              ? 'text-dark border-b border-dark'
              : 'text-sub hover:text-body'
          )}
        >
          {cat.label}
        </button>
      ))}
    </div>
  )
}
