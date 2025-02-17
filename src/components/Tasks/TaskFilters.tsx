//src/components/Tasks/TaskFilters.tsx

'use client';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const TaskFilters = ({ 
  onSearch,
  onPriorityChange,
  onCategoryChange 
}: {
  onSearch: (value: string) => void;
  onPriorityChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
}) => {
  return (
    <div className="space-y-4 p-4 bg-background rounded-lg border">
      <Input 
        placeholder="Search tasks..." 
        onChange={(e) => onSearch(e.target.value)}
      />
      <Select onValueChange={onPriorityChange}>
        <SelectTrigger>
          <SelectValue placeholder="Filter by priority" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Priorities</SelectItem>
          <SelectItem value="high">High</SelectItem>
          <SelectItem value="medium">Medium</SelectItem>
          <SelectItem value="low">Low</SelectItem>
        </SelectContent>
      </Select>
      <Select onValueChange={onCategoryChange}>
        <SelectTrigger>
          <SelectValue placeholder="Filter by category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          <SelectItem value="work">Work</SelectItem>
          <SelectItem value="personal">Personal</SelectItem>
          <SelectItem value="shopping">Shopping</SelectItem>
          <SelectItem value="health">Health</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};