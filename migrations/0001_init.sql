CREATE TABLE documents(slug TEXT PRIMARY KEY,title TEXT NOT NULL,published_markdown TEXT NOT NULL,draft_markdown TEXT,draft_note TEXT,updated_by TEXT,updated_at TEXT DEFAULT CURRENT_TIMESTAMP,published_at TEXT DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE document_revisions(id INTEGER PRIMARY KEY AUTOINCREMENT,document_slug TEXT NOT NULL,markdown TEXT NOT NULL,note TEXT,editor TEXT NOT NULL,created_at TEXT DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE admin_sessions(token_hash TEXT PRIMARY KEY,github_login TEXT NOT NULL,csrf_token TEXT NOT NULL,expires_at TEXT NOT NULL);
CREATE TABLE oauth_states(state_hash TEXT PRIMARY KEY,expires_at TEXT NOT NULL);
CREATE TABLE audit_events(id INTEGER PRIMARY KEY AUTOINCREMENT,github_login TEXT NOT NULL,action TEXT NOT NULL,document_slug TEXT,metadata TEXT,created_at TEXT DEFAULT CURRENT_TIMESTAMP);
CREATE TRIGGER audit_no_update BEFORE UPDATE ON audit_events BEGIN SELECT RAISE(ABORT,'immutable'); END;
CREATE TRIGGER audit_no_delete BEFORE DELETE ON audit_events BEGIN SELECT RAISE(ABORT,'immutable'); END;