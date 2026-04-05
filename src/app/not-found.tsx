import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-var(--header-height))] flex flex-col items-center justify-center px-5">
      <p className="text-[80px] md:text-[120px] font-light tracking-[-4px] text-dark leading-none">
        404
      </p>
      <p className="text-xs tracking-[3px] uppercase text-sub mt-6">
        Page not found
      </p>
      <p className="text-xs text-muted mt-3 text-center max-w-[300px] leading-relaxed">
        요청하신 페이지를 찾을 수 없습니다.
      </p>
      <div className="flex gap-6 mt-10">
        <Link
          href="/shop"
          className="text-xs tracking-[2px] uppercase text-body border-b border-body pb-1 hover:opacity-60 transition-opacity duration-300"
        >
          Shop
        </Link>
        <Link
          href="/"
          className="text-xs tracking-[2px] uppercase text-body border-b border-body pb-1 hover:opacity-60 transition-opacity duration-300"
        >
          Home
        </Link>
      </div>
    </div>
  )
}
