---
stepsCompleted: ['step-e-01-discovery', 'step-e-02-review', 'step-e-03-edit']
inputDocuments: ['product-brief.md', 'brainstorming-session-2026-04-04-2030.md', '레퍼런스/le917분석.md']
workflowType: 'prd'
lastEdited: '2026-04-06'
editHistory:
  - date: '2026-04-06'
    changes: 'v2 기능 추가 — 카카오 우편번호, 주문관리 강화, 계좌이체, Clerk 인증, 사업자 정보'
  - date: '2026-04-06'
    changes: 'Architecture 결정 반영 — Clerk 폐기→Supabase OAuth, 사업자 정보 제거'
---

> **⚠️ Architecture Override Notice (2026-04-06)**
> 
> 이 PRD는 원래 Clerk 인증 마이그레이션을 포함했으나, Architecture 워크플로우 (Party Mode 검증)에서 **Clerk 폐기 → Supabase Auth + OAuth 유지**로 결정됨.
> 
> **PRD와 Architecture 문서가 충돌 시 Architecture 문서(`architecture.md`)가 우선한다.**
> 
> 변경 사항:
> - FR-73~79 (Clerk 마이그레이션) → FR-73~74만 유효 (Supabase OAuth 추가)
> - FR-80~81 (사업자 정보) → 제거 (포트폴리오에 불필요)
> - SC-8 (Clerk 풀플로우) → SC-8 (소셜 로그인 풀플로우)
> - NFR-9, NFR-12 (Clerk 관련) → 삭제
> - 데이터 모델의 user_id는 UUID 유지 (TEXT 전환 취소)
> - DR-9 (Clerk 개인정보 동의) → 삭제

# Product Requirements Document — Enometa Shopping Mall

**Author:** sickkiya
**Date:** 2026-04-04
**Version:** 2.0
**Status:** Draft
**Last Edited:** 2026-04-06

---

## 1. Executive Summary

Enometa는 프리미엄 컨템포러리 패션 쇼핑몰이다. Next.js 16 + Supabase + Framer Motion + Clerk로 구축하며, 상품 탐색부터 결제·주문관리·배송추적까지 실제 동작하는 풀스택 이커머스 시스템을 구현한다.

**핵심 차별점**: le17septembre.com의 미니멀 럭셔리 감성에 인터랙티브 반응형 경험(인트로 시퀀스, 페이지 트랜지션, 호버 모션, 사이드 드로어 장바구니)을 결합. v2에서 Clerk 소셜 로그인, 주문 취소/배송 추적, 계좌이체 결제, 카카오 우편번호 검색을 추가하여 실무 수준 이커머스 기능을 완성한다.

**타겟 사용자**: 강의 미션 평가자 (1차), 외주 클라이언트 (2차)

**기간**: v1 주말 스프린트 완료 → v2 기능 확장 (4 스프린트, ~30시간)

---

## 2. Success Criteria

| ID | 기준 | 측정 방법 | 목표 |
|----|------|-----------|------|
| SC-1 | 풀 플로우 동작 | 상품 탐색→장바구니→결제→주문완료 수동 테스트 | 0 에러로 완료 |
| SC-2 | 페이지 완성도 | 인트로+상세 95%, 리스트 90%, 장바구니/결제 85%, 관리자 80% | 모든 페이지 목표 달성 |
| SC-3 | 상품 데이터 | 등록된 상품 수 | 12~15개 |
| SC-4 | 반응형 | Chrome DevTools 모바일(375px) + 데스크톱(1440px) 테스트 | 두 뷰포트 모두 정상 |
| SC-5 | 성능 | Lighthouse Performance 점수 | 80점 이상 |
| SC-6 | 배포 | Vercel 라이브 URL 접속 | 정상 접속 가능 |
| SC-7 | 문서화 | BMAD 산출물 + 최종 과정 보고서 | 전 단계 문서 완성 |
| SC-8 | Clerk 인증 풀플로우 | 회원가입→소셜로그인→마이페이지 수동 테스트 | 0 에러로 완료 |
| SC-9 | 주문 관리 풀플로우 | 주문→취소→배송추적 수동 테스트 | 0 에러로 완료 |
| SC-10 | 계좌이체 결제 | 계좌이체 선택→주문생성→관리자 결제확인 수동 테스트 | 0 에러로 완료 |
| SC-11 | 카카오 우편번호 | 체크아웃 우편번호 검색→주소 자동입력 테스트 | 정상 동작 |
| SC-12 | BMAD Phase 4 산출물 | implementation-artifacts/ 스토리 파일 생성 | 47개 스토리 파일 존재 |

