---
stepsCompleted: [1, 2, 3, 4]
inputDocuments: ['prd.md', 'architecture.md', 'ux-design.md']
status: 'complete'
completedAt: '2026-04-06'
---

# Enometa Shopping Mall v2 — Epic Breakdown

## Overview

v2 기능 확장을 위한 에픽 & 스토리 분할. v1은 이미 구현 완료 상태이며, 이 문서는 v2 추가 기능만 다룬다.

## Requirements Inventory

### Functional Requirements

- FR-54: Daum Postcode API 팝업으로 우편번호 + 도로명 주소 검색. 선택 시 자동 입력
- FR-55: 체크아웃 주소 필드 클릭 시 Postcode 팝업 오픈. 상세주소만 직접 입력
- FR-56: 주문 데이터에 postal_code 저장. 주문완료/마이페이지/관리자에서 표시
- FR-57: 주문 상태 7종 확장 (pending_payment, paid, preparing, shipping, delivered, cancelled, refund_requested)
- FR-58: 사용자 주문 취소 — paid/preparing 상태에서만 활성화
- FR-59: 취소 실행 시 cancelled로 변경 + status_history 기록
- FR-60: 관리자 shipping 전환 시 tracking_number + courier_company 필수 입력
- FR-61: 마이페이지 송장번호 표시 + 택배사별 배송 추적 URL 외부 링크
- FR-62: order_status_history 테이블 — 모든 상태 변경 자동 기록
- FR-63: 마이페이지 주문 상세 상태 변경 이력 타임라인 UI
- FR-64: 관리자 주문 목록 상태별 필터링
- FR-65: 관리자 대시보드 입금대기 주문 수 카드
- FR-66: 체크아웃 결제수단 선택 라디오 (토스페이먼츠 / 계좌이체)
- FR-67: 토스 선택 시 Widget 표시, 계좌이체 선택 시 Widget 숨김 + 계좌 안내
- FR-68: 계좌이체 주문 — status=pending_payment, payment_method=bank_transfer
- FR-69: 계좌 안내 페이지 — 입금계좌, 예금주, 금액, 주문번호
- FR-70: 관리자 주문 목록 payment_method 뱃지 표시
- FR-71: 관리자 pending_payment 주문 "결제 확인" 버튼 → paid로 변경
- FR-72: orders에 payment_method, bank_transfer_info(JSONB) 저장
- FR-73: Supabase Auth에 Google OAuth Provider 추가
- FR-74: Supabase Auth에 Kakao OAuth Provider 추가

### Non-Functional Requirements

- NFR-10: Daum Postcode API 스크립트 로딩 3초 이내
- NFR-11: 주문 상태 변경 시 status_history 100% 기록 (누락 0건)

### Additional Requirements (Architecture)

- AR-1: DB 마이그레이션 — ALTER TABLE orders + order_status_history 신규 + site_settings 신규
- AR-2: updateOrderStatus 공통 헬퍼 함수 (상태 변경 + history INSERT 원자적)
- AR-3: 상태 전환 규칙 적용 (금지 전환: delivered→cancelled, cancelled→* 등)
- AR-4: site_settings 테이블로 계좌 정보 관리 + 관리자 수정 가능
- AR-5: Playwright로 OAuth Provider 설정 자동화

### UX Design Requirements

- UX-DR1: 체크아웃 결제수단 라디오 버튼 UI (토스/계좌이체 전환)
- UX-DR2: 카카오 우편번호 검색 팝업 + 자동입력 UI
- UX-DR3: 마이페이지 주문 취소 버튼 (상태 조건부 표시)
- UX-DR4: 마이페이지 배송 추적 정보 (송장번호 + 택배사 링크)
- UX-DR5: 마이페이지 주문 상태 변경 이력 타임라인 UI
- UX-DR6: 관리자 송장번호 입력 모달 (배송중 전환 시)
- UX-DR7: 관리자 결제 확인 버튼 (입금대기 주문)
- UX-DR8: 관리자 주문 목록 상태 필터 탭
- UX-DR9: 로그인/회원가입 소셜 로그인 버튼 (Google, Kakao)
- UX-DR10: 계좌 안내 페이지 (주문 완료 후 분기)

