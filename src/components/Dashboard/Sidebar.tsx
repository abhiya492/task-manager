//src/components/Dashboard/Sidebar.tsx
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Calendar, List, Settings, Users } from 'lucide-react';

export const Sidebar = () => {
  const pathname = usePathname();

  const navItems = [
    { href: '/dashboard', icon: <Home className="w-5 h-5" />, label: 'Dashboard' },
    { href: '/dashboard/tasks', icon: <List className="w-5 h-5" />, label: 'Tasks' },
    { href: '/dashboard/calendar', icon: <Calendar className="w-5 h-5" />, label: 'Calendar' },
    { href: '/dashboard/team', icon: <Users className="w-5 h-5" />, label: 'Team' },
    { href: '/dashboard/settings', icon: <Settings className="w-5 h-5" />, label: 'Settings' },
  ];

  return (
    <aside className="fixed inset-y-0 left-0 w-64 bg-background border-r">
      <div className="flex flex-col h-full">
        <div className="p-4 border-b">
          <span className="text-xl font-bold">TaskMaster</span>
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navItems.map(item => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 p-2 rounded-lg ${
                    pathname === item.href
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-muted-foreground hover:bg-gray-50'
                  }`}
                >
                  {item.icon}
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};