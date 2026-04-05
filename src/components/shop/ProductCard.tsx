'use client'

import Link from 'next/link'
import Image from 'next/image'
import { formatPrice } from '@/lib/utils/format'
import type { Product } from '@/types/product'

type Props = {
  product: Product
}

export default function ProductCard({ product }: Props) {
  const mainImage = product.images[0] || 'https://placehold.co/900x1350/e8e8e8/4a4a4a?text=NO+IMAGE'
  const hoverImage = product.hover_image || product.images[1] || mainImage

  // 사용 가능한 사이즈 (재고 > 0)
  const availableSizes = product.sizes.filter(
    (s) => (product.stock as Record<string, number>)[s] > 0
  )

  return (
    <Link href={`/product/${product.id}`} className="group block">
      {/* Image Container */}
      <div className="relative aspect-[2/3] overflow-hidden bg-neutral-100 mb-3">
        {/* Main Image */}
        <Image
          src={mainImage}
          alt={product.name_display}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover transition-opacity duration-[400ms] ease-[cubic-bezier(0.165,0.84,0.44,1)] group-hover:opacity-0"
        />
        {/* Hover Image */}
        <Image
          src={hoverImage}
          alt={`${product.name_display} detail`}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover opacity-0 transition-opacity duration-[400ms] ease-[cubic-bezier(0.165,0.84,0.44,1)] group-hover:opacity-100"
        />

        {/* Hover Preview — sizes + colors */}
        <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm px-3 py-2.5 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out hidden md:block">
          {/* Sizes */}
          <div className="flex gap-2 mb-1.5">
            {product.sizes.map((size) => {
              const inStock = (product.stock as Record<string, number>)[size] > 0
              return (
                <span
                  key={size}
                  className={`text-[10px] tracking-wide ${inStock ? 'text-body' : 'text-muted line-through'}`}
                >
                  {size}
                </span>
              )
            })}
          </div>
          {/* Colors */}
          <div className="flex gap-1.5">
            {product.colors.map((color) => (
              <span
                key={color.name}
                className="w-3 h-3 rounded-full border border-border"
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="group-hover:translate-y-[-2px] transition-transform duration-300">
        <p className="text-xs font-normal uppercase tracking-wide text-body leading-tight">
          {product.name_display}
        </p>
        <p className="text-xs text-body mt-1">
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  )
}
