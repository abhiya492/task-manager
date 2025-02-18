'use client';

import TaskCalendar from '@/components/Dashboard/TaskCalendar';

export default function CalendarPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Calendar</h1>
      <TaskCalendar />
    </div>
  );
}
