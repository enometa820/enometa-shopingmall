---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]
inputDocuments: ['prd.md', 'ux-design.md', 'product-brief.md']
workflowType: 'architecture'
lastStep: 8
status: 'complete'
completedAt: '2026-04-06'
---

# Architecture Document — Enometa Shopping Mall

**Date:** 2026-04-06
**Version:** 2.0

---

## 1. 기술 스택

| 레이어 | 기술 | 버전 | 선택 근거 |
|--------|------|------|-----------|
| Framework | Next.js (App Router) | 14+ | SSR/SSG, SEO, Server Actions |
| Language | TypeScript | 5+ | 타입 안전성, 개발 생산성 |
| Styling | TailwindCSS | 3+ | 빠른 개발, 커스텀 디자인 토큰 |
| Animation | Framer Motion | 11+ | 페이지 트랜지션, 인터랙션 |
| Backend | Supabase | - | PostgreSQL + Auth + Storage + RLS |
| Payment | 토스페이먼츠 | - | 테스트 모드, 국내 PG 표준 |
| Deploy | Vercel | - | Next.js 최적 배포 |
| Font | Pretendard + Noto Sans KR | - | 레퍼런스 일치 |

---

## 2. 프로젝트 구조

```
enometa-shopingmall/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── layout.tsx                # 루트 레이아웃 (폰트, 메타)
│   │   ├── page.tsx                  # 인트로 페이지 (/)
│   │   ├── template.tsx              # 페이지 트랜지션 래퍼
│   │   │
│   │   ├── shop/
│   │   │   └── page.tsx              # 상품 리스트 (/shop)
│   │   │
│   │   ├── product/
│   │   │   └── [id]/
│   │   │       └── page.tsx          # 상품 상세 (/product/[id])
│   │   │
│   │   ├── checkout/
│   │   │   └── page.tsx              # 결제 (/checkout)
│   │   │
│   │   ├── order-complete/
│   │   │   └── [id]/
│   │   │       └── page.tsx          # 주문 완료
│   │   │
│   │   ├── auth/
│   │   │   ├── login/page.tsx        # 로그인
│   │   │   └── signup/page.tsx       # 회원가입
│   │   │
│   │   ├── mypage/
│   │   │   ├── page.tsx              # 마이페이지
│   │   │   └── orders/
│   │   │       └── [id]/page.tsx     # 주문 상세
│   │   │
│   │   ├── admin/
│   │   │   ├── layout.tsx            # 관리자 레이아웃 (사이드바)
│   │   │   ├── page.tsx              # 대시보드 리다이렉트
│   │   │   ├── dashboard/page.tsx    # 대시보드
│   │   │   ├── products/
│   │   │   │   ├── page.tsx          # 상품 목록
│   │   │   │   ├── new/page.tsx      # 상품 등록
│   │   │   │   └── [id]/
│   │   │   │       └── edit/page.tsx # 상품 수정
│   │   │   ├── orders/
│   │   │   │   ├── page.tsx          # 주문 관리 (상태 필터 탭)
│   │   │   │   ├── OrderStatusSelect.tsx  # 상태 변경 셀렉트
│   │   │   │   └── ConfirmPaymentButton.tsx # 입금 확인 버튼
│   │   │   ├── settings/page.tsx     # 사이트 설정 (계좌 정보)
│   │   │   └── inquiries/page.tsx    # 문의 관리
│   │   │
│   │   └── policy/
│   │       ├── privacy/page.tsx
│   │       └── terms/page.tsx
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx            # 헤더 (60px fixed)
│   │   │   ├── SideMenu.tsx          # 풀스크린 사이드 메뉴
│   │   │   ├── Footer.tsx            # 푸터
│   │   │   └── PageTransition.tsx    # Framer Motion 트랜지션 래퍼
│   │   │
│   │   ├── shop/
│   │   │   ├── ProductCard.tsx       # 상품 카드 (호버 스왑 + 미리보기)
│   │   │   ├── ProductGrid.tsx       # 그리드 (2/3/4열 전환)
│   │   │   ├── CategoryFilter.tsx    # 카테고리 필터 탭
│   │   │   └── GridToggle.tsx        # 그리드 전환 토글
│   │   │
│   │   ├── product/
│   │   │   ├── ImageGallery.tsx      # 이미지 세로 나열 (데스크톱) / 스와이프 (모바일)
│   │   │   ├── ProductInfo.tsx       # 상품 정보 패널
│   │   │   ├── SizeSelector.tsx      # 사이즈 선택
│   │   │   ├── ColorSelector.tsx     # 컬러 선택
│   │   │   └── StickyBar.tsx         # 하단 고정 구매 바
│   │   │
│   │   ├── cart/
│   │   │   ├── CartDrawer.tsx        # 사이드 드로어 장바구니
│   │   │   ├── CartItem.tsx          # 장바구니 아이템
│   │   │   └── CartSummary.tsx       # 합계 + 결제 버튼
│   │   │
│   │   ├── checkout/
│   │   │   ├── AddressSearch.tsx     # 카카오 우편번호 검색
│   │   │   ├── PaymentMethodSelect.tsx # 카드결제/계좌이체 전환
│   │   │   ├── ShippingForm.tsx      # 배송 정보 폼
│   │   │   ├── OrderSummary.tsx      # 주문 요약
│   │   │   └── TossPayment.tsx       # 토스페이먼츠 위젯
│   │   │
│   │   ├── order/
│   │   │   ├── OrderStatusTimeline.tsx # 주문 상태 이력 타임라인
│   │   │   └── TrackingInfo.tsx       # 배송 추적 정보
│   │   │
│   │   ├── inquiry/
│   │   │   ├── FloatingButton.tsx    # 플로팅 문의 버튼
│   │   │   └── InquiryForm.tsx       # 문의 폼 슬라이드업
│   │   │
│   │   ├── admin/
│   │   │   ├── AdminSidebar.tsx      # 관리자 사이드바
│   │   │   ├── StatsCard.tsx         # 통계 카드
│   │   │   ├── DataTable.tsx         # Notion 스타일 테이블
│   │   │   ├── ImageUploader.tsx     # 이미지 업로드 (드래그&드롭)
│   │   │   ├── StatusBadge.tsx       # 상태 뱃지
│   │   │   └── TrackingModal.tsx     # 송장 입력 모달 (택배사+송장번호)
│   │   │
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── Input.tsx
│   │       ├── Select.tsx
│   │       ├── Modal.tsx
│   │       └── BackToTop.tsx
│   │
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts             # 브라우저 클라이언트
│   │   │   ├── server.ts             # 서버 클라이언트 (Server Actions)
│   │   │   └── admin.ts              # 서비스 롤 클라이언트 (관리자)
│   │   │
│   │   ├── toss/
│   │   │   └── payment.ts            # 토스페이먼츠 유틸리티
│   │   │
│   │   └── utils/
│   │       ├── format.ts             # 가격 포맷 (₩), 날짜 등
│   │       └── cn.ts                 # clsx + tailwind-merge
│   │
│   ├── hooks/
│   │   ├── useCart.ts                # 장바구니 상태 관리
│   │   ├── useAuth.ts               # 인증 상태
│   │   └── useMediaQuery.ts         # 반응형 감지
│   │
│   ├── store/
│   │   └── cart-store.ts            # Zustand 장바구니 (비로그인 시)
│   │
│   ├── types/
│   │   ├── product.ts
│   │   ├── order.ts
│   │   ├── cart.ts
│   │   └── inquiry.ts
│   │
│   └── actions/
│       ├── products.ts              # 상품 Server Actions
│       ├── orders.ts                # 주문 Server Actions
│       ├── order-status.ts          # 주문 상태 변경 + 이력 기록 (v2)
│       ├── settings.ts              # 사이트 설정 조회 (v2)
│       ├── admin.ts                 # 관리자 전용 Actions (v2)
│       ├── cart.ts                  # 장바구니 Server Actions
│       └── inquiries.ts            # 문의 Server Actions
│
├── public/
│   └── fonts/                       # Pretendard 로컬 폰트
│
├── supabase/
│   └── migrations/                  # DB 마이그레이션 SQL
│
├── docs/                            # 과정 문서화
├── _bmad-output/                    # BMAD 산출물
├── 레퍼런스/                         # 레퍼런스 자료
│
├── tailwind.config.ts
├── next.config.ts
├── package.json
└── tsconfig.json
```

