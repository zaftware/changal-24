import Database from 'better-sqlite3';
const db = new Database('data.db');
db.exec(`
CREATE TABLE IF NOT EXISTS posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  source TEXT NOT NULL,
  title TEXT,
  url TEXT,
  body TEXT,
  published_at TEXT,
  score REAL DEFAULT 0,
  tldr_uz TEXT,
  hash TEXT UNIQUE,
  created_at TEXT DEFAULT (datetime('now'))
);
`);
export default db;
