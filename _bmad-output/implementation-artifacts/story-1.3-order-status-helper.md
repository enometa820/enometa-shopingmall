---
epic: 1
story: 1.3
title: 주문 상태 변경 공통 헬퍼
status: complete
completedAt: '2026-04-06'
files:
  - src/actions/order-status.ts
---

# Story 1.3: updateOrderStatus 헬퍼

As a 개발자,
I want updateOrderStatus 헬퍼 함수를 만들어,
So that 어디서 상태를 변경하든 이력이 100% 기록되고 전환 규칙이 적용된다.

## Acceptance Criteria

- [x] VALID_TRANSITIONS 맵으로 허용 전환만 실행
- [x] 금지 전환 시 한국어 에러 반환
- [x] orders.status 변경 + order_status_history INSERT 원자적 실행
- [x] revalidatePath(/admin/orders, /mypage) 자동 호출

## Implementation Details

- VALID_TRANSITIONS: Record<OrderStatus, OrderStatus[]> 맵으로 화이트리스트 관리
- 트랜잭션: orders UPDATE + order_status_history INSERT 순차 실행 (실패 시 early return)
- cancelOrder: 사용자 전용 래퍼 — paid/preparing/pending_payment만 허용

## Test Checklist

- [x] 허용 전환(paid→preparing) 성공 + history 기록 확인
- [x] 금지 전환(delivered→cancelled) 시 에러 메시지 반환
- [x] revalidatePath 호출로 목록 갱신 확인
