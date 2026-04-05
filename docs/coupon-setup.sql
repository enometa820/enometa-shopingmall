-- 쿠폰 테이블 생성
-- Supabase SQL Editor에서 실행

CREATE TABLE IF NOT EXISTS coupons (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  code VARCHAR(50) UNIQUE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  discount_type VARCHAR(20) NOT NULL DEFAULT 'percentage', -- 'percentage' or 'fixed'
  discount_value INT NOT NULL, -- percentage: 10 = 10%, fixed: 5000 = 5000원
  min_order_amount INT DEFAULT 0,
  is_used BOOLEAN DEFAULT FALSE,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS 정책
ALTER TABLE coupons ENABLE ROW LEVEL SECURITY;

-- 사용자는 자신의 쿠폰만 조회 가능
CREATE POLICY "Users can view own coupons"
  ON coupons FOR SELECT
  USING (auth.uid() = user_id);

-- 서버(service role)만 쿠폰 생성/수정 가능
CREATE POLICY "Service role can manage coupons"
  ON coupons FOR ALL
  USING (true)
  WITH CHECK (true);
