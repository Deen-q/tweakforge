CREATE TABLE scripts (
    id SERIAL PRIMARY KEY,
    slug TEXT NOT NULL,
    name TEXT NOT NULL,
    content_hash TEXT NOT NULL,
    version INTEGER NOT NULL,
    changelog TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);