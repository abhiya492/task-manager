/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// src/components/CalendarView.tsx
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isToday, isSameMonth } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

const CalendarView = () => {
  const [currentDate, setCurrentDate] = React.useState(new Date());
  
  const { data: tasks, isLoading, isError } = useQuery({
    queryKey: ['tasks', currentDate.getMonth()],
    queryFn: async () => {
      const response = await fetch('/api/tasks');
      if (!response.ok) throw new Error('Failed to fetch tasks');
      return response.json();
    },
  });

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getTasksForDay = (date: Date) => {
    if (!tasks) return [];
    return tasks.filter((task: any) => {
      const taskDate = new Date(task.dueDate);
      return (
        taskDate.getDate() === date.getDate() &&
        taskDate.getMonth() === date.getMonth() &&
        taskDate.getFullYear() === date.getFullYear()
      );
    });
  };

  const previousMonth = () => {
    setCurrentDate(prev => new Date(prev.setMonth(prev.getMonth() - 1)));
  };

  const nextMonth = () => {
    setCurrentDate(prev => new Date(prev.setMonth(prev.getMonth() + 1)));
  };

  if (isLoading) return (
    <div className="p-6 max-w-6xl mx-auto">
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-[200px]" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 42 }).map((_, i) => (
              <Skeleton key={i} className="h-32" />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
  
  if (isError) return <div>Error loading tasks</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Task Calendar</CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={previousMonth}
                className="rounded-full"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <h2 className="text-lg font-semibold mx-4">
                {format(currentDate, 'MMMM yyyy')}
              </h2>
              <Button
                variant="outline"
                size="icon"
                onClick={nextMonth}
                className="rounded-full"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-px bg-gray-200 rounded-lg overflow-hidden">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
              <div 
                key={day} 
                className="p-3 text-center font-medium bg-white text-gray-600"
              >
                {day}
              </div>
            ))}
            {daysInMonth.map((day, index) => {
              const dayTasks = getTasksForDay(day);
              return (
                <div
                  key={day.toISOString()}
                  className={`flex flex-col p-2 bg-white min-h-[120px] ${
                    isToday(day) ? "bg-blue-50 border-blue-200" : ""
                  } ${
                    !isSameMonth(day, currentDate) ? "text-gray-400" : ""
                  }`}
                >
                  <div className={`font-medium mb-2 ${
                    isToday(day) ? "text-blue-600" : "text-gray-900"
                  }`}>
                    {format(day, "d")}
                  </div>
                  <div className="flex-1 space-y-1 overflow-y-auto">
                    {dayTasks.map((task: any) => (
                      <div
                        key={task.id}
                        className={`text-xs p-1 rounded ${
                          task.completed
                            ? "bg-green-100 text-green-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {task.title}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CalendarView;
