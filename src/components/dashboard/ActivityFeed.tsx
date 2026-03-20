'use client';

import { useAppStore } from '@/store';
import { Activity, User, Bot, Brain, Cpu } from 'lucide-react';
import clsx from 'clsx';

const typeIcons = {
  task: Activity,
  agent: User,
  model: Brain,
  system: Cpu,
};

const severityColors = {
  info: 'text-blue-400',
  warning: 'text-yellow-400',
  error: 'text-red-400',
  success: 'text-green-400',
};

export function ActivityFeed() {
  const { events } = useAppStore();

  return (
    <div className="bg-mission-card border border-mission-border rounded-xl p-4">
      <div className="flex items-center gap-2 mb-4">
        <Activity className="w-5 h-5 text-cyan-400" />
        <h3 className="font-semibold text-white">Live Activity Feed</h3>
      </div>

      <div className="space-y-1 max-h-64 overflow-y-auto">
        {events.map((event, index) => {
          const Icon = typeIcons[event.type];
          const color = severityColors[event.severity];
          
          return (
            <div 
              key={event.id}
              className={clsx(
                'flex items-start gap-3 p-2 rounded-lg hover:bg-mission-dark transition-colors',
                index === 0 && 'bg-mission-dark/50'
              )}
            >
              <div className={clsx('p-1.5 rounded-lg bg-mission-dark', color)}>
                <Icon className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white truncate">{event.message}</p>
                <p className="text-xs text-mission-muted">
                  {event.timestamp.toLocaleTimeString()}
                </p>
              </div>
              <span className={clsx(
                'px-2 py-0.5 text-xs font-medium rounded-full capitalize',
                event.severity === 'info' && 'bg-blue-500/20 text-blue-400',
                event.severity === 'warning' && 'bg-yellow-500/20 text-yellow-400',
                event.severity === 'error' && 'bg-red-500/20 text-red-400',
                event.severity === 'success' && 'bg-green-500/20 text-green-400'
              )}>
                {event.severity}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
