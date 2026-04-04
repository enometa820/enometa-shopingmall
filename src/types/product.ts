export type ProductCategory = 'top' | 'outer' | 'bottom' | 'shoes' | 'acc'

export type ProductColor = {
  name: string
  hex: string
}

export type ProductStock = Record<string, number> // { "S": 5, "M": 3, "L": 0 }

export type Product = {
  id: string
  name: string
  name_display: string
  price: number
  description: string | null
  category: ProductCategory
  sizes: string[]
  colors: ProductColor[]
  images: string[]
  hover_image: string | null
  stock: ProductStock
  is_featured: boolean
  created_at: string
  updated_at: string
}
