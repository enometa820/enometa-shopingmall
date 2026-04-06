---
epic: 3
story: 3.1
title: 마이페이지 주문 취소 기능
status: complete
completedAt: '2026-04-06'
files:
  - src/actions/order-status.ts (cancelOrder 추가)
  - src/app/(shop)/mypage/OrderCard.tsx
  - src/app/(shop)/mypage/page.tsx
---

# Story 3.1: 마이페이지 주문 취소

As a 구매자,
I want 마이페이지에서 주문을 취소할 수 있어,
So that 배송 전에 마음이 바뀌면 직접 취소할 수 있다.

## Acceptance Criteria

- [x] paid/preparing 상태에서만 "주문 취소" 버튼 표시
- [x] 확인 다이얼로그 후 cancelOrder 호출
- [x] status_history에 취소 사유 기록
- [x] shipping/delivered/cancelled에서는 버튼 숨김

## Implementation Details

- CANCELLABLE_STATUSES: ['paid', 'preparing', 'pending_payment']
- cancelOrder: requireAuth → 주문 소유 확인 → updateOrderStatus(→cancelled)
- OrderCard: status 기반 조건부 렌더링 + window.confirm 다이얼로그

## Test Checklist

- [x] paid 주문 취소 성공 + history에 '사용자 요청' 기록
- [x] pending_payment 주문 취소 성공
- [x] shipping 주문에 취소 버튼 미표시 확인
- [x] 타인 주문 취소 시도 시 에러 반환
