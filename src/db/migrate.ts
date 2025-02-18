

// src/db/migrate.ts
import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import * as schema from './schema';

// Replace with your PostgreSQL connection string
const connectionString = process.env.DATABASE_URL || 'postgres://user:password@localhost:5432/taskmaster';

async function runMigration() {
  const sql = postgres(connectionString, { max: 1 });
  const db = drizzle(sql, { schema });

  try {
    console.log('Starting migration...');
    // This will look for migration files in the "drizzle" folder
    await migrate(db, { migrationsFolder: 'drizzle' });
    console.log('Migration completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await sql.end();
  }
}

runMigration();