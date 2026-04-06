---
epic: 1
story: 1.2
title: TypeScript 타입 확장
status: complete
completedAt: '2026-04-06'
files:
  - src/types/order.ts
---

# Story 1.2: TypeScript 타입 확장

As a 개발자,
I want OrderStatus 타입을 7종으로 확장하고 새로운 타입을 추가하여,
So that v2 주문 관련 코드에서 타입 안전성을 보장할 수 있다.

## Acceptance Criteria

- [x] OrderStatus에 pending_payment, cancelled, refund_requested 추가
- [x] PaymentMethod 타입 정의 (toss | bank_transfer)
- [x] OrderStatusHistory 타입 정의
- [x] SiteSetting 타입 정의
- [x] ORDER_STATUS_LABELS 7종 한국어 라벨
- [x] PAYMENT_METHOD_LABELS 상수
- [x] COURIER_COMPANIES 상수 (CJ, 한진, 로젠, 우체국)
- [x] Order 타입에 v2 필드 5개 추가
- [x] v1 코드 호환성 유지

## Implementation Details

- OrderStatus 유니온: 기존 4종 + 3종 = 7종 리터럴 타입
- COURIER_COMPANIES: Record 구조로 name + trackingUrl 포함
- v1에서 사용하던 ORDER_STATUS_LABELS 키 유지 (하위 호환)

## Test Checklist

- [x] 기존 v1 코드에서 OrderStatus 사용하는 곳 타입 에러 없음
- [x] ORDER_STATUS_LABELS 7종 key-value 매핑 정상
- [x] tsc --noEmit 빌드 통과
