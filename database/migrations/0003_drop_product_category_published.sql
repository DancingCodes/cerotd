DROP INDEX IF EXISTS idx_products_categories_published;

ALTER TABLE products_categories DROP COLUMN is_published;
