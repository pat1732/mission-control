'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  Brain, 
  ListTodo, 
  Bell, 
  Settings,
  Radio
} from 'lucide-react';
import clsx from 'clsx';

const navigation = [
  { name: 'Mission Control', href: '/', icon: LayoutDashboard },
  { name: 'Agents', href: '/agents', icon: Users },
  { name: 'Models', href: '/models', icon: Brain },
  { name: 'Tasks', href: '/tasks', icon: ListTodo },
  { name: 'Alerts', href: '/alerts', icon: Bell },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-mission-card border-r border-mission-border flex flex-col">
      {/* Logo */}
      <div className="p-4 border-b border-mission-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <Radio className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">Mission Control</h1>
            <p className="text-xs text-mission-muted">Agent Orchestration</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={clsx(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all',
                isActive
                  ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                  : 'text-mission-muted hover:bg-mission-border hover:text-white'
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* System Status */}
      <div className="p-4 border-t border-mission-border">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs text-mission-muted">System Online</span>
        </div>
      </div>
    </aside>
  );
}
