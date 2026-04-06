---
epic: 8
story: 8.3
title: 관리자 주문 상세 페이지
status: complete
completedAt: '2026-04-06'
files:
  - src/app/admin/orders/[id]/page.tsx
  - src/actions/admin.ts (adminGetOrder, adminGetOrderStatusHistory)
  - src/app/admin/orders/page.tsx (주문번호 링크)
---

# Story 8.3: 관리자 주문 상세 페이지

As a 관리자,
I want 주문 목록에서 주문번호를 클릭하여 상세 정보를 확인하고,
So that 배송 정보, 주문 상품, 결제, 송장, 상태 이력을 한 화면에서 관리할 수 있다.

## Acceptance Criteria

- [x] /admin/orders/[id] 라우트 생성
- [x] 주문 목록에서 order_number 클릭 → 상세 페이지 이동
- [x] 배송 정보 표시 (수령인, 연락처, 우편번호, 주소, 상세주소, 배송메모)
- [x] 주문 상품 목록 (상품명, 옵션, 수량, 금액) + 합계
- [x] 결제 정보 (결제수단 라벨, 결제금액, 결제키)
- [x] 송장 정보 (택배사명, 송장번호, 배송추적 링크) — tracking_number 있을 때만
- [x] 상태 이력 타임라인 (order_status_history DESC, 최신 강조)
- [x] 상태 변경 드롭다운 (cancelled/refund_requested는 텍스트만)
- [x] pending_payment 주문에 "결제 확인" 버튼
- [x] "주문 목록" 뒤로가기 링크

## Implementation Details

- adminGetOrder: requireAdmin → orders + order_items JOIN → single()
- adminGetOrderStatusHistory: requireAdmin → order_status_history WHERE order_id → changed_at DESC
- 3컬럼 그리드 레이아웃: 좌측 2칸(주문정보), 우측 1칸(타임라인+주문일시)
- Section/InfoGrid/InfoRow 헬퍼 컴포넌트로 일관된 UI (le17septembre 스타일)
- 주문 목록 page.tsx에서 order_number에 Link href={`/admin/orders/${order.id}`} 적용

## Test Checklist

- [x] 주문 목록에서 주문번호 클릭 → 상세 페이지 정상 진입
- [x] 존재하지 않는 주문 ID → notFound() 404 처리
- [x] 배송 정보 6개 필드 모두 표시 (없는 값은 '-')
- [x] 주문 상품 목록 + 합계 금액 일치
- [x] 상태 변경 드롭다운 동작 + 이력 갱신
- [x] 송장 있는 주문: 택배사명 + 송장번호 + 배송추적 링크
- [x] 비관리자 접근 시 Unauthorized 에러
