---
epic: 8
story: 8.2
title: 마이페이지 송장번호 및 배송추적 표시
status: complete
completedAt: '2026-04-06'
files:
  - src/app/(shop)/mypage/OrderCard.tsx
---

# Story 8.2: 마이페이지 송장번호 및 배송추적 버튼

As a 구매자,
I want 마이페이지 주문 목록에서 바로 송장번호와 배송추적 버튼을 볼 수 있어,
So that 주문 상세 페이지에 들어가지 않아도 배송 상태를 빠르게 확인할 수 있다.

## Acceptance Criteria
- [x] 배송중/배송완료 주문 카드에 택배사명 + 송장번호 표시
- [x] "배송추적" 버튼 클릭 시 택배사 추적 페이지로 이동 (새 탭)
- [x] 상품명 왼쪽, 송장+배송추적 오른쪽 배치 (시각적 균형)
- [x] 송장 없는 주문(결제완료, 배송준비 등)에는 미표시

## 구현
- OrderCard 타입에 `tracking_number`, `courier_company` 필드 추가
- COURIER_COMPANIES에서 택배사명과 trackingUrl 참조
- `e.stopPropagation()`으로 카드 링크와 버튼 클릭 충돌 방지
