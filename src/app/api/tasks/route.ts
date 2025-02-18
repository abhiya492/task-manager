import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { tasks } from '@/db/schema';
import { eq, and, or, like, SQL } from 'drizzle-orm';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { z } from 'zod';

// Extend the default session type to include id
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    }
  }
}

// Define task schema for validation
const taskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  priority: z.enum(['low', 'medium', 'high']).optional().default('medium'),
  category: z.enum(['work', 'personal', 'shopping', 'health']).optional(),
  dueDate: z.string().optional(),
});

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const priority = searchParams.get('priority');
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const completed = searchParams.get('completed');

    const queryConditions: SQL<unknown>[] = [eq(tasks.userId, session.user.id)];

    if (priority && priority !== 'all') {
      queryConditions.push(eq(tasks.priority, priority));
    }

    if (category && category !== 'all') {
      queryConditions.push(eq(tasks.category, category));
    }

    if (completed) {
      queryConditions.push(eq(tasks.completed, completed === 'true'));
    }

    if (search) {
      queryConditions.push(
        or(
          like(tasks.title, `%${search}%`),
          like(tasks.description || '', `%${search}%`)
        )
      );
    }

    const allTasks = await db
      .select()
      .from(tasks)
      .where(and(...queryConditions));

    return NextResponse.json(allTasks);
  } catch (error) {
    console.error('Failed to fetch tasks:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tasks. Please try again later.' }, 
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 });
    }

    // Parse and validate the request body
    const body = await req.json();
    
    try {
      const validatedData = taskSchema.parse(body);
      
      const newTask = await db
        .insert(tasks)
        .values({
          ...validatedData,
          userId: session.user.id,
          id: crypto.randomUUID(),
          completed: false,
          createdAt: new Date().toISOString(),
        })
        .returning();

      return NextResponse.json(newTask[0], { status: 201 });
    } catch (validationError) {
      if (validationError instanceof z.ZodError) {
        return NextResponse.json(
          { error: 'Validation error', details: validationError.errors },
          { status: 400 }
        );
      }
      throw validationError;
    }
  } catch (error) {
    console.error('Failed to create task:', error);
    return NextResponse.json(
      { error: 'Failed to create task. Please try again later.' },
      { status: 500 }
    );
  }
}

// Add PATCH and DELETE methods for updating and deleting tasks
export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const taskId = searchParams.get('id');
    
    if (!taskId) {
      return NextResponse.json({ error: 'Task ID is required' }, { status: 400 });
    }

    const body = await req.json();
    
    // First check if the task belongs to the user
    const existingTask = await db
      .select()
      .from(tasks)
      .where(and(
        eq(tasks.id, taskId),
        eq(tasks.userId, session.user.id)
      ))
      .limit(1);
    
    if (existingTask.length === 0) {
      return NextResponse.json({ error: 'Task not found or access denied' }, { status: 404 });
    }

    // Update the task
    const updatedTask = await db
      .update(tasks)
      .set(body)
      .where(eq(tasks.id, taskId))
      .returning();

    return NextResponse.json(updatedTask[0]);
  } catch (error) {
    console.error('Failed to update task:', error);
    return NextResponse.json(
      { error: 'Failed to update task. Please try again later.' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const taskId = searchParams.get('id');
    
    if (!taskId) {
      return NextResponse.json({ error: 'Task ID is required' }, { status: 400 });
    }

    // First check if the task belongs to the user
    const existingTask = await db
      .select()
      .from(tasks)
      .where(and(
        eq(tasks.id, taskId),
        eq(tasks.userId, session.user.id)
      ))
      .limit(1);
    
    if (existingTask.length === 0) {
      return NextResponse.json({ error: 'Task not found or access denied' }, { status: 404 });
    }

    // Delete the task
    await db
      .delete(tasks)
      .where(eq(tasks.id, taskId));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete task:', error);
    return NextResponse.json(
      { error: 'Failed to delete task. Please try again later.' },
      { status: 500 }
    );
  }
}
