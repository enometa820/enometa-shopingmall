'use server'

import { createClient } from '@/lib/supabase/server'
import { formatOrderNumber } from '@/lib/utils/format'
import type { CartItem } from '@/types/cart'

type CreateOrderInput = {
  items: CartItem[]
  total: number
  shippingName: string
  shippingPhone: string
  shippingAddress: string
  shippingDetail?: string
  shippingMemo?: string
  paymentKey?: string
}

export async function createOrder(input: CreateOrderInput) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: '로그인이 필요합니다.' }
  }

  // 재고 검증
  const productIds = [...new Set(input.items.map((i) => i.product_id))]
  const { data: products } = await supabase
    .from('products')
    .select('id, stock')
    .in('id', productIds)

  if (products) {
    for (const item of input.items) {
      const product = products.find((p) => p.id === item.product_id)
      const stock = (product?.stock as Record<string, number>) || {}
      const available = stock[item.size] ?? 0
      if (available < item.quantity) {
        return { error: `${item.product_name} (${item.size}) 재고가 부족합니다. (남은 수량: ${available}개)` }
      }
    }
  }

  const orderNumber = formatOrderNumber()

  // 주문 생성
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      order_number: orderNumber,
      user_id: user.id,
      status: 'paid',
      total: input.total,
      shipping_name: input.shippingName,
      shipping_phone: input.shippingPhone,
      shipping_address: input.shippingAddress,
      shipping_detail: input.shippingDetail || null,
      shipping_memo: input.shippingMemo || null,
      payment_key: input.paymentKey || null,
    })
    .select()
    .single()

  if (orderError || !order) {
    console.error('Order creation failed:', orderError)
    return { error: '주문 생성에 실패했습니다.' }
  }

  // 주문 아이템 생성
  const orderItems = input.items.map((item) => ({
    order_id: order.id,
    product_id: item.product_id,
    product_name: item.product_name,
    size: item.size,
    color: item.color,
    quantity: item.quantity,
    price: item.price,
  }))

  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(orderItems)

  if (itemsError) {
    console.error('Order items creation failed:', itemsError)
    return { error: '주문 상품 저장에 실패했습니다.' }
  }

  // 장바구니 비우기 (DB)
  await supabase
    .from('cart_items')
    .delete()
    .eq('user_id', user.id)

  return { orderId: order.id, orderNumber }
}

export async function getOrders() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return []

  const { data, error } = await supabase
    .from('orders')
    .select('*, order_items(*)')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Failed to fetch orders:', error)
    return []
  }

  return data
}

export async function getOrder(id: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('orders')
    .select('*, order_items(*)')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Failed to fetch order:', error)
    return null
  }

  return data
}