---

## 3. Supabase 데이터베이스 스키마

### 3.1 products

```sql
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,                    -- 'WRINKLE KNIT TOP'
  name_display TEXT NOT NULL,            -- 'WRINKLE KNIT TOP [IVORY]'
  price INTEGER NOT NULL,                -- 219000 (원 단위 정수)
  description TEXT,                      -- 상품 설명
  category TEXT NOT NULL,                -- 'top'|'outer'|'bottom'|'shoes'|'acc'
  sizes TEXT[] NOT NULL DEFAULT '{}',    -- ['S','M','L','XL']
  colors JSONB NOT NULL DEFAULT '[]',   -- [{"name":"Ivory","hex":"#F5F0EB"},{"name":"Navy","hex":"#1B2A4A"}]
  images TEXT[] NOT NULL DEFAULT '{}',   -- Supabase Storage 공개 URL 배열
  hover_image TEXT,                      -- 누끼/플랫레이 이미지 URL (호버 스왑용)
  stock JSONB NOT NULL DEFAULT '{}',    -- {"S":5,"M":3,"L":0,"XL":2} (0이면 품절)
  is_featured BOOLEAN DEFAULT false,     -- 고퀄 상세페이지 여부
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

### 3.2 orders

```sql
CREATE TABLE orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_number TEXT UNIQUE NOT NULL,     -- 'ENO-20260405-001' 형식
  user_id UUID REFERENCES auth.users(id),
  status TEXT NOT NULL DEFAULT 'pending_payment',
    -- 'pending_payment'|'paid'|'preparing'|'shipping'|'delivered'|'cancelled'|'refund_requested'
  total INTEGER NOT NULL,                -- 합계 금액
  shipping_name TEXT NOT NULL,
  shipping_phone TEXT NOT NULL,
  shipping_address TEXT NOT NULL,
  shipping_detail TEXT,
  shipping_memo TEXT,
  postal_code TEXT,                       -- 우편번호 (v2)
  payment_method TEXT NOT NULL DEFAULT 'toss',  -- 'toss'|'bank_transfer' (v2)
  bank_transfer_info JSONB,              -- 계좌이체 정보 (v2)
  tracking_number TEXT,                   -- 송장번호 (v2)
  courier_company TEXT,                   -- 택배사 코드 (v2)
  payment_key TEXT,                       -- 토스페이먼츠 paymentKey
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

