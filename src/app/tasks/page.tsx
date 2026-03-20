'use client';

import { useAppStore } from '@/store';
import { useState } from 'react';
import { 
  ListTodo, 
  Clock, 
  CheckCircle, 
  XCircle, 
  PlayCircle,
  ArrowRight,
  User
} from 'lucide-react';
import clsx from 'clsx';

export default function TasksPage() {
  const { tasks, agents } = useAppStore();
  const [filter, setFilter] = useState<string>('all');

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  const statusConfig = {
    pending: { icon: Clock, color: 'text-yellow-400', bg: 'bg-yellow-500/20', label: 'Pending' },
    running: { icon: PlayCircle, color: 'text-blue-400', bg: 'bg-blue-500/20', label: 'Running' },
    completed: { icon: CheckCircle, color: 'text-green-400', bg: 'bg-green-500/20', label: 'Completed' },
    failed: { icon: XCircle, color: 'text-red-400', bg: 'bg-red-500/20', label: 'Failed' },
  };

  const getAgentName = (id?: string) => {
    if (!id) return 'Unassigned';
    return agents.find(a => a.id === id)?.name || 'Unknown';
  };

  const stats = {
    total: tasks.length,
    pending: tasks.filter(t => t.status === 'pending').length,
    running: tasks.filter(t => t.status === 'running').length,
    completed: tasks.filter(t => t.status === 'completed').length,
    failed: tasks.filter(t => t.status === 'failed').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Tasks & Workflow</h1>
          <p className="text-mission-muted">Task queue and workflow visualization</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {Object.entries(stats).map(([key, value]) => (
          <button
            key={key}
            onClick={() => setFilter(key === 'total' ? 'all' : key)}
            className={clsx(
              'p-4 rounded-xl border transition-all text-center',
              filter === key || (key === 'total' && filter === 'all')
                ? 'bg-blue-500/20 border-blue-500/30'
                : 'bg-mission-card border-mission-border hover:border-mission-muted'
            )}
          >
            <p className="text-2xl font-bold text-white">{value}</p>
            <p className="text-sm text-mission-muted capitalize">{key}</p>
          </button>
        ))}
      </div>

      {/* Task Flow Visualization */}
      <div className="bg-mission-card border border-mission-border rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Workflow Visualization</h2>
        
        <div className="flex items-center justify-between overflow-x-auto pb-4">
          {/* Pending */}
          <div className="flex flex-col items-center min-w-[120px]">
            <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center mb-2">
              <Clock className="w-6 h-6 text-yellow-400" />
            </div>
            <p className="text-sm font-medium text-white">Pending</p>
            <p className="text-xs text-mission-muted">{stats.pending} tasks</p>
          </div>

          <ArrowRight className="w-5 h-5 text-mission-muted mx-2" />

          {/* Running */}
          <div className="flex flex-col items-center min-w-[120px]">
            <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-2 animate-pulse">
              <PlayCircle className="w-6 h-6 text-blue-400" />
            </div>
            <p className="text-sm font-medium text-white">Running</p>
            <p className="text-xs text-mission-muted">{stats.running} tasks</p>
          </div>

          <ArrowRight className="w-5 h-5 text-mission-muted mx-2" />

          {/* Completed */}
          <div className="flex flex-col items-center min-w-[120px]">
            <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mb-2">
              <CheckCircle className="w-6 h-6 text-green-400" />
            </div>
            <p className="text-sm font-medium text-white">Completed</p>
            <p className="text-xs text-mission-muted">{stats.completed} tasks</p>
          </div>

          <ArrowRight className="w-5 h-5 text-mission-muted mx-2" />

          {/* Failed */}
          <div className="flex flex-col items-center min-w-[120px]">
            <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center mb-2">
              <XCircle className="w-6 h-6 text-red-400" />
            </div>
            <p className="text-sm font-medium text-white">Failed</p>
            <p className="text-xs text-mission-muted">{stats.failed} tasks</p>
          </div>
        </div>
      </div>

      {/* Task List */}
      <div className="bg-mission-card border border-mission-border rounded-xl p-4">
        <h2 className="text-lg font-semibold text-white mb-4">Task Queue</h2>
        
        <div className="space-y-2">
          {filteredTasks.map((task) => {
            const config = statusConfig[task.status];
            const Icon = config.icon;
            
            return (
              <div 
                key={task.id}
                className="flex items-center gap-4 p-3 bg-mission-dark rounded-lg hover:bg-mission-border transition-colors"
              >
                <div className={clsx('p-2 rounded-lg', config.bg)}>
                  <Icon className={clsx('w-5 h-5', config.color)} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{task.name}</p>
                  <p className="text-xs text-mission-muted">
                    {task.createdAt.toLocaleTimeString()}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-mission-muted" />
                  <span className="text-sm text-mission-muted">
                    {getAgentName(task.assignedAgent)}
                  </span>
                </div>

                <span className={clsx(
                  'px-2 py-1 text-xs font-medium rounded-full',
                  config.bg,
                  config.color
                )}>
                  {config.label}
                </span>
              </div>
            );
          })}

          {filteredTasks.length === 0 && (
            <p className="text-center text-mission-muted py-8">No tasks found</p>
          )}
        </div>
      </div>
    </div>
  );
}
