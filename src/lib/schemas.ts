import { z } from 'zod';

export const taskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  priority: z.enum(['low', 'medium', 'high']),
  category: z.enum(['work', 'personal', 'shopping', 'health']),
  dueDate: z.string().optional().refine((date) => {
    if (date === null || date === undefined) return true;
    return !isNaN(Date.parse(date));
  }, {
    message: 'Invalid date format',
  }),
});

export const projectSchema = z.object({
  name: z.string().min(1, 'Project name is required'),
});
