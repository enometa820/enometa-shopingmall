'use server'
import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'

const DEMO_ADMIN_EMAIL = 'demo-admin@enometa.dev'
const DEMO_ADMIN_PASSWORD = 'demo-admin-2024!'
const DEMO_CUSTOMER_EMAIL = 'demo-customer@enometa.dev'
const DEMO_CUSTOMER_PASSWORD = 'demo-customer-2024!'

async function ensureDemoUser(
  email: string,
  password: string,
  metadata: Record<string, string>,
) {
  const admin = createAdminClient()
  const { data: existingUsers } = await admin.auth.admin.listUsers()
  let user = existingUsers?.users?.find(u => u.email === email)

  if (!user) {
    const { data } = await admin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: metadata,
    })
    user = data.user ?? undefined
  }

  return user
}

async function loginAs(email: string, password: string) {
  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) return { error: error.message }
  return { success: true }
}

export async function demoAdminLogin() {
  const user = await ensureDemoUser(DEMO_ADMIN_EMAIL, DEMO_ADMIN_PASSWORD, {
    role: 'admin',
    full_name: 'Demo Admin',
  })

  if (user) await seedDemoOrders(user.id, 'admin')

  return loginAs(DEMO_ADMIN_EMAIL, DEMO_ADMIN_PASSWORD)
}

export async function demoCustomerLogin() {
  const user = await ensureDemoUser(DEMO_CUSTOMER_EMAIL, DEMO_CUSTOMER_PASSWORD, {
    role: 'customer',
    full_name: 'Demo Customer',
  })

  if (user) await seedDemoOrders(user.id, 'customer')

  return loginAs(DEMO_CUSTOMER_EMAIL, DEMO_CUSTOMER_PASSWORD)
}

async function seedDemoOrders(userId: string, prefix: string) {
  const admin = createAdminClient()

  // 이미 주문이 있으면 스킵
  const { count } = await admin
    .from('orders')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', userId)

  if (count && count > 0) return

  // 상품 3개 가져오기
  const { data: products } = await admin
    .from('products')
    .select('id, name, price')
    .limit(4)

  if (!products || products.length < 3) return

  const now = new Date()
  const demoOrders = [
    {
      order_number: `ENO-${prefix.toUpperCase()}-001`,
      user_id: userId,
      status: 'delivered',
      total: products[0].price + products[1].price,
      shipping_name: 'Demo User',
      shipping_phone: '010-0000-0000',
      shipping_address: '서울특별시 강남구 테헤란로 123',
      shipping_detail: '데모아파트 101호',
      payment_method: 'toss',
      tracking_number: '1234567890',
      courier_company: 'CJ대한통운',
      created_at: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      order_number: `ENO-${prefix.toUpperCase()}-002`,
      user_id: userId,
      status: 'shipping',
      total: products[2].price,
      shipping_name: 'Demo User',
      shipping_phone: '010-0000-0000',
      shipping_address: '서울특별시 강남구 테헤란로 123',
      shipping_detail: '데모아파트 101호',
      payment_method: 'toss',
      tracking_number: '9876543210',
      courier_company: '한진택배',
      created_at: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      order_number: `ENO-${prefix.toUpperCase()}-003`,
      user_id: userId,
      status: 'paid',
      total: products[3].price + products[0].price,
      shipping_name: 'Demo User',
      shipping_phone: '010-0000-0000',
      shipping_address: '서울특별시 강남구 테헤란로 123',
      shipping_detail: '데모아파트 101호',
      payment_method: 'bank_transfer',
      created_at: new Date(now.getTime() - 3 * 60 * 60 * 1000).toISOString(),
    },
  ]

  const { data: orders, error: orderError } = await admin
    .from('orders')
    .insert(demoOrders)
    .select('id')

  if (orderError || !orders) return

  const orderItems = [
    // 주문 1: 상품 2개
    { order_id: orders[0].id, product_id: products[0].id, product_name: products[0].name, size: 'M', color: 'Black', quantity: 1, price: products[0].price },
    { order_id: orders[0].id, product_id: products[1].id, product_name: products[1].name, size: 'L', color: 'White', quantity: 1, price: products[1].price },
    // 주문 2: 상품 1개
    { order_id: orders[1].id, product_id: products[2].id, product_name: products[2].name, size: 'S', color: 'Cream', quantity: 2, price: products[2].price },
    // 주문 3: 상품 2개
    { order_id: orders[2].id, product_id: products[3].id, product_name: products[3].name, size: 'M', color: 'Black', quantity: 1, price: products[3].price },
    { order_id: orders[2].id, product_id: products[0].id, product_name: products[0].name, size: 'S', color: 'Ivory', quantity: 1, price: products[0].price },
  ]

  await admin.from('order_items').insert(orderItems)
}
