// src/app/api/auth/error/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const error = searchParams.get('error');
  const baseUrl = process.env.NEXTAUTH_URL;

  if (!baseUrl) {
    console.error('NEXTAUTH_URL is not configured');
    return NextResponse.json(
      { error: 'Missing environment configuration' },
      { status: 500 }
    );
  }

  const errorMessage = error === 'CredentialsSignin' 
    ? 'Invalid email or password'
    : error || 'Authentication failed';

  return NextResponse.redirect(
    `${baseUrl}/login?error=${encodeURIComponent(errorMessage)}`
  );
}