### FR Coverage Map

- FR-54, FR-55, FR-56: Epic 2 (카카오 우편번호)
- FR-57, FR-62: Epic 1 (DB + 타입 + 헬퍼 기반)
- FR-58, FR-59: Epic 3 (주문 취소)
- FR-60, FR-61, FR-63: Epic 4 (배송 추적)
- FR-64, FR-65, FR-70, FR-71: Epic 5 (관리자 주문 관리 강화)
- FR-66, FR-67, FR-68, FR-69, FR-72: Epic 6 (계좌이체)
- FR-73, FR-74: Epic 7 (소셜 로그인)

## Epic List

### Epic 1: 주문 시스템 기반 확장 — ✅ COMPLETE
주문 상태를 7종으로 확장하고, 상태 변경 이력 추적 시스템을 구축하여 v2 주문 관리 기능의 기반을 마련한다.
**FRs covered:** FR-57, FR-62, AR-1, AR-2, AR-3

### Epic 2: 카카오 우편번호 검색 — ✅ COMPLETE
체크아웃에서 카카오 우편번호 검색으로 배송지 입력을 개선하여 사용자가 정확한 주소를 빠르게 입력할 수 있다.
**FRs covered:** FR-54, FR-55, FR-56, NFR-10, UX-DR2

### Epic 3: 사용자 주문 취소 — ✅ COMPLETE
사용자가 마이페이지에서 결제완료/배송준비 상태의 주문을 직접 취소할 수 있다.
**FRs covered:** FR-58, FR-59, UX-DR3

### Epic 4: 배송 추적 — ✅ COMPLETE
관리자가 송장번호를 입력하면 사용자가 마이페이지에서 배송 상태와 추적 링크를 확인할 수 있다.
**FRs covered:** FR-60, FR-61, FR-63, UX-DR4, UX-DR5

### Epic 5: 관리자 주문 관리 강화 — ✅ COMPLETE
관리자가 주문을 상태별로 필터링하고, 입금대기 주문을 빠르게 확인하며, 결제 방법을 구분할 수 있다.
**FRs covered:** FR-64, FR-65, FR-70, FR-71, UX-DR6, UX-DR7, UX-DR8

### Epic 6: 계좌이체 결제 — ✅ COMPLETE
사용자가 토스페이먼츠 외에 계좌이체로 주문할 수 있고, 관리자가 입금을 확인하여 결제를 완료한다.
**FRs covered:** FR-66, FR-67, FR-68, FR-69, FR-72, AR-4, UX-DR1, UX-DR10

### Epic 7: 소셜 로그인 — ✅ COMPLETE
사용자가 Google 또는 Kakao 계정으로 간편하게 로그인/회원가입할 수 있다.
**FRs covered:** FR-73, FR-74, AR-5, UX-DR9

---

## Epic 1: 주문 시스템 기반 확장 — ✅ COMPLETE

### Story 1.1: DB 마이그레이션 ✅
- `supabase/migrations/20260406_v2_orders_upgrade.sql` 생성
- orders 테이블 5개 컬럼 추가, status CHECK 7종 확장
- order_status_history, site_settings 테이블 생성
- RLS 정책 설정 완료

### Story 1.2: TypeScript 타입 확장 ✅
- OrderStatus 7종 확장, PaymentMethod, OrderStatusHistory, SiteSetting 타입 추가
- ORDER_STATUS_LABELS 7종, PAYMENT_METHOD_LABELS, COURIER_COMPANIES 상수 추가
- Order 타입에 v2 필드 5개 추가
- v1 호환성 유지

