'use server'

import { createClient } from '@/lib/supabase/server'

export async function createWelcomeCoupon(userId: string) {
  const supabase = await createClient()

  const code = `WELCOME-${userId.slice(0, 8).toUpperCase()}`
  const expiresAt = new Date()
  expiresAt.setDate(expiresAt.getDate() + 30) // 30일 유효

  await supabase.from('coupons').insert({
    code,
    user_id: userId,
    discount_type: 'percentage',
    discount_value: 10, // 10% 할인
    min_order_amount: 50000, // 최소 주문금액 5만원
    expires_at: expiresAt.toISOString(),
  })

  return code
}

export async function getUserCoupons() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  const { data } = await supabase
    .from('coupons')
    .select('*')
    .eq('user_id', user.id)
    .eq('is_used', false)
    .gte('expires_at', new Date().toISOString())
    .order('created_at', { ascending: false })

  return data || []
}

export async function applyCoupon(code: string, orderTotal: number) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: '로그인이 필요합니다.' }

  const { data: coupon } = await supabase
    .from('coupons')
    .select('*')
    .eq('code', code)
    .eq('user_id', user.id)
    .eq('is_used', false)
    .single()

  if (!coupon) return { error: '유효하지 않은 쿠폰입니다.' }

  if (new Date(coupon.expires_at) < new Date()) {
    return { error: '만료된 쿠폰입니다.' }
  }

  if (orderTotal < coupon.min_order_amount) {
    return { error: `최소 주문금액은 ${coupon.min_order_amount.toLocaleString()}원입니다.` }
  }

  const discount = coupon.discount_type === 'percentage'
    ? Math.floor(orderTotal * coupon.discount_value / 100)
    : coupon.discount_value

  return { discount, couponId: coupon.id }
}

export async function markCouponUsed(couponId: string) {
  const supabase = await createClient()
  await supabase
    .from('coupons')
    .update({ is_used: true })
    .eq('id', couponId)
}
