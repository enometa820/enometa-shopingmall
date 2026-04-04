export type InquiryCategory = 'product' | 'shipping' | 'general'
export type InquiryStatus = 'pending' | 'replied'

export type Inquiry = {
  id: string
  name: string
  email: string
  category: InquiryCategory
  content: string
  reply: string | null
  status: InquiryStatus
  created_at: string
}

export const INQUIRY_CATEGORY_LABELS: Record<InquiryCategory, string> = {
  product: '상품 문의',
  shipping: '배송 문의',
  general: '기타 문의',
}
