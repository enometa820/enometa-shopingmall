import { Suspense } from 'react'
import { getProducts } from '@/actions/products'
import ShopContent from './ShopContent'

export default async function ShopPage() {
  const products = await getProducts()

  return (
    <div className="px-5 md:px-10 py-12 md:py-16">
      <Suspense fallback={<ShopSkeleton />}>
        <ShopContent initialProducts={products} />
      </Suspense>
    </div>
  )
}

function ShopSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-x-5 gap-y-10">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i}>
          <div className="aspect-[2/3] bg-neutral-100 animate-pulse" />
          <div className="mt-3 h-3 w-32 bg-neutral-100 animate-pulse" />
          <div className="mt-2 h-3 w-20 bg-neutral-100 animate-pulse" />
        </div>
      ))}
    </div>
  )
}