---

## 3. Product Scope

### 3.1 MVP (주말 스프린트 — In Scope)

#### 사용자 페이지
- 인트로 페이지
- 상품 리스트 페이지
- 상품 상세 페이지
- 사이드 드로어 장바구니
- 결제 페이지 (토스페이먼츠)
- 주문 완료 페이지
- 회원가입 / 로그인
- 마이페이지 (주문 내역)
- 자체 문의 시스템

#### 관리자 페이지
- 대시보드 (기본 통계)
- 상품 관리 (CRUD)
- 주문 관리 (상태 변경)
- 문의 관리 (조회/답변)

#### 공통
- Fixed 헤더 + 풀스크린 사이드 메뉴
- 푸터
- 반응형 (1024px 분기)
- 페이지 트랜지션 애니메이션

### 3.2 v2 확장 (In Scope)

#### 카카오 우편번호 검색
- Daum Postcode API 연동
- 체크아웃 주소 입력 개선 (우편번호 + 도로명 자동완성)

#### 주문 관리 강화
- 주문 상태 확장 (pending_payment, cancelled, refund_requested 추가)
- 주문 취소 기능 (paid/preparing 상태에서만)
- 배송 추적 (관리자 송장번호 입력 → 사용자 택배사 조회 링크)
- 주문 상태 변경 이력 기록

#### 계좌이체 결제
- 결제 수단 선택 (토스페이먼츠 / 계좌이체)
- 계좌이체 주문: pending_payment 상태로 생성 + 계좌 안내
- 관리자 결제 확인 (수동)

#### Clerk 인증 마이그레이션
- Supabase Auth 완전 교체 → Clerk
- 소셜 로그인 (Google, Kakao)
- Clerk-Supabase JWT 연동 (DB는 Supabase 유지)

#### 사업자 정보 표시
- Footer + 정책 페이지에 전자상거래법 필수 정보 표시
- 통신판매업 신고번호, 개인정보관리책임자 등

### 3.3 Out of Scope
- 공지 배너 / 프로모션
- 다국어 (EN/KR)
- 멤버십 등급별 가격
- 재입고 알림
- 외부 포인트 연동
- 시즌별 컬렉션
- 리뷰/Q&A 게시판
- 입금 자동 확인 (가상계좌 API — 사업자 등록 + PG사 계약 필요)

---

## 4. User Journeys

### UJ-1: 첫 방문자의 쇼핑 여정

```
인트로 진입 → 타이핑 애니메이션 감상 → 이미지 카드 등장 
→ "입장" 클릭 → 메인/상품 리스트 → 카테고리 필터링 
→ 상품 호버(미리보기) → 상품 클릭 → 상세 페이지 
→ 사이즈/컬러 선택 → "장바구니 담기" → 사이드 드로어 확인 
→ 계속 쇼핑 또는 결제 진행
```

**관련 FR**: FR-1~4, FR-7~11, FR-14~16

### UJ-2: 회원의 구매 완료 여정

```
로그인 (Clerk — 이메일 또는 소셜) → 상품 탐색 → 장바구니 담기 
→ 사이드 드로어에서 "결제하기" → 카카오 우편번호 검색으로 배송지 입력 
→ 결제 수단 선택 (토스페이먼츠 / 계좌이체) → 결제 진행 
→ 주문 완료 페이지 → 마이페이지에서 주문 내역 확인
```

**관련 FR**: FR-5~6, FR-11~13, FR-17~18, FR-54~56, FR-66~72, FR-73~79

### UJ-3: 비회원 문의 여정

```
상품 탐색 중 → 플로팅 문의 버튼 클릭 → 문의 폼 슬라이드업 
→ 이름/이메일/내용 입력 → 제출 → 확인 메시지
```

**관련 FR**: FR-19~20

### UJ-4: 관리자 운영 여정

