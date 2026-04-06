export type OrderStatus = 'pending_payment' | 'paid' | 'preparing' | 'shipping' | 'delivered' | 'cancelled' | 'refund_requested'

export type PaymentMethod = 'toss' | 'bank_transfer'

export type OrderStatusHistory = {
  id: string
  order_id: string
  from_status: OrderStatus
  to_status: OrderStatus
  changed_by: string
  changed_at: string
  note: string | null
}

export type SiteSetting = {
  key: string
  value: Record<string, unknown>
  updated_at: string
}

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
  postal_code: string | null
  payment_key: string | null
  payment_method: PaymentMethod
  bank_transfer_info: { bank: string; account: string; holder: string } | null
  tracking_number: string | null
  courier_company: CourierCompany | null
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
  pending_payment: '입금대기',
  paid: '결제완료',
  preparing: '배송준비',
  shipping: '배송중',
  delivered: '배송완료',
  cancelled: '취소',
  refund_requested: '환불요청',
}

export const PAYMENT_METHOD_LABELS: Record<PaymentMethod, string> = {
  toss: '카드결제',
  bank_transfer: '계좌이체',
}

export const COURIER_COMPANIES = {
  cj: { name: 'CJ대한통운', trackingUrl: 'https://trace.cjlogistics.com/tracking' },
  hanjin: { name: '한진택배', trackingUrl: 'https://www.hanjin.com/kor/CMS/DeliveryMgr/WaybillResult.do' },
  logen: { name: '로젠택배', trackingUrl: 'https://www.ilogen.com/web/personal/trace' },
  epost: { name: '우체국택배', trackingUrl: 'https://service.epost.go.kr/trace.RetrieveDomRi498' },
} as const

export type CourierCompany = keyof typeof COURIER_COMPANIES
