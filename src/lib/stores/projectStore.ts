// src/lib/stores/projectStore.ts
import { create } from 'zustand';

export interface Project {
  id: string;
  name: string;
  userId: string;
}

interface ProjectStore {
  projects: Project[];
  addProject: (project: Project) => void;
  deleteProject: (id: string) => void;
  fetchProjects: () => Promise<void>;
}

export const useProjectStore = create<ProjectStore>((set) => ({
  projects: [],
  
  addProject: (project) => set((state) => ({
    projects: [...state.projects, project]
  })),
  
  deleteProject: (id) => set((state) => ({
    projects: state.projects.filter(project => project.id !== id)
  })),
  
  fetchProjects: async () => {
    try {
      const response = await fetch('/api/projects');
      if (!response.ok) throw new Error('Failed to fetch projects');
      const projects = await response.json();
      set({ projects });
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  }
}));