---
epic: 2
story: 2.2
title: postal_code 저장 및 표시
status: complete
completedAt: '2026-04-06'
files:
  - src/app/(shop)/checkout/page.tsx
  - src/app/(shop)/checkout/success/page.tsx
  - src/actions/orders.ts
  - src/app/(shop)/order-complete/[id]/page.tsx
---

# Story 2.2: postal_code 저장 및 표시

As a 구매자,
I want 주문에 우편번호가 저장되어,
So that 주문 완료/마이페이지/관리자에서 정확한 배송지를 확인할 수 있다.

## Acceptance Criteria

- [x] orders.postal_code에 우편번호 저장
- [x] 주문 완료 페이지에서 우편번호 표시
- [x] checkout에 AddressSearch 통합
