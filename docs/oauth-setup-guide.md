# OAuth 소셜 로그인 설정 가이드

## 개요

이 가이드는 Google과 Kakao 소셜 로그인을 Supabase Auth에 연동하는 방법을 설명합니다.

---

## 1. Google OAuth 설정

### 1-1. Google Cloud Console에서 OAuth 클라이언트 생성

1. [Google Cloud Console](https://console.cloud.google.com/) 접속
2. 프로젝트 선택 (또는 새 프로젝트 생성)
3. 좌측 메뉴 → **API 및 서비스** → **사용자 인증 정보**
4. **+ 사용자 인증 정보 만들기** → **OAuth 클라이언트 ID** 선택
5. 애플리케이션 유형: **웹 애플리케이션**
6. 이름: `Enometa Shopping Mall` (자유)
7. **승인된 리디렉션 URI** 추가:
   ```
   https://[SUPABASE_PROJECT_REF].supabase.co/auth/v1/callback
   ```
   - `[SUPABASE_PROJECT_REF]`는 Supabase 대시보드 URL에서 확인
8. **만들기** 클릭 → **Client ID**와 **Client Secret** 복사

> OAuth 동의 화면이 설정되지 않은 경우, 먼저 동의 화면을 구성해야 합니다.
> - User Type: 외부
> - 앱 이름, 사용자 지원 이메일, 개발자 연락처 입력
> - 범위(scope): `email`, `profile` 추가

### 1-2. Supabase에 Google Provider 등록

1. [Supabase Dashboard](https://supabase.com/dashboard) → 프로젝트 선택
2. 좌측 메뉴 → **Authentication** → **Providers**
3. **Google** 클릭 → 토글 활성화
4. **Client ID**: Google에서 복사한 Client ID 입력
5. **Client Secret**: Google에서 복사한 Client Secret 입력
6. **Save** 클릭

---

## 2. Kakao OAuth 설정

### 2-1. Kakao Developers에서 앱 생성

1. [Kakao Developers](https://developers.kakao.com/) 접속 → 로그인
2. **내 애플리케이션** → **애플리케이션 추가하기**
3. 앱 이름: `Enometa Shopping Mall` (자유)
4. 앱 생성 후 → **앱 키** 탭에서 **REST API 키** 복사

### 2-2. Kakao 로그인 활성화

1. 좌측 메뉴 → **카카오 로그인** → 활성화 설정 **ON**
2. **Redirect URI** 추가:
   ```
   https://[SUPABASE_PROJECT_REF].supabase.co/auth/v1/callback
   ```
3. **동의항목** 탭 → **닉네임**, **이메일** 을 "필수 동의"로 설정

### 2-3. Kakao Client Secret 생성

1. **카카오 로그인** → **보안** 탭
2. **Client Secret** → **코드 생성** 클릭
3. 활성화 상태: **사용함** 으로 변경
4. 생성된 Secret 코드 복사

### 2-4. Supabase에 Kakao Provider 등록

1. [Supabase Dashboard](https://supabase.com/dashboard) → 프로젝트 선택
2. 좌측 메뉴 → **Authentication** → **Providers**
3. **Kakao** 클릭 → 토글 활성화
4. **Client ID**: Kakao REST API 키 입력
5. **Client Secret**: Kakao에서 생성한 Client Secret 입력
6. **Save** 클릭

---

## 3. 확인 사항

- Redirect URL 형식: `https://[SUPABASE_PROJECT_REF].supabase.co/auth/v1/callback`
- Supabase 프로젝트 URL은 **Settings → API**에서 확인 가능
- 테스트 시 Google은 "테스트 사용자"를 등록해야 동의 화면이 동작함 (게시 전)
- Kakao는 앱이 "검수 전"이어도 본인 계정으로 테스트 가능

---

## 4. 트러블슈팅

| 증상 | 원인 | 해결 |
|------|------|------|
| `redirect_uri_mismatch` | Redirect URI 불일치 | Google Console / Kakao 설정의 URI와 Supabase callback URL 정확히 일치시키기 |
| 로그인 후 빈 화면 | Provider 비활성화 | Supabase Dashboard에서 Provider 토글 확인 |
| `invalid_client` | Client ID/Secret 오류 | 복사 시 앞뒤 공백 제거 후 재입력 |
