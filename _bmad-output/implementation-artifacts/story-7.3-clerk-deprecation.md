---
epic: 7
story: 7.3
title: Clerk 전환 폐기 — Supabase Auth 유지 결정
status: complete
completedAt: '2026-04-06'
files: []
---

# Story 7.3: Clerk 전환 폐기 결정

As a 개발자,
I want 인증(Authentication) 시스템을 단일화해,
So that 이중 시스템 관리 부담 없이 소셜 로그인을 제공할 수 있다.

## 배경
v2 기획 시 소셜 로그인 추가를 위해 Clerk(외부 인증 서비스) 도입을 검토함.
Party Mode(다중 에이전트 토론)에서 "왜 Clerk으로 바꿔야 하는가?" 질문 → Supabase Auth로 충분하다는 결론.

## 폐기 이유

### 1. RLS 재설계 불필요
Supabase의 RLS(Row Level Security, 행 수준 보안)는 `auth.uid()`와 `auth.jwt()`로 동작.
Clerk 전환 시 모든 RLS 정책을 Clerk의 JWT 구조에 맞게 재작성해야 함.

### 2. 이중 인증 시스템 회피
Clerk + Supabase Auth 두 개를 관리하면 세션 동기화, 토큰 갱신 등 복잡도 급증.
Supabase만 쓰면 DB-Auth-Storage 모두 단일 시스템.

### 3. Supabase OAuth 충분
Supabase Auth는 Google, Kakao 포함 20개 이상의 OAuth Provider를 기본 지원.
`signInWithOAuth()` 한 줄로 소셜 로그인 구현 가능.

### 4. 작업량 60% 감소
Clerk 도입 시 예상 작업: 미들웨어 교체 + RLS 재설계 + 세션 관리 + UI 커스텀.
Supabase Auth 유지 시 작업: OAuth 버튼 컴포넌트 추가 + Supabase 대시보드 설정.

## Clerk이 유리한 경우 (참고)
- Supabase를 사용하지 않는 프로젝트 (별도 DB)
- MFA(다중 인증), 조직 관리, 역할 기반 접근 등 고급 기능 필요
- 빌트인 로그인 UI를 빠르게 쓰고 싶을 때

## 결정
Clerk 전환 폐기. Supabase Auth에 Google/Kakao OAuth 추가로 v2 소셜 로그인 구현.
