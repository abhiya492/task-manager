'use client';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export const ProjectForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const { addProject } = useProjectStore();

  const onSubmit = (data: { name: string }) => {
    addProject({
      id: crypto.randomUUID(),
      name: data.name,
      userId: 'current-user-id' // Replace with actual user ID from session
    });
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        {...register('name', { required: true })}
        placeholder="Project name"
      />
      <Button type="submit">Create Project</Button>
    </form>
  );
};