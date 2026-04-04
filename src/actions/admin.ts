'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

// ─── Products ───

export async function adminGetProducts() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return []
  return data
}

export async function adminDeleteProduct(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('products').delete().eq('id', id)
  if (error) return { error: error.message }
  revalidatePath('/admin/products')
  revalidatePath('/shop')
  return { success: true }
}

export async function adminCreateProduct(formData: FormData) {
  const supabase = await createClient()

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
  const supabase = await createClient()

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

export async function adminGetOrders() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('orders')
    .select('*, order_items(*)')
    .order('created_at', { ascending: false })

  if (error) return []
  return data
}

export async function adminUpdateOrderStatus(id: string, status: string) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('orders')
    .update({ status })
    .eq('id', id)

  if (error) return { error: error.message }
  revalidatePath('/admin/orders')
  return { success: true }
}

// ─── Inquiries ───

export async function adminGetInquiries() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('inquiries')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return []
  return data
}

export async function adminReplyInquiry(id: string, reply: string) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('inquiries')
    .update({ reply, status: 'replied' })
    .eq('id', id)

  if (error) return { error: error.message }
  revalidatePath('/admin/inquiries')
  return { success: true }
}
