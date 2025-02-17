'use client';
import { ProjectForm } from '@/components/Projects/ProjectForm';
import { ProjectList } from '@/components/Projects/ProjectList';

export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      <ProjectForm />
      <ProjectList />
    </div>
  );
}