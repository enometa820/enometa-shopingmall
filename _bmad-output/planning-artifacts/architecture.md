---
stepsCompleted: [1, 2, 3]
inputDocuments: ['prd.md', 'ux-design.md', 'product-brief.md']
workflowType: 'architecture'
---

# Architecture Document — Enometa Shopping Mall

**Date:** 2026-04-04
**Version:** 1.0

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
│   │   │   ├── orders/page.tsx       # 주문 관리
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
│   │   │   ├── ShippingForm.tsx      # 배송 정보 폼
│   │   │   ├── OrderSummary.tsx      # 주문 요약
│   │   │   └── TossPayment.tsx       # 토스페이먼츠 위젯
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
│   │   │   └── StatusBadge.tsx       # 상태 뱃지
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
  status TEXT NOT NULL DEFAULT 'paid',   -- 'paid'|'preparing'|'shipping'|'delivered'
  total INTEGER NOT NULL,                -- 합계 금액
  shipping_name TEXT NOT NULL,
  shipping_phone TEXT NOT NULL,
  shipping_address TEXT NOT NULL,
  shipping_detail TEXT,
  shipping_memo TEXT,
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

### 3.6 RLS (Row Level Security) 정책

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
