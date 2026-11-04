CREATE TABLE page_content (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  page_key TEXT NOT NULL,
  section_key TEXT NOT NULL,
  content_json TEXT NOT NULL DEFAULT '{}',
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE (page_key, section_key)
);

CREATE INDEX idx_page_content_lookup ON page_content (page_key, section_key);
