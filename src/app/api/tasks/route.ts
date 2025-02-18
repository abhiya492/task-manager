import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { tasks } from '@/db/schema';
import { eq, and, or, like, SQL } from 'drizzle-orm';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

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

// Define task schema interface
interface TaskSchema {
  title: string;
  description?: string;
  priority?: string;
  category?: string;
  userId: string;
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const priority = searchParams.get('priority');
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    const queryConditions: SQL<unknown>[] = [eq(tasks.userId, session.user.id)];

    if (priority) {
      queryConditions.push(eq(tasks.priority, priority));
    }

    if (category) {
      queryConditions.push(eq(tasks.category, category));
    }

    if (search) {
      queryConditions.push(
        or(
          like(tasks.title, `%${search}%`),
          like(tasks.description ?? '', `%${search}%`)
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
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const body = await req.json() as TaskSchema;
    const newTask = await db
      .insert(tasks)
      .values({
        ...body,
        userId: session.user.id,
      })
      .returning();

    return NextResponse.json(newTask[0]);
  } catch (error) {
    console.error('Failed to create task:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}