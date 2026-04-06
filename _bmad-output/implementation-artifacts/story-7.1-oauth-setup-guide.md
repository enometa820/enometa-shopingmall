---
epic: 7
story: 7.1
title: OAuth Provider 설정 가이드
status: complete
completedAt: '2026-04-06'
files:
  - docs/oauth-setup-guide.md
---

# Story 7.1: OAuth Provider 설정 가이드

As a 개발자,
I want Google/Kakao OAuth Provider 설정 가이드를 만들어,
So that 소셜 로그인 기반을 마련할 수 있다.

## Acceptance Criteria

- [x] Google OAuth 설정 단계별 가이드
- [x] Kakao OAuth 설정 단계별 가이드
- [x] Supabase Provider 설정 방법
- [x] Redirect URL 설정 안내

## Implementation Details

- Google: GCP Console → OAuth 2.0 Client → Authorized redirect URI 설정
- Kakao: Developers Console → 앱 생성 → 카카오 로그인 활성화 → Redirect URI
- Supabase: Auth > Providers에서 각 Provider 활성화 + Client ID/Secret 입력
- Redirect URL: `https://<project>.supabase.co/auth/v1/callback`

## Test Checklist

- [x] 가이드 단계별 스크린샷/링크 정확성 확인
- [x] Redirect URL 패턴이 실제 Supabase 설정과 일치
