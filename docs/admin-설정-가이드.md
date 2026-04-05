# Admin 계정 설정 가이드

## 방법 1: Supabase Dashboard

1. [Supabase Dashboard](https://supabase.com/dashboard) 접속
2. 프로젝트 선택 → **Authentication** → **Users**
3. admin으로 설정할 사용자 클릭
4. **Edit user** → `user_metadata` 필드에 추가:

```json
{
  "role": "admin"
}
```

5. **Save** 클릭

## 방법 2: SQL Editor

Supabase Dashboard → **SQL Editor** 에서 실행:

```sql
UPDATE auth.users 
SET raw_user_meta_data = jsonb_set(
  COALESCE(raw_user_meta_data, '{}'::jsonb), 
  '{role}', '"admin"'
)
WHERE email = 'your@email.com';
```

## 확인

admin 계정으로 로그인 후 `/admin` 접속 시 대시보드가 표시되면 성공.

## 보안 구조

| 보호 계층 | 위치 | 역할 |
|-----------|------|------|
| Middleware | `src/middleware.ts` | `/admin/*` URL 접근 차단 |
| Layout | `src/app/admin/layout.tsx` | 서버 컴포넌트 렌더링 전 재확인 |
| Server Action | `src/actions/admin.ts` | 모든 데이터 조작 함수에 `requireAdmin()` 적용 |

3중 보호로 일반 사용자의 admin 기능 접근을 차단합니다.
