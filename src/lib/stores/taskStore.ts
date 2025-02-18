// src/lib/stores/taskStore.ts
import { create } from 'zustand';

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority?: 'low' | 'medium' | 'high';
  category?: 'work' | 'personal' | 'shopping' | 'health';
  dueDate?: string;
  completed: boolean;
  userId: string;
}

interface TaskStore {
  tasks: Task[];
  fetchTasks: () => Promise<void>;
  addTask: (task: Task) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  
  fetchTasks: async () => {
    try {
      const response = await fetch('/api/tasks');
      if (!response.ok) throw new Error('Failed to fetch tasks');
      const tasks = await response.json();
      set({ tasks });
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  },
  
  addTask: (task) => set((state) => ({
    tasks: [...state.tasks, task]
  })),
  
  updateTask: (id, updates) => set((state) => ({
    tasks: state.tasks.map(task => 
      task.id === id ? { ...task, ...updates } : task
    )
  })),
  
  deleteTask: (id) => set((state) => ({
    tasks: state.tasks.filter(task => task.id !== id)
  }))
}));