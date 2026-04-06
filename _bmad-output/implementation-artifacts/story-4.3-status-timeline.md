---
epic: 4
story: 4.3
title: 주문 상태 이력 타임라인
status: complete
completedAt: '2026-04-06'
files:
  - src/components/order/OrderStatusTimeline.tsx
  - src/app/(shop)/order-complete/[id]/page.tsx
---

# Story 4.3: 주문 상태 이력 타임라인

As a 구매자,
I want 마이페이지에서 주문 상태 변경 이력을 타임라인으로 확인하여,
So that 주문이 어떤 과정을 거쳤는지 한눈에 볼 수 있다.

## Acceptance Criteria

- [x] order_status_history 조회 + 시간순 타임라인 UI
- [x] 각 이력에 변경 전/후 상태, 시각, 메모 표시
- [x] 최신 상태 하이라이트

## Implementation Details

- OrderStatusTimeline: order_status_history 배열 → changed_at DESC 정렬 → dot+line UI
- 각 항목: from_status→to_status 라벨 + changed_at 시각 + 메모(있으면)
- 최신(index===0) 항목: bg-dark dot + font-medium 강조

## Test Checklist

- [x] 여러 번 상태 변경된 주문에서 이력 전체 표시
- [x] 이력 없는 주문에서 "이력이 없습니다" 표시
- [x] 최신 항목 시각적 강조 확인
