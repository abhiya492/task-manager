'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { StatsCard } from '@/components/Dashboard/StatsCard';
import { useQuery } from '@tanstack/react-query';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [taskStats, setTaskStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    upcomingTasks: 0,
  });

  const { data: tasks } = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const res = await fetch('/api/tasks');
      return res.json();
    },
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  useEffect(() => {
    if (tasks) {
      const totalTasks = tasks.length;
      const completedTasks = tasks.filter((task: any) => task.completed).length;
      const upcomingTasks = tasks.filter((task: any) => !task.completed && new Date(task.dueDate) > new Date()).length;

      setTaskStats({
        totalTasks,
        completedTasks,
        upcomingTasks,
      });
    }
  }, [tasks]);

  if (status === 'loading') {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!session) {
    return null;
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold">Welcome to Your Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Hello, {session?.user?.name || session?.user?.email}!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <StatsCard
            title="Total Tasks"
            value={taskStats.totalTasks}
            description="All tasks you have created"
          />
          <StatsCard
            title="Completed Tasks"
            value={taskStats.completedTasks}
            description="Tasks you have completed"
          />
          <StatsCard
            title="Upcoming Tasks"
            value={taskStats.upcomingTasks}
            description="Tasks with upcoming deadlines"
          />
        </div>
      </div>
    </DashboardLayout>
  );
}
