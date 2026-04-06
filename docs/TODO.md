# Enometa Shopping Mall — TODO

> 최종 업데이트: 2026-04-06

---

## 완료된 항목

### Day 1~2: 기초 + 풀스택 구현 + 배포
- [x] 프로젝트 세팅 (Next.js 16 + TailwindCSS 4 + Supabase + TypeScript)
- [x] 디자인 토큰 + Pretendard 폰트 설정
- [x] DB 스키마 + RLS 정책 (products, orders, order_items, cart_items, inquiries)
- [x] 공통 레이아웃 (Header, SideMenu, Footer, PageTransition, BackToTop)
- [x] 인트로 페이지 (타이핑 애니메이션 + 이미지 카드 시퀀스)
- [x] 상품 리스트 (카테고리 필터, 그리드 토글 2/3/4열, 호버 이미지 스왑)
- [x] 상품 상세 (이미지 갤러리, 사이즈/컬러 선택, Sticky Bar)
- [x] 장바구니 사이드 드로어 (수량 변경, 삭제, 합계)
- [x] 결제 페이지 (배송 정보 폼 + 주문 요약)
- [x] 주문 완료 페이지
- [x] 회원가입 / 로그인 / 로그아웃
- [x] 마이페이지 (주문 내역)
- [x] 문의 시스템 (플로팅 버튼 + Supabase 저장)
- [x] 관리자 (대시보드, 상품 CRUD, 주문 관리, 문의 관리)
- [x] 미들웨어 (admin/mypage/checkout 라우트 보호)
- [x] 개인정보처리방침 + 이용약관 페이지
- [x] Seed 데이터 (12개 상품)
- [x] Vercel 배포
- [x] BMAD 전체 산출물 (브레인스토밍, Product Brief, PRD, Architecture, UX Design, Epics & Stories, Sprint Plan)
- [x] 개발일지 작성

### Day 3: 기능 완성 + 이미지
- [x] BMAD Party Mode 이미지 전략 회의
- [x] Midjourney 이미지 생성 (12상품 × 2장 + Lookbook 4장 = 28장)
- [x] 이미지 적용 (인트로, 상품 리스트, 상세, Lookbook)
- [x] 장바구니 Supabase 연동 (localStorage → DB 병합)
- [x] 토스페이먼츠 테스트 모드 연동 (Widget SDK v1)
- [x] Lookbook 페이지 (Coming Soon → 실제 구현)
- [x] 상세 페이지 이미지 클릭 확대 모달
- [x] SEO 메타태그 (Open Graph, Twitter Card, robots.txt)
- [x] 전체 cursor: pointer 적용
- [x] .env.example + .gitignore 정리
- [x] 개발일지 Day 3 + 회고
- [x] Git 커밋 + 푸시 + Vercel 자동 배포

---

## 남은 항목

### 필수 (배포 품질) — ✅ 전부 완료
- [x] Vercel 환경변수 추가 (NEXT_PUBLIC_TOSS_CLIENT_KEY, TOSS_SECRET_KEY)
- [x] 풀플로우 테스트 (회원가입 → 로그인 → 장바구니 → 토스 결제 → 주문 완료)
- [x] Lookbook 상품 링크 연결 (이미지 클릭 → 해당 상품 상세)
- [x] 사이드메뉴 로그인/로그아웃 상태 반영
- [x] 장바구니 수량 증가 버그 수정 (Supabase 중복 병합 제거)
- [x] 결제하기 버튼 가시성 개선
- [x] 모바일 카테고리 필터 → 메뉴 안으로 이동
- [x] 가입 후 바로 로그인 (리다이렉트 → /shop)

---

## 다음 세션 TODO

### 높은 우선순위 — ✅ 전부 완료
- [x] 에디토리얼/매거진 페이지 — b컷 이미지 26장 활용, /editorial 라우트
- [x] 모바일 반응형 폴리싱 — 스와이프 인디케이터 활성화 (IntersectionObserver)
- [x] 관리자 페이지 접근 — Server Action 보안 강화 + admin 설정 가이드 문서
- [x] 개발일지 최종 업데이트

### 중간 우선순위 — ✅ 전부 완료
- [x] 커스텀 404 페이지 (브랜드 디자인에 맞게)
- [x] Lighthouse 성능 점검 (75점 — 이미지 확대 기능 유지를 위해 리사이즈 포기, 인트로 연출 유지)


