-- ========================================
-- Enometa — Seed Data (12 Products)
-- ========================================
-- 이미지 URL은 placeholder. AI 생성 이미지로 교체 예정.

INSERT INTO products (name, name_display, price, description, category, sizes, colors, images, hover_image, stock, is_featured) VALUES

-- TOP (3개)
('WRINKLE KNIT TOP', 'WRINKLE KNIT TOP [IVORY]', 159000,
 'Soft textured knit with delicate wrinkle detail. Relaxed fit with clean neckline.',
 'top', ARRAY['S','M','L'], '[{"name":"Ivory","hex":"#F5F0EB"},{"name":"Navy","hex":"#1B2A4A"}]',
 ARRAY['https://placehold.co/900x1350/f5f0eb/4a4a4a?text=KNIT+TOP+1','https://placehold.co/900x1350/f5f0eb/4a4a4a?text=KNIT+TOP+2','https://placehold.co/900x1350/f5f0eb/4a4a4a?text=KNIT+TOP+3'],
 'https://placehold.co/900x1350/e8e8e8/4a4a4a?text=FLAT', '{"S":5,"M":3,"L":2}', true),

('OVERSIZED COTTON TEE', 'OVERSIZED COTTON TEE [WHITE]', 89000,
 'Premium cotton oversized tee. Drop shoulder with minimal branding.',
 'top', ARRAY['S','M','L','XL'], '[{"name":"White","hex":"#FFFFFF"},{"name":"Black","hex":"#111111"}]',
 ARRAY['https://placehold.co/900x1350/ffffff/4a4a4a?text=TEE+1','https://placehold.co/900x1350/ffffff/4a4a4a?text=TEE+2'],
 'https://placehold.co/900x1350/e8e8e8/4a4a4a?text=FLAT', '{"S":8,"M":6,"L":4,"XL":3}', false),

('SILK BLEND BLOUSE', 'SILK BLEND BLOUSE [CREAM]', 219000,
 'Luxurious silk blend blouse with subtle sheen. Elegant drape and refined collar.',
 'top', ARRAY['S','M','L'], '[{"name":"Cream","hex":"#F5F0E8"},{"name":"Charcoal","hex":"#3D3D3D"}]',
 ARRAY['https://placehold.co/900x1350/f5f0e8/4a4a4a?text=BLOUSE+1','https://placehold.co/900x1350/f5f0e8/4a4a4a?text=BLOUSE+2'],
 'https://placehold.co/900x1350/e8e8e8/4a4a4a?text=FLAT', '{"S":3,"M":4,"L":2}', false),

-- OUTER (2개)
('TAILORED WOOL COAT', 'TAILORED WOOL COAT [BLACK]', 489000,
 'Impeccably tailored wool coat. Single-breasted with clean lines and structured silhouette.',
 'outer', ARRAY['S','M','L'], '[{"name":"Black","hex":"#111111"},{"name":"Camel","hex":"#C4A882"}]',
 ARRAY['https://placehold.co/900x1350/222222/ffffff?text=COAT+1','https://placehold.co/900x1350/222222/ffffff?text=COAT+2','https://placehold.co/900x1350/222222/ffffff?text=COAT+3'],
 'https://placehold.co/900x1350/e8e8e8/4a4a4a?text=FLAT', '{"S":2,"M":3,"L":1}', false),

('LIGHT TRENCH JACKET', 'LIGHT TRENCH JACKET [BEIGE]', 359000,
 'Modern interpretation of the classic trench. Lightweight with removable belt.',
 'outer', ARRAY['S','M','L','XL'], '[{"name":"Beige","hex":"#D4C5A9"},{"name":"Navy","hex":"#1B2A4A"}]',
 ARRAY['https://placehold.co/900x1350/d4c5a9/4a4a4a?text=TRENCH+1','https://placehold.co/900x1350/d4c5a9/4a4a4a?text=TRENCH+2'],
 'https://placehold.co/900x1350/e8e8e8/4a4a4a?text=FLAT', '{"S":4,"M":5,"L":3,"XL":2}', false),

-- BOTTOM (3개)
('SATIN EASY PANTS', 'SATIN EASY PANTS [BLACK]', 189000,
 'Fluid satin pants with elastic waistband. Effortless elegance with comfortable fit.',
 'bottom', ARRAY['S','M','L'], '[{"name":"Black","hex":"#111111"},{"name":"Olive","hex":"#4A5043"}]',
 ARRAY['https://placehold.co/900x1350/222222/ffffff?text=PANTS+1','https://placehold.co/900x1350/222222/ffffff?text=PANTS+2','https://placehold.co/900x1350/222222/ffffff?text=PANTS+3'],
 'https://placehold.co/900x1350/e8e8e8/4a4a4a?text=FLAT', '{"S":4,"M":6,"L":3}', true),

