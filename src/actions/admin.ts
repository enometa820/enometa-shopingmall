'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { updateOrderStatus } from './order-status'
import type { OrderStatus } from '@/types/order'

// ─── Auth Guard ───

async function requireAdmin() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user || user.user_metadata?.role !== 'admin') {
    throw new Error('Unauthorized: admin access required')
  }
  return { supabase, user }
}

// ─── Products ───

export async function adminGetProducts() {
  const { supabase } = await requireAdmin()
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return []
  return data
}

export async function adminDeleteProduct(id: string) {
  const { supabase } = await requireAdmin()
  const { error } = await supabase.from('products').delete().eq('id', id)
  if (error) return { error: error.message }
  revalidatePath('/admin/products')
  revalidatePath('/shop')
  return { success: true }
}

export async function adminCreateProduct(formData: FormData) {
  const { supabase } = await requireAdmin()

  const sizes = formData.get('sizes') as string
  const colors = formData.get('colors') as string
  const images = formData.get('images') as string
  const stock = formData.get('stock') as string

  const { error } = await supabase.from('products').insert({
    name: formData.get('name') as string,
    name_display: formData.get('name_display') as string,
    price: parseInt(formData.get('price') as string),
    description: formData.get('description') as string,
    category: formData.get('category') as string,
    sizes: sizes ? sizes.split(',').map((s) => s.trim()) : [],
    colors: colors ? JSON.parse(colors) : [],
    images: images ? images.split(',').map((s) => s.trim()) : [],
    hover_image: (formData.get('hover_image') as string) || null,
    stock: stock ? JSON.parse(stock) : {},
    is_featured: formData.get('is_featured') === 'true',
  })

  if (error) return { error: error.message }
  revalidatePath('/admin/products')
  revalidatePath('/shop')
  return { success: true }
}

export async function adminUpdateProduct(id: string, formData: FormData) {
  const { supabase } = await requireAdmin()

  const sizes = formData.get('sizes') as string
  const colors = formData.get('colors') as string
  const images = formData.get('images') as string
  const stock = formData.get('stock') as string

  const { error } = await supabase.from('products').update({
    name: formData.get('name') as string,
    name_display: formData.get('name_display') as string,
    price: parseInt(formData.get('price') as string),
    description: formData.get('description') as string,
    category: formData.get('category') as string,
    sizes: sizes ? sizes.split(',').map((s) => s.trim()) : [],
    colors: colors ? JSON.parse(colors) : [],
    images: images ? images.split(',').map((s) => s.trim()) : [],
    hover_image: (formData.get('hover_image') as string) || null,
    stock: stock ? JSON.parse(stock) : {},
    is_featured: formData.get('is_featured') === 'true',
  }).eq('id', id)

  if (error) return { error: error.message }
  revalidatePath('/admin/products')
  revalidatePath('/shop')
  return { success: true }
}

// ─── Orders ───

export async function adminGetOrders(status?: string) {
  const { supabase } = await requireAdmin()
  let query = supabase
    .from('orders')
    .select('*, order_items(*)')

  if (status && status !== 'all') {
    query = query.eq('status', status)
  }

  const { data, error } = await query.order('created_at', { ascending: false })

  if (error) return []
  return data
}

export async function adminGetOrder(orderId: string) {
  const { supabase } = await requireAdmin()
  const { data, error } = await supabase
    .from('orders')
    .select('*, order_items(*)')
    .eq('id', orderId)
    .single()

  if (error) return null
  return data
}

export async function adminGetOrderStatusHistory(orderId: string) {
  const { supabase } = await requireAdmin()
  const { data } = await supabase
    .from('order_status_history')
    .select('*')
    .eq('order_id', orderId)
    .order('changed_at', { ascending: false })

  return data || []
}

export async function adminGetOrderCounts() {
  const { supabase } = await requireAdmin()
  const { data, error } = await supabase
    .from('orders')
    .select('status')

  if (error) return {}

  const counts: Record<string, number> = { all: data.length }
  for (const order of data) {
    counts[order.status] = (counts[order.status] || 0) + 1
  }
  return counts
}

export async function adminUpdateOrderStatus(id: string, status: string) {
  const { supabase, user } = await requireAdmin()

  const result = await updateOrderStatus({
    orderId: id,
    newStatus: status as OrderStatus,
    changedBy: user.id,
  })

  if (result.error) return { error: result.error }
  return { success: true }
}

export async function adminUpdateShipping(
  orderId: string,
  trackingNumber: string,
  courierCompany: string,
) {
  const { supabase, user } = await requireAdmin()

  // Save tracking info
  const { error } = await supabase
    .from('orders')
    .update({
      tracking_number: trackingNumber,
      courier_company: courierCompany,
    })
    .eq('id', orderId)

  if (error) return { error: error.message }

  // Change status to shipping
  const result = await updateOrderStatus({
    orderId,
    newStatus: 'shipping',
    changedBy: user.id,
    note: `송장번호: ${trackingNumber}`,
  })

  if (result.error) return { error: result.error }
  return { success: true }
}

// ─── Site Settings ───

export async function adminGetSetting(key: string) {
  const { supabase } = await requireAdmin()
  const { data, error } = await supabase
    .from('site_settings')
    .select('*')
    .eq('key', key)
    .single()

  if (error) return null
  return data as { key: string; value: Record<string, unknown>; updated_at: string }
}

export async function adminUpdateSetting(key: string, value: Record<string, unknown>) {
  const { supabase } = await requireAdmin()
  const { error } = await supabase
    .from('site_settings')
    .upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: 'key' })

  if (error) return { error: error.message }
  revalidatePath('/admin/settings')
  return { success: true }
}

// ─── Inquiries ───

export async function adminGetInquiries() {
  const { supabase } = await requireAdmin()
  const { data, error } = await supabase
    .from('inquiries')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return []
  return data
}

export async function adminReplyInquiry(id: string, reply: string) {
  const { supabase } = await requireAdmin()
  const { error } = await supabase
    .from('inquiries')
    .update({ reply, status: 'replied' })
    .eq('id', id)

  if (error) return { error: error.message }
  revalidatePath('/admin/inquiries')
  return { success: true }
}
