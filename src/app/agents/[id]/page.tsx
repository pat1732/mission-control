'use client';

import { useAppStore } from '@/store';
import { useParams } from 'next/navigation';
import { 
  ArrowLeft, 
  Play, 
  Pause, 
  Settings, 
  Activity, 
  History, 
  FileText,
  Terminal,
  CheckCircle,
  XCircle,
  Clock,
  Zap,
  AlertTriangle,
  MoreHorizontal
} from 'lucide-react';
import Link from 'next/link';
import clsx from 'clsx';
import { useState } from 'react';

const tabs = [
  { id: 'overview', label: 'Overview', icon: Activity },
  { id: 'activity', label: 'Live Activity', icon: Zap },
  { id: 'history', label: 'History', icon: History },
  { id: 'config', label: 'Configuration', icon: Settings },
  { id: 'logs', label: 'Logs', icon: Terminal },
];

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  working: { label: 'Working', color: 'text-green-400', bg: 'bg-green-500/20' },
  idle: { label: 'Idle', color: 'text-gray-400', bg: 'bg-gray-500/20' },
  ready: { label: 'Ready', color: 'text-blue-400', bg: 'bg-blue-500/20' },
  waiting: { label: 'Waiting', color: 'text-yellow-400', bg: 'bg-yellow-500/20' },
  blocked: { label: 'Blocked', color: 'text-red-400', bg: 'bg-red-500/20' },
  reviewing: { label: 'Reviewing', color: 'text-red-400', bg: 'bg-red-500/20' },
  testing: { label: 'Testing', color: 'text-cyan-400', bg: 'bg-cyan-500/20' },
  fallback: { label: 'Fallback', color: 'text-orange-400', bg: 'bg-orange-500/20' },
  error: { label: 'Error', color: 'text-red-500', bg: 'bg-red-600/20' },
  offline: { label: 'Offline', color: 'text-gray-500', bg: 'bg-gray-600/20' },
};

