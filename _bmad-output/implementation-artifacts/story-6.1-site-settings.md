---
epic: 6
story: 6.1
title: 사이트 설정 — 계좌 정보 관리
status: complete
completedAt: '2026-04-06'
files:
  - src/app/admin/settings/page.tsx
  - src/actions/admin.ts (adminGetSetting, adminUpdateSetting)
  - src/actions/settings.ts (getSetting)
  - src/app/admin/layout.tsx
---

# Story 6.1: 사이트 설정 — 계좌 정보 관리

As a 관리자,
I want 입금 계좌 정보를 관리자 페이지에서 설정하여,
So that 계좌이체 주문 시 안내할 계좌 정보를 직접 관리할 수 있다.

## Acceptance Criteria

- [x] /admin/settings 페이지 생성
- [x] 은행명, 계좌번호, 예금주 입력 폼
- [x] site_settings 테이블 upsert
- [x] 관리자 사이드바에 "설정" 링크 추가
