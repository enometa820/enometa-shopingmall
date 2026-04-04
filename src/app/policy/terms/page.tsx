import Link from 'next/link'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white px-6 md:px-10 py-16 max-w-[800px] mx-auto">
      <Link href="/shop" className="text-xs text-sub hover:text-body mb-8 block">← 돌아가기</Link>
      <h1 className="text-sm tracking-[2px] uppercase text-dark mb-8">이용약관</h1>

      <div className="text-xs text-body leading-relaxed space-y-6">
        <Section title="제1조 (목적)">
          이 약관은 ENOMETA(이하 "회사")가 운영하는 인터넷 쇼핑몰에서 제공하는 서비스의 이용조건 및 절차, 회사와 이용자의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
        </Section>

        <Section title="제2조 (정의)">
          "쇼핑몰"이란 회사가 재화 또는 용역을 이용자에게 제공하기 위하여 컴퓨터 등 정보통신설비를 이용하여 재화 또는 용역을 거래할 수 있도록 설정한 가상의 영업장을 말합니다.
        </Section>

        <Section title="제3조 (약관의 효력)">
          본 약관은 쇼핑몰에 게시하여 공시하며, 회사는 합리적인 사유가 발생할 경우 관련 법령에 위배되지 않는 범위 안에서 개정할 수 있습니다.
        </Section>

        <Section title="제4조 (서비스의 제공)">
          회사는 다음과 같은 서비스를 제공합니다.<br />
          - 재화 또는 용역에 대한 정보 제공 및 구매계약의 체결<br />
          - 구매계약이 체결된 재화 또는 용역의 배송<br />
          - 기타 회사가 정하는 서비스
        </Section>

        <Section title="제5조 (구매 및 결제)">
          이용자는 쇼핑몰에서 다음 방법으로 구매를 신청할 수 있습니다.<br />
          - 상품 선택 및 옵션(사이즈, 색상) 지정<br />
          - 배송 정보 입력<br />
          - 결제 수단 선택 및 결제
        </Section>

        <Section title="제6조 (배송)">
          배송 기간은 결제 완료일로부터 영업일 기준 2~5일이 소요되며, 도서산간 지역은 추가 기간이 소요될 수 있습니다.
        </Section>

        <Section title="제7조 (교환 및 반품)">
          상품 수령 후 7일 이내 교환 및 반품이 가능합니다. 단, 이용자의 귀책사유로 상품이 훼손된 경우에는 교환 및 반품이 제한됩니다.
        </Section>

        <p className="text-muted mt-8">
          본 약관은 2026년 4월 5일부터 시행됩니다.<br />
          ※ 이 페이지는 포트폴리오 데모용으로 작성되었습니다.
        </p>
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-xs font-normal text-dark mb-2">{title}</h2>
      <p>{children}</p>
    </div>
  )
}
