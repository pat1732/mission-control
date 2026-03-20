'use client';

import { Agent, AgentStatus } from '@/types';
import { 
  Command, 
  Search, 
  Code, 
  Layout, 
  Shield, 
  CheckCircle, 
  Palette,
  Play,
  Pause,
  MoreHorizontal
} from 'lucide-react';
import clsx from 'clsx';

const iconMap: Record<string, React.ElementType> = {
  command: Command,
  search: Search,
  code: Code,
  layout: Layout,
  shield: Shield,
  'check-circle': CheckCircle,
  palette: Palette,
};

const statusConfig: Record<AgentStatus, { label: string; color: string; bg: string; animate: boolean }> = {
  working: { label: 'Working', color: 'text-green-400', bg: 'bg-green-500/20', animate: true },
  idle: { label: 'Idle', color: 'text-gray-400', bg: 'bg-gray-500/20', animate: false },
  ready: { label: 'Ready', color: 'text-blue-400', bg: 'bg-blue-500/20', animate: false },
  waiting: { label: 'Waiting', color: 'text-yellow-400', bg: 'bg-yellow-500/20', animate: true },
  blocked: { label: 'Blocked', color: 'text-red-400', bg: 'bg-red-500/20', animate: false },
  reviewing: { label: 'Reviewing', color: 'text-red-400', bg: 'bg-red-500/20', animate: true },
  testing: { label: 'Testing', color: 'text-cyan-400', bg: 'bg-cyan-500/20', animate: true },
  fallback: { label: 'Fallback', color: 'text-orange-400', bg: 'bg-orange-500/20', animate: true },
  error: { label: 'Error', color: 'text-red-500', bg: 'bg-red-600/20', animate: true },
  offline: { label: 'Offline', color: 'text-gray-500', bg: 'bg-gray-600/20', animate: false },
};

interface AgentCardProps {
  agent: Agent;
}

export function AgentCard({ agent }: AgentCardProps) {
  const status = statusConfig[agent.status];
  const Icon = iconMap[agent.icon] || Command;

  return (
    <div 
      className="bg-mission-card border border-mission-border rounded-xl p-4 hover:border-opacity-50 transition-all group"
      style={{ borderColor: agent.color + '40' }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div 
            className="w-12 h-12 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: agent.color + '20' }}
          >
            <Icon className="w-6 h-6" style={{ color: agent.color }} />
          </div>
          <div>
            <h3 className="font-semibold text-white">{agent.name}</h3>
            <p className="text-xs text-mission-muted">{agent.role}</p>
          </div>
        </div>
        
        {/* More Actions */}
        <button className="opacity-0 group-hover:opacity-100 transition-opacity">
          <MoreHorizontal className="w-4 h-4 text-mission-muted hover:text-white" />
        </button>
      </div>

      {/* Status Badge */}
      <div className="flex items-center gap-2 mb-3">
        <div className={clsx(
          'px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1.5',
          status.bg,
          status.color,
          status.animate && 'status-working'
        )}>
          <span className="w-1.5 h-1.5 rounded-full bg-current" />
          {status.label}
        </div>
        <span className="text-xs text-mission-muted font-mono">
          {agent.assignedModel}
        </span>
      </div>

      {/* Current Task */}
      {agent.currentTask && (
        <div className="mb-3 p-2 bg-mission-dark rounded-lg">
          <p className="text-xs text-mission-muted mb-1">Current Task</p>
          <p className="text-sm text-white truncate">{agent.currentTask}</p>
        </div>
      )}

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-2 mb-3 text-center">
        <div className="p-2 bg-mission-dark rounded-lg">
          <p className="text-xs text-mission-muted">Done</p>
          <p className="text-sm font-semibold text-green-400">
            {agent.metrics.tasksCompleted}
          </p>
        </div>
        <div className="p-2 bg-mission-dark rounded-lg">
          <p className="text-xs text-mission-muted">Failed</p>
          <p className="text-sm font-semibold text-red-400">
            {agent.metrics.tasksFailed}
          </p>
        </div>
        <div className="p-2 bg-mission-dark rounded-lg">
          <p className="text-xs text-mission-muted">Latency</p>
          <p className="text-sm font-semibold text-white">
            {agent.metrics.avgLatency}s
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-blue-500/20 text-blue-400 rounded-lg text-sm font-medium hover:bg-blue-500/30 transition-colors">
          <Play className="w-3.5 h-3.5" />
          View
        </button>
        <button className="px-3 py-2 bg-mission-border text-mission-muted rounded-lg hover:text-white transition-colors">
          <Pause className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
