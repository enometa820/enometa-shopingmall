---
epic: 6
story: 6.2
title: 체크아웃 결제수단 선택
status: complete
completedAt: '2026-04-06'
files:
  - src/components/checkout/PaymentMethodSelect.tsx
  - src/app/(shop)/checkout/page.tsx
---

# Story 6.2: 체크아웃 결제수단 선택

As a 구매자,
I want 체크아웃에서 토스페이먼츠 또는 계좌이체를 선택하여,
So that 원하는 방식으로 결제할 수 있다.

## Acceptance Criteria

- [x] 라디오 버튼: 토스페이먼츠 / 계좌이체
- [x] 토스 선택 시 Toss Widget 표시
- [x] 계좌이체 선택 시 Widget 숨김 + "주문하기" 버튼
- [x] 기본 선택: 토스페이먼츠