```
관리자 로그인 (Clerk, publicMetadata.role='admin') → 대시보드 (오늘 매출, 신규 주문)
→ 주문 관리 → 계좌이체 주문 결제 확인 → 주문 상태 변경 (결제완료→배송준비→배송중)
→ 배송중 전환 시 송장번호 + 택배사 입력 → 상품 관리 → 문의 관리
```

**관련 FR**: FR-43~49, FR-57~65, FR-66~72

### UJ-5: 회원의 주문 취소 여정

```
마이페이지 → 주문 내역 → 주문 상세 → "주문 취소" 클릭 
→ 취소 사유 확인 → 취소 처리 → 상태 "cancelled"로 변경 
→ 취소 완료 메시지
```

**조건**: 주문 상태가 'paid' 또는 'preparing'일 때만 취소 가능
**관련 FR**: FR-57~59

### UJ-6: 회원의 배송 조회 여정

```
마이페이지 → 주문 내역 → 주문 상세 → 송장번호 확인 
→ "배송 조회" 클릭 → 택배사 배송 추적 페이지 (외부 링크)
```

**관련 FR**: FR-60~62

### UJ-7: 계좌이체 구매 여정

```
체크아웃 → 결제 수단 "계좌이체" 선택 → 배송 정보 입력 
→ "주문하기" 클릭 → 주문 생성 (status: pending_payment) 
→ 계좌 안내 페이지 (입금 계좌 + 금액 + 주문번호) 
→ 사용자가 직접 이체 → 관리자가 입금 확인 → status: paid로 변경
```

**관련 FR**: FR-66~72

---

## 5. Domain Requirements (E-Commerce)

| ID | 요구사항 | 근거 |
|----|----------|------|
| DR-1 | 결제 정보는 PG사(토스페이먼츠)에서 처리, 서버에 카드 정보 저장 금지 | PCI-DSS 기본 준수 |
| DR-2 | 주문 데이터에 타임스탬프, 주문번호, 결제상태 기록 | 거래 추적성 |
| DR-3 | 개인정보처리방침, 이용약관 페이지 포함 | 전자상거래법 |
| DR-4 | 푸터에 사업자 정보 (상호, 대표자, 사업자번호, 주소, 이메일, 전화) 표시 | 전자상거래법 |
| DR-5 | 주문 취소/환불 정책 안내 페이지 | 소비자보호법 |
| DR-6 | 통신판매업 신고번호 표시 | 전자상거래법 제13조 |
| DR-7 | 개인정보관리책임자 정보 표시 | 개인정보보호법 |
| DR-8 | 주문 취소 시 취소 사유 + 일시 기록 | 소비자보호법 (거래 추적성) |
| DR-9 | Clerk 인증 시 개인정보 제3자 제공 동의 안내 (소셜 로그인) | 개인정보보호법 |

---

## 6. Functional Requirements

### 6.1 인트로 페이지

| ID | 요구사항 | 우선순위 | 퀄리티 목표 |
|----|----------|----------|-------------|
| FR-1 | "Enometa", "Shopping Mall", "Portfolio" 텍스트가 순차적으로 타이핑 애니메이션으로 표시된다 | P0 | 95% |
| FR-2 | 타이핑 완료 후 5장의 이미지 카드가 순차적으로 (stagger 0.15s) 등장한다 | P0 | 95% |
| FR-3 | 하단에 "Enter Shop" 버튼이 표시되며, 클릭 시 상품 리스트로 페이지 트랜지션된다 | P0 | 95% |
| FR-4 | 전체 시퀀스는 3초 이내에 완료된다 (사용자 이탈 방지) | P0 | 95% |

### 6.2 헤더 & 내비게이션

| ID | 요구사항 | 우선순위 |
|----|----------|----------|
| FR-5 | 헤더는 화면 상단 고정 (height: 60px), 3칼럼 그리드 (MENU / LOGO / LOG IN + CART) | P0 |
| FR-5a | 헤더 우측에 LOG IN (비로그인) / MY PAGE (로그인) 링크 표시 — 데스크탑만, 모바일은 사이드메뉴로 접근 | P0 |
| FR-6 | CART 아이콘에 장바구니 아이템 수 뱃지 표시 (실시간 업데이트) | P0 |
| FR-7 | MENU 클릭 시 풀스크린 사이드 메뉴가 좌측에서 슬라이드 (0.35s transition) | P0 |
| FR-8 | 사이드 메뉴에 6개 카테고리 (Top, Outer, Bottom, Shoes, ACC, Lookbook) + LOG IN + CART 링크 | P0 |
| FR-9 | 데스크톱(1025px+)에서 호버 시 드롭다운 메가메뉴 표시 | P1 |

