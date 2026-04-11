import { createClient } from '@/lib/supabase/server'
import { formatPrice, formatDate } from '@/lib/utils/format'
import { ORDER_STATUS_LABELS } from '@/types/order'
import type { OrderStatus } from '@/types/order'
import DemoGuide from '@/components/admin/DemoGuide'

export default async function AdminDashboard() {
  const supabase = await createClient()

  // 통계 데이터 조회
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const { data: { user } } = await supabase.auth.getUser()
  const isDemoUser = user?.email === 'demo-admin@enometa.dev'

  const [ordersRes, productsRes, inquiriesRes, recentOrdersRes, pendingPaymentRes] = await Promise.all([
    supabase.from('orders').select('total, created_at'),
    supabase.from('products').select('id', { count: 'exact', head: true }),
    supabase.from('inquiries').select('id', { count: 'exact', head: true }),
    supabase.from('orders').select('*, order_items(product_name)').order('created_at', { ascending: false }).limit(5),
    supabase.from('orders').select('id', { count: 'exact', head: true }).eq('status', 'pending_payment'),
  ])

  const orders = ordersRes.data || []
  const todayOrders = orders.filter((o) => new Date(o.created_at) >= today)
  const todayRevenue = todayOrders.reduce((sum, o) => sum + o.total, 0)
  const totalOrders = orders.length
  const recentOrders = recentOrdersRes.data || []
  const pendingPaymentCount = pendingPaymentRes.count || 0

  const stats = [
    { label: '오늘 매출', value: formatPrice(todayRevenue) },
    { label: '총 주문', value: `${totalOrders}건` },
    { label: '입금대기', value: `${pendingPaymentCount}건`, highlight: pendingPaymentCount > 0 },
    { label: '등록 상품', value: `${productsRes.count || 0}개` },
    { label: '문의', value: `${inquiriesRes.count || 0}건` },
  ]

  return (
    <div>
      <h1 className="text-sm tracking-[2px] uppercase text-dark mb-8">Dashboard</h1>

      {isDemoUser && <DemoGuide />}

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`border p-5 ${
              stat.highlight
                ? 'border-orange-300 bg-orange-50/50'
                : 'border-border'
            }`}
          >
            <p className="text-[10px] uppercase tracking-[1.5px] text-sub mb-2">{stat.label}</p>
            <p className={`text-lg font-light ${stat.highlight ? 'text-orange-600' : 'text-dark'}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <h2 className="text-xs uppercase tracking-[1.25px] text-sub mb-4">최근 주문</h2>

      {recentOrders.length === 0 ? (
        <p className="text-xs text-muted py-8">주문이 없습니다.</p>
      ) : (
        <div className="border border-border">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-beige/50">
                <th className="text-[10px] uppercase tracking-wide text-sub font-normal text-left px-4 py-3">주문번호</th>
                <th className="text-[10px] uppercase tracking-wide text-sub font-normal text-left px-4 py-3">상품</th>
                <th className="text-[10px] uppercase tracking-wide text-sub font-normal text-left px-4 py-3">금액</th>
                <th className="text-[10px] uppercase tracking-wide text-sub font-normal text-left px-4 py-3">상태</th>
                <th className="text-[10px] uppercase tracking-wide text-sub font-normal text-left px-4 py-3">일시</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order: any) => (
                <tr key={order.id} className="border-b border-border last:border-0 hover:bg-beige/30 transition-colors">
                  <td className="text-xs px-4 py-3">{order.order_number}</td>
                  <td className="text-xs px-4 py-3 text-sub">
                    {order.order_items?.[0]?.product_name || '-'}
                    {order.order_items?.length > 1 && ` 외 ${order.order_items.length - 1}건`}
                  </td>
                  <td className="text-xs px-4 py-3">{formatPrice(order.total)}</td>
                  <td className="text-xs px-4 py-3">
                    <span className="px-2 py-0.5 bg-beige text-[10px]">
                      {ORDER_STATUS_LABELS[order.status as OrderStatus]}
                    </span>
                  </td>
                  <td className="text-xs px-4 py-3 text-sub">{formatDate(order.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
