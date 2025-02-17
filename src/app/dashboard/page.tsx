// src/app/dashboard/page.tsx
'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import DashboardLayout from '@/components/DashboardLayout';

export default function DashboardPage() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated') {
      redirect('/login');
    }
  }, [status]);

  if (status === 'loading') {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold">Welcome to Your Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Hello, {session?.user?.name || session?.user?.email}!
        </p>
      </div>
    </DashboardLayout>
  );
}