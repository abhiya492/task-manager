'use client';
import { useTaskStore } from '@/lib/stores/taskStore';
import { Checkbox } from '@/components/ui/checkbox';

export const TaskList = () => {
  const { tasks, updateTask } = useTaskStore();

  return (
    <div className="space-y-4">
      {tasks.map(task => (
        <div key={task.id} className="flex items-center gap-4 p-4 bg-background rounded-lg border">
          <Checkbox
            checked={task.completed}
            onCheckedChange={(checked) => updateTask(task.id, { completed: !!checked })}
          />
          <div className="flex-1">
            <h3 className="font-medium">{task.title}</h3>
            {task.description && (
              <p className="text-sm text-muted-foreground">{task.description}</p>
            )}
          </div>
          <div className="text-sm text-muted-foreground">
            {task.dueDate && new Date(task.dueDate).toLocaleDateString()}
          </div>
        </div>
      ))}
    </div>
  );
};