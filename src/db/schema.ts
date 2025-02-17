import { pgTable, uuid, text, timestamp, boolean, pgEnum } from 'drizzle-orm/pg-core';

export const priorityEnum = pgEnum('priority', ['low', 'medium', 'high']);
export const categoryEnum = pgEnum('category', ['work', 'personal', 'shopping', 'health']);

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  email: text('email').unique().notNull(),
  hashedPassword: text('hashed_password').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const tasks = pgTable('tasks', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  description: text('description'),
  priority: priorityEnum('priority').default('medium'),
  category: categoryEnum('category').default('work'),
  completed: boolean('completed').default(false),
  dueDate: timestamp('due_date'),
  userId: uuid('user_id').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow(),
});

export const projects = pgTable('projects', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  userId: uuid('user_id').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow(),
});

// Add to existing relations
export const relations = {
  users: {
    projects: {
      references: [projects],
      relationField: projects.userId,
    },
  },
  projects: {
    user: {
      references: [users],
      relationField: projects.userId,
    },
  },
};