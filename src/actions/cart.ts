'use server'

import { createClient } from '@/lib/supabase/server'
import type { CartItem } from '@/types/cart'

export async function getCartItems(): Promise<CartItem[]> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  const { data, error } = await supabase
    .from('cart_items')
    .select('*, products(name_display, images, price)')
    .eq('user_id', user.id)

  if (error || !data) return []

  return data.map((item: Record<string, unknown>) => {
    const product = item.products as Record<string, unknown> | null
    return {
      id: item.id as string,
      product_id: item.product_id as string,
      product_name: product?.name_display as string ?? '',
      product_image: ((product?.images as string[]) ?? [])[0] ?? '',
      size: item.size as string,
      color: item.color as string,
      quantity: item.quantity as number,
      price: product?.price as number ?? 0,
    }
  })
}

export async function syncCartToSupabase(items: CartItem[]) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  // 기존 카트 가져오기
  const { data: existing } = await supabase
    .from('cart_items')
    .select('product_id, size, color, quantity')
    .eq('user_id', user.id)

  const existingMap = new Map(
    (existing ?? []).map((e: Record<string, unknown>) =>
      [`${e.product_id}-${e.size}-${e.color}`, e.quantity as number]
    )
  )

  // 병합: 로컬 아이템을 Supabase에 upsert
  for (const item of items) {
    const key = `${item.product_id}-${item.size}-${item.color}`
    const existingQty = existingMap.get(key) ?? 0
    const newQty = existingQty + item.quantity

    await supabase
      .from('cart_items')
      .upsert({
        user_id: user.id,
        product_id: item.product_id,
        size: item.size,
        color: item.color,
        quantity: newQty,
      }, {
        onConflict: 'user_id,product_id,size,color'
      })
  }

  return { success: true }
}

export async function addCartItemToSupabase(item: CartItem) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const { error } = await supabase
    .from('cart_items')
    .upsert({
      user_id: user.id,
      product_id: item.product_id,
      size: item.size,
      color: item.color,
      quantity: item.quantity,
    }, {
      onConflict: 'user_id,product_id,size,color'
    })

  if (error) return { error: error.message }
  return { success: true }
}

export async function updateCartItemQuantityInSupabase(
  productId: string, size: string, color: string, quantity: number
) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  if (quantity <= 0) {
    await supabase
      .from('cart_items')
      .delete()
      .eq('user_id', user.id)
      .eq('product_id', productId)
      .eq('size', size)
      .eq('color', color)
  } else {
    await supabase
      .from('cart_items')
      .update({ quantity })
      .eq('user_id', user.id)
      .eq('product_id', productId)
      .eq('size', size)
      .eq('color', color)
  }

  return { success: true }
}

export async function removeCartItemFromSupabase(
  productId: string, size: string, color: string
) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  await supabase
    .from('cart_items')
    .delete()
    .eq('user_id', user.id)
    .eq('product_id', productId)
    .eq('size', size)
    .eq('color', color)

  return { success: true }
}

export async function clearCartInSupabase() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  await supabase
    .from('cart_items')
    .delete()
    .eq('user_id', user.id)

  return { success: true }
}
