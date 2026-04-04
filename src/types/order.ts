export type OrderStatus = 'paid' | 'preparing' | 'shipping' | 'delivered'

export type Order = {
  id: string
  order_number: string
  user_id: string
  status: OrderStatus
  total: number
  shipping_name: string
  shipping_phone: string
  shipping_address: string
  shipping_detail: string | null
  shipping_memo: string | null
  payment_key: string | null
  created_at: string
  updated_at: string
  items?: OrderItem[]
}

export type OrderItem = {
  id: string
  order_id: string
  product_id: string
  product_name: string
  size: string
  color: string
  quantity: number
  price: number
}

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  paid: '결제완료',
  preparing: '배송준비',
  shipping: '배송중',
  delivered: '배송완료',
}