### 6.3 상품 리스트 페이지

| ID | 요구사항 | 우선순위 | 퀄리티 목표 |
|----|----------|----------|-------------|
| FR-10 | 5개 카테고리(Top, Outer, Bottom, Shoes, ACC)로 필터링 가능. "All" 옵션 포함. 페이지 진입 시 "All" 선택 상태 | P0 | 90% |
| FR-11 | 그리드 전환 토글: 2열 / 3열 / 4열. 선택 상태 유지 (localStorage) | P0 | 90% |
| FR-12 | 상품 카드: 이미지 + 상품명(영문 대문자) + 가격(₩ 형식) | P0 | 90% |
| FR-13 | 데스크톱 호버 시 이미지 스왑: 에디토리얼→누끼 이미지 (opacity transition 0.4s cubic-bezier) | P0 | 90% |
| FR-14 | 데스크톱 호버 시 미리보기 표시: 사용 가능한 사이즈 + 컬러칩 | P1 | 90% |
| FR-15 | 카드 호버 시 미세한 scale(1.02) + 그림자 모션 | P1 | 90% |
| FR-16 | 필터 변경 시 새로고침 없이 즉시 반영 (클라이언트 사이드 필터링) | P0 | 90% |

### 6.4 상품 상세 페이지

| ID | 요구사항 | 우선순위 | 퀄리티 목표 |
|----|----------|----------|-------------|
| FR-17 | 상품 이미지 5~9장을 세로 스크롤로 나열 (에디토리얼 레이아웃) | P0 | 95% |
| FR-18 | 우측(데스크톱) 또는 하단(모바일)에 상품 정보 패널: 상품명, 가격, 설명 | P0 | 95% |
| FR-19 | 사이즈 선택 드롭다운. 품절 사이즈는 비활성화 표시 | P0 | 95% |
| FR-20 | 컬러 선택 시 해당 컬러 이미지로 교체 | P1 | 95% |
| FR-21 | Sticky 구매 바: 스크롤해도 "장바구니 담기" 버튼이 화면 하단에 고정 | P0 | 95% |
| FR-22 | "장바구니 담기" 클릭 시 사이드 드로어 자동 오픈 + 추가 확인 애니메이션 | P0 | 95% |
| FR-23 | 사이즈 미선택 시 "장바구니 담기" 비활성화 + 안내 메시지 | P0 | 95% |

### 6.5 장바구니 (사이드 드로어)

| ID | 요구사항 | 우선순위 | 퀄리티 목표 |
|----|----------|----------|-------------|
| FR-24 | 우측에서 슬라이드로 오픈되는 사이드 드로어 (width: 400px 데스크톱 / 100% 모바일) | P0 | 85% |
| FR-25 | 장바구니 아이템: 썸네일 + 상품명 + 옵션(사이즈/컬러) + 가격 + 수량 변경(+/-) + 삭제 | P0 | 85% |
| FR-26 | 수량 변경/삭제 시 합계 금액 즉시 반영 | P0 | 85% |
| FR-27 | 하단에 총 결제 금액 + "결제하기" 버튼 | P0 | 85% |
| FR-28 | 장바구니 비어있을 때 "장바구니가 비어있습니다" + 쇼핑 계속하기 링크 | P0 | 85% |
| FR-29 | 장바구니 데이터는 Supabase에 저장 (로그인 시) / Zustand+localStorage (비로그인 시) | P0 | 85% |
| FR-29a | 비로그인→로그인 전환 시 로컬 장바구니를 Supabase에 병합. 동일 상품+옵션은 수량 합산. 병합 후 로컬 데이터 삭제 | P0 | 85% |

### 6.6 결제

