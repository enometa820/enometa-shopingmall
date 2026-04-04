import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

// 상품 이미지 매핑 (seed.sql 순서 기준)
// 01: WRINKLE KNIT TOP, 02: OVERSIZED COTTON TEE, 03: SILK BLEND BLOUSE
// 04: TAILORED WOOL COAT, 05: LIGHT TRENCH JACKET
// 06: SATIN EASY PANTS, 07: CLASSIC MIDI SKIRT, 08: WIDE LEG TROUSERS
// 09: MINIMAL LEATHER LOAFER, 10: SUEDE ANKLE BOOTS
// 11: LEATHER MINI BAG, 12: CASHMERE BLEND SCARF

const PRODUCT_IMAGES: Record<string, { images: string[]; hover: string }> = {
  'WRINKLE KNIT TOP': {
    images: ['/images/products/01_main.png', '/images/products/01_hover.png'],
    hover: '/images/products/01_hover.png',
  },
  'OVERSIZED COTTON TEE': {
    images: ['/images/products/02_main.png', '/images/products/02_hover.png'],
    hover: '/images/products/02_hover.png',
  },
  'SILK BLEND BLOUSE': {
    images: ['/images/products/03_main.png', '/images/products/03_hover.png'],
    hover: '/images/products/03_hover.png',
  },
  'TAILORED WOOL COAT': {
    images: ['/images/products/04_main.png', '/images/products/04_hover.png'],
    hover: '/images/products/04_hover.png',
  },
  'LIGHT TRENCH JACKET': {
    images: ['/images/products/05_main.png', '/images/products/05_hover.png'],
    hover: '/images/products/05_hover.png',
  },
  'SATIN EASY PANTS': {
    images: ['/images/products/06_main.png', '/images/products/06_hover.png'],
    hover: '/images/products/06_hover.png',
  },
  'CLASSIC MIDI SKIRT': {
    images: ['/images/products/07_main.png', '/images/products/07_hover.png'],
    hover: '/images/products/07_hover.png',
  },
  'WIDE LEG TROUSERS': {
    images: ['/images/products/08_main.png', '/images/products/08_hover.png'],
    hover: '/images/products/08_hover.png',
  },
  'MINIMAL LEATHER LOAFER': {
    images: ['/images/products/09_main.png', '/images/products/09_hover.png'],
    hover: '/images/products/09_hover.png',
  },
  'SUEDE ANKLE BOOTS': {
    images: ['/images/products/10_main.png', '/images/products/10_hover.png'],
    hover: '/images/products/10_hover.png',
  },
  'LEATHER MINI BAG': {
    images: ['/images/products/11_main.png', '/images/products/11_hover.png'],
    hover: '/images/products/11_hover.png',
  },
  'CASHMERE BLEND SCARF': {
    images: ['/images/products/12_main.png', '/images/products/12_hover.png'],
    hover: '/images/products/12_hover.png',
  },
}

export async function POST() {
  const supabase = createAdminClient()

  const { data: products, error } = await supabase
    .from('products')
    .select('id, name')

  if (error || !products) {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }

  const results = []

  for (const product of products) {
    const mapping = PRODUCT_IMAGES[product.name]
    if (!mapping) {
      results.push({ name: product.name, status: 'skipped' })
      continue
    }

    const { error: updateError } = await supabase
      .from('products')
      .update({
        images: mapping.images,
        hover_image: mapping.hover,
      })
      .eq('id', product.id)

    results.push({
      name: product.name,
      status: updateError ? `error: ${updateError.message}` : 'updated',
    })
  }

  return NextResponse.json({ results })
}
