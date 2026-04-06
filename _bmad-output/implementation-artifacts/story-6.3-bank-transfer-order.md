---
epic: 6
story: 6.3
title: 계좌이체 주문 생성 + 안내 페이지
status: complete
completedAt: '2026-04-06'
files:
  - src/actions/orders.ts
  - src/app/(shop)/checkout/page.tsx
  - src/app/(shop)/order-complete/[id]/page.tsx
---

# Story 6.3: 계좌이체 주문 생성 + 안내 페이지

As a 구매자,
I want 계좌이체를 선택하고 주문하면 입금 안내를 받아,
So that 어디로 얼마를 입금해야 하는지 알 수 있다.

## Acceptance Criteria

- [x] bank_transfer 주문: status=pending_payment, payment_method=bank_transfer
- [x] 주문 완료 페이지에서 계좌 안내 표시 (은행, 계좌, 예금주, 금액, 주문번호)
- [x] 계좌 정보는 site_settings에서 조회
- [x] "입금 확인까지 대기" 안내 메시지
