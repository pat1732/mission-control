'use client';

import { useAppStore } from '@/store';
import { ListOrdered, Clock, TrendingUp } from 'lucide-react';

export function QueueWidget() {
  const { systemHealth, tasks } = useAppStore();

  const pendingTasks = tasks.filter(t => t.status === 'pending').length;
  const completedTasks = tasks.filter(t => t.status === 'completed').length;

  return (
    <div className="bg-mission-card border border-mission-border rounded-xl p-4">
      <div className="flex items-center gap-2 mb-4">
        <ListOrdered className="w-5 h-5 text-yellow-400" />
        <h3 className="font-semibold text-white">Queue & Throughput</h3>
      </div>

      <div className="space-y-3">
        {/* Queue Depth */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-mission-muted" />
            <span className="text-sm text-mission-muted">Queue Depth</span>
          </div>
          <span className="text-lg font-bold text-white">{systemHealth.queueDepth}</span>
        </div>

        {/* Average Latency */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-mission-muted" />
            <span className="text-sm text-mission-muted">Avg Latency</span>
          </div>
          <span className={`text-lg font-bold ${
            systemHealth.avgLatency > 2 ? 'text-yellow-400' : 'text-white'
          }`}>
            {systemHealth.avgLatency}s
          </span>
        </div>

        {/* Task Progress */}
        <div className="pt-2 border-t border-mission-border">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-mission-muted">Task Progress</span>
            <span className="text-white">{completedTasks} completed</span>
          </div>
          <div className="h-2 bg-mission-dark rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all"
              style={{ width: `${(completedTasks / (completedTasks + pendingTasks)) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