| ID | 요구사항 | 우선순위 | 퀄리티 목표 |
|----|----------|----------|-------------|
| FR-30 | 결제 페이지: 배송 정보 입력 폼 (이름, 전화번호, 카카오 우편번호 검색, 상세 주소, 배송 메모) | P0 | 85% |
| FR-31 | 주문 상품 요약 (상품명, 옵션, 수량, 가격) 표시 | P0 | 85% |
| FR-32 | 토스페이먼츠 결제 위젯 연동 (테스트 모드) | P0 | 85% |
| FR-33 | 결제 성공 시 Supabase에 주문 레코드 생성 + 주문 완료 페이지로 이동 | P0 | 85% |
| FR-34 | 결제 실패 시 에러 메시지 표시 + 재시도 가능 | P0 | 85% |
| FR-35 | 주문 완료 페이지: 주문번호, 결제금액, 배송지 확인 | P0 | 85% |

### 6.7 회원 시스템

| ID | 요구사항 | 우선순위 |
|----|----------|----------|
| FR-36 | 이메일 + 비밀번호 회원가입 (Clerk `<SignUp />`) | P0 |
| FR-37 | 이메일 + 비밀번호 로그인 / 로그아웃 (Clerk `<SignIn />` + `signOut()`) | P0 |
| FR-38 | 마이페이지: 주문 내역 리스트 (주문일, 상품, 금액, 상태) | P0 |
| FR-39 | 주문 상세 조회 (상품 상세 + 배송 상태) | P1 |

### 6.8 문의 시스템

| ID | 요구사항 | 우선순위 |
|----|----------|----------|
| FR-40 | 우측 하단 플로팅 문의 버튼 (position: fixed) | P0 |
| FR-41 | 클릭 시 문의 폼 슬라이드업: 이름, 이메일, 카테고리(상품/배송/기타), 내용 | P0 |
| FR-42 | 제출 시 Supabase inquiries 테이블에 저장 + 확인 메시지 | P0 |

### 6.9a Lookbook 갤러리

| ID | 요구사항 | 우선순위 |
|----|----------|----------|
| FR-42a | /lookbook 페이지: 룩북 이미지를 그리드 갤러리로 표시. 상품 필터링과 독립 | P2 |
| FR-42b | 이미지 클릭 시 라이트박스(확대) 표시 | P2 |

### 6.9 관리자

| ID | 요구사항 | 우선순위 | 퀄리티 목표 |
|----|----------|----------|-------------|
| FR-43 | 관리자 로그인 (Clerk publicMetadata.role='admin' + clerkMiddleware 라우트 보호) | P0 | 80% |
| FR-44 | 대시보드: 오늘 매출, 총 주문 수, 신규 회원 수, 최근 주문 5건 | P0 | 80% |
| FR-45 | 상품 관리: 상품 목록 조회 + 등록 + 수정 + 삭제 (실제 CRUD 동작) | P0 | 80% |
| FR-46 | 상품 등록 시: 상품명, 가격, 설명, 카테고리, 사이즈 옵션, 컬러 옵션, 이미지 업로드 | P0 | 80% |
| FR-46a | 이미지 업로드: Supabase Storage에 실제 파일 업로드 + 공개 URL 반환. 드래그&드롭 또는 파일 선택 지원. 다중 이미지(최대 10장) 업로드 가능 | P0 | 80% |
| FR-46b | 업로드된 이미지 미리보기 + 순서 변경(드래그) + 개별 삭제 가능 | P1 | 80% |
| FR-47 | 주문 관리: 주문 목록 + 상태 변경 (입금대기→결제완료→배송준비→배송중→배송완료/취소). 상태 변경 즉시 DB 반영 + 이력 기록 | P0 | 80% |
| FR-48 | 문의 관리: 문의 목록 + 상세 조회 + 답변 작성. 답변 시 상태 "대기중→답변완료" 변경 | P1 | 80% |
| FR-48a | 관리자 페이지 전체가 실제 동작해야 함: 상품 등록 시 즉시 사용자 페이지에 반영, 주문 상태 변경 시 마이페이지에 반영 | P0 | 80% |
| FR-49 | 관리자 UI는 Notion 스타일 미니멀 디자인 (흰 배경 + 깔끔한 테이블 + 여백) | P0 | 80% |

### 6.10 카카오 우편번호 검색 (v2)

