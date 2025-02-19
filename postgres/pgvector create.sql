CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE searchIndex (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    document TEXT,
    "userId" TEXT NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
    embedding vector(1536) NOT NULL  -- 1536 is the OpenAI embedding size, adjust as needed
);