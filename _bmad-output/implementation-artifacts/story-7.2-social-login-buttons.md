---
epic: 7
story: 7.2
title: 로그인/회원가입 소셜 버튼
status: complete
completedAt: '2026-04-06'
files:
  - src/app/auth/login/page.tsx
  - src/app/auth/signup/page.tsx
---

# Story 7.2: 로그인/회원가입 소셜 버튼

As a 사용자,
I want Google 또는 Kakao 버튼으로 로그인/회원가입하여,
So that 이메일/비밀번호 입력 없이 간편하게 접속할 수 있다.

## Acceptance Criteria

- [x] Google 로그인 버튼 (흰색 배경, Google "G" 아이콘)
- [x] Kakao 로그인 버튼 (#FEE500 배경, 카카오 아이콘)
- [x] signInWithOAuth 연동
- [x] 인증 후 /shop으로 리다이렉트
- [x] 기존 이메일 로그인 유지
- [x] 회원가입 페이지에도 동일 패턴

## Implementation Details

- signInWithOAuth({ provider, options: { redirectTo, queryParams } })
- Google: 기본 scope, Kakao: scope override (profile_nickname, profile_image만)
- redirectTo: `${origin}/auth/callback` → 인증 후 /shop 리다이렉트
- 구분선 "또는" 텍스트로 이메일 로그인과 시각적 분리

## Test Checklist

- [x] Google 버튼 클릭 → Google 로그인 → /shop 도착
- [x] Kakao 버튼 클릭 → 카카오 로그인 → /shop 도착
- [x] 기존 이메일 로그인 정상 작동 확인
- [x] 회원가입 페이지에서도 동일 동작 확인
