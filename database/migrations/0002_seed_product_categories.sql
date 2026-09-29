-- Seed fixed product categories used by both frontend and backend.
INSERT INTO products_categories (slug, name_en, name_zh, sort_order, is_published)
VALUES
  ('gasoline-engine-oil', 'Gasoline Engine Oil', '汽油机油', 1, 1),
  ('diesel-engine-oil', 'Diesel Engine Oil', '柴油机油', 2, 1),
  ('gear-oil', 'Gear Oil', '齿轮油', 3, 1),
  ('motorcycle-oil', 'Motorcycle Oil', '摩托车油', 4, 1),
  ('anti-wear-hydraulic-oil', 'Anti-wear Hydraulic Oil', '抗磨液压油', 5, 1),
  ('new-energy-oil', 'New Energy Oil', '新能源专用油', 6, 1),
  ('antifreeze-coolant', 'Antifreeze / Coolant', '防冻液/冷却液', 7, 1),
  ('transmission-oil', 'Transmission Oil', '变速箱油', 8, 1),
  ('grease', 'Grease', '润滑脂', 9, 1)
ON CONFLICT(slug) DO UPDATE SET
  name_en = excluded.name_en,
  name_zh = excluded.name_zh,
  sort_order = excluded.sort_order,
  is_published = 1,
  updated_at = datetime('now');
