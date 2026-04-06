---
epic: 8
story: 8.1
title: QA 테스트 버그 수정
status: complete
completedAt: '2026-04-06'
files:
  - src/app/(shop)/mypage/OrderCard.tsx (pending_payment 취소 허용)
  - src/actions/order-status.ts (백엔드 취소 검증 수정)
  - src/app/admin/orders/page.tsx (취소 주문 드롭다운→텍스트)
  - src/app/auth/login/page.tsx (카카오 OAuth scope 수정)
  - src/app/auth/signup/page.tsx (카카오 OAuth scope 수정)
---

# Story 8.1: QA 라운드 버그 수정

Playwright 자동화 테스트 + 수동 테스트 중 발견된 4건의 버그 수정.

## Bug 1: pending_payment 주문 취소 불가
- **증상**: 계좌이체(입금대기) 주문에서 취소 버튼 미표시 / 클릭 시 "현재 상태에서는 취소할 수 없습니다"
- **원인**: CANCELLABLE_STATUSES와 cancelOrder() 검증에 `pending_payment` 누락
- **수정**: OrderCard.tsx + order-status.ts에 `pending_payment` 추가

## Bug 2: 취소된 주문 관리자 드롭다운 표시 오류
- **증상**: 관리자 주문 목록에서 취소된 주문이 "결제완료" 드롭다운으로 표시
- **원인**: OrderStatusSelect의 STATUSES에 cancelled 미포함 → fallback
- **수정**: admin/orders/page.tsx에서 cancelled/refund_requested 상태는 빨간 텍스트로 표시

## Bug 3: Supabase Site URL localhost 설정
- **증상**: Google 소셜 로그인 후 Supabase 대시보드로 리다이렉트
- **원인**: Supabase URL Configuration의 Site URL이 `http://localhost:3000`
- **수정**: Site URL → `https://enometa-shopingmall.vercel.app`, Redirect URLs 추가

## Bug 4: 카카오 OAuth scope 에러 (KOE205)
- **증상**: 카카오 로그인 클릭 시 KOE205 에러 — "설정하지 않은 동의 항목"
- **원인**: Supabase 기본 scope에 account_email 포함 (카카오 비즈니스 인증 필요 항목)
- **수정**: 카카오 로그인 활성화 + 동의항목 설정 + queryParams로 scope override (profile_nickname, profile_image만)
