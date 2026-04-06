-- ========================================
-- V2 Migration: Orders 확장 + 신규 테이블
-- Epic 1, Story 1.1
-- 2026-04-06
-- ========================================

-- ----------------------------------------
-- 1. ALTER TABLE orders — 신규 컬럼 추가
-- ----------------------------------------

-- 우편번호
ALTER TABLE orders ADD COLUMN postal_code TEXT;

-- 결제 수단 (기본값 toss = v1 호환)
ALTER TABLE orders ADD COLUMN payment_method TEXT NOT NULL DEFAULT 'toss'
  CHECK (payment_method IN ('toss', 'bank_transfer'));

-- 무통장입금 정보 (은행명, 입금자명, 입금기한 등)
ALTER TABLE orders ADD COLUMN bank_transfer_info JSONB;

-- 운송장 번호
ALTER TABLE orders ADD COLUMN tracking_number TEXT;

-- 택배사
ALTER TABLE orders ADD COLUMN courier_company TEXT;

-- ----------------------------------------
-- 2. orders.status CHECK 제약 조건 확장
--    기존: ('paid','preparing','shipping','delivered')
--    신규: + pending_payment, cancelled, refund_requested
--    기본값은 'paid' 유지 (v1 호환)
-- ----------------------------------------

-- 기존 CHECK 제약 조건 삭제
-- PostgreSQL에서 CHECK 제약 조건 이름은 보통 "테이블명_컬럼명_check"
ALTER TABLE orders DROP CONSTRAINT IF EXISTS orders_status_check;

-- 새 CHECK 제약 조건 추가 (7개 상태)
ALTER TABLE orders ADD CONSTRAINT orders_status_check
  CHECK (status IN (
    'pending_payment',   -- 입금 대기 (무통장입금)
    'paid',              -- 결제 완료
    'preparing',         -- 상품 준비중
    'shipping',          -- 배송중
    'delivered',         -- 배송 완료
    'cancelled',         -- 주문 취소
    'refund_requested'   -- 환불 요청
  ));

-- ----------------------------------------
-- 3. order_status_history 테이블 생성
--    주문 상태 변경 이력 추적용
-- ----------------------------------------

CREATE TABLE order_status_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  from_status TEXT NOT NULL,
  to_status TEXT NOT NULL,
  changed_by TEXT NOT NULL,           -- user_id 또는 'admin'
  changed_at TIMESTAMPTZ DEFAULT now(),
  note TEXT                           -- 상태 변경 사유 (선택)
);

-- 조회 성능을 위한 인덱스
CREATE INDEX idx_order_status_history_order_id ON order_status_history(order_id);

-- ----------------------------------------
-- 4. site_settings 테이블 생성
--    사이트 전역 설정 (공지사항, 배너, 계좌 정보 등)
-- ----------------------------------------

CREATE TABLE site_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- updated_at 자동 갱신 트리거
CREATE TRIGGER site_settings_updated_at
  BEFORE UPDATE ON site_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ----------------------------------------
-- 5. RLS 정책
-- ----------------------------------------

-- == order_status_history ==
ALTER TABLE order_status_history ENABLE ROW LEVEL SECURITY;

-- 사용자: 본인 주문의 상태 이력만 조회 가능
CREATE POLICY "order_status_history_own_read" ON order_status_history
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_status_history.order_id
      AND (orders.user_id = auth.uid() OR (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin')
    )
  );

-- admin: INSERT 가능 (상태 변경 기록)
CREATE POLICY "order_status_history_admin_insert" ON order_status_history
  FOR INSERT WITH CHECK (
    (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'
  );

-- == site_settings ==
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- 누구나 읽기 (공개 설정)
CREATE POLICY "site_settings_public_read" ON site_settings
  FOR SELECT USING (true);

-- admin만 수정
CREATE POLICY "site_settings_admin_update" ON site_settings
  FOR UPDATE USING (
    (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'
  );

-- admin만 삽입
CREATE POLICY "site_settings_admin_insert" ON site_settings
  FOR INSERT WITH CHECK (
    (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'
  );

-- admin만 삭제
CREATE POLICY "site_settings_admin_delete" ON site_settings
  FOR DELETE USING (
    (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'
  );