### 3.3 order_items

```sql
CREATE TABLE order_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  product_name TEXT NOT NULL,            -- 스냅샷 (상품 삭제돼도 유지)
  size TEXT NOT NULL,
  color TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  price INTEGER NOT NULL                 -- 주문 시점 가격 스냅샷
);
```

### 3.4 cart_items

```sql
CREATE TABLE cart_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  size TEXT NOT NULL,
  color TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, product_id, size, color)  -- 동일 옵션 중복 방지
);
```

### 3.5 inquiries

```sql
CREATE TABLE inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'general', -- 'product'|'shipping'|'general'
  content TEXT NOT NULL,
  reply TEXT,
  status TEXT NOT NULL DEFAULT 'pending',   -- 'pending'|'replied'
  created_at TIMESTAMPTZ DEFAULT now()
);
```

### 3.6 order_status_history (v2)

```sql
CREATE TABLE order_status_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  from_status TEXT NOT NULL,
  to_status TEXT NOT NULL,
  changed_by UUID REFERENCES auth.users(id),
  changed_at TIMESTAMPTZ DEFAULT now()
);
```

### 3.7 site_settings (v2)

```sql
CREATE TABLE site_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now()
);
-- 용도: 계좌이체 계좌 정보 등 사이트 전역 설정
```

### 3.8 RLS (Row Level Security) 정책

```sql
-- products: 누구나 읽기 가능, admin만 쓰기
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "products_read" ON products FOR SELECT USING (true);
CREATE POLICY "products_admin" ON products FOR ALL USING (
  auth.jwt() ->> 'role' = 'admin'
);

-- orders: 본인 주문만 읽기, admin은 전체
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "orders_own" ON orders FOR SELECT USING (
  auth.uid() = user_id
);
CREATE POLICY "orders_admin" ON orders FOR ALL USING (
  auth.jwt() ->> 'role' = 'admin'
);
CREATE POLICY "orders_insert" ON orders FOR INSERT WITH CHECK (
  auth.uid() = user_id
);

-- cart_items: 본인만 CRUD
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "cart_own" ON cart_items FOR ALL USING (
  auth.uid() = user_id
);

-- inquiries: 누구나 INSERT, admin만 읽기/수정
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "inquiries_insert" ON inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "inquiries_admin" ON inquiries FOR SELECT USING (
  auth.jwt() ->> 'role' = 'admin'
);
CREATE POLICY "inquiries_admin_update" ON inquiries FOR UPDATE USING (
  auth.jwt() ->> 'role' = 'admin'
);
```

### 3.7 Supabase Storage

```
Buckets:
  - product-images (public)    — 상품 이미지 업로드
    Policy: 누구나 읽기, admin만 업로드/삭제
```

---

## 4. 핵심 아키텍처 결정 (ADR)

### ADR-1: Server Actions vs API Routes

**결정**: Next.js Server Actions 사용
**근거**: App Router와 자연스러운 통합, 별도 API 파일 불필요, 타입 안전, 주말 시간 절약
**트레이드오프**: REST API가 아니라 외부 클라이언트에서 재사용 불가 → 포트폴리오 목적이므로 문제 없음

### ADR-2: 상태 관리

**결정**: 
- 장바구니 (비로그인): Zustand + localStorage
- 장바구니 (로그인): Supabase cart_items 테이블
- 인증: Supabase Auth 내장
- 서버 데이터: Server Components + revalidate

**근거**: 최소 의존성, 주말에 셋업 시간 최소화

### ADR-3: 이미지 처리

**결정**: Supabase Storage + Next.js Image 컴포넌트
**근거**: 
- 관리자 이미지 업로드 → Supabase Storage public bucket
- 프론트엔드 렌더링 → `next/image` (WebP 자동 변환 + lazy loading)
- AI 생성 이미지는 사전에 Storage에 업로드 후 seed data로 등록

### ADR-4: 결제 플로우

