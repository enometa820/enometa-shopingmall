# 소셜 로그인 + Storage 설정 가이드

## 1. 소셜 로그인 (Google)

### Supabase Dashboard 설정
1. **Authentication** → **Providers** → **Google** 활성화
2. Google Cloud Console에서 OAuth 2.0 클라이언트 생성:
   - Authorized redirect URI: `https://<project-ref>.supabase.co/auth/v1/callback`
3. Client ID와 Client Secret을 Supabase에 입력

### 코드 (이미 구현됨)
- `src/app/auth/login/page.tsx` — Google/카카오 로그인 버튼
- `src/app/auth/callback/route.ts` — OAuth 콜백 처리

## 2. 소셜 로그인 (카카오)

### Supabase Dashboard 설정
1. **Authentication** → **Providers** → **Kakao** 활성화
2. Kakao Developers에서 앱 생성:
   - 카카오 로그인 활성화
   - Redirect URI: `https://<project-ref>.supabase.co/auth/v1/callback`
3. REST API 키를 Supabase Client ID에 입력

## 3. Supabase Storage (이미지 업로드)

### 버킷 생성
1. Supabase Dashboard → **Storage** → **New bucket**
2. 이름: `product-images`
3. Public bucket: **Yes** (상품 이미지는 공개)

### RLS 정책
```sql
-- 누구나 읽기 가능 (공개 이미지)
CREATE POLICY "Public read access"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'product-images');

-- admin만 업로드 가능
CREATE POLICY "Admin upload"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'product-images' AND
    (SELECT raw_user_meta_data->>'role' FROM auth.users WHERE id = auth.uid()) = 'admin'
  );

-- admin만 삭제 가능
CREATE POLICY "Admin delete"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'product-images' AND
    (SELECT raw_user_meta_data->>'role' FROM auth.users WHERE id = auth.uid()) = 'admin'
  );
```

### 이미지 URL 형식
업로드 후 URL: `https://<project-ref>.supabase.co/storage/v1/object/public/product-images/<filename>`

이 URL을 상품 등록/수정 폼의 이미지 URL 필드에 입력하면 됩니다.

### 향후 드래그앤드롭 업로드 구현 시
관리자 상품 폼에 파일 드롭존을 추가하고, `supabase.storage.from('product-images').upload()` 호출 후 반환된 URL을 이미지 필드에 자동 입력하는 방식으로 구현합니다.
