'use client';

import { TaskFilters } from "@/components/Tasks/TaskFilters";
import { TaskForm } from "@/components/Tasks/TaskForm";
import { TaskList } from "@/components/Tasks/TaskList";

//import { TaskFilters, TaskList, TaskForm } from '@/components/Tasks';

export default function TasksPage() {
  return (
    <div className="space-y-6">
      <TaskFilters
        onSearch={(value) => console.log('Search:', value)}
        onPriorityChange={(value) => console.log('Priority:', value)}
        onCategoryChange={(value) => console.log('Category:', value)}
      />
      <TaskForm />
      <TaskList />
    </div>
  );
}