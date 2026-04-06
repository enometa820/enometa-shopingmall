'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import type { OrderStatus } from '@/types/order'

// Valid state transitions map
const VALID_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  pending_payment: ['paid', 'cancelled'],
  paid: ['preparing', 'cancelled'],
  preparing: ['shipping', 'cancelled'],
  shipping: ['delivered'],
  delivered: [],
  cancelled: [],
  refund_requested: [],
}

type UpdateOrderStatusInput = {
  orderId: string
  newStatus: OrderStatus
  changedBy: string // user_id or 'admin'
  note?: string
}

export async function updateOrderStatus({
  orderId,
  newStatus,
  changedBy,
  note,
}: UpdateOrderStatusInput) {
  const supabase = await createClient()

  // 1. Get current order status
  const { data: order, error: fetchError } = await supabase
    .from('orders')
    .select('status')
    .eq('id', orderId)
    .single()

  if (fetchError || !order) {
    return { error: '주문을 찾을 수 없습니다.' }
  }

  const currentStatus = order.status as OrderStatus

  // 2. Validate transition
  const allowedTransitions = VALID_TRANSITIONS[currentStatus]
  if (!allowedTransitions || !allowedTransitions.includes(newStatus)) {
    return {
      error: `'${currentStatus}' 상태에서 '${newStatus}'(으)로 변경할 수 없습니다.`,
    }
  }

  // 3. Update order status
  const { error: updateError } = await supabase
    .from('orders')
    .update({ status: newStatus, updated_at: new Date().toISOString() })
    .eq('id', orderId)

  if (updateError) {
    return { error: '주문 상태 변경에 실패했습니다.' }
  }

  // 4. Record history
  const { error: historyError } = await supabase
    .from('order_status_history')
    .insert({
      order_id: orderId,
      from_status: currentStatus,
      to_status: newStatus,
      changed_by: changedBy,
      note: note || null,
    })

  if (historyError) {
    // Log but don't fail the operation - status already changed
    console.error('Failed to record status history:', historyError)
  }

  // 5. Revalidate paths
  revalidatePath('/admin/orders')
  revalidatePath('/mypage')

  return { data: { from: currentStatus, to: newStatus } }
}

/**
 * 사용자가 직접 주문을 취소하는 액션.
 * paid / preparing 상태에서만 가능.
 */
export async function cancelOrder(orderId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: '로그인이 필요합니다.' }
  }

  // Verify the order belongs to this user
  const { data: order } = await supabase
    .from('orders')
    .select('user_id, status')
    .eq('id', orderId)
    .single()

  if (!order || order.user_id !== user.id) {
    return { error: '주문을 찾을 수 없습니다.' }
  }

  // Only allow cancellation from paid or preparing
  if (order.status !== 'paid' && order.status !== 'preparing') {
    return { error: '현재 상태에서는 취소할 수 없습니다.' }
  }

  return updateOrderStatus({
    orderId,
    newStatus: 'cancelled',
    changedBy: user.id,
    note: '사용자 직접 취소',
  })
}
