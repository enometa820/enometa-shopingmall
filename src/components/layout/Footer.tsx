import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-border" style={{ padding: '80px 50px' }}>
      <div className="flex flex-col md:flex-row justify-between gap-12 md:gap-16 max-w-[1400px] mx-auto">
        {/* Left — Brand Info */}
        <div className="md:w-[340px] space-y-4">
          <p className="text-xs text-sub leading-[18px]">
            © 2026 ENOMETA ALL RIGHTS RESERVED
          </p>
          <div className="text-xs text-sub leading-[18px] space-y-1">
            <p>상호: Enometa</p>
            <p>대표: Portfolio Demo</p>
            <p>사업자번호: 000-00-00000</p>
            <p>주소: Seoul, South Korea</p>
            <p>이메일: contact@enometa.com</p>
            <p>전화: 02-0000-0000</p>
          </div>
          <div className="flex gap-4 pt-2">
            <Link
              href="/policy/terms"
              className="text-xs text-sub hover:text-body transition-colors duration-300 uppercase tracking-wide"
            >
              Terms
            </Link>
            <Link
              href="/policy/privacy"
              className="text-xs text-sub hover:text-body transition-colors duration-300 uppercase tracking-wide"
            >
              Privacy
            </Link>
          </div>
        </div>

        {/* Right — Links */}
        <div className="flex gap-16">
          <div className="space-y-4">
            <LinkItem href="/shop" label="ABOUT" />
            <LinkItem href="/shop" label="CONTACT" />
            <LinkItem href="/shop" label="FAQ" />
          </div>
          <div className="space-y-4">
            <LinkItem href="#" label="INSTAGRAM" />
            <LinkItem href="#" label="KAKAO" />
          </div>
        </div>
      </div>
    </footer>
  )
}

function LinkItem({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="block text-xs tracking-[1px] uppercase text-sub hover:text-body transition-colors duration-300"
    >
      {label}
    </Link>
  )
}
