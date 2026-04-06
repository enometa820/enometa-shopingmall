# ENOMETA Shopping Mall

> Premium Contemporary Fashion E-Commerce

le17septembre 레퍼런스 기반의 프리미엄 패션 쇼핑몰. 풀스택 포트폴리오 프로젝트.

**Live**: https://enometa-shopingmall.vercel.app

---

## 주요 기능

### 고객
- 인트로 시퀀스 (Framer Motion 기반 시네마틱 연출)
- 상품 리스트 (카테고리 필터, 그리드 전환, 검색)
- 상품 상세 (이미지 갤러리, 컬러/사이즈 선택, 재고 표시)
- 장바구니 드로어 (Zustand 기반 상태 관리)
- 결제 (토스페이먼츠 위젯 SDK + 계좌이체)
- 카카오 우편번호 검색 (Daum Postcode API)
- 소셜 로그인 (Google, Kakao OAuth)
- 마이페이지 (주문 내역, 주문 취소, 배송 추적)
- 문의하기 (플로팅 버튼 + 슬라이드업 폼)

### 관리자
- 대시보드 (주문/매출 통계)
- 상품 CRUD (이미지 드래그앤드롭 업로드)
- 주문 관리 (상태 필터, 결제 확인, 송장 입력)
- 주문 상세 (배송 정보, 상품, 결제, 상태 이력 타임라인)
- 사이트 설정 (계좌이체 계좌 정보)
- 문의 관리 (답변 기능)

---

## 기술 스택

| 영역 | 기술 |
|------|------|
| Framework | Next.js 16 (App Router) + TypeScript |
| Styling | TailwindCSS 4 + Framer Motion |
| Backend | Supabase (PostgreSQL + Auth + RLS + Storage) |
| Payment | 토스페이먼츠 Widget SDK v1 (테스트 모드) |
| Auth | Supabase Auth (이메일 + Google/Kakao OAuth) |
| Deploy | Vercel |
| Font | Pretendard + Montserrat |

---

## 프로젝트 구조

```
src/
├── app/                    # Next.js App Router
│   ├── (shop)/             # 고객 페이지 그룹
│   │   ├── shop/           # 상품 리스트
│   │   ├── product/[id]/   # 상품 상세
│   │   ├── checkout/       # 결제
│   │   ├── mypage/         # 마이페이지
│   │   └── order-complete/ # 주문 완료
│   ├── admin/              # 관리자 페이지
│   │   ├── dashboard/      # 대시보드
│   │   ├── products/       # 상품 관리
│   │   ├── orders/         # 주문 관리 + 상세
│   │   ├── settings/       # 사이트 설정
│   │   └── inquiries/      # 문의 관리
│   └── auth/               # 로그인/회원가입
├── components/             # UI 컴포넌트
├── actions/                # Server Actions
├── lib/                    # Supabase 클라이언트, 유틸리티
├── types/                  # TypeScript 타입 정의
└── store/                  # Zustand 장바구니 스토어
```

---

## 실행 방법

```bash
# 의존성 설치
npm install

# 환경변수 설정
cp .env.example .env.local
# .env.local에 Supabase, 토스페이먼츠 키 입력

# 개발 서버
npm run dev
```

---

## 주문 상태 흐름

```
결제(토스) ─→ paid ─→ preparing ─→ shipping ─→ delivered
계좌이체  ─→ pending_payment ─→ paid ─→ ...
              ↓
취소 가능: pending_payment / paid / preparing → cancelled
```

---

## 개발 과정

- **v1** (2026-04-04~05): 주말 3일 풀스택 구현 — 23개 라우트, 인트로~결제~관리자
- **v2** (2026-04-06): 기능 확장 — 7개 에픽, 18개 스토리 (주문관리, 배송추적, 계좌이체, 소셜로그인)
- **QA** (2026-04-06): Playwright 자동 테스트 12개 항목, 버그 4건 수정

상세 개발 일지: [docs/개발일지.md](docs/개발일지.md)
