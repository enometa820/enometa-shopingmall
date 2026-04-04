import Link from 'next/link'
import { adminGetProducts } from '@/actions/admin'
import { formatPrice } from '@/lib/utils/format'
import DeleteProductButton from './DeleteProductButton'

export default async function AdminProductsPage() {
  const products = await adminGetProducts()

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-sm tracking-[2px] uppercase text-dark">상품 관리</h1>
        <Link
          href="/admin/products/new"
          className="px-4 py-2 bg-dark text-white text-xs uppercase tracking-[1.25px] hover:bg-accent transition-colors"
        >
          + 상품 등록
        </Link>
      </div>

      {products.length === 0 ? (
        <p className="text-xs text-muted py-8">등록된 상품이 없습니다.</p>
      ) : (
        <div className="border border-border">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-beige/50">
                <th className="text-[10px] uppercase tracking-wide text-sub font-normal text-left px-4 py-3">상품명</th>
                <th className="text-[10px] uppercase tracking-wide text-sub font-normal text-left px-4 py-3">카테고리</th>
                <th className="text-[10px] uppercase tracking-wide text-sub font-normal text-left px-4 py-3">가격</th>
                <th className="text-[10px] uppercase tracking-wide text-sub font-normal text-left px-4 py-3">사이즈</th>
                <th className="text-[10px] uppercase tracking-wide text-sub font-normal text-right px-4 py-3">관리</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product: any) => (
                <tr key={product.id} className="border-b border-border last:border-0 hover:bg-beige/30 transition-colors">
                  <td className="text-xs px-4 py-3 uppercase tracking-wide">{product.name_display}</td>
                  <td className="text-xs px-4 py-3 text-sub uppercase">{product.category}</td>
                  <td className="text-xs px-4 py-3">{formatPrice(product.price)}</td>
                  <td className="text-xs px-4 py-3 text-sub">{product.sizes?.join(', ')}</td>
                  <td className="text-xs px-4 py-3 text-right">
                    <Link
                      href={`/admin/products/${product.id}/edit`}
                      className="text-sub hover:text-body mr-3 transition-colors"
                    >
                      수정
                    </Link>
                    <DeleteProductButton id={product.id} name={product.name_display} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