export default function AgentDetailPage() {
  const params = useParams();
  const { agents } = useAppStore();
  const [activeTab, setActiveTab] = useState('overview');

  const agent = agents.find(a => a.id === params.id);

  if (!agent) {
    return (
      <div className="text-center py-12">
        <p className="text-mission-muted">Agent not found</p>
        <Link href="/agents" className="text-blue-400 hover:underline mt-2 inline-block">
          Back to Agents
        </Link>
      </div>
    );
  }

  const status = statusConfig[agent.status];

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link 
        href="/agents" 
        className="inline-flex items-center gap-2 text-mission-muted hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Agents
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div 
            className="w-16 h-16 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: agent.color + '20' }}
          >
            <span className="text-2xl font-bold" style={{ color: agent.color }}>
              {agent.name.charAt(0)}
            </span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">{agent.name}</h1>
            <p className="text-mission-muted">{agent.role}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className={clsx('px-2 py-1 rounded-full text-xs font-medium', status.bg, status.color)}>
                {status.label}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            <Play className="w-4 h-4" />
            Resume
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-mission-border text-white rounded-lg hover:bg-mission-muted">
            <Pause className="w-4 h-4" />
            Pause
          </button>
          <button className="p-2 bg-mission-border text-white rounded-lg hover:bg-mission-muted">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-mission-border">
        <nav className="flex gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={clsx(
                'flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-all',
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-mission-muted hover:text-white'
              )}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Current Task */}
          <div className="bg-mission-card border border-mission-border rounded-xl p-4">
            <h3 className="text-sm font-medium text-mission-muted mb-2">Current Task</h3>
            <p className="text-white">{agent.currentTask || 'No active task'}</p>
          </div>

          {/* Model */}
          <div className="bg-mission-card border border-mission-border rounded-xl p-4">
            <h3 className="text-sm font-medium text-mission-muted mb-2">Assigned Model</h3>
            <p className="text-white">{agent.assignedModel}</p>
          </div>

          {/* Uptime */}
          <div className="bg-mission-card border border-mission-border rounded-xl p-4">
            <h3 className="text-sm font-medium text-mission-muted mb-2">Uptime</h3>
            <p className="text-white">{agent.metrics.uptime}%</p>
          </div>

          {/* Metrics */}
          <div className="col-span-full bg-mission-card border border-mission-border rounded-xl p-4">
            <h3 className="text-sm font-medium text-mission-muted mb-4">Performance Metrics</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="p-3 bg-mission-dark rounded-lg text-center">
                <CheckCircle className="w-5 h-5 text-green-400 mx-auto mb-2" />
                <p className="text-xl font-bold text-white">{agent.metrics.tasksCompleted}</p>
                <p className="text-xs text-mission-muted">Completed</p>
              </div>
              <div className="p-3 bg-mission-dark rounded-lg text-center">
                <XCircle className="w-5 h-5 text-red-400 mx-auto mb-2" />
                <p className="text-xl font-bold text-white">{agent.metrics.tasksFailed}</p>
                <p className="text-xs text-mission-muted">Failed</p>
              </div>
              <div className="p-3 bg-mission-dark rounded-lg text-center">
                <Clock className="w-5 h-5 text-blue-400 mx-auto mb-2" />
                <p className="text-xl font-bold text-white">{agent.metrics.avgLatency}s</p>
                <p className="text-xs text-mission-muted">Avg Latency</p>
              </div>
              <div className="p-3 bg-mission-dark rounded-lg text-center">
                <Zap className="w-5 h-5 text-yellow-400 mx-auto mb-2" />
                <p className="text-xl font-bold text-white">{agent.metrics.uptime}%</p>
                <p className="text-xs text-mission-muted">Uptime</p>
              </div>
              <div className="p-3 bg-mission-dark rounded-lg text-center">
                <AlertTriangle className="w-5 h-5 text-orange-400 mx-auto mb-2" />
                <p className="text-xl font-bold text-white">{agent.metrics.retries}</p>
                <p className="text-xs text-mission-muted">Retries</p>
              </div>
            </div>
          </div>

          {/* Personality */}
          <div className="col-span-full bg-mission-card border border-mission-border rounded-xl p-4">
            <h3 className="text-sm font-medium text-mission-muted mb-2">Personality</h3>
            <p className="text-white">{agent.personality}</p>
          </div>
        </div>
      )}

      {activeTab === 'activity' && (
        <div className="bg-mission-card border border-mission-border rounded-xl p-4">
          <p className="text-mission-muted text-center py-8">Live activity stream</p>
        </div>
      )}

      {activeTab === 'history' && (
        <div className="bg-mission-card border border-mission-border rounded-xl p-4">
          <p className="text-mission-muted text-center py-8">Task history</p>
        </div>
      )}

      {activeTab === 'config' && (
        <div className="bg-mission-card border border-mission-border rounded-xl p-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">Primary Model</label>
              <select
                defaultValue={agent.assignedModel}
                className="w-full px-4 py-2 bg-mission-dark border border-mission-border rounded-lg text-white"
              >
                <option>MiniMax-M2.5</option>
                <option>MiniMax-M2.5-Highspeed</option>
                <option>MiniMax-M2.5-Lightning</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">Fallback Models</label>
              <div className="space-y-2">
                {agent.fallbackModels.map((model, i) => (
                  <div key={i} className="flex gap-2">
                    <select
                      defaultValue={model}
                      className="flex-1 px-4 py-2 bg-mission-dark border border-mission-border rounded-lg text-white"
                    >
                      <option>MiniMax-M2.5</option>
                      <option>MiniMax-M2.5-Highspeed</option>
                    </select>
                    <button className="px-3 text-red-400 hover:bg-red-400/10 rounded-lg">×</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'logs' && (
        <div className="bg-mission-card border border-mission-border rounded-xl p-4">
          <div className="font-mono text-sm text-mission-muted space-y-1">
            <p>[2026-03-19 22:00:00] Agent started</p>
            <p>[2026-03-19 22:00:05] Connected to model MiniMax-M2.5</p>
            <p>[2026-03-19 22:00:10] Ready for tasks</p>
            <p>[2026-03-19 22:01:00] Task received: Process request</p>
            <p>[2026-03-19 22:01:05] Task completed successfully</p>
          </div>
        </div>
      )}
    </div>
  );
}
