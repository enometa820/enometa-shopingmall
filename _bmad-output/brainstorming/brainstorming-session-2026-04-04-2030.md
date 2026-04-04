---
stepsCompleted: [1]
inputDocuments: ['레퍼런스/쇼핑몰구축 계획메모.md', '레퍼런스/le917분석.md']
session_topic: 'Enometa 쇼핑몰 포트폴리오 — 주말 스프린트 전략'
session_goals: '6가지 열린 질문 해결 + Enometa 차별화 포인트 + 현실적 구현 전략'
selected_approach: 'ai-recommended'
techniques_used: []
ideas_generated: []
context_file: ''
---

# Brainstorming Session — Enometa Shopping Mall

**Date:** 2026-04-04
**Topic:** Enometa 쇼핑몰 포트폴리오 — 주말 스프린트 전략
**Goals:** 6가지 열린 질문 해결 + Enometa 차별화 포인트 + 현실적 구현 전략

## Session Overview

### 컨텍스트
- 강의 미션: 주말(2~3일) 안에 "동작하는 쇼핑몰" 구축
- 레퍼런스: le17septembre.com (상세 분석 완료)
- 레퍼런스 이미지 18장 확보 (2개 상품)
- 기술: Next.js + TailwindCSS + Framer Motion
- 이미지: Midjourney + Gemini 3 Pro 혼합
- 프로토타이핑: Google Stitch

### 열린 질문
1. Enometa만의 차별점 (레퍼런스와 어디서 다르게?)
2. 인트로 페이지 구현 (타이핑 + 카드 시퀀스)
3. 나머지 10~13개 상품 이미지 생성 전략
4. 백엔드/데이터 전략 (주말 현실)
5. 템플릿화/재사용 파이프라인 범위
6. Stitch 프로토타이핑 범위

### AI 추천 기법: Resource Constraints → SCAMPER → First Principles

---

## 기법 1: Resource Constraints — 핵심 결정

| 질문 | 결정 |
|------|------|
| 퀄리티 집중 | 인트로 + 상세(95%) → 리스트(90%) → 장바구니/결제(85%) → 관리자(80%) |
| 백엔드 | Supabase (기존 경험 있음, enometa-landing-showcase 참조) |
| 이미지 | 반나절 투자, Midjourney + Gemini 3 Pro 전 상품 에디토리얼 톤 통일 |
| 결제 | 토스페이먼츠 테스트 모드 (실제 동작) |

---

## 기법 2: SCAMPER — Enometa 차별화

| 렌즈 | 결정 |
|------|------|
| **S** Substitute | Cafe24→Next.js+Supabase, jQuery→Framer Motion, 성별분류→아이템타입 카테고리 |
| **C** Combine | ①인트로 시퀀스 ②페이지 트랜지션 ③호버 모션 강화 |
| **A** Adapt | 관리자 대시보드를 Notion 스타일 미니멀로 |
| **M** Modify | ①그리드 전환 토글(2/3/4열) ②호버 미리보기(사이즈/컬러칩) |
| **E** Eliminate | 공지배너, 다국어, 멤버십등급, 재입고알림, 네이버마일리지, 시즌별컬렉션 |
| **R** Reverse | 사이드 드로어 장바구니 (어디서든 바로 확인) |

**추가**: 채널톡 대신 자체 문의 시스템 (플로팅 버튼→폼→Supabase→관리자 조회)

**Enometa 포지셔닝**: le17septembre의 프리미엄 감성 + 인터랙티브 반응형 경험 + 풀스택 자체 시스템

---

## 기법 3: First Principles — 미션 본질

미션 = 3가지 증명:

| 증명할 것 | 어떻게 | 핵심 무기 |
|---|---|---|
| 쇼핑몰 구조 이해 | 상품→장바구니→결제 풀플로우 동작 | Supabase + 토스페이먼츠 |
| 학습 과정/체계 | BMAD 방법론 + 체계적 문서화 | 과정 보고서 |
| 퀄리티/실력 | 감도 높은 디자인 + 인터랙션 | 인트로 + 상세페이지 95% |

**재사용 파이프라인**: 미션이 아닌 개인 목표. 주말엔 "좋은 쇼핑몰" 100% 집중, 재사용성은 깔끔한 코드에서 자연스럽게 따라옴.

---

## 최종 Enometa 쇼핑몰 스펙 요약

### 브랜드
- 이름: Enometa
- 톤: 프리미엄 컨템포러리 (le17septembre 참조)
- 카테고리: Top, Outer, Bottom, Shoes, ACC, Lookbook

### 페이지 구성 + 퀄리티 목표
| 페이지 | 퀄리티 | 핵심 기능 |
|--------|--------|-----------|
| 인트로 | 95% | 타이핑 애니메이션 + 5컷 카드 시퀀스 + 입장 버튼 |
| 상품 상세 | 95% | 이미지 갤러리 + 옵션 선택 + Sticky Bar + 호버 이미지 스왑 |
| 상품 리스트 | 90% | 카테고리 필터 + 그리드 전환(2/3/4열) + 호버 미리보기 |
| 장바구니/결제 | 85% | 사이드 드로어 장바구니 + 토스페이먼츠 테스트 결제 |
| 관리자 | 80% | Notion 스타일 CRUD + 통계 + 문의 조회 |

### 차별화 요소 (vs 일반 쇼핑몰 포트폴리오)
1. 인트로 시퀀스 (브랜드 세계관 진입)
2. 페이지 트랜지션 (Framer Motion AnimatePresence)
3. 호버 모션 강화 (scale/tilt)
4. 사이드 드로어 장바구니
5. 자체 문의 시스템 (풀스택 증명)
6. 관리자 Notion 스타일
7. 그리드 전환 토글 + 호버 미리보기

### 기술 스택
- Frontend: Next.js 14+ (App Router) + TailwindCSS
- Animation: Framer Motion
- Backend: Supabase (PostgreSQL + Auth + RLS)
- Payment: 토스페이먼츠 테스트 모드
- Image: Midjourney + Gemini 3 Pro
- Prototyping: Google Stitch
- Deploy: Vercel

### 제거된 항목 (시간 절약)
공지배너, 다국어, 멤버십등급, 재입고알림, 네이버마일리지, 시즌별컬렉션, 채널톡(→자체 문의로 대체)
