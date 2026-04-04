-- ========================================
-- Enometa Shopping Mall — Initial Schema
-- ========================================

-- Products
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  name_display TEXT NOT NULL,
  price INTEGER NOT NULL,
  description TEXT,
  category TEXT NOT NULL CHECK (category IN ('top', 'outer', 'bottom', 'shoes', 'acc')),
  sizes TEXT[] NOT NULL DEFAULT '{}',
  colors JSONB NOT NULL DEFAULT '[]',
  images TEXT[] NOT NULL DEFAULT '{}',
  hover_image TEXT,
  stock JSONB NOT NULL DEFAULT '{}',
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Orders
CREATE TABLE orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_number TEXT UNIQUE NOT NULL,
  user_id UUID REFERENCES auth.users(id),
  status TEXT NOT NULL DEFAULT 'paid' CHECK (status IN ('paid', 'preparing', 'shipping', 'delivered')),
  total INTEGER NOT NULL,
  shipping_name TEXT NOT NULL,
  shipping_phone TEXT NOT NULL,
  shipping_address TEXT NOT NULL,
  shipping_detail TEXT,
  shipping_memo TEXT,
  payment_key TEXT UNIQUE,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Order Items
CREATE TABLE order_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  product_name TEXT NOT NULL,
  size TEXT NOT NULL,
  color TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  price INTEGER NOT NULL
);

-- Cart Items
CREATE TABLE cart_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  size TEXT NOT NULL,
  color TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, product_id, size, color)
);

-- Inquiries
CREATE TABLE inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'general' CHECK (category IN ('product', 'shipping', 'general')),
  content TEXT NOT NULL,
  reply TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'replied')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ========================================
-- Row Level Security
-- ========================================

-- Products: 누구나 읽기, admin만 쓰기
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "products_public_read" ON products FOR SELECT USING (true);
CREATE POLICY "products_admin_all" ON products FOR ALL USING (
  (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'
);

-- Orders: 본인 주문만 읽기, 본인 주문 생성, admin 전체
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "orders_own_read" ON orders FOR SELECT USING (
  auth.uid() = user_id OR (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'
);
CREATE POLICY "orders_own_insert" ON orders FOR INSERT WITH CHECK (
  auth.uid() = user_id
);
CREATE POLICY "orders_admin_update" ON orders FOR UPDATE USING (
  (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'
);

-- Order Items: orders와 동일 정책
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "order_items_read" ON order_items FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM orders WHERE orders.id = order_items.order_id
    AND (orders.user_id = auth.uid() OR (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin')
  )
);
CREATE POLICY "order_items_insert" ON order_items FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM orders WHERE orders.id = order_items.order_id
    AND orders.user_id = auth.uid()
  )
);

-- Cart Items: 본인만 CRUD
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "cart_own" ON cart_items FOR ALL USING (
  auth.uid() = user_id
);

-- Inquiries: 누구나 INSERT, admin만 읽기/수정
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "inquiries_public_insert" ON inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "inquiries_admin_read" ON inquiries FOR SELECT USING (
  (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'
);
CREATE POLICY "inquiries_admin_update" ON inquiries FOR UPDATE USING (
  (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'
);

-- ========================================
-- Storage Bucket
-- ========================================
-- 이 부분은 Supabase Dashboard에서 수동으로 생성:
-- Bucket: product-images (Public)
-- Policy: 누구나 읽기, admin만 업로드/삭제

-- ========================================
-- Updated_at 자동 갱신 트리거
-- ========================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
