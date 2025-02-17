// src/app/api/auth/signup/route.ts
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { users } from '@/db/schema';

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();
    
    const existingUser = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.email, email),
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const [newUser] = await db.insert(users).values({
      name,
      email,
      hashedPassword,
    }).returning();

    return NextResponse.json(newUser);

  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}