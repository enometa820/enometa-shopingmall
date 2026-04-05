import Link from 'next/link'
import { adminGetProducts } from '@/actions/admin'
import { formatPrice } from '@/lib/utils/format'
import DeleteProductButton from './DeleteProductButton'

export default async function AdminProductsPage() {
  const products = await adminGetProducts()

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-base tracking-[2px] uppercase text-dark font-medium">상품 관리</h1>
        <Link
          href="/admin/products/new"
          className="px-5 py-2.5 bg-dark text-white text-sm uppercase tracking-[1.25px] hover:bg-accent transition-colors"
        >
          + 상품 등록
        </Link>
      </div>

      {products.length === 0 ? (
        <p className="text-xs text-muted py-8">등록된 상품이 없습니다.</p>
      ) : (
        <>
          {/* 데스크톱: 테이블 */}
          <div className="border border-border hidden md:block">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-beige/50">
                  <th className="text-xs uppercase tracking-wide text-body font-normal text-left px-4 py-3">상품명</th>
                  <th className="text-xs uppercase tracking-wide text-body font-normal text-left px-4 py-3">카테고리</th>
                  <th className="text-xs uppercase tracking-wide text-body font-normal text-left px-4 py-3">가격</th>
                  <th className="text-xs uppercase tracking-wide text-body font-normal text-left px-4 py-3">사이즈</th>
                  <th className="text-xs uppercase tracking-wide text-body font-normal text-right px-4 py-3">관리</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product: any) => (
                  <tr key={product.id} className="border-b border-border last:border-0 hover:bg-beige/30 transition-colors">
                    <td className="text-sm px-4 py-4 font-medium text-dark">{product.name_display}</td>
                    <td className="text-sm px-4 py-4 text-body uppercase">{product.category}</td>
                    <td className="text-sm px-4 py-4 tabular-nums text-dark">{formatPrice(product.price)}</td>
                    <td className="text-sm px-4 py-4 text-body">{product.sizes?.join(', ')}</td>
                    <td className="text-sm px-4 py-4 text-right">
                      <Link
                        href={`/admin/products/${product.id}/edit`}
                        className="text-body hover:text-dark mr-4 transition-colors"
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

          {/* 모바일: 카드 리스트 */}
          <div className="flex flex-col gap-3 md:hidden">
            {products.map((product: any) => (
              <div key={product.id} className="border border-border p-4 hover:bg-beige/30 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-sm font-medium text-dark leading-snug">{product.name_display}</h3>
                  <span className="text-sm font-medium tabular-nums ml-3 shrink-0">{formatPrice(product.price)}</span>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[11px] uppercase text-sub">{product.category}</span>
                  {product.sizes?.length > 0 && (
                    <>
                      <span className="text-border">·</span>
                      <span className="text-[11px] text-sub">{product.sizes.join(', ')}</span>
                    </>
                  )}
                </div>
                <div className="flex gap-3 text-xs">
                  <Link
                    href={`/admin/products/${product.id}/edit`}
                    className="text-sub hover:text-body transition-colors"
                  >
                    수정
                  </Link>
                  <DeleteProductButton id={product.id} name={product.name_display} />
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
