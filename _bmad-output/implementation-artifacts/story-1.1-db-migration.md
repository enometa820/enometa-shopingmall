---
epic: 1
story: 1.1
title: DB 마이그레이션 — orders 테이블 확장 + 신규 테이블
status: complete
completedAt: '2026-04-06'
files:
  - supabase/migrations/20260406_v2_orders_upgrade.sql
---

# Story 1.1: DB 마이그레이션

As a 개발자,
I want orders 테이블에 v2 컬럼을 추가하고 신규 테이블을 생성하여,
So that v2 주문 관리 기능의 데이터 기반을 마련할 수 있다.

## Acceptance Criteria

- [x] orders 테이블에 postal_code, payment_method, bank_transfer_info, tracking_number, courier_company 컬럼 추가
- [x] orders.status CHECK 7종 확장 (pending_payment, paid, preparing, shipping, delivered, cancelled, refund_requested)
- [x] order_status_history 테이블 생성
- [x] site_settings 테이블 생성
- [x] 기존 v1 주문 데이터 유지 (ALTER TABLE, DROP 아님)
- [x] RLS 정책 설정

## Implementation Notes

- payment_method DEFAULT 'toss' (v1 호환)
- status DEFAULT 'paid' 유지 (v1 호환)
- order_status_history에 order_id 인덱스 포함
- site_settings에 updated_at 자동 갱신 트리거