### 낮은 우선순위 — ✅ 전부 완료
- [x] 상품 검색 기능 (이름/설명 기반 실시간 필터링)
- [x] Supabase Storage 이미지 업로드 (설정 가이드 문서 작성 — 버킷 생성 필요)
- [x] 관리자 폼 UX 개선 (컬러 피커, 사이즈 토글, 재고 사이즈별 입력, 이미지 URL 동적 추가)
- [x] 재고 검증 (주문 생성 시 서버에서 재고 확인)
- [x] middleware → proxy 마이그레이션 (Next.js 16 권장)
- [x] 주문 상세 페이지 (수령인/연락처/상세주소/메모 표시 보강)
- [x] 신규가입 할인쿠폰 시스템 (10% 환영쿠폰 — DB 테이블 SQL + 서버 액션)

---

## v2 기능 확장 (2026-04-06)

### 구현 완료 — 빌드 통과, DB 마이그레이션 + OAuth 설정 미적용
- [x] 주문 상태 7종 확장 (pending_payment, cancelled, refund_requested 추가)
- [x] 주문 상태 변경 이력 추적 (order_status_history 테이블 + updateOrderStatus 헬퍼)
- [x] 카카오 우편번호 검색 (Daum Postcode API + AddressSearch 컴포넌트)
- [x] 사용자 주문 취소 (마이페이지에서 paid/preparing 상태 취소)
- [x] 배송 추적 (관리자 송장번호 입력 → 사용자 택배사 추적 링크)
- [x] 주문 상태 이력 타임라인 UI (마이페이지 주문 상세)
- [x] 관리자 주문 상태별 필터링 (7종 탭)
- [x] 관리자 결제 확인 버튼 (입금대기 주문)
- [x] 관리자 결제수단 뱃지 (카드/계좌이체)
- [x] 계좌이체 결제 (결제수단 선택 + 주문 생성 + 계좌 안내 페이지)
- [x] 사이트 설정 페이지 (관리자 계좌 정보 관리)
- [x] 소셜 로그인 버튼 (Google, Kakao — Supabase OAuth)
- [x] OAuth 설정 가이드 문서 (docs/oauth-setup-guide.md)
- [x] DB 마이그레이션 SQL (supabase/migrations/20260406_v2_orders_upgrade.sql)

### 미적용 (코드 외 작업)
- [ ] Supabase에 v2 마이그레이션 SQL 실행
- [ ] Google OAuth Provider 설정
- [ ] Kakao OAuth Provider 설정
- [ ] 관리자 설정에서 계좌 정보 입력
- [ ] Vercel 재배포
- [ ] 풀플로우 테스트 (주문→취소→배송추적, 계좌이체, 소셜 로그인)

---

## 기술 스택 요약

| 영역 | 선택 |
|------|------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | TailwindCSS 4 |
| Animation | Framer Motion |
| Backend | Supabase (PostgreSQL + Auth + RLS) |
| Payment | 토스페이먼츠 (Widget SDK v1, 테스트 모드) + 계좌이체 |
| Auth | Supabase Auth (이메일 + Google/Kakao OAuth) |
| State | Zustand + localStorage / Supabase |
| Image | Midjourney v7 (AI 생성) |
| Deploy | Vercel |
| Docs | BMAD Framework |

## 라우트 목록 (24개)

```
/                          인트로 (타이핑 + 카드 시퀀스)
/shop                      상품 리스트 (검색 + 카테고리 필터)
/product/[id]              상품 상세
/checkout                  결제
/checkout/success          결제 성공 처리
/checkout/fail             결제 실패
/order-complete/[id]       주문 완료/상세
/lookbook                  Lookbook
/editorial                 에디토리얼 (b컷 이미지)
/auth/login                로그인
/auth/signup               회원가입 (+ 환영쿠폰)
/mypage                    마이페이지
/admin                     관리자 대시보드
/admin/products            상품 관리
/admin/products/new        상품 등록 (비주얼 폼)
/admin/products/[id]/edit  상품 수정 (비주얼 폼)
/admin/orders              주문 관리
/admin/inquiries           문의 관리
/admin/settings            사이트 설정 (계좌 정보)
/policy/privacy            개인정보처리방침
/policy/terms              이용약관
/api/payments/confirm      결제 확인 API
/api/update-images         이미지 일괄 업데이트 API
```