### Story 1.3: updateOrderStatus 헬퍼 ✅
- `src/actions/order-status.ts` 생성
- VALID_TRANSITIONS 맵으로 상태 전환 규칙 적용
- 상태 변경 + history INSERT 원자적 실행
- revalidatePath 자동 호출

---

## Epic 2: 카카오 우편번호 검색 — ✅ COMPLETE

### Story 2.1: AddressSearch 컴포넌트 ✅
- `src/components/checkout/AddressSearch.tsx` 생성
- Daum Postcode API next/script lazyOnload 로딩
- 주소 선택 시 우편번호 + 도로명 자동입력

### Story 2.2: checkout 통합 + postal_code 저장 ✅
- checkout 페이지에 AddressSearch 통합
- orders.ts에 postalCode 저장 로직 추가
- order-complete 페이지에서 우편번호 표시

---

## Epic 3: 사용자 주문 취소 — ✅ COMPLETE

### Story 3.1: 마이페이지 주문 취소 ✅
- cancelOrder 서버 액션 추가 (order-status.ts)
- OrderCard 클라이언트 컴포넌트로 분리
- paid/preparing 상태에서만 취소 버튼 표시
- 확인 다이얼로그 + 에러/성공 처리

---

## Epic 4: 배송 추적 — ✅ COMPLETE

### Story 4.1: 관리자 송장번호 입력 ✅
- `src/components/admin/TrackingModal.tsx` 생성
- adminUpdateShipping 서버 액션 추가
- OrderStatusSelect에서 shipping 선택 시 모달 표시

### Story 4.2: 마이페이지 배송 추적 ✅
- `src/components/order/TrackingInfo.tsx` 생성
- 택배사별 추적 URL 매핑 (CJ, 한진, 로젠, 우체국)
- order-complete 페이지에 통합

### Story 4.3: 주문 상태 이력 타임라인 ✅
- `src/components/order/OrderStatusTimeline.tsx` 생성
- order_status_history 조회 + 시간순 타임라인 UI
- order-complete 페이지에 통합

---

## Epic 5: 관리자 주문 관리 강화 — ✅ COMPLETE

### Story 5.1: 주문 목록 상태 필터 ✅
- 관리자 주문 페이지에 7종 상태 필터 탭 추가
- URL searchParams 기반 서버 사이드 필터링
- 탭별 주문 수 표시

### Story 5.2: 결제 확인 + 결제수단 뱃지 ✅
- payment_method 뱃지 (카드/계좌이체) 추가
- pending_payment 주문에 "결제 확인" 버튼 추가
- 대시보드에 입금대기 주문 수 카드 추가

---

## Epic 6: 계좌이체 결제 — ✅ COMPLETE

### Story 6.1: 사이트 설정 — 계좌 정보 관리 ✅
- `src/app/admin/settings/page.tsx` 생성
- adminGetSetting/adminUpdateSetting 서버 액션 추가
- 관리자 사이드바에 "설정" 링크 추가

### Story 6.2: 체크아웃 결제수단 선택 ✅
- `src/components/checkout/PaymentMethodSelect.tsx` 생성
- 토스/계좌이체 라디오 전환, Toss Widget 조건부 표시

### Story 6.3: 계좌이체 주문 생성 + 안내 페이지 ✅
- orders.ts에 paymentMethod 처리 추가
- bank_transfer 시 status=pending_payment으로 생성
- order-complete에서 계좌 안내 UI 분기 표시

---

## Epic 7: 소셜 로그인 — ✅ COMPLETE

### Story 7.1: OAuth 설정 가이드 ✅
- `docs/oauth-setup-guide.md` 생성
- Google/Kakao OAuth Provider 설정 단계별 가이드

### Story 7.2: 소셜 로그인 버튼 ✅
- 로그인/회원가입 페이지에 Google, Kakao 버튼 추가
- Supabase Auth signInWithOAuth 연동
- 브랜드 컬러 스타일링 (Google 흰색, Kakao 노란색)
