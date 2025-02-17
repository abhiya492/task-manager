// src/middleware.ts
import { withAuth } from 'next-auth/middleware';

export default withAuth({
  callbacks: {
    authorized: ({ token }) => !!token,
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
});

export const config = {
  matcher: ['/dashboard/:path*'],
};