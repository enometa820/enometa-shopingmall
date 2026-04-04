import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import BackToTop from '@/components/ui/BackToTop'
import FloatingInquiry from '@/components/inquiry/FloatingInquiry'
import PageTransition from '@/components/layout/PageTransition'

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <main className="flex-1" style={{ paddingTop: 'var(--header-height)' }}>
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
      <FloatingInquiry />
      <BackToTop />
    </>
  )
}
