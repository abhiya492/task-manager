//src/components/Dashboard/TaskCalendar.tsx

'use client';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isToday } from 'date-fns';
import { useQuery } from '@tanstack/react-query';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';

const TaskCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const { data: tasks } = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const res = await fetch('/api/tasks');
      return res.json();
    }
  });

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Calendar</CardTitle>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={() => setCurrentDate(prev => new Date(prev.setMonth(prev.getMonth() - 1)))}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => setCurrentDate(prev => new Date(prev.setMonth(prev.getMonth() + 1)))}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-px bg-muted">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="bg-background p-2 text-center text-sm font-medium">
              {day}
            </div>
          ))}
          {daysInMonth.map(day => {
            const dayTasks = tasks?.filter((t: Task) => 
              new Date(t.dueDate).toDateString() === day.toDateString()
            );
            
            return (
              <div key={day.toString()} className={`bg-background p-2 ${isToday(day) ? 'bg-blue-50' : ''}`}>
                <div className="text-sm font-medium">{format(day, 'd')}</div>
                <div className="mt-1 space-y-1">
                  {dayTasks?.map(task => (
                    <div key={task.id} className="text-xs p-1 rounded bg-blue-100">
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
  );
};