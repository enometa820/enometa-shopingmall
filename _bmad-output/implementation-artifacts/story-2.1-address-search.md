---
epic: 2
story: 2.1
title: AddressSearch 컴포넌트
status: complete
completedAt: '2026-04-06'
files:
  - src/components/checkout/AddressSearch.tsx
---

# Story 2.1: AddressSearch 컴포넌트

As a 구매자,
I want 체크아웃에서 우편번호 검색 버튼을 클릭하여 주소를 찾고,
So that 정확한 배송지를 빠르게 입력할 수 있다.

## Acceptance Criteria

- [x] Daum Postcode 팝업 표시
- [x] 주소 선택 시 우편번호 + 도로명 자동 입력
- [x] 상세 주소만 직접 입력
- [x] next/script lazyOnload 로딩

## Implementation Details

- daum.maps.services 글로벌 타입 선언 (window.daum)
- onComplete 콜백에서 zonecode(우편번호) + roadAddress(도로명) 추출
- 부모 폼에 onChange 콜백으로 값 전달

## Test Checklist

- [x] 팝업 열기 → 주소 검색 → 선택 시 우편번호/주소 자동 입력
- [x] 모바일에서 팝업 정상 표시
- [x] 스크립트 미로드 상태에서 버튼 클릭 시 에러 없음
