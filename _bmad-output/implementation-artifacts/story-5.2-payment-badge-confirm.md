---
epic: 5
story: 5.2
title: 관리자 결제 확인 + 결제수단 뱃지
status: complete
completedAt: '2026-04-06'
files:
  - src/app/admin/orders/page.tsx
  - src/app/admin/orders/ConfirmPaymentButton.tsx
  - src/app/admin/dashboard/page.tsx
---

# Story 5.2: 관리자 결제 확인 + 결제수단 뱃지

As a 관리자,
I want 입금대기 주문의 결제를 확인하고 결제 수단을 구분하여,
So that 계좌이체 주문을 빠르게 처리할 수 있다.

## Acceptance Criteria

- [x] payment_method 뱃지 (카드: 파란색, 계좌이체: 주황색)
- [x] pending_payment 주문에 "결제 확인" 버튼
- [x] 대시보드에 입금대기 주문 수 카드 추가

## Implementation Details

- payment_method 뱃지: toss=파란 bg, bank_transfer=주황 bg (인라인 스타일)
- ConfirmPaymentButton: adminConfirmPayment 서버 액션 → updateOrderStatus(pending_payment→paid)
- 대시보드: adminGetOrderCounts에서 pending_payment 수 표시

## Test Checklist

- [x] 카드결제 주문: 파란색 뱃지 표시
- [x] 계좌이체 주문: 주황색 뱃지 + "결제 확인" 버튼 표시
- [x] 결제 확인 클릭 → pending_payment→paid 전환 + 목록 갱신
