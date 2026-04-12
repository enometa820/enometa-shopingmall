@AGENTS.md

# Enometa Shopping Mall — Project Rules

## 현재 상태
- **라이브 URL**: https://enometa-shopingmall.vercel.app
- **배포**: Vercel (수동 `npx vercel --prod`)
- **상태**: 배포 완료, 운영 중
- **enometa.dev 연동**: 포트폴리오 섹션에서 "포트폴리오 보기" 링크로 연결됨

## Tech Stack
- Next.js 16 (App Router) + TypeScript + TailwindCSS 4 + Framer Motion
- Supabase (PostgreSQL + Auth + RLS)
- 토스페이먼츠 (REST API 직접 호출, 테스트 모드)
- Vercel 배포

## 이미지
- 반드시 `next/image`의 `Image` 컴포넌트 사용. `<img>` 태그 금지.
- 첫 화면(above-the-fold) 이미지에는 `priority` 속성 추가
- `sizes` 속성 필수 — 뷰포트별 적정 크기 지정
- `onError` 처리 시 `e.target.style` 대신 state 기반으로 구현
- public/ 하위 폴더명에 한글 사용 금지 (URL 인코딩 이슈)

## 보안
- Server Action에 권한 체크 필수. middleware만으로는 부족함 (POST 요청으로 우회 가능)
- admin 전용 함수는 `requireAdmin()` 헬퍼로 시작
- 패턴: `const { supabase } = await requireAdmin()`

## 주문 상태 관리 (v2)
- 주문 상태 변경은 반드시 `updateOrderStatus()` 헬퍼 사용 (`src/actions/order-status.ts`)
- 직접 orders.status UPDATE 금지 — 이력 누락 방지
- 7종 상태: pending_payment, paid, preparing, shipping, delivered, cancelled, refund_requested
- 금지 전환: delivered→cancelled, cancelled→*, shipping→cancelled(사용자)

## 컴포넌트 패턴
- 스크롤 애니메이션: `FadeInSection` (useInView + framer-motion)
- 이미지 호버: `overflow-hidden` + `hover:scale-[1.03] transition-transform duration-700`
- 모바일 스와이프 갤러리: `IntersectionObserver`로 활성 인디케이터 추적
- 스타일 통일: `text-xs tracking-[Npx] uppercase text-sub` (le17septembre 레퍼런스)

## 디자인 토큰
- 색상: `text-dark`(#111), `text-body`(#4a4a4a), `text-sub`(#999), `text-muted`(#ababab)
- 간격: `px-5 md:px-10`, `py-20 md:py-28`, `gap-3 md:gap-4`
- 폰트: Pretendard (본문), Montserrat 800 (인트로 타이틀)
- 헤더: `var(--header-height): 60px`

## 문서
- `docs/개발일지.md` — 전문 용어에 괄호로 뜻 표기 필수
- `docs/TODO.md` — 완료 시 `[x]` 체크, 라우트 목록 최신화
- 날짜는 절대 날짜로 기록 (Day X가 아닌 실제 날짜)
