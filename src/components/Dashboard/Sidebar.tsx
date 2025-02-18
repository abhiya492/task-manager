'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Calendar, List, Settings, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Sidebar = ({ isOpen, onToggle }) => {
  const pathname = usePathname();

  const navItems = [
    { href: '/dashboard', icon: <Home className="w-5 h-5" />, label: 'Dashboard' },
    { href: '/dashboard/tasks', icon: <List className="w-5 h-5" />, label: 'Tasks' },
    { href: '/dashboard/calendar', icon: <Calendar className="w-5 h-5" />, label: 'Calendar' },
    { href: '/dashboard/team', icon: <Users className="w-5 h-5" />, label: 'Team' },
    { href: '/dashboard/settings', icon: <Settings className="w-5 h-5" />, label: 'Settings' },
  ];

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-30 w-64 bg-white border-r transition-transform duration-200 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <span className="text-xl font-bold text-blue-600">TaskMaster</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onToggle(!isOpen)}
            className="md:hidden"
          >
            {isOpen ? (
              <ChevronLeft className="w-5 h-5" />
            ) : (
              <ChevronRight className="w-5 h-5" />
            )}
          </Button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${
                    pathname === item.href
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {item.icon}
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} TaskMaster. All rights reserved.
          </p>
        </div>
      </div>
    </aside>
  );
};
