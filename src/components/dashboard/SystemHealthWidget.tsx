'use client';

import { useAppStore } from '@/store';
import { Heart, Activity, Zap, Clock } from 'lucide-react';

export function SystemHealthWidget() {
  const { systemHealth } = useAppStore();

  const getStatusColor = () => {
    switch (systemHealth.status) {
      case 'healthy': return 'text-green-400';
      case 'degraded': return 'text-yellow-400';
      case 'critical': return 'text-red-400';
    }
  };

  const getStatusBg = () => {
    switch (systemHealth.status) {
      case 'healthy': return 'bg-green-500/20';
      case 'degraded': return 'bg-yellow-500/20';
      case 'critical': return 'bg-red-500/20';
    }
  };

  return (
    <div className="bg-mission-card border border-mission-border rounded-xl p-4">
      <div className="flex items-center gap-2 mb-4">
        <Heart className="w-5 h-5 text-red-400" />
        <h3 className="font-semibold text-white">System Health</h3>
      </div>

      <div className="flex items-center gap-3 mb-4">
        <div className={`w-3 h-3 rounded-full ${getStatusColor()} bg-current animate-pulse`} />
        <span className={`text-2xl font-bold ${getStatusColor()}`}>
          {systemHealth.status.charAt(0).toUpperCase() + systemHealth.status.slice(1)}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="flex items-center gap-2 p-2 bg-mission-dark rounded-lg">
          <Activity className="w-4 h-4 text-mission-muted" />
          <div>
            <p className="text-xs text-mission-muted">Active</p>
            <p className="text-sm font-semibold text-white">
              {systemHealth.activeAgents}/{systemHealth.totalAgents}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 p-2 bg-mission-dark rounded-lg">
          <Zap className="w-4 h-4 text-mission-muted" />
          <div>
            <p className="text-xs text-mission-muted">Running</p>
            <p className="text-sm font-semibold text-white">
              {systemHealth.runningTasks}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
