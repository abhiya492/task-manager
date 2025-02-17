'use client';
import { useProjectStore } from '@/lib/stores/projectStore';

export const ProjectList = () => {
  const { projects, deleteProject } = useProjectStore();

  return (
    <div className="space-y-4">
      {projects.map(project => (
        <div key={project.id} className="p-4 bg-background rounded-lg border flex justify-between items-center">
          <h3 className="font-medium">{project.name}</h3>
          <div className="flex gap-2">
            <button className="text-blue-600 hover:text-blue-700">Edit</button>
            <button 
              onClick={() => deleteProject(project.id)}
              className="text-red-600 hover:text-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};