'use client';

import { useAppStore } from '@/store';
import { Activity, Clock, Zap, AlertTriangle, CheckCircle } from 'lucide-react';

export function TopBar() {
  const { systemHealth } = useAppStore();

  const getStatusColor = () => {
    switch (systemHealth.status) {
      case 'healthy': return 'text-green-400';
      case 'degraded': return 'text-yellow-400';
      case 'critical': return 'text-red-400';
    }
  };

  const getStatusIcon = () => {
    switch (systemHealth.status) {
      case 'healthy': return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'degraded': return <AlertTriangle className="w-4 h-4 text-yellow-400" />;
      case 'critical': return <AlertTriangle className="w-4 h-4 text-red-400" />;
    }
  };

  return (
    <header className="h-14 bg-mission-card border-b border-mission-border flex items-center justify-between px-6">
      {/* Status Bar */}
      <div className="flex items-center gap-6">
        {/* System Status */}
        <div className="flex items-center gap-2">
          {getStatusIcon()}
          <span className={`text-sm font-medium ${getStatusColor()}`}>
            {systemHealth.status.charAt(0).toUpperCase() + systemHealth.status.slice(1)}
          </span>
        </div>

        {/* Divider */}
        <div className="h-6 w-px bg-mission-border" />

        {/* Active Agents */}
        <div className="flex items-center gap-2 text-sm">
          <Activity className="w-4 h-4 text-mission-muted" />
          <span className="text-mission-muted">Active:</span>
          <span className="text-white font-medium">
            {systemHealth.activeAgents}/{systemHealth.totalAgents}
          </span>
        </div>

        {/* Running Tasks */}
        <div className="flex items-center gap-2 text-sm">
          <Zap className="w-4 h-4 text-mission-muted" />
          <span className="text-mission-muted">Running:</span>
          <span className="text-white font-medium">{systemHealth.runningTasks}</span>
        </div>

        {/* Queue */}
        <div className="flex items-center gap-2 text-sm">
          <Clock className="w-4 h-4 text-mission-muted" />
          <span className="text-mission-muted">Queue:</span>
          <span className="text-white font-medium">{systemHealth.queueDepth}</span>
        </div>

        {/* Latency */}
        <div className="flex items-center gap-2 text-sm">
          <span className="text-mission-muted">Latency:</span>
          <span className={`font-medium ${systemHealth.avgLatency > 2 ? 'text-yellow-400' : 'text-white'}`}>
            {systemHealth.avgLatency}s
          </span>
        </div>

        {/* Fallback */}
        {systemHealth.fallbackTriggered && (
          <div className="flex items-center gap-2 text-sm">
            <AlertTriangle className="w-4 h-4 text-orange-400" />
            <span className="text-orange-400 font-medium">Fallback Active</span>
          </div>
        )}
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        {/* Tokens */}
        <div className="text-sm">
          <span className="text-mission-muted">Tokens:</span>
          <span className="text-white font-mono ml-2">
            {systemHealth.tokensUsed.toLocaleString()}
          </span>
        </div>

        {/* Cost */}
        <div className="text-sm">
          <span className="text-mission-muted">Cost:</span>
          <span className="text-green-400 font-mono ml-2">
            ${systemHealth.costUsed.toFixed(2)}
          </span>
        </div>
      </div>
    </header>
  );
}
