'use client';

import { useAppStore } from '@/store';
import { AgentCard } from '@/components/agents/AgentCard';
import { Search, Filter } from 'lucide-react';
import { useState } from 'react';

export default function AgentsPage() {
  const { agents } = useAppStore();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(search.toLowerCase()) ||
      agent.role.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || agent.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusCounts = agents.reduce((acc, agent) => {
    acc[agent.status] = (acc[agent.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Agent Roster</h1>
          <p className="text-mission-muted">All agents and their status</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-mission-muted">
            Total: {agents.length} agents
          </span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-mission-muted" />
          <input
            type="text"
            placeholder="Search agents..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-mission-card border border-mission-border rounded-lg text-white placeholder:text-mission-muted focus:outline-none focus:border-blue-500"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 bg-mission-card border border-mission-border rounded-lg text-white focus:outline-none focus:border-blue-500"
        >
          <option value="all">All Status</option>
          <option value="working">Working</option>
          <option value="ready">Ready</option>
          <option value="idle">Idle</option>
          <option value="testing">Testing</option>
          <option value="reviewing">Reviewing</option>
        </select>
      </div>

      {/* Status Summary */}
      <div className="flex items-center gap-4 flex-wrap">
        {Object.entries(statusCounts).map(([status, count]) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              statusFilter === status
                ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                : 'bg-mission-card border border-mission-border text-mission-muted hover:text-white'
            }`}
          >
            {status}: {count}
          </button>
        ))}
        {statusFilter !== 'all' && (
          <button
            onClick={() => setStatusFilter('all')}
            className="px-3 py-1.5 text-sm text-mission-muted hover:text-white"
          >
            Clear filter
          </button>
        )}
      </div>

      {/* Agent Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredAgents.map((agent) => (
          <AgentCard key={agent.id} agent={agent} />
        ))}
      </div>

      {filteredAgents.length === 0 && (
        <div className="text-center py-12">
          <p className="text-mission-muted">No agents found</p>
        </div>
      )}
    </div>
  );
}