```
1. 클라이언트: 토스페이먼츠 SDK 로드 → 결제 위젯 렌더
2. 사용자: 결제 정보 입력 → 결제 요청
3. 토스페이먼츠: 결제 처리 → successUrl로 리다이렉트 (paymentKey, orderId, amount)
4. 서버 (Server Action): paymentKey로 토스 결제 확인 API 호출 → 성공 시 orders 테이블 INSERT
5. 클라이언트: 주문 완료 페이지로 이동
```

### ADR-5: 관리자 권한

**결정**: Supabase Auth metadata에 role 필드 추가
**구현**:
- 회원가입 시 기본 role: 'user'
- 관리자 계정은 Supabase Dashboard에서 수동 설정 (role: 'admin')
- /admin/* 라우트는 middleware에서 role 체크
- RLS 정책으로 DB 레벨에서도 이중 보호

### ADR-6: 관리자 계정 초기화

**결정**: Supabase seed SQL로 관리자 계정 생성 + Auth metadata에 role 설정
**구현**:
- 관리자 이메일: `admin@enometa.com` / 비밀번호: 테스트용
- Supabase Dashboard → Authentication → Users에서 수동 생성 후 `raw_user_meta_data`에 `{"role": "admin"}` 설정
- Next.js middleware (`src/middleware.ts`)에서 /admin/* 라우트 보호:

```ts
// src/middleware.ts
import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'

export async function middleware(request) {
  // /admin 라우트 보호
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const supabase = createServerClient(/* ... */)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user || user.user_metadata?.role !== 'admin') {
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }
  }
  // /mypage, /checkout 보호
  if (['/mypage', '/checkout'].some(p => request.nextUrl.pathname.startsWith(p))) {
    const supabase = createServerClient(/* ... */)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }
  }
}
```

### ADR-7: 장바구니 비로그인→로그인 병합

**결정**: 로그인 성공 시 localStorage 장바구니를 Supabase cart_items에 병합
**구현**:
```
1. 로그인 성공
2. localStorage에서 cart 데이터 읽기
3. Supabase cart_items에서 기존 데이터 조회
4. 각 아이템: 동일(product_id+size+color)이면 수량 합산, 없으면 INSERT
5. localStorage 비우기
6. Supabase cart_items 기준으로 UI 갱신
```

### ADR-8: 토스페이먼츠 결제 플로우 상세

**테스트 모드 설정**:
- 클라이언트 키: `test_ck_...` (Toss Developers에서 발급)
- 시크릿 키: `test_sk_...`
- 테스트 카드: 카드번호 `4330000000000000` / 유효기간 `12/30` / CVC `123`

**결제 Idempotency**:
- orderId를 클라이언트에서 `ENO-{timestamp}-{random}` 형식으로 생성
- 결제 확인 API 호출 시 orderId로 중복 체크
- orders 테이블에 payment_key UNIQUE 제약 추가

**실패 처리**:
- 결제 실패 → 에러 메시지 표시 + "다시 시도" 버튼
- 재시도 시 새로운 orderId 생성 (기존 실패 건은 버림)
- 결제는 성공했으나 DB 저장 실패 → payment_key로 재조회 가능

### ADR-9: 모바일 이미지 갤러리

**결정**: CSS scroll-snap 사용 (외부 라이브러리 없음)
**근거**: Swiper.js 추가 시 번들 크기 증가, CSS scroll-snap으로 충분한 UX
**구현**:
```css
.gallery-mobile {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
}
.gallery-mobile > img {
  scroll-snap-align: center;
  flex-shrink: 0;
  width: 100%;
}
```
인디케이터 도트: IntersectionObserver로 현재 보이는 이미지 감지

### ADR-10: 페이지 트랜지션

**결정**: Framer Motion AnimatePresence + Next.js template.tsx
**구현**:
```tsx
// src/app/template.tsx
'use client'
import { motion } from 'framer-motion'

