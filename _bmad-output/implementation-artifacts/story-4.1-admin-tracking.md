---
epic: 4
story: 4.1
title: 관리자 송장번호 입력
status: complete
completedAt: '2026-04-06'
files:
  - src/components/admin/TrackingModal.tsx
  - src/actions/admin.ts (adminUpdateShipping 추가)
  - src/app/admin/orders/OrderStatusSelect.tsx
---

# Story 4.1: 관리자 송장번호 입력

As a 관리자,
I want 주문을 배송중으로 전환할 때 송장번호와 택배사를 입력하여,
So that 사용자가 배송을 추적할 수 있다.

## Acceptance Criteria

- [x] shipping 전환 시 TrackingModal 표시
- [x] 택배사 4종 선택 (CJ, 한진, 로젠, 우체국)
- [x] tracking_number + courier_company 필수 입력
- [x] updateOrderStatus 헬퍼로 상태 변경 + 이력 기록

## Implementation Details

- TrackingModal: Dialog 형태, courierCompany select + trackingNumber input
- adminUpdateShipping: requireAdmin → tracking_number/courier_company UPDATE → updateOrderStatus(→shipping)
- OrderStatusSelect에서 'shipping' 선택 시 모달 트리거

## Test Checklist

- [x] preparing→shipping 시 모달 표시, 송장 입력 후 전환 성공
- [x] 빈 송장번호로 제출 시 유효성 에러
- [x] DB에 tracking_number + courier_company 저장 확인
