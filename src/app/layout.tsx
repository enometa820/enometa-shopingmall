import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'ENOMETA — Premium Contemporary Fashion',
    template: '%s | ENOMETA',
  },
  description: 'Quiet elegance, effortless movement. 감도 높은 프리미엄 컨템포러리 패션 쇼핑몰.',
  metadataBase: new URL('https://enometa-shopingmall.vercel.app'),
  openGraph: {
    title: 'ENOMETA — Premium Contemporary Fashion',
    description: 'Quiet elegance, effortless movement. 감도 높은 프리미엄 컨템포러리 패션 쇼핑몰.',
    type: 'website',
    siteName: 'ENOMETA',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ENOMETA — Premium Contemporary Fashion',
    description: 'Quiet elegance, effortless movement.',
  },
  robots: {
    index: true,
    follow: true,
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
