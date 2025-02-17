// src/components/DashboardLayout.tsx
'use client';

import { useState } from 'react';
import Sidebar from '@/components/Siderbar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen flex">
      <Sidebar isOpen={isSidebarOpen} onToggle={setSidebarOpen} />
      <main className={`flex-1 transition-all ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        {children}
      </main>
    </div>
  );
}