| ID | 요구사항 | 우선순위 |
|----|----------|----------|
| FR-54 | Daum Postcode API 팝업으로 우편번호 + 도로명 주소 검색. 검색 결과 선택 시 우편번호, 주소 필드 자동 입력 | P0 |
| FR-55 | 체크아웃 배송지 입력에서 주소 필드 클릭 시 Postcode 팝업 오픈. 사용자는 상세 주소(동/호수)만 직접 입력 | P0 |
| FR-56 | 주문 데이터에 postal_code 저장. 주문 완료·마이페이지·관리자 주문 상세에서 우편번호 표시 | P0 |

### 6.11 주문 관리 강화 (v2)

| ID | 요구사항 | 우선순위 |
|----|----------|----------|
| FR-57 | 주문 상태 확장: pending_payment(입금대기), paid(결제완료), preparing(배송준비), shipping(배송중), delivered(배송완료), cancelled(취소), refund_requested(환불요청) | P0 |
| FR-58 | 사용자 주문 취소: 마이페이지 주문 상세에서 "주문 취소" 버튼. status가 paid 또는 preparing일 때만 활성화 | P0 |
| FR-59 | 주문 취소 실행 시 status를 cancelled로 변경. 취소 사유와 일시를 status_history에 기록 | P0 |
| FR-60 | 관리자가 shipping 상태 전환 시 tracking_number(송장번호)와 courier_company(택배사) 필수 입력 | P0 |
| FR-61 | 마이페이지 주문 상세에서 송장번호 표시. 택배사별 배송 추적 URL로 외부 링크 제공 (CJ대한통운, 한진, 로젠, 우체국) | P0 |
| FR-62 | order_status_history 테이블: 모든 상태 변경 시 from_status, to_status, changed_by, changed_at, note 자동 기록 | P0 |
| FR-63 | 마이페이지 주문 상세에서 상태 변경 이력 타임라인 UI 표시 | P1 |
| FR-64 | 관리자 주문 목록에서 상태별 필터링 (전체/입금대기/결제완료/배송중/배송완료/취소) | P1 |
| FR-65 | 관리자 대시보드에 입금대기 주문 수 카드 추가 (관리자 즉시 확인 필요한 항목) | P1 |

### 6.12 계좌이체 결제 (v2)

| ID | 요구사항 | 우선순위 |
|----|----------|----------|
| FR-66 | 체크아웃에서 결제 수단 선택: 토스페이먼츠(카드) / 계좌이체. 라디오 버튼으로 선택 | P0 |
| FR-67 | 토스페이먼츠 선택 시 기존 Toss Widget 표시. 계좌이체 선택 시 Toss Widget 숨기고 계좌 안내 표시 | P0 |
| FR-68 | 계좌이체 주문: "주문하기" 클릭 시 status=pending_payment, payment_method=bank_transfer로 주문 생성 | P0 |
| FR-69 | 주문 생성 후 계좌 안내 페이지 표시: 입금 계좌번호, 예금주, 은행명, 입금 금액, 주문번호. 입금 확인까지 대기 안내 | P0 |
| FR-70 | 관리자 주문 목록에서 payment_method 뱃지 표시 (카드/계좌이체 구분) | P0 |
| FR-71 | 관리자 주문 상세에서 pending_payment 상태 주문에 "결제 확인" 버튼. 클릭 시 status를 paid로 변경 | P0 |
| FR-72 | orders 테이블에 payment_method(toss/bank_transfer)와 bank_transfer_info(JSONB — 계좌번호, 은행명, 예금주) 저장 | P0 |

### 6.13 Clerk 인증 (v2)

