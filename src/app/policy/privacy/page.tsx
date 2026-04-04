import Link from 'next/link'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white px-6 md:px-10 py-16 max-w-[800px] mx-auto">
      <Link href="/shop" className="text-xs text-sub hover:text-body mb-8 block">← 돌아가기</Link>
      <h1 className="text-sm tracking-[2px] uppercase text-dark mb-8">개인정보처리방침</h1>

      <div className="text-xs text-body leading-relaxed space-y-6">
        <Section title="1. 개인정보의 수집 및 이용 목적">
          ENOMETA는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
          <br /><br />
          - 회원 가입 및 관리: 회원제 서비스 이용에 따른 본인확인, 개인식별, 불량회원의 부정 이용 방지<br />
          - 서비스 제공: 물품배송, 콘텐츠 제공, 맞춤서비스 제공<br />
          - 마케팅 및 광고: 이벤트 및 광고성 정보 제공 (동의 시)
        </Section>

        <Section title="2. 수집하는 개인정보 항목">
          필수항목: 이메일, 비밀번호, 이름, 전화번호, 배송주소<br />
          자동수집항목: 접속 로그, 쿠키, 접속 IP 정보
        </Section>

        <Section title="3. 개인정보의 보유 및 이용 기간">
          회원 탈퇴 시까지. 단, 관련 법령에 따라 일정 기간 보관이 필요한 경우 해당 기간 동안 보관합니다.<br />
          - 계약 또는 청약철회 등에 관한 기록: 5년<br />
          - 대금결제 및 재화 등의 공급에 관한 기록: 5년<br />
          - 소비자의 불만 또는 분쟁처리에 관한 기록: 3년
        </Section>

        <Section title="4. 개인정보의 파기">
          개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체 없이 해당 개인정보를 파기합니다.
        </Section>

        <Section title="5. 정보주체의 권리">
          정보주체는 개인정보 열람, 정정, 삭제, 처리정지 요구 등의 권리를 행사할 수 있습니다.
        </Section>

        <Section title="6. 개인정보 보호책임자">
          성명: Portfolio Demo<br />
          이메일: contact@enometa.com
        </Section>

        <p className="text-muted mt-8">
          본 방침은 2026년 4월 5일부터 시행됩니다.<br />
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
