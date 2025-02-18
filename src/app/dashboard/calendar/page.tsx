// src/app/dashboard/calendar/page.tsx
'use client';

import CalendarView from '@/components/CalendarView';

export default function CalendarPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Calendar</h1>
      <CalendarView />
    </div>
  );
}