| ID | 요구사항 | 우선순위 |
|----|----------|----------|
| FR-73 | Supabase Auth 완전 교체. Clerk `<SignIn />`, `<SignUp />` 컴포넌트로 로그인/회원가입 UI 교체 | P0 |
| FR-74 | 소셜 로그인: Google, Kakao 프로바이더 지원. Clerk 대시보드에서 설정 | P0 |
| FR-75 | Clerk-Supabase JWT 연동: Clerk JWT를 Supabase에 전달하여 RLS 정책 유지. createClerkSupabaseClient() 헬퍼 | P0 |
| FR-76 | clerkMiddleware()로 라우트 보호: /admin/* (admin role 필수), /mypage/*, /checkout/* (로그인 필수) | P0 |
| FR-77 | Header/SideMenu에서 useAuth() + useUser()로 인증 상태 표시. 로그인 시 이름/이메일, 비로그인 시 LOG IN 링크 | P0 |
| FR-78 | 로그인/로그아웃 시 장바구니 동기화 유지: Clerk 세션 이벤트에 onCartLogin/onCartLogout 연결 | P0 |
| FR-79 | 관리자 권한: Clerk publicMetadata.role='admin' 기반. requireAdmin() 헬퍼를 Clerk auth()로 전환 | P0 |

### 6.14 사업자 정보 (v2)

| ID | 요구사항 | 우선순위 |
|----|----------|----------|
| FR-80 | Footer에 전자상거래법 필수 정보 표시: 상호, 대표자명, 사업자등록번호, 통신판매업 신고번호, 주소, 전화번호, 이메일, 개인정보관리책임자 | P0 |
| FR-81 | 사업자 정보를 중앙 config 파일에서 관리. Footer와 정책 페이지에서 동일 데이터 참조 | P1 |

### 6.15 공통 인터랙션

| ID | 요구사항 | 우선순위 |
|----|----------|----------|
| FR-50 | 페이지 간 트랜지션 애니메이션 (Framer Motion AnimatePresence, fade + slide) | P0 |
| FR-51 | 모든 링크 호버 시 밑줄 opacity 전환 (0.3s ease) | P1 |
| FR-52 | 모든 영문 텍스트 대문자(uppercase) 처리 | P0 |
| FR-53 | Back-to-top 버튼: 스크롤 200px 이상 시 표시, 클릭 시 smooth scroll | P2 |

---

## 7. Non-Functional Requirements

| ID | 요구사항 | 측정 기준 |
|----|----------|-----------|
| NFR-1 | 페이지 초기 로드 3초 이내 | Lighthouse FCP < 3s |
| NFR-2 | 인터랙션 응답 100ms 이내 | 필터링, 장바구니 조작 시 체감 지연 없음 |
| NFR-3 | Lighthouse Performance 80점 이상 | 데스크톱 기준 |
| NFR-4 | 이미지 최적화: Next.js Image 컴포넌트 + WebP 포맷 | next/image 사용 확인 |
| NFR-5 | 반응형 브레이크포인트: 1024px (데스크톱/모바일 분기) | 두 뷰포트 레이아웃 정상 |
| NFR-6 | 코드 일관성: TypeScript strict mode, ESLint + Prettier | 빌드 에러 0 |
| NFR-7 | SEO 기본: 메타 태그, Open Graph, 시맨틱 HTML | Lighthouse SEO 80점+ |
| NFR-8 | 접근성 기본: 이미지 alt, 키보드 네비게이션, color contrast | Lighthouse Accessibility 70점+ |
| NFR-9 | Clerk 인증 응답 (로그인/회원가입 페이지 렌더링) 2초 이내 | Clerk 컴포넌트 로드 시간 측정 |
| NFR-10 | Daum Postcode API 스크립트 로딩 3초 이내 | 체크아웃 페이지 로드 후 팝업 오픈까지 체감 지연 없음 |
| NFR-11 | 주문 상태 변경 시 status_history 100% 기록 (누락 0건) | DB 쿼리로 orders 상태 변경 건수 vs history 건수 비교 |
| NFR-12 | Clerk-Supabase JWT 토큰 갱신 시 사용자 세션 끊김 없음 | 장시간 사용 후 서버 액션 호출 성공 확인 |

---

## 8. 디자인 시스템 (레퍼런스 기반)

le917분석.md에서 추출한 디자인 토큰. 구현 시 TailwindCSS 커스텀 테마로 적용.

### 컬러

| 용도 | 값 | Tailwind 변수 |
|------|-----|---------------|
| 배경 | `#FFFFFF` | bg-white |
| 본문 텍스트 | `#4A4A4A` | text-body |
| 서브 텍스트 | `#999999` | text-sub |
| 강조 다크 | `#111111` | text-dark |
| 베이지 배경 | `#F9F7EF` | bg-beige |
| 보더 | `#ECECEC` | border-light |

### 타이포그래피

| 요소 | 크기 | Weight | 비고 |
|------|------|--------|------|
| 본문 | 12~14px | 300~400 | Pretendard |
| 상품명 | 12px | 400 | uppercase |
| 가격 | 12px | 400 | ₩ 형식 |
| 헤더 링크 | 12.5px | 400 | letter-spacing: 1.25px |

### 간격

| 요소 | 값 |
|------|-----|
| 섹션 간 | 80~130px |
| 헤더 높이 | 60px |
| 좌우 패딩 (데스크톱) | 20~50px |
| 좌우 패딩 (모바일) | 40px |
| 상품 카드 gap | 25px |

---

## 9. 데이터 모델 (개요)

### Supabase 테이블 구조

```
products            — 상품 (id, name, price, description, category, images[], sizes[], colors[], stock, created_at)
product_images      — 상품 이미지 (Supabase Storage 연동, public bucket)
users               — Clerk 외부 관리 (Supabase Auth 미사용). user_id는 Clerk ID (TEXT, 'user_xxx' 형식)
orders              — 주문 (id, user_id[TEXT], order_number, total, status[7종], 
                       shipping_name, shipping_phone, shipping_address, shipping_detail, shipping_memo,
                       postal_code, payment_key, payment_method[toss|bank_transfer], 
                       bank_transfer_info[JSONB], tracking_number, courier_company, 
                       created_at, updated_at)
order_items         — 주문 상품 (id, order_id, product_id, product_name, size, color, quantity, price)
order_status_history — 상태 이력 (id, order_id, from_status, to_status, changed_by, changed_at, note)
cart_items          — 장바구니 (id, user_id[TEXT], product_id, size, color, quantity)
inquiries           — 문의 (id, name, email, category, content, reply, status, created_at)
coupons             — 쿠폰 (기존 v1)
```

**v2 변경점:**
- `orders.user_id`: UUID → TEXT (Clerk user ID 호환)
- `orders` 신규 컬럼: postal_code, payment_method, bank_transfer_info, tracking_number, courier_company
- `order_status_history`: 신규 테이블
- `orders.status` CHECK: 7종 (pending_payment, paid, preparing, shipping, delivered, cancelled, refund_requested)
- RLS 정책: Supabase auth.uid() → Clerk JWT sub claim 기반으로 전환

> 상세 마이그레이션 SQL은 Architecture 단계에서 확정.

---

## 10. 카테고리 & 상품 구성

| 카테고리 | 상품 수 | 상세페이지 수준 |
|----------|---------|----------------|
| Top | 3개 | 고퀄 1개 + 기본 2개 |
| Outer | 2개 | 기본 2개 |
| Bottom | 3개 | 고퀄 1개 + 기본 2개 |
| Shoes | 2개 | 기본 2개 |
| ACC | 2개 | 기본 2개 |
| **합계** | **12개** | **고퀄 2개 + 기본 10개** |

> Lookbook은 상품이 아닌 별도 갤러리 페이지 (/lookbook). 상품 카테고리는 5개(Top, Outer, Bottom, Shoes, ACC).

상품 네이밍: 영문 대문자 + [컬러] (예: "CLASSIC MIDI SKIRT [NAVY]")
가격대: ₩100,000 ~ ₩500,000

---

## 부록: FR → UJ 추적표

| FR | UJ-1 | UJ-2 | UJ-3 | UJ-4 | UJ-5 | UJ-6 | UJ-7 |
|----|------|------|------|------|------|------|------|
| FR-1~4 (인트로) | ✅ | | | | | | |
| FR-5~9 (헤더/네비) | ✅ | ✅ | ✅ | | | | |
| FR-10~16 (리스트) | ✅ | ✅ | | | | | |
| FR-17~23 (상세) | ✅ | ✅ | | | | | |
| FR-24~29 (장바구니) | ✅ | ✅ | | | | | |
| FR-30~35 (결제) | | ✅ | | | | | ✅ |
| FR-36~39 (회원) | | ✅ | | | | | |
| FR-40~42 (문의) | | | ✅ | | | | |
| FR-43~49 (관리자) | | | | ✅ | | | |
| FR-50~53 (공통) | ✅ | ✅ | ✅ | ✅ | | | |
| FR-54~56 (카카오 우편번호) | | ✅ | | | | | ✅ |
| FR-57~65 (주문관리 강화) | | | | ✅ | ✅ | ✅ | |
| FR-66~72 (계좌이체) | | ✅ | | ✅ | | | ✅ |
| FR-73~79 (Clerk 인증) | | ✅ | | ✅ | | | |
| FR-80~81 (사업자 정보) | ✅ | | | | | | |
