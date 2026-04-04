import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ENOMETA — Premium Contemporary Fashion',
  description: 'Enometa는 감도 높은 프리미엄 컨템포러리 패션 쇼핑몰입니다.',
  openGraph: {
    title: 'ENOMETA — Premium Contemporary Fashion',
    description: 'Enometa는 감도 높은 프리미엄 컨템포러리 패션 쇼핑몰입니다.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  )
}