export default function Template({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}
```

---

## 5. 외부 패키지

```json
{
  "dependencies": {
    "next": "^14.0.0",
    "@supabase/supabase-js": "^2.0.0",
    "@supabase/ssr": "^0.5.0",
    "framer-motion": "^11.0.0",
    "@tosspayments/tosspayments-sdk": "^2.0.0",
    "zustand": "^4.0.0",
    "clsx": "^2.0.0",
    "tailwind-merge": "^2.0.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "tailwindcss": "^3.0.0",
    "@types/node": "^20.0.0",
    "@types/react": "^18.0.0",
    "eslint": "^8.0.0",
    "prettier": "^3.0.0"
  }
}
```

최소 의존성 원칙: 핵심 기능에 필요한 패키지만. UI 라이브러리(shadcn 등) 없이 TailwindCSS 직접 스타일링.

---

## 6. 배포 아키텍처

```
[Vercel]
  ├── Next.js App (SSR + Static)
  ├── Edge Functions (middleware)
  └── CDN (정적 자산)

[Supabase]
  ├── PostgreSQL (데이터)
  ├── Auth (인증)
  ├── Storage (이미지)
  └── RLS (보안)

[토스페이먼츠]
  └── 결제 API (테스트 모드)
```

환경변수:
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_TOSS_CLIENT_KEY=
TOSS_SECRET_KEY=
```

---

## 7. v2 아키텍처 결정 (ADR 11~19)

> v2 범위: 소셜 로그인, 카카오 우편번호, 주문 취소/배송 추적, 계좌이체
> PRD에서 제거: 사업자 정보 (FR-80~81), Clerk 마이그레이션 (FR-73~79)

### ADR-11: 소셜 로그인 — Supabase Auth 유지 + OAuth

**결정**: Clerk 전환 없이 Supabase Auth에 Google/Kakao OAuth Provider 추가
**근거**: 
- Supabase Auth가 이미 안정적으로 동작 중
- OAuth 추가만으로 소셜 로그인 달성 가능 (코드 변경 최소)
- Clerk 전환 시 RLS 재작성, user_id 타입 변환, middleware 교체 등 v2 작업량의 60% 차지 — 과잉
- Supabase 무료 50,000 MAU vs Clerk 무료 10,000 MAU
- 기존 RLS, middleware, Server Action 전부 그대로 유지

**영향**: ADR-5(관리자 권한), ADR-7(장바구니 병합) 변경 없음. user_id UUID 유지.

**외부 서비스 설정 방식**: Playwright 브라우저 자동화 + 사용자 인증 위임
- Google Cloud Console, Kakao Developers, Supabase 대시보드에서 로그인만 사용자가 수행
- API 키 발급, Provider 설정 등 나머지 조작은 Playwright로 자동화

### ADR-14: DB 마이그레이션 — ALTER TABLE

**결정**: 기존 테이블에 ALTER TABLE로 컬럼 추가. DROP 후 재생성 안 함.
**근거**: v1 주문 데이터 유지하면서 점진적 확장. 포트폴리오 시연 데이터 보존.
**변경 내용**:
- `orders` 추가 컬럼: `postal_code`, `payment_method`, `bank_transfer_info(JSONB)`, `tracking_number`, `courier_company`
- `orders.status` CHECK 확장: 7종 (`pending_payment`, `paid`, `preparing`, `shipping`, `delivered`, `cancelled`, `refund_requested`)
- 신규 테이블: `order_status_history` (`id`, `order_id`, `from_status`, `to_status`, `changed_by`, `changed_at`, `note`)
- 신규 테이블: `site_settings` (`key`, `value(JSONB)`, `updated_at`)
- user_id는 UUID 유지 (Clerk 전환 폐기됨)

### ADR-15: 주문 상태 변경 — 공통 헬퍼 함수

**결정**: `updateOrderStatus(orderId, newStatus, changedBy, note)` 헬퍼 함수로 상태 변경 + history INSERT를 원자적으로 처리
**근거**: 
- 상태 변경 지점이 여러 곳 (사용자 취소, 관리자 상태 변경, 결제 확인 등)
- Server Action에서 직접 INSERT 시 누락 리스크
- 헬퍼로 감싸면 어디서 호출하든 이력 100% 기록 보장
**구현**: `src/actions/order-status.ts`에 헬퍼 배치. Supabase transaction으로 상태 변경 + history INSERT 원자적 실행.

### ADR-17: 계좌 정보 — site_settings 테이블

**결정**: 계좌 정보를 `site_settings` 테이블에 저장. 관리자 페이지에서 수정 가능.
**근거**: 
- 포트폴리오를 오래 써먹을 용도 — 하드코딩보다 관리자 수정 가능이 실무적
- 향후 배송비 기준, 공지사항 등 확장 가능
- 외주 클라이언트에게 "관리자가 직접 변경 가능"을 어필

### ADR-18: 결제 수단 선택 — 체크아웃 내 라디오 전환

**결정**: 체크아웃 페이지에서 라디오 버튼으로 토스페이먼츠/계좌이체 전환
**근거**: 별도 페이지 분리 시 불필요한 라우트 증가. 한 페이지에서 전환이 자연스러운 UX.
**구현**:
- 토스페이먼츠 선택 → 기존 Toss Widget 표시
- 계좌이체 선택 → Toss Widget 숨김 + "주문하기" 버튼 + 계좌 안내
- 계좌이체 주문: `status=pending_payment`, `payment_method=bank_transfer`

### ADR-19: 카카오 우편번호 — next/script lazy 로딩

**결정**: Daum Postcode API를 `next/script`로 체크아웃 페이지에서만 lazy 로딩
**근거**: 다른 페이지 성능에 영향 없음. 체크아웃 진입 시에만 스크립트 로드.
**구현**: 체크아웃 페이지 `<Script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js" strategy="lazyOnload" />`

---

## 8. 구현 패턴 & 일관성 규칙

> v1 코드에서 추출한 패턴 + v2 추가 규칙. AI 에이전트가 일관된 코드를 작성하기 위한 기준.

### 8.1 네이밍 패턴

| 대상 | 규칙 | 예시 |
|------|------|------|
| DB 테이블/컬럼 | snake_case | `order_status_history`, `tracking_number` |
| TypeScript 타입 | PascalCase | `OrderStatus`, `PaymentMethod` |
| Server Action 함수 | camelCase | `createOrder`, `adminGetProducts` |
| 컴포넌트 파일 | PascalCase.tsx | `CartDrawer.tsx`, `StickyBar.tsx` |
| 액션/유틸 파일 | camelCase.ts | `orders.ts`, `format.ts` |
| 한국어 에러 메시지 | 존댓말 | `'로그인이 필요합니다.'` |

### 8.2 Server Action 구조

```typescript
'use server'

import { createClient } from '@/lib/supabase/server'

// 일반 사용자 액션
export async function actionName(input: InputType) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: '로그인이 필요합니다.' }

  // 비즈니스 로직
  const { data, error } = await supabase.from('table').select('*')
  if (error) return { error: '처리 중 오류가 발생했습니다.' }
  return { data }
}

// 관리자 액션
export async function adminActionName(input: InputType) {
  const { supabase } = await requireAdmin()  // throw on fail
  // 비즈니스 로직
  revalidatePath('/admin/...')
}
```

### 8.3 에러 반환 패턴

- 성공: `{ data: ... }` 또는 직접 반환 (배열 등)
- 실패: `{ error: '한국어 사용자 메시지' }`
- 권한 에러: `throw new Error('Unauthorized: admin access required')`
- 관리자 실패 시 빈 배열: `if (error) return []`

### 8.4 주문 상태 전환 규칙 (v2)

```
pending_payment → paid           (관리자 결제 확인)
pending_payment → cancelled      (사용자 또는 관리자)
paid            → preparing      (관리자)
paid            → cancelled      (사용자)
preparing       → shipping       (관리자, 송장번호 필수)
preparing       → cancelled      (사용자)
shipping        → delivered      (관리자)
cancelled       → (최종 상태)
refund_requested → (관리자 별도 처리)
```

**금지 전환**: `delivered → cancelled`, `shipping → cancelled` (사용자), `cancelled → *`

### 8.5 타입 확장 패턴 (v2)

```typescript
// src/types/order.ts — v2 확장
export type OrderStatus =
  | 'pending_payment' | 'paid' | 'preparing'
  | 'shipping' | 'delivered' | 'cancelled' | 'refund_requested'

export type PaymentMethod = 'toss' | 'bank_transfer'

export type OrderStatusHistory = {
  id: string
  order_id: string
  from_status: OrderStatus
  to_status: OrderStatus
  changed_by: string       // user_id 또는 'admin'
  changed_at: string
  note: string | null
}

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  pending_payment: '입금대기',
  paid: '결제완료',
  preparing: '배송준비',
  shipping: '배송중',
  delivered: '배송완료',
  cancelled: '취소',
  refund_requested: '환불요청',
}
```

### 8.6 Revalidation 패턴

상태 변경 후 관련 경로 즉시 갱신:
- 주문 상태 변경: `revalidatePath('/admin/orders')` + `revalidatePath('/mypage')`
- 상품 변경: `revalidatePath('/admin/products')` + `revalidatePath('/shop')`
- 문의 답변: `revalidatePath('/admin/inquiries')`

### 8.7 외부 스크립트 패턴 (v2)

```tsx
// Daum Postcode — 체크아웃 페이지 전용
import Script from 'next/script'

<Script
  src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
  strategy="lazyOnload"
/>
```

### 8.8 안티패턴 (하지 말 것)

- DB 컬럼에 camelCase 사용 금지 (`trackingNumber` ✗ → `tracking_number` ✓)
- Server Action에서 try-catch로 에러 삼키기 금지 — 명시적 에러 반환
- `requireAdmin()` 없이 관리자 액션 만들기 금지
- 상태 변경 시 `updateOrderStatus` 헬퍼 우회 금지 — 이력 누락 방지
- `revalidatePath` 누락 금지 — 데이터 변경 후 반드시 호출

---

## 9. 프로젝트 구조 & 경계 (v1 + v2)

> 🔄 = v2 변경, 🆕 = v2 신규. 표시 없는 파일은 v1 기존.

### 9.1 디렉토리 구조

```
enometa-shopingmall/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx                          # 인트로
│   │   ├── not-found.tsx                     # 커스텀 404
│   │   │
│   │   ├── (shop)/                           # 사용자 라우트 그룹
│   │   │   ├── layout.tsx
│   │   │   ├── shop/
│   │   │   │   ├── page.tsx
│   │   │   │   └── ShopContent.tsx
│   │   │   ├── product/[id]/
│   │   │   │   ├── page.tsx
│   │   │   │   └── ProductDetail.tsx
│   │   │   ├── checkout/
│   │   │   │   ├── page.tsx                  # 🔄 결제수단 라디오 + 카카오 우편번호
│   │   │   │   ├── success/page.tsx
│   │   │   │   └── fail/page.tsx
│   │   │   ├── order-complete/[id]/
│   │   │   │   └── page.tsx                  # 🔄 계좌이체 안내 분기
│   │   │   ├── mypage/
│   │   │   │   ├── page.tsx                  # 🔄 주문 취소 + 배송 추적 + 상태 이력
│   │   │   │   └── LogoutButton.tsx
│   │   │   ├── lookbook/page.tsx
│   │   │   └── editorial/page.tsx
│   │   │
│   │   ├── admin/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── dashboard/page.tsx            # 🔄 입금대기 주문 수 카드
│   │   │   ├── products/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── new/page.tsx
│   │   │   │   ├── [id]/edit/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   └── EditProductForm.tsx
│   │   │   │   └── DeleteProductButton.tsx
│   │   │   ├── orders/
│   │   │   │   ├── page.tsx                  # 🔄 상태 필터 + 결제확인 + 송장
│   │   │   │   └── OrderStatusSelect.tsx     # 🔄 7종 상태 + 송장 모달
│   │   │   ├── inquiries/
│   │   │   │   ├── page.tsx
│   │   │   │   └── InquiryReplyForm.tsx
│   │   │   └── settings/                     # 🆕 사이트 설정
│   │   │       └── page.tsx
│   │   │
│   │   ├── auth/
│   │   │   ├── login/page.tsx                # 🔄 소셜 로그인 버튼
│   │   │   └── signup/page.tsx               # 🔄 소셜 회원가입 버튼
│   │   │
│   │   ├── api/
│   │   │   ├── payments/confirm/route.ts
│   │   │   └── update-images/route.ts
│   │   │
│   │   └── policy/
│   │       ├── privacy/page.tsx
│   │       └── terms/page.tsx
│   │
│   ├── actions/
│   │   ├── admin.ts                          # 🔄 결제확인, 송장, 설정관리
│   │   ├── orders.ts                         # 🔄 계좌이체 주문 생성
│   │   ├── order-status.ts                   # 🆕 updateOrderStatus 헬퍼
│   │   ├── cart.ts
│   │   ├── products.ts
│   │   ├── inquiries.ts
│   │   └── coupons.ts
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── SideMenu.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── PageTransition.tsx
│   │   │   └── AnnouncementBar.tsx
│   │   ├── shop/
│   │   │   ├── ProductCard.tsx
│   │   │   ├── ProductGrid.tsx
│   │   │   ├── CategoryFilter.tsx
│   │   │   └── GridToggle.tsx
│   │   ├── cart/
│   │   │   └── CartDrawer.tsx
│   │   ├── checkout/                         # 🆕 폴더
│   │   │   ├── AddressSearch.tsx              # 🆕 카카오 우편번호
│   │   │   └── PaymentMethodSelect.tsx        # 🆕 결제수단 라디오
│   │   ├── order/                            # 🆕 폴더
│   │   │   ├── OrderStatusTimeline.tsx        # 🆕 상태 이력 타임라인
│   │   │   └── TrackingInfo.tsx               # 🆕 배송 추적 링크
│   │   ├── admin/
│   │   │   ├── ImageUploader.tsx
│   │   │   └── TrackingModal.tsx              # 🆕 송장번호 입력 모달
│   │   ├── inquiry/
│   │   │   └── FloatingInquiry.tsx
│   │   └── ui/
│   │       └── BackToTop.tsx
│   │
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts
│   │   │   ├── server.ts
│   │   │   └── admin.ts
│   │   └── utils/
│   │       ├── cn.ts
│   │       └── format.ts
│   │
│   ├── store/
│   │   └── cart-store.ts
│   │
│   ├── types/
│   │   ├── product.ts
│   │   ├── order.ts                          # 🔄 7종 상태 + PaymentMethod + StatusHistory
│   │   ├── cart.ts
│   │   └── inquiry.ts
│   │
│   └── proxy.ts
│
├── supabase/
│   └── migrations/
│       ├── ...v1 migrations...
│       └── 20260406_v2_orders_upgrade.sql    # 🆕 ALTER TABLE + 신규 테이블
│
├── public/fonts/
├── docs/
├── _bmad-output/
└── 설정 파일들
```

### 9.2 v2 기능 → 파일 매핑

| v2 기능 | 신규/변경 파일 |
|---------|---------------|
| 소셜 로그인 | `auth/login/page.tsx` 🔄, `auth/signup/page.tsx` 🔄 |
| 카카오 우편번호 | `components/checkout/AddressSearch.tsx` 🆕, `checkout/page.tsx` 🔄 |
| 결제수단 선택 | `components/checkout/PaymentMethodSelect.tsx` 🆕, `checkout/page.tsx` 🔄 |
| 계좌이체 주문 | `actions/orders.ts` 🔄, `order-complete/[id]/page.tsx` 🔄 |
| 주문 취소 | `actions/order-status.ts` 🆕, `mypage/page.tsx` 🔄 |
| 배송 추적 | `components/order/TrackingInfo.tsx` 🆕, `mypage/page.tsx` 🔄 |
| 상태 이력 | `components/order/OrderStatusTimeline.tsx` 🆕, `mypage/page.tsx` 🔄 |
| 관리자 송장 | `components/admin/TrackingModal.tsx` 🆕, `admin/orders/` 🔄 |
| 관리자 결제확인 | `admin/orders/page.tsx` 🔄, `actions/admin.ts` 🔄 |
| 사이트 설정 | `admin/settings/page.tsx` 🆕, `actions/admin.ts` 🔄 |
| DB 마이그레이션 | `supabase/migrations/20260406_v2_orders_upgrade.sql` 🆕 |
| 타입 확장 | `types/order.ts` 🔄 |

### 9.3 외부 연동 경계

| 서비스 | 연동 지점 | 방향 |
|--------|----------|------|
| Supabase Auth | `lib/supabase/*.ts`, `proxy.ts` | 양방향 |
| Supabase DB | `actions/*.ts` (Server Actions) | 서버→DB |
| Supabase Storage | `components/admin/ImageUploader.tsx` | 클라이언트→Storage |
| 토스페이먼츠 | `checkout/page.tsx`, `api/payments/confirm/route.ts` | 클라이언트+서버→토스 |
| Daum Postcode | `components/checkout/AddressSearch.tsx` | 클라이언트→외부 스크립트 |
| Google OAuth | Supabase 대시보드 설정 (코드 변경 없음) | Auth 위임 |
| Kakao OAuth | Supabase 대시보드 설정 (코드 변경 없음) | Auth 위임 |

---

## 10. 아키텍처 검증 결과

### 10.1 일관성 검증 ✅

- **기술 스택 호환성**: Next.js 16 + Supabase Auth OAuth + 토스페이먼츠 + Daum Postcode — 충돌 없음
- **패턴 일관성**: v2 신규 파일이 v1 네이밍/구조 패턴 그대로 따름
- **구조 정합성**: 신규 폴더/파일이 기존 패턴과 일치

### 10.2 요구사항 커버리지 ✅

| PRD FR 범위 | 커버 | 비고 |
|------------|:---:|------|
| FR-54~56 카카오 우편번호 | ✅ | ADR-19 + AddressSearch.tsx |
| FR-57~65 주문관리 강화 | ✅ | ADR-14, 15 + order-status.ts |
| FR-66~72 계좌이체 | ✅ | ADR-17, 18 + site_settings |
| FR-73~74 소셜 로그인 | ✅ | ADR-11 (Supabase OAuth) |
| FR-75~79 Clerk 전용 | ❌ 제거 | Clerk 폐기 결정 |
| FR-80~81 사업자 정보 | ❌ 제거 | 포트폴리오에 불필요 |
| NFR-10 Postcode 로딩 | ✅ | next/script lazyOnload |
| NFR-11 status_history 100% | ✅ | ADR-15 공통 헬퍼 |

### 10.3 갭 분석

**⚠️ PRD 문서 정합성 이슈**: PRD v2가 Clerk 기준으로 작성됨 (FR-36~39, FR-43, FR-73~79). 아키텍처에서 Clerk → Supabase OAuth로 결정했으므로, 구현 전 PRD 수정 또는 아키텍처 문서 우선 참조 필요.

**규칙: PRD와 아키텍처 문서가 충돌할 경우 아키텍처 문서가 우선한다.**

### 10.4 완성도 체크리스트

**✅ 요구사항 분석**
- [x] 프로젝트 컨텍스트 분석 완료
- [x] v1 기존 코드 + v2 확장 범위 파악
- [x] 기술 제약 식별 완료

**✅ 아키텍처 결정**
- [x] v1 ADR 1~10 기존 유지
- [x] v2 ADR 11~19 신규 결정 (Clerk 폐기 포함)
- [x] Party Mode로 결정 검증 완료

**✅ 구현 패턴**
- [x] v1 코드에서 패턴 추출 + v2 규칙 추가
- [x] 네이밍, 구조, 에러, 상태 전환 규칙 정의
- [x] 안티패턴 문서화

**✅ 프로젝트 구조**
- [x] v1 전체 구조 + v2 추가/변경 파일 매핑
- [x] 외부 연동 경계 정의
- [x] 기능→파일 매핑 테이블 완성

### 10.5 구현 우선순위 (권장)

1. **DB 마이그레이션** — orders 테이블 확장 + 신규 테이블 (모든 v2 기능의 기반)
2. **타입 확장** — `types/order.ts` 7종 상태 + PaymentMethod
3. **주문 상태 헬퍼** — `actions/order-status.ts` (주문 취소/배송 추적의 핵심)
4. **관리자 주문 관리 강화** — 상태 필터, 결제확인, 송장입력
5. **사용자 주문 취소 + 배송 추적** — mypage 확장
6. **계좌이체 결제** — 결제수단 선택 + 계좌 안내
7. **카카오 우편번호** — 체크아웃 주소 검색
8. **소셜 로그인** — Supabase OAuth (Playwright로 설정)
9. **사이트 설정** — admin/settings + site_settings 테이블