('CLASSIC MIDI SKIRT', 'CLASSIC MIDI SKIRT [NAVY]', 149000,
 'Timeless midi skirt with A-line silhouette. Concealed side zip closure.',
 'bottom', ARRAY['S','M','L'], '[{"name":"Navy","hex":"#1B2A4A"},{"name":"Black","hex":"#111111"}]',
 ARRAY['https://placehold.co/900x1350/1b2a4a/ffffff?text=SKIRT+1','https://placehold.co/900x1350/1b2a4a/ffffff?text=SKIRT+2'],
 'https://placehold.co/900x1350/e8e8e8/4a4a4a?text=FLAT', '{"S":3,"M":5,"L":2}', false),

('WIDE LEG TROUSERS', 'WIDE LEG TROUSERS [GREY]', 179000,
 'High-waisted wide leg trousers. Pressed crease detail for structured look.',
 'bottom', ARRAY['S','M','L','XL'], '[{"name":"Grey","hex":"#8C8C8C"},{"name":"Black","hex":"#111111"}]',
 ARRAY['https://placehold.co/900x1350/8c8c8c/ffffff?text=TROUSERS+1','https://placehold.co/900x1350/8c8c8c/ffffff?text=TROUSERS+2'],
 'https://placehold.co/900x1350/e8e8e8/4a4a4a?text=FLAT', '{"S":5,"M":4,"L":3,"XL":2}', false),

-- SHOES (2개)
('MINIMAL LEATHER LOAFER', 'MINIMAL LEATHER LOAFER [TAN]', 259000,
 'Handcrafted leather loafer with minimal design. Cushioned insole for all-day comfort.',
 'shoes', ARRAY['36','37','38','39','40'], '[{"name":"Tan","hex":"#C4956A"},{"name":"Black","hex":"#111111"}]',
 ARRAY['https://placehold.co/900x1350/c4956a/ffffff?text=LOAFER+1','https://placehold.co/900x1350/c4956a/ffffff?text=LOAFER+2'],
 'https://placehold.co/900x1350/e8e8e8/4a4a4a?text=FLAT', '{"36":2,"37":3,"38":4,"39":3,"40":2}', false),

('SUEDE ANKLE BOOTS', 'SUEDE ANKLE BOOTS [BLACK]', 329000,
 'Premium suede ankle boots with block heel. Side zip for easy wear.',
 'shoes', ARRAY['36','37','38','39','40'], '[{"name":"Black","hex":"#111111"},{"name":"Taupe","hex":"#8B7D6B"}]',
 ARRAY['https://placehold.co/900x1350/222222/ffffff?text=BOOTS+1','https://placehold.co/900x1350/222222/ffffff?text=BOOTS+2'],
 'https://placehold.co/900x1350/e8e8e8/4a4a4a?text=FLAT', '{"36":1,"37":2,"38":3,"39":2,"40":1}', false),

-- ACC (2개)
('LEATHER MINI BAG', 'LEATHER MINI BAG [BLACK]', 198000,
 'Compact leather crossbody bag. Adjustable strap with magnetic closure.',
 'acc', ARRAY['ONE SIZE'], '[{"name":"Black","hex":"#111111"},{"name":"Ivory","hex":"#F5F0EB"}]',
 ARRAY['https://placehold.co/900x1350/222222/ffffff?text=BAG+1','https://placehold.co/900x1350/222222/ffffff?text=BAG+2'],
 'https://placehold.co/900x1350/e8e8e8/4a4a4a?text=FLAT', '{"ONE SIZE":8}', false),

('CASHMERE BLEND SCARF', 'CASHMERE BLEND SCARF [OATMEAL]', 129000,
 'Soft cashmere blend scarf with raw edges. Generous size for multiple styling options.',
 'acc', ARRAY['ONE SIZE'], '[{"name":"Oatmeal","hex":"#D9CEBC"},{"name":"Charcoal","hex":"#3D3D3D"}]',
 ARRAY['https://placehold.co/900x1350/d9cebc/4a4a4a?text=SCARF+1','https://placehold.co/900x1350/d9cebc/4a4a4a?text=SCARF+2'],
 'https://placehold.co/900x1350/e8e8e8/4a4a4a?text=FLAT', '{"ONE SIZE":12}', false);
