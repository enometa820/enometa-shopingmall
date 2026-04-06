---
epic: 4
story: 4.2
title: 마이페이지 배송 추적 표시
status: complete
completedAt: '2026-04-06'
files:
  - src/components/order/TrackingInfo.tsx
  - src/app/(shop)/order-complete/[id]/page.tsx
---

# Story 4.2: 마이페이지 배송 추적 표시

As a 구매자,
I want 마이페이지에서 송장번호와 배송 추적 링크를 확인하여,
So that 배송 상태를 실시간으로 확인할 수 있다.

## Acceptance Criteria

- [x] shipping/delivered 상태에서 택배사명 + 송장번호 표시
- [x] "배송 조회" 버튼 → 택배사별 추적 URL (외부 링크)
- [x] CJ, 한진, 로젠, 우체국 URL 매핑

## Implementation Details

- TrackingInfo 컴포넌트: courier_company + tracking_number → COURIER_COMPANIES에서 name/trackingUrl 조회
- trackingUrl: 택배사별 조회 URL 패턴 (CJ: `https://trace.cjlogistics.com/...`)
- order-complete 페이지에 shipping/delivered 조건부 렌더링

## Test Checklist

- [x] shipping 상태 주문에서 송장번호 + 택배사명 표시
- [x] "배송 조회" 링크 클릭 시 새 탭에서 택배사 추적 페이지 열림
- [x] tracking_number 없는 주문에서 컴포넌트 미표시
