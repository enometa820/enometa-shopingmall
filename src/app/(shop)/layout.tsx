import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import AnnouncementBar from '@/components/layout/AnnouncementBar'
import FloatingInquiry from '@/components/inquiry/FloatingInquiry'
import PageTransition from '@/components/layout/PageTransition'

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <main className="flex-1" style={{ paddingTop: 'calc(var(--header-height) + 32px)' }}>
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
      <FloatingInquiry />
    </>
  )
}
