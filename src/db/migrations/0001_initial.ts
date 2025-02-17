import { sql } from 'drizzle-orm';

export const up = sql`
  CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    hashed_password TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
  );

  CREATE TYPE priority AS ENUM ('low', 'medium', 'high');
  CREATE TYPE category AS ENUM ('work', 'personal', 'shopping', 'health');

  CREATE TABLE IF NOT EXISTS tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    priority priority DEFAULT 'medium',
    category category DEFAULT 'work',
    completed BOOLEAN DEFAULT false,
    due_date TIMESTAMP,
    user_id UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT NOW()
  );
`;

export const down = sql`
  DROP TABLE IF EXISTS tasks;
  DROP TYPE IF EXISTS priority;
  DROP TYPE IF EXISTS category;
  DROP TABLE IF EXISTS users;
`;