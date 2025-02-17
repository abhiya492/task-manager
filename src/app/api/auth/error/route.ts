// src/app/api/auth/error/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const error = searchParams.get('error');
  
  return NextResponse.redirect(
    `${process.env.NEXTAUTH_URL}/login?error=${error || 'Authentication failed'}`
  );
}