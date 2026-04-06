---
epic: 5
story: 5.1
title: 관리자 주문 목록 상태 필터
status: complete
completedAt: '2026-04-06'
files:
  - src/app/admin/orders/page.tsx
  - src/actions/admin.ts (adminGetOrderCounts 추가)
---

# Story 5.1: 관리자 주문 목록 상태 필터

As a 관리자,
I want 주문 목록을 상태별로 필터링하여,
So that 특정 상태의 주문만 빠르게 확인할 수 있다.

## Acceptance Criteria

- [x] 7종 상태 필터 탭 (전체 포함)
- [x] 각 탭에 주문 수 표시
- [x] URL searchParams 기반 서버 사이드 필터링

## Implementation Details

- FILTER_STATUSES 배열: 7종 + 'all' (refund_requested는 필터 미포함)
- adminGetOrders(status): status가 'all'이면 전체, 아니면 .eq('status', status)
- adminGetOrderCounts: 전체 orders의 status 컬럼 GROUP BY 카운트

## Test Checklist

- [x] '결제완료' 탭 클릭 → URL ?status=paid → 해당 주문만 표시
- [x] 각 탭 숫자와 실제 주문 수 일치
- [x] 전체 탭에서 모든 주문 표시
